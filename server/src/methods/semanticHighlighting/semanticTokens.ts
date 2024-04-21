import { TextDocumentIdentifier, documents } from "../../documents";
import { RequestMessage } from "../../server";
import log from "../../log";
import { CharStreams, Token } from "antlr4ts";
import { jsoniqLexer } from "../../grammar/jsoniqLexer";
import {
  SemanticToken,
  TokenType,
  encodeSemanticTokens,
  tokenModifiers,
  tokenTypes,
} from "./tokenLegend";

type ProgressToken = number | string;
interface WorkDoneProgressParams {
  workDoneToken?: ProgressToken;
}
interface PartialResultParams {
  partialResultToken?: ProgressToken;
}
interface SemanticTokensParams
  extends WorkDoneProgressParams,
    PartialResultParams {
  textDocument: TextDocumentIdentifier;
}

interface SemanticTokens {
  resultId?: string;
  data: number[];
}

export const semanticTokens = (message: RequestMessage): SemanticTokens => {
  const params = message.params as SemanticTokensParams;
  const content = documents.get(params.textDocument.uri);
  if (!content) {
    return {
      data: [],
    };
  }
  let inputStream = CharStreams.fromString(content);
  let lexer = new jsoniqLexer(inputStream);
  let tokens = lexer.getAllTokens().filter((token) => token.text !== " ");
  let parsedTokens: SemanticToken[] = [];
  tokens.forEach((token: Token) => {
    let tokenLength = token.text?.length || 0;
    let tokenTypeAndModifier = parseTypeAndModifier(token.text);

    let tokenDetails: SemanticToken = {
      tokenType: tokenTypeAndModifier[0],
      tokenModifiers: tokenTypeAndModifier[1],
      startIdx: { line: token.line - 1, index: token.charPositionInLine },
      endIdx: {
        line: token.line - 1,
        index: token.charPositionInLine + tokenLength,
      },
      tokenLength: tokenLength,
    };
    parsedTokens.push(tokenDetails);
  });
  log.write("Tokens: " + tokens);
  log.write("Semantic tokens: " + JSON.stringify(parsedTokens));
  return {
    data: encodeSemanticTokens(parsedTokens),
  };
};

const parseTypeAndModifier = (
  token: string | undefined
): [TokenType, TokenType] => {
  if (token === undefined) {
    return [
      { type: "string", typeNumber: tokenTypes["string"] },
      { type: "declaration", typeNumber: 0 },
    ];
  }
  switch (token) {
    case "module":
      return [
        { type: "namespace", typeNumber: tokenTypes["namespace"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case "function":
    case "let":
    case "variable":
      return [
        { type: "local_storage", typeNumber: tokenTypes["local_storage"] },
        {
          type: "declaration",
          typeNumber:
            tokenModifiers["declaration"] | tokenModifiers["definition"],
        },
      ];
    case "external":
      return [
        { type: "keyword", typeNumber: tokenTypes["keyword"] },
        {
          type: "declaration",
          typeNumber: tokenModifiers["declaration"] | tokenModifiers["static"],
        },
      ];
    case "{":
    case "}":
    case "[":
    case "]":
    case "(":
    case ")":
      return [
        { type: "label", typeNumber: tokenTypes["label"] },
        {
          type: "block",
          typeNumber: tokenModifiers["block"] | tokenModifiers["definition"],
        },
      ];
    case "%":
      return [
        { type: "comment", typeNumber: tokenTypes["comment"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case ":=":
    case "=":
    case "+":
    case "-":
    case "*":
    case "/":
    case "eq":
    case "ne":
    case "lt":
    case "le":
    case "gt":
    case "ge":
    case "and":
    case "or":
      return [
        { type: "operator", typeNumber: tokenTypes["operator"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case "$":
      return [
        { type: "variable", typeNumber: tokenTypes["variable"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case "for":
    case "where":
    case "group":
    case "by":
    case "order":
    case "ascending":
    case "descending":
    case "as":
    case "at":
    case "in":
    case "declare":
    case "import":
    case "return":
      return [
        { type: "keyword", typeNumber: tokenTypes["keyword"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case "function":
      return [
        { type: "function", typeNumber: tokenTypes["function"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case "namespace":
      return [
        { type: "namespace", typeNumber: tokenTypes["namespace"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case token.match(/(?<=\")(.*?)(?=\")/)?.input:
      // source: https://regex101.com/library/Waah7L
      return [
        { type: "string", typeNumber: tokenTypes["string"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case token.match(/^\d+$/)?.input:
      // source: Copilot
      return [
        { type: "number", typeNumber: tokenTypes["number"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case ";":
      return [
        { type: "label", typeNumber: tokenTypes["label"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    default: {
      return [
        { type: "variable", typeNumber: tokenTypes["variable"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    }
  }
};

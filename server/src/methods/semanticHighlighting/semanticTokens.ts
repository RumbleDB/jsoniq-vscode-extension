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
    if (tokenTypeAndModifier === null) {
      return;
    }
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
    // log.write("Token: " + token.text + "\n");
    parsedTokens.push(tokenDetails);
  });

  return {
    data: encodeSemanticTokens(parsedTokens),
  };
};

const parseTypeAndModifier = (
  token: string | undefined
): [TokenType, TokenType] | null => {
  if (token === undefined) {
    return [
      { type: "string", typeNumber: tokenTypes["string"] },
      { type: "declaration", typeNumber: 0 },
    ];
  }
  switch (token) {
    case "module":
    case "version":
      return [
        { type: "keyword", typeNumber: tokenTypes["keyword"] },
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
    case "context":
    case "type":
      return [
        { type: "keyword", typeNumber: tokenTypes["keyword"] },
        {
          type: "declaration",
          typeNumber: tokenModifiers["declaration"] | tokenModifiers["static"],
        },
      ];
    case "true":
    case "false":
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
      // Let the syntax highlighter handle these
      return null;
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
    case "not":
      return [
        { type: "operator", typeNumber: tokenTypes["operator"] },
        { type: "definition", typeNumber: tokenModifiers["definition"] },
      ];
    case "$":
      return [
        { type: "variable", typeNumber: tokenTypes["variable"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    case "count":
    case "position":
      return [
        { type: "function", typeNumber: tokenTypes["function"] },
        {
          type: "declaration",
          typeNumber: tokenModifiers["declaration"] | tokenModifiers["static"],
        },
      ];
    case "for":
    case "typeswitch":
    case "switch":
    case "if":
    case "then":
    case "else":
    case "try":
    case "catch":
    case "where":
    case "group":
    case "by":
    case "order":
    case "as":
    case "at":
    case "in":
    case "declare":
    case "import":
    case "replace":
    case "json":
    case "value":
    case "of":
    case "rename":
    case "insert":
    case "delete":
    case "copy":
    case "append":
    case "with":
    case "modify":
    case "into":
    case "break":
    case "loop":
    case "continue":
    case "exit":
    case "returning":
    case "while":
    case "annotate":
    case "validate":
    case "castable":
    case "cast":
    case "treat":
    case "is":
    case "statically":
    case "instance":
    case "of":
    case "to":
    case "collation":
    case "satisfies":
    case "stable":
    case "empty":
    case "allowing":
    case "return":
    case "least":
    case "greatest":
    case "some":
    case "every":
    case "ascending":
    case "descending":
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
    case "jsoniq":
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
    case token.match(/\(:.*?(:\))/)?.input:
      return [
        { type: "comment", typeNumber: tokenTypes["comment"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    default: {
      log.write("Token not found: " + token + "\n");
      return [
        { type: "variable", typeNumber: tokenTypes["variable"] },
        { type: "declaration", typeNumber: tokenModifiers["declaration"] },
      ];
    }
  }
};

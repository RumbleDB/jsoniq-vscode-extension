import { TextDocumentIdentifier, documents } from "../../documents";
import { RequestMessage } from "../../server";
import log from "../../log";
import {
  numberMatchingRegexpr,
  parseTypeAndModifier,
  punctuationSet,
  separatorSet,
} from "./tokenIdentification";
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
  // let lexerTokens = lexer.getAllTokens().filter((token) => token.text !== " ");
  let lexerTokens = lexer.getAllTokens();
  let parsedTokens: SemanticToken[] = [];
  let tokenCounter = 0;
  while (tokenCounter < lexerTokens.length) {
    if (
      lexerTokens[tokenCounter].text === " " ||
      lexerTokens[tokenCounter].text === "\n" ||
      lexerTokens[tokenCounter].text === "\t"
    ) {
      ++tokenCounter;
      continue;
    }
    let tokenText = lexerTokens[tokenCounter].text;
    if (tokenText === "$") {
      // Variable
      parseAndStoreTokenWithModifier(parsedTokens, lexerTokens[tokenCounter], [
        { typeNumber: tokenTypes["variable"] },
        { typeNumber: tokenModifiers["declaration"] },
      ]);
      if (tokenCounter + 1 === lexerTokens.length) {
        continue;
      }
      let nextToken = lexerTokens[++tokenCounter];
      parseAndStoreTokenWithModifier(parsedTokens, nextToken, [
        { typeNumber: tokenTypes["variable"] },
        { typeNumber: tokenModifiers["declaration"] },
      ]);
      if (tokenCounter + 1 === lexerTokens.length) {
        continue;
      }
      tokenCounter = parseAttributes(parsedTokens, lexerTokens, tokenCounter);
    } else if (tokenText === ".") {
      tokenCounter = parseAttributes(parsedTokens, lexerTokens, tokenCounter);
    } else {
      parseAndStoreToken(parsedTokens, lexerTokens[tokenCounter]);
      ++tokenCounter;
    }
  }

  return {
    data: encodeSemanticTokens(parsedTokens),
  };
};

const parseAttributes = (
  parsedTokens: SemanticToken[],
  lexerTokens: Token[],
  tokenCounter: number
): number => {
  let currCounter = tokenCounter;
  let currToken = lexerTokens[currCounter];
  while (
    currCounter < lexerTokens.length &&
    !separatorSet.has(currToken.text ?? "")
  ) {
    if (punctuationSet.has(currToken.text ?? "")) {
      parseAndStoreTokenWithModifier(parsedTokens, currToken, [
        { typeNumber: tokenTypes["punctuation"] },
        { typeNumber: tokenModifiers["declaration"] },
      ]);
    } else if (currToken.text === "$$") {
      parseAndStoreTokenWithModifier(parsedTokens, currToken, [
        { typeNumber: tokenTypes["keyword"] },
        {
          typeNumber: tokenModifiers["declaration"],
        },
      ]);
    } else if (currToken.text?.match(numberMatchingRegexpr)?.input) {
      parseAndStoreTokenWithModifier(parsedTokens, currToken, [
        { typeNumber: tokenTypes["number"] },
        {
          typeNumber: tokenModifiers["readonly"],
        },
      ]);
    } else {
      parseAndStoreTokenWithModifier(parsedTokens, currToken, [
        { typeNumber: tokenTypes["property"] },
        {
          typeNumber: tokenModifiers["definition"] | tokenModifiers["readonly"],
        },
      ]);
    }
    currToken = lexerTokens[++currCounter];
  }

  return currCounter;
};

const parseAndStoreToken = (parsedTokens: SemanticToken[], token: Token) => {
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
};

const parseAndStoreTokenWithModifier = (
  parsedTokens: SemanticToken[],
  token: Token,
  tokenTypeAndModifier: [TokenType, TokenType]
) => {
  let tokenLength = token.text?.length || 0;
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
};

// const parseTypeAndModifier = (
//   token: string | undefined
// ): [TokenType, TokenType] | null => {
//   if (token === undefined) {
//     return [{ typeNumber: tokenTypes["string"] }, { typeNumber: 0 }];
//   }
//   switch (token) {
//     case "module":
//     case "version":
//       return [
//         { typeNumber: tokenTypes["keyword"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     case "function":
//     case "let":
//     case "variable":
//       return [
//         { typeNumber: tokenTypes["local_storage"] },
//         {
//           typeNumber:
//             tokenModifiers["declaration"] | tokenModifiers["definition"],
//         },
//       ];
//     case "external":
//     case "context":
//     case "type":
//       return [
//         { typeNumber: tokenTypes["keyword"] },
//         {
//           typeNumber: tokenModifiers["declaration"] | tokenModifiers["static"],
//         },
//       ];
//     case "true":
//     case "false":
//       return [
//         { typeNumber: tokenTypes["keyword"] },
//         {
//           typeNumber: tokenModifiers["declaration"] | tokenModifiers["static"],
//         },
//       ];
//     case "{":
//     case "}":
//     case "[":
//     case "]":
//     case "(":
//     case ")":
//       // Let the syntax highlighter handle these
//       return null;
//     case ":=":
//     case "=":
//     case "+":
//     case "-":
//     case "*":
//     case "/":
//       return [
//         { typeNumber: tokenTypes["operator"] },
//         { typeNumber: tokenModifiers["definition"] },
//       ];
//     case "$":
//       return [
//         { typeNumber: tokenTypes["variable"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     case "count":
//     case "position":
//       return [
//         { typeNumber: tokenTypes["function"] },
//         {
//           typeNumber: tokenModifiers["declaration"] | tokenModifiers["static"],
//         },
//       ];
//     case "for":
//     case "typeswitch":
//     case "switch":
//     case "if":
//     case "then":
//     case "else":
//     case "try":
//     case "catch":
//     case "where":
//     case "group":
//     case "by":
//     case "order":
//     case "as":
//     case "at":
//     case "in":
//     case "declare":
//     case "import":
//     case "replace":
//     case "json":
//     case "value":
//     case "of":
//     case "rename":
//     case "insert":
//     case "delete":
//     case "copy":
//     case "append":
//     case "with":
//     case "modify":
//     case "into":
//     case "break":
//     case "loop":
//     case "continue":
//     case "exit":
//     case "returning":
//     case "while":
//     case "annotate":
//     case "validate":
//     case "castable":
//     case "cast":
//     case "treat":
//     case "is":
//     case "statically":
//     case "instance":
//     case "of":
//     case "to":
//     case "collation":
//     case "satisfies":
//     case "stable":
//     case "empty":
//     case "allowing":
//     case "return":
//     case "least":
//     case "greatest":
//     case "some":
//     case "every":
//     case "ascending":
//     case "descending":
//     case "eq":
//     case "ne":
//     case "lt":
//     case "le":
//     case "gt":
//     case "ge":
//     case "and":
//     case "or":
//     case "not":
//       return [
//         { typeNumber: tokenTypes["keyword"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     case "function":
//       return [
//         { typeNumber: tokenTypes["function"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     case "namespace":
//     case "jsoniq":
//       return [
//         { typeNumber: tokenTypes["namespace"] },
//         {
//           typeNumber:
//             tokenModifiers["declaration"] | tokenModifiers["definition"],
//         },
//       ];
//     case ";":
//     case ",":
//       return [
//         { typeNumber: tokenTypes["label"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     case token.match(/\(:.*?(:\))/)?.input:
//       return [
//         { typeNumber: tokenTypes["comment"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     case token.match(/^\d+$/)?.input:
//       // source: Copilot
//       return [
//         { typeNumber: tokenTypes["number"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     case token.match(/(?<=\")(.*?)(?=\")/)?.input:
//       // source: https://regex101.com/library/Waah7L
//       return [
//         { typeNumber: tokenTypes["string"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     default: {
//       log.write("Token not found: " + token + "\n");
//       return [
//         { typeNumber: tokenTypes["variable"] },
//         { typeNumber: tokenModifiers["declaration"] },
//       ];
//     }
//   }
// };

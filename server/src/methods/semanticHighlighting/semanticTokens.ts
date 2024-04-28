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
    } else if (tokenText === "as") {
      tokenCounter = parseTypeCasting(parsedTokens, lexerTokens, tokenCounter);
    } else if (tokenText === "%") {
      tokenCounter = parseAnnotations(parsedTokens, lexerTokens, tokenCounter);
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

const parseTypeCasting = (
  parsedTokens: SemanticToken[],
  lexerTokens: Token[],
  tokenCounter: number
): number => {
  let currentCount = tokenCounter;
  // Parse "as" token
  parseAndStoreToken(parsedTokens, lexerTokens[currentCount]);
  ++currentCount;
  // Skip whitespace
  while (
    currentCount < lexerTokens.length &&
    separatorSet.has(lexerTokens[currentCount].text ?? "")
  ) {
    ++currentCount;
  }
  if (currentCount < lexerTokens.length) {
    let currToken = lexerTokens[currentCount];
    parseAndStoreTokenWithModifier(parsedTokens, currToken, [
      { typeNumber: tokenTypes["type"] },
      { typeNumber: tokenModifiers["static"] },
    ]);
    currentCount++;
  }
  return currentCount;
};

const parseAnnotations = (
  parsedTokens: SemanticToken[],
  lexerTokens: Token[],
  tokenCounter: number
): number => {
  let currentCount = tokenCounter;
  let currentToken = lexerTokens[currentCount];
  while (
    currentCount < lexerTokens.length &&
    !separatorSet.has(currentToken.text ?? "")
  ) {
    parseAndStoreTokenWithModifier(parsedTokens, currentToken, [
      { typeNumber: tokenTypes["decorator"] },
      { typeNumber: tokenModifiers["static"] },
    ]);
    currentToken = lexerTokens[++currentCount];
  }
  return currentCount;
};

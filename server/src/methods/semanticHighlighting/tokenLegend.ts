import assert = require("assert");
import log from "../../log";

interface SemanticTokensLegend {
  tokenTypes: string[];
  tokenModifiers: string[];
}

interface Position {
  line: number;
  index: number;
}

export interface TokenType {
  type: string;
  typeNumber: number;
}

export interface SemanticToken {
  tokenType: TokenType;
  tokenModifiers: TokenType;
  startIdx: Position;
  endIdx: Position;
  tokenLength: number;
}

export const tokenTypes = {
  type: 0,
  namespace: 1,
  keyword: 2,
  variable: 3,
  parameter: 4,
  property: 5,
  function: 6,
  comment: 7,
  string: 8,
  number: 9,
  operator: 10,
  decorator: 11,
  label: 12,
  local_storage: 13,
};

export const tokenModifiers = {
  declaration: 1 << 0,
  static: 1 << 1,
  definition: 1 << 2,
  modification: 1 << 3,
  functionScope: 1 << 4,
  block: 1 << 5,
};

export const tokenLegend: SemanticTokensLegend = {
  tokenTypes: Object.keys(tokenTypes),
  tokenModifiers: Object.keys(tokenModifiers),
};

export const encodeSemanticTokens = (tokens: SemanticToken[]): number[] => {
  const result: number[] = [];
  let previousPosition = { line: 0, index: 0 };
  for (const token of tokens) {
    let deltaLine = token.startIdx.line - previousPosition.line;
    // Delta index is relative to previous token in the same line.
    let deltaDiff =
      previousPosition.line === token.startIdx.line
        ? previousPosition.index
        : 0;
    let deltaIndex = token.startIdx.index - deltaDiff;

    assert(deltaLine >= 0, "Delta line must be positive");
    assert(deltaIndex >= 0, "Delta index must be positive");

    // Now previous becomes current token's start.
    previousPosition = token.startIdx;

    result.push(deltaLine);
    result.push(deltaIndex);
    result.push(token.tokenLength);
    result.push(token.tokenType.typeNumber);
    result.push(token.tokenModifiers.typeNumber);
  }
  return result;
};

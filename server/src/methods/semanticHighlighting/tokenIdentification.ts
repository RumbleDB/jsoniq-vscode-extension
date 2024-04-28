import { TokenType, tokenModifiers, tokenTypes } from "./tokenLegend";

const keywordSet = new Set([
  "module",
  "version",
  "external",
  "context",
  "type",
  "true",
  "false",
  "for",
  "typeswitch",
  "switch",
  "if",
  "then",
  "else",
  "try",
  "catch",
  "where",
  "group",
  "by",
  "order",
  "as",
  "at",
  "in",
  "declare",
  "import",
  "replace",
  "json",
  "value",
  "of",
  "rename",
  "insert",
  "delete",
  "copy",
  "append",
  "with",
  "modify",
  "into",
  "break",
  "loop",
  "continue",
  "exit",
  "returning",
  "while",
  "annotate",
  "validate",
  "castable",
  "cast",
  "treat",
  "is",
  "statically",
  "instance",
  "of",
  "to",
  "collation",
  "satisfies",
  "stable",
  "empty",
  "allowing",
  "return",
  "least",
  "greatest",
  "some",
  "every",
  "ascending",
  "descending",
  "ordering",
  "order",
  "ordered",
  "unordered",
  "eq",
  "ne",
  "lt",
  "le",
  "gt",
  "ge",
  "and",
  "or",
  "not",
  "$$",
]);

const staticModifierSet = new Set([
  "external",
  "context",
  "type",
  "true",
  "false",
  "count",
  "position",
]);

const localStorageSet = new Set(["function", "let", "variable"]);

const operatorSet = new Set([":=", "=", "+", "-", "*", "/", ":", "."]);

const languageFunctionsSet = new Set([
  "count",
  "position",
  "json-file",
  "concat",
  "string-join",
  "distinct-values",
  "size",
  "project",
  "sum",
  "accumulate",
  "descendant-objects",
  "intersect",
  "keys",
  "remove-keys",
  "values",
  "exactly-one",
  "one-or-more",
  "zero-or-one",
  "avg",
  "max",
  "min",
  "empty",
  "head",
  "insert-before",
  "remove",
  "subsequence",
  "tail",
  "index-of",
  "deep-equal",
  "codepoint-equal",
  "codepoints-to-string",
  "contains",
  "encode-for-uri",
  "ends-with",
  "lower-case",
  "matches",
  "normalize-unicode",
  "replace",
  "resolve-uri",
  "serialize",
  "string",
  "starts-with",
  "string-join",
  "string-length",
  "string-to-codepoints",
  "substring",
  "translate",
  "upper-case",
  "current-time",
  "format-time",
  "time",
  "parallelize",
  "doc",
]);

const namespaceSet = new Set(["namespace", "jsoniq"]);
export const separatorSet = new Set([" ", "\n", "\t", ";", ","]);
export const punctuationSet = new Set([".", "[", "]", "(", ")"]);

const commentMatchingRegexpr = /\(:.*?(:\))/;
export const numberMatchingRegexpr = /\d+/;
const stringMatchingRegexpr = /(?<=\")(.*?)(?=\")/;

export const parseTypeAndModifier = (
  token: string | undefined
): [TokenType, TokenType] | null => {
  if (token === undefined) {
    return [{ typeNumber: tokenTypes["string"] }, { typeNumber: 0 }];
  }
  let resultTokenType = tokenTypes["unknown"];
  let resultTokenModifier = 0;
  if (keywordSet.has(token)) {
    resultTokenType = tokenTypes["keyword"];
    resultTokenModifier = tokenModifiers["declaration"];
  } else if (localStorageSet.has(token)) {
    resultTokenType = tokenTypes["local_storage"];
    resultTokenModifier = tokenModifiers["declaration"];
  } else if (operatorSet.has(token)) {
    resultTokenType = tokenTypes["operator"];
  } else if (languageFunctionsSet.has(token)) {
    resultTokenType = tokenTypes["function"];
    resultTokenModifier = tokenModifiers["static"];
  } else if (namespaceSet.has(token)) {
    resultTokenType = tokenTypes["namespace"];
    resultTokenModifier = tokenModifiers["definition"];
  } else if (token.match(commentMatchingRegexpr)?.input) {
    resultTokenType = tokenTypes["comment"];
    resultTokenModifier = tokenModifiers["declaration"];
  } else if (token.match(numberMatchingRegexpr)?.input) {
    resultTokenType = tokenTypes["number"];
    resultTokenModifier = tokenModifiers["declaration"];
  } else if (token.match(stringMatchingRegexpr)?.input) {
    resultTokenType = tokenTypes["string"];
    resultTokenModifier = tokenModifiers["declaration"];
  }
  if (staticModifierSet.has(token)) {
    resultTokenModifier = resultTokenModifier | tokenModifiers["static"];
  }
  return [{ typeNumber: resultTokenType }, { typeNumber: resultTokenModifier }];
};

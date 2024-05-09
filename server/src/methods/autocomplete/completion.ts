import {
  CharStream,
  CommonTokenStream,
  ParseTree,
  Parser,
  TerminalNode,
} from "antlr4ng";
import { TextDocumentIdentifier, documents } from "../../documents.js";
import { jsoniqLexer } from "../../grammar/antlr4ng/jsoniqLexer.js";
import { RequestMessage } from "../../server.js";
import { Position } from "../../types.js";
import { jsoniqParser } from "../../grammar/antlr4ng/jsoniqParser.js";
import { CodeCompletionCore } from "antlr4-c3";
import log from "../../log.js";

export interface CompletionItem {
  label: string;
}

export interface CompletionList {
  isIncomplete: boolean;
  items: CompletionItem[];
}

interface TextDocumentPositionParams {
  textDocument: TextDocumentIdentifier;
  position: Position;
}

interface CompletionParams extends TextDocumentPositionParams {}

export const completion = (message: RequestMessage): CompletionList | null => {
  const params = message.params as CompletionParams;
  const content = documents.get(params.textDocument.uri);

  if (!content) {
    return null;
  }

  const inputStream = CharStream.fromString(content);
  const lexer = new jsoniqLexer(inputStream);
  const parser = new jsoniqParser(new CommonTokenStream(lexer));

  // Get index
  const index =
    computeTokenIndex(parser.moduleAndThisIsIt(), params.position) ?? 0;
  const core = new CodeCompletionCore(parser);
  // Ignore tokens
  //   core.ignoredTokens = new Set([jsoniqParser.])

  // Add rules
  core.preferredRules = new Set([jsoniqParser.RULE_qname]);
  const candidates = core.collectCandidates(index);
  const items: CompletionItem[] = [];
  candidates.tokens.forEach((_, token) => {
    let symbolicName = parser.vocabulary.getLiteralName(token);
    if (symbolicName) {
      symbolicName = symbolicName.replace(/["']/g, "");
      items.push({
        label: symbolicName.toLowerCase(),
      });
    }
  });

  return {
    isIncomplete: false,
    items,
  };
};

function computeTokenIndex(
  parseTree: ParseTree,
  caretPosition: Position
): number | undefined {
  if (parseTree instanceof TerminalNode) {
    return computeTokenIndexOfTerminalNode(parseTree, caretPosition);
  } else {
    return computeTokenIndexOfChildNode(parseTree, caretPosition);
  }
}

function computeTokenIndexOfTerminalNode(
  parseTree: TerminalNode,
  caretPosition: Position
) {
  let start = parseTree.symbol.column;
  let stop = parseTree.symbol.column + (parseTree.symbol.text?.length ?? 0);
  if (
    parseTree.symbol.line == caretPosition.line &&
    start <= caretPosition.character &&
    stop >= caretPosition.character
  ) {
    return parseTree.symbol.tokenIndex;
  } else {
    return undefined;
  }
}
function computeTokenIndexOfChildNode(
  parseTree: ParseTree,
  caretPosition: Position
) {
  for (let i = 0; i < parseTree.getChildCount(); i++) {
    let child = parseTree.getChild(i);
    if (child != null) {
      let index = computeTokenIndex(child, caretPosition);
      if (index !== undefined) {
        return index;
      }
    }
  }
  return undefined;
}

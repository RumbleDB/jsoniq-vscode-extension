import { TextDocumentIdentifier, documents } from "../../documents";
import { RequestMessage } from "../../server";
import { Position } from "../../types";

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

  const currentLine = content.split("\n")[params.position.line];
  const lineUntilCursor = currentLine.slice(0, params.position.character);
  // Regex source: https://www.youtube.com/watch?v=Xo5VXTRoL6Q
  const currentPrefix = lineUntilCursor.replace(/.*\W(.*?)/, "$1");

  // Filter list of possible items

  return {
    isIncomplete: false,
    items: [{ label: "TypeScript" }, { label: "test" }],
  };
};

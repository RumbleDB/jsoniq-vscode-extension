import { RequestMessage } from "../server";
import { tokenLegend } from "./semanticHighlighting/tokenLegend";
type ServerCapabilities = Record<string, unknown>;

interface InitializeResult {
  capabilities: ServerCapabilities;
  serverInfo?: {
    name: string;
    version?: string;
  };
}

export const initialize = (message: RequestMessage): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: 1,
      semanticTokensProvider: {
        legend: tokenLegend,
        range: false,
        full: { delta: false },
      },
    },
    serverInfo: {
      name: "jsoniq-language-server",
      version: "0.0.1",
    },
  };
};

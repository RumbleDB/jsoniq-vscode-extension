import { TextDocumentIdentifier, documents } from "../../documents";
import { RequestMessage } from "../../server";
import { TokensParser } from "./tokenIdentification";
import { CharStreams } from "antlr4ts";
import { jsoniqLexer } from "../../grammar/jsoniqLexer";
import { encodeSemanticTokens } from "./tokenLegend";

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
  const lexerTokens = lexer.getAllTokens();
  const tokenParser = new TokensParser(lexerTokens);
  const parsedTokens = tokenParser.getSemanticTokens();
  return {
    data: encodeSemanticTokens(parsedTokens),
  };
};

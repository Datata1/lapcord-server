import { createConnection as createServerConnection, ProposedFeatures, TextDocuments } from 'vscode-languageserver/node'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { Server } from './lsp-server'

export function createConnection() {
  const connection = createServerConnection(ProposedFeatures.all, {
    input: process.stdin,
    output: process.stdout,
  });

  const documents = new TextDocuments(TextDocument)
  const server = new Server(connection)

  connection.onInitialize((x) => server.onInitialize(x))
  connection.onInitialized(() => server.onInitialized(documents))

  process.on('unhandledRejection', (e) => server.onError(e))

  return { connection, documents }
}

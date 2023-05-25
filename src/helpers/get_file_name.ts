import * as vscode from 'vscode';
import * as path from 'path';

export default function getFileName() {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const { fsPath } = activeEditor.document.uri;
    const fileName = path.basename(fsPath); // Extracts the file name from the full file path
    return fileName;
  }
  return '';
}



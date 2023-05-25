import * as vscode from 'vscode';

export function extractSelectedText(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      return selectedText;
    }
    return undefined;
  }
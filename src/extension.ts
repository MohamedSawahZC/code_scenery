import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const VIEW_TYPE = 'codescenery';
const WEB_VIEW_TITLE = 'Code Scenery';

let panel: vscode.WebviewPanel | undefined;

const init = (context: vscode.ExtensionContext) => {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
        // Check if panel is already created, if not, create a new panel
        if (!panel) {
            panel = createPanel(context);
            // Dispose panel and clean up when closed
            panel.onDidDispose(() => {
                panel = undefined;
                vscode.window.showInformationMessage("See you later ❤️");
            });
        }
        // If there is text selected, update the panel
        if (hasTextSelected(activeTextEditor.selection)) {
            update(panel);
        }
    } else {
        //@desc Handle no text selection
        vscode.window.showErrorMessage("There is no text selected");
    }
};

const createPanel = (context: vscode.ExtensionContext): vscode.WebviewPanel => {
    const htmlTemplatePath = path.resolve(context.extensionPath, 'webview/index.html');
    const iconPath = path.resolve(context.extensionPath, 'webview/assets/images/icon-label.png');
    // Create a new webview panel
    const panel = vscode.window.createWebviewPanel(
        VIEW_TYPE,
        WEB_VIEW_TITLE,
        vscode.ViewColumn.Two,
        {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(context.extensionPath)]
        }
    );

    panel.iconPath = vscode.Uri.file(iconPath);

    // Load HTML template into the webview panel
    panel.webview.html = getTemplate(htmlTemplatePath, panel);

    // Handle messages received from the webview
    panel.webview.onDidReceiveMessage((message) => {
        if (message.type === 'updateCode') {
            update(panel);
        }
    });

    return panel;
};

const getTemplate = (htmlTemplatePath: string, panel: vscode.WebviewPanel): string => {
    const htmlContent = fs.readFileSync(htmlTemplatePath, 'utf-8');
    // Replace placeholders in the HTML template with actual values
    return htmlContent
        .replace(/%CSP_SOURCE%/gu, panel.webview.cspSource)
        .replace(/(src|href)="([^"]*)"/gu, (_, match, src) => {
            let assetsPath = panel.webview.asWebviewUri(
                vscode.Uri.file(path.resolve(htmlTemplatePath, '..', src))
            );
            return `${match}="${assetsPath}"`;
        });
};

const update = (panel: vscode.WebviewPanel): void => {
    vscode.commands.executeCommand('editor.action.clipboardCopyAction');

    // Send a message to the webview to trigger the code update
    panel.webview.postMessage({
        type: 'updateCode'
    });
};

const hasTextSelected = (selection: vscode.Selection | undefined): boolean =>
    !!selection && !selection.isEmpty;

export const activate = (context: vscode.ExtensionContext) => {
    return context.subscriptions.push(
        // Register the extension command to capture code scenery
        vscode.commands.registerCommand('codescenery.capture', () => init(context))
    );
};

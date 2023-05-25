
import * as vscode from 'vscode';
import { extractSelectedText } from './helpers/code_extractor';
import { showSelectedCodeAsReadme } from './helpers/show_selected_code';


export function activate(context: vscode.ExtensionContext) {


	//1) Context Subscription
	context.subscriptions.push(
	//1) Extract Selected Text
	vscode.commands.registerCommand("codescenery.capture",()=>{
		const selectedText : string = extractSelectedText() ?? "There is no selected text";
		if(selectedText){
			showSelectedCodeAsReadme(selectedText);
		}else{
			vscode.window.showErrorMessage("No selected text");
		}
	})
	);
} 

// This method is called when your extension is deactivated
export function deactivate() {}

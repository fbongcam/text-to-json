// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { convertLines } from './functions';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "text-to-json" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

    // Convert Document
	const disposable = vscode.commands.registerCommand('text-to-json.convertDoc', () => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        let document = editor.document;

        // Get the document text
        let documentText = document.getText();

        // DO SOMETHING WITH `documentText`
        const json = convertLines(documentText);

        editor.edit((builder) => {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).range.end.character);
            builder.replace(
                new vscode.Range(start, end), json);
            // format document
            vscode.commands.executeCommand('editor.action.formatDocument').then(() => {
                vscode.window.showInformationMessage('Selection formatted successfully!');
            },
            (err) => {
                vscode.window.showErrorMessage('Failed to format the selection: ' + err);
            });
        }).then(success => {
            if (!success) {
                vscode.window.showErrorMessage('Failed to replace file content.');
                return;
            }
        });

	});

    // Convert Selection
    const selection = vscode.commands.registerCommand('text-to-json.convertSelection', () => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        let selection = editor.selection;

        if (selection.isEmpty) {
            vscode.window.showErrorMessage('No text selected!');
            return;
        }

        // Get the document text
        let selectedText = editor.document.getText(selection);

        // DO SOMETHING WITH `documentText`
        const json = convertLines(selectedText);

        editor.edit((builder) => {
            builder.replace(selection, json);
            vscode.commands.executeCommand('editor.action.formatSelection');
        }).then(success => {
            if (!success) {
                vscode.window.showErrorMessage('Failed to replace file content.');
                return;
            }
        });

    });

    context.subscriptions.push(selection);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

import * as vscode from 'vscode';
import getFileName from './get_file_name';

export function showSelectedCodeAsReadme(selectedText: string): void {
    const panel = vscode.window.createWebviewPanel(
      'Code Scenery', // Unique identifier for the panel
      'Code Scenery', // Title displayed in the panel's header
      vscode.ViewColumn.One, // The column in which the panel should be shown
      {
        enableScripts: false // Enable JavaScript and other scripts in the webview
      }
    );
  
    // Set the HTML content of the webview panel
    panel.webview.html = getWebViewContent(selectedText);
  }


  function getWebViewContent(selectedText: string): string {
      //1) Extract Selected Code
      const codeSnippet = escapeHtml(selectedText);
      //2) Extract File name
      const fileName = getFileName();

    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap" rel="stylesheet">
    </head>
    
    <body>
        <div class="background">
            <!--========== Start of controls options ================= -->
            <div class="controls-options d-flex">
                <div class="item">
                    <button type="button" class="btn camera-btn"><i class="fas fa-camera camera-icon"></i>
                    </button>
                </div>
            </div>
            <!--========== End of controls options ================= -->
            <div class="window-frame">
                <div class="frame-header">
                    <div class="window-button red"></div>
                    <div class="window-button yellow"></div>
                    <div class="window-button grey"></div>
                    <div class="code-language">${fileName}</div>
                </div>
                <div class="code-box">
                    <code>${codeSnippet}</code>
                </div>
            </div>
        </div>
        </div>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');
    
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Cairo', sans-serif;
            }
            
            body{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100vh;
                background-image: linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%);
            }
    
            .controls-options {
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            .item {
                margin: 1rem;
            }
    
            .camera-btn {
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                background-color: transparent;
            }
    
            .camera-icon {
                font-size: 60px;
            }
    
            .window-frame {
                position: relative;
                display: inline-block;
                background-color: #282828;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
            }
    
            .frame-header {
                padding: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
    
            /* Styles for the window buttons */
            .window-button {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                display: inline-block;
                margin: 0 5px;
            }
    
            .window-button.red {
                background-color: #ff5f57;
            }
    
            .window-button.yellow {
                background-color: #ffbd2e;
            }
    
            .window-button.grey {
                background-color: #c7c7c7;
            }
    
            /* Styles for the code box */
            .code-box {
                background-color: #1a1a1a;
                color: #fff;
                font-size: 14px;
                padding: 20px;
                border-radius: 8px;
                overflow: auto;
                position: relative;
            }
    
            /* Styles for the code language */
            .code-language {
                background-color: #000;
                color: #fff;
                padding: 5px 10px;
                border-radius: 4px;
                font-weight: bold;
                margin-bottom: 10px;
                margin-left: auto;
            }
    
            /* Styles for line numbers */
            .line-number {
                display: inline-block;
                text-align: right;
                padding-right: 10px;
                color: #808080;
                user-select: none;
                cursor: default;
            }
            code{
                display: block;
                  padding: 4px 8px;
                   white-space: pre-wrap;
            }
        </style>
    
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>
    </body>
    
    </html>
    `;
  }


  function escapeHtml(text: string): string {
    // Helper function to escape special characters in HTML
    return text.replace(/[<>&]/g, function (tag) {
      return tag === '<' ? '&lt;' : tag === '>' ? '&gt;' : '&amp;';
    });
  }
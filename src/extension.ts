import * as vscode from "vscode";
import { copyPromptAndOpenAgentChat } from "./openAgentChat";
import { INSTALL_AST_INDEX_AGENT_PROMPT } from "./prompts";

function workspaceCwd(): string | undefined {
  return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
}

function runInNewTerminal(name: string, command: string, cwd: string): void {
  const terminal = vscode.window.createTerminal({ name, cwd });
  terminal.show();
  terminal.sendText(command, true);
}

export function activate(context: vscode.ExtensionContext): void {
  const config = vscode.workspace.getConfiguration("ast-index");
  const cwd = workspaceCwd();

  if (cwd) {
    if (config.get<boolean>("rebuildOnStartup") !== false) {
      runInNewTerminal("ast-index rebuild", "ast-index rebuild", cwd);
    }
    if (config.get<boolean>("watchOnStartup") !== false) {
      runInNewTerminal("ast-index watch", "ast-index watch", cwd);
    }
  }

  const runRebuild = (): void => {
    const dir = workspaceCwd() ?? process.cwd();
    runInNewTerminal("ast-index rebuild", "ast-index rebuild", dir);
  };

  const runWatch = (): void => {
    const dir = workspaceCwd() ?? process.cwd();
    runInNewTerminal("ast-index watch", "ast-index watch", dir);
  };

  const runInstallAstIndexAgent = (): void => {
    void copyPromptAndOpenAgentChat(INSTALL_AST_INDEX_AGENT_PROMPT);
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "ast-index.installAstIndex",
      runInstallAstIndexAgent,
    ),
    vscode.commands.registerCommand("ast-index.rebuild", runRebuild),
    vscode.commands.registerCommand("ast-index.start", runWatch),
  );

  const tree = new SimpleTree();
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("astIndexView", tree),
  );

  const status = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  status.text = "$(terminal) ast-index";
  status.tooltip = "Запустить ast-index watch в новом терминале";
  status.command = "ast-index.start";
  status.show();
  context.subscriptions.push(status);
}

class SimpleTree implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): vscode.TreeItem[] {
    const item = new vscode.TreeItem(
      "Кнопки в заголовке: установка ast-index, rebuild, watch; в статус-баре — watch",
      vscode.TreeItemCollapsibleState.None,
    );
    item.tooltip =
      "Облако — промпт для агента (установка ast-index и user rules); далее rebuild и watch";
    return [item];
  }
}

export function deactivate(): void {}

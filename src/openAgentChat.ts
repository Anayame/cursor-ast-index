import * as vscode from "vscode";

/** Команды Cursor/VS Code для открытия AI-чата (могут меняться между версиями). */
const OPEN_AI_CHAT_COMMANDS = [
  "aichat.newchataction",
  "workbench.action.chat.open",
  "workbench.action.quickchat.toggle",
];

/**
 * Копирует промпт в буфер и пытается открыть панель чата/агента.
 * Гарантированный сценарий — вставка вручную (Ctrl+V).
 */
export async function copyPromptAndOpenAgentChat(prompt: string): Promise<void> {
  await vscode.env.clipboard.writeText(prompt);

  let opened = false;
  for (const cmd of OPEN_AI_CHAT_COMMANDS) {
    try {
      await vscode.commands.executeCommand(cmd);
      opened = true;
      break;
    } catch {
      // команда отсутствует или недоступна в этой сборке редактора
    }
  }

  const msg = opened
    ? "Промпт скопирован в буфер. Вставьте его в поле чата (Ctrl+V) и отправьте агенту."
    : "Промпт скопирован в буфер. Откройте чат Cursor (Ctrl+L), вставьте текст (Ctrl+V) и отправьте агенту.";

  await vscode.window.showInformationMessage(msg, { modal: false });
}

/** Промпт для агента Cursor: установка ast-index и настройка правил. */
export const INSTALL_AST_INDEX_AGENT_PROMPT = `Ты работаешь как агент в Cursor. Выполни по шагам:

## 1. Установи CLI ast-index

Репозиторий и документация: https://github.com/defendend/Claude-ast-index-search

- **Windows:** в терминале выполни \`winget install --id defendend.ast-index\` (или проверь, что ast-index уже в PATH).
- **macOS / Linux:** \`brew tap defendend/ast-index\` и \`brew install ast-index\` — если используется Homebrew.

После установки проверь: \`ast-index version\` и при необходимости помоги пользователю добавить каталог с бинарником в PATH.

## 2. Глобальные правила Cursor (User Rules)

Открой настройки Cursor → раздел Rules / Rules for AI и добавь (или дополни) правила примерно такого содержания:

- Используй CLI \`ast-index\` для быстрого поиска по коду вместо полного grep/find там, где это уместно.
- В новом проекте перед первым поиском выполняй \`ast-index rebuild\`, после существенных изменений кода — \`ast-index update\`.
- Основные команды: \`ast-index search\`, \`class\`, \`symbol\`, \`implementations\`, \`usages\`, \`callers\`, \`outline\`, \`file\`, \`deps\` и др. (\`ast-index --help\`).

Сформулируй правила связным текстом на языке пользователя.

## 3. Опционально: правила в репозитории

Если открыт проект, предложи создать \`.cursor/rules/\` с файлом для ast-index (тот же смысл, что в user rules), чтобы команда видела инструкции в этом репозитории.

## 4. Итог

Кратко сообщи, что сделано, и что пользователь может проверить (\`ast-index version\`, наличие правил).`;

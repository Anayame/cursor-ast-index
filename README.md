# ast-index (расширение)

Расширение для [Visual Studio Code](https://code.visualstudio.com/) и совместимых редакторов (в том числе Cursor). Имя пакета и отображаемое имя: **ast-index**. Оно запускает **`ast-index rebuild`** и **`ast-index watch`** в отдельных терминалах из корня открытой рабочей папки: при старте окна (опционально) и по кнопкам/командам. Ниже под «CLI» имеется в виду отдельно устанавливаемый одноимённый инструмент из репозитория defendend.

## CLI ast-index (бинарник)

CLI **ast-index** — быстрый поиск по коду с индексацией (Rust, SQLite). Исходники, документация и список команд: **[defendend/Claude-ast-index-search](https://github.com/defendend/Claude-ast-index-search)**.

### Установка CLI (кратко)

- **Windows:** `winget install --id defendend.ast-index`
- **macOS / Linux (Homebrew):**  
  `brew tap defendend/ast-index` → `brew install ast-index`
- **Из исходников:** клонировать репозиторий и собрать `cargo build --release` (бинарник `target/release/ast-index`).

После установки убедитесь, что `ast-index` доступен в `PATH` (в терминале Cursor выполните `ast-index version`).

В корне проекта обычно выполняют `ast-index rebuild` при первом использовании и `ast-index update` после существенных изменений кода.

---

## Возможности расширения

| Действие | Описание |
|----------|----------|
| **Автозапуск при открытии окна** | Если открыта **рабочая папка**, создаются два терминала: один с `ast-index rebuild`, второй с `ast-index watch`. Если папка не открыта, терминалы не создаются. |
| **Панель «AST Index»** | В активности слева откройте **AST Index → Watch**. В заголовке представления три кнопки: **Установить ast-index** (облако) — копирует в буфер промпт для агента Cursor (установка CLI, winget/brew, user rules и опционально `.cursor/rules`); затем **rebuild** и **watch**. Команда установки **не** дублируется в палитре и статус-баре. |
| **Палитра команд** | Только «Запустить ast-index rebuild» и «Запустить ast-index watch». |
| **Строка состояния** | Справа внизу — быстрый запуск **watch** в новом терминале. |

Предполагается, что CLI `ast-index` установлен и доступен в `PATH`.

### Настройки

В **Settings** найдите `ast-index` или отредактируйте `settings.json`:

| Ключ | По умолчанию | Смысл |
|------|----------------|--------|
| `ast-index.rebuildOnStartup` | `true` | Создавать терминал с `ast-index rebuild` при загрузке окна. |
| `ast-index.watchOnStartup` | `true` | Создавать отдельный терминал с `ast-index watch` при загрузке окна. |

---

## Cursor / VS Code: установка расширения

1. Установите **CLI ast-index** (см. выше).
2. Соберите расширение из этого репозитория: `npm install` и `npm run compile`.
3. Упакуйте в `.vsix`: `npx --yes @vscode/vsce package`.
4. **Extensions** → меню **⋯** → **Install from VSIX…** → выберите файл.

Для разработки откройте эту папку в редакторе и нажмите **F5** (Extension Development Host).

### Разработка

1. `npm install`
2. `npm run compile` или `npm run watch` (пересборка TypeScript при изменениях)
3. **F5** — отладка расширения

### Установка из исходников (повтор)

```bash
npm run compile
npx --yes @vscode/vsce package
```

Затем **Install from VSIX** для полученного `.vsix`.

### Идентификаторы команд

- `ast-index.installAstIndex` — промпт в буфер + попытка открыть чат (только кнопка в заголовке панели Watch)
- `ast-index.rebuild` — новый терминал, `ast-index rebuild`
- `ast-index.start` — новый терминал, `ast-index watch`

Идентификатор расширения (поле `name` в `package.json`): **`ast-index`**.

---

## Cursor: правила для агента (user rules)

Чтобы ассистент использовал `ast-index` вместо медленного полного перебора файлов, добавьте инструкцию в правила.

### Глобальные правила (для всех проектов)

1. **File → Preferences → Cursor Settings** (или **Ctrl+,** и раздел Cursor).
2. Раздел **Rules** / **Rules for AI** (название может отличаться).
3. Пример текста:

```text
Use the ast-index CLI for fast code search instead of grep/find where appropriate.
In a new project, run `ast-index rebuild` before first use; after substantial code changes, run `ast-index update`.
Commands include: ast-index search, class, symbol, implementations, usages, callers, outline, file, deps, and more (see `ast-index --help`).
```

### Правила в репозитории

В корне проекта: каталог `.cursor` и файл правил, например `.cursor/rules/ast-index.mdc`, с тем же смыслом.

Подробности по интеграции с AI и плагинам для Claude Code: [README upstream](https://github.com/defendend/Claude-ast-index-search).

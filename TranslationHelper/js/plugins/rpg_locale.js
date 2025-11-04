//=============================================================================
// rpg_locale.js
// VERSI 1.5.0
//=============================================================================

/*:
 * @plugindesc v1.5.0 Multi-language support using i18n mapping files.
 * @author TranslatorHelper (with modifications)
 *
 * @param Available Languages
 * @desc Comma-separated language codes (e.g., ja,en,id)
 * @default ja,en,id
 *
 * @param Language Names
 * @desc Comma-separated display names (e.g., 日本語,English,Indonesian)
 * @default 日本語,English,Indonesian
 *
 * @param Default Language
 * @desc Default language code (matches original data files)
 * @default ja
 *
 * @param Locale Folder Path
 * @desc Path to i18n files relative to data folder
 * @default locales
 *
 * @param Option Name
 * @desc Text displayed in Options menu for language selection
 * @default Language
 *
 * @param Enable Word Wrap
 * @type boolean
 * @desc Enable word wrap for long descriptions and text
 * @default true
 *
 * @param Preserve Manual Line Breaks
 * @type boolean
 * @desc In Show Text, preserve manual line breaks (true) or reflow all text (false)
 * @default false
 *
 * @help
 * ============================================================================
 * Language Switcher Plugin - i18n Mode (v1.5.0)
 * ============================================================================
 *
 * This plugin enables multi-language support by loading translation files
 * from ./data/locales/ folder.
 *
 * === File Structure ===
 *
 * data/
 * ├── Actors.json          (Original - Default language)
 * ├── Items.json
 * ├── Map001.json
 * ├── Troops.json
 * └── locale/
 *     ├── Actors_i18n.json
 *     ├── Items_i18n.json
 *     ├── Map001_i18n.json
 *     └── Troops_i18n.json
 *
 * === i18n File Format ===
 *
 * {
 *   "en": { "1": { "name": "Harold", "nickname": "The Hero" } },
 *   "id": { "1": { "name": "Harold", "nickname": "Si Pahlawan" } },
 *   "jp": { "1": { "name": "ハロルド", "nickname": "勇者" } }
 * }
 *
 * === Usage ===
 *
 * 1. Generate i18n files using TranslatorHelper index.html
 * 2. Save to ./data/locale/ folder
 * 3. Install this plugin in RPG Maker
 * 4. Configure parameters (languages, names)
 * 5. Playtest - Language option appears in Options menu
 *
 * === Plugin Commands ===
 *
 * SetLanguage en       # Switch to English
 * SetLanguage id       # Switch to Indonesian
 *
 * === Script Calls ===
 *
 * $gameSystem.getLanguage()          // Get current language
 * $gameSystem.setLanguage('id')      // Set language
 * LanguageSwitcher.getAvailableLanguages()  // Get list
 *
 * ============================================================================
 */

(function () {
    "use strict";

    // ============================================
    // Parameters
    // ============================================

    const parameters = PluginManager.parameters("rpg_locale");
    var paramAvailableLanguages = parameters["Available Languages"].split(",").map((s) => s.trim());
    var paramLanguageNames = parameters["Language Names"].split(",").map((s) => s.trim());
    var paramDefaultLanguage = parameters["Default Language"] || "ja";
    var paramLocaleFolderPath = parameters["Locale Folder Path"] || "locales";
    var paramOptionName = parameters["Option Name"] || "Language";
    var paramEnableWordWrap = parameters["Enable Word Wrap"] === "true";
    var paramPreserveManualLineBreaks = parameters["Preserve Manual Line Breaks"] === "false";

    // ============================================
    // Global Namespace
    // ============================================

    window.LanguageSwitcher = {
        i18nData: {},
        currentLanguage: paramDefaultLanguage,
        pendingLanguage: null,
        originalDataSystem: null,

        getAvailableLanguages: function () {
            return paramAvailableLanguages;
        },

        getLanguageNames: function () {
            return paramLanguageNames;
        },

        getCurrentLanguage: function () {
            return this.currentLanguage;
        },

        /**
         * Generic helper function to retrieve translations
         * @param {string} dataType - File name (e.g., "Actors", "System", "Map001", "Troops")
         * @param {string[]} path - Array path (e.g., ["1", "name"] or ["terms", "basic", 0])
         * @param {*} fallback - Default value if not found
         */
        getTranslation: function (dataType, path, fallback) {
            const lang = this.currentLanguage;
            if (lang === paramDefaultLanguage) {
                return fallback;
            }

            let data = this.i18nData[dataType];
            if (!data) return fallback;

            data = data[lang];
            if (!data) return fallback;

            let value = data;
            try {
                for (const key of path) {
                    if (value === undefined || value === null) {
                        return fallback;
                    }
                    value = value[key];
                }
            } catch (e) {
                return fallback;
            }

            // Return {{NEWLINE}} as \n before return
            if (typeof value === "string") {
                value = value.replace(/\{\{NEWLINE\}\}/g, "\n");
            }

            return value !== undefined && value !== null ? value : fallback;
        },

        /**
         * Word wrap text to fit within specified width
         * @param {string} text - Text to wrap
         * @param {number} maxWidth - Maximum width in pixels
         * @param {Window_Base} window - Window object for text measurement
         * @returns {string} - Text with \n inserted for line breaks
         */
        wordWrap: function (text, maxWidth, window) {
            if (!paramEnableWordWrap || !text) return text;

            // Convert escape characters first
            const processedText = window.convertEscapeCharacters(text);
            const words = processedText.split(" ");
            const lines = [];
            let currentLine = "";

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const testLine = currentLine ? currentLine + " " + word : word;
                const testWidth = window.textWidth(testLine);

                if (testWidth > maxWidth && currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }

            if (currentLine) {
                lines.push(currentLine);
            }

            return lines.join("\n");
        },

        /**
         * Advanced word wrap for message box
         * Handles both character-based (CJK) and word-based (Latin) wrapping
         * @param {string} text - Text to wrap
         * @param {boolean} hasFace - Whether message has a face image
         * @returns {string} - Text with \n inserted for line breaks
         */
        messageWordWrap: function (text, hasFace) {
            if (!paramEnableWordWrap || !text) return text;

            // Create a temporary window for text measurement
            const tempWindow = SceneManager._scene._messageWindow;
            if (!tempWindow) return text;

            // Calculate max width (window width - padding - face width if applicable)
            const faceWidth = hasFace ? 168 : 0;
            const padding = tempWindow.standardPadding() * 2;
            const maxWidth = tempWindow.width - padding - faceWidth - 12; // 12 for extra margin

            // If preserving manual line breaks, process each line separately
            if (paramPreserveManualLineBreaks) {
                const inputLines = text.split("\n");
                const wrappedLines = [];

                inputLines.forEach((line) => {
                    if (!line) {
                        wrappedLines.push("");
                        return;
                    }

                    // Wrap this line
                    const result = this._wrapSingleLine(line, maxWidth, tempWindow);
                    wrappedLines.push(result);
                });

                return wrappedLines.join("\n");
            } else {
                // Reflow all text: remove existing line breaks and treat as one continuous text
                const continuousText = text.replace(/\n/g, " ");
                return this._wrapSingleLine(continuousText, maxWidth, tempWindow);
            }
        },

        /**
         * Wrap a single line of text
         * @param {string} text - Text to wrap (single line)
         * @param {number} maxWidth - Maximum width in pixels
         * @param {Window_Base} window - Window for text measurement
         * @returns {string} - Wrapped text
         */
        _wrapSingleLine: function (text, maxWidth, window) {
            const lines = [];
            let currentLine = "";
            let i = 0;

            while (i < text.length) {
                const char = text[i];

                // Check if next character would exceed width
                const testLine = currentLine + char;
                const testWidth = window.textWidth(testLine);

                if (testWidth > maxWidth && currentLine.length > 0) {
                    // Line would be too long, need to break

                    // Check if current character is CJK (Chinese/Japanese/Korean)
                    if (this.isCJKChar(char)) {
                        // CJK: Character-based breaking (break immediately)
                        lines.push(currentLine);
                        currentLine = char;
                    } else {
                        // Latin/Indonesian/English: Word-based breaking
                        // Try to find last space in current line for word-based breaking
                        const lastSpaceIndex = currentLine.lastIndexOf(" ");
                        if (lastSpaceIndex > 0 && lastSpaceIndex > currentLine.length * 0.5) {
                            // Break at last space
                            lines.push(currentLine.substring(0, lastSpaceIndex));
                            currentLine = currentLine.substring(lastSpaceIndex + 1) + char;
                        } else {
                            // No good break point, just break here
                            lines.push(currentLine);
                            currentLine = char === " " ? "" : char;
                        }
                    }
                } else {
                    currentLine += char;
                }

                i++;
            }

            if (currentLine.length > 0) {
                lines.push(currentLine);
            }

            return lines.join("\n");
        },

        /**
         * Check if character is CJK (Chinese, Japanese, Korean)
         * @param {string} char - Character to check
         * @returns {boolean}
         */
        isCJKChar: function (char) {
            const code = char.charCodeAt(0);
            return (
                (code >= 0x3040 && code <= 0x309f) || // Hiragana
                (code >= 0x30a0 && code <= 0x30ff) || // Katakana
                (code >= 0x4e00 && code <= 0x9fff) || // CJK Unified Ideographs
                (code >= 0x3400 && code <= 0x4dbf) || // CJK Extension A
                (code >= 0xac00 && code <= 0xd7af) || // Hangul Syllables
                (code >= 0xff00 && code <= 0xffef) // Fullwidth Forms
            );
        },

        /**
         * Patch $dataSystem with translated values
         */
        patchDataSystem: function () {
            if (!this.originalDataSystem) {
                if ($dataSystem) {
                    this.originalDataSystem = JSON.parse(JSON.stringify($dataSystem));
                    console.log("LanguageSwitcher: $dataSystem backup created.");
                } else {
                    console.warn("LanguageSwitcher: $dataSystem not ready for backup.");
                    return;
                }
            }

            const lang = this.currentLanguage;

            const fieldsToPatch = [
                "gameTitle",
                "currencyUnit",
                "armorTypes",
                "elements",
                "equipTypes",
                "skillTypes",
                "weaponTypes",
            ];

            // Reset to original data
            for (const field of fieldsToPatch) {
                if (this.originalDataSystem[field] !== undefined) {
                    $dataSystem[field] = this.originalDataSystem[field];
                }
            }
            $dataSystem.terms = this.originalDataSystem.terms;

            // Apply translation if not default language
            if (lang !== paramDefaultLanguage) {
                const i18nSys = this.i18nData.System;
                if (i18nSys && i18nSys[lang]) {
                    const translatedSys = i18nSys[lang];
                    for (const field of fieldsToPatch) {
                        if (translatedSys[field] !== undefined) {
                            $dataSystem[field] = translatedSys[field];
                        }
                    }
                }
            }
            console.log("LanguageSwitcher: $dataSystem patched for language:", lang);
        },
    };

    // ============================================
    // Load i18n Files
    // ============================================

    const _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        _DataManager_loadDatabase.call(this);
        this.loadI18nFiles();
    };

    DataManager.loadI18nFiles = function () {
        const i18nFiles = [
            "Actors",
            "Classes",
            "Skills",
            "Items",
            "Weapons",
            "Armors",
            "Enemies",
            "Troops",
            "States",
            "Animations",
            "Tilesets",
            "CommonEvents",
            "System",
            "MapInfos",
        ];

        i18nFiles.forEach((filename) => {
            this.loadI18nFile(filename);
        });
    };

    DataManager.loadI18nFile = function (filename) {
        const xhr = new XMLHttpRequest();
        const url = "data/" + paramLocaleFolderPath + "/" + filename + "_i18n.json";

        xhr.open("GET", url);
        xhr.overrideMimeType("application/json");
        xhr.onload = function () {
            if (xhr.status < 400) {
                try {
                    LanguageSwitcher.i18nData[filename] = JSON.parse(xhr.responseText);
                    console.log("Loaded i18n:", filename);
                } catch (e) {
                    console.warn("Failed to parse i18n file:", filename, e);
                }
            }
        };
        xhr.onerror = function () {
            // Silent fail for files that do not exist
        };
        xhr.send();
    };

    DataManager.loadMapI18n = function (mapId) {
        if (mapId === 0) return;
        const filename = "Map%1".format(mapId.padZero(3));
        if (!LanguageSwitcher.i18nData[filename]) {
            const xhr = new XMLHttpRequest();
            const url = "data/" + paramLocaleFolderPath + "/" + filename + "_i18n.json";

            xhr.open("GET", url);
            xhr.overrideMimeType("application/json");
            xhr.onload = function () {
                if (xhr.status < 400) {
                    try {
                        LanguageSwitcher.i18nData[filename] = JSON.parse(xhr.responseText);
                        console.log("Loaded map i18n:", filename);
                    } catch (e) {
                        console.warn("Failed to parse map i18n:", filename, e);
                    }
                }
            };
            xhr.onerror = function () {
                // Silent fail
            };
            xhr.send();
        }
    };

    // ============================================
    // Game_System: Language Management
    // ============================================

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);

        // FIX: Read from ConfigManager, NOT from obsolete pendingLanguage
        const savedLanguage = ConfigManager.language || paramDefaultLanguage;

        this._language = savedLanguage;
        LanguageSwitcher.currentLanguage = savedLanguage;
        LanguageSwitcher.pendingLanguage = null; // Remove pending

        LanguageSwitcher.patchDataSystem();
    };

    Game_System.prototype.getLanguage = function () {
        if (!this._language) {
            this._language = paramDefaultLanguage;
        }
        return this._language;
    };

    Game_System.prototype.setLanguage = function (languageCode) {
        if (paramAvailableLanguages.includes(languageCode)) {
            this._language = languageCode;
            LanguageSwitcher.currentLanguage = languageCode;

            LanguageSwitcher.patchDataSystem();

            console.log("Language changed to:", languageCode);
        } else {
            console.warn("Language not available:", languageCode);
        }
    };

    // ============================================
    // Scene_Boot: Backup $dataSystem
    // ============================================

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);

        if (!LanguageSwitcher.originalDataSystem) {
            LanguageSwitcher.originalDataSystem = JSON.parse(JSON.stringify($dataSystem));
            console.log("LanguageSwitcher: $dataSystem backup created.");
        }

        LanguageSwitcher.patchDataSystem();
    };

    // ============================================
    // TextManager: Traslation from System.json
    // ============================================

    const _TextManager_basic = TextManager.basic;
    TextManager.basic = function (basicId) {
        const original = _TextManager_basic.call(this, basicId);
        return LanguageSwitcher.getTranslation("System", ["terms", "basic", basicId], original);
    };

    const _TextManager_command = TextManager.command;
    TextManager.command = function (commandId) {
        const original = _TextManager_command.call(this, commandId);
        return LanguageSwitcher.getTranslation("System", ["terms", "commands", commandId], original);
    };

    const _TextManager_param = TextManager.param;
    TextManager.param = function (paramId) {
        const original = _TextManager_param.call(this, paramId);
        return LanguageSwitcher.getTranslation("System", ["terms", "params", paramId], original);
    };

    const _TextManager_message = TextManager.message;
    TextManager.message = function (messageId) {
        const original = _TextManager_message.call(this, messageId);
        return LanguageSwitcher.getTranslation("System", ["terms", "messages", messageId], original);
    };

    // ============================================
    // Override: Game_Actor
    // ============================================

    const _Game_Actor_name = Game_Actor.prototype.name;
    Game_Actor.prototype.name = function () {
        const original = _Game_Actor_name.call(this);
        return LanguageSwitcher.getTranslation("Actors", [this.actorId().toString(), "name"], original);
    };

    const _Game_Actor_nickname = Game_Actor.prototype.nickname;
    Game_Actor.prototype.nickname = function () {
        const original = _Game_Actor_nickname.call(this);
        return LanguageSwitcher.getTranslation("Actors", [this.actorId().toString(), "nickname"], original);
    };

    const _Game_Actor_profile = Game_Actor.prototype.profile;
    Game_Actor.prototype.profile = function () {
        const original = _Game_Actor_profile.call(this);
        return LanguageSwitcher.getTranslation("Actors", [this.actorId().toString(), "profile"], original);
    };

    const _Game_Actor_note = Game_Actor.prototype.note;
    Game_Actor.prototype.note = function () {
        const original = _Game_Actor_note.call(this);
        return LanguageSwitcher.getTranslation("Actors", [this.actorId().toString(), "note"], original);
    };

    // ============================================
    // Override: Data Objects (Items, Skills, etc.)
    // ============================================

    // (Including Database)
    const _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function (item, x, y, width) {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === paramDefaultLanguage || !item) {
            _Window_Base_drawItemName.call(this, item, x, y, width);
            return;
        }

        width = width || 312;
        if (item) {
            let dataType = null;
            if (DataManager.isItem(item)) dataType = "Items";
            else if (DataManager.isWeapon(item)) dataType = "Weapons";
            else if (DataManager.isArmor(item)) dataType = "Armors";
            else if (DataManager.isSkill(item)) dataType = "Skills";
            // ==========================================================
            // Bug fix: isState, isClass, and isEnemy do not exist
            // ==========================================================
            else if (item.restriction !== undefined) dataType = "States"; // Using 'restriction' property to check State
            else if (item.expParams !== undefined) dataType = "Classes"; // Using 'expParams' property to check Class
            else if (item.exp !== undefined) dataType = "Enemies"; // Using 'exp' property to check Enemy
            // ==========================================================
            // End of bug fix
            // ==========================================================

            let translatedName = item.name;
            if (dataType) {
                translatedName = LanguageSwitcher.getTranslation(dataType, [item.id.toString(), "name"], item.name);
            }

            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(translatedName, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

    // ============================================
    // Window_Status: Translate Actor Class
    // ============================================

    const _Window_Status_drawActorClass = Window_Status.prototype.drawActorClass;
    Window_Status.prototype.drawActorClass = function (x, y) {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === paramDefaultLanguage) {
            _Window_Status_drawActorClass.call(this, x, y); // Call original
            return;
        }

        const actorClass = this._actor.currentClass();
        if (!actorClass) {
            _Window_Status_drawActorClass.call(this, x, y); // Call original if no class
            return;
        }

        // 1. Get "Class" label (this is already translated by TextManager)
        const vocab = TextManager.basic(5);

        // 2. Get manually translated Class name
        const className = LanguageSwitcher.getTranslation(
            "Classes",
            [actorClass.id.toString(), "name"],
            actorClass.name
        );

        // 3. Draw the translated text
        this.resetTextColor();
        this.drawText(vocab, x, y, 160);
        this.drawText(className, x + 160, y, 160);
    };

    // ============================================
    // Window_Status: Translate Actor Profile with Word Wrap
    // ============================================

    const _Window_Status_drawProfile = Window_Status.prototype.drawProfile;
    Window_Status.prototype.drawProfile = function (x, y) {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === paramDefaultLanguage) {
            _Window_Status_drawProfile.call(this, x, y);
            return;
        }

        const actorId = this._actor.actorId();
        const originalProfile = this._actor.profile();
        const translatedProfile = LanguageSwitcher.getTranslation(
            "Actors",
            [actorId.toString(), "profile"],
            originalProfile
        );

        // Apply word wrap if enabled
        const maxWidth = this.contentsWidth() - x;
        const wrappedProfile = LanguageSwitcher.wordWrap(translatedProfile, maxWidth, this);

        this.drawTextEx(wrappedProfile, x, y);
    };

    // ============================================
    // Window_Help: Word Wrap for Item/Skill/Weapon/Armor Descriptions
    // ============================================

    const _Window_Help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function (item) {
        if (!item || !paramEnableWordWrap) {
            _Window_Help_setItem.call(this, item);
            return;
        }

        // Get original description
        const originalDesc = item.description || "";
        let translatedDesc = originalDesc;

        // Translate if not default language
        const lang = LanguageSwitcher.currentLanguage;
        if (lang !== paramDefaultLanguage && item.id) {
            let dataType = "";

            // Determine data type based on item meta or structure
            if (DataManager.isItem(item)) {
                dataType = "Items";
            } else if (DataManager.isWeapon(item)) {
                dataType = "Weapons";
            } else if (DataManager.isArmor(item)) {
                dataType = "Armors";
            } else if (DataManager.isSkill(item)) {
                dataType = "Skills";
            }

            if (dataType) {
                translatedDesc = LanguageSwitcher.getTranslation(
                    dataType,
                    [item.id.toString(), "description"],
                    originalDesc
                );
            }
        }

        // Apply word wrap
        const maxWidth = this.contentsWidth() - this.textPadding() * 2;
        const wrappedDesc = LanguageSwitcher.wordWrap(translatedDesc, maxWidth, this);

        this.setText(wrappedDesc);
    };

    // ============================================
    // Override: MapInfos
    // ============================================

    const _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function (object) {
        _DataManager_onLoad.call(this, object);
        if (object === $dataMapInfos) {
            if (!this._i18nOriginalMapInfos) {
                this._i18nOriginalMapInfos = JSON.parse(JSON.stringify($dataMapInfos));
            }
            this.translateMapInfos();
        }
    };

    DataManager.translateMapInfos = function () {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === paramDefaultLanguage) {
            if (this._i18nOriginalMapInfos) {
                $dataMapInfos = JSON.parse(JSON.stringify(this._i18nOriginalMapInfos));
            }
            return;
        }

        const i18nData = LanguageSwitcher.i18nData["MapInfos"];
        if (!i18nData || !i18nData[lang]) return;

        for (let i = 1; i < $dataMapInfos.length; i++) {
            const original = this._i18nOriginalMapInfos[i];
            if ($dataMapInfos[i] && original) {
                $dataMapInfos[i].name = LanguageSwitcher.getTranslation(
                    "MapInfos",
                    [i.toString(), "name"],
                    original.name
                );
            }
        }
    };

    // ============================================
    // Override: Map Display Name
    // ============================================

    const _Game_Map_displayName = Game_Map.prototype.displayName;
    Game_Map.prototype.displayName = function () {
        const original = _Game_Map_displayName.call(this);
        const mapId = this._mapId;
        if (mapId === 0) return original;

        const filename = "Map%1".format(mapId.padZero(3));
        return LanguageSwitcher.getTranslation(filename, ["displayName"], original);
    };

    const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function () {
        if (this.isTransferring()) {
            DataManager.loadMapI18n($gamePlayer.newMapId());
        }
        _Game_Player_performTransfer.call(this);
    };

    // ============================================
    // Override: Game_Event Name
    // ============================================

    const _Game_Event_name = Game_Event.prototype.name;
    Game_Event.prototype.name = function () {
        const original = _Game_Event_name.call(this);
        const mapId = this._mapId;
        if (mapId === 0) return original;

        const filename = "Map%1".format(mapId.padZero(3));
        const path = [this._eventId.toString(), "name"];

        return LanguageSwitcher.getTranslation(filename, path, original);
    };

    // ============================================
    // Override: Event Commands (Dialog, Choices, Battle)
    // ============================================

    /**
     * Helper function for getting correct path as translation_builder_i18n.js
     * @param {Game_Interpreter} interpreter - Interpreter instance
     * @param {number} commandIndex - Current Index command (SHOULD definde explicitly)
     * @param {number} paramIndex - Index parameter which is want to be accessed
     */
    function getEventCommandPath(interpreter, commandIndex, paramIndex) {
        const mapId = interpreter._mapId;
        const eventId = interpreter._eventId;

        let dataType;
        let basePath;
        let path;
        let pageIndex = 0; // Default page index

        if (mapId > 0) {
            // ==================
            // 1. MAP EVENT
            // ==================
            dataType = "Map%1".format(mapId.padZero(3));
            basePath = [eventId.toString()];

            // FIX: Get event from $gameMap, NOT interpreter.character(0)
            const mapEvent = $gameMap.event(eventId);
            if (mapEvent && mapEvent._pageIndex !== undefined) {
                pageIndex = mapEvent._pageIndex;
            }

            path = [
                ...basePath,
                "pages",
                pageIndex.toString(),
                "list",
                commandIndex.toString(),
                "parameters",
                paramIndex.toString(),
            ];
        } else {
            // ==================
            // 2. TROOP or COMMON EVENT
            // ==================
            if ($gameTroop && $gameTroop._troopId > 0 && $gameTroop._enemies.length > 0) {
                // ==================
                // 2a. TROOP EVENT
                // ==================
                dataType = "Troops";
                basePath = [$gameTroop._troopId.toString()];

                // Dapatkan page index dari $gameTroop
                pageIndex = $gameTroop._pageIndex;

                path = [
                    ...basePath,
                    "pages",
                    pageIndex.toString(),
                    "list",
                    commandIndex.toString(),
                    "parameters",
                    paramIndex.toString(),
                ];
            } else {
                // ==================
                // 2b. COMMON EVENT
                // ==================
                dataType = "CommonEvents";
                basePath = [eventId.toString()];

                // Common Event doesn't have "pages"
                path = [...basePath, "list", commandIndex.toString(), "parameters", paramIndex.toString()];
            }
        }

        return { dataType, path };
    }

    // ============================================
    // Override command 101 (Show Text)
    // ============================================
    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function () {
        const lang = LanguageSwitcher.currentLanguage;

        if (lang === paramDefaultLanguage) {
            return _Game_Interpreter_command101.call(this); // Panggil asli
        }

        if (!$gameMessage.isBusy()) {
            // Setup message properties (same as original command101)
            $gameMessage.setFaceImage(this._params[0], this._params[1]);
            $gameMessage.setBackground(this._params[2]);
            $gameMessage.setPositionType(this._params[3]);

            // Check if message has face for word wrap calculation
            const hasFace = this._params[0] !== "";

            // Collect all text lines first
            const allLines = [];

            // Loop through all text lines (command 401)
            while (this.nextEventCode() === 401) {
                this._index++; // Move to next command (401)

                const currentCommand = this.currentCommand();
                const originalText = currentCommand.parameters[0];

                // Get translation for this specific 401 command
                const { dataType, path } = getEventCommandPath(this, this._index, 0);
                const translatedText = LanguageSwitcher.getTranslation(dataType, path, originalText);

                allLines.push(translatedText);
            }

            // Join all lines and apply word wrap
            const fullText = allLines.join("\n");
            const wrappedText = LanguageSwitcher.messageWordWrap(fullText, hasFace);

            // Split wrapped text back into lines and add to message
            const wrappedLines = wrappedText.split("\n");
            wrappedLines.forEach((line) => {
                $gameMessage.add(line);
            });

            // Handle subsequent commands (choices, input, etc.)
            switch (this.nextEventCode()) {
                case 102: // Show Choices
                    this._index++; // Advance to command 102

                    // Save command 102 index before translate
                    const choiceCommandIndex = this._index;

                    // Copy translation logic from command102 HERE
                    const choiceParams = this.currentCommand().parameters;
                    const originalChoices = choiceParams[0];
                    const translatedChoices = [];

                    // Get base path for choices array
                    // getEventCommandPath will generate path like: [..., "parameters", "0"]
                    const { dataType: choiceDataType, path: choiceBasePath } = getEventCommandPath(
                        this,
                        choiceCommandIndex,
                        0
                    );

                    originalChoices.forEach((choice, choiceIndex) => {
                        // Create path for each choice: ...parameters[0][choiceIndex]
                        const choicePath = [...choiceBasePath, choiceIndex.toString()];
                        const translatedChoice = LanguageSwitcher.getTranslation(choiceDataType, choicePath, choice);
                        translatedChoices.push(translatedChoice);
                    });

                    // Create new parameters with translated choices
                    const translatedChoiceParams = [...choiceParams];
                    translatedChoiceParams[0] = translatedChoices;

                    this.setupChoices(translatedChoiceParams);
                    break;

                case 103: // Input Number
                    this._index++;
                    this.setupNumInput(this.currentCommand().parameters);
                    break;
                case 104: // Select Item
                    this._index++;
                    this.setupItemChoice(this.currentCommand().parameters);
                    break;
            }

            this._index++;
            this.setWaitMode("message");
            // ==========================================================
            // END OF FIX
            // ==========================================================
        }
        return false;
    };

    // ============================================
    // Override command 105 (Show Scrolling Text)
    // ============================================
    const _Game_Interpreter_command105 = Game_Interpreter.prototype.command105;
    Game_Interpreter.prototype.command105 = function () {
        const lang = LanguageSwitcher.currentLanguage;

        if (lang === paramDefaultLanguage) {
            return _Game_Interpreter_command105.call(this); // Panggil asli
        }

        if (!$gameMessage.isBusy()) {
            // Setup from original command105
            $gameMessage.setScroll(this._params[0], this._params[1]);

            // Translate text lines (command 405)
            while (this.nextEventCode() === 405) {
                this._index++; // Advance to next command 405

                const nextCommand = this.currentCommand();
                const nextParams = nextCommand.parameters;

                // Get path for command 405 (this._index is already correct)
                const { dataType, path } = getEventCommandPath(this, this._index, 0);
                const originalText = nextParams[0];
                const translatedText = LanguageSwitcher.getTranslation(dataType, path, originalText);
                $gameMessage.add(translatedText);
            }

            this._index++;
            this.setWaitMode("message");
        }
        return false;
    };

    // Override command 402 (When...)
    const _Game_Interpreter_command402 = Game_Interpreter.prototype.command402;
    Game_Interpreter.prototype.command402 = function () {
        const lang = LanguageSwitcher.currentLanguage;

        if (lang === paramDefaultLanguage) {
            return _Game_Interpreter_command402.call(this);
        }

        // Command 402 checks if the selected choice matches this._params[0] (choice index)
        // Translation is already handled in command102, so just call original
        return _Game_Interpreter_command402.call(this);
    }; // NEW: Override command 102 (Show Choices)
    const _Game_Interpreter_command102 = Game_Interpreter.prototype.command102;
    Game_Interpreter.prototype.command102 = function () {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === paramDefaultLanguage) {
            return _Game_Interpreter_command102.call(this);
        }

        // This function now ONLY runs if 102 is called WITHOUT 401
        if (!$gameMessage.isBusy()) {
            const originalChoices = this._params[0];
            const translatedChoices = [];

            // Get base path for choices array
            // getEventCommandPath will generate path like: [..., "parameters", "0"]
            const { dataType, path: basePath } = getEventCommandPath(this, this._index, 0);

            originalChoices.forEach((choice, choiceIndex) => {
                // Create path for each choice: ...parameters[0][choiceIndex]
                const choicePath = [...basePath, choiceIndex.toString()];
                const translatedChoice = LanguageSwitcher.getTranslation(dataType, choicePath, choice);
                translatedChoices.push(translatedChoice);
            });

            // Create new parameters with translated choices
            const translatedParams = [...this._params];
            translatedParams[0] = translatedChoices;

            // Call setupChoices directly with translated parameters
            this.setupChoices(translatedParams);
            this._index++;
            this.setWaitMode("message");
        }
        return false;
    };

    // ============================================
    // Options Menu: Add Language Option
    // ============================================

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function () {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand(paramOptionName, "language");
    };

    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        const symbol = this.commandSymbol(index);
        if (symbol === "language") {
            const currentLang = $gameSystem.getLanguage();
            const langIndex = paramAvailableLanguages.indexOf(currentLang);
            return paramLanguageNames[langIndex] || currentLang;
        }
        return _Window_Options_statusText.call(this, index);
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        const index = this.index();
        const symbol = this.commandSymbol(index);

        if (symbol === "language") {
            this.changeLanguage(1);
        } else {
            _Window_Options_processOk.call(this);
        }
    };

    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function (wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);

        if (symbol === "language") {
            this.changeLanguage(1);
        } else {
            _Window_Options_cursorRight.call(this, wrap);
        }
    };

    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function (wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);

        if (symbol === "language") {
            this.changeLanguage(-1);
        } else {
            _Window_Options_cursorLeft.call(this, wrap);
        }
    };

    Window_Options.prototype.changeLanguage = function (direction) {
        const currentLang = $gameSystem.getLanguage();
        const currentIndex = paramAvailableLanguages.indexOf(currentLang);
        const newIndex = (currentIndex + direction + paramAvailableLanguages.length) % paramAvailableLanguages.length;
        const newLang = paramAvailableLanguages[newIndex];

        $gameSystem.setLanguage(newLang);

        if (DataManager._i18nOriginalMapInfos) {
            DataManager.translateMapInfos();
        }

        this.refresh();

        if (SceneManager._scene) {
            if (SceneManager._scene._windowLayer) {
                SceneManager._scene._windowLayer.children.forEach((window) => {
                    if (window && typeof window.refresh === "function") {
                        try {
                            window.refresh();
                        } catch (e) {
                            // Silent fail for windows that cannot be refreshed
                        }
                    }
                });
            }
            if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._mapNameWindow) {
                SceneManager._scene._mapNameWindow.refresh();
            }
        }

        SoundManager.playCursor();
    };

    // ============================================
    // Config Manager: Save/Load Language Preference
    // ============================================

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        const config = _ConfigManager_makeData.call(this);
        // Make sure we save $gameSystem IF exists, otherwise save last setting
        config.language = $gameSystem ? $gameSystem.getLanguage() : ConfigManager.language;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        _ConfigManager_applyData.call(this, config);

        // Save in ConfigManager itself, NOT in global LanguageSwitcher
        ConfigManager.language = config.language || paramDefaultLanguage;

        // Set global pending/current for THIS Session
        LanguageSwitcher.pendingLanguage = ConfigManager.language;
        LanguageSwitcher.currentLanguage = ConfigManager.language;
    };

    // ============================================
    // Plugin Commands
    // ============================================

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === "SetLanguage" && args[0]) {
            $gameSystem.setLanguage(args[0]);
        }
    };
})();

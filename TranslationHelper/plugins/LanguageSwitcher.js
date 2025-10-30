//=============================================================================
// LanguageSwitcher.js
// VERSI 1.2.0 (Perbaikan Show Choices & Troops)
//=============================================================================

/*:
 * @plugindesc v1.2.0 Multi-language support using i18n mapping files.
 * @author TranslatorHelper (with modifications)
 *
 * @param availableLanguages
 * @text Available Languages
 * @desc Comma-separated language codes (e.g., ja,en,id)
 * @default ja,en,id
 *
 * @param languageNames
 * @text Language Display Names
 * @desc Comma-separated display names (e.g., 日本語,English,Indonesian)
 * @default 日本語,English,Indonesian
 *
 * @param defaultLanguage
 * @text Default Language
 * @desc Default language code (matches original data files)
 * @default ja
 *
 * @param localeFolderPath
 * @text Locale Folder Path
 * @desc Path to i18n files relative to data folder
 * @default locale
 *
 * @param optionName
 * @text Option Menu Text
 * @desc Text displayed in Options menu for language selection
 * @default Language
 *
 * @help
 * ============================================================================
 * Language Switcher Plugin - i18n Mode (v1.2.0)
 * ============================================================================
 *
 * This plugin enables multi-language support by loading translation files
 * from ./data/locale/ folder.
 *
 * === Changelog v1.2.0 ===
 * - Added Show Choices (command 102) translation support
 * - Added Troops battle events translation support
 * - Fixed path consistency with translation_builder_i18n.js
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
 * 1. Generate i18n files using TranslatorHelper_i18n.html
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

    const parameters = PluginManager.parameters("LanguageSwitcher");
    const availableLanguages = parameters["availableLanguages"].split(",").map((s) => s.trim());
    const languageNames = parameters["languageNames"].split(",").map((s) => s.trim());
    const defaultLanguage = parameters["defaultLanguage"] || "ja";
    const localeFolderPath = parameters["localeFolderPath"] || "locale";
    const optionName = parameters["optionName"] || "Language";

    // ============================================
    // Global Namespace
    // ============================================

    window.LanguageSwitcher = {
        i18nData: {},
        currentLanguage: defaultLanguage,
        pendingLanguage: null,
        originalDataSystem: null,

        getAvailableLanguages: function () {
            return availableLanguages;
        },

        getLanguageNames: function () {
            return languageNames;
        },

        getCurrentLanguage: function () {
            return this.currentLanguage;
        },

        /**
         * Fungsi helper generik untuk mengambil terjemahan
         * @param {string} dataType - Nama file (cth: "Actors", "System", "Map001", "Troops")
         * @param {string[]} path - Array path (cth: ["1", "name"] or ["terms", "basic", 0])
         * @param {*} fallback - Nilai default jika tidak ditemukan
         */
        getTranslation: function (dataType, path, fallback) {
            const lang = this.currentLanguage;
            if (lang === defaultLanguage) {
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

            return value !== undefined && value !== null ? value : fallback;
        },

        /**
         * Mem-patch $dataSystem dengan nilai-nilai yang diterjemahkan
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

            // Reset ke data asli
            for (const field of fieldsToPatch) {
                if (this.originalDataSystem[field] !== undefined) {
                    $dataSystem[field] = this.originalDataSystem[field];
                }
            }
            $dataSystem.terms = this.originalDataSystem.terms;

            // Terapkan terjemahan jika bukan bahasa default
            if (lang !== defaultLanguage) {
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
        const url = "data/" + localeFolderPath + "/" + filename + "_i18n.json";

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
            // Silent fail untuk file yang tidak ada
        };
        xhr.send();
    };

    DataManager.loadMapI18n = function (mapId) {
        if (mapId === 0) return;
        const filename = "Map%1".format(mapId.padZero(3));
        if (!LanguageSwitcher.i18nData[filename]) {
            const xhr = new XMLHttpRequest();
            const url = "data/" + localeFolderPath + "/" + filename + "_i18n.json";

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

        // PERBAIKAN: Baca dari ConfigManager, BUKAN dari pendingLanguage yang usang
        const savedLanguage = ConfigManager.language || defaultLanguage;

        this._language = savedLanguage;
        LanguageSwitcher.currentLanguage = savedLanguage;
        LanguageSwitcher.pendingLanguage = null; // Hapus pending

        LanguageSwitcher.patchDataSystem();
    };

    Game_System.prototype.getLanguage = function () {
        if (!this._language) {
            this._language = defaultLanguage;
        }
        return this._language;
    };

    Game_System.prototype.setLanguage = function (languageCode) {
        if (availableLanguages.includes(languageCode)) {
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
    // TextManager: Terjemahan dari System.json
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

    // (TERMASUK DATABASE)
    const _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function (item, x, y, width) {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === defaultLanguage || !item) {
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
            // PERBAIKAN BUG: isState, isClass, dan isEnemy tidak ada
            // ==========================================================
            else if (item.restriction !== undefined)
                dataType = "States"; // Menggunakan properti 'restriction' untuk cek State
            else if (item.expParams !== undefined)
                dataType = "Classes"; // Menggunakan properti 'expParams' untuk cek Class
            else if (item.exp !== undefined) dataType = "Enemies"; // Menggunakan properti 'exp' untuk cek Enemy
            // ==========================================================
            // AKHIR PERBAIKAN
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
        if (lang === defaultLanguage) {
            _Window_Status_drawActorClass.call(this, x, y); // Panggil asli
            return;
        }

        const actorClass = this._actor.currentClass();
        if (!actorClass) {
            _Window_Status_drawActorClass.call(this, x, y); // Panggil asli jika tidak ada class
            return;
        }

        // 1. Ambil "Class" label (ini sudah diterjemahkan oleh TextManager)
        const vocab = TextManager.basic(5);

        // 2. Dapatkan nama Class yang diterjemahkan secara manual
        const className = LanguageSwitcher.getTranslation(
            "Classes",
            [actorClass.id.toString(), "name"],
            actorClass.name
        );

        // 3. Gambar teks yang sudah diterjemahkan
        this.resetTextColor();
        this.drawText(vocab, x, y, 160);
        this.drawText(className, x + 160, y, 160);
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
        if (lang === defaultLanguage) {
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
     * Helper function untuk mendapatkan path yang sesuai dengan translation_builder_i18n.js
     */
    function getEventCommandPath(interpreter, paramIndex) {
        const mapId = interpreter._mapId;
        const eventId = interpreter._eventId;
        const commandIndex = interpreter._index;

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

            // PERBAIKAN: Dapatkan event dari $gameMap, BUKAN interpreter.character(0)
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

                // Common Event TIDAK memiliki "pages"
                path = [...basePath, "list", commandIndex.toString(), "parameters", paramIndex.toString()];
            }
        }

        return { dataType, path };
    }

    // Override command 401 (Show Text)
    const _Game_Interpreter_command401 = Game_Interpreter.prototype.command401;
    Game_Interpreter.prototype.command401 = function () {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === defaultLanguage) {
            return _Game_Interpreter_command401.call(this); // Panggil asli
        }

        if (!$gameMessage.isBusy()) {
            // ==========================================================
            // PERBAIKAN TOTAL: Replikasi logika asli dari rpg_objects.js
            // ==========================================================

            // Setup dari original command401
            $gameMessage.setFaceImage(this._params[1], this._params[2]);
            $gameMessage.setBackground(this._params[3]);
            $gameMessage.setPositionType(this._params[4]);

            // 1. Terjemahkan baris teks PERTAMA
            let { dataType, path } = getEventCommandPath(this, 0); // paramIndex = 0
            let originalText = this._params[0];
            let translatedText = LanguageSwitcher.getTranslation(dataType, path, originalText);
            $gameMessage.add(translatedText);

            // 2. Replikasi loop asli untuk baris-baris berikutnya
            while (this.nextEventCode() === 401) {
                this._index++; // Maju ke command 401 berikutnya

                const nextCommand = this.commandAt(this._index);
                const nextParams = nextCommand.parameters;

                // Dapatkan path untuk command BARU (this._index sudah benar)
                ({ dataType, path } = getEventCommandPath(this, 0));
                originalText = nextParams[0];
                translatedText = LanguageSwitcher.getTranslation(dataType, path, originalText);
                $gameMessage.add(translatedText);
            }

            // 3. Replikasi switch block krusial dari rpg_objects.js
            switch (this.nextEventCode()) {
                case 102: // Show Choices
                    this._index++; // Maju ke command 102

                    // Salin logika terjemahan dari command102 KEMARI
                    const choiceParams = this.currentCommand().parameters;
                    const originalChoices = choiceParams[0];
                    const translatedChoices = [];

                    // Dapatkan path dasar untuk array pilihan
                    // 'getEventCommandPath(this, 0)' akan menunjuk ke "parameters"[0]
                    const { dataType: choiceDataType, path: choiceBasePath } = getEventCommandPath(this, 0);

                    originalChoices.forEach((choice, choiceIndex) => {
                        // Buat path untuk setiap pilihan: ...parameters[0][choiceIndex]
                        const choicePath = [...choiceBasePath, choiceIndex.toString()];
                        const translatedChoice = LanguageSwitcher.getTranslation(choiceDataType, choicePath, choice);
                        translatedChoices.push(translatedChoice);
                    });

                    // Buat parameter baru dengan pilihan yang sudah diterjemahkan
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
            // AKHIR PERBAIKAN
            // ==========================================================
        }
        return false;
    };

    // Override command 402 (When...)
    const _Game_Interpreter_command402 = Game_Interpreter.prototype.command402;
    Game_Interpreter.prototype.command402 = function () {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === defaultLanguage) {
            return _Game_Interpreter_command402.call(this);
        }

        if (this._params[0] < $gameMessage.choices().length) {
            const originalText = this._params[1];
            const { dataType, path } = getEventCommandPath(this, 1);
            const translatedText = LanguageSwitcher.getTranslation(dataType, path, originalText);

            const originalParams = this._params;
            this._params = [...this._params];
            this._params[1] = translatedText;

            const result = _Game_Interpreter_command402.call(this);

            this._params = originalParams;
            return result;
        }
        return true;
    };

    // BARU: Override command 102 (Show Choices)
    const _Game_Interpreter_command102 = Game_Interpreter.prototype.command102;
    Game_Interpreter.prototype.command102 = function () {
        const lang = LanguageSwitcher.currentLanguage;
        if (lang === defaultLanguage) {
            return _Game_Interpreter_command102.call(this);
        }

        // Fungsi ini sekarang HANYA berjalan jika 102 dipanggil TANPA 401
        if (!$gameMessage.isBusy()) {
            const originalChoices = this._params[0];
            const translatedChoices = [];

            // Dapatkan path dasar untuk array pilihan
            // 'getEventCommandPath(this, 0)' akan menunjuk ke "parameters"[0]
            const { dataType, path: basePath } = getEventCommandPath(this, 0);

            originalChoices.forEach((choice, choiceIndex) => {
                // Buat path untuk setiap pilihan: ...parameters[0][choiceIndex]
                const choicePath = [...basePath, choiceIndex.toString()];
                const translatedChoice = LanguageSwitcher.getTranslation(dataType, choicePath, choice);
                translatedChoices.push(translatedChoice);
            });

            // Modifikasi parameter sementara
            const originalParams = this._params;
            this._params = [...this._params];
            this._params[0] = translatedChoices;

            const result = _Game_Interpreter_command102.call(this);

            this._params = originalParams;
            return result;
        }
        return false;
    };

    // ============================================
    // Options Menu: Add Language Option
    // ============================================

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function () {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand(optionName, "language");
    };

    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        const symbol = this.commandSymbol(index);
        if (symbol === "language") {
            const currentLang = $gameSystem.getLanguage();
            const langIndex = availableLanguages.indexOf(currentLang);
            return languageNames[langIndex] || currentLang;
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
        const currentIndex = availableLanguages.indexOf(currentLang);
        const newIndex = (currentIndex + direction + availableLanguages.length) % availableLanguages.length;
        const newLang = availableLanguages[newIndex];

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
                            // Silent fail untuk window yang tidak bisa di-refresh
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
        // Pastikan kita save $gameSystem JIKA ada, jika tidak, save setting terakhir
        config.language = $gameSystem ? $gameSystem.getLanguage() : ConfigManager.language;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        _ConfigManager_applyData.call(this, config);

        // Simpan di ConfigManager itu sendiri, BUKAN di global LanguageSwitcher
        ConfigManager.language = config.language || defaultLanguage;

        // Set global pending/current untuk Sesi INI
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

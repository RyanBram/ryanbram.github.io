/**
 * Translation Builder i18n Version
 *
 * This engine generates compact i18n mapping files instead of full JSON.
 * It reuses the extraction logic from the original TranslationEngine,
 * but outputs language-specific mappings suitable for runtime lookup.
 *
 * Output format:
 * {
 *   "id": {
 *     "1": { "name": "Harold", "nickname": "Si Pahlawan" }
 *   }
 * }
 *
 * FALLBACK SYSTEM:
 * - Detects if running with server (http://) or without (file://)
 * - Without server: Basic functionality (upload, extract, copy, paste, rebuild JSON)
 * - With server: Full functionality including Bergamot translation
 */

class TranslationEngineI18n {
    constructor() {
        this.extractors = [];
        this._registerExtractors();

        // Detect mode
        this.isServerMode = this._detectServerMode();
        this.isNWjs =
            typeof nw !== "undefined" || (typeof process !== "undefined" && process.versions && process.versions["nw"]);

        console.log(`[TranslationEngineI18n] Running in ${this.isServerMode ? "SERVER" : "LOCAL"} mode`);
        console.log(`[TranslationEngineI18n] NW.js detected: ${this.isNWjs}`);
    }

    /**
     * Detect if running with server or local file system
     * @returns {boolean} true if server mode, false if local mode
     */
    _detectServerMode() {
        // Check if running via http:// or https://
        if (typeof window !== "undefined" && window.location) {
            const protocol = window.location.protocol;
            return protocol === "http:" || protocol === "https:";
        }
        return false;
    }

    /**
     * Check if translation features are available
     * @returns {boolean} true if translation is available
     */
    isTranslationAvailable() {
        // NW.js mode: always available (uses local file system)
        if (this.isNWjs) {
            return true;
        }
        // Browser mode: only available with server
        return this.isServerMode;
    }

    /**
     * Get mode information
     * @returns {Object} mode info
     */
    getModeInfo() {
        return {
            isServerMode: this.isServerMode,
            isNWjs: this.isNWjs,
            translationAvailable: this.isTranslationAvailable(),
            features: {
                upload: true,
                extract: true,
                copy: true,
                paste: true,
                rebuild: true,
                translate: this.isTranslationAvailable(),
            },
        };
    }

    _registerExtractors() {
        // --- Register all extractors below ---

        this.extractors.push({
            name: "RPG Maker Actors",
            test: (data) => Array.isArray(data) && data[1]?.profile !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name", "nickname", "profile", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Classes",
            test: (data) => Array.isArray(data) && data[1]?.expParams !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Skills",
            test: (data) => Array.isArray(data) && data[1]?.stypeId !== undefined,
            extract: (data) =>
                this._genericArrayExtractor(data, ["name", "description", "message1", "message2", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Items",
            test: (data) => Array.isArray(data) && data[1]?.itypeId !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name", "description", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Weapons",
            test: (data) => Array.isArray(data) && data[1]?.wtypeId !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name", "description", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Armors",
            test: (data) => Array.isArray(data) && data[1]?.atypeId !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name", "description", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Enemies",
            test: (data) => Array.isArray(data) && data[1]?.exp !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Troops",
            test: (data) => Array.isArray(data) && data[1]?.members !== undefined,
            extract: (data) => this._safeEventListExtractor(data, true), // isDatabaseType = true
        });

        this.extractors.push({
            name: "RPG Maker States",
            test: (data) => Array.isArray(data) && data[1]?.restriction !== undefined,
            extract: (data) =>
                this._genericArrayExtractor(data, ["name", "message1", "message2", "message3", "message4", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker Animations",
            test: (data) => Array.isArray(data) && data[1]?.animation1Name !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name"]),
        });

        this.extractors.push({
            name: "RPG Maker Tilesets",
            test: (data) => Array.isArray(data) && data[1]?.flags !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name", "note"]),
        });

        this.extractors.push({
            name: "RPG Maker System",
            test: (data) => !Array.isArray(data) && data?.gameTitle !== undefined,
            extract: (data) => this._systemExtractor(data),
        });

        this.extractors.push({
            name: "RPG Maker CommonEvents",
            test: (data) => Array.isArray(data) && data[1]?.list !== undefined && data[1]?.members === undefined,
            extract: (data) => this._safeEventListExtractor(data, true), // isDatabaseType = true
        });

        this.extractors.push({
            name: "RPG Maker Choices",
            test: (data) => false, // Will be handled in event extractor
            extract: (data) => [], // Not standalone
        });

        this.extractors.push({
            name: "RPG Maker MapInfos",
            test: (data) => Array.isArray(data) && data[1]?.parentId !== undefined,
            extract: (data) => this._genericArrayExtractor(data, ["name"]),
        });

        // ===================================================================
        // BARU: RPG Maker MapXXX.json extractor
        // ===================================================================
        this.extractors.push({
            name: "RPG Maker Map",
            /**
             * Tests for a Map file by checking for unique keys like 'tilesetId' and 'events'.
             * It must not be an array.
             */
            test: (data) => !Array.isArray(data) && data?.tilesetId !== undefined && data?.events !== undefined,
            /**
             * Extracts display name and then iterates through all events on the map.
             */
            extract: (data) => {
                const textPaths = [];
                // Extract map's display name
                if (typeof data.displayName === "string" && data.displayName.length > 0) {
                    textPaths.push({ path: ["displayName"], text: data.displayName });
                }
                // Use the safe event extractor on the map's events array
                // For plugin compatibility, use database-style paths (no "events" prefix)
                const eventTexts = this._safeMapEventListExtractor(data.events);
                return textPaths.concat(eventTexts);
            },
        });
        // --- End of extractor registration ---
    }

    // --- Text Protection Functions ---
    _protectEscapeCodes(text) {
        // 1. Ubah newline literal (dari 'profile') menjadi string '\n'
        //    Ini WAJIB untuk alur kerja i18n (1 field = 1 baris).
        let singleLineText = text.replace(/\r?\n/g, "{{NEWLINE}}");

        // 2. Gunakan HANYA regex "battle-tested" dari translator_engine.js
        //    Regex ini TIDAK akan cocok dengan '\n', dan itu yang kita inginkan.
        const escapeRegex = /(\\[VvNnPpGgCcIi]\[\d+\]|\\[$.|\!><{}^\\])/g;

        return singleLineText.replace(escapeRegex, "{{PROTECTED:$1}}");
    }

    _restoreEscapeCodes(text) {
        // 1. Gunakan regex "battle-tested" yang sama untuk mengembalikan
        const restoreRegex = /\{\{PROTECTED:(\\[VvNnPpGgCcIi]\[\d+\]|\\[{}.\|!><^\\])\}\}/g;

        // 2. Kembalikan teks. String '\n' akan tetap sebagai '\n',
        //    yang merupakan format JSON yang valid untuk newline.
        return text.replace(restoreRegex, "$1").replace(/\{\{NEWLINE\}\}/g, "\n");
    }

    // --- Helper Functions for Extraction ---
    _genericArrayExtractor(jsonData, fields) {
        const textPaths = [];
        jsonData.forEach((item, index) => {
            if (!item || typeof item !== "object") return;
            fields.forEach((field) => {
                // 'if' ini akan MENGEKSTRAK "nickname":"" dan "note":""
                // sebagai baris kosong.
                if (typeof item[field] === "string" && item[field].length > 0) {
                    textPaths.push({ path: [index.toString(), field], text: this._protectEscapeCodes(item[field]) });
                }
            });
        });
        return textPaths;
    }

    _safeEventListExtractor(jsonData, isDatabaseType) {
        const textPaths = [];
        const items = isDatabaseType ? jsonData : jsonData.map((e) => e || {}); // Handle nulls in map events

        items.forEach((item, itemIndex) => {
            if (!item || typeof item !== "object") return;

            // The root path is different for database files vs map files
            const basePath = isDatabaseType ? [itemIndex.toString()] : ["events", itemIndex.toString()];

            if (typeof item.name === "string" && item.name.length > 0) {
                textPaths.push({ path: [...basePath, "name"], text: item.name });
            }

            const pages = item.pages || (item.list ? [{ list: item.list }] : []);
            pages.forEach((page, pageIndex) => {
                if (page && Array.isArray(page.list)) {
                    page.list.forEach((command, commandIndex) => {
                        if (command && (command.code === 401 || command.code === 402 || command.code === 405)) {
                            const pIndex = command.code === 401 || command.code === 405 ? 0 : 1;
                            const text = command.parameters?.[pIndex];
                            if (typeof text === "string" && text.length > 0) {
                                const path = item.pages
                                    ? [
                                          ...basePath,
                                          "pages",
                                          pageIndex.toString(),
                                          "list",
                                          commandIndex.toString(),
                                          "parameters",
                                          pIndex.toString(),
                                      ]
                                    : [...basePath, "list", commandIndex.toString(), "parameters", pIndex.toString()];
                                textPaths.push({ path, text: this._protectEscapeCodes(text) });
                            }
                        }
                        // TAMBAHAN BARU: Handle Show Choices (code 102)
                        if (command && command.code === 102) {
                            const choices = command.parameters?.[0];
                            if (Array.isArray(choices)) {
                                choices.forEach((choice, choiceIndex) => {
                                    if (typeof choice === "string" && choice.length > 0) {
                                        const path = item.pages
                                            ? [
                                                  ...basePath,
                                                  "pages",
                                                  pageIndex.toString(),
                                                  "list",
                                                  commandIndex.toString(),
                                                  "parameters",
                                                  "0",
                                                  choiceIndex.toString(),
                                              ]
                                            : [
                                                  ...basePath,
                                                  "list",
                                                  commandIndex.toString(),
                                                  "parameters",
                                                  "0",
                                                  choiceIndex.toString(),
                                              ];
                                        textPaths.push({ path, text: this._protectEscapeCodes(choice) });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
        return textPaths;
    }

    _safeMapEventListExtractor(jsonData) {
        const textPaths = [];
        const items = jsonData.map((e) => e || {}); // Handle nulls in map events

        items.forEach((item, itemIndex) => {
            if (!item || typeof item !== "object") return;

            // For plugin compatibility, use simple numeric paths like database files
            // Instead of ["events", "1", "name"], use ["1", "name"]
            const basePath = [itemIndex.toString()];

            if (typeof item.name === "string" && item.name.length > 0) {
                textPaths.push({ path: [...basePath, "name"], text: item.name });
            }

            const pages = item.pages || (item.list ? [{ list: item.list }] : []);
            pages.forEach((page, pageIndex) => {
                if (page && Array.isArray(page.list)) {
                    page.list.forEach((command, commandIndex) => {
                        if (command && (command.code === 401 || command.code === 402 || command.code === 405)) {
                            const pIndex = command.code === 401 || command.code === 405 ? 0 : 1;
                            const text = command.parameters?.[pIndex];
                            if (typeof text === "string" && text.length > 0) {
                                const path = [
                                    ...basePath,
                                    "pages",
                                    pageIndex.toString(),
                                    "list",
                                    commandIndex.toString(),
                                    "parameters",
                                    pIndex.toString(),
                                ];
                                textPaths.push({ path, text: this._protectEscapeCodes(text) });
                            }
                        }
                        // TAMBAHAN BARU: Handle Show Choices (code 102)
                        if (command && command.code === 102) {
                            const choices = command.parameters?.[0];
                            if (Array.isArray(choices)) {
                                choices.forEach((choice, choiceIndex) => {
                                    if (typeof choice === "string" && choice.length > 0) {
                                        const path = [
                                            ...basePath,
                                            "pages",
                                            pageIndex.toString(),
                                            "list",
                                            commandIndex.toString(),
                                            "parameters",
                                            "0",
                                            choiceIndex.toString(),
                                        ];
                                        textPaths.push({ path, text: this._protectEscapeCodes(choice) });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
        return textPaths;
    }

    _systemExtractor(jsonData) {
        const textPaths = [];
        ["gameTitle", "currencyUnit"].forEach((f) => {
            if (typeof jsonData[f] === "string" && jsonData[f].length > 0)
                textPaths.push({ path: [f], text: this._protectEscapeCodes(jsonData[f]) });
        });
        ["armorTypes", "elements", "equipTypes", "skillTypes", "weaponTypes"].forEach((f) => {
            if (Array.isArray(jsonData[f]))
                jsonData[f].forEach((t, i) => {
                    if (typeof t === "string" && t.length > 0)
                        textPaths.push({ path: [f, i.toString()], text: this._protectEscapeCodes(t) });
                });
        });
        if (jsonData.terms)
            Object.keys(jsonData.terms).forEach((cat) => {
                const termObj = jsonData.terms[cat];
                if (Array.isArray(termObj))
                    termObj.forEach((t, i) => {
                        if (typeof t === "string" && t.length > 0)
                            textPaths.push({ path: ["terms", cat, i.toString()], text: this._protectEscapeCodes(t) });
                    });
                else if (typeof termObj === "object" && termObj !== null)
                    Object.keys(termObj).forEach((key) => {
                        const t = termObj[key];
                        if (typeof t === "string" && t.length > 0)
                            textPaths.push({ path: ["terms", cat, key], text: this._protectEscapeCodes(t) });
                    });
            });
        return textPaths;
    }

    /**
     * Extract text from source JSON
     */
    extract(jsonData) {
        const extractor = this.extractors.find((ext) => ext.test(jsonData));
        if (extractor) {
            console.log(`Using extractor: ${extractor.name}`);
            return extractor.extract(jsonData);
        }
        console.warn("No suitable extractor found for the provided JSON file.");
        return [];
    }

    rebuild(originalJson, textPaths, translatedTexts) {
        const newJson = JSON.parse(JSON.stringify(originalJson));
        textPaths.forEach((pathInfo, index) => {
            const translatedText = translatedTexts[index];
            if (typeof translatedText !== "undefined") {
                this._setValueByPath(newJson, pathInfo.path, this._restoreEscapeCodes(translatedText));
            }
        });
        return newJson;
    }

    _setValueByPath(obj, path, value) {
        let current = obj;

        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            const nextKey = path[i + 1];

            if (current[key] === undefined) {
                if (/^\d+$/.test(nextKey)) {
                    current[key] = [];
                } else {
                    current[key] = {};
                }
            }
            current = current[key];
        }

        const lastKey = path[path.length - 1];

        // Handle numeric key untuk array index
        if (/^\d+$/.test(lastKey)) {
            current[parseInt(lastKey)] = value;
        } else {
            current[lastKey] = value;
        }
    }

    /**
     * Build i18n mapping from extracted text paths and translations
     *
     * @param {Array} textPaths - Array of {path, text} from extraction
     * @param {Array} translatedTexts - Array of translated strings
     * @param {string} targetLanguage - Language code (e.g., 'id', 'jp')
     * @returns {Object} i18n mapping in format: { "langCode": { "id": { "field": "value" } } }
     */
    buildI18nMapping(textPaths, translatedTexts, targetLanguage) {
        if (textPaths.length !== translatedTexts.length) {
            throw new Error(`Text count mismatch! Expected ${textPaths.length} lines, got ${translatedTexts.length}`);
        }

        const mapping = {};

        textPaths.forEach((pathInfo, index) => {
            const translatedText = translatedTexts[index];

            // Skip empty translations
            if (translatedText === undefined || translatedText === null) {
                console.warn(`Skipping empty translation at index ${index}`);
                return;
            }

            // Build nested structure from path
            // path example: ["1", "name"] → mapping["1"]["name"] = "Harold"
            this._setNestedValue(mapping, pathInfo.path, translatedText);
        });

        // Wrap in language key
        return {
            [targetLanguage]: mapping,
        };
    }

    /**
     * Merge new i18n mapping with existing i18n data
     *
     * @param {Object} existingI18n - Existing i18n data (may contain multiple languages)
     * @param {Object} newMapping - New mapping from buildI18nMapping()
     * @param {string} targetLanguage - Language code being added/updated
     * @returns {Object} Merged i18n data
     */
    mergeI18n(existingI18n, newMapping, targetLanguage) {
        if (!existingI18n || typeof existingI18n !== "object") {
            // No existing data, return new mapping as-is
            return newMapping;
        }

        // Deep clone existing to avoid mutation
        const merged = JSON.parse(JSON.stringify(existingI18n));

        // Add or replace target language
        merged[targetLanguage] = newMapping[targetLanguage];

        return merged;
    }

    /**
     * Validate i18n structure to ensure consistency
     *
     * @param {Object} i18nData - Complete i18n data with multiple languages
     * @returns {Array} Array of validation errors (empty if valid)
     */
    validateStructure(i18nData) {
        const errors = [];

        if (!i18nData || typeof i18nData !== "object") {
            errors.push("i18n data must be an object");
            return errors;
        }

        const languages = Object.keys(i18nData);

        if (languages.length === 0) {
            errors.push("No languages found in i18n data");
            return errors;
        }

        // Get reference structure from first language
        const referenceLang = languages[0];
        const referenceKeys = this._getAllKeys(i18nData[referenceLang]);

        // Check if all other languages have the same keys
        for (let i = 1; i < languages.length; i++) {
            const lang = languages[i];
            const langKeys = this._getAllKeys(i18nData[lang]);

            // Find missing keys
            const missingKeys = referenceKeys.filter((key) => !langKeys.includes(key));
            if (missingKeys.length > 0) {
                errors.push(
                    `Language "${lang}" is missing keys: ${missingKeys.slice(0, 5).join(", ")}${
                        missingKeys.length > 5 ? "..." : ""
                    }`
                );
            }

            // Find extra keys
            const extraKeys = langKeys.filter((key) => !referenceKeys.includes(key));
            if (extraKeys.length > 0) {
                errors.push(
                    `Language "${lang}" has extra keys: ${extraKeys.slice(0, 5).join(", ")}${
                        extraKeys.length > 5 ? "..." : ""
                    }`
                );
            }
        }

        return errors;
    }

    /**
     * Get statistics about i18n data
     *
     * @param {Object} i18nData - Complete i18n data
     * @returns {Object} Statistics
     */
    getStatistics(i18nData) {
        const stats = {
            languages: [],
            totalTexts: {},
            dataTypes: [],
        };

        if (!i18nData || typeof i18nData !== "object") {
            return stats;
        }

        const languages = Object.keys(i18nData);
        stats.languages = languages;

        languages.forEach((lang) => {
            const textCount = this._countTexts(i18nData[lang]);
            stats.totalTexts[lang] = textCount;
        });

        // Get data types from first language
        if (languages.length > 0) {
            const firstLang = i18nData[languages[0]];
            if (firstLang && typeof firstLang === "object") {
                stats.dataTypes = Object.keys(firstLang);
            }
        }

        return stats;
    }

    // --- Helper Methods ---

    _setNestedValue(obj, path, value) {
        let current = obj;

        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            const nextKey = path[i + 1];

            if (current[key] === undefined) {
                // INI PERUBAIKANNYA:
                // Cek apakah key berikutnya adalah angka (string numerik)
                // Jika ya, buat Array. Jika tidak, buat Object.
                if (/^\d+$/.test(nextKey)) {
                    current[key] = []; // Buat Array
                } else {
                    current[key] = {}; // Buat Object
                }
            }
            current = current[key];
        }

        // Set nilai di akhir path
        current[path[path.length - 1]] = value;
    }

    _getAllKeys(obj, prefix = "", result = []) {
        if (typeof obj !== "object" || obj === null) {
            return result;
        }

        for (const [key, value] of Object.entries(obj)) {
            const path = prefix ? `${prefix}.${key}` : key;

            if (typeof value === "string") {
                result.push(path);
            } else if (typeof value === "object" && value !== null) {
                this._getAllKeys(value, path, result);
            }
        }

        return result;
    }

    _countTexts(obj) {
        let count = 0;

        const traverse = (o) => {
            if (typeof o !== "object" || o === null) return;

            for (const value of Object.values(o)) {
                if (typeof value === "string") {
                    count++;
                } else if (typeof value === "object" && value !== null) {
                    traverse(value);
                }
            }
        };

        traverse(obj);
        return count;
    }
}

/**
 * UI Controller for i18n Translation Helper
 *
 * Handles all user interactions for the i18n mode:
 * - File uploads (source JSON and existing i18n)
 * - Text extraction and display
 * - Language selection
 * - Building i18n mappings with merge support
 * - Download generation with sync scroll
 */

document.addEventListener("DOMContentLoaded", () => {
    // Import bergamot translator module
    import("./node_modules/@browsermt/bergamot-translator/translator.js").then((mod) => {
        const { BatchTranslator, TranslatorBacking } = mod;

        // --- State Management ---
        // --- State Management ---
        let sourceJsonData = null;
        let existingI18nData = null;
        let textPaths = [];
        let sourceFilename = "";
        let downloadUrl = null;
        let activeSync = null;
        let selectedLanguages = [{ code: "en", order: 1 }]; // Default: English
        let languageSelectionOrder = 1; // Start at 1 because English is pre-selected
        let sourceLang = "jp"; // Default source language

        // --- Available Languages ---
        const availableLanguages = [
            { code: "en", name: "English", flag: "resource/flags/gb.svg", nativeName: "English" },
            { code: "jp", name: "Japanese", flag: "resource/flags/jp.svg", nativeName: "日本語" },
            { code: "id", name: "Indonesian", flag: "resource/flags/id.svg", nativeName: "Bahasa Indonesia" },
            { code: "ar", name: "Arabic", flag: "resource/flags/sa.svg", nativeName: "العربية" },
            { code: "zh", name: "Chinese", flag: "resource/flags/cn.svg", nativeName: "中文" },
            { code: "de", name: "German", flag: "resource/flags/de.svg", nativeName: "Deutsch" },
            { code: "es", name: "Spanish", flag: "resource/flags/es.svg", nativeName: "Español" },
            { code: "fr", name: "French", flag: "resource/flags/fr.svg", nativeName: "Français" },
            { code: "ko", name: "Korean", flag: "resource/flags/kr.svg", nativeName: "한국어" },
            { code: "pt", name: "Portuguese", flag: "resource/flags/pt.svg", nativeName: "Português" },
            { code: "ru", name: "Russian", flag: "resource/flags/ru.svg", nativeName: "Русский" },
        ];

        // --- Engine Instances ---
        const i18nEngine = new TranslationEngineI18n();

        // --- DOM Elements ---
        const ui = {
            // Source file upload
            sourceDropZone: document.getElementById("source-drop-zone"),
            sourceFileInput: document.getElementById("source-file-input"),
            sourceBadge: document.getElementById("source-badge"),

            // i18n file upload
            i18nDropZone: document.getElementById("i18n-drop-zone"),
            i18nFileInput: document.getElementById("i18n-file-input"),
            i18nBadge: document.getElementById("i18n-badge"),

            // Language selection
            languageSelectorBtn: document.getElementById("language-selector-btn"),
            langCountBadge: document.getElementById("lang-count"),
            sourceLanguageDropdown: document.getElementById("source-language-dropdown"),
            sourceDropdownSelected: document.getElementById("source-dropdown-selected"),
            sourceDropdownOptions: document.getElementById("source-dropdown-options"),
            languageModal: document.getElementById("language-modal"),
            languageList: document.getElementById("language-list"),
            modalCloseBtn: document.getElementById("modal-close-btn"),
            selectionInfo: document.getElementById("selection-info"),
            applyLanguagesBtn: document.getElementById("apply-languages-btn"),

            // About modal
            helpBtn: document.getElementById("help-btn"),
            aboutModal: document.getElementById("about-modal"),
            aboutCloseBtn: document.getElementById("about-close-btn"),
            downloadPluginBtn: document.getElementById("download-plugin-btn"),

            // Text areas
            extractedTextArea: document.getElementById("extracted-text"),
            extractedLines: document.getElementById("extracted-lines"),
            extractedBg: document.getElementById("extracted-bg"),
            copyBtn: document.getElementById("copy-btn"),
            translateAllBtn: document.getElementById("translate-all-btn"),

            translationColumnsContainer: document.getElementById("translation-columns-container"),

            // Build & Download
            buildBtn: document.getElementById("build-btn"),
            buildStatus: document.getElementById("build-status"),
            progressBarContainer: document.getElementById("progress-bar-container"),
            progressBar: document.getElementById("progress-bar"),

            // Clear All button
            clearAllBtn: document.getElementById("clear-all-btn"),
        };

        // ============================================
        // Event Listeners: Source File Upload
        // ============================================

        ui.sourceDropZone.addEventListener("click", () => ui.sourceFileInput.click());

        ui.sourceDropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            ui.sourceDropZone.classList.add("drag-over");
        });

        ui.sourceDropZone.addEventListener("dragleave", () => {
            ui.sourceDropZone.classList.remove("drag-over");
        });

        ui.sourceDropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            ui.sourceDropZone.classList.remove("drag-over");
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                processSourceFile(files[0]);
            }
        });

        ui.sourceFileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                processSourceFile(e.target.files[0]);
            }
        });

        // ============================================
        // Event Listeners: i18n File Upload
        // ============================================

        ui.i18nDropZone.addEventListener("click", () => ui.i18nFileInput.click());

        ui.i18nDropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            ui.i18nDropZone.classList.add("drag-over");
        });

        ui.i18nDropZone.addEventListener("dragleave", () => {
            ui.i18nDropZone.classList.remove("drag-over");
        });

        ui.i18nDropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            ui.i18nDropZone.classList.remove("drag-over");
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                processI18nFile(files[0]);
            }
        });

        ui.i18nFileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                processI18nFile(e.target.files[0]);
            }
        });

        // ============================================
        // Event Listeners: Language Selection Modal
        // ============================================

        ui.languageSelectorBtn.addEventListener("click", openLanguageModal);
        ui.modalCloseBtn.addEventListener("click", closeLanguageModal);
        ui.applyLanguagesBtn.addEventListener("click", applyLanguageSelection);
        ui.sourceDropdownSelected.addEventListener("click", toggleSourceDropdown);
        ui.sourceDropdownOptions.addEventListener("click", handleSourceDropdownSelection);

        // Close modal when clicking overlay
        ui.languageModal.addEventListener("click", (e) => {
            if (e.target === ui.languageModal) {
                closeLanguageModal();
            }
        });

        // ============================================
        // Event Listeners: About Modal
        // ============================================

        ui.helpBtn.addEventListener("click", openAboutModal);
        ui.aboutCloseBtn.addEventListener("click", closeAboutModal);
        ui.downloadPluginBtn.addEventListener("click", downloadPlugin);

        // Close about modal when clicking overlay
        ui.aboutModal.addEventListener("click", (e) => {
            if (e.target === ui.aboutModal) {
                closeAboutModal();
            }
        });

        // ============================================
        // Event Listeners: Text Areas
        // ============================================

        ui.copyBtn.addEventListener("click", copyExtractedText);
        ui.translateAllBtn.addEventListener("click", translateAllText);

        // ============================================
        // Event Listeners: Build
        // ============================================

        ui.buildBtn.addEventListener("click", buildI18nMapping);

        // ============================================
        // Event Listeners: Clear All
        // ============================================

        ui.clearAllBtn.addEventListener("click", clearAllData);

        // ============================================
        // Language Selection Functions
        // ============================================

        function initializeLanguageList() {
            ui.languageList.innerHTML = "";

            availableLanguages.forEach((lang) => {
                const item = document.createElement("div");
                item.className = "language-item";
                item.dataset.langCode = lang.code;

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = `lang-${lang.code}`;
                checkbox.value = lang.code;

                const label = document.createElement("label");
                label.htmlFor = `lang-${lang.code}`;
                // Display: Flag + English name + Native name
                label.innerHTML = `<img src="${lang.flag}" alt="${lang.code}" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle; border-radius: 2px;">${lang.name} <span style="color: #999; font-size: 0.9em;">(${lang.nativeName})</span>`;

                // Order badge (will be shown when selected) - add at the end
                const orderBadge = document.createElement("span");
                orderBadge.className = "order-badge";
                orderBadge.style.display = "none";

                item.appendChild(checkbox);
                item.appendChild(label);
                item.appendChild(orderBadge); // Badge at the end (right side)

                // Single click handler for entire item
                item.addEventListener("click", (e) => {
                    const wasChecked = checkbox.checked;
                    checkbox.checked = !wasChecked;

                    if (checkbox.checked) {
                        // Add to selection with current order
                        languageSelectionOrder++;
                        item.dataset.order = languageSelectionOrder;
                        orderBadge.textContent = languageSelectionOrder;
                        orderBadge.style.display = "inline-block";
                        item.classList.add("selected");
                    } else {
                        // Remove from selection and reorder remaining
                        item.classList.remove("selected");
                        orderBadge.style.display = "none";
                        delete item.dataset.order;
                        reorderLanguages();
                    }

                    updateSelectionInfo();
                });

                ui.languageList.appendChild(item);
            });
        }

        function reorderLanguages() {
            // Reorder remaining selected languages
            const selectedItems = Array.from(ui.languageList.querySelectorAll(".language-item.selected"));
            selectedItems.sort((a, b) => parseInt(a.dataset.order) - parseInt(b.dataset.order));

            selectedItems.forEach((item, index) => {
                const newOrder = index + 1;
                item.dataset.order = newOrder;
                const badge = item.querySelector(".order-badge");
                if (badge) badge.textContent = newOrder;
            });

            languageSelectionOrder = selectedItems.length;
        }

        function openLanguageModal() {
            // Reset order counter
            languageSelectionOrder = 0;

            initializeLanguageList();

            // Pre-select previously selected languages with their order
            selectedLanguages.forEach((langObj, index) => {
                const langCode = typeof langObj === "string" ? langObj : langObj.code;
                const item = ui.languageList.querySelector(`[data-lang-code="${langCode}"]`);
                if (item) {
                    const checkbox = item.querySelector("input");
                    const orderBadge = item.querySelector(".order-badge");

                    checkbox.checked = true;
                    item.classList.add("selected");

                    languageSelectionOrder++;
                    item.dataset.order = languageSelectionOrder;
                    orderBadge.textContent = languageSelectionOrder;
                    orderBadge.style.display = "inline-block";
                }
            });

            updateSelectionInfo();
            ui.languageModal.classList.add("active");
        }

        function closeLanguageModal() {
            ui.languageModal.classList.remove("active");
        }

        function toggleSourceDropdown() {
            const isShowing = ui.sourceDropdownOptions.classList.contains("show");

            if (!isShowing) {
                // Reorder options: selected language first
                const selectedOption = ui.sourceDropdownOptions.querySelector(".dropdown-option.selected");
                if (selectedOption) {
                    // Move selected option to the top
                    ui.sourceDropdownOptions.insertBefore(selectedOption, ui.sourceDropdownOptions.firstChild);
                }
            }

            ui.sourceDropdownOptions.classList.toggle("show");
        }

        function handleSourceDropdownSelection(e) {
            const option = e.target.closest(".dropdown-option");
            if (!option) return;

            const selectedValue = option.dataset.value;
            const selectedLang = availableLanguages.find((lang) => lang.code === selectedValue);
            if (!selectedLang) return;

            // Update source language
            sourceLang = selectedValue;

            // Update selected display
            ui.sourceDropdownSelected.innerHTML = `
            <img src="${selectedLang.flag}" alt="${selectedLang.code}" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle; border-radius: 2px;">
            ${selectedLang.name}
            <span class="dropdown-arrow">▼</span>
        `;

            // Update selected class
            ui.sourceDropdownOptions.querySelectorAll(".dropdown-option").forEach((opt) => {
                opt.classList.remove("selected");
            });
            option.classList.add("selected");

            // Close dropdown
            ui.sourceDropdownOptions.classList.remove("show");
        }

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!ui.sourceLanguageDropdown.contains(e.target)) {
                ui.sourceDropdownOptions.classList.remove("show");
            }
        });

        // ============================================
        // About Modal Functions
        // ============================================

        function openAboutModal() {
            ui.aboutModal.classList.add("active");
        }

        function closeAboutModal() {
            ui.aboutModal.classList.remove("active");
        }

        function downloadPlugin() {
            // Create blob from LanguageSwitcher.js file
            fetch("plugins/LanguageSwitcher.js")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Plugin file not found");
                    }
                    return response.blob();
                })
                .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "LanguageSwitcher.js";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                })
                .catch((error) => {
                    console.error("Download error:", error);
                    alert(
                        "❌ Plugin file not found!\n\n" +
                            "Please ensure LanguageSwitcher.js is in the same folder as this HTML file.\n\n" +
                            "You can manually copy the plugin file from the project folder."
                    );
                });
        }

        // ============================================
        // Language Selection Info Functions
        // ============================================

        function updateSelectionInfo() {
            const checkedBoxes = ui.languageList.querySelectorAll('input[type="checkbox"]:checked');
            const count = checkedBoxes.length;

            ui.selectionInfo.textContent = `${count} selected`;
            // Minimal 1 bahasa harus dipilih
            ui.applyLanguagesBtn.disabled = count === 0;
        }

        function applyLanguageSelection() {
            const selectedItems = ui.languageList.querySelectorAll(".language-item.selected");

            // Minimal 1 bahasa harus dipilih
            if (selectedItems.length === 0) {
                alert("⚠️ Please select at least one language!");
                return;
            }

            // Sort by order and save
            const sortedItems = Array.from(selectedItems).sort(
                (a, b) => parseInt(a.dataset.order) - parseInt(b.dataset.order)
            );

            selectedLanguages = sortedItems.map((item) => ({
                code: item.dataset.langCode,
                order: parseInt(item.dataset.order),
            }));

            ui.langCountBadge.textContent = selectedLanguages.length;

            // Update the language selector button to show selected flags
            updateLanguageSelectorButton();

            // Regenerate translation columns
            generateTranslationColumns();

            // Auto-close modal setelah apply
            closeLanguageModal();
            updateBuildButtonState();
        }

        function updateLanguageSelectorButton() {
            if (selectedLanguages.length === 0) {
                ui.languageSelectorBtn.innerHTML =
                    'Select Languages...<span id="lang-count" class="lang-count-badge">0</span>';
                return;
            }

            // Create flag images for selected languages
            const flagImages = selectedLanguages
                .map((langItem) => {
                    const langCode = getLangCode(langItem);
                    const lang = availableLanguages.find((l) => l.code === langCode);
                    if (!lang) return "";
                    return `<img src="${lang.flag}" alt="${lang.code}" style="width: 16px; height: 12px; margin-right: 2px; vertical-align: middle; border-radius: 1px;">`;
                })
                .join("");

            ui.languageSelectorBtn.innerHTML = `${flagImages}<span id="lang-count" class="lang-count-badge">${selectedLanguages.length}</span>`;
        }

        // Helper function to get language code from selectedLanguages item
        function getLangCode(item) {
            return typeof item === "string" ? item : item.code;
        }

        function generateTranslationColumns() {
            // Save existing translations before clearing
            const existingTranslations = {};
            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                if (textarea && textarea.value) {
                    existingTranslations[langCode] = textarea.value;
                }
            });

            ui.translationColumnsContainer.innerHTML = "";

            // Update container class based on number of languages
            ui.translationColumnsContainer.classList.remove("single-lang", "multi-lang");
            if (selectedLanguages.length === 1) {
                ui.translationColumnsContainer.classList.add("single-lang");
            } else if (selectedLanguages.length > 1) {
                ui.translationColumnsContainer.classList.add("multi-lang");
            }

            if (selectedLanguages.length === 0) {
                const placeholder = document.createElement("div");
                placeholder.className = "textarea-column translation-column";
                placeholder.innerHTML = `
                <p style="text-align: center; color: #999; margin-top: 50px;">
                    Select target languages to begin...
                </p>
            `;
                ui.translationColumnsContainer.appendChild(placeholder);
                return;
            }

            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const lang = availableLanguages.find((l) => l.code === langCode);
                if (!lang) return;

                const column = document.createElement("div");
                column.className = "textarea-column translation-column";
                column.dataset.langCode = langCode;

                const header = document.createElement("div");
                header.className = "panel-header";
                header.innerHTML = `
                <h2>
                    <img src="${lang.flag}" alt="${lang.code}" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle; border-radius: 2px;">${lang.name}
                    <span class="translation-status" id="status-${langCode}" style="margin-left: 8px; display: none;">✅</span>
                </h2>
                <button class="util-btn translate-btn" data-lang="${langCode}">Translate</button>
                <button class="util-btn paste-btn" data-lang="${langCode}">Paste</button>
            `;

                const textareaContainer = document.createElement("div");
                textareaContainer.className = "textarea-container";

                const lineNumbers = document.createElement("div");
                lineNumbers.className = "line-numbers";
                lineNumbers.id = `lines-${langCode}`;

                const lineBackgrounds = document.createElement("div");
                lineBackgrounds.className = "line-backgrounds";
                lineBackgrounds.id = `bg-${langCode}`;

                const textarea = document.createElement("textarea");
                textarea.id = `text-${langCode}`;
                textarea.placeholder = `Paste ${lang.name} translation here...`;
                textarea.dataset.langCode = langCode;

                // Restore existing translation if available
                if (existingTranslations[langCode]) {
                    textarea.value = existingTranslations[langCode];
                }

                // Add input listener for UI update
                textarea.addEventListener("input", (e) => {
                    // Dapatkan batas baris dari extracted text
                    const maxLineCount = getLineCount(ui.extractedTextArea.value);

                    // Jika maxLineCount adalah 0 (belum ada source), jangan lakukan apa-apa
                    if (maxLineCount === 0) {
                        resetToBuildState();
                        return;
                    }

                    // Dapatkan teks yang baru saja di-paste/diketik
                    let currentText = e.target.value;
                    const currentLineCount = getLineCount(currentText);

                    // Jika melebihi batas, pangkas teksnya
                    if (currentLineCount > maxLineCount) {
                        // Ambil hanya baris yang diizinkan (misal: 32 baris pertama)
                        const truncatedText = currentText
                            .split("\n")
                            .slice(0, maxLineCount) // Ambil 32 baris pertama
                            .join("\n");

                        // Setel ulang nilai textarea dengan teks yang sudah dipangkas
                        e.target.value = truncatedText;
                    }

                    // Lanjutkan fungsi UI (seperti sebelumnya)
                    resetToBuildState();
                    updateTextareaUI();
                    updateBuildButtonState();
                    updateTranslationStatus(langCode);
                });

                // Add click and cursor movement listeners for line highlighting
                textarea.addEventListener("click", () => {
                    const lineNumber = getLineNumberFromCursor(textarea);
                    highlightActiveLine(lineNumber);
                });

                textarea.addEventListener("keyup", () => {
                    const lineNumber = getLineNumberFromCursor(textarea);
                    highlightActiveLine(lineNumber);
                });

                // Add scroll sync
                textarea.addEventListener("scroll", handleScroll);
                lineNumbers.addEventListener("scroll", handleScroll);

                textareaContainer.appendChild(lineNumbers);
                textareaContainer.appendChild(lineBackgrounds);
                textareaContainer.appendChild(textarea);

                column.appendChild(header);
                column.appendChild(textareaContainer);

                ui.translationColumnsContainer.appendChild(column);

                // Add paste button listener
                const pasteBtn = header.querySelector(".paste-btn");
                pasteBtn.addEventListener("click", () => pasteTranslatedText(langCode));

                // Add translate button listener
                const translateBtn = header.querySelector(".translate-btn");
                translateBtn.addEventListener("click", () => translateIndividualText(langCode));
            });

            updateTextareaUI();
        }

        // ============================================
        // Core Functions: Source File Processing
        // ============================================

        function processSourceFile(file) {
            if (!file || !file.name.endsWith(".json")) {
                ui.sourceBadge.innerHTML =
                    '<span class="status-badge" style="background:#f8d7da;color:#721c24">Invalid</span>';
                return;
            }

            // Check if we're switching from one file type to another
            const newFilename = file.name;
            const isFileTypeChange = sourceFilename && sourceFilename !== newFilename;

            if (isFileTypeChange && existingI18nData) {
                const proceed = confirm(
                    `⚠️ FILE TYPE CHANGE DETECTED!\n\n` +
                        `You are switching from: ${sourceFilename}\n` +
                        `To: ${newFilename}\n\n` +
                        `This will CLEAR existing i18n data to prevent conflicts.\n\n` +
                        `Continue? (Recommended: Start fresh for new file types)`
                );

                if (!proceed) return;

                // Clear existing i18n data to prevent conflicts
                resetI18nState();
            }

            sourceFilename = newFilename;
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    sourceJsonData = JSON.parse(event.target.result);
                    extractText();
                    ui.sourceDropZone.classList.add("has-file");
                    ui.sourceBadge.innerHTML = `<span class="status-badge status-success">${file.name}</span>`;
                } catch (e) {
                    ui.sourceBadge.innerHTML =
                        '<span class="status-badge" style="background:#f8d7da;color:#721c24">Parse Error</span>';
                    resetSourceState();
                }
            };

            reader.onerror = () => {
                ui.sourceBadge.innerHTML =
                    '<span class="status-badge" style="background:#f8d7da;color:#721c24">Read Error</span>';
                resetSourceState();
            };

            reader.readAsText(file);
        }

        function extractText() {
            if (!sourceJsonData) return;

            try {
                textPaths = i18nEngine.extract(sourceJsonData);

                if (textPaths.length === 0) {
                    ui.buildStatus.textContent = "⚠️ No translatable text found";
                    ui.extractedTextArea.value = "";
                    ui.buildBtn.disabled = true;
                    return;
                }

                // Display extracted text - ensure each textPath becomes one line
                // Don't add trailing newline to match translation textarea behavior
                const extractedTexts = textPaths.map((p) => p.text);
                ui.extractedTextArea.value = extractedTexts.join("\n");

                ui.buildStatus.textContent = `✅ Extracted ${getLineCount(ui.extractedTextArea.value)} texts`;

                updateTextareaUI();
                updateBuildButtonState();

                // Auto-populate translations if i18n is already loaded
                if (existingI18nData) {
                    populateTranslationsFromI18n();
                }
            } catch (error) {
                ui.buildStatus.textContent = `❌ Extraction failed: ${error.message}`;
                resetSourceState();
            }
        }

        // ============================================
        // Core Functions: i18n File Processing
        // ============================================

        function processI18nFile(file) {
            if (!file || !file.name.endsWith(".json")) {
                ui.i18nBadge.innerHTML =
                    '<span class="status-badge" style="background:#f8d7da;color:#721c24">Invalid</span>';
                return;
            }

            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    existingI18nData = JSON.parse(event.target.result);

                    // Validate structure
                    const languages = Object.keys(existingI18nData);

                    if (languages.length === 0) {
                        throw new Error("No languages found");
                    }

                    ui.i18nDropZone.classList.add("has-file");
                    ui.i18nBadge.innerHTML = `<span class="status-badge status-success">${languages.join(", ")}</span>`;

                    // Auto-select languages from i18n and generate columns
                    autoSelectLanguagesFromI18n(languages);

                    // Auto-populate translations if source is already loaded
                    if (sourceJsonData && textPaths.length > 0) {
                        populateTranslationsFromI18n();
                    }
                } catch (e) {
                    ui.i18nBadge.innerHTML =
                        '<span class="status-badge" style="background:#f8d7da;color:#721c24">Invalid i18n</span>';
                    existingI18nData = null;
                    ui.i18nDropZone.classList.remove("has-file");
                }
            };

            reader.onerror = () => {
                ui.i18nBadge.innerHTML =
                    '<span class="status-badge" style="background:#f8d7da;color:#721c24">Read Error</span>';
                existingI18nData = null;
            };

            reader.readAsText(file);
        }

        function autoSelectLanguagesFromI18n(languages) {
            // Merge with existing selected languages (avoid duplicates)
            const existingCodes = selectedLanguages.map((item) => getLangCode(item));

            languages.forEach((langCode) => {
                // Skip if already selected
                if (existingCodes.includes(langCode)) return;

                // Skip if language not in available list
                if (!availableLanguages.find((l) => l.code === langCode)) return;

                // Add to selection
                languageSelectionOrder++;
                selectedLanguages.push({ code: langCode, order: languageSelectionOrder });
            });

            // Update badge count
            ui.langCountBadge.textContent = selectedLanguages.length;

            // Update the language selector button
            updateLanguageSelectorButton();

            // Regenerate columns to show new languages
            generateTranslationColumns();
        }

        function populateTranslationsFromI18n() {
            if (!existingI18nData || !textPaths.length) return;

            // Get available languages from i18n
            const i18nLanguages = Object.keys(existingI18nData);

            // Check if i18n data is compatible with current source file
            let compatibilityIssues = 0;

            // For each language in i18n, populate the textarea if column exists
            i18nLanguages.forEach((langCode) => {
                const textarea = document.getElementById(`text-${langCode}`);
                if (!textarea) return; // Column doesn't exist yet

                // Rebuild translation text from i18n mapping
                const translations = [];
                textPaths.forEach((pathObj) => {
                    // Traverse path sesuai struktur hasil build
                    const translatedText = getI18nValueByPath(existingI18nData[langCode], pathObj.path);
                    // Jika ada, pakai hasil terjemahan, jika tidak fallback ke originalText
                    if (translatedText !== undefined && translatedText !== null) {
                        translations.push(translatedText);
                    } else {
                        translations.push(pathObj.text);
                        compatibilityIssues++;
                    }
                });

                textarea.value = translations.join("\n").replace(/\n$/, "");

                // Update translation status after auto-populate
                updateTranslationStatus(langCode);
            });

            // Warn user if there are compatibility issues
            if (compatibilityIssues > 0) {
                console.warn(
                    `⚠️ i18n compatibility issues: ${compatibilityIssues} texts not found in existing i18n data`
                );
                ui.buildStatus.textContent = `⚠️ Some translations missing (${compatibilityIssues} items). Please review and complete.`;
            } else {
                ui.buildStatus.textContent = `✅ Loaded existing translations for ${i18nLanguages.length} language(s)`;
            }

            // Update UI
            updateTextareaUI();
            updateBuildButtonState();
        }

        // Helper untuk traverse nested path pada i18n data
        function getI18nValueByPath(i18nObj, pathArr) {
            let current = i18nObj;
            for (let i = 0; i < pathArr.length; i++) {
                if (current == null) return undefined;
                current = current[pathArr[i]];
            }
            return current;
        }

        // ============================================
        // Core Functions: Build i18n Mapping
        // ============================================

        function buildI18nMapping() {
            if (!sourceJsonData || textPaths.length === 0) {
                alert("⚠️ Please upload a source JSON file first!");
                return;
            }

            if (selectedLanguages.length === 0) {
                alert("⚠️ Please select at least one target language!");
                return;
            }

            // Collect translations from all columns
            const translationsByLang = {};
            let hasValidationError = false;
            let errorMessages = [];

            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                if (!textarea) return;

                // Gunakan fungsi getLineCount yang konsisten untuk validasi
                const actualTranslatedLines = getLineCount(textarea.value);

                // Kita masih butuh array hasil split untuk dikirim ke engine
                const translatedLines = textarea.value.split("\n");
                const lang = availableLanguages.find((l) => l.code === langCode);

                // STRICT line count validation per language
                const expectedLineCount = getLineCount(ui.extractedTextArea.value);
                if (actualTranslatedLines !== expectedLineCount) {
                    hasValidationError = true;
                    errorMessages.push(
                        `${lang.name}: Expected ${expectedLineCount} lines, got ${actualTranslatedLines}`
                    );
                } else {
                    translationsByLang[langCode] = translatedLines;
                }
            });

            // Show all validation errors
            if (hasValidationError) {
                alert(
                    `❌ LINE COUNT MISMATCH!\n\n` +
                        errorMessages.join("\n") +
                        `\n\n` +
                        `Translation REJECTED!\n\n` +
                        `Please ensure each language has exactly ${getLineCount(ui.extractedTextArea.value)} lines.`
                );
                return;
            }

            // Warn if overwriting existing languages
            const existingLangs = [];
            if (existingI18nData) {
                selectedLanguages.forEach((langItem) => {
                    const langCode = getLangCode(langItem);
                    if (existingI18nData[langCode]) {
                        existingLangs.push(availableLanguages.find((l) => l.code === langCode)?.name || langCode);
                    }
                });
            }

            if (existingLangs.length > 0) {
                const overwrite = confirm(
                    `⚠️ The following languages already exist:\n` +
                        `${existingLangs.join(", ")}\n\n` +
                        `This will OVERWRITE existing translations.\n\n` +
                        `Continue?`
                );

                if (!overwrite) return;
            }

            try {
                // Show progress
                ui.progressBarContainer.style.display = "block";
                ui.progressBar.style.width = "30%";
                ui.buildStatus.textContent = "Building...";

                // Build i18n for all selected languages
                let finalI18n = existingI18nData ? { ...existingI18nData } : {};

                selectedLanguages.forEach((langItem) => {
                    const langCode = getLangCode(langItem);
                    const translatedLines = translationsByLang[langCode];
                    const newMapping = i18nEngine.buildI18nMapping(textPaths, translatedLines, langCode);
                    finalI18n = i18nEngine.mergeI18n(finalI18n, newMapping, langCode);
                });

                ui.progressBar.style.width = "70%";

                // Get statistics
                const stats = i18nEngine.getStatistics(finalI18n);

                // Prepare download
                prepareDownload(finalI18n);

                // Update UI
                ui.progressBar.style.width = "100%";
                ui.buildStatus.textContent = `✅ Built ${
                    selectedLanguages.length
                } language(s)! Total: ${stats.languages.join(", ")}`;

                // Switch button to download mode
                ui.buildBtn.textContent = "Download i18n";
                ui.buildBtn.classList.add("is-download");

                setTimeout(() => {
                    ui.progressBarContainer.style.display = "none";
                }, 1000);
            } catch (error) {
                ui.buildStatus.textContent = `❌ Build failed: ${error.message}`;
                ui.progressBarContainer.style.display = "none";
                console.error("Build error:", error);
            }
        }

        // ============================================
        // Helper Functions: Download
        // ============================================

        function prepareDownload(i18nData) {
            // Revoke previous URL
            if (downloadUrl) {
                URL.revokeObjectURL(downloadUrl);
            }

            // Create blob
            const jsonString = JSON.stringify(i18nData, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            downloadUrl = URL.createObjectURL(blob);

            // Set download link
            const outputFilename = sourceFilename.replace(".json", "_i18n.json");

            // Convert button to download link
            ui.buildBtn.onclick = () => {
                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = outputFilename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        }

        // ============================================
        // Helper Functions: Copy & Paste
        // ============================================

        async function copyExtractedText() {
            if (!ui.extractedTextArea.value) {
                alert("⚠️ No text to copy!");
                return;
            }

            try {
                // Auto-select all text first
                ui.extractedTextArea.select();
                ui.extractedTextArea.setSelectionRange(0, ui.extractedTextArea.value.length);

                // Copy to clipboard
                await navigator.clipboard.writeText(ui.extractedTextArea.value);

                const originalText = ui.copyBtn.textContent;
                ui.copyBtn.textContent = "✅ Copied!";
                setTimeout(() => {
                    ui.copyBtn.textContent = originalText;
                }, 2000);
            } catch (err) {
                console.error("Copy failed:", err);
                // Fallback: text is already selected from above
                alert("Text selected! Please copy manually (Ctrl+C)");
            }
        }

        async function pasteTranslatedText(langCode) {
            try {
                const text = await navigator.clipboard.readText();
                const textarea = document.getElementById(`text-${langCode}`);
                if (textarea) {
                    // --- TAMBAHKAN LOGIKA TRUNCATION (PEMANGKASAN) ---
                    const maxLineCount = getLineCount(ui.extractedTextArea.value);
                    let finalText = text; // Teks default adalah teks asli

                    if (maxLineCount > 0) {
                        // Hanya pangkas jika ada batas
                        const currentLineCount = getLineCount(text);
                        if (currentLineCount > maxLineCount) {
                            finalText = text
                                .split("\n")
                                .slice(0, maxLineCount) // Ambil 32 baris pertama
                                .join("\n");
                        }
                    }

                    textarea.value = finalText; // Setel nilai dengan teks yang sudah divalidasi
                    // --- AKHIR LOGIKA TRUNCATION ---

                    updateTextareaUI();
                    updateBuildButtonState();
                }
            } catch (err) {
                console.error("Paste failed:", err);
                alert("❌ Failed to paste. Please paste manually (Ctrl+V)");
            }
        }

        async function translateAllText() {
            if (!ui.extractedTextArea.value.trim()) {
                alert("⚠️ No text to translate!");
                return;
            }

            if (selectedLanguages.length === 0) {
                alert("⚠️ No target languages selected!");
                return;
            }

            if (!window.BergamotTranslator) {
                alert("⚠️ Translator not ready. Please wait for initialization.");
                return;
            }

            const sourceText = ui.extractedTextArea.value;
            const bergamotSourceLang = sourceLang === "jp" ? "ja" : sourceLang; // Map jp to ja for bergamot
            const targetLanguages = selectedLanguages
                .map((langItem) => getLangCode(langItem))
                .filter((code) => {
                    const bergamotLang = code === "jp" ? "ja" : code;
                    return bergamotLang !== bergamotSourceLang;
                });

            if (targetLanguages.length === 0) {
                alert("⚠️ No valid target languages (all same as source)!");
                return;
            }

            // Disable all translate buttons
            ui.translateAllBtn.disabled = true;
            ui.translateAllBtn.textContent = "Translating...";
            const allTranslateBtns = document.querySelectorAll(".translate-btn");
            allTranslateBtns.forEach((btn) => {
                btn.disabled = true;
                btn.textContent = "Waiting...";
            });

            try {
                for (const targetLang of targetLanguages) {
                    const bergamotLang = targetLang === "jp" ? "ja" : targetLang;
                    const translateBtn = document.querySelector(`.translate-btn[data-lang="${targetLang}"]`);
                    if (translateBtn) {
                        translateBtn.textContent = "Processing...";
                    }

                    console.log(`Translating to ${targetLang} (${bergamotLang})...`);

                    // Create new translator backing and setup
                    const translatorBacking = new TranslatorBacking({ registryUrl: "models/registry.json" });

                    // Setup registry (copy from main setup)
                    if (typeof nw !== "undefined") {
                        let fsPromises = null;
                        let pathModule = null;
                        let urlModule = null;

                        try {
                            fsPromises = require("fs").promises;
                            pathModule = require("path");
                            urlModule = require("url");
                        } catch (e) {
                            console.error("Gagal memuat modul Node.js:", e);
                        }

                        if (fsPromises && pathModule && urlModule) {
                            try {
                                // Baca package.json untuk mendapatkan main path
                                const packageJsonPath = pathModule.join(nw.App.startPath, "package.json");
                                const packageJson = JSON.parse(await fsPromises.readFile(packageJsonPath, "utf8"));
                                const mainPath = packageJson.main;
                                // Dapatkan direktori dari main file (index.html)
                                const basePath = pathModule.dirname(pathModule.join(nw.App.startPath, mainPath));
                                const absoluteRegistryPath = pathModule.join(basePath, "models/registry.json");

                                const raw = await fsPromises.readFile(absoluteRegistryPath, "utf8");
                                const parsed = JSON.parse(raw);

                                // Format registry
                                const formatted = Array.from(Object.entries(parsed), ([key, files]) => ({
                                    from: key.substring(0, 2),
                                    to: key.substring(2, 4),
                                    files,
                                }));

                                translatorBacking.registry = Promise.resolve(formatted);

                                // Override fetch
                                const originalFetch = translatorBacking.fetch.bind(translatorBacking);
                                translatorBacking.fetch = async (url, checksum, extra) => {
                                    if (
                                        typeof url === "string" &&
                                        !url.startsWith("http:") &&
                                        !url.startsWith("https:")
                                    ) {
                                        const absoluteModelPath = pathModule.join(basePath, url);
                                        try {
                                            const buf = await fsPromises.readFile(absoluteModelPath);
                                            return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
                                        } catch (e) {
                                            console.error(`Gagal memuat file model: ${absoluteModelPath}`, e);
                                            throw e;
                                        }
                                    }
                                    return originalFetch(url, checksum, extra);
                                };
                            } catch (err) {
                                console.error("NW.js: Gagal memuat registry untuk translateAll:", err);
                            }
                        }
                    } else if (typeof window !== "undefined") {
                        try {
                            const response = await fetch("models/registry.json");
                            const parsed = await response.json();

                            // Format registry
                            const formatted = Array.from(Object.entries(parsed), ([key, files]) => ({
                                from: key.substring(0, 2),
                                to: key.substring(2, 4),
                                files,
                            }));

                            translatorBacking.registry = Promise.resolve(formatted);
                        } catch (err) {
                            console.error("Browser: Gagal memuat registry untuk translateAll:", err);
                        }
                    }

                    // Create translator
                    const tempTranslator = new BatchTranslator({}, translatorBacking);

                    try {
                        const response = await tempTranslator.translate({
                            from: bergamotSourceLang,
                            to: bergamotLang,
                            text: sourceText,
                            html: false,
                        });
                        const textarea = document.getElementById(`text-${targetLang}`);
                        if (textarea) {
                            textarea.value = response.target.text;
                            updateTranslationStatus(targetLang);
                        }
                        console.log(`Translation to ${targetLang} completed.`);
                    } catch (error) {
                        console.error(`Translation error for ${targetLang}:`, error);
                    } finally {
                        // Free memory
                        tempTranslator.delete();
                        if (translateBtn) {
                            translateBtn.textContent = "Done";
                            // Keep disabled until all are done
                        }
                    }
                }

                updateTextareaUI();
                updateBuildButtonState();
            } catch (error) {
                console.error("Translate all error:", error);
                alert("❌ Translation failed. Check console for details.");
            } finally {
                // Re-enable all buttons
                ui.translateAllBtn.disabled = false;
                ui.translateAllBtn.textContent = "Translate All";
                allTranslateBtns.forEach((btn) => {
                    btn.disabled = false;
                    btn.textContent = "Translate";
                });
            }
        }

        async function translateIndividualText(langCode) {
            if (!ui.extractedTextArea.value.trim()) {
                alert("⚠️ No text to translate!");
                return;
            }

            if (!window.BergamotTranslator) {
                alert("⚠️ Translator not ready. Please wait for initialization.");
                return;
            }

            const translateBtn = document.querySelector(`.translate-btn[data-lang="${langCode}"]`);
            const bergamotSourceLang = sourceLang === "jp" ? "ja" : sourceLang; // Map jp to ja for bergamot
            const bergamotLang = langCode === "jp" ? "ja" : langCode; // Map jp to ja for bergamot

            if (bergamotLang === bergamotSourceLang) {
                alert("⚠️ Source and target language are the same!");
                return;
            }

            // Disable all other translate buttons
            const allTranslateBtns = document.querySelectorAll(".translate-btn");
            allTranslateBtns.forEach((btn) => {
                if (btn !== translateBtn) {
                    btn.disabled = true;
                    btn.textContent = "Waiting";
                }
            });

            translateBtn.disabled = true;
            translateBtn.textContent = "Translating...";

            try {
                const sourceText = ui.extractedTextArea.value;
                const translatedText = await window.BergamotTranslator.translate(
                    sourceText,
                    bergamotSourceLang,
                    bergamotLang
                );
                const textarea = document.getElementById(`text-${langCode}`);
                textarea.value = translatedText;
                updateTranslationStatus(langCode);
                updateTextareaUI();
                updateBuildButtonState();
            } catch (error) {
                console.error(`Translation error for ${langCode}:`, error);
                alert(`❌ Translation failed for ${langCode}. Check console for details.`);
            } finally {
                // Re-enable all buttons
                allTranslateBtns.forEach((btn) => {
                    btn.disabled = false;
                    btn.textContent = "Translate";
                });
            }
        }

        // ============================================
        // Helper Functions: Textarea UI
        // ============================================

        function getLineCount(text) {
            // Count actual lines in textarea content
            // Empty text = 0 lines, text with n newlines = n+1 lines
            if (text === "") return 0;
            return (text.match(/\n/g) || []).length + 1;
        }

        function updateLineNumbers(lineEl, lineCount) {
            let html = "";
            for (let i = 1; i <= lineCount; i++) {
                html += `<div class="line-number">${i}</div>`;
            }
            lineEl.innerHTML = html;
        }

        function updateLineBackgrounds(bgEl, lineCount, isExtracted = false, textContent = "") {
            // For extracted text (source), generate more backgrounds to ensure full coverage when scrolling
            // For translation text, only generate what's needed based on actual content
            let actualBackgroundCount;

            if (isExtracted) {
                // Extracted text: always generate enough for scrolling (minimum 100 or double content)
                const minBackgrounds = 100;
                actualBackgroundCount = Math.max(minBackgrounds, lineCount * 2);
            } else {
                // Translation text: generate based on content (add small buffer for safety)
                actualBackgroundCount = Math.max(lineCount + 10, 20);
            }

            // Split text into lines to check which are empty
            const lines = textContent.split("\n");

            let html = "";
            for (let i = 0; i < actualBackgroundCount; i++) {
                // Check if this line is empty:
                // - Only if beyond actual line count (no content at all)
                // - Lines with just whitespace/enter still count as existing lines
                const isEmpty = i >= lines.length;
                const emptyClass = isEmpty ? " empty" : "";
                html += `<div class="line-bg${emptyClass}"></div>`;
            }

            bgEl.innerHTML = html;
        }

        function updateTranslationStatus(langCode) {
            const statusEl = document.getElementById(`status-${langCode}`);
            if (!statusEl) return;

            const textarea = document.getElementById(`text-${langCode}`);
            if (!textarea || !textarea.value.trim()) {
                statusEl.style.display = "none";
                return;
            }

            // Compare line count between translation and extracted text
            const translationLineCount = getLineCount(textarea.value);
            const extractedLineCount = getLineCount(ui.extractedTextArea.value); // Use same method as translation

            if (translationLineCount === extractedLineCount && extractedLineCount > 0) {
                statusEl.style.display = "inline";
            } else {
                statusEl.style.display = "none";
            }
        }

        function highlightActiveLine(lineNumber) {
            // Remove previous active line highlights from all textareas
            document.querySelectorAll(".line-bg.active-line").forEach((el) => {
                el.classList.remove("active-line");
            });

            if (lineNumber < 1) return;

            // Add active line highlight to extracted text (always highlight if line exists)
            const extractedBg = document.getElementById("extracted-bg");
            if (extractedBg) {
                const extractedLine = extractedBg.children[lineNumber - 1];
                if (extractedLine) {
                    extractedLine.classList.add("active-line");
                }
            }

            // Add active line highlight to all translation columns
            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                const bg = document.getElementById(`bg-${langCode}`);

                if (bg && textarea) {
                    const bgLine = bg.children[lineNumber - 1];

                    // Only highlight if the line exists in textarea content
                    if (bgLine) {
                        const lines = textarea.value.split("\n");

                        // Check if this line number exists in the textarea
                        if (lineNumber <= lines.length) {
                            bgLine.classList.add("active-line");
                        }
                    }
                }
            });
        }

        function getLineNumberFromCursor(textarea) {
            const cursorPos = textarea.selectionStart;
            const textBeforeCursor = textarea.value.substring(0, cursorPos);
            return textBeforeCursor.split("\n").length;
        }

        function updateTextareaUI() {
            // Get extracted text line count using the same method as translation textareas
            const extractedLineCount = getLineCount(ui.extractedTextArea.value);

            // Update extracted line numbers and backgrounds
            updateLineNumbers(ui.extractedLines, extractedLineCount);
            const extractedBg = document.getElementById("extracted-bg");
            if (extractedBg) {
                updateLineBackgrounds(extractedBg, extractedLineCount, true, ui.extractedTextArea.value);
            }

            // Update all translation line numbers and backgrounds based on their own content
            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                const lines = document.getElementById(`lines-${langCode}`);
                const bg = document.getElementById(`bg-${langCode}`);

                const translationLineCount = textarea ? getLineCount(textarea.value) : 0;

                if (lines) {
                    updateLineNumbers(lines, translationLineCount);
                }
                if (bg && textarea) {
                    updateLineBackgrounds(bg, translationLineCount, false, textarea.value);
                }

                // Update translation status checkmark
                updateTranslationStatus(langCode);
            });
        }
        function handleScroll(e) {
            if (activeSync && activeSync !== e.target) return;
            activeSync = e.target;
            const sourceScrollTop = e.target.scrollTop;
            const sourceMaxScroll = e.target.scrollHeight - e.target.clientHeight;
            const scrollPercentage = sourceMaxScroll > 0 ? sourceScrollTop / sourceMaxScroll : 0;

            // Always sync: extracted textarea and its components (source has full content)
            const alwaysSyncElements = [ui.extractedTextArea, ui.extractedLines];

            // Add extracted background (always has enough content)
            const extractedBg = document.getElementById("extracted-bg");
            if (extractedBg) alwaysSyncElements.push(extractedBg);

            // Add all translation components - ALL are conditional based on textarea content
            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                const lines = document.getElementById(`lines-${langCode}`);
                const bg = document.getElementById(`bg-${langCode}`);

                // Check if textarea has enough content to scroll
                if (textarea) {
                    const targetMaxScroll = textarea.scrollHeight - textarea.clientHeight;

                    if (targetMaxScroll > 5) {
                        // Has scrollable content - sync based on percentage
                        const targetScrollTop = scrollPercentage * targetMaxScroll;

                        if (textarea !== e.target) {
                            textarea.scrollTop = targetScrollTop;
                        }
                        if (lines) {
                            lines.scrollTop = targetScrollTop;
                        }
                        if (bg) {
                            bg.scrollTop = targetScrollTop;
                        }
                    }
                    // If not enough content, don't sync any of them (no glitch)
                }
            });

            // Sync elements that always follow the scroll (extracted side only) - use absolute scroll for these
            alwaysSyncElements.forEach((el) => {
                if (el && el !== e.target) {
                    el.scrollTop = sourceScrollTop;
                }
            });

            clearTimeout(e.target.scrollTimeout);
            e.target.scrollTimeout = setTimeout(() => (activeSync = null), 50);
        }
        // ============================================
        // Helper Functions: UI State Management
        // ============================================

        function updateBuildButtonState() {
            const hasSource = sourceJsonData !== null && textPaths.length > 0;
            const hasLanguages = selectedLanguages.length > 0;
            const hasTranslations = selectedLanguages.some((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                return textarea && textarea.value.trim().length > 0;
            });

            ui.buildBtn.disabled = !(hasSource && hasLanguages && hasTranslations);
        }

        function resetToBuildState() {
            if (downloadUrl) {
                URL.revokeObjectURL(downloadUrl);
                downloadUrl = null;
            }
            ui.buildBtn.textContent = "Build i18n";
            ui.buildBtn.classList.remove("is-download");
            ui.buildBtn.onclick = buildI18nMapping;

            if (textPaths.length > 0 && selectedLanguages.length > 0) {
                const expectedLines = getLineCount(ui.extractedTextArea.value);
                ui.buildStatus.textContent = `Ready to build (${expectedLines} texts × ${selectedLanguages.length} languages)`;
            }
        }

        function resetSourceState() {
            sourceJsonData = null;
            textPaths = [];
            sourceFilename = ""; // Reset filename too
            ui.extractedTextArea.value = "";

            // Clear all translation textareas
            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                if (textarea) textarea.value = "";
            });

            ui.sourceDropZone.classList.remove("has-file");
            ui.sourceBadge.innerHTML = "";
            ui.buildBtn.disabled = true;
            ui.buildStatus.textContent = "Waiting for source file...";
            updateTextareaUI();
        }

        function resetI18nState() {
            existingI18nData = null;
            ui.i18nDropZone.classList.remove("has-file");
            ui.i18nBadge.innerHTML = '<span class="status-badge">No i18n file</span>';

            // Clear all translation textareas since i18n data is gone
            selectedLanguages.forEach((langItem) => {
                const langCode = getLangCode(langItem);
                const textarea = document.getElementById(`text-${langCode}`);
                if (textarea) textarea.value = "";
            });

            updateTextareaUI();
            updateBuildButtonState();
            resetToBuildState();
        }

        function clearAllData() {
            const confirmClear = confirm(
                `⚠️ CLEAR ALL DATA?\n\n` +
                    `This will reset everything:\n` +
                    `• Source file data\n` +
                    `• i18n file data\n` +
                    `• All translations\n` +
                    `• Language selections\n\n` +
                    `Continue?`
            );

            if (!confirmClear) return;

            // Reset all state
            resetSourceState();
            resetI18nState();

            // Reset language selections
            selectedLanguages = [{ code: "en", order: 1 }];
            ui.langCountBadge.textContent = selectedLanguages.length;

            // Update the language selector button
            updateLanguageSelectorButton();

            // Regenerate translation columns
            generateTranslationColumns();

            // Reset filename
            sourceFilename = "";

            ui.buildStatus.textContent = "All data cleared. Ready to start fresh!";
        }

        // ============================================
        // Initialize
        // ============================================

        // Set default language badge
        ui.langCountBadge.textContent = selectedLanguages.length;

        // Update the language selector button with default selection
        updateLanguageSelectorButton();

        // Initialize source language dropdown with default selection
        const defaultLang = availableLanguages.find((lang) => lang.code === sourceLang);
        if (defaultLang) {
            ui.sourceDropdownSelected.innerHTML = `
            <img src="${defaultLang.flag}" alt="${defaultLang.code}" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle; border-radius: 2px;">
            ${defaultLang.name}
            <span class="dropdown-arrow">▼</span>
        `;
        }

        // Generate initial translation column (English)
        generateTranslationColumns();

        // Add input listener for extracted textarea
        // HARUS 'ui.extractedTextArea', BUKAN 'textarea'
        ui.extractedTextArea.addEventListener("input", () => {
            resetToBuildState();
            updateTextareaUI(); // Baris ini juga penting
            updateBuildButtonState(); // Baris ini juga penting
        });

        // Add click and cursor movement listeners for line highlighting on extracted textarea
        ui.extractedTextArea.addEventListener("click", () => {
            const lineNumber = getLineNumberFromCursor(ui.extractedTextArea);
            highlightActiveLine(lineNumber);
        });

        ui.extractedTextArea.addEventListener("keyup", () => {
            const lineNumber = getLineNumberFromCursor(ui.extractedTextArea);
            highlightActiveLine(lineNumber);
        });

        // Sync scroll for extracted text
        ui.extractedTextArea.addEventListener("scroll", handleScroll);
        ui.extractedLines.addEventListener("scroll", handleScroll);

        updateTextareaUI();
        updateBuildButtonState();
    }); // Close the import then()
}); // Close document.addEventListener

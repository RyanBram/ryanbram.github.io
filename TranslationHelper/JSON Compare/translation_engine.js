// Deteksi environment
const isNWjs =
    typeof nw !== "undefined" || (typeof process !== "undefined" && process.versions && process.versions["nw"]);
const isBrowser = !isNWjs && typeof window !== "undefined";

// Detect if running with server or local file system
const isServerMode =
    typeof window !== "undefined" &&
    window.location &&
    (window.location.protocol === "http:" || window.location.protocol === "https:");

console.log(`[Translation Engine] Environment: ${isNWjs ? "NW.js" : "Browser"}`);
console.log(`[Translation Engine] Mode: ${isServerMode ? "SERVER" : "LOCAL (file://)"}`);
console.log(`[Translation Engine] Translation available: ${isNWjs || isServerMode}`);

// Load bergamot translator (only if server mode or NW.js)
(async () => {
    // Skip loading if running in local file mode
    if (!isNWjs && !isServerMode) {
        console.warn("[Translation Engine] Skipping Bergamot initialization - running in LOCAL mode");
        console.warn("[Translation Engine] Translation features disabled. Basic features available.");

        // Set a flag to indicate translation is not available
        window.BergamotTranslator = null;

        // Notify UI that we're ready (without translation)
        window.dispatchEvent(
            new CustomEvent("translatorStatus", {
                detail: { ready: false, reason: "local-mode" },
            })
        );

        return;
    }

    console.log("[Translation Engine] Initializing Bergamot translator...");
    // Helper to convert file:// URLs to paths
    function fileUrlToPath(url) {
        if (!url) return url;
        if (url.startsWith("file://localhost/")) return url.replace("file://localhost/", "");
        if (url.startsWith("file:///")) return url.replace("file:///", "");
        if (url.startsWith("file://")) return url.replace("file://", "");
        return url;
    }

    // NW.js: Setup Worker polyfill
    if (isNWjs && typeof window.Worker === "undefined") {
        try {
            const { Worker: NodeWorker } = require("worker_threads");
            const { fileURLToPath } = require("url");

            window.Worker = class {
                constructor(spec) {
                    let path;
                    if (typeof spec === "object" && spec.href) {
                        path = fileURLToPath(spec.href);
                    } else if (typeof spec === "string" && spec.startsWith("file://")) {
                        path = fileURLToPath(spec);
                    } else {
                        path = spec;
                    }

                    this._worker = new NodeWorker(path);
                    this._listeners = { message: [], error: [] };

                    this._worker.on("message", (data) => {
                        this._listeners.message.forEach((cb) => cb({ data }));
                    });
                    this._worker.on("error", (err) => {
                        this._listeners.error.forEach((cb) => cb(err));
                    });
                }

                addEventListener(name, cb) {
                    if (!this._listeners[name]) this._listeners[name] = [];
                    this._listeners[name].push(cb);
                }

                postMessage(msg) {
                    this._worker.postMessage(msg);
                }

                terminate() {
                    try {
                        this._worker.terminate();
                    } catch (e) {
                        /* ignore */
                    }
                }
            };
        } catch (e) {
            console.warn("Could not create Worker polyfill:", e);
        }
    }

    // Import bergamot translator module
    let mod, BatchTranslator, TranslatorBacking;

    try {
        mod = await import("./node_modules/@browsermt/bergamot-translator/translator.js");
        BatchTranslator = mod.BatchTranslator;
        TranslatorBacking = mod.TranslatorBacking;
    } catch (error) {
        console.error("[Translation Engine] Failed to load Bergamot module:", error);
        console.warn("[Translation Engine] Translation features disabled");

        window.BergamotTranslator = null;
        window.dispatchEvent(
            new CustomEvent("translatorStatus", {
                detail: { ready: false, reason: "module-load-error", error: error.message },
            })
        );

        return;
    }

    // Path ke registry (relatif terhadap index.html)
    const localRegistryUrl = "models/registry.json";

    // Buat translator backing
    const translatorBacking = new TranslatorBacking({ registryUrl: localRegistryUrl });

    // ============================================================
    // NW.js Mode: Gunakan Node.js fs untuk membaca file lokal
    // ============================================================
    if (isNWjs) {
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
                const absoluteRegistryPath = pathModule.join(basePath, localRegistryUrl);

                console.log("NW.js: Memuat registry dari:", absoluteRegistryPath);
                const raw = await fsPromises.readFile(absoluteRegistryPath, "utf8");
                const parsed = JSON.parse(raw);

                // Format registry
                const formatted = Array.from(Object.entries(parsed), ([key, files]) => ({
                    from: key.substring(0, 2),
                    to: key.substring(2, 4),
                    files,
                }));

                translatorBacking.registry = Promise.resolve(formatted);

                // Override fetch untuk membaca file model lokal
                const originalFetch = translatorBacking.fetch.bind(translatorBacking);
                translatorBacking.fetch = async (url, checksum, extra) => {
                    if (typeof url === "string" && !url.startsWith("http:") && !url.startsWith("https:")) {
                        const absoluteModelPath = pathModule.join(basePath, url);
                        console.log("NW.js: Memuat model dari:", absoluteModelPath);

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

                console.log("NW.js: File system setup berhasil");
            } catch (err) {
                console.error("NW.js: Gagal memuat registry lokal:", err);
            }
        }
    }
    // ============================================================
    // Browser Mode: Gunakan fetch API (localhost/server)
    // ============================================================
    else if (isBrowser) {
        try {
            console.log("Browser: Memuat registry melalui fetch API");
            const response = await fetch(localRegistryUrl);
            const parsed = await response.json();

            // Format registry
            const formatted = Array.from(Object.entries(parsed), ([key, files]) => ({
                from: key.substring(0, 2),
                to: key.substring(2, 4),
                files,
            }));

            translatorBacking.registry = Promise.resolve(formatted);
            console.log("Browser: Registry loaded successfully");
        } catch (err) {
            console.error("Browser: Gagal memuat registry:", err);
        }
    }

    // Create translator
    const translator = new BatchTranslator({}, translatorBacking);

    // Debug: print loaded registry
    translator.backing.registry
        .then((reg) => console.log("Registry berhasil dimuat:", reg))
        .catch((err) => console.error("Registry error:", err));

    // Expose translator function
    window.BergamotTranslator = {
        translate: async (text, from, to) => {
            if (!text.trim()) return text;

            try {
                // Split text into lines
                const lines = text.split("\n");
                const translatedLines = [];

                for (const line of lines) {
                    if (line.trim()) {
                        const response = await translator.translate({
                            from: from,
                            to: to,
                            text: line,
                            html: false,
                        });
                        translatedLines.push(response.target.text);
                    } else {
                        translatedLines.push(line); // Keep empty lines
                    }
                }

                return translatedLines.join("\n");
            } catch (error) {
                console.error("Translation error:", error);
                throw error;
            }
        },

        translateAll: async (text, from, targetLanguages) => {
            const results = {};
            for (const to of targetLanguages) {
                if (from === to) continue; // Skip same language

                // Create new translator backing and setup for each language
                const translatorBacking = new TranslatorBacking({ registryUrl: localRegistryUrl });

                // Setup registry (copy from main setup)
                if (isNWjs) {
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
                            const absoluteRegistryPath = pathModule.join(basePath, localRegistryUrl);

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
                                if (typeof url === "string" && !url.startsWith("http:") && !url.startsWith("https:")) {
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
                } else if (isBrowser) {
                    try {
                        const response = await fetch(localRegistryUrl);
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
                        from: from,
                        to: to,
                        text: text,
                        html: false,
                    });
                    results[to] = response.target.text;
                } catch (error) {
                    console.error(`Translation error for ${to}:`, error);
                    results[to] = `Error: ${error.message}`;
                } finally {
                    // Free memory
                    tempTranslator.delete();
                }
            }
            return results;
        },
    };

    // Wire UI handlers (for demo page, if exists)
    const translateBtn = document.getElementById("translate-btn");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
    const langFrom = document.getElementById("lang-from");
    const langTo = document.getElementById("lang-to");

    if (translateBtn) {
        translateBtn.addEventListener("click", async () => {
            const text = inputText.value;
            const from = langFrom.value;
            const to = langTo.value;

            if (!text.trim()) {
                outputText.textContent = "Masukkan teks yang akan diterjemahkan";
                return;
            }

            if (from === to) {
                outputText.textContent = "Bahasa sumber dan target tidak boleh sama";
                return;
            }

            try {
                outputText.textContent = "Menerjemahkan...";
                translateBtn.disabled = true;

                const response = await translator.translate({
                    from: from,
                    to: to,
                    text: text,
                    html: false,
                });

                outputText.textContent = response.target.text;
            } catch (error) {
                console.error("Translation error:", error);
                outputText.textContent = `Error: ${error.message}`;
            } finally {
                translateBtn.disabled = false;
            }
        });
    }

    // Cleanup on page unload
    window.addEventListener("beforeunload", () => {
        translator.delete();
    });

    console.log("Translator siap digunakan!");
})();

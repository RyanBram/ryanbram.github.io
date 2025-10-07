/*:
 * @plugindesc (v1.0) Memutar file MIDI menggunakan WebMIDIPlayer.js.
 * @author Gemini & Kolaborasi
 * @license MIT
 * @target MV
 * @requiredAssets js/plugins/WebMIDIPlayer.js
 *
 * @param debugMode
 * @text Mode Debug
 * @desc Aktifkan untuk menampilkan pesan logging detail di konsol (F8).
 * @type boolean
 * @default true
 *
 * @help
 * ===========================================================================
 * WebMIDIPlayer_Plugin.js
 * ===========================================================================
 * Plugin ini memungkinkan RPG Maker MV untuk memutar file audio berformat .mid
 * atau .midi menggunakan library WebMIDIPlayer.js.
 *
 * --- Cara Penggunaan ---
 * 1. Letakkan file plugin ini (WebMIDIPlayer_Plugin.js) di folder /js/plugins/
 * proyek Anda.
 * 2. Letakkan file WebMIDIPlayer.js.js di folder /js/plugins/ proyek Anda.
 * 3. Aktifkan plugin ini melalui Plugin Manager di editor RPG Maker MV.
 * 4. Tempatkan file MIDI (.mid) Anda di folder /audio/bgm/ atau /audio/me/.
 * 5. Mainkan file MIDI seperti file audio biasa melalui event command.
 *
 * --- Catatan Penting ---
 * - Plugin ini meniru arsitektur dinamis dari SF2_MIDIPlayer.js, artinya
 * library WebMIDIPlayer.js hanya akan dimuat ke dalam game saat file MIDI
 * pertama kali akan diputar.
 * - Berdasarkan implementasi di MIDIPlayer.html, backend WebMIDIPlayer.js
 * tampaknya tidak menyediakan fungsi eksplisit untuk menghentikan,
 * mengulang (loop), atau mengatur volume audio. Oleh karena itu, fitur-fitur
 * seperti stop, loop, dan pengaturan volume mungkin tidak berfungsi seperti
 * yang diharapkan. Fungsi utama yang terjamin adalah memulai pemutaran.
 */

(() => {
    "use strict";

    const pluginName = "WebMIDIPlayer_Plugin";
    const parameters = PluginManager.parameters(pluginName);
    const debugMode = parameters.debugMode === "true";

    // Helper untuk logging
    const log = (message) => {
        if (debugMode) console.log(`[${pluginName}] ${message}`);
    };
    const warn = (message) => {
        if (debugMode) console.warn(`[${pluginName}] ${message}`);
    };

    //============================================================================
    // BackendManager (Diadaptasi dari SF2_MIDIPlayer.js)
    // Mengelola pemuatan skrip eksternal secara dinamis.
    //============================================================================
    class BackendManager {
        constructor() {
            this._backends = {}; // { id: { status: 'loading'|'loaded'|'error', promise, backend } }
        }

        loadBackend(id, scriptUrl) {
            if (this._backends[id]) {
                return this._backends[id].promise;
            }

            const promise = new Promise((resolve, reject) => {
                log(`Memuat backend '${id}' dari ${scriptUrl}...`);
                const script = document.createElement("script");
                script.src = scriptUrl;
                script.onload = () => {
                    // Berdasarkan MIDIPlayer.html, library ini membuat objek global 'ZL'.
                    if (window.ZL) {
                        log(`Backend '${id}' berhasil dimuat.`);
                        this._backends[id].status = "loaded";
                        this._backends[id].backend = window.ZL;
                        resolve(window.ZL);
                    } else {
                        warn(`Gagal memuat backend '${id}': Objek ZL tidak ditemukan.`);
                        this._backends[id].status = "error";
                        reject(new Error(`Objek ZL tidak ditemukan setelah memuat ${scriptUrl}`));
                    }
                };
                script.onerror = (e) => {
                    warn(`Gagal memuat backend '${id}' dari ${scriptUrl}.`);
                    this._backends[id].status = "error";
                    reject(e);
                };
                document.body.appendChild(script);
            });

            this._backends[id] = {
                status: "loading",
                promise: promise,
                backend: null,
            };

            return promise;
        }

        getBackend(id) {
            return this._backends[id] ? this._backends[id].backend : null;
        }
    }

    const backendManager = new BackendManager();

    //============================================================================
    // Format Handlers (Diadaptasi dari SF2_MIDIPlayer.js)
    // Menangani format audio spesifik.
    //============================================================================
    const formatHandlers = {};

    const webMidiPlayerHandler = {
        id: "webmidiplayer",
        extensions: ["_mid", "_midi"],
        backend: null,
        initialized: false,

        init: function () {
            if (this.initialized) {
                return Promise.resolve(this.backend);
            }
            return backendManager.loadBackend(this.id, "js/plugins/WebMIDIPlayer.js").then((backend) => {
                this.backend = backend;
                this.initialized = true;
                log("WebMIDIPlayer backend siap digunakan.");
                return backend;
            });
        },

        createAudio: function (url) {
            return new ExternalAudioWebMIDI(url);
        },
    };

    formatHandlers[webMidiPlayerHandler.id] = webMidiPlayerHandler;

    //============================================================================
    // ExternalAudioWebMIDI (Class Inti)
    // Objek audio kustom untuk WebMIDIPlayer.
    //============================================================================
    class ExternalAudioWebMIDI {
        constructor(url) {
            this._url = url;
            this._volume = 1;
            this._pitch = 1;
            this._pan = 0;
            this._data = null; // ArrayBuffer dari file MIDI
            this._isLoading = false;
            this._isPlaying = false;
            this._onLoadListeners = [];
            this.initPromise = webMidiPlayerHandler.init();
        }

        // --- Metode Inti RPG Maker ---
        play(loop, offset) {
            log(`Memulai pemutaran untuk: ${this._url}`);
            if (this._isPlaying) {
                warn("Pemutaran sudah berjalan. Fungsi stop tidak didukung, jadi pemutaran baru akan tumpang tindih.");
            }
            if (this._data) {
                this._startPlayback();
            } else {
                this._load().then(() => this._startPlayback());
            }
        }

        stop() {
            warn("Fungsi 'stop' tidak didukung oleh backend WebMIDIPlayer.js.");
            this._isPlaying = false;
        }

        fadeIn(duration) {
            log(`Fungsi 'fadeIn' dipanggil, namun akan diputar dengan volume standar.`);
            this.play(false, 0);
        }

        fadeOut(duration) {
            warn("Fungsi 'fadeOut' tidak didukung oleh backend WebMIDIPlayer.js.");
        }

        seek(offset) {
            warn("Fungsi 'seek' tidak didukung oleh backend WebMIDIPlayer.js.");
        }

        // --- Metode Internal ---
        _load() {
            if (this._isLoading) return;
            this._isLoading = true;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", this._url);
                xhr.responseType = "arraybuffer";
                xhr.onload = () => {
                    if (xhr.status < 400) {
                        this._data = xhr.response;
                        this._isLoading = false;
                        log(`Data MIDI untuk ${this._url} berhasil dimuat.`);
                        this._callLoadListeners();
                        resolve();
                    }
                };
                xhr.onerror = (e) => {
                    warn(`Gagal memuat file: ${this._url}`);
                    this._isLoading = false;
                    reject(e);
                };
                xhr.send();
            });
        }

        _startPlayback() {
            this.initPromise
                .then((backend) => {
                    if (!this._data) {
                        warn("Tidak ada data MIDI untuk diputar.");
                        return;
                    }

                    log("Memproses pemutaran dengan backend WebMIDIPlayer.");
                    const contents = new Uint8Array(this._data);
                    const filename = this._url.split("/").pop();

                    // Proses ini meniru fungsi `load` dari MIDIPlayer.html
                    const fnPtr = backend.malloc_string(filename);
                    const dataPtr = backend.malloc(contents.length);
                    backend.HEAPU8.set(contents, dataPtr);

                    // Memanggil fungsi inti untuk memutar MIDI
                    backend.play_midi(dataPtr, contents.length, fnPtr);

                    // Membersihkan memori yang dialokasikan di Wasm
                    backend.free(dataPtr);
                    backend.free_string(fnPtr);

                    this._isPlaying = true;
                })
                .catch((error) => {
                    console.error("Gagal memulai pemutaran karena backend tidak siap.", error);
                });
        }

        // --- Properti Volume, Pitch, Pan (Placeholder) ---
        // Properti ini dibutuhkan oleh RPG Maker, namun mungkin tidak berfungsi
        // karena keterbatasan backend.
        get volume() {
            return this._volume;
        }
        set volume(value) {
            if (this._volume !== value) {
                this._volume = value;
                warn("Pengaturan volume tidak sepenuhnya didukung oleh backend ini.");
            }
        }

        get pitch() {
            return this._pitch;
        }
        set pitch(value) {
            if (this._pitch !== value) {
                this._pitch = value;
                warn("Pengaturan pitch tidak didukung oleh backend ini.");
            }
        }

        get pan() {
            return this._pan;
        }
        set pan(value) {
            if (this._pan !== value) {
                this._pan = value;
                warn("Pengaturan pan tidak didukung oleh backend ini.");
            }
        }

        // --- Helper Listeners ---
        addLoadListener(listener) {
            this._onLoadListeners.push(listener);
        }

        _callLoadListeners() {
            while (this._onLoadListeners.length > 0) {
                this._onLoadListeners.shift()();
            }
        }
    }

    //============================================================================
    // AudioManager Integration (Diadaptasi dari SF2_MIDIPlayer.js)
    //============================================================================
    const _AudioManager_createBuffer = AudioManager.createBuffer;
    AudioManager.createBuffer = function (folder, name) {
        // Hapus ekstensi .ogg yang mungkin ditambahkan oleh RPG Maker secara default
        const nameWithoutExt = name.replace(/\.ogg$/, "");

        for (const formatId in formatHandlers) {
            const handler = formatHandlers[formatId];
            for (const ext of handler.extensions) {
                if (nameWithoutExt.toLowerCase().endsWith(ext)) {
                    log(`Membuat buffer WebMIDI untuk: ${name}`);
                    // Buat URL yang benar, RPG Maker mungkin menambahkan .ogg di akhir
                    const url = this._path + folder + "/" + encodeURIComponent(nameWithoutExt);
                    return handler.createAudio(url);
                }
            }
        }

        // Jika bukan format MIDI, kembalikan ke metode original RPG Maker
        return _AudioManager_createBuffer.call(this, folder, name);
    };

    console.log(`[${pluginName}] WebMIDIPlayer plugin loaded.`);
})();

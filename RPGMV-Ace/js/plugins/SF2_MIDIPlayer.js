/*:
 * @plugindesc (v5.0 Modular) Memutar file MIDI dengan SoundFont (.sf2) menggunakan arsitektur dinamis.
 * @author Gemini & Kolaborasi (Refactored by AI)
 * @license MIT
 * @target MV
 * @requiredAssets js/plugins/index.js
 * @requiredAssets js/plugins/spessasynth_processor.min.js
 *
 * @param defaultSoundFont
 * @text Default SoundFont
 * @desc Nama file .sf2 yang akan digunakan sebagai default.
 * @type file
 * @dir audio/soundfonts/
 * @default microsoft_gm_3.sf2
 *
 * @param debugMode
 * @text Mode Debug
 * @desc Aktifkan untuk menampilkan pesan logging detail di konsol (F8).
 * @type boolean
 * @default false
 *
 * @help
 * ===========================================================================
 * SF2_MIDIPlayer.js v5.0 (Modular Architecture)
 * ===========================================================================
 * Versi ini dirombak total untuk meniru arsitektur dinamis dari rpg_mixerv2.js.
 *
 * --- Perubahan Utama ---
 * - DYNAMIC LOADING: Audio engine SpessaSynth dan SoundFont hanya akan
 * dimuat saat file MIDI pertama kali akan dimainkan, bukan saat game dimulai.
 * Ini mempercepat waktu loading awal game secara signifikan.
 * - ARSITEKTUR MODULAR: Menggunakan Backend Manager dan Class Audio eksternal
 * yang mirip dengan rpg_mixerv2, membuatnya lebih mudah dipahami dan
 * diintegrasikan dengan plugin lain.
 * - INTEGRASI LEBIH BAIK: Sekarang terhubung ke AudioManager.createBuffer,
 * metode yang lebih 'native' dan kompatibel.
 *
 * --- Cara Penggunaan ---
 * 1. Letakkan file pustaka `index.js` dan `spessasynth_processor.min.js`
 * di folder `js/plugins/`.
 * 2. Letakkan file SoundFont (.sf2) di folder `audio/soundfonts/`.
 * 3. Letakkan file MIDI Anda (misal: `battle.mid`) di folder audio yang
 * sesuai (bgm, bgs, me).
 * 4. Ganti nama ekstensi file MIDI menjadi `.ogg` dan tambahkan suffix `_mid`.
 * Contoh: `battle.mid` -> `battle_mid.ogg`
 * 5. Gunakan event command 'Play BGM' seperti biasa di editor.
 *
 * Jika pustaka atau SoundFont gagal dimuat, game tidak akan crash, melainkan
 * akan menampilkan error di konsol (F8) dan melanjutkan tanpa audio.
 */

"use strict";

(function () {
    const pluginName = "SF2_MIDIPlayer_Modular";
    const parameters = PluginManager.parameters(pluginName);
    const defaultSoundFont = String(parameters["defaultSoundFont"] || "soundfont.sf2");
    const DEBUG = String(parameters["debugMode"] || "false") === "true";

    const log = (...args) => DEBUG && console.log(`%c${pluginName}:`, "color: #33aaff;", ...args);
    const err = (...args) => console.error(`${pluginName}:`, ...args);

    // --- Dynamic Backend Loader & Manager (Mirip rpg_mixerv2) ---
    // Manages the on-demand loading and state of the SpessaSynth engine.
    const SF2EngineManager = {
        _libScripts: {
            spessa: "js/plugins/spessasynth_lib.compat.js",
            worklet: "js/plugins/spessasynth_processor.compat.js",
        },
        _state: "unloaded", // unloaded, loading, ready, failed
        _promise: null,
        // Shared engine resources
        audioContext: null,
        synthesizer: null,
        sequencer: null,
        gainNode: null,
        lib: null,

        // Returns a promise that resolves when the engine is ready.
        require: function () {
            if (this._promise) {
                return this._promise;
            }

            this._promise = new Promise(async (resolve, reject) => {
                if (this._state === "ready") return resolve();
                if (this._state === "failed") return reject(`[${pluginName}] Engine previously failed to load.`);

                log("SpessaSynth engine loading started...");
                this._state = "loading";

                try {
                    // 1. Load SpessaSynth main library
                    await this._loadScript("spessa");
                    await this._waitForLibrary();
                    if (!this.lib) throw new Error("SpessaSynthLib not found on window.");

                    // 2. Setup AudioContext and Worklet
                    this.audioContext = WebAudio._context || new AudioContext();
                    if (this.audioContext.state === "suspended") await this.audioContext.resume();

                    const workletBlob = await this._fetchScriptAsBlob("worklet");
                    const workletUrl = URL.createObjectURL(workletBlob);
                    await this.audioContext.audioWorklet.addModule(workletUrl);
                    URL.revokeObjectURL(workletUrl);

                    // 3. Initialize Synthesizer and connect nodes
                    this.synthesizer = new this.lib.WorkletSynthesizer(this.audioContext);
                    this.gainNode = this.audioContext.createGain();
                    this.synthesizer.connect(this.gainNode);
                    this.gainNode.connect(WebAudio._masterGainNode || this.audioContext.destination);

                    // 4. Load default SoundFont
                    const sfUrl = `audio/soundfonts/${encodeURIComponent(defaultSoundFont)}`;
                    const sfResponse = await fetch(sfUrl);
                    if (!sfResponse.ok) throw new Error(`Default SoundFont not found at: ${sfUrl}`);
                    const sfBuffer = await sfResponse.arrayBuffer();
                    await this.synthesizer.soundBankManager.addSoundBank(sfBuffer, "default");

                    // 5. Create Sequencer
                    this.sequencer = new this.lib.Sequencer(this.synthesizer);

                    this._state = "ready";
                    log("SpessaSynth engine is ready.");
                    resolve();
                } catch (error) {
                    this._state = "failed";
                    err("FAILED to initialize SpessaSynth engine.", error);
                    reject(error);
                }
            });

            return this._promise;
        },

        _loadScript: function (name) {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = this._libScripts[name];
                script.async = true;
                script.onload = resolve;
                script.onerror = () => reject(`Failed to load script: ${this._libScripts[name]}`);
                document.body.appendChild(script);
            });
        },

        _fetchScriptAsBlob: async function (name) {
            const response = await fetch(this._libScripts[name]);
            if (!response.ok) throw new Error(`Could not fetch script: ${this._libScripts[name]}`);
            return new Blob([await response.text()], { type: "application/javascript" });
        },

        _waitForLibrary: function () {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (window.SpessaSynthLib) {
                        clearInterval(interval);
                        this.lib = window.SpessaSynthLib;
                        resolve();
                    }
                }, 50);
            });
        },
    };

    // --- Format Handler Configuration (Mirip rpg_mixerv2) ---
    const formatHandlers = {
        sf2_midi: {
            extensions: ["_mid", "_midi"],
            backend: "spessasynth", // Nama konseptual untuk engine kita
        },
    };

    //=============================================================================
    // ExternalAudioSF2 (Mirip ExternalAudio dari rpg_mixerv2)
    //=============================================================================
    function ExternalAudioSF2() {
        this.initialize.apply(this, arguments);
    }

    ExternalAudioSF2.prototype.initialize = function (url, format) {
        this._url = url;
        this._format = format;
        this._buffer = null; // Buffer for the MIDI file itself
        this._volume = 1;
        this._loop = false;
        this._pitch = 100;
        this._pan = 0;
        this._isLoading = false;
        this._isPlaying = false;
        this._onLoadListeners = [];
        this._load(); // Mulai load file MIDI
    };

    ExternalAudioSF2.prototype._load = function () {
        if (this._isLoading || this.isReady()) return;
        this._isLoading = true;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", this._url);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            this._isLoading = false;
            if (xhr.status < 400) {
                this._buffer = xhr.response;
                this._callLoadListeners();
            } else {
                err(`Failed to load MIDI file: ${this._url}`);
            }
        };
        xhr.onerror = () => {
            this._isLoading = false;
            err(`Network error on loading MIDI file: ${this._url}`);
        };
        xhr.send();
    };

    ExternalAudioSF2.prototype.isReady = function () {
        return !!this._buffer;
    };

    ExternalAudioSF2.prototype.isPlaying = function () {
        // Cek state internal, karena sequencer bersifat shared.
        return this._isPlaying;
    };

    // --- INTI PERUBAHAN: play() sekarang memuat engine secara dinamis ---
    ExternalAudioSF2.prototype.play = function (loop, offset) {
        if (!this.isReady()) {
            this.addLoadListener(() => this.play(loop, offset));
            return;
        }

        // Hentikan musik yang mungkin sedang berjalan sebelumnya dari player ini
        this.stop();

        this._loop = loop;

        SF2EngineManager.require()
            .then(() => {
                // SUCCESS: Engine is ready, now play the MIDI
                const engine = SF2EngineManager;

                // Hentikan musik yang mungkin sedang dimainkan oleh sequencer dari file lain
                engine.sequencer.pause();

                engine.sequencer.loadNewSongList([{ binary: this._buffer }]);
                engine.sequencer.loopCount = this._loop ? Infinity : 0;

                this.volume = this._volume; // Terapkan volume saat ini

                engine.sequencer.play();
                this._isPlaying = true;
            })
            .catch((error) => {
                // FAILURE: Engine failed to load, don't crash the game.
                err("Cannot play MIDI because the SF2 engine failed to load.", error);
            });
    };

    ExternalAudioSF2.prototype.stop = function () {
        if (this._isPlaying && SF2EngineManager.sequencer) {
            SF2EngineManager.sequencer.pause();
            if (SF2EngineManager.gainNode) {
                // Cancel any scheduled fades
                SF2EngineManager.gainNode.gain.cancelScheduledValues(SF2EngineManager.audioContext.currentTime);
            }
        }
        this._isPlaying = false;
    };

    ExternalAudioSF2.prototype.fadeOut = function (duration) {
        if (!this._isPlaying || !SF2EngineManager.gainNode) return;

        const engine = SF2EngineManager;
        const gain = engine.gainNode.gain;
        const currentTime = engine.audioContext.currentTime;

        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(gain.value, currentTime); // Start from current volume
        gain.linearRampToValueAtTime(0.0001, currentTime + duration);

        setTimeout(() => this.stop(), duration * 1000);
    };

    ExternalAudioSF2.prototype.fadeIn = function (duration) {
        if (!this._isPlaying || !SF2EngineManager.gainNode) return;

        const engine = SF2EngineManager;
        const gain = engine.gainNode.gain;
        const currentTime = engine.audioContext.currentTime;

        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(0, currentTime);
        gain.linearRampToValueAtTime(this._volume, currentTime + duration);
    };

    ExternalAudioSF2.prototype.updateParameters = function (config) {
        if (config.volume !== undefined) this.volume = config.volume / 100;
        // Pitch/Pan bisa ditambahkan di sini jika SpessaSynth mendukungnya per-sequencer
    };

    Object.defineProperty(ExternalAudioSF2.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (SF2EngineManager.gainNode) {
                // Set volume immediately
                const currentTime = SF2EngineManager.audioContext.currentTime;
                SF2EngineManager.gainNode.gain.setValueAtTime(this._volume, currentTime);
            }
        },
        configurable: true,
    });

    // --- Helper methods for load listeners ---
    ExternalAudioSF2.prototype.addLoadListener = function (listener) {
        this._onLoadListeners.push(listener);
    };

    ExternalAudioSF2.prototype._callLoadListeners = function () {
        while (this._onLoadListeners.length > 0) {
            this._onLoadListeners.shift()();
        }
    };

    //=============================================================================
    // AudioManager Integration (Mirip rpg_mixerv2)
    //=============================================================================
    const _AudioManager_createBuffer = AudioManager.createBuffer;
    AudioManager.createBuffer = function (folder, name) {
        const nameWithoutExt = name.replace(/\.ogg$/, "");

        for (const format in formatHandlers) {
            const handler = formatHandlers[format];
            for (const ext of handler.extensions) {
                if (nameWithoutExt.endsWith(ext)) {
                    log(`Creating SF2 buffer for: ${name}`);
                    const url = this._path + folder + "/" + encodeURIComponent(name) + ".ogg";
                    return new ExternalAudioSF2(url, format);
                }
            }
        }
        // Jika tidak cocok, kembalikan ke metode original RPG Maker
        return _AudioManager_createBuffer.call(this, folder, name);
    };

    console.log(`[${pluginName}] Modular SF2 player loaded.`);
})();

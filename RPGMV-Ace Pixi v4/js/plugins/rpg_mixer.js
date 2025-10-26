/*:
 * @plugindesc (v2.3.3) A unified dynamic audio mixer for RPG Maker MV to play external formats like MIDI and MOD with effects.
 * @author RyanBram
 * @license Apache License
 * @target MV
 *
 * @help
 * ==============================================================================
 * Rpg_Mixer - A Unified Dynamic Audio Player
 * ==============================================================================
 * Version 2.3.3: Revised Reverb implementation to support built-in default sound.
 *
 * --- Introduction ---
 * This plugin acts as a central mixer to play various external audio formats.
 * It now features DYNAMIC LOADING and global effects for MIDI.
 *
 * --- MIDI Effects (Chorus & Reverb) ---
 * You can now enable global Chorus and Reverb effects for all MIDI files.
 *
 * - Chorus Parameters: (See previous version for details)
 *
 * - Reverb (Gema):
 * - Reverb IR File (Opsional): Anda bisa menggunakan file Impulse
 * Response (.wav) kustom untuk suara gema yang unik (misal: gema gereja,
 * gua, dll.). Tempatkan file di folder /audio/.
 * - JIKA DIKOSONGKAN: Reverb akan tetap berfungsi menggunakan
 * suara gema default yang sudah ada di dalam library.
 *
 * --- License ---
 * Released under the MIT license.
 *
 * @param --- MIDI Effects ---
 *
 * @param enableReverb
 * @text Enable Reverb
 * @desc Mengaktifkan efek reverb (gema) global untuk pemutaran MIDI.
 * @type boolean
 * @default false
 *
 * @param reverbMix
 * @text Reverb Mix Level
 * @desc Mengontrol volume gema (reverb). 0.0 (kering) hingga 1.0 (basah).
 * Nilai wajar: 0.2 - 0.5
 * @type number
 * @decimals 2
 * @default 0.3
 *
 * @param reverbIRFile
 * @text Reverb IR File (Opsional)
 * @desc File .wav untuk reverb. Jika dikosongkan, akan menggunakan suara
 * reverb default dari library.
 * @type file
 * @dir audio/
 * @default
 *
 * @param enableChorus
 * @text Enable Chorus
 * @desc Mengaktifkan efek chorus global untuk pemutaran MIDI.
 * @type boolean
 * @default false
 *
 * @param chorusDepth
 * @text Chorus Depth (s)
 * @desc Mengontrol lebar modulasi chorus dalam detik.
 * Nilai wajar: 0.001 - 0.004
 * @type number
 * @decimals 3
 * @default 0.002
 *
 * @param chorusRate
 * @text Chorus Rate (Hz)
 * @desc Mengontrol kecepatan modulasi chorus dalam Hertz.
 * Nilai wajar: 0.5 - 2.0
 * @type number
 * @decimals 2
 * @default 1.5
 *
 * @param chorusDelay
 * @text Chorus Delay (s)
 * @desc Waktu tunda dasar untuk chorus dalam detik.
 * Nilai wajar: 0.020 - 0.035
 * @type number
 * @decimals 3
 * @default 0.025
 *
 */

"use strict";

(function () {
    const pluginName = "Rpg_Mixer";
    const parameters = PluginManager.parameters(pluginName);

    // --- Global Effects Manager ---
    const EffectsManager = {
        _isInitialized: false,
        _pluginParameters: {
            enableChorus: parameters["enableChorus"] === "true",
            chorusDepth: parseFloat(parameters["chorusDepth"] || 0.3),
            chorusRate: parseFloat(parameters["chorusRate"] || 1.5),
            chorusDelay: parseFloat(parameters["chorusDelay"] || 0.025),
            enableReverb: parameters["enableReverb"] === "true",
            reverbIRFile: parameters["reverbIRFile"],
        },
        _context: null,
        _chorus: null,
        _reverb: null,
        _inputNode: null,
        _outputNode: null,

        initialize: function (SpessaLib, audioContext) {
            if (this._isInitialized || !audioContext) return;
            this._isInitialized = true;
            this._context = audioContext;

            // Panggil decoder reverb bawaan sekali saja saat inisialisasi
            if (SpessaLib.decodeReverb) {
                SpessaLib.decodeReverb(this._context);
            }

            console.log("[Rpg_Mixer] Initializing global effects...");

            this._inputNode = this._context.createGain();
            this._outputNode = this._context.createGain();
            let lastNode = this._inputNode;

            if (this._pluginParameters.enableChorus) {
                try {
                    const chorusConfig = {
                        depth: this._pluginParameters.chorusDepth,
                        rate: this._pluginParameters.chorusRate,
                        delay: this._pluginParameters.chorusDelay * 1000,
                    };
                    this._chorus = new SpessaLib.ChorusProcessor(this._context, chorusConfig);
                    lastNode.connect(this._chorus.input);
                    lastNode = this._chorus.output;
                    console.log("[Rpg_Mixer] Global Chorus effect enabled.", chorusConfig);
                } catch (e) {
                    console.error("[Rpg_Mixer] Failed to create or connect ChorusProcessor.", e);
                }
            }

            const reverbMixLevel = parseFloat(this._pluginParameters.reverbMix || 0.3); // Baca parameter baru

            // --- LOGIKA REVERB DIPERBARUI ---
            if (this._pluginParameters.enableReverb) {
                // Jika ada file IR yang ditentukan, muat file tersebut
                if (this._pluginParameters.reverbIRFile) {
                    this._loadImpulseResponse().then((impulseResponse) => {
                        if (impulseResponse) {
                            try {
                                // Tambahkan 'mix' ke config
                                const reverbConfig = { impulseResponse: impulseResponse, mix: reverbMixLevel };
                                this._reverb = new SpessaLib.ReverbProcessor(this._context, reverbConfig);
                                lastNode.connect(this._reverb.input);
                                this._reverb.output.connect(this._outputNode);
                                console.log("[Rpg_Mixer] Global Reverb enabled with custom IR. Mix:", reverbMixLevel);
                            } catch (e) {
                                // ... (error handling)
                            }
                        } // ... (error handling)
                    });
                }
                // Jika tidak ada file IR, gunakan reverb default
                else {
                    try {
                        // Tambahkan 'mix' ke config
                        const reverbConfig = { mix: reverbMixLevel };
                        this._reverb = new SpessaLib.ReverbProcessor(this._context, reverbConfig);
                        lastNode.connect(this._reverb.input);
                        this._reverb.output.connect(this._outputNode);
                        console.log("[Rpg_Mixer] Global Reverb enabled with default sound. Mix:", reverbMixLevel);
                    } catch (e) {
                        // ... (error handling)
                    }
                }
            } else {
                // Jika reverb tidak aktif, langsung sambungkan ke output
                lastNode.connect(this._outputNode);
            }
        },

        _loadImpulseResponse: async function () {
            const path = `audio/${this._pluginParameters.reverbIRFile}`;
            console.log(`[Rpg_Mixer] Loading Reverb Impulse Response from: ${path}`);
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await this._context.decodeAudioData(arrayBuffer);
                return audioBuffer;
            } catch (e) {
                console.error(`[Rpg_Mixer] Failed to load or decode Impulse Response file '${path}'.`, e);
                return null;
            }
        },

        getInputNode: function () {
            return this._inputNode;
        },

        getOutputNode: function () {
            return this._outputNode;
        },
    };

    const DebugManager = {
        debugDiv: null,
        debugMode: 0, // 0: Off, 1: Audio Profile, 2: Visualizer (WIP)
        lastAudioInfo: {},
        isInitialized: false,

        initialize: function () {
            if (this.isInitialized) return;
            this.isInitialized = true;

            const div = document.createElement("div");
            div.id = "rpgMixerDebugInfo";
            div.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            div.style.color = "white";
            div.style.fontFamily = "monospace";
            div.style.fontSize = "16px";
            div.style.padding = "8px";
            div.style.position = "fixed";
            div.style.left = "0";
            div.style.bottom = "0";
            div.style.zIndex = "101";
            div.style.display = "none";
            document.body.appendChild(div);
            this.debugDiv = div;

            document.addEventListener("keydown", (event) => {
                // Checking F2 input (keyCode 113)
                if (event.keyCode === 113) {
                    event.preventDefault();
                    this.cycleMode();
                }
            });
        },

        cycleMode: function () {
            this.debugMode = (this.debugMode + 1) % 3; // Cycle 0 -> 1 -> 2 -> 0
            if (this.debugDiv) {
                this.debugDiv.style.display = this.debugMode > 0 ? "block" : "none";
            }
            if (this.debugMode > 0) {
                this.updateInfo(this.lastAudioInfo); // Showing last mode
            }
        },

        updateInfo: function (info) {
            if (info && Object.keys(info).length > 0) {
                this.lastAudioInfo = info;
            }

            if (!this.debugDiv || this.debugMode === 0) return;

            const fileName = this.lastAudioInfo.fileName || "N/A";
            const backend = this.lastAudioInfo.backend || "N/A";
            let playbackMode = this.lastAudioInfo.playbackMode || "N/A";
            const loadTime =
                this.lastAudioInfo.loadTime !== undefined
                    ? `${Math.round(this.lastAudioInfo.loadTime)}ms`
                    : "Streaming";
            const decodeTime =
                this.lastAudioInfo.decodeTime !== undefined ? `${Math.round(this.lastAudioInfo.decodeTime)}ms` : "N/A";

            if (playbackMode.length > 0) {
                playbackMode = playbackMode.charAt(0).toUpperCase() + playbackMode.slice(1);
            }
            const effects = [];
            if (EffectsManager._chorus) effects.push("Chorus");
            if (EffectsManager._reverb) effects.push("Reverb");
            const effectsText = effects.length > 0 ? effects.join(" & ") : "None";

            const content = `
    <b style="color: #80ff80;">MODE: ${playbackMode}</b><br>
    <hr style="border-color: #555; margin: 4px 0;">
    <b>File:</b> ${fileName}<br>
    <b>Backend:</b> ${backend}<br>
    <b>Effects:</b> ${effectsText}<br>
    <b>Load Time:</b> ${loadTime}<br>
    <b>Parse Time:</b> ${decodeTime}
    `;

            this.debugDiv.innerHTML = content.trim().replace(/^\s+/gm, "");
        },
    };

    // --- Dynamic Backend Loader & Manager ---
    const BackendManager = {
        _state: {
            libopenmpt: "unloaded",
            spessasynth: "unloaded",
        },
        _promises: {},
        _spessa: {
            lib: null,
            audioContext: null,
            synthesizer: null,
            sequencer: null,
            gainNode: null,
        },

        require: function (backendName) {
            if (this._promises[backendName]) {
                return this._promises[backendName];
            }

            if (backendName === "libopenmpt") {
                this._promises.libopenmpt = this._requireLibOpenMPT();
            } else if (backendName === "spessasynth") {
                this._promises.spessasynth = this._requireSpessaSynth();
            } else {
                return Promise.reject(`[Rpg_Mixer] Backend '${backendName}' is not defined.`);
            }
            return this._promises[backendName];
        },
        _requireSpessaSynth: function () {
            return new Promise(async (resolve, reject) => {
                if (this._state.spessasynth === "ready") return resolve(this._spessa.lib);
                if (this._state.spessasynth === "failed")
                    return reject("[Rpg_Mixer] SpessaSynth engine previously failed to load.");

                console.log("[Rpg_Mixer] SpessaSynth engine loading started...");
                this._state.spessasynth = "loading";

                try {
                    if (!this._spessa.lib) {
                        await this._loadScript("js/libs/spessasynth_lib.js");
                        await this._waitForSpessaLibrary();
                        if (!this._spessa.lib) throw new Error("SpessaSynthLib not found on window.");
                    }

                    const audioContext = WebAudio._context || new AudioContext();
                    if (audioContext.state === "suspended") await audioContext.resume();

                    EffectsManager.initialize(this._spessa.lib, audioContext);

                    if (!this._spessa.workletLoaded) {
                        const workletBlob = await this._fetchScriptAsBlob("js/libs/spessasynth_processor.js");
                        const workletUrl = URL.createObjectURL(workletBlob);
                        await audioContext.audioWorklet.addModule(workletUrl);
                        URL.revokeObjectURL(workletUrl);
                        this._spessa.workletLoaded = true;
                    }

                    let soundfontBuffer = null;
                    const primarySfUrl = "audio/soundfont.sf2";

                    try {
                        console.log(`[Rpg_Mixer] Attempting to load primary soundfont: ${primarySfUrl}`);
                        const primarySfResponse = await fetch(primarySfUrl);
                        if (!primarySfResponse.ok) {
                            throw new Error(`HTTP status ${primarySfResponse.status}`);
                        }
                        soundfontBuffer = await primarySfResponse.arrayBuffer();
                        console.log("[Rpg_Mixer] Primary soundfont loaded successfully.");
                    } catch (primaryError) {
                        console.warn(
                            `[Rpg_Mixer] Primary soundfont failed to load (${primaryError.message}). Checking for Windows fallback...`
                        );
                        const isWindows = typeof process !== "undefined" && process.platform === "win32";
                        if (isWindows) {
                            const fallbackPath = "C:/Windows/System32/drivers/gm.dls";
                            console.log(`[Rpg_Mixer] Windows detected. Attempting to load fallback: ${fallbackPath}`);
                            try {
                                const fs = require("fs").promises;
                                const fileBuffer = await fs.readFile(fallbackPath);
                                soundfontBuffer = fileBuffer.buffer.slice(
                                    fileBuffer.byteOffset,
                                    fileBuffer.byteOffset + fileBuffer.byteLength
                                );
                                console.log("[Rpg_Mixer] Fallback DLS soundfont loaded successfully.");
                            } catch (fallbackError) {
                                throw new Error(
                                    `Primary SoundFont failed AND Windows fallback DLS could not be loaded from ${fallbackPath}. Reason: ${fallbackError.message}`
                                );
                            }
                        } else {
                            throw new Error(`Primary SoundFont not found. No fallback available for non-Windows OS.`);
                        }
                    }

                    if (!soundfontBuffer) {
                        throw new Error("Fatal: Could not load any valid soundfont.");
                    }
                    this._spessa.soundfontBuffer = soundfontBuffer;

                    this._state.spessasynth = "ready";
                    console.log("[Rpg_Mixer] SpessaSynth engine is ready.");
                    resolve(this._spessa.lib);
                } catch (error) {
                    this._state.spessasynth = "failed";
                    console.error("[Rpg_Mixer] FAILED to initialize SpessaSynth engine.", error);
                    reject(error);
                }
            });
        },

        _loadScript: function (path) {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = path;
                script.async = true;
                script.onload = resolve;
                script.onerror = () => reject(`Failed to load script: ${path}`);
                document.body.appendChild(script);
            });
        },
        _fetchScriptAsBlob: async function (path) {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Could not fetch script: ${path}`);
            return new Blob([await response.text()], { type: "application/javascript" });
        },
        _waitForSpessaLibrary: function () {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (window.SpessaSynthLib) {
                        clearInterval(interval);
                        this._spessa.lib = window.SpessaSynthLib;
                        resolve();
                    }
                }, 50);
            });
        },

        _requireLibOpenMPT: function () {
            return new Promise((resolve, reject) => {
                if (this._state.libopenmpt === "ready") return resolve();
                if (this._state.libopenmpt === "failed")
                    return reject("[Rpg_Mixer] libopenmpt backend failed to load.");

                this._state.libopenmpt = "loading";
                const workletPath = "js/libs/libopenmpt.worklet.js";

                if (!WebAudio._context) {
                    return reject("[Rpg_Mixer] WebAudio context not available for worklet loading.");
                }

                WebAudio._context.audioWorklet
                    .addModule(workletPath)
                    .then(() => {
                        console.log(`[Rpg_Mixer] Backend 'libopenmpt' is ready. Using: Worklet`);
                        this._state.libopenmpt = "ready";
                        resolve();
                    })
                    .catch((error) => {
                        console.error(`[Rpg_Mixer] FAILED to load worklet from ${workletPath}.`, error);
                        this._state.libopenmpt = "failed";
                        reject("[Rpg_Mixer] FAILED to load backend script for 'libopenmpt'.");
                    });
            });
        },
    };

    // --- Format Handler Configuration ---
    const formatHandlers = {
        midi: {
            extensions: ["_mid", "_rmi"],
            backend: "spessasynth",
        },
        mod: {
            extensions: ["_mod", "_xm", "_s3m", "_it", "_mptm", "_mo3"],
            backend: "libopenmpt",
        },
    };

    //=============================================================================
    // ExternalAudio
    //=============================================================================
    function ExternalAudio() {
        this.initialize.apply(this, arguments);
    }

    ExternalAudio.prototype.initialize = function (url, format) {
        this._url = url;
        this._format = format;
        this._buffer = null;
        this._volume = 1;
        this._loop = false;
        this._isLoading = false;
        this._onLoadListeners = [];
        this._context = WebAudio._context;
        this._load();
        this._loadTime = undefined;
        this._decodeTime = undefined;
        this._gainNode = null;
        this._workletNode = null; // MOD
        this._synthesizer = null; // MIDI
        this._sequencer = null; //MIDI
    };

    ExternalAudio.prototype.play = function (loop, offset) {
        if (!this.isReady()) {
            this.addLoadListener(() => this.play(loop, offset));
            return;
        }

        const isSameSong =
            this._format === "midi" &&
            BackendManager._spessa.sequencer &&
            BackendManager._spessa.sequencer.activeSong &&
            BackendManager._spessa.sequencer.activeSong.arrayBuffer === this._buffer;

        if (!isSameSong) {
            this.stop();
        }

        this._loop = loop;
        const backendName = formatHandlers[this._format].backend;

        BackendManager.require(backendName)
            .then(() => {
                if (this._format === "midi") {
                    this._playMidi(offset, isSameSong);
                } else if (this._format === "mod") {
                    this._playMod(offset);
                }
            })
            .catch((error) => {
                console.error(`[Rpg_Mixer] Backend '${backendName}' failed to load.`, error);
            });
    };

    ExternalAudio.prototype.isReady = function () {
        return !!this._buffer;
    };

    ExternalAudio.prototype.isPlaying = function () {
        if (this._format === "midi") {
            return BackendManager._spessa.sequencer && BackendManager._spessa.sequencer.isPlaying;
        }
        if (this._format === "mod") {
            return !!this._workletNode;
        }
        return false;
    };

    ExternalAudio.prototype.addLoadListener = function (listener) {
        this._onLoadListeners.push(listener);
    };

    ExternalAudio.prototype._callLoadListeners = function () {
        while (this._onLoadListeners.length > 0) {
            this._onLoadListeners.shift()();
        }
    };

    ExternalAudio.prototype._reportDebugInfo = function () {
        let fileName = this._url.substring(this._url.lastIndexOf("/") + 1);
        fileName = decodeURIComponent(fileName).replace(/\.ogg$/, "");
        let backendName = "N/A";
        let mode = "Unknown";

        if (this._format === "mod") {
            backendName = "libopenmpt";
            mode = "Worklet";
        } else if (this._format === "midi") {
            backendName = "spessasynth";
            mode = "Worklet";
        }

        DebugManager.updateInfo({
            fileName: decodeURIComponent(fileName),
            backend: backendName,
            playbackMode: mode,
            loadTime: this._loadTime,
            decodeTime: this._decodeTime,
        });
    };

    ExternalAudio.prototype._load = function () {
        if (this._isLoading || this.isReady()) return;
        this._isLoading = true;
        const startTime = performance.now();
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this._url);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            this._isLoading = false;
            if (xhr.status < 400) {
                this._loadTime = performance.now() - startTime;
                this._buffer = xhr.response;
                this._callLoadListeners();
            } else {
                console.error(`[Rpg_Mixer] Failed to load ${this._url}`);
            }
        };
        xhr.onerror = () => {
            this._isLoading = false;
            console.error(`[Rpg_Mixer] Network error on loading ${this._url}`);
        };
        xhr.send();
    };

    ExternalAudio.prototype._getActiveGainNode = function () {
        return this._gainNode;
    };

    ExternalAudio.prototype.fadeOut = function (duration) {
        const gainNode = this._getActiveGainNode();
        if (!gainNode) return;

        const currentTime = this._context.currentTime;
        const gain = gainNode.gain;

        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0.0001, currentTime + duration);

        setTimeout(() => this.stop(), duration * 1000);
    };

    ExternalAudio.prototype.fadeIn = function (duration) {
        const gainNode = this._getActiveGainNode();
        if (!gainNode) return;

        const currentTime = this._context.currentTime;
        const gain = gainNode.gain;

        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(0, currentTime);
        gain.linearRampToValueAtTime(this._volume, currentTime + duration);
    };

    ExternalAudio.prototype.updateParameters = function (config) {
        if (config.volume !== undefined) {
            this.volume = config.volume / 100;
        }
    };

    ExternalAudio.prototype.stop = function () {
        if (this._format === "midi") {
            this._stopMidi();
        } else if (this._format === "mod") {
            this._stopMod();
        }
    };

    ExternalAudio.prototype.seek = function () {
        if (this._format === "midi") {
            if (this._sequencer) {
                return this._sequencer.currentTime || 0;
            }
        }
        if (this._format === "mod") {
            return this._currentPosition || 0;
        }
        return 0;
    };

    Object.defineProperty(ExternalAudio.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (this._gainNode) {
                this._gainNode.gain.setValueAtTime(this._volume, this._context.currentTime);
            }
        },
        configurable: true,
    });

    ExternalAudio.prototype._playMidi = function (offset) {
        this.stop();

        const SpessaLib = BackendManager._spessa.lib;
        const soundfont = BackendManager._spessa.soundfontBuffer;

        if (!SpessaLib || !soundfont) {
            console.error("[Rpg_Mixer] SpessaSynth library or soundfont not ready.");
            return;
        }

        this._synthesizer = new SpessaLib.WorkletSynthesizer(this._context);
        this._synthesizer.setMasterParameter("masterGain", 2);
        this._gainNode = this._context.createGain();
        this._gainNode.gain.value = this._volume;

        const effectsInput = EffectsManager.getInputNode();
        const effectsOutput = EffectsManager.getOutputNode();
        if (effectsInput && effectsOutput) {
            this._synthesizer.connect(effectsInput);
            effectsOutput.connect(this._gainNode);
        } else {
            this._synthesizer.connect(this._gainNode);
        }
        this._gainNode.connect(WebAudio._masterGainNode || this._context.destination);

        this._sequencer = new SpessaLib.Sequencer(this._synthesizer);

        this._synthesizer.soundBankManager.addSoundBank(soundfont.slice(0), "default").then(() => {
            const startTime = performance.now();
            this._sequencer.loadNewSongList([{ binary: this._buffer }]);
            this._decodeTime = performance.now() - startTime;
            this._sequencer.loopCount = this._loop ? Infinity : 0;
            this._sequencer.currentTime = offset || 0;
            this._sequencer.play();
            this._reportDebugInfo();
        });
    };

    ExternalAudio.prototype._stopMidi = function () {
        if (this._sequencer) {
            this._sequencer.pause();
            this._sequencer = null;
        }
        if (this._synthesizer) {
            this._synthesizer.disconnect();
            this._synthesizer = null;
        }
        if (this._gainNode) {
            this._gainNode.disconnect();
            this._gainNode = null;
        }
    };

    ExternalAudio.prototype._playMod = function (offset) {
        this.stop();

        const pos = offset || 0;
        this._currentPosition = pos;

        const startTime = performance.now();
        this._workletNode = new AudioWorkletNode(this._context, "libopenmpt-processor", {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [2],
        });
        this._workletNode.port.onmessage = (msg) => {
            const data = msg.data;
            if (data.cmd === "pos") {
                this._currentPosition = data.pos;
            } else if (data.cmd === "meta" && pos > 0) {
                this._workletNode.port.postMessage({ cmd: "setPos", val: pos });
            } else if (data.cmd === "end") {
                if (this._loop) {
                    this.play(this._loop, 0);
                } else {
                    this.stop();
                }
            }
        };

        const config = {
            repeatCount: this._loop ? -1 : 0,
            stereoSeparation: 100,
            interpolationFilter: 0,
        };
        this._workletNode.port.postMessage({ cmd: "config", val: config });
        this._workletNode.port.postMessage({ cmd: "play", val: this._buffer });
        this._decodeTime = performance.now() - startTime;
        this._setupModWebAudioNodes();
        this._workletNode.connect(this._gainNode);
        this._reportDebugInfo();
    };

    ExternalAudio.prototype._stopMod = function () {
        if (this._workletNode) {
            this._workletNode.port.postMessage({ cmd: "stop" });
            this._workletNode.disconnect();
            this._workletNode = null;
        }
    };

    ExternalAudio.prototype._setupModWebAudioNodes = function () {
        if (!this._gainNode) {
            this._gainNode = this._context.createGain();
            this._gainNode.connect(WebAudio._masterGainNode);
        }
        this._gainNode.gain.value = this._volume;
    };

    //=============================================================================
    // AudioManager Integration
    //=============================================================================
    AudioManager._savedBgm = null;
    AudioManager._savedBgs = null;

    const _AudioManager_createBuffer = AudioManager.createBuffer;
    AudioManager.createBuffer = function (folder, name) {
        const nameWithoutExt = name.replace(/\.ogg$/, "");
        for (const format in formatHandlers) {
            const handler = formatHandlers[format];
            for (const ext of handler.extensions) {
                if (nameWithoutExt.endsWith(ext)) {
                    const url = this._path + folder + "/" + encodeURIComponent(name) + ".ogg";
                    return new ExternalAudio(url, format);
                }
            }
        }
        return _AudioManager_createBuffer.call(this, folder, name);
    };

    console.log("[Rpg_Mixer] Unified dynamic audio player loaded (v2.3.1 with effects fix).");

    //=============================================================================
    // [Modification] Hook for detecting native RPG Maker Audio system
    //=============================================================================
    const _alias_AudioManager_playBgm = AudioManager.playBgm;
    AudioManager.playBgm = function (bgm, pos) {
        _alias_AudioManager_playBgm.call(this, bgm, pos);
        if (this._bgmBuffer && !(this._bgmBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({
                fileName: bgm.name + ".ogg",
                backend: "stbvorbis",
                playbackMode: "Legacy",
                loadTime: undefined,
                decodeTime: undefined,
            });
        }
    };

    const _alias_AudioManager_playBgs = AudioManager.playBgs;
    AudioManager.playBgs = function (bgs, pos) {
        _alias_AudioManager_playBgs.call(this, bgs, pos);
        if (this._bgsBuffer && !(this._bgsBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({
                fileName: bgs.name + ".ogg",
                backend: "stbvorbis",
                playbackMode: "Legacy",
                loadTime: undefined,
                decodeTime: undefined,
            });
        }
    };

    const _alias_AudioManager_playMe = AudioManager.playMe;
    AudioManager.playMe = function (me) {
        _alias_AudioManager_playMe.call(this, me);
        if (this._meBuffer && !(this._meBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({
                fileName: me.name + ".ogg",
                backend: "stbvorbis",
                playbackMode: "Legacy",
                loadTime: undefined,
                decodeTime: undefined,
            });
        }
    };

    const _alias_AudioManager_stopBgm = AudioManager.stopBgm;
    AudioManager.stopBgm = function () {
        DebugManager.updateInfo({});
        _alias_AudioManager_stopBgm.call(this);
    };

    const _alias_AudioManager_stopBgs = AudioManager.stopBgs;
    AudioManager.stopBgs = function () {
        DebugManager.updateInfo({});
        _alias_AudioManager_stopBgs.call(this);
    };

    const _alias_AudioManager_stopMe = AudioManager.stopMe;
    AudioManager.stopMe = function () {
        DebugManager.updateInfo({});
        _alias_AudioManager_stopMe.call(this);
    };

    const _alias_AudioManager_saveBgm = AudioManager.saveBgm;
    AudioManager.saveBgm = function () {
        const savedBgm = _alias_AudioManager_saveBgm.call(this);
        if (savedBgm && this._bgmBuffer && this._bgmBuffer instanceof ExternalAudio) {
            savedBgm.pos = this._bgmBuffer.seek();
        }
        return savedBgm;
    };

    const _alias_AudioManager_saveBgs = AudioManager.saveBgs;
    AudioManager.saveBgs = function () {
        const savedBgs = _alias_AudioManager_saveBgs.call(this);
        if (savedBgs && this._bgsBuffer && this._bgsBuffer instanceof ExternalAudio) {
            savedBgs.pos = this._bgsBuffer.seek();
        }
        return savedBgs;
    };

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        DebugManager.initialize();
    };
})();

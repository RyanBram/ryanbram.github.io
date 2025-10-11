/*:
 * @plugindesc (v2.2) A unified dynamic audio mixer for RPG Maker MV to play external formats like MIDI and MOD.
 * @author RyanBram
 * @license MIT
 * @target MV
 *
 * @help
 * ==============================================================================
 * Rpg_Mixer - A Unified Dynamic Audio Player
 * ==============================================================================
 * Version 2.2: Refined & Optimized
 *
 * --- Introduction ---
 * This plugin acts as a central mixer to play various external audio formats.
 * It now features DYNAMIC LOADING: backend libraries are only loaded when a
 * file that requires them is actually played.
 * This improves performance and prevents game crashes if a backend is missing.
 *
 * --- Requirements (Optional Backends) ---
 * Place the backend libraries you need in your project's `js/libs/` folder.
 *
 * - For MIDI playback: spessasynth_lib.js, spessasynth_processor.js, and a soundfont file.
 * - For Module playback: libopenmpt.worklet.js
 *
 * --- How to Use ---
 *
 * 1. Place your custom audio file (e.g., `mymusic.mid`, `cooltune.it`) in the
 * appropriate audio folder (`/audio/bgm/`, `/audio/bgs/`, or `/audio/me/`).
 *
 * 2. IMPORTANT: To make the file selectable in the RPG Maker MV editor, you must
 * rename the original file's extension to `.ogg`.
 *
 * 3. Add a special suffix before the new `.ogg` extension to identify the format.
 *
 * - For MIDI files (.mid): Use the `_mid or `_rmi` suffix.
 * Example: `battle.mid` -> `battle_mid.ogg`
 *
 * - For Module files (.mod, .xm, .s3m, .it, .mo3): Use a suffix like
 * `_mod`, `_xm`, `_s3m`, etc.
 * Example: `dungeon.it` -> `dungeon_it.ogg`
 *
 * 4. Use the event commands (Play BGM, BGS, ME) as usual. If a backend library
 * is missing, the game will post a warning to the console (F8) and continue
 * running without sound, instead of crashing.
 *
 * --- License ---
 * Released under the MIT license.
 */

"use strict";

(function () {
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

            const content = `
    <b style="color: #80ff80;">MODE: ${playbackMode}</b><br>
    <hr style="border-color: #555; margin: 4px 0;">
    <b>File:</b> ${fileName}<br>
    <b>Backend:</b> ${backend}<br>
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
                if (this._state.spessasynth === "ready") return resolve();
                if (this._state.spessasynth === "failed")
                    return reject("[Rpg_Mixer] SpessaSynth engine previously failed to load.");

                console.log("[Rpg_Mixer] SpessaSynth engine loading started...");
                this._state.spessasynth = "loading";

                try {
                    // 1. Load SpessaSynth main library
                    await this._loadScript("js/libs/spessasynth_lib.js");
                    await this._waitForSpessaLibrary();
                    if (!this._spessa.lib) throw new Error("SpessaSynthLib not found on window.");

                    // 2. Setup AudioContext and Worklet
                    this._spessa.audioContext = WebAudio._context || new AudioContext();
                    if (this._spessa.audioContext.state === "suspended") await this._spessa.audioContext.resume();

                    const workletBlob = await this._fetchScriptAsBlob("js/libs/spessasynth_processor.js");
                    const workletUrl = URL.createObjectURL(workletBlob);
                    await this._spessa.audioContext.audioWorklet.addModule(workletUrl);
                    URL.revokeObjectURL(workletUrl);

                    // 3. Initialize Synthesizer and connect nodes
                    this._spessa.synthesizer = new this._spessa.lib.WorkletSynthesizer(this._spessa.audioContext);
                    this._spessa.gainNode = this._spessa.audioContext.createGain();
                    this._spessa.synthesizer.connect(this._spessa.gainNode);
                    this._spessa.gainNode.connect(WebAudio._masterGainNode || this._spessa.audioContext.destination);

                    // 4. Load HARDCODED SoundFont
                    const sfUrl = "audio/soundfonts/soundfont.sf2";
                    const sfResponse = await fetch(sfUrl);
                    if (!sfResponse.ok) throw new Error(`SoundFont not found at: ${sfUrl}`);
                    const sfBuffer = await sfResponse.arrayBuffer();
                    await this._spessa.synthesizer.soundBankManager.addSoundBank(sfBuffer, "default");

                    // 5. Create Sequencer
                    this._spessa.sequencer = new this._spessa.lib.Sequencer(this._spessa.synthesizer);

                    this._state.spessasynth = "ready";
                    console.log("[Rpg_Mixer] SpessaSynth engine is ready.");
                    resolve();
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
        this._workletNode = null;
    };

    ExternalAudio.prototype.play = function (loop, offset) {
        if (!this.isReady()) {
            this.addLoadListener(() => this.play(loop, offset));
            return;
        }

        this.stop();
        this._loop = loop;

        const backendName = formatHandlers[this._format].backend;

        BackendManager.require(backendName)
            .then(() => {
                if (this._format === "midi") {
                    this._playMidi(offset || 0);
                } else if (this._format === "mod") {
                    this._playMod(offset || 0);
                }
            })
            .catch((error) => {
                console.error(`[Rpg_Mixer] Backend '${backendName}' failed to load.`, error);
            });
    };
    /*
    ExternalAudio.prototype.pause = function () {
        if (this._workletNode && !this._isPaused) {
            if (this._format === "mod") {
                this._workletNode.port.postMessage({ cmd: "pause" });
                this._isPaused = true;
            } else if (this._format === "midi") {
                const sequencer = BackendManager._spessa.sequencer;
                if (sequencer && sequencer.isPlaying) {
                    sequencer.pause();
                    this._isPaused = true;
                }
            }
        }
    };

    ExternalAudio.prototype.resume = function () {
        if (this._format === "mod" && this._workletNode && this._isPaused) {
            this._workletNode.port.postMessage({ cmd: "unpause" });
            this._isPaused = false;
        } else if (this._format === "midi") {
            const sequencer = BackendManager._spessa.sequencer;
            if (sequencer && sequencer.paused) {
                sequencer.play();
                this._isPaused = false;
            }
        }
    };
*/
    ExternalAudio.prototype.isReady = function () {
        return !!this._buffer;
    };

    ExternalAudio.prototype.isPlaying = function () {
        if (this._format === "midi") {
            const sequencer = BackendManager._spessa.sequencer;
            return !!(sequencer && sequencer.isPlaying && !this._isPaused);
        }
        if (this._format === "mod") {
            return !!this._workletNode && !this._isPaused;
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

    /**
     * @private
     * @returns {GainNode|null} The active GainNode for the current audio format.
     */
    ExternalAudio.prototype._getActiveGainNode = function () {
        if (this._format === "midi") {
            // MIDI menggunakan GainNode bersama dari SpessaSynth
            return BackendManager._spessa.gainNode;
        } else if (this._format === "mod") {
            // MOD menggunakan GainNode milik instance ini
            return this._gainNode;
        }
        return null;
    };

    ExternalAudio.prototype.fadeOut = function (duration) {
        const gainNode = this._getActiveGainNode();
        if (!gainNode) return;

        const currentTime = this._context.currentTime;
        const gain = gainNode.gain;

        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(gain.value, currentTime);
        // Fade ke nilai yang sangat kecil, bukan 0, untuk menghindari beberapa edge case di browser
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
        this._currentTime = 0;
        this._isPaused = false;
    };

    ExternalAudio.prototype.seek = function (position) {
        if (position !== undefined) {
            // --- Setter ---
            if (this._format === "mod" && this._workletNode) {
                this._workletNode.port.postMessage({ cmd: "setPos", val: position });
                this._currentTime = position;
            } else if (this._format === "midi") {
                // MODIFIKASI MIDI: Atur currentTime pada sequencer
                const sequencer = BackendManager._spessa.sequencer;
                if (sequencer) {
                    sequencer.currentTime = position;
                }
            }
        } else {
            // --- Getter ---
            if (this._format === "midi") {
                const sequencer = BackendManager._spessa.sequencer;
                if (sequencer) {
                    return sequencer.currentTime;
                }
            } else if (this._format === "mod") {
                return this._currentTime;
            }
            return 0;
        }
    };

    Object.defineProperty(ExternalAudio.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (this._format === "midi") {
                if (BackendManager._spessa.gainNode) {
                    const engine = BackendManager._spessa;
                    engine.gainNode.gain.setValueAtTime(this._volume, engine.audioContext.currentTime);
                }
            } else if (this._format === "mod" && this._gainNode) {
                this._gainNode.gain.value = this._volume;
            }
        },
        configurable: true,
    });

    // --- Metode spesifik untuk MIDI ---
    ExternalAudio.prototype._playMidi = function (offset) {
        const startTime = performance.now();
        this._workletNode = BackendManager._spessa.synthNode; // a single node for all midis
        const buffer = this._buffer;
        const name = this._url;

        // --- KOREKSI DIMULAI ---
        // Fungsi yang benar adalah 'loadNewSongList' dan membutuhkan array objek lagu.
        const songList = [
            {
                binary: buffer,
                fileName: name,
            },
        ];
        BackendManager._spessa.sequencer.loadNewSongList(songList);
        // --- KOREKSI SELESAI ---

        BackendManager._spessa.sequencer.loop = this._loop;
        BackendManager._spessa.sequencer.play();

        // Terapkan offset jika ada
        if (offset > 0) {
            BackendManager._spessa.sequencer.currentTime = offset;
        }

        this._decodeTime = performance.now() - startTime;
        this._setupWebAudioNodes();
        this._gainNode.connect(this._context.destination);
        this._reportDebugInfo();
    };

    ExternalAudio.prototype._stopMidi = function () {
        const engine = BackendManager._spessa;
        if (engine.sequencer) {
            engine.sequencer.pause();
            if (engine.gainNode) {
                engine.gainNode.gain.cancelScheduledValues(engine.audioContext.currentTime);
            }
        }
    };

    ExternalAudio.prototype._playMod = function (offset) {
        const startTime = performance.now();
        this._workletNode = new AudioWorkletNode(this._context, "libopenmpt-processor", {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [2],
        });
        this._workletNode.port.onmessage = (msg) => {
            if (msg.data.cmd === "end" && !this._loop) {
                this.stop();
            }
        };
        this._workletNode.port.onmessage = (msg) => {
            const data = msg.data;
            if (data.cmd === "end" && !this._loop) {
                this.stop();
            } else if (data.cmd === "pos") {
                this._currentTime = data.pos;
            }
        };
        const config = {
            repeatCount: this._loop ? -1 : 0,
            stereoSeparation: 100,
            interpolationFilter: 0,
        };
        this._workletNode.port.postMessage({ cmd: "config", val: config });
        this._workletNode.port.postMessage({ cmd: "play", val: this._buffer });
        if (offset > 0) {
            this._workletNode.port.postMessage({ cmd: "setPos", val: offset });
            this._currentTime = offset;
        } else {
            this._currentTime = 0;
        }
        this._decodeTime = performance.now() - startTime;
        this._setupWebAudioNodes();
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

    ExternalAudio.prototype._setupWebAudioNodes = function () {
        if (!this._gainNode) {
            this._gainNode = this._context.createGain();
            this._gainNode.connect(WebAudio._masterGainNode);
        }
        this._gainNode.gain.value = this._volume;
    };

    //=============================================================================
    // AudioManager Integration (The Core Hook)
    //=============================================================================
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

    console.log("[Rpg_Mixer] Unified dynamic audio player loaded.");

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        DebugManager.initialize();
    };

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

    const _alias_AudioManager_stopBgs = AudioManager.stopBgs;
    AudioManager.stopBgs = function () {
        if (this._bgsBuffer && !(this._bgsBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({});
        }
        _alias_AudioManager_stopBgs.call(this);
    };

    const _alias_AudioManager_stopMe = AudioManager.stopMe;
    AudioManager.stopMe = function () {
        if (this._meBuffer && !(this._meBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({});
        }
        _alias_AudioManager_stopMe.call(this);
    };
})();

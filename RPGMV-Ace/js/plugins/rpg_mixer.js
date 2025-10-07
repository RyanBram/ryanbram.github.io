/*:
 * @plugindesc (v2.0) A unified dynamic audio mixer for RPG Maker MV to play external formats like MIDI and MOD.
 * @author RyanBram
 * @license MIT
 * @target MV
 *
 * @help
 * ==============================================================================
 * Rpg_Mixer - A Unified Dynamic Audio Player
 * ==============================================================================
 * Version 2.0: Dynamic Loading & Graceful Failure
 *
 * --- Introduction ---
 * This plugin acts as a central mixer to play various external audio formats.
 * It now features DYNAMIC LOADING: backend libraries (like picoaudio.js)
 * are only loaded when a file that requires them is actually played.
 * This improves performance and prevents game crashes if a backend is missing.
 *
 * --- Requirements (Optional Backends) ---
 * Place the backend libraries you need in your project's `js/plugins/` folder.
 * You DO NOT need to include libraries for formats you don't use.
 *
 * - For MIDI playback: picoaudio.js
 * - For Module playback: libopenmpt.js
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
 * - For MIDI files (.mid): Use the `_midi` suffix.
 * Example: `battle.mid` -> `battle_midi.ogg`
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

            // Capitalization first letter for playbackMode
            if (playbackMode.length > 0) {
                playbackMode = playbackMode.charAt(0).toUpperCase() + playbackMode.slice(1);
            }

            // Create HTML with new Title
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
            picoaudio: "unloaded", // States: unloaded, loading, ready, failed
            libopenmpt: "unloaded",
            libopenmpt_mode: "none", // The status will change from 'worklet' to 'legacy'
        },
        _promises: {},

        getModMode: function () {
            return this._state.libopenmpt_mode;
        },

        require: function (backendName) {
            if (this._promises[backendName]) {
                return this._promises[backendName];
            }

            if (backendName === "libopenmpt") {
                this._promises.libopenmpt = this._requireLibOpenMPT();
            } else if (backendName === "picoaudio") {
                this._promises.picoaudio = this._requireGeneric(
                    "picoaudio",
                    "js/plugins/picoaudio.js",
                    () => typeof PicoAudio !== "undefined"
                );
            } else {
                return Promise.reject(`[Rpg_Mixer] Backend '${backendName}' is not defined.`);
            }
            return this._promises[backendName];
        },

        _requireLibOpenMPT: function () {
            return new Promise((resolve, reject) => {
                if (this._state.libopenmpt === "ready") return resolve();
                if (this._state.libopenmpt === "failed")
                    return reject("[Rpg_Mixer] All libopenmpt backends failed to load.");

                this._state.libopenmpt = "loading";
                const workletPath = "js/plugins/libopenmpt.worklet.js";

                // Check the readiness of audio context
                if (!WebAudio._context) {
                    return reject("[Rpg_Mixer] WebAudio context not available for worklet loading.");
                }

                // 1st attempt: Import Worklet
                WebAudio._context.audioWorklet
                    .addModule(workletPath)
                    .then(() => {
                        console.log(`[Rpg_Mixer] Backend 'libopenmpt' is ready. Using: Worklet`);
                        this._state.libopenmpt = "ready";
                        this._state.libopenmpt_mode = "worklet";
                        resolve();
                    })
                    .catch(() => {
                        console.warn(`[Rpg_Mixer] Failed to load worklet from ${workletPath}. Trying legacy fallback.`);

                        // 2nd attempt: Legacy script for fallback
                        this._requireGeneric(
                            "libopenmpt",
                            "js/plugins/libopenmpt.js",
                            () => typeof Module !== "undefined" && Module.calledRun
                        )
                            .then(() => {
                                this._state.libopenmpt_mode = "legacy";
                                resolve(); // Resolved oleh _requireGeneric
                            })
                            .catch(() => {
                                this._state.libopenmpt = "failed";
                                reject("[Rpg_Mixer] FAILED to load all backend scripts for 'libopenmpt'.");
                            });
                    });
            });
        },

        _requireGeneric: function (name, path, readinessCheck) {
            return new Promise((resolve, reject) => {
                if (this._state[name] === "ready") return resolve();
                // Don't reject if fallback
                if (this._state[name] === "failed")
                    return reject(`[Rpg_Mixer] Backend script for '${name}' previously failed to load.`);

                this._state[name] = "loading";
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = path;
                script.async = true;
                script.onload = () => {
                    const interval = setInterval(() => {
                        if (readinessCheck()) {
                            clearInterval(interval);
                            console.log(`[Rpg_Mixer] Backend '${name}' is ready. Using: ${path}`);
                            this._state[name] = "ready";
                            resolve();
                        }
                    }, 50);
                };
                script.onerror = () => {
                    // Don't state failed
                    reject(`[Rpg_Mixer] FAILED to load backend script: ${path}. Is the file missing?`);
                };
                document.body.appendChild(script);
            });
        },
    };

    // --- Format Handler Configuration ---
    const formatHandlers = {
        midi: {
            extensions: ["_midi"],
            backend: "picoaudio",
        },
        mod: {
            extensions: ["_mod", "_xm", "_s3m", "_it", "_mo3"],
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
        this._pico = null;
        this._playerNode = null; // legacy script processor node
        this._gainNode = null;
        this._workletNode = null;
        this._load();
        this._loadTime = undefined;
        this._decodeTime = undefined;
    };

    // --- KEY CHANGE IS IN THE `play` METHOD ---

    ExternalAudio.prototype.play = function (loop, offset) {
        if (this.isReady()) {
            this.stop();
            const backendName = formatHandlers[this._format].backend;

            BackendManager.require(backendName)
                .then(() => {
                    this._loop = loop;
                    if (this._format === "midi") {
                        this._playMidi();
                    } else if (this._format === "mod") {
                        // Checking if mode is succesfully loaded by BackendManager
                        if (BackendManager.getModMode() === "worklet") {
                            this._playModWorklet();
                        } else {
                            this._playMod(); // Fallback to legacy method
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.addLoadListener(() => {
                this.play(loop, offset);
            });
        }
    };

    // --- (The rest of the methods remain unchanged as they are either shared or self-contained) ---

    ExternalAudio.prototype.isReady = function () {
        return !!this._buffer;
    };
    ExternalAudio.prototype.isPlaying = function () {
        if (this._format === "midi") {
            return this._pico && this._pico.isPlaying();
        }
        if (this._format === "mod") {
            // Cek kedua kemungkinan player
            return !!this._playerNode || !!this._workletNode;
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
        const fileName = this._url.substring(this._url.lastIndexOf("/") + 1);
        const backendName = formatHandlers[this._format].backend;
        let mode = "Unknown"; // Default value

        if (this._format === "mod") {
            // Taken directly from BackendManager: 'worklet' or 'legacy'
            mode = BackendManager.getModMode();
        } else if (this._format === "midi") {
            // PicoAudio use ScriptProcessorNode
            mode = "legacy";
        }

        DebugManager.updateInfo({
            fileName: decodeURIComponent(fileName),
            backend: backendName, // New data: Backend library (mis: libopenmpt)
            playbackMode: mode, // New data: Specific mode (mis: worklet)
            loadTime: this._loadTime,
            decodeTime: this._decodeTime,
        });
    };

    // --- MIDI / MOD Specific Methods ---
    ExternalAudio.prototype._load = function () {
        if (this._isLoading || this.isReady()) return;
        this._isLoading = true;
        const startTime = performance.now(); // Notes start time
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this._url);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            this._isLoading = false;
            if (xhr.status < 400) {
                this._loadTime = performance.now() - startTime; // Count & Store Time
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

    ExternalAudio.prototype.fadeOut = function (duration) {
        if (this._format === "midi" && this._pico) {
            this._manualFade(duration, false); // false means fade out
            setTimeout(() => this.stop(), duration * 1000);
        } else if (this._format === "mod" && this._gainNode) {
            const currentTime = this._context.currentTime;
            this._gainNode.gain.cancelScheduledValues(currentTime);
            this._gainNode.gain.setValueAtTime(this._gainNode.gain.value, currentTime);
            this._gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
            setTimeout(() => this.stop(), duration * 1000);
        }
    };

    // For MIDI
    ExternalAudio.prototype._manualFade = function (duration, fadeIn) {
        if (!this._pico || this._fadeInterval) return;
        const startVolume = this._pico.getMasterVolume();
        const endVolume = fadeIn ? this._volume : 0;
        let currentTime = 0;
        const tick = 16;
        const durationMs = duration * 1000;
        this._fadeInterval = setInterval(() => {
            currentTime += tick;
            const newVolume = startVolume + (endVolume - startVolume) * (currentTime / durationMs);

            this._pico.setMasterVolume(Math.max(0, Math.min(1, newVolume)));

            if (currentTime >= durationMs) {
                clearInterval(this._fadeInterval);
                this._fadeInterval = null;

                if (!fadeIn) {
                    this.stop();
                }
            }
        }, tick);
    };

    ExternalAudio.prototype.fadeIn = function (duration) {
        if (this._format === "midi" && this._pico) {
            this._pico.fadein(duration);
        } else if (this._format === "mod" && this._gainNode) {
            const currentTime = this._context.currentTime;
            this._gainNode.gain.cancelScheduledValues(currentTime);
            this._gainNode.gain.setValueAtTime(0, currentTime);
            this._gainNode.gain.linearRampToValueAtTime(this._volume, currentTime + duration);
        }
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
            // Stop both player mode for cleanup
            this._stopMod(); // Stop legacy mode
            this._stopModWorklet(); // Stop worklet mode
        }
    };

    ExternalAudio.prototype.seek = function () {
        if (this._format === "midi" && this._pico) {
            return this._pico.getTime();
        } else if (this._format === "mod") {
            if (this._playerNode) {
                return this._playerNode.context.currentTime;
            } else if (this._workletNode) {
                return 0;
            }
        }
        return 0;
    };

    Object.defineProperty(ExternalAudio.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (this._format === "midi" && this._pico) {
                this._pico.setMasterVolume(this._volume);
            } else if (this._format === "mod" && this._gainNode) {
                this._gainNode.gain.value = this._volume;
            }
        },
        configurable: true,
    });
    ExternalAudio.prototype._playMidi = function () {
        const startTime = performance.now();
        this._pico = new PicoAudio();
        this._pico.init();
        const smfData = new Uint8Array(this._buffer);
        const parsedData = this._pico.parseSMF(smfData);
        this._pico.setData(parsedData);
        this._decodeTime = performance.now() - startTime;
        this._pico.setLoop(this._loop);
        this.volume = this._volume;
        this._pico.play();
        this._reportDebugInfo();
    };

    ExternalAudio.prototype._stopMidi = function () {
        if (this._fadeInterval) {
            clearInterval(this._fadeInterval);
            this._fadeInterval = null;
        }
        if (this._pico) {
            this._pico.stop();
            this._pico = null;
        }
    };

    ExternalAudio.prototype._playMod = function () {
        const startTime = performance.now();
        this._playerNode = this._createModPlayerNode();
        if (!this._playerNode) {
            console.error("[Rpg_Mixer] MOD player node could not be created.");
            return;
        }
        this._decodeTime = performance.now() - startTime;
        this._setupModWebAudioNodes();
        this._playerNode.connect(this._gainNode);
        this._reportDebugInfo();
    };

    ExternalAudio.prototype._stopMod = function () {
        if (this._playerNode) {
            this._playerNode.disconnect();
            this._playerNode.cleanup();
            this._playerNode = null;
        }
    };

    ExternalAudio.prototype._playModWorklet = function () {
        const startTime = performance.now();
        this._workletNode = new AudioWorkletNode(this._context, "libopenmpt-processor", {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [2],
        });

        // Handlinge message from worklet, like: end of music
        this._workletNode.port.onmessage = (msg) => {
            if (msg.data.cmd === "end" && !this._loop) {
                this.stop();
            }
        };

        // Sending configuration to worklet
        const config = {
            repeatCount: this._loop ? -1 : 0,
            stereoSeparation: 100,
            interpolationFilter: 0,
        };
        this._workletNode.port.postMessage({ cmd: "config", val: config });

        // Sending buffer to audio for playing
        this._workletNode.port.postMessage({ cmd: "play", val: this._buffer });
        this._decodeTime = performance.now() - startTime; // Time for node setup

        this._setupModWebAudioNodes(); // Preparing gain node
        this._workletNode.connect(this._gainNode); // Connecting worklet to output
        this._reportDebugInfo();
    };

    ExternalAudio.prototype._stopModWorklet = function () {
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
    ExternalAudio.prototype._createModPlayerNode = function () {
        const playerNode = this._context.createScriptProcessor(4096, 0, 2);
        const byteArray = new Uint8Array(this._buffer);
        const ptrToFile = Module._malloc(byteArray.byteLength);
        Module.HEAPU8.set(byteArray, ptrToFile);
        playerNode.modulePtr = Module._openmpt_module_create_from_memory(ptrToFile, byteArray.byteLength, 0, 0, 0);
        Module._free(ptrToFile);
        if (playerNode.modulePtr === 0) {
            console.error("[Rpg_Mixer] libopenmpt failed to create module.");
            return null;
        }
        Module._openmpt_module_set_repeat_count(playerNode.modulePtr, this._loop ? -1 : 0);
        playerNode.leftBufferPtr = Module._malloc(4 * 4096);
        playerNode.rightBufferPtr = Module._malloc(4 * 4096);
        playerNode.cleanup = function () {
            if (this.modulePtr !== 0) Module._openmpt_module_destroy(this.modulePtr);
            if (this.leftBufferPtr !== 0) Module._free(this.leftBufferPtr);
            if (this.rightBufferPtr !== 0) Module._free(this.rightBufferPtr);
            this.modulePtr = this.leftBufferPtr = this.rightBufferPtr = 0;
        };
        playerNode.onaudioprocess = (e) => {
            if (playerNode.modulePtr === 0) return;
            const framesRendered = Module._openmpt_module_read_float_stereo(
                playerNode.modulePtr,
                this._context.sampleRate,
                4096,
                playerNode.leftBufferPtr,
                playerNode.rightBufferPtr
            );
            if (framesRendered === 0) {
                this.stop();
                return;
            }
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);
            const rawAudioLeft = Module.HEAPF32.subarray(
                playerNode.leftBufferPtr / 4,
                playerNode.leftBufferPtr / 4 + framesRendered
            );
            const rawAudioRight = Module.HEAPF32.subarray(
                playerNode.rightBufferPtr / 4,
                playerNode.rightBufferPtr / 4 + framesRendered
            );
            const volume = AudioManager.bgmVolume / 100;
            for (let i = 0; i < framesRendered; i++) {
                outputL[i] = rawAudioLeft[i] * volume;
                outputR[i] = rawAudioRight[i] * volume;
            }
        };
        return playerNode;
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
        // Panggil fungsi asli terlebih dahulu agar _bgmBuffer diatur.
        _alias_AudioManager_playBgm.call(this, bgm, pos);
        // Check if tehre is buffer BGM ada NOT instance from ExternalAudio.
        if (this._bgmBuffer && !(this._bgmBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({
                fileName: bgm.name + ".ogg",
                backend: "stbvorbis",
                playbackMode: "Legacy",
                loadTime: undefined, // Shown as "Streaming"
                decodeTime: undefined, // Shown as "N/A"
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

    // Opcional: Clear display when default audio system is stopped.
    const _alias_AudioManager_stopBgm = AudioManager.stopBgm;
    AudioManager.stopBgm = function () {
        // Only clean if the running BGM is default audio system.
        if (this._bgmBuffer && !(this._bgmBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({}); //Sending empty objectfor keeping last info.
        }
        _alias_AudioManager_stopBgm.call(this);
    };

    const _alias_AudioManager_stopBgs = AudioManager.stopBgs;
    AudioManager.stopBgs = function () {
        if (this._bgsBuffer && !(this._bgsBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({});
        }
        _alias_AudioManager_stopBgs.call(this);
    };

    // Optional: Clean up ME after finish.
    const _alias_AudioManager_stopMe = AudioManager.stopMe;
    AudioManager.stopMe = function () {
        if (this._meBuffer && !(this._meBuffer instanceof ExternalAudio)) {
            DebugManager.updateInfo({});
        }
        _alias_AudioManager_stopMe.call(this);
    };
})();

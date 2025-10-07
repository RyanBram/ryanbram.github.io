/*:
 * @plugindesc (v4.6 Stable) Memutar file MIDI dengan SoundFont (.sf2).
 * @author Gemini & Kolaborasi
 * @license MIT
 * @requiredAssets js/plugins/index.js
 * @requiredAssets js/plugins/spessasynth_processor.min.js
 *
 * @param defaultSoundFont
 * @text Default SoundFont
 * @desc Nama file .sf2 yang akan digunakan sebagai default. @default microsoft_gm_3.sf2
 * @type file
 * @dir audio/soundfonts/
 *
 * @param ignoreMasterVolume
 * @text Abaikan Master Volume
 * @desc Jika true, plugin akan mengabaikan Master Volume dari menu Opsi. @type boolean @default false
 *
 * @param debugMode
 * @text Mode Debug
 * @desc Aktifkan untuk menampilkan pesan logging detail di konsol (F8). @type boolean @default false
 *
 * @help
 * ===========================================================================
 * SF2_MIDIPlayer.js v4.6 (Perbaikan EncodingError)
 * ===========================================================================
 * Gunakan suffix "_mid" untuk file MIDI yang akan dimainkan plugin ini.
 *
 * --- Perubahan v4.6 ---
 * - MEMPERBAIKI 'EncodingError: Unable to decode audio data'.
 * - Mencegah sistem audio bawaan RPG Maker mencoba memutar file MIDI/MOD
 * setelah plugin kustom memutarnya.
 * ===========================================================================
 */

"use strict";
PluginManager.loadScript("index.js");

(function () {
    const pluginName = "SF2_MIDIPlayer";
    const parameters = PluginManager.parameters(pluginName);
    const defaultSoundFont = String(parameters["defaultSoundFont"] || "microsoft_gm_3.sf2");
    const ignoreMasterVolume = String(parameters["ignoreMasterVolume"] || "false") === "true";
    const DEBUG = String(parameters["debugMode"] || "false") === "true";

    const log = (...args) => {
        if (DEBUG) console.log(`%c${pluginName}:`, "color: #33aaff;", ...args);
    };
    const warn = (...args) => {
        if (DEBUG) console.warn(`${pluginName}:`, ...args);
    };
    const err = (...args) => {
        console.error(`${pluginName}:`, ...args);
    };

    if (!window.ExternalAudioPlayers) {
        window.ExternalAudioPlayers = {};
    }

    const state = {
        audioContext: null,
        synthesizer: null,
        sequencer: null,
        gainNode: null,
        isEngineReady: false,
        isInitializing: false,
        currentMidi: null,
        currentType: null,
        lib: null,
    };

    async function setupAudioEngine() {
        /* ... (tidak berubah) ... */ if (state.isEngineReady || state.isInitializing) return;
        await waitForLibrary();
        if (!state.lib) {
            err("Library SpessaSynthLib tidak ditemukan.");
            return;
        }
        state.isInitializing = true;
        try {
            state.audioContext = WebAudio._context || new AudioContext();
            await ensureAudioContextRunning();
            if (!state.audioContext.audioWorklet) {
                throw new Error("AudioWorklet API is not supported.");
            }
            const workletUrl = "./js/plugins/spessasynth_processor.min.js";
            const workletResponse = await fetch(workletUrl);
            if (!workletResponse.ok) {
                throw new Error(`Gagal memuat script worklet di: ${workletUrl}`);
            }
            const workletScriptText = await workletResponse.text();
            const blob = new Blob([workletScriptText], { type: "application/javascript" });
            const objectURL = URL.createObjectURL(blob);
            await state.audioContext.audioWorklet.addModule(objectURL);
            URL.revokeObjectURL(objectURL);
            state.synthesizer = new state.lib.WorkletSynthesizer(state.audioContext);
            state.gainNode = state.audioContext.createGain();
            state.synthesizer.connect(state.gainNode);
            const masterGain = WebAudio._masterGainNode || WebAudio._gainNode;
            if (masterGain) {
                state.gainNode.connect(masterGain);
            } else {
                state.gainNode.connect(state.audioContext.destination);
            }
            const sfUrl = `audio/soundfonts/${encodeURIComponent(defaultSoundFont)}`;
            const sfResponse = await fetch(sfUrl);
            if (!sfResponse.ok) {
                throw new Error(`SoundFont tidak ditemukan di: ${sfUrl}`);
            }
            const sfBuffer = await sfResponse.arrayBuffer();
            await state.synthesizer.soundBankManager.addSoundBank(sfBuffer, "default");
            state.sequencer = new state.lib.Sequencer(state.synthesizer);
            state.isEngineReady = true;
            log("Audio Engine Ready.");
        } catch (error) {
            err("Gagal menginisialisasi mesin audio.", error);
        } finally {
            state.isInitializing = false;
        }
    }
    async function waitForLibrary() {
        /* ... (tidak berubah) ... */ if (window.SpessaSynthLib) {
            state.lib = window.SpessaSynthLib;
            return true;
        }
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (window.SpessaSynthLib) {
                    clearInterval(interval);
                    state.lib = window.SpessaSynthLib;
                    resolve(true);
                }
            }, 50);
        });
    }
    const ensureAudioContextRunning = async () => {
        /* ... (tidak berubah) ... */ if (state.audioContext && state.audioContext.state === "suspended") {
            await state.audioContext.resume();
        }
        return true;
    };

    const isModuleForThisPlugin = (audio) => audio && audio.name && audio.name.endsWith("_mid");

    const stopMidi = () => {
        // Periksa apakah sequencer-nya ada (sudah diinisialisasi).
        if (state.sequencer) {
            log("Forcing SF2 MIDI stop command via sequencer.pause()");
            if (state.gainNode) {
                // Hentikan jadwal fade out jika ada.
                state.gainNode.gain.cancelScheduledValues(state.audioContext.currentTime);
            }
            // Panggil fungsi .pause() pada objek sequencer. Ini adalah cara yang benar.
            state.sequencer.pause();
        }
        // Selalu reset state internal plugin setelah perintah berhenti.
        state.currentMidi = null;
        state.currentType = null;
    };

    window.ExternalAudioPlayers.SF2Player = { stop: stopMidi };
    const stopOtherPlayers = () => {
        for (const key in window.ExternalAudioPlayers) {
            if (key !== "SF2Player" && typeof window.ExternalAudioPlayers[key].stop === "function") {
                log(`Stopping external player: ${key}`);
                window.ExternalAudioPlayers[key].stop();
            }
        }
    };
    const calculateVolume = (type) => {
        const typeVolume = (AudioManager[type + "Volume"] ?? 100) / 100;
        const masterValue = ConfigManager.masterVolume !== undefined ? ConfigManager.masterVolume : 100;
        const masterVolume = ignoreMasterVolume ? 1 : masterValue / 100;
        return typeVolume * masterVolume;
    };

    const playMidi = async (type, audio) => {
        // TUNGGU jika proses inisialisasi sedang berjalan untuk menghindari race condition.
        while (state.isInitializing) {
            console.log("SF2_MIDIPlayer: Menunggu inisialisasi audio engine selesai...");
            await new Promise((resolve) => setTimeout(resolve, 100)); // Cek lagi setiap 100ms
        }

        if (!state.isEngineReady) {
            await setupAudioEngine(); // Jika belum siap, coba inisialisasi sekarang.
            if (!state.isEngineReady) {
                err("Gagal menginisialisasi mesin audio.");
                return;
            }
        }
        if (!(await ensureAudioContextRunning())) {
            err("AudioContext tidak bisa diaktifkan.");
            return;
        }

        // Hentikan musik MIDI yang sedang berjalan (jika ada) sebelum memulai yang baru.
        stopMidi();

        const folder = type;
        const url = `audio/${folder}/${encodeURIComponent(audio.name)}.ogg`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`File MIDI tidak ditemukan di: ${url}`);
            const midiBuffer = await response.arrayBuffer();
            await state.sequencer.loadNewSongList([{ binary: midiBuffer }]);
            state.sequencer.loopCount = type !== "me" ? Infinity : 0;
            const finalVolume = calculateVolume(type);
            state.gainNode.gain.setValueAtTime(finalVolume, state.audioContext.currentTime);
            state.sequencer.play();
            state.currentMidi = audio;
            state.currentType = type;
        } catch (error) {
            err("Gagal memainkan MIDI.", error);
        }
    };

    const fadeMidi = (duration) => {
        if (!state.gainNode || !state.currentMidi) return;
        const currentTime = state.audioContext.currentTime;
        state.gainNode.gain.setValueAtTime(state.gainNode.gain.value, currentTime);
        state.gainNode.gain.linearRampToValueAtTime(0.0001, currentTime + duration);
        setTimeout(() => {
            if (state.currentMidi) {
                stopMidi();
            }
        }, duration * 1000);
    };

    // GANTI SELURUH FUNGSI AudioManager.playBgm DENGAN KODE BARU INI:

    const _AudioManager_playBgm = AudioManager.playBgm;
    AudioManager.playBgm = function (bgm, pos) {
        // Cek pertama: Apakah file yang diminta adalah untuk plugin ini?
        if (isModuleForThisPlugin(bgm)) {
            // [PERBAIKAN UTAMA]
            // Lakukan pengecekan manual KHUSUS UNTUK MIDI.
            // Cek hanya berdasarkan nama, karena '_bgmBuffer' akan selalu null untuk MIDI.
            if (this._currentBgm && this._currentBgm.name === bgm.name) {
                // Jika nama BGM sama, ini berarti lagu yang sama.
                // Cukup perbarui parameter (volume/pitch) dan hentikan eksekusi.
                this.updateBgmParameters(bgm);
                return; // << SANGAT PENTING
            } else {
                // Jika ini BGM MIDI yang baru atau transisi dari audio biasa.
                // Hentikan semua audio yang mungkin sedang berjalan.
                this.stopBgm();
                stopMidi();

                // Mainkan MIDI yang baru.
                playMidi("bgm", bgm);

                // Perbarui state AudioManager.
                this.updateCurrentBgm(bgm, pos);
                this._bgmBuffer = null; // Tetap atur buffer ke null.
            }
        } else {
            // Jika BUKAN file MIDI, hentikan player MIDI kita (jika aktif)
            // dan serahkan sepenuhnya ke fungsi bawaan RPG Maker.
            stopMidi();
            _AudioManager_playBgm.call(this, bgm, pos);
        }
    };

    const _AudioManager_playBgs = AudioManager.playBgs;
    AudioManager.playBgs = function (bgs, pos) {
        if (isModuleForThisPlugin(bgs)) {
            // Hentikan SEMUA player lain yang mungkin aktif.
            stopOtherPlayers();
            // Panggil fungsi stop ASLI dari RPG Maker untuk membersihkan semuanya.
            _AudioManager_stopBgs.call(this);

            // Mainkan MIDI kita.
            playMidi("bgs", bgs);

            // Perbarui status AudioManager.
            this._currentBgs = bgs;
            this.updateBgsParameters(bgs);
            this._bgsBuffer = null; // Pastikan buffer bawaan kosong.
        } else {
            // Jika file biasa, hentikan MIDI kita dan serahkan ke sistem bawaan.
            stopMidi();
            _AudioManager_playBgs.call(this, bgs, pos);
        }
    };

    const _AudioManager_stopBgm = AudioManager.stopBgm;
    AudioManager.stopBgm = function () {
        _AudioManager_stopBgm.call(this);
        if (state.currentType === "bgm") {
            stopMidi();
        }
    };

    const _AudioManager_stopBgs = AudioManager.stopBgs;
    AudioManager.stopBgs = function () {
        _AudioManager_stopBgs.call(this);
        if (state.currentType === "bgs") {
            stopMidi();
        }
    };

    const _AudioManager_fadeOutBgm = AudioManager.fadeOutBgm;
    AudioManager.fadeOutBgm = function (duration) {
        if (state.currentType === "bgm" && state.currentMidi) {
            fadeMidi(duration);
        } else {
            _AudioManager_fadeOutBgm.call(this, duration);
        }
    };

    const _AudioManager_fadeOutBgs = AudioManager.fadeOutBgs;
    AudioManager.fadeOutBgs = function (duration) {
        if (state.currentType === "bgs" && state.currentMidi) {
            fadeMidi(duration);
        } else {
            _AudioManager_fadeOutBgs.call(this, duration);
        }
    };

    const _AudioManager_stopAll = AudioManager.stopAll;
    AudioManager.stopAll = function () {
        _AudioManager_stopAll.call(this);
        stopMidi();
    };

    const _AudioManager_updateBgmParameters = AudioManager.updateBgmParameters;
    AudioManager.updateBgmParameters = function (bgm) {
        _AudioManager_updateBgmParameters.call(this, bgm);
        // Periksa apakah audio SF2 sedang berjalan dan siap
        if (state.currentType === "bgm" && state.isEngineReady && state.gainNode) {
            const newVolume = calculateVolume("bgm");
            // Terapkan volume baru ke audio node
            state.gainNode.gain.setValueAtTime(newVolume, state.audioContext.currentTime);
        }
    };

    const _AudioManager_updateBgsParameters = AudioManager.updateBgsParameters;
    AudioManager.updateBgsParameters = function (bgs) {
        _AudioManager_updateBgsParameters.call(this, bgs);
        // Periksa apakah audio SF2 sedang berjalan dan siap
        if (state.currentType === "bgs" && state.isEngineReady && state.gainNode) {
            const newVolume = calculateVolume("bgs");
            // Terapkan volume baru ke audio node
            state.gainNode.gain.setValueAtTime(newVolume, state.audioContext.currentTime);
        }
    };

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    _Scene_Boot_start.prototype.start = function () {
        _Scene_Boot_start.call(this);
        setupAudioEngine();
    };
})();

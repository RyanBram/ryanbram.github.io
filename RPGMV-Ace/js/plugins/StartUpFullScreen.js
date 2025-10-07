//=============================================================================
// StartUpFullScreen.js
// ----------------------------------------------------------------------------
// (C)2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.3.1 2025/09/30 Added F4 key synchronization fix for the options menu.
// 1.2.0 2022/09/09 ゲーム終了画面にもシャットダウン項目を追加できる機能を追加
// 1.1.0 2021/12/30 イベントテスト実行時は全画面化を無効にするよう仕様変更
// 1.0.3 2019/01/14 1.0.3でコアスクリプトv1.6.1以前で逆に動作しなくなっていた問題を修正
// 1.0.2 2019/01/14 コアスクリプトv1.6.1以降で正常に動作していなかった問題を修正
// 1.0.1 2018/06/30 タイトルコマンドウィンドウのY座標整数になっていなかった問題を修正
// 1.0.0 2016/03/06 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc Start up full screen
 * @author triacontane
 *
 * @param Shutdown
 * @desc Command name for shutdown.
 * @default Shutdown
 *
 * @param DefaultFullScreen
 * @text Fullscreen by default
 * @When enabled, desc will launch full screen by default.。
 * @default false
 * @type boolean
 *
 * @param StartUpFullScreen
 * @desc Command name for full screen option.
 * @default Full Screen
 *
 * @param UseTitle
 * @default true
 * @type boolean
 *
 * @param UseGameEnd
 * @default true
 * @type boolean
 * @help Add option start up full screen.
 * This plugin is using only local execute.
 *
 * This plugin is released under the MIT License.
 */

function Scene_Terminate() {
    this.initialize.apply(this, arguments);
}

(function () {
    'use strict';
    // Nw.js環境下以外では一切の機能を無効
    if (!Utils.isNwjs()) {
        return;
    }
    var createPluginParameter = function(pluginName) {
        var paramReplacer = function(key, value) {
            if (value === 'null') {
                return value;
            }
            if (value[0] === '"' && value[value.length - 1] === '"') {
                return value;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        };
        var parameter     = JSON.parse(JSON.stringify(PluginManager.parameters(pluginName), paramReplacer));
        PluginManager.setParameters(pluginName, parameter);
        return parameter;
    };

    var param = createPluginParameter('StartUpFullScreen');

    //=============================================================================
    // Graphics
    //  privateメソッド「_requestFullScreen」を呼び出します。
    //=============================================================================
    Graphics.requestFullScreen = function() {
        if (!this._isFullScreenForPrevVersion()) {
            this._requestFullScreen();
        }
    };

    /**
     * @static
     * @method _isFullScreenForPrevVersion
     * @return {Boolean}
     * @private
     */
    Graphics._isFullScreenForPrevVersion = function() {
        return document.fullscreenElement ||
            document.mozFullScreen ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;
    };

    //=============================================================================
    // Scene_Boot
    //  フルスクリーンで起動する処理を追加します。
    //=============================================================================
    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);
        if (ConfigManager.startUpFullScreen && !DataManager.isEventTest()) {
            Graphics.requestFullScreen();
        }
    };

    //=============================================================================
    // Scene_Title
    //  シャットダウンの処理を追加定義します。
    //=============================================================================
    var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.apply(this, arguments);
        if (param.UseTitle) {
            this._commandWindow.setHandler('shutdown',  this.commandShutdown.bind(this));
        }
    };

    Scene_Title.prototype.commandShutdown = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Terminate);
    };

    //=============================================================================
    // Scene_GameEnd
    //  シャットダウンの処理を追加定義します。
    //=============================================================================
    var _Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
    Scene_GameEnd.prototype.createCommandWindow = function() {
        _Scene_GameEnd_createCommandWindow.apply(this, arguments);
        if (param.UseGameEnd) {
            this._commandWindow.setHandler('shutdown',  this.commandShutdown.bind(this));
        }
    };

    Scene_GameEnd.prototype.commandShutdown = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Terminate);
    };

    //=============================================================================
    // Window_TitleCommand
    //  シャットダウンの選択肢を追加定義します。
    //=============================================================================
    var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
        if (param.UseTitle) {
            this.addCommand(param.Shutdown, 'shutdown');
        }
    };

    var _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.apply(this, arguments);
        if (param.UseTitle) {
            this.y += Math.floor(this.height / 8);
        }
    };

    //=============================================================================
    // Window_GameEnd
    //  シャットダウンの選択肢を追加定義します。
    //=============================================================================
    var _Window_GameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
    Window_GameEnd.prototype.makeCommandList = function() {
        _Window_GameEnd_makeCommandList.apply(this, arguments);
        if (param.UseGameEnd) {
            this.addCommand(param.Shutdown, 'shutdown');
            this._list.splice(1, 0, this._list.pop());
        }
    };

    var _Window_GameEnd_updatePlacement = Window_GameEnd.prototype.updatePlacement;
    Window_GameEnd.prototype.updatePlacement = function() {
        _Window_GameEnd_updatePlacement.apply(this, arguments);
        if (param.UseGameEnd) {
            this.y += Math.floor(this.height / 8);
        }
    };
    
    //=============================================================================
    // ConfigManager
    //  オプションに「フルスクリーンで起動」項目を追加します。
    //=============================================================================

    ConfigManager.startUpFullScreen = param.DefaultFullScreen;

    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = _ConfigManager_makeData.apply(this, arguments);
        config.startUpFullScreen = this.startUpFullScreen;
        return config;
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        _ConfigManager_applyData.apply(this, arguments);
        this.startUpFullScreen = this.readFlag(config, "startUpFullScreen");
    };

    //=============================================================================
    // Window_Options
    //  オプションに「フルスクリーンで起動」項目を追加します。
    //=============================================================================
    
    var _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function () {
        _Window_Options_addGeneralOptions.apply(this, arguments);
        this.addCommand(param.StartUpFullScreen, "startUpFullScreen");
    };

    var _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        if (symbol === "startUpFullScreen") {
            var value = this.getConfigValue(symbol);
            this.changeValue(symbol, !value);
            if (!value) {
                Graphics._requestFullScreen();
            } else {
                Graphics._cancelFullScreen();
            }
        } else {
            _Window_Options_processOk.apply(this, arguments);
        }
    };

    //=============================================================================
    // Scene_Terminate
    //  ゲームを終了します。
    //=============================================================================
    Scene_Terminate.prototype = Object.create(Scene_Base.prototype);
    Scene_Terminate.prototype.constructor = Scene_Terminate;

    Scene_Terminate.prototype.start = function() {
        SceneManager.terminate();
    };

    //=============================================================================
    // BAGIAN PERBAIKAN SINKRONISASI
    //=============================================================================

    // --- BAGIAN 1: MEMPERBARUI STATUS SECARA GLOBAL ---
    // Fungsi ini akan dipanggil setiap kali status fullscreen browser berubah.
    function syncFullScreenStatus() {
        var isFullScreen = Graphics._isFullScreenForPrevVersion();

        // Perbarui variabel di ConfigManager jika nilainya berbeda.
        if (ConfigManager.startUpFullScreen !== isFullScreen) {
            ConfigManager.startUpFullScreen = isFullScreen;
        }
    }

    // Tambahkan "pendengar" (event listener) ke browser untuk mendeteksi perubahan.
    document.addEventListener("fullscreenchange", syncFullScreenStatus);
    document.addEventListener("webkitfullscreenchange", syncFullScreenStatus);
    document.addEventListener("mozfullscreenchange", syncFullScreenStatus);
    document.addEventListener("MSFullscreenChange", syncFullScreenStatus);

    // --- BAGIAN 2: MEMBUAT JENDELA OPSI MENJADI REAKTIF ---
    // Simpan status terakhir yang digambar oleh Window_Options
    var _Window_Options_initialize = Window_Options.prototype.initialize;
    Window_Options.prototype.initialize = function () {
        this._lastStatusText = {}; // Objek untuk menyimpan status teks terakhir
        _Window_Options_initialize.apply(this, arguments);
    };

    // Modifikasi fungsi update dari Window_Options
    var _Window_Options_update = Window_Options.prototype.update;
    Window_Options.prototype.update = function () {
        _Window_Options_update.call(this);
        // Setiap frame, periksa apakah ada status yang perlu digambar ulang
        this.updateStatusText();
    };

    // Fungsi baru untuk memeriksa dan menggambar ulang item jika perlu
    Window_Options.prototype.updateStatusText = function () {
        for (var i = 0; i < this.maxItems(); i++) {
            var symbol = this.commandSymbol(i);
            // Hanya periksa simbol yang relevan (startUpFullScreen)
            if (symbol === "startUpFullScreen") {
                var newStatusText = this.statusText(i);
                // Jika teks status yang baru (misal: 'ON') berbeda dengan yang terakhir digambar ('OFF')
                if (this._lastStatusText[i] !== newStatusText) {
                    this._lastStatusText[i] = newStatusText; // Perbarui status terakhir
                    this.redrawItem(i); // Gambar ulang item tersebut
                }
            }
        }
    };

    // Pastikan status terakhir juga diperbarui saat item digambar pertama kali
    var _Window_Options_drawItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function (index) {
        // Simpan status teks saat ini sebelum menggambar
        this._lastStatusText[index] = this.statusText(index);
        _Window_Options_drawItem.apply(this, arguments);
    };
    //=============================================================================
})();

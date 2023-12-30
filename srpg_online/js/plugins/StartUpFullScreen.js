//=============================================================================
// StartUpFullScreen.js
// ----------------------------------------------------------------------------
// (C)2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.6.1 2023/08/05 Added an annotation to define the order with ElectronForMz.js
// 1.6.0 2023/07/23 Added feature to immediately reflect full screen state when changing options
// 1.5.0 2023/06/01 Compatible with ElectronForMz.js
// 1.4.0 2023/05/01 Added parameter to start in full screen by default
// 1.3.0 2022/09/09 Added feature to add a shutdown item to the game end screen
// 1.2.0 2021/12/30 Changed specification to disable full screen during event test execution
// 1.1.0 2021/11/04 Modified to work in MZ
// 1.0.3 2019/01/14 Fixed issue in 1.0.3 where it didn't work with core script v1.6.1 and earlier
// 1.0.2 2019/01/14 Fixed issue where it wasn't working properly with core script v1.6.1 and later
// 1.0.1 2018/06/30 Fixed issue where Y coordinate of title command window was not an integer
// 1.0.0 2016/03/06 First edition
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc Full Screen Startup Plugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/StartUpFullScreen.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @orderAfter ElectronForMz
 * @author Triacontane
 *
 * @param Shutdown
 * @text Shutdown Text
 * @desc The name of the shutdown item to be added to the title screen.
 * Displayed only when executed in a local environment.
 * @default Exit
 *
 * @param DefaultFullScreen
 * @text Default Full Screen
 * @desc If enabled, the game will start in full screen by default.
 * @default true
 * @type boolean
 *
 * @param Immediate
 * @text Immediate Reflection
 * @desc If enabled, changing the startup option in the menu immediately changes the full screen state.
 * @default true
 * @type boolean
 *
 * @param StartUpFullScreen
 * @text Full Screen
 * @desc The name of the item 'Start in Full Screen' to be added to the options menu.
 * Displayed only when executed in a local environment.
 * @default Full Screen
 *
 * @param UseGameEnd
 * @text Add to Game End Screen
 * @desc Adds the shutdown item to the game end screen.
 * @default true
 * @type boolean
 *
 * @help StartUpFullScreen.js
 *
 * Adds 'Start in Full Screen' to the options menu.
 * When enabled, the game will start in full screen.
 * Also adds a shutdown option to the title screen.
 *
 * This plugin is only effective when executed in a local environment.
 * Full screen is disabled during event test execution for tempo priority.
 *
 * This plugin requires the base plugin "PluginCommonBase.js".
 * "PluginCommonBase.js" can be found in the following folder under the RPG Maker MZ installation directory:
 * dlc/BasicResources/plugins/official
 *
 * Terms of Use:
 *  Modification and redistribution are allowed without the author's permission, and there are no restrictions on the form of use (commercial, 18+ usage, etc.).
 *  This plugin is now yours.
 */


function Scene_Terminate() {
    this.initialize.apply(this, arguments);
}

(()=> {
    'use strict';

    if (!Utils.isElectron) {
        Utils.isElectron = function() {
            return false;
        }
    }

    // Nw.jsおよびElectron環境下以外では一切の機能を無効
    if (!Utils.isNwjs() && !Utils.isElectron()) {
        return;
    }

    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    //=============================================================================
    // Graphics
    //  privateメソッド「_requestFullScreen」を呼び出します。
    //=============================================================================
    const _Graphics__requestFullScreen = Graphics._requestFullScreen;
    Graphics._requestFullScreen = function() {
        if (Utils.isElectron()) {
            window.electronAPI.fullScreen(true);
            this._fullScreenForElectron = true;
        } else {
            _Graphics__requestFullScreen.apply(this, arguments);
        }
    };

    const _Graphics__cancelFullScreen = Graphics._cancelFullScreen;
    Graphics._cancelFullScreen = function() {
        if (Utils.isElectron()) {
            window.electronAPI.fullScreen(false);
            this._fullScreenForElectron = false;
        } else {
            _Graphics__cancelFullScreen.apply(this, arguments);
        }
    };

    const _Graphics__isFullScreen = Graphics._isFullScreen;
    Graphics._isFullScreen = function() {
        if (Utils.isElectron()) {
            return this._fullScreenForElectron;
        } else {
            return _Graphics__isFullScreen.apply(this, arguments);
        }
    };

    const _Graphics__defaultStretchMode = Graphics._defaultStretchMode;
    Graphics._defaultStretchMode = function() {
        if (Utils.isElectron()) {
            return true;
        } else {
            return _Graphics__defaultStretchMode.apply(this, arguments);
        }
    };

    //=============================================================================
    // Scene_Boot
    //  フルスクリーンで起動する処理を追加します。
    //=============================================================================
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments)
        if (ConfigManager.startUpFullScreen && !DataManager.isEventTest()) {
            Graphics._requestFullScreen();
        }
    };


    //=============================================================================
    // Scene_Title
    //  シャットダウンの処理を追加定義します。
    //=============================================================================
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.apply(this, arguments);
        if (param.Shutdown) {
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
    const _Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
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

    const _Scene_GameEnd_commandWindowRect = Scene_GameEnd.prototype.commandWindowRect;
    Scene_GameEnd.prototype.commandWindowRect = function() {
        const rect = _Scene_GameEnd_commandWindowRect.apply(this, arguments);
        if (param.UseGameEnd) {
            // Risk of conflicts due to poor implementation of core scripts.
            rect.height = this.calcWindowHeight(3, true);
        }
        return rect;
    };

    //=============================================================================
    // Window_GameEnd
    //  シャットダウンの選択肢を追加定義します。
    //=============================================================================
    const _Window_GameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
    Window_GameEnd.prototype.makeCommandList = function() {
        _Window_GameEnd_makeCommandList.apply(this, arguments);
        if (param.UseGameEnd) {
            this.addCommand(param.Shutdown, 'shutdown');
            this._list.splice(1, 0, this._list.pop());
        }
    };

    const _Window_GameEnd_updatePlacement = Window_GameEnd.prototype.updatePlacement;
    Window_GameEnd.prototype.updatePlacement = function() {
        _Window_GameEnd_updatePlacement.apply(this, arguments);
        if (param.UseGameEnd) {
            this.y += Math.floor(this.height / 8);
        }
    };

    //=============================================================================
    // Window_TitleCommand
    //  シャットダウンの選択肢を追加定義します。
    //=============================================================================
    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
        if (param.Shutdown) {
            this.addCommand(param.Shutdown, 'shutdown');
            this.height = this.fittingHeight(this._list.length);
            this.createContents();
        }
    };

    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_maxCommands.apply(this, arguments) + 1;
    };

    //=============================================================================
    // ConfigManager
    //  オプションに「フルスクリーンで起動」項目を追加します。
    //=============================================================================
    ConfigManager._startUpFullScreen = param.DefaultFullScreen;

    Object.defineProperty(ConfigManager, 'startUpFullScreen', {
        get: function() {
            return this._startUpFullScreen;
        },
        set: function(value) {
            if (this._startUpFullScreen === value) {
                return;
            }
            this._startUpFullScreen = value;
            if (!param.Immediate) {
                return;
            }
            if (value) {
                Graphics._requestFullScreen();
            } else {
                Graphics._cancelFullScreen();
            }
        }
    });

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        this._startUpFullScreen = this.readFlag(config, 'startUpFullScreen');
    };

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.apply(this, arguments);
        config.startUpFullScreen = this.startUpFullScreen;
        return config;
    };

    //=============================================================================
    // Window_Options
    //  オプションに「フルスクリーンで起動」項目を追加します。
    //=============================================================================
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.apply(this, arguments);
        this.addCommand(param.StartUpFullScreen, 'startUpFullScreen');
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
})();


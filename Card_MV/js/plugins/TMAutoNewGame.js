//=============================================================================
// TMPlugin - 自動ニューゲーム
// バージョン: 2.0.0
// 最終更新日: 2016/08/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 起動時に自動ではじめからゲームを開始します。
 * Web用ミニゲームなど、タイトル画面が不要な場合などにどうぞ。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param autoNewGame
 * @desc 自動ではじめからゲームを開始する。
 * 初期値: 1 ( 0 で無効 / 1 で有効 )
 * @default 1
 *
 * @param firstLimited
 * @desc セーブデータがひとつ以上あるときの起動時の動作設定。
 * 初期値: 2 ( 0 で無効 / 1 でタイトル / 2 でコンティニュー )
 * @default 2
 *
 * @param allwaysOnTop
 * @desc 常にゲームウィンドウを最前面に表示する。
 * 初期値: 0 ( 0 で無効 / 1 で有効 )
 * @default 0
 *
 * @param autoDevTool
 * @desc テストプレイ時に自動でデベロッパツールを開く。
 * 初期値: 1 ( 0 で無効 / 1 で有効 )
 * @default 1
 *
 * @param autoContinueCommand
 * @desc オプションに追加する自動コンティニュー設定の項目名。
 * 初期値: 自動コンティニュー
 * @default 自動コンティニュー
 *
 * @param blockKey
 * @desc 起動時の処理を無効化するために使用するキー。
 * 初期値: control
 * @default control
 *
 * @help
 * 使い方:
 *
 *   プラグインパラメータで起動時の挙動を設定することができます。
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 *
 *
 * プラグインパラメータ補足:
 *
 *   alwaysOnTop
 *   autoDevTool
 *     どちらの機能もブラウザでの起動時には動作しません。
 *
 *   autoContinueOption
 *     このパラメータを空（何も書かない）にすると、オプション項目から
 *     自動コンティニューが除外されます。
 *     また、プラグインパラメータ firstLimited の値が 2 以外の場合も
 *     オプション項目に自動コンティニューは表示されません。
 *
 *   blockKey
 *     設定したキーを押していると、起動時の処理（自動ニューゲームや
 *     自動コンティニュー）の機能を抑制することができます。
 *     このパラメータを空（何も書かない）にすると、抑制機能は使用できなく
 *     なります。使えるキーは以下のとおりです。
 *       ok       … enter / space / Z
 *       escape   … esc / insert / numpad 0 / X
 *       shift    … shift
 *       control  … ctrl / alt
 *       pageup   … pageup / Q
 *       pagedown … pagedown / W
 *       down     … ↓ / numpad 2
 *       left     … ← / numpad 4
 *       right    … → / numpad 6
 *       up       … ↑ / numpad 8
 *
 *     ただし、起動前やF5キーによるリロード前からキーを押し続けていても
 *     効果はありません。起動時であればウィンドウが表示されてから、リロード
 *     の場合は画面暗転後にキーを押し始める必要があり、タイミングは多少
 *     シビアかもしれません。
 */

var Imported = Imported || {};
Imported.TMAutoNewGame = true;

var TMPlugin = TMPlugin || {};
TMPlugin.AutoNewGame = {};
TMPlugin.AutoNewGame.Parameters = PluginManager.parameters('TMAutoNewGame');
TMPlugin.AutoNewGame.AutoNewGame = TMPlugin.AutoNewGame.Parameters['autoNewGame'] === '1';
TMPlugin.AutoNewGame.FirstLimited = +(TMPlugin.AutoNewGame.Parameters['firstLimited'] || 2);
TMPlugin.AutoNewGame.AllwaysOnTop = TMPlugin.AutoNewGame.Parameters['allwaysOnTop'] === '1';
TMPlugin.AutoNewGame.AutoDevTool = TMPlugin.AutoNewGame.Parameters['autoDevTool'] === '1';
TMPlugin.AutoNewGame.AutoContinueCommand = TMPlugin.AutoNewGame.Parameters['autoContinueCommand'];
TMPlugin.AutoNewGame.BlockKey = TMPlugin.AutoNewGame.Parameters['blockKey'];

(function() {

  //-----------------------------------------------------------------------------
  // ConfigManager
  //

  ConfigManager.autoContinue = false;

  var _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
    config.autoContinue = this.autoContinue;
    return config;
  };

  var _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    this.autoContinue = this.readFlag(config, 'autoContinue');
  };

  //-----------------------------------------------------------------------------
  // Scene_Boot
  //
  
  var _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    if (Utils.isNwjs()) {
      if (Utils.isOptionValid('test') && TMPlugin.AutoNewGame.AutoDevTool) {
        require('nw.gui').Window.get().showDevTools().moveTo(0, 0);
        window.focus();
      }
      require('nw.gui').Window.get().setAlwaysOnTop(TMPlugin.AutoNewGame.AllwaysOnTop);
    }
    if (this.isAutoNewGame()) {
      this.autoNewGame();
    } else if (this.isAutoContinue()) {
      if (DataManager.loadGame(DataManager.latestSavefileId())) {
        this.autoContinue();
      } else {
        _Scene_Boot_start.call(this);
      }
    } else {
      _Scene_Boot_start.call(this);
    }
  };

  Scene_Boot.prototype.isAutoNewGame = function() {
    if (TMPlugin.AutoNewGame.FirstLimited > 0 &&
        DataManager.isAnySavefileExists()) {
      return false;
    }
    if (TMPlugin.AutoNewGame.BlockKey &&
        Input.isPressed(TMPlugin.AutoNewGame.BlockKey)) {
      return false;
    }
    return TMPlugin.AutoNewGame.AutoNewGame && !DataManager.isBattleTest() &&
           !DataManager.isEventTest();
  };

  Scene_Boot.prototype.isAutoContinue = function() {
    if (TMPlugin.AutoNewGame.AutoContinueCommand &&
        !ConfigManager.autoContinue) {
      return false;
    }
    if (TMPlugin.AutoNewGame.BlockKey &&
        Input.isPressed(TMPlugin.AutoNewGame.BlockKey)) {
      return false;
    }
    return TMPlugin.AutoNewGame.FirstLimited === 2 && DataManager.isAnySavefileExists() &&
           !DataManager.isBattleTest() && !DataManager.isEventTest();
  };
  
  Scene_Boot.prototype.autoNewGame = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
    Window_TitleCommand.initCommandPosition();
    this.updateDocumentTitle();
  };

  Scene_Boot.prototype.autoContinue = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
    SceneManager.goto(Scene_Map);
    Window_TitleCommand.initCommandPosition();
    this.updateDocumentTitle();
  };

  //-----------------------------------------------------------------------------
  // Window_Options
  //

  var _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function() {
    _Window_Options_addGeneralOptions.call(this);
    if (TMPlugin.AutoNewGame.FirstLimited === 2 &&
        TMPlugin.AutoNewGame.AutoContinueCommand) {
      this.addCommand(TMPlugin.AutoNewGame.AutoContinueCommand, 'autoContinue');
    }
  };

})();

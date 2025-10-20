//============================================================================
// HideActorCommand.js
//============================================================================
/*:
 * @plugindesc Hide actor command during player selecting skill,item or target on battle
 * @author Sasuke KANNAZUKI
 *
 * @help
 * This plugin does not provide plugin commands.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @plugindesc スキル、アイテムや対象の選択中はアクターコマンドを表示しません
 * @author 神無月サスケ
 *
 * @help
 * このプラグインには、プラグインコマンドはありません。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  var _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
  Scene_Battle.prototype.commandSkill = function() {
    this._actorCommandWindow.hide();
    this._actorCommandWindow.deactivate();
    _Scene_Battle_commandSkill.call(this);
  };

  var _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
  Scene_Battle.prototype.commandItem = function() {
    this._actorCommandWindow.hide();
    this._actorCommandWindow.deactivate();
    _Scene_Battle_commandItem.call(this);
  };

  var _Scene_Battle_selectEnemySelection =
   Scene_Battle.prototype.selectEnemySelection;
  Scene_Battle.prototype.selectEnemySelection = function() {
    if (this._actorCommandWindow.currentSymbol() === 'attack') {
      this._actorCommandWindow.hide();
      this._actorCommandWindow.deactivate();
    }
    _Scene_Battle_selectEnemySelection.call(this);
  };

  var _Scene_Battle_changeInputWindow =
   Scene_Battle.prototype.changeInputWindow;
  Scene_Battle.prototype.changeInputWindow = function() {
    _Scene_Battle_changeInputWindow.call(this);
    if (BattleManager.actor()) {
      this._actorCommandWindow.show();
    }
  };

  var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
  Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_onEnemyCancel.call(this);
    if (this._actorCommandWindow.currentSymbol() === 'attack') {
      this._actorCommandWindow.show();
    }
  };

  var _Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
  Scene_Battle.prototype.onSkillCancel = function() {
    _Scene_Battle_onSkillCancel.call(this);
    this._actorCommandWindow.show();
  };

  var _Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
  Scene_Battle.prototype.onItemCancel = function() {
    _Scene_Battle_onItemCancel.call(this);
    this._actorCommandWindow.show();
  };

})();

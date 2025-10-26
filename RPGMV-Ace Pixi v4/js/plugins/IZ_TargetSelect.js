//=============================================================================
// IZ_TargetSelect
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.01 バトルシーンにおいて、効果対象が全体/ランダムな
スキル/アイテムでも、効果対象選択ウィンドウを表示するようにします。
* @author いず
* @help
*
* IZ_BattleHelpを使っている場合、IZ_BattleHelpよりも下ァ！
* 
*/

(function () {
    
    Game_Action.prototype.isNoneSelect = function() { //新規
    return this.checkItemScope([0, 11]); //なし、使用者
    };

    Scene_Battle.prototype.remCursor = function() { //新規
    this._enemyWindow.setCursorAll(false);
    this._actorWindow.setCursorAll(false);
    };

    var _Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
    Scene_Battle.prototype.selectNextCommand = function() {
    this.remCursor();
    this._helpWindow.hide();
    _Scene_Battle_selectNextCommand.call(this);
    };

    var _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
    this.remCursor();
    _Scene_Battle_onActorCancel.call(this);
    };

    var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
    this.remCursor();
    _Scene_Battle_onEnemyCancel.call(this);
    };

    Scene_Battle.prototype.onSelectAction = function () {
        var action = BattleManager.inputtingAction();
        this.remCursor();
        this._skillWindow.hide();
        this._itemWindow.hide();

        if (!action.needsSelection()) {
            if(action.isNoneSelect()){
                this.selectNextCommand();
            }else if (action.isForOpponent()) {
                this._enemyWindow.setCursorAll(true);
                this.selectEnemySelection();
            } else {
                this._actorWindow.setCursorAll(true);
                this.selectActorSelection();
            }

        } else if (action.isForOpponent()) {
            this.selectEnemySelection();
        } else {
            this.selectActorSelection();
        }
    };

//以下バトラーの点滅のための処理
    Window_BattleActor.prototype.select = function(index) {
    Window_BattleStatus.prototype.select.call(this, index);
    if(this.cursorAll()){
      for(var i = 0; i < this.maxItems(); i++){
          $gameParty.members()[i]._selected = true;
      }
    }else{
      $gameParty.select(this.actor());
    }
    };

    Window_BattleEnemy.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    if(this.cursorAll()){
      for(var i = 0; i < this.maxItems(); i++){
          this._enemies[i]._selected = true;
      }
    }else{
      $gameTroop.select(this.enemy());
    }
    };

})();
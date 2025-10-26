/*:
 * @plugindesc Message
 * @author Ryan Bram
 *
 * @help
 * Basic plugin for manipulating important parameters.
 *
 */

(function () {
    "use strict";
    var pluginName = "WindowEquipMZ";

    //=============================================================================
    // Local Function
    //  This function formats and checks plugin parameters and plugin command parameters.
    //=============================================================================

    // This function convert string to number
    function isNumber(str) {
        return !!str && !isNaN(str);
    }

    function toNumber(str, def) {
        return isNumber(str) ? +str : def;
    }

    // This function use plugin name as parameters
    var getFileName = function (scriptElement) {
        var path = scriptElement.src;
        var filename = path.split("/").pop();
        return filename.split(".").shift();
    };

    // Use document.currentScript for getting recent script
    var currentScript =
        document.currentScript ||
        (function () {
            var scripts = document.getElementsByTagName("script");
            return scripts[scripts.length - 1];
        })();

    var currentFileName = getFileName(currentScript);

    //-----------------------------------------------------------------------------

    //=============================================================================
    // Getting and Formatting Parameters
    //=============================================================================

    // Inserting plugin file name as parameters
    var parameters = PluginManager.parameters(currentFileName);
    //.var parameters = PluginManager.parameters(pluginName);

    //-----------------------------------------------------------------------------

    //=============================================================================
    // Plugin Content
    //   rpg_core.js
    //   rpg_managers.js
    //   rpg_objects.js
    //   rpg_scenes.js
    //   rpg_sprites.js
    //   rpg_windows.js
    //=============================================================================

    //============================[ rpg_core.js ]==================================

    //-----------------------------------------------------------------------------

    //===========================[ rpg_managers.js ]===============================

    //-----------------------------------------------------------------------------

    //===========================[ rpg_objects.js ]================================

    //-----------------------------------------------------------------------------

    //===========================[ rpg_scenes.js ]=================================

    Scene_Equip.prototype.createItemWindow = function () {
        var wx = this._statusWindow.width;
        var wy = this._commandWindow.y + this._commandWindow.height;
        var ww = Graphics.boxWidth - this._statusWindow.width;
        var wh = this._statusWindow.height - this._commandWindow.height;
        this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this._itemWindow.hide();
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    Scene_Equip.prototype.onSlotOk = function () {
        this._slotWindow.hide();
        this._itemWindow.show();
        this._itemWindow.activate();
        this._itemWindow.forceSelect(0);
    };

    Scene_Equip.prototype.onItemOk = function () {
        SoundManager.playEquip();
        this.executeEquipChange();
        this.hideItemWindow();
        this._slotWindow.refresh();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
    };

    Scene_Equip.prototype.executeEquipChange = function () {
        const actor = this.actor();
        const slotId = this._slotWindow.index();
        const item = this._itemWindow.item();
        actor.changeEquip(slotId, item);
    };

    Scene_Equip.prototype.onItemCancel = function () {
        this.hideItemWindow();
    };

    Scene_Equip.prototype.onActorChange = function () {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
        this.hideItemWindow();
        this._slotWindow.deselect();
        this._slotWindow.deactivate();
        this._commandWindow.activate();
    };

    Scene_Equip.prototype.hideItemWindow = function () {
        this._slotWindow.show();
        this._slotWindow.activate();
        this._itemWindow.hide();
        this._itemWindow.deselect();
    };

    //-----------------------------------------------------------------------------

    //===========================[ rpg_sprites.js ]================================

    //-----------------------------------------------------------------------------

    //===========================[ rpg_windows.js ]================================

    Window_Selectable.prototype.forceSelect = function (index) {
        this.select(index);
        this.ensureCursorVisible(false);
    };

    Window_EquipStatus.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = Graphics.boxHeight - this.fittingHeight(2);
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._tempActor = null;
        this.refresh();
    };

    Window_EquipStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            this.drawActorName(this._actor, this.textPadding(), 0);
            this.drawActorFace(this._actor, 0, this.lineHeight(), Window_Base._faceWidth, Window_Base._faceHeight);
            for (var i = 0; i < 6; i++) {
                this.drawItem(0, Window_Base._faceHeight + this.lineHeight() * (1 + i), 2 + i);
            }
        }
    };

    Window_EquipItem.prototype.maxCols = function () {
        return 1;
    };

    //-----------------------------------------------------------------------------
})();

/*
CREDITS

*/

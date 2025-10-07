/*:
 * @plugindesc Add MZ Touch UI
 * @author Ryan Bram
 *
 * @help
 * Add touch UI to your RPG Maker MV game.
 *
 * @param Use Touch UI
 * @desc Enable or disable TouchUI feature
 * @type boolean
 * @default true
 *
 */

(function () {
    "use strict";
    var pluginName = "LargerCommand";

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
    window.paramTouchUIEnabled = parameters["Use Touch UI"] === "true";
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

    //-----------------------------------------------------------------------------

    //===========================[ rpg_sprites.js ]================================

    //-----------------------------------------------------------------------------

    //===========================[ rpg_windows.js ]================================

    // 35
    Window_Base.prototype.lineHeight = function () {
        return 32; // default: 36
    };

    // 53 Space between window and contents
    Window_Base.prototype.standardPadding = function () {
        return this.lineHeight() / 2; // default: 18
    };

    // 57 Space between text and box
    Window_Base.prototype.textPadding = function () {
        return this.standardPadding() / 2; // default: 6
    };

    // NEW
    Window_Base.prototype.itemHeight = function () {
        return this.lineHeight();
    };

    // 85
    Window_Base.prototype.fittingHeight = function (numLines) {
        return numLines * this.itemHeight() + this.standardPadding() * 2; // default: return numLines * this.lineHeight() + this.standardPadding() * 2;
    };

    // NEW
    Window_Base.prototype.itemPadding = function () {
        return 8; // default: 8
    };

    // 596 Adjust Icon & Text Position
    Window_Base.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + this.textPadding(), y);
            this.drawText(item.name, x + iconBoxWidth + this.textPadding(), y, width - iconBoxWidth);
        }
    };

    // 774 - Increase height size for only selectable window
    Window_Selectable.prototype.itemHeight = function () {
        return this.lineHeight() + this.standardPadding(); // default: return this.lineHeight();
    };

    // 868
    Window_Selectable.prototype.itemRectForText = function (index) {
        var rect = this.itemRect(index);
        rect.x += this.textPadding(); // geser ke kanan
        rect.y += this.textPadding(); // geser ke bawah, default: none
        rect.width -= this.textPadding() * 2; // lebar area text
        return rect;
    };

    // 1987
    Window_ItemList.prototype.drawItem = function (index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y + this.textPadding(), rect.width - numberWidth); // default: this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y + this.textPadding(), rect.width); // default: this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    // 2207
    Window_SkillList.prototype.drawItem = function (index) {
        var skill = this._data[index];
        if (skill) {
            var costWidth = this.costWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y + this.textPadding(), rect.width - costWidth); // default: this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y + this.textPadding(), rect.width); // default: this.drawSkillCost(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_SavefileList.prototype.drawPartyCharacters = function (info, x, y) {
        if (info.characters) {
            for (var i = 0; i < info.characters.length; i++) {
                var data = info.characters[i];
                this.drawCharacter(data[0], data[1], x + i * 48, y - this.textPadding());
            }
        }
    };

    Window_SavefileList.prototype.drawPlaytime = function (info, x, y, width) {
        if (info.playtime) {
            this.drawText(info.playtime, x, y - this.textPadding(), width, "right");
        }
    };

    // 2991
    Window_ShopBuy.prototype.drawItem = function (index) {
        var item = this._data[index];
        var rect = this.itemRect(index);
        var priceWidth = 96;
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y + this.textPadding(), rect.width - priceWidth);
        this.drawText(
            this.price(item),
            rect.x + rect.width - priceWidth,
            rect.y + this.textPadding(),
            priceWidth,
            "right"
        );
        this.changePaintOpacity(true);
    };

    // NEW
    Window_NameInput.prototype.itemHeight = function () {
        return this.lineHeight();
    };

    Window_NameInput.prototype.windowHeight = function () {
        return this.fittingHeight(9);
    };

    // 4502
    Window_NumberInput.prototype.itemWidth = function () {
        return 32 + this.textPadding();
    };

    // 4627
    Window_NumberInput.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        var align = "center";
        var s = this._number.padZero(this._maxDigits);
        var c = s.slice(index, index + 1);
        this.resetTextColor();
        this.drawText(c, rect.x, rect.y + this.textPadding(), rect.width, align);
    };

    //-----------------------------------------------------------------------------
})();

/*
CREDITS

*/

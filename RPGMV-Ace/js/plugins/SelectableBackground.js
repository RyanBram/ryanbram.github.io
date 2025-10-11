/*:
 * @plugindesc Plugin used to add seelctable background.
 * @author RyanBram
 *
 * @help This plugin does not provide plugin commands.
 *
 */

(function () {
    function toNumber(str, def) {
        return isNaN(str) ? def : +(str || def);
    }

    var parameters = PluginManager.parameters("Selectable");

    // Creating selectable background like RPG Maker MZ ---------------------------
    // 1251
    Window_Selectable.prototype.drawAllItems = function () {
        var topIndex = this.topIndex();
        for (var i = 0; i <= this.maxPageItems(); i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItemBackground(index);
                this.drawItem(index);
            }
        }
    };

    /*
    Window_Selectable.prototype.maxVisibleItems = function () {
        var visibleRows = Math.ceil(this.contentsHeight() / this.itemHeight());
        return visibleRows * this.maxCols();
    };
    */

    // NEW
    Window_Selectable.prototype.drawItemBackground = function (index) {
        var rect = this.itemRect(index);
        this.drawBackgroundRect(rect);
    };

    // NEW
    Window_Selectable.prototype.drawBackgroundRect = function (rect) {
        var c1 = "ffffff";
        var c2 = "000000";
        var x = rect.x;
        var y = rect.y;
        var w = rect.width;
        var h = rect.height;
        this.contents.paintOpacity = 64;
        this.contents.fillRect(x + 2, y + 2, w - 4, h - 4, c1);
        this.contents.paintOpacity = 64;
        this.contents.fillRect(x + 3, y + 3, w - 6, h - 6, c2, c2, true);
        this.contents.paintOpacity = 255;
    };

    // 1269
    var _Window_Selectable_redrawItem = Window_Selectable.prototype.redrawItem;
    Window_Selectable.prototype.redrawItem = function (index) {
        _Window_Selectable_redrawItem.call(this);
        if (index >= 0) {
            this.clearItem(index);
            this.drawItemBackground(index);
            this.drawItem(index);
        }
    };

    // 1738
    Window_MenuStatus.prototype.drawItem = function (index) {
        this.drawPendingItemBackground(index);
        this.drawItemImage(index);
        this.drawItemStatus(index);
    };

    // 1744
    Window_MenuStatus.prototype.drawPendingItemBackground = function (index) {
        delete Window_MenuStatus.prototype.drawItemBackground; // Without this, it will call the original drawItemBackground
        if (index === this._pendingIndex) {
            var rect = this.itemRect(index);
            var color = this.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
            this.changePaintOpacity(true);
            this.drawItemBackground(index);
        }
    };
})();

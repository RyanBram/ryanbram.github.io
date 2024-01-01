/*:
* @target MZ
* @plugindesc Enables single touch selection for menu items in RPG Maker MZ while preserving swipe scrolling and mouse functionality.
* @author RPG Maker Coder
* @help
* This plugin allows menu items to be selected with a single touch and preserves swipe scrolling and mouse functionality.
*/

(() => {
    Window_Selectable.prototype.isExcludedFromSingleTouch = function() {
        return this instanceof Window_SkillList || 
               this instanceof Window_ItemList || 
               this instanceof Window_EquipItem;
    };
    const _Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
    Window_Selectable.prototype.processTouch = function() {
        if (this.isExcludedFromSingleTouch()) {
            _Window_Selectable_processTouch.call(this)
        } else{
            if (this.isOpenAndActive()) {
                if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                    // Check if the input is from touch screen and not from the mouse
                    //if (TouchInput.isPressed() && !TouchInput._mousePressed) {
                    if (TouchInput._onTouchStart) {
                        this._touchStartX = TouchInput.x;
                        this._touchStartY = TouchInput.y;
                        this._touching = true;
                    } else {
                        // Process normal mouse behavior
                        _Window_Selectable_processTouch.call(this);
                    }
                } else if (TouchInput.isCancelled()) {
                    if (this.isCancelEnabled()) {
                        this.processCancel();
                    }
                } else if (this._touching && TouchInput.isReleased()) {
                    const swipeThreshold = 10; // Minimum distance to consider as a swipe
                    let dx = TouchInput.x - this._touchStartX;
                    let dy = TouchInput.y - this._touchStartY;
                    if (Math.abs(dx) < swipeThreshold && Math.abs(dy) < swipeThreshold) {
                        this.onSingleTouch();
                    }
                    this._touching = false;
                } else {
                    _Window_Selectable_processTouch.call(this);
                }
            }
        }

    };

    Window_Selectable.prototype.onSingleTouch = function() {
        const localX = this.canvasToLocalX(TouchInput.x);
        const localY = this.canvasToLocalY(TouchInput.y);
        const hitIndex = this.hitTest(localX, localY);
        if (hitIndex >= 0) {
            this.select(hitIndex);
            setTimeout(() => {
                this.processOk();
            }, 125); // 125 milliseconds delay
        }
    };

    Window_Selectable.prototype.canvasToLocalX = function(x) {
        const shape = this.getBounds();
        return x - shape.x;
    };

    Window_Selectable.prototype.canvasToLocalY = function(y) {
        const shape = this.getBounds();
        return y - shape.y;
    };

    Window_Selectable.prototype.hitTest = function(x, y) {
        for (let i = 0; i < this.maxItems(); i++) {
            const rect = this.itemRectWithPadding(i);
            if (x >= rect.x && y >= rect.y && x < rect.x + rect.width && y < rect.y + rect.height) {
                return i;
            }
        }
        return -1;
    };
})();
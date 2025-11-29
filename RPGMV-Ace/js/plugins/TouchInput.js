//=============================================================================
// TouchInput.js
//=============================================================================
// Hardcoded plug-and-play version
// Behavior: Follow mode, Single tap, No warp, No smooth scroll, No double tap
//=============================================================================

(function(exports) {
    'use strict';

//=============================================================================
// Window
//=============================================================================

Window.prototype._refreshCursor = function() {
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var m = 4;
    var bitmap = new Bitmap(w, h);

    this._windowCursorSprite.bitmap = bitmap;

    if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 48;
        bitmap.blt(skin, p+m, p+m, q-m*2, q-m*2, m, m, w-m*2, h-m*2);
        bitmap.blt(skin, p+m, p+0, q-m*2, m, m, 0, w-m*2, m);
        bitmap.blt(skin, p+m, p+q-m, q-m*2, m, m, h-m, w-m*2, m);
        bitmap.blt(skin, p+0, p+m, m, q-m*2, 0, m, m, h-m*2);
        bitmap.blt(skin, p+q-m, p+m, m, q-m*2, w-m, m, m, h-m*2);
        bitmap.blt(skin, p+0, p+0, m, m, 0, 0, m, m);
        bitmap.blt(skin, p+q-m, p+0, m, m, w-m, 0, m, m);
        bitmap.blt(skin, p+0, p+q-m, m, m, 0, h-m, m, m);
        bitmap.blt(skin, p+q-m, p+q-m, m, m, w-m, h-m, m, m);
    }
    this._updateCursorPos();
};

Window.prototype._updateCursor = function() {
    var pad = this._padding;
    var x = this._cursorRect.x + pad - this.origin.x;
    var y = this._cursorRect.y + pad - this.origin.y;
    if (this._cursorRect.width > 0 && this._cursorRect.height > 0 && this.isOpen()) {
        this._windowCursorSprite.visible = this.isOpen();
    } else {
        this._windowCursorSprite.visible = false;
    }
    this._updateCursorPos();
};

Window.prototype._updateCursorPos = function() {
    var pad = this._padding;
    var x = this._cursorRect.x + pad - this.origin.x;
    var y = this._cursorRect.y + pad - this.origin.y;
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var x2 = Math.max(x, pad);
    var y2 = Math.max(y, pad);
    var ox = x2 - x;
    var oy = y2 - y;
    var w2 = Math.min(w, this._width - pad - x2);
    var h2 = Math.min(h, this._height - pad - y2);
    
    this._windowCursorSprite.setFrame(ox, oy, w2, h2);
    this._windowCursorSprite.move(x2, y2);
};

//=============================================================================
// TouchInput
//=============================================================================

TouchInput.clear = function() {
    this._mousePressed = false;
    this._screenPressed = false;
    this._pressedTime = 0;
    this._events = {};
    this._events.triggered = false;
    this._events.cancelled = false;
    this._events.moved = false;
    this._events.released = false;
    this._events.wheelX = 0;
    this._events.wheelY = 0;
    this._triggered = false;
    this._cancelled = false;
    this._moved = false;
    this._released = false;
    this._wheelX = 0;
    this._wheelY = 0;
    this._x = 0;
    this._y = 0;
    this._date = 0;
    this._startX = 0;
    this._startY = 0;
    this._leftSwipe = false;
    this._rightSwipe = false;
    this._ok = false;
};

TouchInput.update = function() {
    this._triggered = this._events.triggered;
    this._cancelled = this._events.cancelled;
    this._moved = this._events.moved;
    this._released = this._events.released;
    this._wheelX = this._events.wheelX;
    this._wheelY = this._events.wheelY;
    this._events.triggered = false;
    this._events.cancelled = false;
    this._events.moved = false;
    this._events.released = false;
    this._events.wheelX = 0;
    this._events.wheelY = 0;
    if (this.isPressed()) {
        this._pressedTime++;
    }
    if (this.isReleased()) {
        if (this._pressedTime >= 6) {
            var sx = (this._x - this._startX) / this._pressedTime;
            this._leftSwipe = sx < -6;
            this._rightSwipe = sx > 6;
        } else {
            this._leftSwipe = false;
            this._rightSwipe = false;
        }
        this._ok = true;
    } else {
        this._leftSwipe = false;
        this._rightSwipe = false;
        this._ok = false;
    }
};

TouchInput.isLeftSwipe = function() {
    return this._leftSwipe;
};

TouchInput.isRightSwipe = function() {
    return this._rightSwipe;
};

TouchInput.isOk = function() {
    return this._ok;
};

TouchInput.isDoubleTap = function() {
    return false;
};

TouchInput._onMouseMove = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._onMove(x, y);
        this._date = Date.now();
    }
};

TouchInput._onTrigger = function(x, y) {
    this._events.triggered = true;
    this._x = x;
    this._y = y;
    this._date = Date.now();
    this._startX = x;
    this._startY = y;
};

TouchInput.clearInterval = function() {
    // No-op as interval logic is removed
};

//=============================================================================
// SoundManager
//=============================================================================

SoundManager.playCancel = function() {
    if (!$gameMessage.cancelOff) {
        this.playSystemSound(2);
    }
};

//=============================================================================
// Game_Message
//=============================================================================

Game_Message.prototype.clear = function() {
    this._texts = [];
    this._choices = [];
    this._faceName = '';
    this._faceIndex = 0;
    this._background = 0;
    this._positionType = 2;
    this._choiceDefaultType = 0;
    this._choiceCancelType = 0;
    this._choiceBackground = 0;
    this._choicePositionType = 2;
    this._numInputVariableId = 0;
    this._numInputMaxDigits = 0;
    this._itemChoiceVariableId = 0;
    this._itemChoiceItypeId = 0;
    this._scrollMode = false;
    this._scrollSpeed = 2;
    this._scrollNoFast = false;
    this._choiceCallback = null;
    this.cancelOff = false;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command === 'CancelOff') {
        $gameMessage.cancelOff = true;
    }
};

//=============================================================================
// Window_Selectable
//=============================================================================

Window_Selectable.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._index = -1;
    this._cursorFixed = false;
    this._cursorAll = false;
    this._stayCount = 0;
    this._helpWindow = null;
    this._handlers = {};
    this._touching = false;
    this._scrollX = 0;
    this._scrollY = 0;
    this.deactivate();
    this._originYSpeed = [];
};

Window_Selectable.prototype.contentsHeight = function() {
    return Window_Base.prototype.contentsHeight.call(this) + this.itemHeight();
};

Window_Selectable.prototype.setTopRow = function(row) {
    var scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight();
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
    this.resetOy();
};

Window_Selectable.prototype.isSmoothScroll = function() {
    return false;
};

Window_Selectable.prototype.isTouchFollowing = function() {
    return (TouchInput.date > Input.date);
};

Window_Selectable.prototype.skipSmoothScroll = function() {
    // No-op
};

Window_Selectable.prototype.startScrollOy = function(oy) {
    // No-op
};

Window_Selectable.prototype.resetScroll = function() {
    this.setTopRow(0);
    this.resetOy();
};

Window_Selectable.prototype.setBottomRow = function(row) {
    var oy = (row + 1) * this.itemHeight() - this.height + this.padding * 2;
    this.setOy(oy - this._scrollY);
};

Window_Selectable.prototype.resetOy = function() {
    this.origin.y = 0;
    this._originYSpeed = [];
};

Window_Selectable.prototype.setOy = function(oy) {
    var sr = Math.floor(oy / this.itemHeight());
    var topRow = this.topRow();
    if (sr !== 0) {
        var scrollY = topRow.clamp(0, this.maxTopRow()) * this.itemHeight();
        scrollY = (topRow + sr).clamp(0, this.maxTopRow()) * this.itemHeight();
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    }
    if ((topRow <= 0 && oy < 0) || 
            (this.topRow() >= this.maxTopRow() && oy > 0)) {
        this.resetOy();
    } else {
        this.origin.y = oy.mod(this.itemHeight());
    }
};

Window_Selectable.prototype.gainOy = function(amount) {
    this.setOy(Math.floor(this.origin.y + amount));
};

Window_Selectable.prototype.scrollDown = function() {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index < maxItems - maxCols || (maxCols === 1 && index < maxItems - 1)) {
        this.select((index + maxCols) % maxItems);
    }
    this.resetOy();
};

Window_Selectable.prototype.scrollUp = function() {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index >= maxCols || (maxCols === 1 && index > 0)) {
        this.select((index - maxCols + maxItems) % maxItems);
    }
    if (this.origin.y > 0) {
        this.resetOy();
    } else {
        var index = this.index();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        if (index >= maxCols || (maxCols === 1 && index > 0)) {
            this.select((index - maxCols + maxItems) % maxItems);
        }
        this.resetOy();
    }
};

Window_Selectable.prototype.targetTopRow = function() {
    return this.topRow();
};

Window_Selectable.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateArrows();
    this.processCursorMove();
    this.processHandling();
    this.processWheel();
    this.processTouch();
    this._stayCount++;
};

Window_Selectable.prototype.updateArrows = function() {
    var topRow = this.topRow();
    var maxTopRow = this.maxTopRow();
    this.downArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
    this.upArrowVisible = topRow > 0;
    var bottomY = this.maxRows() * this.itemHeight();
    var realY = this._scrollY + this.origin.y + this.height - this.padding * 2;
    this.downArrowVisible = this.downArrowVisible && bottomY > realY;
    this.upArrowVisible = (this.upArrowVisible || this.origin.y > 0);
};

Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered()) {
            this._touching = true;
            this._selecting = true;
            this._touchLastY = TouchInput.y;
            this._touchInsided = this.isTouchedInsideFrame();
            this._originYSpeed = [];
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isTriggered()) {
                this.onTouch(false);
            } else if (TouchInput.isPressed()) {
                if (this.touchScroll()) {
                    this._selecting = false;
                }
            } else {
                this.touchSwipe();
                if (this._selecting && TouchInput.isOk()) {
                    this.onTouch(true);
                } else {
                    TouchInput.clearInterval();
                }
                this._touching = false;
                this._selecting = false;
            }
        }
        if (!this._touching) {
            if (this._originYSpeed.length > 0) {
                this.addOriginYSpeed(this._originYSpeed[0] * 0.9);
                if (Math.abs(this.originYSpeed()) < 2) this._originYSpeed = [];
            } else if (this.isTouchFollowing() && TouchInput.isMoved()) {
                this.onTouch(false);
            }
        }
        this.updateTouchScroll();
    } else {
        this._touching = false;
        this._selecting = false;
        this._touchInside = false;
    }
};

Window_Selectable.prototype.addOriginYSpeed = function(speed) {
    this._originYSpeed.push(speed);
    if (this._originYSpeed.length > 3) {
        this._originYSpeed.shift();
    }
};

Window_Selectable.prototype.originYSpeed = function() {
    if (this._touching) {
        return this._originYSpeed[this._originYSpeed.length - 1] || 0;
    }
    var speed = 0;
    for (var i = 0; i < this._originYSpeed.length; i++) {
        speed += this._originYSpeed[i];
    }
    return speed / (this._originYSpeed.length || 1);
};

Window_Selectable.prototype.touchScroll = function() {
    if (this._touchInsided) {
        this.addOriginYSpeed(this._touchLastY - TouchInput.y);
        this._touchLastY = TouchInput.y;
        return (Math.abs(TouchInput.y - TouchInput._startY) > 12);
    }
    return false;
};

Window_Selectable.prototype.touchSwipe = function() {
    if (TouchInput.isLeftSwipe()) {
        if (this.isHandled('pageup')) this.processPageup();
    } else if (TouchInput.isRightSwipe()) {
        if (this.isHandled('pagedown')) this.processPagedown();
    }
};

Window_Selectable.prototype.updateTouchScroll = function() {
    if (this._touchInsided && this._originYSpeed.length > 0) {
        this.gainOy(this.originYSpeed());
    }
};

Window_Selectable.prototype.onTouch = function(triggered) {
    if (triggered) {
        TouchInput.clearInterval();
        this._stayCount = 0;
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
        }
    } else {
        this._stayCount = 0;
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                this._touchHovering = true;
                this.select(hitIndex);
                this._touchHovering = false;
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
        }
        if (this.index() !== lastIndex) {
            TouchInput.clearInterval();
        }
    }
};

Window_Selectable.prototype.hitTest = function(x, y) {
    if (this.isContentsArea(x, y)) {
        var cx = x - this.padding;
        var cy = y - this.padding + this.origin.y;
        var topIndex = this.topIndex();
        var maxPageItems = this.maxPageItems() + this.maxCols();
        for (var i = 0; i < maxPageItems; i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                var rect = this.itemRect(index);
                var right = rect.x + rect.width;
                var bottom = rect.y + rect.height;
                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                    return index;
                }
            }
        }
    }
    
    return -1;
};

Window_Selectable.prototype.updateCursor = function() {
    if (this._cursorAll) {
        var allRowsHeight = this.maxRows() * this.itemHeight();
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        this.setTopRow(0);
        this.resetOy();
    } else if (this.isCursorVisible()) {
        var rect = this.itemRect(this.index());
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

Window_Selectable.prototype.isCursorVisible = function() {
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow() + 1;
};

Window_Selectable.prototype.ensureCursorVisible = function() {
    if (this._touchHovering) return;
    var row = this.row();
    if (row < this.topRow()) {
        this.setTopRow(row);
    } else if (row > this.bottomRow()) {
        this.setBottomRow(row);
    }
    if (this.row() === this.topRow()) {
        this.setTopRow(this.targetTopRow());
    }
};

Window_Selectable.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
    var topIndex = this.topIndex() + this.maxPageItems();
    for (var i = 0; i < this.maxCols(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Window_ChoiceList.prototype.contentsHeight = function() {
    return Math.max(this.numVisibleRows() * this.itemHeight(), 0) + this.itemHeight();
};

Window_ChoiceList.prototype.processCancel = function() {
    SoundManager.cancelOff = $gameMessage.cancelOff;
    Window_Command.prototype.processCancel.call(this);
    SoundManager.cancelOff = false;
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.isTouchedInsideFrame = function() {
    return false;
};

//=============================================================================
// Window_ShopStatus
//=============================================================================

Window_ShopStatus.prototype.changePage = function() {
    if (this._pageIndex === 0) {
        this._pageIndex = 1;
    } else {
        this._pageIndex = 0;
    }
    this.refresh();
    Input.update();
    TouchInput.update();
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.start = function() {
    this._active = true;
    if (this._windowLayer) {
        this._windowLayer.children.forEach(window => {
            if (typeof window.skipSmoothScroll === "function") {
                window.skipSmoothScroll();
            }
        });
    }
};

})(this);

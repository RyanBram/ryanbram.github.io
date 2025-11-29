//=============================================================================
// SimpleTouch3.js
//=============================================================================
// Copyright (c) 2016-2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.3.19】Changes mouse and touch operations.
 * @author Kijutsu Penguin
 *
 * @help Plugin command:
 *   CancelOff           # Do not sound the cancel SE in the next [Display Choices]
 * 
 * ================================
 *  If this plugin is introduced, the following functions will be changed or added
 * 
 * --------------------------------
 * ●Cursor movement
 *  You can change the [Cursor Movement] method in the plugin parameter [Select Type Default].
 *  This setting can also be changed from the game options.
 *  
 *  ▽0 (Touch)
 *   The cursor moves when you touch the item.
 *   
 *  ▽1 (Follow)
 *   The cursor always moves to the mouse position.
 *  
 * --------------------------------
 * ●Decision operation
 *  You can change the [Decision Operation] method in the plugin parameter [Ok Type Default].
 *  This setting can also be changed from the game options.
 *  
 *  ▽0 (Default)
 *   If the cursor and the touched item match, it will be [Decided],
 *   otherwise it will only be [Cursor Movement].
 *  
 *   It is similar to the default operation of RPG Maker MV,
 *   [Decision] is made when touched briefly, and nothing is done when long pressed.
 *   
 *  ▽1 (Single)
 *   [Decision] is made when you touch the item briefly.
 *   Nothing is done when long pressed.
 *  
 *  ▽2 (Double)
 *   [Decision] is made when you touch the same item twice briefly.
 *   Nothing is done when long pressed.
 * 
 * --------------------------------
 * ●Scroll
 *  If you touch the window and slide up and down, you will scroll.
 *  Flick operation will scroll automatically for a while.
 *  
 *  If you enable the plugin parameter [Scroll Warp?],
 *  If you scroll down when the first item is displayed, it will move to the last item,
 *  If you scroll up when the last item is displayed, it will move to the first item.
 * 
 * --------------------------------
 * ●Cancel operation
 *  ▽By the plugin parameter [Cancel Enabled?],
 *    You can disable the window cancellation by right-clicking or two-finger tapping.
 *  
 *  ▽By the plugin parameter [Outside Tap Default],
 *    You can add a function to [Cancel] when you tap outside the window.
 *    This setting can also be changed from the game options.
 *  
 * --------------------------------
 * ●Page switching
 *  If you touch the screen and swipe left or right, you will [Switch Pages].
 *  
 *  This operation is prioritized over the [Cancel] operation of [Outside Tap],
 *  It works even if you swipe outside the window.
 * 
 * --------------------------------
 * ●Other notes
 *  If you touch the screen on the status screen, you will [Cancel].
 * 
 * ================================
 * Production : Kijutsu Penguin
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Cancel Enabled?
 * @type boolean
 * @desc Enable/Disable cancellation by right-click or two-finger tap
 * @default true
 * 
 * @param Double Tap Interval
 * @type number
 * @desc Interval of double tap
 * @default 
 * 
 * @param Cursor SE Always?
 * @type boolean
 * @desc Whether to always sound the cursor SE when touched
 * @default false
 * 
 * @param Scroll Warp?
 * @type boolean
 * @desc Enable/Disable scroll warp
 * @default false
 * 
 * @param Scroll Warp SE
 * @type struct<SE>
 * @desc SE at the time of scroll warp
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @parent Scroll Warp?
 *
 * @param Smooth Scroll?
 * @type boolean
 * @desc Smooth operation of scroll
 * @default false
 * 
 *
 * @param === Default ===
 * 
 * @param Long Press Time
 * @type number
 * @desc Long press time to cancel the decision (number of frames)
 * @default
 * @parent === Default ===
 * 
 * @param Select Type Default
 * @type number
 * @max 1
 * @desc Default value of [Cursor Movement]
 * (0:Touch, 1:Follow)
 * @default 1
 * @parent === Default ===
 * 
 * @param Ok Type Default
 * @type number
 * @max 2
 * @desc Default value of [Decision Operation]
 * (0:Default, 1:Single, 2:Double)
 * @default 1
 * @parent === Default ===
 * 
 * @param Outside Tap Default
 * @type number
 * @max 1
 * @desc Default value of [Outside Tap]
 * (0:Disable, 1:Cancel)
 * @default 1
 * @parent === Default ===
 * 
 * @param === Command ===
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc Plugin command name
 * @default {"CancelOff":"CancelOff"}
 * @parent === Command ===
 * 
 * 
 * 
 */

/*~struct~SE:
 * @param Name
 * @desc File name
 * @default
 * @require 1
 * @dir audio/se
 * @type file
 *
 * @param Volume
 * @type number
 * @max 100
 * @desc Volume
 * @default 90
 *
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @desc Pitch
 * @default 100
 *
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @desc Phase
 * @default 0
 *
 */

/*~struct~Plugin:
 * @param CancelOff
 * @desc Do not sound the cancel SE in the next [Display Choices]
 * @default CancelOff
 *
 */

//=============================================================================
// Main
//=============================================================================

(function(exports) {
    'use strict';

// const Params = {};

{
    
    var parameters = PluginManager.parameters('TouchInput');
    
    var paramCancelEnabled = !!eval(parameters['Cancel Enabled?']);
//    var paramLongPressTime = Number(parameters['Long Press Time'] || 15);
    var paramDoubleTapInterval = Number(parameters['Double Tap Interval'] || 30);
    var paramCursorSeAlways = !!eval(parameters['Cursor SE Always?']);
    var paramScrollWarp = !!eval(parameters['Scroll Warp?']);
    let param = JSON.parse(parameters['Scroll Warp SE']);
    var paramScrollWarpSE = {
        name:param.Name || "",
        volume:Number(param.Volume || 90),
        pitch:Number(param.Pitch || 100),
        pan:Number(param.Pan || 0)
    };
    var paramSmoothScroll = false // !!eval(parameters['Smooth Scroll?'] || "true");
    var paramSelectType = Number(parameters['Select Type Default'] || 1);
    var paramOkType = Number(parameters['Ok Type Default'] || 1);
    var paramOutsideTapAction = Number(parameters['Outside Tap Default'] || 0);
    
    // === Command ===
    var paramPluginCommands = JSON.parse(parameters['Plugin Commands']);
    
}

const Method = {};

//=============================================================================
// Main
//=============================================================================

//-----------------------------------------------------------------------------
// Window

//6718
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

//6804
var _Window_updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
    _Window_updateCursor.call(this);
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

//-----------------------------------------------------------------------------
// TouchInput

//3487
var _TouchInput_clear = TouchInput.clear;
TouchInput.clear = function() {
    _TouchInput_clear.call(this);
    this._startX = 0;
    this._startY = 0;
    this._leftSwipe = false;
    this._rightSwipe = false;
    this._ok = false;
    this._doubleTap = false;
    this._interval = -1;
};

//3515
var _TouchInput_update = TouchInput.update;
TouchInput.update = function() {
    _TouchInput_update.call(this);
    if (this.isReleased()) {
        if (this._pressedTime >= 6) {
            var sx = (this._x - this._startX) / this._pressedTime;
            this._leftSwipe = sx < -6;
            this._rightSwipe = sx > 6;
        } else {
            this._leftSwipe = false;
            this._rightSwipe = false;
        }
/*
        if (!this._leftSwipe && !this._rightSwipe &&
                this._pressedTime <= paramLongPressTime) {
*/
            this._ok = true;
            var i = this._interval;
            this._doubleTap = (i >= 0 && i < paramDoubleTapInterval);
            this._interval = 0;
/*
        } else {
            this._ok = false;
            this._doubleTap = false;
            this._interval = -1;
        }
*/
    } else {
        this._leftSwipe = false;
        this._rightSwipe = false;
        this._ok = false;
        this._doubleTap = false;
        if (this._interval >= 0) this._interval++;
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
    return this._doubleTap;
};

//3763
var _TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    if (paramSelectType === 0) {
        _TouchInput_onMouseMove.apply(this, arguments);
    } else {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._onMove(x, y);
            this._date = Date.now();
        }
    }
};

//3891
var _TouchInput_onTrigger = TouchInput._onTrigger;
TouchInput._onTrigger = function(x, y) {
    _TouchInput_onTrigger.apply(this, arguments);;
    this._startX = x;
    this._startY = y;
};

TouchInput.clearInterval = function() {
    this._interval = -1;
};

//-----------------------------------------------------------------------------
// SoundManager

//37
var _SoundManager_playCancel = SoundManager.playCancel;
SoundManager.playCancel = function() {
    if (!$gameMessage.cancelOff) _SoundManager_playCancel.call(this);
};

//-----------------------------------------------------------------------------
// Game_Message

//15
var _Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    _Game_Message_clear.call(this);
    this.cancelOff = false;
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//1739
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    switch (command) {
        case paramPluginCommands.CancelOff:
        case 'CancelOff':
            $gameMessage.cancelOff = true;
    }
};

//-----------------------------------------------------------------------------
// Window_Selectable

//13
var _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(x, y, width, height) {
    _Window_Selectable_initialize.apply(this, arguments);
    this._originYSpeed = [];
    this._scrollOyDuration = 0;
    this._targetOy = 0;
    this._cursorMoveDuration = 0;
    this._cursorX = -1;
    this._cursorY = -1;
    this._targetCursorX = -1;
    this._targetCursorY = -1;
};

//
if (Window_Selectable.prototype.hasOwnProperty('contentsHeight')) {
    var _Window_Selectable_contentsHeight = Window_Selectable.prototype.contentsHeight;
}
Window_Selectable.prototype.contentsHeight = function() {
    if (_Window_Selectable_contentsHeight) {
        return _Window_Selectable_contentsHeight.call(this) + this.itemHeight();
    } else {
        return Window_Base.prototype.contentsHeight.call(this) + this.itemHeight();
    }
};

//110
var _Window_Selectable_setTopRow = Window_Selectable.prototype.setTopRow;
Window_Selectable.prototype.setTopRow = function(row) {
    if (this.isSmoothScroll()) {
        this.startScrollOy(row * this.itemHeight());
    } else {
        _Window_Selectable_setTopRow.apply(this, arguments);
        this.resetOy();
    }
};

Window_Selectable.prototype.isSmoothScroll = function() {
    return (paramSmoothScroll && this.visible && this.isOpen());
};

Window_Selectable.prototype.isTouchFollowing = function() {
    return (TouchInput.date > Input.date && paramSelectType === 1);
};

Window_Selectable.prototype.skipSmoothScroll = function() {
    if (this._scrollOyDuration > 0) {
        this._scrollOyDuration = 0;
        this.gainOy(this._targetOy - this._scrollY - this.origin.y);
    }
    if (this._cursorMoveDuration > 0) {
        this._cursorMoveDuration = 0;
        this._cursorX = this._targetCursorX;
        this._cursorY = this._targetCursorY;
        this.refreshSmoothCursor();
    }
};

Window_Selectable.prototype.startScrollOy = function(oy) {
    this._scrollOyDuration = 6;
    this._targetOy = oy.clamp(0, this.maxTopRow() * this.itemHeight());
};

//119
var _Window_Selectable_resetScroll = Window_Selectable.prototype.resetScroll;
Window_Selectable.prototype.resetScroll = function() {
    _Window_Selectable_resetScroll.call(this);
    this.resetOy();
};

//140
Window_Selectable.prototype.setBottomRow = function(row) {
    var oy = (row + 1) * this.itemHeight() - this.height + this.padding * 2;
    if (this.isSmoothScroll()) {
        this.startScrollOy(oy);
    } else {
        this.setOy(oy - this._scrollY);
    }
};

Window_Selectable.prototype.resetOy = function() {
    this.origin.y = 0;
    this._originYSpeed = [];
    this._scrollOyDuration = 0;
};

Window_Selectable.prototype.setOy = function(oy) {
    var sr = Math.floor(oy / this.itemHeight());
    var topRow = this.topRow();
    if (sr !== 0) _Window_Selectable_setTopRow.call(this, topRow + sr);
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

//258
var _Window_Selectable_scrollDown = Window_Selectable.prototype.scrollDown;
Window_Selectable.prototype.scrollDown = function() {
    if (this.isSmoothScroll()) {
        this.setTopRow(this.targetTopRow() + 1);
    } else {
        _Window_Selectable_scrollDown.call(this);
        this.resetOy();
    }
};

//264
var _Window_Selectable_scrollUp = Window_Selectable.prototype.scrollUp;
Window_Selectable.prototype.scrollUp = function() {
    if (this.isSmoothScroll()) {
        if (this._scrollOyDuration === 0 && this.origin.y > 0) {
            this.setTopRow(this.topRow());
        } else {
            this.setTopRow(this.targetTopRow() - 1);
        }
    } else if (this.origin.y > 0) {
        this.resetOy();
    } else {
        _Window_Selectable_scrollUp.call(this);
        this.resetOy();
    }
};

Window_Selectable.prototype.targetTopRow = function() {
    if (this._scrollOyDuration > 0) {
        return Math.floor(this._targetOy / this.itemHeight());
    } else {
        return this.topRow();
    }
};

//270
var _Window_Selectable_update = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function() {
    _Window_Selectable_update.call(this);
    this.updateSmoothScroll();
    this.updateSmoothCursor();
};

//280
var _Window_Selectable_updateArrows = Window_Selectable.prototype.updateArrows;
Window_Selectable.prototype.updateArrows = function() {
    _Window_Selectable_updateArrows.call(this);
    var bottomY = this.maxRows() * this.itemHeight();
    var realY = this._scrollY + this.origin.y + this.height - this.padding * 2;
    this.downArrowVisible = this.downArrowVisible && bottomY > realY;
    this.upArrowVisible = (this.upArrowVisible || this.origin.y > 0);
};

//340
Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered()) {
            this._touching = true;
            this._selecting = true;
            this._touchLastY = TouchInput.y;
            this._touchInsided = this.isTouchedInsideFrame();
            this._touchWarpUp = false;
            this._touchWarpDown = false;
            if (paramScrollWarp && this._touchInsided &&
                    this.origin.y === 0 && this.maxRows() > this.maxPageRows()) {
                this._touchWarpUp = this.topRow() === 0;
                this._touchWarpDown = this.topRow() === this.maxTopRow();
            }
            this._originYSpeed = [];
        } else if (TouchInput.isCancelled()) {
            if (paramCancelEnabled && this.isCancelEnabled()) {
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
        this._touchWarpUp = false;
        this._touchWarpDown = false;
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
    if (this._touchWarpUp || this._touchWarpDown) {
        var height = this.itemHeight();
        if (TouchInput._startY - TouchInput.y < -height) {
            if (this._touchWarpUp) {
                AudioManager.playStaticSe(paramScrollWarpSE);
                this.setTopRow(this.maxTopRow());
                this._touching = false;
                this._originYSpeed = [];
                if (!this.isSmoothScroll()) this.resetOy();
            }
            this._touchWarpUp = false;
            this._touchWarpDown = false;
        } else if (TouchInput._startY - TouchInput.y > height) {
            if (this._touchWarpDown) {
                AudioManager.playStaticSe(paramScrollWarpSE);
                this.setTopRow(0);
                this._touching = false;
                this._originYSpeed = [];
                if (!this.isSmoothScroll()) this.resetOy();
            }
            this._touchWarpUp = false;
            this._touchWarpDown = false;
        }
    }
    if (this._touchInsided && this._originYSpeed.length > 0) {
        this.gainOy(this.originYSpeed());
    }
};

//368
var _Window_Selectable_onTouch = Window_Selectable.prototype.onTouch;
Window_Selectable.prototype.onTouch = function(triggered) {
    if (triggered) {
        if (paramOutsideTapAction === 1 && $gameParty.inBattle() && !this._touchInsided && !this.isTouchedInsideFrame()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        } else if (paramOkType < 2 || TouchInput.isDoubleTap()) {
            TouchInput.clearInterval();
            this._stayCount = 0;
            // --------------------------------------------------------
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
            // --------------------------------------------------------
        }
    } else {
        this._stayCount = 0;
        // --------------------------------------------------------
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
        // --------------------------------------------------------
        if (this.index() !== lastIndex) {
            TouchInput.clearInterval();
            if (paramOkType === 0) {
                this._selecting = false;
            }
            if (paramCursorSeAlways) {
                SoundManager.playCursor();
            }
        }
    }
};

//393
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

//494
var _Window_Selectable_updateCursor = Window_Selectable.prototype.updateCursor;
Window_Selectable.prototype.updateCursor = function() {
    _Window_Selectable_updateCursor.call(this);
    if (!this._cursorAll) {
        var rect = this.itemRect(this.index());
        this._targetCursorX = rect.x + this._scrollX;
        this._targetCursorY = rect.y + this._scrollY;
        if (this.isSmoothScroll() && this._cursorX >= 0 && this._cursorY >= 0 &&
                this.index() >= 0) {
            this._cursorMoveDuration = 6;
        } else {
            this._cursorX = this._targetCursorX;
            this._cursorY = this._targetCursorY;
        }
        this.refreshSmoothCursor();
    } else {
        this.resetOy();
    }
};

//507
Window_Selectable.prototype.isCursorVisible = function() {
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow() + 1;
};

Window_Selectable.prototype.updateSmoothScroll = function() {
    if (this._scrollOyDuration > 0) {
        var d = this._scrollOyDuration;
        var realOy = this._scrollY + this.origin.y;
        this.gainOy((this._targetOy - realOy) * d / Method.tri(d));
        this._scrollOyDuration--;
        if (this._scrollOyDuration === 0 && this.isTouchFollowing()) {
            this.onTouch(false);
        }
    }
};
Method.tri = function(n) {
    return n * (n + 1) / 2;
};

Window_Selectable.prototype.updateSmoothCursor = function() {
    if (this._cursorMoveDuration > 0) {
        var d = this._cursorMoveDuration;
        this._cursorX += (this._targetCursorX - this._cursorX) * d / Method.tri(d);
        this._cursorY += (this._targetCursorY - this._cursorY) * d / Method.tri(d);
        this._cursorMoveDuration--;
        this.refreshSmoothCursor();
    }
};

Window_Selectable.prototype.refreshSmoothCursor = function() {
    var rect = this.itemRect(this.index());
    var cy = this._cursorY - this._scrollY;
    var pageHeight = this.height - this.padding * 2;
    if (cy + rect.height >= 0 && cy < pageHeight + rect.height) {
        var cx = this._cursorX - this._scrollX;
        this.setCursorRect(cx, cy, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

//512
var _Window_Selectable_ensureCursorVisible = Window_Selectable.prototype.ensureCursorVisible;
Window_Selectable.prototype.ensureCursorVisible = function() {
    _Window_Selectable_ensureCursorVisible.call(this);
    if (this.row() === this.topRow()) {
        this.setTopRow(this.targetTopRow());
    }
};

//541
var _Window_Selectable_drawAllItems = Window_Selectable.prototype.drawAllItems;
Window_Selectable.prototype.drawAllItems = function() {
    _Window_Selectable_drawAllItems.call(this);
    var topIndex = this.topIndex() + this.maxPageItems();
    for (var i = 0; i < this.maxCols(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

//-----------------------------------------------------------------------------
// Window_ChoiceList

//99
var _Window_ChoiceList_contentsHeight = Window_ChoiceList.prototype.contentsHeight;
Window_ChoiceList.prototype.contentsHeight = function() {
    return _Window_ChoiceList_contentsHeight.call(this) + this.itemHeight();
};

//
if (Window_ChoiceList.prototype.hasOwnProperty('processCancel')) {
    var _Window_ChoiceList_processCancel = Window_ChoiceList.prototype.processCancel;
}
Window_ChoiceList.prototype.processCancel = function() {
    SoundManager.cancelOff = $gameMessage.cancelOff;
    if (_Window_ChoiceList_processCancel) {
        _Window_ChoiceList_processCancel.call(this);
    } else {
        Window_Command.prototype.processCancel.call(this);
    }
    SoundManager.cancelOff = false;
};

//-----------------------------------------------------------------------------
// Window_Status

Window_Status.prototype.isTouchedInsideFrame = function() {
    return false;
};

//-----------------------------------------------------------------------------
// Window_ShopStatus

//48
var _Window_ShopStatus_changePage = Window_ShopStatus.prototype.changePage;
Window_ShopStatus.prototype.changePage = function() {
    _Window_ShopStatus_changePage.call(this);
    Input.update();
    TouchInput.update();
};

//-----------------------------------------------------------------------------
// Scene_Base

//96
var _Scene_Base_start = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
    _Scene_Base_start.apply(this, arguments);
    if (this._windowLayer) {
        this._windowLayer.children.forEach(window => {
            if (typeof window.skipSmoothScroll === "function") {
                window.skipSmoothScroll();
            }
        });
    }
};




})(this);


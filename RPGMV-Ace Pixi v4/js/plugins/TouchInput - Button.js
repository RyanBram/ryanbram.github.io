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

(function() {
    'use strict';
    var pluginName = 'TouchInput';

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
    var getFileName = function(scriptElement) {
        var path = scriptElement.src;
        var filename = path.split('/').pop();
        return filename.split('.').shift();
    };

    // Use document.currentScript for getting recent script
    var currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    var currentFileName = getFileName(currentScript);

//-----------------------------------------------------------------------------

//=============================================================================
// Getting and Formatting Parameters
//=============================================================================

    // Inserting plugin file name as parameters
    var parameters = PluginManager.parameters(currentFileName);
    window.paramTouchUIEnabled = parameters['Use Touch UI'] === 'true';
    //.var parameters = PluginManager.parameters(pluginName);

    const Method = {};
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

// 3055
Input.clear = function() {
  this._currentState = {};
  this._previousState = {};
  this._gamepadStates = [];
  this._latestButton = null;
  this._pressedTime = 0;
  this._dir4 = 0;
  this._dir8 = 0;
  this._preferredAxis = '';
  this._date = 0;
  this._virtualButton = null;
};

/**
* Updates the input data.
*
* @static
* @method update
*/
// 3073
Input.update = function() {
  this._pollGamepads();
  if (this._currentState[this._latestButton]) {
      this._pressedTime++;
  } else {
      this._latestButton = null;
  }
  for (var name in this._currentState) {
      if (this._currentState[name] && !this._previousState[name]) {
          this._latestButton = name;
          this._pressedTime = 0;
          this._date = Date.now();
      }
      this._previousState[name] = this._currentState[name];
  }
  if (this._virtualButton) {
      this._latestButton = this._virtualButton;
      this._pressedTime = 0;
      this._virtualButton = null;
  }
  this._updateDirection();
};

// [NEW]
Input.virtualClick = function(buttonName) {
  this._virtualButton = buttonName;
};

/** [NEW] 
* The threshold number of pixels to treat as moved.
*
* @type number
*/
TouchInput.moveThreshold = 10;

// 3487
TouchInput.clear = function() {
  this._mousePressed = false;
  this._screenPressed = false;
  this._pressedTime = 0;
  this._clicked = false;
  // this._newState = this._createNewState(); // unused
  this._events = {};
  this._events.triggered = false;
  this._events.cancelled = false;
  this._events.moved = false;
  this._events.released = false;
  this._events.hovered = false;
  this._events.wheelX = 0;
  this._events.wheelY = 0;
  // this._currentState = this._createNewState(); // unused
  this._triggered = false;
  this._cancelled = false;
  this._moved = false;
  this._released = false;
  this._hovered = false;
  this._wheelX = 0;
  this._wheelY = 0;
  this._x = 0;
  this._y = 0;
  this._startX = 0;
  this._startY = 0;
  this._triggerX = 0;
  this._triggerY = 0;
  this._moved = false;
  this._leftSwipe = false;
  this._rightSwipe = false;
  this._ok = false;
  this._date = 0;
  this._interval = -1;
};

// 3515
TouchInput.update = function() {
  this._currentState = this._newState; // unused
  this._triggered = this._events.triggered;
  this._cancelled = this._events.cancelled;
  this._moved = this._events.moved;
  this._released = this._events.released;
  this._hovered = this._events.hovered;
  this._wheelX = this._events.wheelX;
  this._wheelY = this._events.wheelY;
  // this._newState = this._createNewState(); // unused
  this._events.triggered = false;
  this._events.cancelled = false;
  this._events.moved = false;
  this._events.released = false;
  this._events.hovered = false
  this._events.wheelX = 0;
  this._events.wheelY = 0;
  this._clicked = this._released && !this._moved;
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
      var i = this._interval;
      this._interval = 0;
    } else {
      this._leftSwipe = false;
      this._rightSwipe = false;
      this._ok = false;
      this._doubleTap = false;
      if (this._interval >= 0) this._interval++;
  }

  TouchInput.isLeftSwipe = function() {
    return this._leftSwipe;
  };

  TouchInput.isRightSwipe = function() {
    return this._rightSwipe;
  };

  TouchInput.isOk = function() {
    return this._ok;
  };
};

/** [NEW]
* Checks whether the mouse button or touchscreen has been pressed and
* released at the same position.
*
* @returns {boolean} True if the mouse button or touchscreen is clicked.
*/
TouchInput.isClicked = function() {
  return this._clicked;
};

/** [NEW]
* Checks whether the mouse is moved without pressing a button.
*
* @returns {boolean} True if the mouse is hovered.
*/
TouchInput.isHovered = function() {
  return this._hovered;
};

// 3763
TouchInput._onMouseMove = function(event) {
  var x = Graphics.pageToCanvasX(event.pageX);
  var y = Graphics.pageToCanvasY(event.pageY);
  if (Graphics.isInsideCanvas(x, y)) {
      this._onMove(x, y);
      this._date = Date.now();
  }
};

// 3891
TouchInput._onTrigger = function(x, y) {
  this._events.triggered = true;
  this._x = x;
  this._y = y;
  this._triggerX = x;
  this._triggerY = y;
  this._moved = false;
  this._date = Date.now();
  this._startX = x;
  this._startY = y;
};

// 3918
TouchInput._onMove = function(x, y) {
  const dx = Math.abs(x - this._triggerX);
  const dy = Math.abs(y - this._triggerY);
  if (dx > this.moveThreshold || dy > this.moveThreshold) {
      this._moved = true;
  }
  if (this._moved) {
      this._events.moved = true;
      this._x = x;
      this._y = y;
  }
};

// NEW
TouchInput._onHover = function(x, y) {
  this._events.hovered = true;
  this._x = x;
  this._y = y;
};

// NEW
TouchInput.clearInterval = function() {
  this._interval = -1;
};

// Window

//6724
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

//6810
var _Window_updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
  _Window_updateCursor.call(this);
  this._updateCursorPos();
};

// NEW
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

//===========================[ rpg_managers.js ]===============================

//-----------------------------------------------------------------------------
// SoundManager

// 1552
var _SoundManager_playCancel = SoundManager.playCancel;
SoundManager.playCancel = function() {
    if (!$gameMessage.cancelOff) _SoundManager_playCancel.call(this);
};


//-----------------------------------------------------------------------------

//===========================[ rpg_objects.js ]================================
//-----------------------------------------------------------------------------
// Game_Message

// 336
var _Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    _Game_Message_clear.call(this);
    this.cancelOff = false;
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//-----------------------------------------------------------------------------

//===========================[ rpg_scenes.js ]=================================

//100
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

// NEW
  window.Scene_Base.prototype.buttonY = function() {
    if (Graphics.height <= 729 && Graphics.width <= 972) {
        return 0 + 4;
    } else {
        return (Graphics.height - Graphics.boxHeight) / 2;
    }
  };

// NEW
  window.Scene_Base.prototype.menuButtonX = function() {
    if (Graphics.width < 1024) {
        return Graphics.width - 64 - 4;
    } else {
        return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (48/2);
    }
  };

// NEW
  window.Scene_Base.prototype.cancelButtonX = function() {
    if (Graphics.width < 1024) {
      return Graphics.width - 96 - 4;
    } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
    }
  };

// NEW
  window.Scene_Base.prototype.pageButtonX = function() {
    if (Graphics.width < 1024) {
      return 4;
    } else {
      return (Graphics.width-Graphics.boxWidth)/4 - (96/2);
    }
  };

    // 544
    Scene_Map.prototype.initialize = function() {
      Scene_Base.prototype.initialize.call(this);
      this._waitCount = 0;
      this._encounterEffectDuration = 0;
      this._mapLoaded = false;
      this._touchCount = 0;
      this._menuEnabled = false;
    };

    // 587
    Scene_Map.prototype.update = function() {
      this.updateDestination();
      this.updateMenuButton();
      this.updateMainMultiply();
      if (this.isSceneChangeOk()) {
          this.updateScene();
      } else if (SceneManager.isNextScene(Scene_Battle)) {
          this.updateEncounterEffect();
      }
      this.updateWaitCount();
      Scene_Base.prototype.update.call(this);
    };

    // 698
    Scene_Map.prototype.terminate = function() {
      Scene_Base.prototype.terminate.call(this);
      if (!SceneManager.isNextScene(Scene_Battle)) {
          this._spriteset.update();
          this._mapNameWindow.hide();
          this.hideMenuButton();
          SceneManager.snapForBackground();
      } else {
          ImageManager.clearRequest();
      }
  
      if (SceneManager.isNextScene(Scene_Map)) {
          ImageManager.clearRequest();
      }
  
      $gameScreen.clearZoom();
  
      this.removeChild(this._fadeSprite);
      this.removeChild(this._mapNameWindow);
      this.removeChild(this._windowLayer);
      this.removeChild(this._spriteset);
    };

    // 726
    var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
      _Scene_Map_createDisplayObjects.call(this);
      this.createButtons();
    };

    // NEW
    Scene_Map.prototype.createMenuButton = function() {
      this._menuButton = new Sprite_TouchButton("menu");
      this._menuButton.x = this.menuButtonX();
      this._menuButton.y = this.buttonY();
      this._menuButton.visible = false;
      this.addChild(this._menuButton);
    };

    // NEW
    Scene_Map.prototype.updateMenuButton = function() {
      if (this._menuButton) {
          const menuEnabled = this.isMenuEnabled();
          if (menuEnabled === this._menuEnabled) {
              this._menuButton.visible = this._menuEnabled;
          } else {
              this._menuEnabled = menuEnabled;
          }
      }
    };
  
    // NEW
    Scene_Map.prototype.hideMenuButton = function() {
      if (this._menuButton) {
          this._menuButton.visible = false;
          this._menuEnabled = false;
      }
    };

    // NEW
    Scene_Map.prototype.menuButtonX = function() {
      if (Graphics.width < 1024) {
          return Graphics.width - 64 - 4;
      } else {
          return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (48/2);
      }
    };
    
  // NEW ProcessMapTouch
    Scene_Map.prototype.inButtonArea = function(button) {
      if (button && button.width) {
          var x = button.x;
          var y = button.y;
          return TouchInput.x >= x && TouchInput.x < x + button.width &&
                 TouchInput.y >= y && TouchInput.y < y + button.height &&
                 +button.bitmap.getAlphaPixel(TouchInput.x - x, TouchInput.y - y) > 0;
      }
      return false;
  };
  
   // NEW ProcessMapTouch
  window.Scene_Map.prototype.inMenuButtonArea = function() {
      return this.inButtonArea(this._menuButton);
  };
  
   // NEW ProcessMapTouch
  window.Scene_Map.prototype.inCancelButtonArea = function() {
      return this.inButtonArea(this._cancelButton);
  };
  
   // NEW ProcessMapTouch
  window.Scene_Map.prototype.inPageButtonsArea = function() {
    return this.inButtonArea(this._pageupButton) || this.inButtonArea(this._pagedownButton);
  };
  
   // NEW ProcessMapTouch
  var _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
      if (this.inMenuButtonArea() || this.inCancelButtonArea() || this.inPageButtonsArea()) {
          // If the touch event is within any button area, return without processing the map touch
          return;
      }
      // If the touch event is not within any button area, process the map touch as usual
      _Scene_Map_processMapTouch.call(this);
  };
  
  // NEW
    Scene_Map.prototype.createButtons = function() {
      this.createMenuButton();
    };

    //-----------------------------------------------------------------------------
    // Scene_MenuBase
    //
  
    // 909
    var _Scene_MenuBase_create = Scene_MenuBase.prototype.create;
    Scene_MenuBase.prototype.create = function() {
      _Scene_MenuBase_create.call(this);
      this.createButtons();
    };
  
    // NEW
    Scene_MenuBase.prototype.update = function() {
      Scene_Base.prototype.update.call(this);
      this.updatePageButtons();
    };

    // NEW
    Scene_MenuBase.prototype.createButtons = function() {
      if (this.needsCancelButton()) {
        this.createCancelButton();
      }
      if (this.needsPageButtons()) {
        this.createPageButtons();
      }
    };
  
  // NEW
  Scene_MenuBase.prototype.needsCancelButton = function() {
      return true;
  };
  
  // NEW
  Scene_MenuBase.prototype.createCancelButton = function() {
    this._cancelButton = new Sprite_TouchButton("cancel");
    this._cancelButton.x = this.cancelButtonX();
    this._cancelButton.y = this.buttonY();
    this.addChild(this._cancelButton);
  };

  // NEW
  Scene_MenuBase.prototype.cancelButtonX = function() {
    if (Graphics.width < 1024) {
      return Graphics.width - 96 - 4;
    } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
    }
  };

  // NEW
  Scene_MenuBase.prototype.needsPageButtons = function() {
      return false;
  };
  
  // NEW
  Scene_MenuBase.prototype.createPageButtons = function() {
      this._pageupButton = new Sprite_TouchButton("pageup");
      this._pageupButton.x = this.pageButtonX();
      this._pageupButton.y = this.buttonY();
      const pageupRight = this._pageupButton.x + this._pageupButton.width;
      this._pagedownButton = new Sprite_TouchButton("pagedown");
      this._pagedownButton.x = pageupRight + 4;
      this._pagedownButton.y = this.buttonY();
      this.addChild(this._pageupButton);
      this.addChild(this._pagedownButton);
      this._pageupButton.setClickHandler(this.previousActor.bind(this));
      this._pagedownButton.setClickHandler(this.nextActor.bind(this));
  };

  // NEW
  Scene_MenuBase.prototype.pageButtonX = function() {
    if (Graphics.width < 1024) {
      return 4;
    } else {
      return (Graphics.width-Graphics.boxWidth)/4 - (96/2);
    }
  };
  
  // NEW
  Scene_MenuBase.prototype.updatePageButtons = function() {
      if (this._pageupButton && this._pagedownButton) {
          const enabled = this.arePageButtonsEnabled();
          this._pageupButton.visible = enabled;
          this._pagedownButton.visible = enabled;
      }
  };
  
  // NEW
  Scene_MenuBase.prototype.arePageButtonsEnabled = function() {
      return true;
  };

// 951
Scene_MenuBase.prototype.onActorChange = function() {
  SoundManager.playCursor();
};

// NEW 1092
Scene_ItemBase.prototype.isActorWindowActive = function() {
  return this._actorWindow && this._actorWindow.active;
};

// NEW
    Scene_Skill.prototype.needsPageButtons = function() {
      return true;
    };

    // NEW
    Scene_Skill.prototype.arePageButtonsEnabled = function() {
      return !this.isActorWindowActive();
    };

    Scene_Skill.prototype.onActorChange = function() {
      Scene_MenuBase.prototype.onActorChange.call(this);
      this.refreshActor();
      this._itemWindow.deselect();
      this._skillTypeWindow.activate();
    };

    // NEW
    Scene_Equip.prototype.needsPageButtons = function() {
      return true;
    };
    
    // NEW
    Scene_Equip.prototype.arePageButtonsEnabled = function() {
      return !(this._itemWindow && this._itemWindow.active);
    };
    
    // NEW
    Scene_Status.prototype.needsPageButtons = function() {
      return true;
    };
  
  Scene_Equip.prototype.onActorChange = function() {
      Scene_MenuBase.prototype.onActorChange.call(this);
      this.refreshActor();
      //this.hideItemWindow();
      this._slotWindow.deselect();
      this._slotWindow.deactivate();
      this._commandWindow.activate();
  };

  Scene_Status.prototype.onActorChange = function() {
    Scene_MenuBase.prototype.onActorChange.call(this);
    this.refreshActor();
    this._statusWindow.activate();
  };

//-----------------------------------------------------------------------------

//===========================[ rpg_sprites.js ]================================

// NEW
Sprite_Base.prototype.updateFrame = function() {
  const frame = this.isPressed() ? this._hotFrame : this._coldFrame;
  if (frame) {
    this.setFrame(frame.x, frame.y, frame.width, frame.height);
  }
};

// NEW
Sprite_Base.prototype.processTouch = function() { //OK2
  if (this.isClickEnabled()) {
      if (this.isBeingTouched()) {
          if (!this._hovered && TouchInput.isHovered()) {
              this._hovered = true;
              this.onMouseEnter();
          }
          if (TouchInput.isTriggered()) {
              this._pressed = true;
              this.onPress();
          }
      } else {
          if (this._hovered) {
              this.onMouseExit();
          }
          this._pressed = false;
          this._hovered = false;
      }
      if (this._pressed && TouchInput.isReleased()) {
          this._pressed = false;
          this.onClick();
      }
  } else {
      this._pressed = false;
      this._hovered = false;
  }
};

// NEW
Sprite_Base.prototype.isClickEnabled = function() {
  return this.worldVisible;
};

// NEW
Sprite_Base.prototype.isBeingTouched = function() {
  const touchPos = new Point(TouchInput.x, TouchInput.y);
  const localPos = this.worldTransform.applyInverse(touchPos);
  return this.hitTest(localPos.x, localPos.y);
};

// NEW
Sprite_Base.prototype.hitTest = function(x, y) {
  const rect = new Rectangle(
      -this.anchor.x * this.width,
      -this.anchor.y * this.height,
      this.width,
      this.height
  );
  return rect.contains(x, y);
};

// NEW
Sprite_Base.prototype.onMouseEnter = function() {
  //
};  

// NEW
Sprite_Base.prototype.onMouseExit = function() {
  //
};  

// NEW
Sprite_Base.prototype.onPress = function() {
  //
};  

// NEW
Sprite_Base.prototype.onClick = function() {
  //
};
//-----------------------------------------------------------------------------
  // Sprite_TouchButton // NEW
  //
  // The sprite for displaying touch buttons.

  function Sprite_TouchButton() {
    this.initialize.apply(this, arguments);
  }

  Sprite_TouchButton.prototype = Object.create(Sprite_Base.prototype);
  Sprite_TouchButton.prototype.constructor = Sprite_TouchButton;

  Sprite_TouchButton.prototype.initialize = function(buttonType) {
    Sprite.prototype.initialize.call(this);
    this._buttonType = buttonType;
    this._clickHandler = null;
    this._coldFrame = null;
    this._hotFrame = null;
    this.setupFrames();
  };

  Sprite_TouchButton.prototype.setupFrames = function() {
    const data = this.buttonData();
    const x = data.x * this.blockWidth();
    const width = data.w * this.blockWidth();
    const height = this.blockHeight();
    this.loadButtonImage();
    this.setColdFrame(x, 0, width, height);
    this.setHotFrame(x, height, width, height);
    this.updateFrame();
    this.updateOpacity();
  };

  Sprite_TouchButton.prototype.blockWidth = function() {
    return 48;
  };

  Sprite_TouchButton.prototype.blockHeight = function() {
    return 48;
  };

  Sprite_TouchButton.prototype.loadButtonImage = function() {
    this.bitmap = ImageManager.loadSystem("TouchButtonSet");
  };

  Sprite_TouchButton.prototype.buttonData = function() {
    const buttonTable = {
      cancel: { x: 0, w: 2 },
      pageup: { x: 2, w: 1 },
      pagedown: { x: 3, w: 1 },
      down: { x: 4, w: 1 },
      up: { x: 5, w: 1 },
      down2: { x: 6, w: 1 },
      up2: { x: 7, w: 1 },
      ok: { x: 8, w: 2 },
      menu: { x: 10, w: 1 }
    };
    return buttonTable[this._buttonType];
  };

  Sprite_TouchButton.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.checkBitmap();
    this.updateFrame();
    this.updateOpacity();
    this.processTouch();
  };

  Sprite_TouchButton.prototype.checkBitmap = function() {
    if (this.bitmap.isReady() && this.bitmap.width < this.blockWidth() * 11) {
        // Probably MV image is used
        throw new Error("ButtonSet image is too small");
    }
  };

  Sprite_TouchButton.prototype.updateOpacity = function() {
    this.opacity = this._pressed ? 255 : 192;
  };

  Sprite_TouchButton.prototype.setColdFrame = function(x, y, width, height) {
    this._coldFrame = new Rectangle(x, y, width, height);
  };

  Sprite_TouchButton.prototype.setHotFrame = function(x, y, width, height) {
    this._hotFrame = new Rectangle(x, y, width, height);
  };

  Sprite_TouchButton.prototype.setClickHandler = function(method) {
    this._clickHandler = method;
  };

  Sprite_TouchButton.prototype.callClickHandler = function() {
    if (this._clickHandler) {
        this._clickHandler();
    }
  };

  Sprite_TouchButton.prototype.onClick = function() {
    if (this._clickHandler) {
      this._clickHandler();
    } else {
      Input.virtualClick(this._buttonType);
    }
  };

  Sprite_TouchButton.prototype.isPressed = function() {
    return this._pressed;
  };

  // Make Sprite_TouchButton globally accessible
  window.Sprite_TouchButton = Sprite_TouchButton;
//-----------------------------------------------------------------------------

//===========================[ rpg_windows.js ]================================
Window_Base.prototype.playCursorSound = function() {
  SoundManager.playCursor();
};

Window_Base.prototype.playOkSound = function() {
  SoundManager.playOk();
};

Window_Base.prototype.playBuzzerSound = function() {
  SoundManager.playBuzzer();
};

// 723
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

// NEW
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

// 820
var _Window_Selectable_setTopRow = Window_Selectable.prototype.setTopRow;
Window_Selectable.prototype.setTopRow = function(row) {
    if (this.isSmoothScroll()) {
        this.startScrollOy(row * this.itemHeight());
    } else {
        _Window_Selectable_setTopRow.apply(this, arguments);
        this.resetOy();
    }
};

// NEW
Window_Selectable.prototype.isSmoothScroll = function() {
  return (this.visible && this.isOpen());
};

// NEW
Window_Selectable.prototype.isTouchFollowing = function() {
  return (TouchInput.date > Input.date);
};

// NEW
Window_Selectable.prototype.skipSmoothScroll = function() {
  if (this._scrollOyDuration > 0) {
      this._scrollOyDuration = 0;
      this.gainOy(this._targetOy - this._scrollY - this.origin.y);
  }
  if (this._cursorMoveDuration > 0) {
      this._cursorMoveDuration = 0;
      this._cursorX = this._targetCursorX;
      this._cursorY = this._targetCursorY;
  }
};

// NEW
Window_Selectable.prototype.startScrollOy = function(oy) {
  this._scrollOyDuration = 6;
  this._targetOy = oy.clamp(0, this.maxTopRow() * this.itemHeight());
};

// 829
var _Window_Selectable_resetScroll = Window_Selectable.prototype.resetScroll;
Window_Selectable.prototype.resetScroll = function() {
    _Window_Selectable_resetScroll.call(this);
    this.resetOy();
};

// 850
Window_Selectable.prototype.setBottomRow = function(row) {
    var oy = (row + 1) * this.itemHeight() - this.height + this.padding * 2;
    if (this.isSmoothScroll()) {
        this.startScrollOy(oy);
    } else {
        this.setOy(oy - this._scrollY);
    }
};

// NEW
Window_Selectable.prototype.resetOy = function() {
    this.origin.y = 0;
    this._originYSpeed = [];
    this._scrollOyDuration = 0;
};

// NEW
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

// NEW
Window_Selectable.prototype.gainOy = function(amount) {
    this.setOy(Math.floor(this.origin.y + amount));
};

// 968
var _Window_Selectable_scrollDown = Window_Selectable.prototype.scrollDown;
Window_Selectable.prototype.scrollDown = function() {
    if (this.isSmoothScroll()) {
        this.setTopRow(this.targetTopRow() + 1);
    } else {
        _Window_Selectable_scrollDown.call(this);
        this.resetOy();
    }
};

// 974
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

// NEW
Window_Selectable.prototype.targetTopRow = function() {
    if (this._scrollOyDuration > 0) {
        return Math.floor(this._targetOy / this.itemHeight());
    } else {
        return this.topRow();
    }
};

// 980
var _Window_Selectable_update = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function() {
    _Window_Selectable_update.call(this);
    this.updateSmoothScroll();
};

// 990
var _Window_Selectable_updateArrows = Window_Selectable.prototype.updateArrows;
Window_Selectable.prototype.updateArrows = function() {
    _Window_Selectable_updateArrows.call(this);
    var bottomY = this.maxRows() * this.itemHeight();
    var realY = this._scrollY + this.origin.y + this.height - this.padding * 2;
    this.downArrowVisible = this.downArrowVisible && bottomY > realY;
    this.upArrowVisible = (this.upArrowVisible || this.origin.y > 0);
};

    // Creating selectable background like RPG Maker MZ ---------------------------

    
        // 1251
        Window_Selectable.prototype.drawAllItems = function() {
            // function for selectable background
            var topIndex = this.topIndex();
            for (var i = 0; i <= this.maxPageItems(); i++) {
                var index = topIndex + i;
                if (index < this.maxItems()) {
                    this.drawItemBackground(index);
                    this.drawItem(index);
                }
            }
        };
        
        // NEW
        Window_Selectable.prototype.drawItemBackground = function(index) {
            var rect = this.itemRect(index);
            this.drawBackgroundRect(rect);
        };

        // NEW
        Window_Selectable.prototype.drawBackgroundRect = function(rect) {
            var c1 = 'ffffff';
            var c2 = '000000';
            var x = rect.x;
            var y = rect.y;
            var w = rect.width;
            var h = rect.height;
            this.contents.paintOpacity = 64;
            this.contents.fillRect(x+2, y+2, w-4, h-4, c1);
            this.contents.paintOpacity = 64;
            this.contents.fillRect(x+3, y+3, w-6, h-6, c2, c2, true);
            this.contents.paintOpacity = 255;
        };
/*
        // 85 - Larger Height (1/4)
        Window_Base.prototype.fittingHeight = function(numLines) {
          return numLines * (this.lineHeight()+12) + this.standardPadding() * 2; //
        };

        // 774 - Larger Height (2/4)
        Window_Selectable.prototype.itemHeight = function() {
          return this.lineHeight() + 12; //
        };

        // 868 - Larger Height (3/4)
        Window_Selectable.prototype.itemRectForText = function(index) {
          var rect = this.itemRect(index);
          rect.x += this.textPadding();
          rect.y += this.textPadding(); //
          rect.width -= this.textPadding() * 2;
          return rect;
        };

        //4284 - Larger Height (4/4)
        Window_Message.prototype.windowHeight = function() {
          return this.fittingHeight(this.numVisibleRows()) - (12 * this.numVisibleRows());
        };
*/
        // 1269
        var _Window_Selectable_redrawItem = Window_Selectable.prototype.redrawItem;
        Window_Selectable.prototype.redrawItem = function(index) {
            _Window_Selectable_redrawItem.call(this);
            if (index >= 0) {
                this.clearItem(index);
                this.drawItemBackground(index);
                this.drawItem(index);
            }
        };

        // 1738
        Window_MenuStatus.prototype.drawItem = function(index) {
            this.drawPendingItemBackground(index);
            this.drawItemImage(index);
            this.drawItemStatus(index);
        };
        
        // 1744
        Window_MenuStatus.prototype.drawPendingItemBackground = function(index) {
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
          if (this._touchInsided &&
                  this.origin.y === 0 && this.maxRows() > this.maxPageRows()) {
              this._touchWarpUp = this.topRow() === 0;
              this._touchWarpDown = this.topRow() === this.maxTopRow();
          }
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
      this._touchWarpUp = false;
      this._touchWarpDown = false;
  }
};

// NEW
Window_Selectable.prototype.addOriginYSpeed = function(speed) {
  this._originYSpeed.push(speed);
  if (this._originYSpeed.length > 3) {
      this._originYSpeed.shift();
  }
};

// NEW
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

// NEW
Window_Selectable.prototype.touchScroll = function() {
  if (this._touchInsided) {
      this.addOriginYSpeed(this._touchLastY - TouchInput.y);
      this._touchLastY = TouchInput.y;
      return (Math.abs(TouchInput.y - TouchInput._startY) > 12);
  }
  return false;
};

// NEW
Window_Selectable.prototype.touchSwipe = function() {
  if (TouchInput.isLeftSwipe()) {
      if (this.isHandled('pageup')) this.processPageup();
  } else if (TouchInput.isRightSwipe()) {
      if (this.isHandled('pagedown')) this.processPagedown();
  }
};

// NEW
Window_Selectable.prototype.updateTouchScroll = function() {
  if (this._touchWarpUp || this._touchWarpDown) {
      var height = this.itemHeight();
      if (TouchInput._startY - TouchInput.y < -height) {
          if (this._touchWarpUp) {
              this.playCursorSound();//AudioManager.playStaticSe(paramScrollWarpSE);
              this.setTopRow(this.maxTopRow());
              this._touching = false;
              this._originYSpeed = [];
              if (!this.isSmoothScroll()) this.resetOy();
          }
          this._touchWarpUp = false;
          this._touchWarpDown = false;
      } else if (TouchInput._startY - TouchInput.y > height) {
          if (this._touchWarpDown) {
              this.playCursorSound(); //AudioManager.playStaticSe(paramScrollWarpSE);
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

// 1078
var _Window_Selectable_onTouch = Window_Selectable.prototype.onTouch;
Window_Selectable.prototype.onTouch = function(triggered) {
  if (triggered) {
       // process cancel outside frame if in battle
      if ($gameParty.inBattle() && !this._touchInsided && !this.isTouchedInsideFrame()) {
          if (this.isCancelEnabled()) {
              this.processCancel();
          }
      } else {
          TouchInput.clearInterval();
          this._stayCount = 0;
          _Window_Selectable_onTouch.call(this, triggered); // OK
      }
  } else {
      this._stayCount = 0;
      // --------------------------------------------------------
      //_Window_Selectable_onTouch.call(this, triggered);
      // --------------------------------------------------------
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
};

// 1103
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

// 1204
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
  } else {
      this.resetOy();
  }
};

// 1217
Window_Selectable.prototype.isCursorVisible = function() {
  var row = this.row();
  return row >= this.topRow() && row <= this.bottomRow() + 1;
};

// NEW
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

// 1222
var _Window_Selectable_ensureCursorVisible = Window_Selectable.prototype.ensureCursorVisible;
Window_Selectable.prototype.ensureCursorVisible = function() {
  _Window_Selectable_ensureCursorVisible.call(this);
  if (this.row() === this.topRow()) {
      this.setTopRow(this.targetTopRow());
  }
};


// NEW
  Window_Selectable.prototype.onTouchSelect = function(trigger) {
    this._doubleTouch = false;
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        const hitIndex = this.hitIndex();
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                this._doubleTouch = true;
            }
            this.select(hitIndex);
        }
        if (trigger && this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
  };

  // NEW
  Window_Selectable.prototype.onTouchOk = function() {
    if (this.isTouchOkEnabled()) {
        const hitIndex = this.hitIndex();
        if (this._cursorFixed) {
            if (hitIndex === this.index()) {
                this.processOk();
            }
        } else if (hitIndex >= 0) {
            this.processOk();
        }
    }
};

// NEW
  Window_Selectable.prototype.onTouchCancel = function() {
      if (this.isCancelEnabled()) {
          this.processCancel();
      }
  };  

  // NEW
  Window_Selectable.prototype.hitIndex = function() {
      const touchPos = new Point(TouchInput.x, TouchInput.y);
      const localPos = this.worldTransform.applyInverse(touchPos);
      return this.hitTest(localPos.x, localPos.y);
  };  



//-----------------------------------------------------------------------------
// Window_ChoiceList

// 3911
var _Window_ChoiceList_contentsHeight = Window_ChoiceList.prototype.contentsHeight;
Window_ChoiceList.prototype.contentsHeight = function() {
    return _Window_ChoiceList_contentsHeight.call(this) + this.itemHeight();
};

// NEW
if (Window_ChoiceList.prototype.hasOwnProperty('processCancel')) {
    var _Window_ChoiceList_processCancel = Window_ChoiceList.prototype.processCancel;
}

// NEW
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

// NEW
Window_Status.prototype.isTouchedInsideFrame = function() {
    return false;
};

// 3082
Window_ShopNumber.prototype.createButtons = function() {
  this._buttons = [];
  if (paramTouchUIEnabled) {
      for (const type of ["down2", "down", "up", "up2", "ok"]) {
          const button = new Sprite_TouchButton(type);
          this._buttons.push(button);
          this.addChild(button);
      }
      this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
      this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
      this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
      this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
      this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
  }
};

// 3121
Window_ShopNumber.prototype.updateButtonsVisiblity = function() {
  if (paramTouchUIEnabled) {
      this.showButtons();
  } else {
      this.hideButtons();
  }
};

//-----------------------------------------------------------------------------
// Window_ShopStatus

3407
var _Window_ShopStatus_changePage = Window_ShopStatus.prototype.changePage;
Window_ShopStatus.prototype.changePage = function() {
    _Window_ShopStatus_changePage.call(this);
    Input.update();
    TouchInput.update();
};

//-----------------------------------------------------------------------------

// 4549
Window_NumberInput.prototype.createButtons = function() {
  this._buttons = [];
  if (paramTouchUIEnabled) {
      for (const type of ["down", "up", "ok"]) {
          const button = new Sprite_TouchButton(type);
          this._buttons.push(button);
          this.addChild(button);
      }
      this._buttons[0].setClickHandler(this.onButtonDown.bind(this));
      this._buttons[1].setClickHandler(this.onButtonUp.bind(this));
      this._buttons[2].setClickHandler(this.onButtonOk.bind(this));
  }
};


})();

/*
CREDITS
Raphael Lourenço - https://forums.rpgmakerweb.com/index.php?threads/trying-to-make-mz-style-window_selectable-for-mv.127788/

*/
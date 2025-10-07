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
    var pluginName = 'TouchUI';

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

/**
 * Clears all the input data.
 *
 * @static
 * @method clear
 */
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

Input.virtualClick = function(buttonName) {
  this._virtualButton = buttonName;
};

/**
* The threshold number of pixels to treat as moved.
*
* @type number
*/
TouchInput.moveThreshold = 10;

/**
* Clears all the touch data.
*
* @static
* @method clear
*/
TouchInput.clear = function() {
  this._mousePressed = false;
  this._screenPressed = false;
  this._pressedTime = 0;
  this._clicked = false;
  this._newState = this._createNewState(); // unused
  this._events = {};
  this._events.triggered = false;
  this._events.cancelled = false;
  this._events.moved = false;
  this._events.released = false;
  this._events.hovered = false;
  this._events.wheelX = 0;
  this._events.wheelY = 0;
  this._currentState = this._createNewState(); // unused
  this._triggered = false;
  this._cancelled = false;
  this._moved = false;
  this._released = false;
  this._hovered = false;
  this._wheelX = 0;
  this._wheelY = 0;
  this._x = 0;
  this._y = 0;
  this._triggerX = 0;
  this._triggerY = 0;
  this._moved = false;
  this._date = 0;
};

/**
* Updates the touch data.
*
* @static
* @method update
*/
TouchInput.update = function() {
this._currentState = this._newState; // unused
  this._triggered = this._events.triggered;
  this._cancelled = this._events.cancelled;
  this._moved = this._events.moved;
  this._released = this._events.released;
  this._hovered = this._events.hovered;
  this._wheelX = this._events.wheelX;
  this._wheelY = this._events.wheelY;
  this._newState = this._createNewState(); // unused
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
};

/**
* Checks whether the mouse button or touchscreen has been pressed and
* released at the same position.
*
* @returns {boolean} True if the mouse button or touchscreen is clicked.
*/
TouchInput.isClicked = function() {
  return this._clicked;
};

/**
* Checks whether the mouse is moved without pressing a button.
*
* @returns {boolean} True if the mouse is hovered.
*/
TouchInput.isHovered = function() {
  return this._hovered;
};

TouchInput._createNewState = function() {
  return {
      triggered: false,
      cancelled: false,
      moved: false,
      hovered: false,
      released: false,
      wheelX: 0,
      wheelY: 0
  };
};

/**
* @static
* @method _onMouseMove
* @param {MouseEvent} event
* @private
*/
TouchInput._onMouseMove = function(event) {
  const x = Graphics.pageToCanvasX(event.pageX);
  const y = Graphics.pageToCanvasY(event.pageY);
  if (this._mousePressed) {
      this._onMove(x, y);
  } else if (Graphics.isInsideCanvas(x, y)) {
      this._onHover(x, y);
  }
};

/**
* @static
* @method _onTrigger
* @param {Number} x
* @param {Number} y
* @private
*/
TouchInput._onTrigger = function(x, y) {
  this._events.triggered = true;
  this._x = x;
  this._y = y;
  this._triggerX = x;
  this._triggerY = y;
  this._moved = false;
  this._date = Date.now();
};

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

TouchInput._onHover = function(x, y) {
  this._events.hovered = true;
  this._x = x;
  this._y = y;
};
//-----------------------------------------------------------------------------

//===========================[ rpg_managers.js ]===============================

//-----------------------------------------------------------------------------

//===========================[ rpg_objects.js ]================================

//-----------------------------------------------------------------------------

//===========================[ rpg_scenes.js ]=================================

  window.Scene_Base.prototype.buttonY = function() {
    if (Graphics.height <= 729 && Graphics.width <= 972) {
        return 0 + 4;
    } else {
        return (Graphics.height - Graphics.boxHeight) / 2;
    }
  };

  window.Scene_Base.prototype.menuButtonX = function() {
    if (Graphics.width < 1024) {
        return Graphics.width - 64 - 4;
    } else {
        return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (48/2);
    }
  };

  window.Scene_Base.prototype.cancelButtonX = function() {
    if (Graphics.width < 1024) {
      return Graphics.width - 96 - 4;
    } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
    }
  };

  window.Scene_Base.prototype.pageButtonX = function() {
    if (Graphics.width < 1024) {
      return 4;
    } else {
      return (Graphics.width-Graphics.boxWidth)/4 - (96/2);
    }
  };

  // Scene_Map
  //
  if (paramTouchUIEnabled) {
    // 544
    Scene_Map.prototype.initialize = function() {
      Scene_Base.prototype.initialize.call(this);
      this._waitCount = 0;
      this._encounterEffectDuration = 0;
      this._mapLoaded = false;
      this._touchCount = 0;
      this._menuEnabled = false;
    };
    // 552
    var _Scene_Map_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
      _Scene_Map_create.call(this);
//      this.createMenuButton();
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

    Scene_Map.prototype.createMenuButton = function() {
      this._menuButton = new Sprite_TouchButton("menu");
      this._menuButton.x = this.menuButtonX();
      this._menuButton.y = this.buttonY();
      this._menuButton.visible = false;
      this.addChild(this._menuButton);
    };

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
  
    Scene_Map.prototype.hideMenuButton = function() {
      if (this._menuButton) {
          this._menuButton.visible = false;
          this._menuEnabled = false;
      }
    };

    Scene_Map.prototype.menuButtonX = function() {
      if (Graphics.width < 1024) {
          return Graphics.width - 64 - 4;
      } else {
          return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (48/2);
      }
    };
    
  //processMapTouch
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
  
  window.Scene_Map.prototype.inMenuButtonArea = function() {
      return this.inButtonArea(this._menuButton);
  };
  
  window.Scene_Map.prototype.inCancelButtonArea = function() {
      return this.inButtonArea(this._cancelButton);
  };
  
  window.Scene_Map.prototype.inPageButtonsArea = function() {
    return this.inButtonArea(this._pageupButton) || this.inButtonArea(this._pagedownButton);
  };
  
  var _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
      if (this.inMenuButtonArea() || this.inCancelButtonArea() || this.inPageButtonsArea()) {
          // If the touch event is within any button area, return without processing the map touch
          return;
      }
      // If the touch event is not within any button area, process the map touch as usual
      _Scene_Map_processMapTouch.call(this);
  };
  

    Scene_Map.prototype.createButtons = function() {
      this.createMenuButton();
    };

    //-----------------------------------------------------------------------------
    // Scene_MenuBase
    //
  
    var _Scene_MenuBase_create = Scene_MenuBase.prototype.create;
    Scene_MenuBase.prototype.create = function() {
      _Scene_MenuBase_create.call(this);
      this.createButtons();
    };
  
    Scene_MenuBase.prototype.createButtons = function() {
      if (this.needsCancelButton()) {
        this.createCancelButton();
      }
      if (this.needsPageButtons()) {
        this.createPageButtons();
      }
    };
  
  Scene_MenuBase.prototype.needsCancelButton = function() {
      return true;
  };
  
  Scene_MenuBase.prototype.createCancelButton = function() {
    this._cancelButton = new Sprite_TouchButton("cancel");
    // this._cancelButton = new Sprite();
    // this._cancelButton.bitmap = ImageManager.loadSystem(paramBackButtonImage);
    this._cancelButton.x = this.cancelButtonX();
    this._cancelButton.y = this.buttonY();
    this.addChild(this._cancelButton);
  };


  Scene_MenuBase.prototype.cancelButtonX = function() {
    if (Graphics.width < 1024) {
      return Graphics.width - 96 - 4;
    } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
    }
  };

  Scene_MenuBase.prototype.needsPageButtons = function() {
      return false;
  };
  
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
  
  Scene_MenuBase.prototype.pageButtonX = function() {
    if (Graphics.width < 1024) {
      return 4;
    } else {
      return (Graphics.width-Graphics.boxWidth)/4 - (96/2);
    }
  };

  Scene_MenuBase.prototype.updatePageButtons = function() {
      if (this._pageupButton && this._pagedownButton) {
          const enabled = this.arePageButtonsEnabled();
          this._pageupButton.visible = enabled;
          this._pagedownButton.visible = enabled;
      }
  };
  
  Scene_MenuBase.prototype.arePageButtonsEnabled = function() {
      return true;
  };

  Scene_Skill.prototype.needsPageButtons = function() {
      return true;
    };

    Scene_Skill.prototype.arePageButtonsEnabled = function() {
      return !this.isActorWindowActive();
    };

    Scene_Equip.prototype.needsPageButtons = function() {
      return true;
    };
  
    Scene_Equip.prototype.arePageButtonsEnabled = function() {
      return !(this._itemWindow && this._itemWindow.active);
    };
  
    Scene_Status.prototype.needsPageButtons = function() {
      return true;
    };
  }

//-----------------------------------------------------------------------------

//===========================[ rpg_sprites.js ]================================
Sprite_Base.prototype.updateFrame = function() {
  const frame = this.isPressed() ? this._hotFrame : this._coldFrame;
  if (frame) {
    this.setFrame(frame.x, frame.y, frame.width, frame.height);
  }
};

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

Sprite_Base.prototype.isClickEnabled = function() {
  return this.worldVisible;
};

Sprite_Base.prototype.isBeingTouched = function() {
  const touchPos = new Point(TouchInput.x, TouchInput.y);
  const localPos = this.worldTransform.applyInverse(touchPos);
  return this.hitTest(localPos.x, localPos.y);
};

Sprite_Base.prototype.hitTest = function(x, y) {
  const rect = new Rectangle(
      -this.anchor.x * this.width,
      -this.anchor.y * this.height,
      this.width,
      this.height
  );
  return rect.contains(x, y);
};

Sprite_Base.prototype.onMouseEnter = function() {
  //
};  

Sprite_Base.prototype.onMouseExit = function() {
  //
};  

Sprite_Base.prototype.onPress = function() {
  //
};  

Sprite_Base.prototype.onClick = function() {
  //
};
//-----------------------------------------------------------------------------
  // Sprite_TouchButton
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
/*


  Sprite_TouchButton.prototype.isActive = function() {
    var node = this;
    while (node) {
      if (!node.visible) {
          return false;
      }
      node = node.parent;
    }
    return true;
  };

  Sprite_TouchButton.prototype.isButtonTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  };

  Sprite_TouchButton.prototype.canvasToLocalX = function(x) {
    var node = this;
    while (node) {
      x -= node.x;
      node = node.parent;
    }
    return x;
  };

  Sprite_TouchButton.prototype.canvasToLocalY = function(y) {
    var node = this;
    while (node) {
      y -= node.y;
      node = node.parent;
    }
    return y;
  };
*/
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
    // Creating selectable background like RPG Maker MZ ---------------------------

    if (paramTouchUIEnabled) {
        // 1251
        var _Window_Selectable_drawAllItems = Window_Selectable.prototype.drawAllItems;
        Window_Selectable.prototype.drawAllItems = function() {
            _Window_Selectable_drawAllItems.call(this);
            /*
            // function for touch UI
            var topIndex1 = this.topIndex() + this.maxPageItems();
            for (var i = 0; i < this.maxCols(); i++) {
              var index = topIndex1 + i;
              if (index < this.maxItems()) {
                  this.drawItem(index);
              }
            }
            */
            // function for selectable background
            var topIndex2 = this.topIndex();
            for (var i = 0; i <= this.maxPageItems(); i++) {
                var index = topIndex2 + i;
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

        // 3141
        var _Window_ShopNumber_refresh = Window_ShopNumber.prototype.refresh;
        Window_ShopNumber.prototype.refresh = function() {
            _Window_ShopNumber_refresh.call(this);
            Window_Selectable.prototype.refresh.call(this);
            this.drawItemBackground(0);
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

  // Modify the Window Process Touch function
  Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (this.isHoverEnabled() && TouchInput.isHovered()) {
            this.onTouchSelect(false);
        } else if (TouchInput.isTriggered()) {
            this.onTouchSelect(true);
        }
        if (TouchInput.isClicked()) {
            this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
  };

  Window_Selectable.prototype.isHoverEnabled = function() {
    return true;
  };

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

  Window_Selectable.prototype.onTouchCancel = function() {
      if (this.isCancelEnabled()) {
          this.processCancel();
      }
  };  

  Window_Selectable.prototype.hitIndex = function() {
      const touchPos = new Point(TouchInput.x, TouchInput.y);
      const localPos = this.worldTransform.applyInverse(touchPos);
      return this.hitTest(localPos.x, localPos.y);
  };  

    }
//-----------------------------------------------------------------------------

})();

/*
CREDITS
Raphael Lourenço - https://forums.rpgmakerweb.com/index.php?threads/trying-to-make-mz-style-window_selectable-for-mv.127788/

*/
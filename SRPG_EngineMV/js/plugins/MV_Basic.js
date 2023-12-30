//=============================================================================
// MV_Basic.js
// MIT License (C) 2023 RPG Maker MV Community
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version History:
// 2024/1/1 - [v1.0] Initial release
//=============================================================================

/*:
 * @plugindesc Basic plugin for updating RPG Maker MV
 * @author RPG Maker MV Community (MIT Licensed)
 *
 * @help
 * MV_Basic.js upgrades RPG Maker MV by adding several key features found in
 * RPG Maker MZ, blending the best of both worlds.
 *
 * Key Enhancements:
 * 1. Built-in Vorbis Decoder - Offers superior audio processing for richer
 *    sound quality.
 * 2. Separate Screen/UI Size Settings - Provides flexibility in screen and UI
 *    design for a more tailored gaming experience.
 * 3. Optimized Touch Support - Improves touch interactions, especially
 *    beneficial for mobile game players.
 * 4. Performance Improvements - Enhances game performance for smoother gameplay.
 * 5. Autosave Feature - Introduces an autosave option, adding convenience and
 *    reliability for players.
 *
 * This plugin aims to set a new base for new RPG Maker MV project,
 * incorporating the advanced features of RPG Maker MZ while retaining the
 * extensive plugin library of MV.
 *
 * Instructions:
 * - Place this plugin above other plugins in the plugin manager.
 * - Configure the plugin parameters as needed for your project.
 *
 * License:
 * - MIT License
 *
 *
 *
 * @param Rendering Mode
 * @type select
 * @option WebGL
 * @option Canvas
 * @option Auto
 * @desc The rendering mode (canvas/webgl/auto)
 * @default WebGL
 *
 * @param vorbisStreaming
 * @type boolean
 * @text Vorbis Streaming
 * @desc Toggle audio streaming by using only Vorbis format 
 * @default true
 *
 * @param audioMeasurement
 * @type boolean
 * @text Measure audio performance
 * @desc Toggle audio streaming measurement feature
 * @default false
 *
 * @param Screen Width
 * @type number
 * @desc The resolution of screen width (recommended: 1120 for 16:9)
 * @default 1120
 *
 * @param Screen Height
 * @type number
 * @desc The resolution of screen height (recommended 630 for 16:9)
 * @default 630 
 *
 * @param Keep Aspect Ratio
 * @type boolean
 * @desc Preserve aspect ratio
 * @default true
 *
 * @param UI Area Width
 * @type number
 * @desc If set, change window width to this value
 * @default 816
 *
 * @param UI Area Height
 * @type number
 * @desc If set, change window height to this value
 * @default 624
 *
 * @param Cursor Icon
 * @type select
 * @option Custom
 * @option Default
 * @option Pointer
 * @option Crosshair
 * @option Move
 * @option Text
 * @option Wait
 * @option Help
 * @desc The default mouse cursor shape.
 * @default Custom
 *
 * @param Use Touch UI
 * @desc Enable or disable TouchUI feature
 * @type boolean
 * @default true
 *
 * @param Set Actor Home X
 * @desc Initial setting of the formula for calculating the X coordinate to display the actor
 * @default Graphics.width - Math.round(Graphics.width/3.5) + index * 32
 *
 * @param Set Actor Home Y
 * @desc Initial setting of the calculation formula of the Y coordinate to display the actor
 * @default 280 + index * 48
 *
 * @param Always Dash
 * @type boolean
 * @desc The initial value whether the player always dashes (on/off)
 * @on ON
 * @off OFF
 * @default false
 *
 * @param Text Speed
 * @type number
 * @desc The text speed on "Show Text". The larger this parameter is, the slower text speed. (0: show all texts at once)
 * @default 1
 *
 * @param Auto Save File id
 * @type number
 * @desc The file number to auto save when "Transfer Player" (0: off)
 * @default 1
 *
 * @param Error Message
 * @type string
 * @desc The message when error occurred
 * @default Error occurred. Please ask to the creator of this game.
 *
 * param Show Error Detail
 * type boolean
 * desc Show where the error is caused and stack trace when error
 * default true
 *
 * param Enable Progress Bar
 * type boolean
 * desc Show progress bar when it takes a long time to load resources
 * default true
 *
 * @param Cache Limit
 * @type number
 * @desc The upper limit of images' cached size (MPixel)
 * @default 10
 *
 * @param Max Rendering FPS
 * @type number
 * @desc The maximum value of rendering frame per seconds (0: unlimited)
 * @default 0
 *
 * @param Fullscreen Option Text
 * @type string
 * @desc Command name for full screen option.
 * @default Full Screen
 *
 * @param Shutdown Text
 * @type string
 * @desc Command name for shutdown.
 * @default Exit
 *
 * param Show in Title Screen
 * default true
 * type boolean
 *
 * param Show in Game End
 * default true
 * type boolean
 *
 * param Erase Pointer
 * desc Temporarily erase the pointer with key or pad input. The pointer reappears when the mouse is moved.
 * type boolean
 * default true
 *
 * param When cursor outside frame
 * type select
 * option Nothing
 * option Cancel
 * option Ok
 * desc Select the action when touching outside the window frame.
 * default Nothing
 *
 */

function Scene_Terminate() {
    this.initialize.apply(this, arguments);
}

(function() {
    'use strict';
    var pluginName = 'MV_Basic';

    //=============================================================================
    // Local Function
    //  This function formats and checks plugin parameters and plugin command parameters.
    //=============================================================================

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
//    var parameters = PluginManager.parameters(currentFileName);
    var parameters = PluginManager.parameters(pluginName);
    // Variables to store parameters
    var cacheLimit = toNumber(parameters['Cache Limit'], 10);
    var screenWidthTo = toNumber(parameters['Screen Width'], 816);
    var screenHeightTo = toNumber(parameters['Screen Height'], 624);
    var keepAspect = parameters['Keep Aspect Ratio'] === 'true';
    var windowWidthTo = toNumber(parameters['UI Area Width'], 0);
    var windowHeightTo = toNumber(parameters['UI Area Height'], 0);
    var renderingMode = parameters['Rendering Mode'].toLowerCase();
    var alwaysDash = (parameters['Always Dash'] === 'true') ||(parameters['Always Dash'] === 'on');
    var textSpeed = toNumber(parameters['Text Speed'], 1);
    var actorHomeX = parameters['Set Actor Home X'];
    var actorHomeY = parameters['Set Actor Home Y'];
    var maxRenderingFps = toNumber(parameters['Max Rendering FPS'], 0);
    var autoSaveFileId = toNumber(parameters['Auto Save File id'], 0);
    var errorMessage = parameters['Error Message'];
    var showErrorDetail = true
//    var showErrorDetail = parameters['Show Error Detail'] === 'true';
//    var enableProgressBar = parameters['Enable Progress Bar'] === 'true';
    var enableProgressBar = true
    var touchUIEnabled = parameters['Use Touch UI'] === 'true';
    var fullScreenOptionText = parameters['Fullscreen Option Text'];
    var shutdownText = parameters['Shutdown Text'];
    var showinTitle = true
    var showinGameEnd = true
//    var showinTitle = parameters['Show in Title Screen'] === 'true';
//    var showinGameEnd = parameters['Show in Game End'] === 'true';
    var cursorIcon = parameters['Cursor Icon'].toLowerCase();
    var erasePointer = true;
//    var erasePointer = parameters['Erase Pointer'] === 'true';
//    var actionOutsideFrame = parameters['When cursor outside frame'].toLowerCase();
    if(touchUIEnabled){var actionOutsideFrame = 'cancel'}

    //-----------------------------------------------------------------------------


    ImageCache.limit = cacheLimit * 1000 * 1000;

    //=============================================================================
    // Adjusting Screen and UI Area size
    //=============================================================================

    Graphics._defaultStretchMode = function() {
        return true;
    };
    
    var aspectRatio = window.innerWidth / window.innerHeight;

        
    var screenWidth;
    var screenHeight = screenHeightTo;
    
    if(keepAspect){
        screenWidth = screenWidthTo;
    } else {
        screenWidth = Math.round(screenHeight * aspectRatio);        
    }

    var windowWidth;
    var windowHeight;

    if(windowWidthTo){
        windowWidth = windowWidthTo;
    }else if(screenWidth !== SceneManager._screenWidth){
        windowWidth = screenWidth;
    }

    if(windowHeightTo){
        windowHeight = windowHeightTo;
    }else if(screenHeight !== SceneManager._screenHeight){
        windowHeight = screenHeight;
    }

    SceneManager._screenWidth = screenWidth;
    SceneManager._screenHeight = screenHeight;
    SceneManager._boxWidth = windowWidth;
    SceneManager._boxHeight = windowHeight;
    //=============================================================================
    // Adjusting actor position 
    //=============================================================================

    var _alias_Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        _alias_Sprite_Actor_setActorHome.call(this, index);
        var homeX = ($gameSystem).x ? ($gameSystem).x : actorHomeX; //actorHomeX
        var homeY = ($gameSystem).y ? ($gameSystem).y : actorHomeY; //actorHomeY
        this.setHome(eval(homeX), eval(homeY));
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Adjusting battleback 
    //=============================================================================

    // Sprite_Battleback -
    function Sprite_Battleback() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Battleback.prototype = Object.create(Sprite.prototype);
    Sprite_Battleback.prototype.constructor = Sprite_Battleback;

    Sprite_Battleback.prototype.initialize = function(bitmapName, type) {
      Sprite.prototype.initialize.call(this);
      this._bitmapName = bitmapName;
      this._battlebackType = type;
      this.createBitmap();
    };

    Sprite_Battleback.prototype.createBitmap = function() {
      if (this._bitmapName === '') {
        this.bitmap = new Bitmap(Graphics.width, Graphics.height);
      } else {
        if (this._battlebackType === 1) {
          this.bitmap = ImageManager.loadBattleback1(this._bitmapName);
        } else {
          this.bitmap = ImageManager.loadBattleback2(this._bitmapName);
        }
        this.scaleSprite();
      }
    };

    Sprite_Battleback.prototype.scaleSprite = function() {
      if (this.bitmap.width <= 0) return setTimeout(this.scaleSprite.bind(this), 5);
      var width = Graphics.width;
      var height = Graphics.height;
      if (this.bitmap.width < width) {
        this.scale.x = width / this.bitmap.width;
      }
      if (this.bitmap.height < height) {
        this.scale.y = height / this.bitmap.height;
      }
      this.anchor.x = 0.5;
      this.x = Graphics.width / 2;
      if ($gameSystem.isSideView()) {
        this.anchor.y = 1;
        this.y = Graphics.height;
      } else {
        this.anchor.y = 0.5;
        this.y = Graphics.height / 2;
      }
   };

    // Rewriting the battlebacks
    Spriteset_Battle.prototype.createBattleback = function() {
      this._back1Sprite = new Sprite_Battleback(this.battleback1Name(), 1);
      this._back2Sprite = new Sprite_Battleback(this.battleback2Name(), 2);
      this._battleField.addChild(this._back1Sprite);
      this._battleField.addChild(this._back2Sprite);
    };

    // No more updateBattleback
    Spriteset_Battle.prototype.updateBattleback = function() {
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Window_Selectable
    //  Overriding the original processing to rewrite specifications related to touch input.
    //  Creating selectable background like RPG Maker MZ
    //=============================================================================

    //Rewrite specifications related to touch input -------------------------------

    var _Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
    Window_Selectable.prototype.processTouch = function() {
        if (this.maxItems() === 0) {
            _Window_Selectable_processTouch.apply(this, arguments);
            return;
        }
        if (this.isOpenAndActive()) {
            var triggered = TouchInput.isTriggered();
            if ((TouchInput.isMoved() || triggered) && this.isTouchedInsideFrame()) {
                if (!triggered && this.isTouchedBorder()) {
                    return;
                }
                this.onTouch(triggered);
            } else if (TouchInput.isCancelled()) {
                if (this.isCancelEnabled()) this.processCancel();
            } else if (TouchInput.isTriggered()) {
                switch (actionOutsideFrame) {
                    case 'ok':
                        if (this.isOkEnabled()) this.processOk();
                        break;
                    case 'cancel':
                        if (this.isCancelEnabled()) this.processCancel();
                        break;
                    case 'nothing':
                        break;
                }
            }
        }
    };

    Window_Selectable.prototype.isTouchedBorder = function() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        if (y < this.padding) {
            return true;
        } else if (y >= this.height - this.padding) {
            return true;
        } else if (x < this.padding) {
            return true;
        } else if (x >= this.width - this.padding) {
            return true;
        } else {
            return false;
        }
    };

    var _Window_Selectable_onTouch      = Window_Selectable.prototype.onTouch;
    Window_Selectable.prototype.onTouch = function(triggered) {
        if (this.isCursorMovable()) {
            var x        = this.canvasToLocalX(TouchInput.x);
            var y        = this.canvasToLocalY(TouchInput.y);
            var hitIndex = this.hitTest(x, y);
            this.select(hitIndex);
        }
        _Window_Selectable_onTouch.apply(this, arguments);
    };
    //-----------------------------------------------------------------------------

    // Creating selectable background like RPG Maker MZ ---------------------------

    if (touchUIEnabled) {
        var _Window_Selectable_drawAllItems = Window_Selectable.prototype.drawAllItems;
        Window_Selectable.prototype.drawAllItems = function() {
            _Window_Selectable_drawAllItems.call(this);
            var topIndex = this.topIndex();
            for (var i = 0; i < this.maxPageItems(); i++) {
                var index = topIndex + i;
                if (index < this.maxItems()) {
                    this.drawItemBackground(index);
                    this.drawItem(index);
                }
            }
        };

        Window_Selectable.prototype.drawItemBackground = function(index) {
            var rect = this.itemRect(index);
            this.drawBackgroundRect(rect);
        };

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

        var _Window_Selectable_redrawItem = Window_Selectable.prototype.redrawItem;
        Window_Selectable.prototype.redrawItem = function(index) {
            _Window_Selectable_redrawItem.call(this);
            if (index >= 0) {
                this.clearItem(index);
                this.drawItemBackground(index);
        this.drawItem(index);
            }
        };

        var _Window_ShopNumber_refresh = Window_ShopNumber.prototype.refresh;
        Window_ShopNumber.prototype.refresh = function() {
            _Window_ShopNumber_refresh.call(this);
            Window_Selectable.prototype.refresh.call(this);
            this.drawItemBackground(0);
        };
    }
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Window_Message
    //  Adjusting text speed 
    //=============================================================================

    var _Window_Message_clearFlags = Window_Message.prototype.clearFlags;
    Window_Message.prototype.clearFlags = function(textState) {
        _Window_Message_clearFlags.apply(this, arguments);
        this._textSpeed = textSpeed - 1;
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Graphics
    //  Calls the private method "_requestFullScreen".
    //=============================================================================

    // Call the private graphics method "_requestFullScreen".
    Graphics.requestFullScreen = function() {
        if (!this._isFullScreenForPrevVersion()) {
            this._requestFullScreen();
        }
    };

    /**
     * @static
     * @method _isFullScreenForPrevVersion
     * @return {Boolean}
     * @private
     */
    Graphics._isFullScreenForPrevVersion = function() {
        return document.fullscreenElement ||
            document.mozFullScreen ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;
    };

    Graphics.requestFillScreen = function() {
        SceneManager._screenWidth = screenWidth;
        SceneManager._screenHeight = screenHeight;
        SceneManager._boxWidth = windowWidth;
        SceneManager._boxHeight = windowHeight;
    };
    //=============================================================================
    // TouchInput
    //  Overriding the original processing to always record the mouse position when the pointer is moved.
    //  Restores the pointer's display when the mouse pointer is moved
    //=============================================================================

    // Always record the mouse position -------------------------------------------
    TouchInput._onMouseMove = function(event) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._onMove(x, y);
    };
    //-----------------------------------------------------------------------------

    // Restores the pointer's display when the mouse pointer is moved -------------
    var _TouchInput__onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove      = function(event) {
        _TouchInput__onMouseMove.apply(this, arguments);
        if (erasePointer) Graphics.setHiddenPointer(false);
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // SceneManager
    //  Adjusting Window Size 
    //  Selecting video renderer
    //  Adjusting Rendering FPS
    //=============================================================================

    // Adjusting Window Size ------------------------------------------------------
    var _SceneManager_initNwjs = SceneManager.initNwjs;
    SceneManager.initNwjs = function() {
        _SceneManager_initNwjs.apply(this, arguments);

        if (Utils.isNwjs() && screenWidth && screenHeight) {
            var dw = screenWidth - window.innerWidth;
            var dh = screenHeight - window.innerHeight;
            window.moveBy(-dw / 2, -dh / 2);
            window.resizeBy(dw, dh);
        }
    };

    //-----------------------------------------------------------------------------

    // Selecting video renderer ---------------------------------------------------
    SceneManager.preferableRendererType = function() {
        if (Utils.isOptionValid('Canvas')) {
            return 'Canvas';
        } else if (Utils.isOptionValid('WebGL')) {
            return 'WebGL';
        } else if (renderingMode === 'Canvas') {
            return 'Canvas';
        } else if (renderingMode === 'WebGL') {
            return 'WebGL';
        } else {
            return 'Auto';
        }
    };
    //-----------------------------------------------------------------------------

    // Adjusting Rendering FPS ----------------------------------------------------

    if (maxRenderingFps) {
        var currentTime = Date.now();
        var deltaTime = 1000 / maxRenderingFps;
        var accumulator = 0;
        var _SceneManager_renderScene = SceneManager.renderScene;
        SceneManager.renderScene = function() {
            var newTime = Date.now();
            accumulator += newTime - currentTime;
            currentTime = newTime;
            if (accumulator >= deltaTime) {
                accumulator -= deltaTime;
                _SceneManager_renderScene.apply(this, arguments);
            }
        };
    }
    //-----------------------------------------------------------------------------

    // Apply the pointer's shape --------------------------------------------------

    var _SceneManager_updateScene = SceneManager.updateScene;
    SceneManager.updateScene      = function() {
        _SceneManager_updateScene.apply(this, arguments);
        if (this._scene) this.updateMousePointer();
    };

    SceneManager.updateMousePointer = function() {
        var result = cursorIcon;
        if (result) Graphics.setPointerType(result.toLowerCase());
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Input
    //  Hides the pointer with some input.
    //=============================================================================

    var _Input_update = Input.update;
    Input.update      = function() {
        var oldDate = this.date;
        _Input_update.apply(this, arguments);
        if (erasePointer && this.date !== oldDate) {
            Graphics.setHiddenPointer(true);
        }
    };

    //=============================================================================
    // Scene_Boot
    //  Add processing to start in full-screen mode.
    //=============================================================================

    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);
        if (ConfigManager.startUpFullScreen && !DataManager.isEventTest()) {
            Graphics.requestFullScreen();
//            Graphics.requestFillScreen();
        }
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Scene_Title
    //  Adjusting title background size to adapt screen size 
    //  Defines the shutdown processing in Scene_Title
    //=============================================================================

    // Adjusting title background -------------------------------------------------

    Scene_Title.prototype.createBackground = function() {
        this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
        this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
        this.centerSprite(this._backSprite1);
        this.centerSprite(this._backSprite2);
        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };

    Scene_Title.prototype.centerSprite = function(sprite) {
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        var scaleX = Graphics.width / sprite.bitmap.width;
        var scaleY = Graphics.height / sprite.bitmap.height;
        sprite.scale.x = Math.max(scaleX, scaleY);
        sprite.scale.y = Math.max(scaleX, scaleY);
    };
    //-----------------------------------------------------------------------------


    // Shutdown processing --------------------------------------------------------
    var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.apply(this, arguments);
        if (showinTitle) {
            this._commandWindow.setHandler('shutdown',  this.commandShutdown.bind(this));
        }
    };

    Scene_Title.prototype.commandShutdown = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        if (Utils.isMobileDevice()) {
            SceneManager.goto(Scene_Boot);
        } else {
            SceneManager.goto(Scene_Terminate);
        }
    };

    //=============================================================================
    // Scene_GameEnd
    //  Defines the shutdown processing in Scene_GameEnd
    //=============================================================================

    // Shutdown processing
    var _Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
    Scene_GameEnd.prototype.createCommandWindow = function() {
        _Scene_GameEnd_createCommandWindow.apply(this, arguments);
        if (showinGameEnd) {
            this._commandWindow.setHandler('shutdown',  this.commandShutdown.bind(this));
        }
    };

    Scene_GameEnd.prototype.commandShutdown = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Terminate);
    };

    //=============================================================================
    // Window_TitleCommand
    //  Adds the shutdown options.
    //=============================================================================

    // Window_TitleCommand
    var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
        if (showinTitle) {
            this.addCommand(shutdownText, 'shutdown');
        }
    };

    var _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.apply(this, arguments);
        if (showinTitle) {
            this.y += Math.floor(this.height / 8);
        }
    };

    //=============================================================================
    // Window_GameEnd
    //  Defines the "Shut Down" option to the option menu
    //=============================================================================

    var _Window_GameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
    Window_GameEnd.prototype.makeCommandList = function() {
        _Window_GameEnd_makeCommandList.apply(this, arguments);
        if (showinGameEnd && Utils.isNwjs()) {
            this.addCommand(shutdownText, 'shutdown');
            this._list.splice(1, 0, this._list.pop());
        }
    };

    var _Window_GameEnd_updatePlacement = Window_GameEnd.prototype.updatePlacement;
    Window_GameEnd.prototype.updatePlacement = function() {
        _Window_GameEnd_updatePlacement.apply(this, arguments);
        if (showinGameEnd) {
            this.y += Math.floor(this.height / 8);
        }
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Window_Option (position changed)
    //  Adds the "Full Screen" option to the option menu.
    //=============================================================================

    // Adding Fullscreen Option ---------------------------------------------------

    var _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.apply(this, arguments);
        console.log(fullScreenOptionText);
        if (Utils.isNwjs()){
            this.addCommand(fullScreenOptionText, 'startUpFullScreen');
        }
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // ConfigManager
    //  Finding the "Full Screen" option value
    //  Finding "Always Dash" option value
    //=============================================================================


    ConfigManager._startUpFullScreen = false;

    Object.defineProperty(ConfigManager, 'startUpFullScreen', {
        get: function() {
            return this._startUpFullScreen;
        },
        set: function(value) {
            if (this._startUpFullScreen === value) {
                return;
            }
            this._startUpFullScreen = value;
            if (value) {
                Graphics._requestFullScreen();
            } else {
                Graphics._cancelFullScreen();
            }
        }
    });

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        if (config['alwaysDash'] === undefined) {                            // manage dash
            this.alwaysDash = alwaysDash;
        }
        this.startUpFullScreen = this.readFlag(config, 'startUpFullScreen');  // manage fullscreen
    };

    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = _ConfigManager_makeData.apply(this, arguments);
        config.startUpFullScreen = this.startUpFullScreen;
        return config;
    };

    //-----------------------------------------------------------------------------

   //=============================================================================
   // Scene_Terminate
   //  Exits the game.
   //=============================================================================

    Scene_Terminate.prototype = Object.create(Scene_Base.prototype);
    Scene_Terminate.prototype.constructor = Scene_Terminate;

    Scene_Terminate.prototype.start = function() {
        SceneManager.terminate();
    };
    //-----------------------------------------------------------------------------

    //=============================================================================
    // Graphics
    //  Changes the shape of the pointer.
    //=============================================================================

    Graphics._PointerType   = 'auto';
    Graphics._hiddenPointer = false;

    Graphics.setHiddenPointer = function(value) {
        this._hiddenPointer = !!value;
        this.updateMousePointer();
    };


    // Set cursor icon -----------------------------------------------------------
    Graphics.setPointerType = function(type) {
        this._PointerType = null;
        this._setPointerTypeCustom();
        if (!this._PointerType) this._PointerType = type;
        this.updateMousePointer();
    };

    Graphics._setPointerTypeCustom = function() {
        if (cursorIcon === 'custom') {
            var cursorBase64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAuUlEQVR42u3WQQ6DIBQE0M9FuJoNJ+EkRE9apUYC8qltsTMunMSFLpinImhE5ClrjBBiMgAF8QI45ySEQEEkQAwDUQAYiOIVMJ5ENQfQCG0SQhEFYFxOHmBEBRAwogIMyzEBESpAgIgmAIVQ58A+/0Q0v4JWzka8XQeOcgaiuRJaaz8awHvfhVD3glieDfzteL8BtnSU9wOUctxuyChPgFjMKE8A5Ros1/grZpXnAEo57a5vwA24FGAGNqaHIRQDz/cAAAAASUVORK5CYII=';
            this._PointerType = `url(img/system/cursor.png), url('data:image/png;base64,${cursorBase64}'), default`;
        }
    };


    Graphics.updateMousePointer = function() {
        document.body.style.cursor = this._hiddenPointer ? 'none' : this._PointerType;
    };
   //-----------------------------------------------------------------------------

   //=============================================================================
   // Others
   //=============================================================================

    DataManager.setAutoSaveFileId(autoSaveFileId);
    Graphics.setErrorMessage(errorMessage);
    Graphics.setShowErrorDetail(showErrorDetail);
    Graphics.setProgressEnabled(enableProgressBar);

    //-----------------------------------------------------------------------------
})();

//===============================================================================================================================================
// ----------------------------------------------------------------------------------------------------------------------------------------------
// Vorbis Decoder -------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------
//===============================================================================================================================================

if (function() {
    'use strict';

    var pluginName = 'MV_Basic';

    //=============================================================================
    // Local Function
    //  This function formats and checks plugin parameters and plugin command parameters.
    //=============================================================================

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
    const parameters = PluginManager.parameters(currentFileName);
    const enabled = parameters['vorbisStreaming'] === 'true';
    const measured = parameters['audioMeasurement'] === 'true';
//    var deleteM4a = parameters['deleteM4A'] === 'true';

    //=============================================================================
    // Main feature start here
    //=============================================================================

    const isTest =
        location.search
            .slice(1)
            .split('&')
            .contains('test') ||
        (typeof window.nw !== 'undefined' &&
            nw.App.argv.length > 0 &&
            nw.App.argv[0].split('&').contains('test'));

    if (measured) {
        const div = document.createElement('div');
        div.style.backgroundColor = 'AliceBlue';
        div.style.position = 'fixed';
        div.style.left = 0;
        div.style.bottom = 0;
        document.body.appendChild(div);

        const updateInfo = info => {
            const decodeEndTime = Date.now();
            const content = `
                name: ${info.url.split('/').pop()}<br>
                mode: ${enabled ? 'streaming' : 'legacy'}<br>
                load time: ${info.loadEndTime - info.loadStartTime}ms<br>
                decode time: ${decodeEndTime - info.loadEndTime}ms<br>`;

            if (div.innerHTML !== content) div.innerHTML = content;
            div.style.zIndex = 11;
        };

        const _SceneManager_updateManagers = SceneManager.updateManagers;
        SceneManager.updateManagers = function() {
            const _WebAudio__load = WebAudio.prototype._load;
            WebAudio.prototype._load = function(url) {
                _WebAudio__load.apply(this, arguments);
                this._info = { url, loadStartTime: Date.now() };
                this.addLoadListener(() => updateInfo(this._info));
            };

            const _WebAudio__readLoopComments =
                WebAudio.prototype._readLoopComments;
            WebAudio.prototype._readLoopComments = function() {
                this._info.loadEndTime = this._info.loadEndTime || Date.now();
                _WebAudio__readLoopComments.apply(this, arguments);
            };

            SceneManager.updateManagers = _SceneManager_updateManagers;
            SceneManager.updateManagers.apply(this, arguments);
        };
    }

    return enabled;
}()) {


// PluginManager.loadScript('stbvorbis_stream.js');
// -------------------------------------------------------------------------------
var stbvorbis=typeof stbvorbis!=="undefined"?stbvorbis:{};(function(){function decodeWorker(){var Module=typeof Module!=="undefined"?Module:{};var useWasm=true;Module["wasmBinary"]=Uint8Array.from(atob("AGFzbQEAAAABpQEYYAJ/fwF/YAF/AGAAAX9gBH9/f38AYAAAYAN/f38Bf2ABfwF/YAJ/fwBgBn9/f39/fwF/YAR/f39/AX9gBX9/f39/AX9gB39/f39/f38Bf2AGf39/f39/AGAIf39/f39/f38Bf2AFf39/f38AYAd/f39/f39/AGADf39/AGABfwF9YAF9AX1gAnx/AXxgAnx/AX9gA3x8fwF8YAJ8fAF8YAF8AXwCngIPA2VudgZtZW1vcnkCAIACA2VudgV0YWJsZQFwAQQEA2Vudgl0YWJsZUJhc2UDfwADZW52DkRZTkFNSUNUT1BfUFRSA38AA2VudghTVEFDS1RPUAN/AANlbnYJU1RBQ0tfTUFYA38ABmdsb2JhbAhJbmZpbml0eQN8AANlbnYFYWJvcnQAAQNlbnYNZW5sYXJnZU1lbW9yeQACA2Vudg5nZXRUb3RhbE1lbW9yeQACA2VudhdhYm9ydE9uQ2Fubm90R3Jvd01lbW9yeQACA2Vudg5fX19hc3NlcnRfZmFpbAADA2VudgtfX19zZXRFcnJObwABA2VudgZfYWJvcnQABANlbnYWX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZwAFA3d2BgYCAQcHAQIBAQcBCAcFAAkGCQoHBgYGBgEFBgIBBgYKAAgLAAYGBgYGBgYBAAoMDAMGBQANCAoJAAwODA8OAQAGBgcEABAJEAERAAADBQwAAAMHBxIGAQAABwIFEwMOBw8HBgYQFAoVExYXFxcXFgQFBQYFAAYkB38BIwELfwEjAgt/ASMDC38BQQALfwFBAAt8ASMEC38BQQALB9MCFRBfX2dyb3dXYXNtTWVtb3J5AAgRX19fZXJybm9fbG9jYXRpb24AYwVfZnJlZQBfB19tYWxsb2MAXgdfbWVtY3B5AHkHX21lbXNldAB6BV9zYnJrAHsXX3N0Yl92b3JiaXNfanNfY2hhbm5lbHMAJhRfc3RiX3ZvcmJpc19qc19jbG9zZQAlFV9zdGJfdm9yYmlzX2pzX2RlY29kZQAoE19zdGJfdm9yYmlzX2pzX29wZW4AJBpfc3RiX3ZvcmJpc19qc19zYW1wbGVfcmF0ZQAnC2R5bkNhbGxfaWlpAHwTZXN0YWJsaXNoU3RhY2tTcGFjZQAMC2dldFRlbXBSZXQwAA8LcnVuUG9zdFNldHMAeAtzZXRUZW1wUmV0MAAOCHNldFRocmV3AA0Kc3RhY2tBbGxvYwAJDHN0YWNrUmVzdG9yZQALCXN0YWNrU2F2ZQAKCQoBACMACwR9VFl9Csb2A3YGACAAQAALGwEBfyMGIQEjBiAAaiQGIwZBD2pBcHEkBiABCwQAIwYLBgAgACQGCwoAIAAkBiABJAcLEAAjCEUEQCAAJAggASQJCwsGACAAJAsLBAAjCwsRACAABEAgABARIAAgABASCwvvBwEKfyAAQYADaiEHIAcoAgAhBQJAIAUEQCAAQfwBaiEEIAQoAgAhASABQQBKBEAgAEHwAGohCANAIAUgAkEYbGpBEGohCSAJKAIAIQEgAQRAIAgoAgAhAyAFIAJBGGxqQQ1qIQogCi0AACEGIAZB/wFxIQYgAyAGQbAQbGpBBGohAyADKAIAIQMgA0EASgRAQQAhAwNAIAEgA0ECdGohASABKAIAIQEgACABEBIgA0EBaiEDIAgoAgAhASAKLQAAIQYgBkH/AXEhBiABIAZBsBBsakEEaiEBIAEoAgAhBiAJKAIAIQEgAyAGSA0ACwsgACABEBILIAUgAkEYbGpBFGohASABKAIAIQEgACABEBIgAkEBaiECIAQoAgAhASACIAFODQMgBygCACEFDAAACwALCwsgAEHwAGohAyADKAIAIQEgAQRAIABB7ABqIQUgBSgCACECIAJBAEoEQEEAIQIDQAJAIAEgAkGwEGxqQQhqIQQgBCgCACEEIAAgBBASIAEgAkGwEGxqQRxqIQQgBCgCACEEIAAgBBASIAEgAkGwEGxqQSBqIQQgBCgCACEEIAAgBBASIAEgAkGwEGxqQaQQaiEEIAQoAgAhBCAAIAQQEiABIAJBsBBsakGoEGohASABKAIAIQEgAUUhBCABQXxqIQFBACABIAQbIQEgACABEBIgAkEBaiECIAUoAgAhASACIAFODQAgAygCACEBDAELCyADKAIAIQELIAAgARASCyAAQfgBaiEBIAEoAgAhASAAIAEQEiAHKAIAIQEgACABEBIgAEGIA2ohAyADKAIAIQEgAQRAIABBhANqIQUgBSgCACECIAJBAEoEQEEAIQIDQCABIAJBKGxqQQRqIQEgASgCACEBIAAgARASIAJBAWohAiAFKAIAIQcgAygCACEBIAIgB0gNAAsLIAAgARASCyAAQQRqIQIgAigCACEBIAFBAEoEQEEAIQEDQCAAQZQGaiABQQJ0aiEDIAMoAgAhAyAAIAMQEiAAQZQHaiABQQJ0aiEDIAMoAgAhAyAAIAMQEiAAQdgHaiABQQJ0aiEDIAMoAgAhAyAAIAMQEiABQQFqIQEgAigCACEDIAEgA0ghAyABQRBJIQUgBSADcQ0ACwtBACEBA0AgAEGgCGogAUECdGohAiACKAIAIQIgACACEBIgAEGoCGogAUECdGohAiACKAIAIQIgACACEBIgAEGwCGogAUECdGohAiACKAIAIQIgACACEBIgAEG4CGogAUECdGohAiACKAIAIQIgACACEBIgAEHACGogAUECdGohAiACKAIAIQIgACACEBIgAUEBaiEBIAFBAkcNAAsLGwAgAEHEAGohACAAKAIAIQAgAEUEQCABEF8LC3wBAX8gAEHUB2ohASABQQA2AgAgAEGAC2ohASABQQA2AgAgAEH4CmohASABQQA2AgAgAEGcCGohASABQQA2AgAgAEHVCmohASABQQA6AAAgAEH8CmohASABQQA2AgAgAEHUC2ohASABQQA2AgAgAEHYC2ohACAAQQA2AgAL8AQBB38jBiELIwZBEGokBiALQQhqIQcgC0EEaiEKIAshCCAAQSRqIQYgBiwAACEGAn8gBgR/IABBgAtqIQYgBigCACEGIAZBf0oEQCAFQQA2AgAgACABIAIQFgwCCyAAQRRqIQYgBiABNgIAIAEgAmohAiAAQRxqIQkgCSACNgIAIABB2ABqIQIgAkEANgIAIABBABAXIQkgCUUEQCAFQQA2AgBBAAwCCyAAIAcgCCAKEBghCSAJBEAgBygCACECIAgoAgAhCSAKKAIAIQggACACIAkgCBAaIQogByAKNgIAIABBBGohAiACKAIAIQggCEEASgRAQQAhAgNAIABBlAZqIAJBAnRqIQcgBygCACEHIAcgCUECdGohByAAQdQGaiACQQJ0aiEMIAwgBzYCACACQQFqIQIgAiAISA0ACwsgAwRAIAMgCDYCAAsgBSAKNgIAIABB1AZqIQAgBCAANgIAIAYoAgAhACAAIAFrDAILAkACQAJAAkACQCACKAIAIgNBIGsOBAECAgACCyACQQA2AgAgAEHUAGohAiAAEBkhAwJAIANBf0cEQANAIAIoAgAhAyADDQIgABAZIQMgA0F/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ACECIABBmAhqIQYgBigCACEHIAUgA2shCSAJIAdqIQkgAiAJSSEJIAIgB0khDSACIAdrIQJBACACIA0bIQIgAiADaiECIAIgBUohByAFIAIgBxshAiAJBEAgASACNgIAIAYoAgAhACAAIAJqIQAgBiAANgIAQQEMBgsLCyAAQfQKaiECIAIoAgAhAiADIB9rIQYgBiACaiEGIABBmAhqIQIgAiAGNgIAIAhBATYCAAwBBSAAQZgIaiECIAYNAQsMAQsgBCADayEDIAIoAgAhBCADIARqIQMgAiADNgIACyATKAIAIQIgAgRAIABByABqIQIgAigCACECIABB0ABqIQAgACgCACEAIAIgAEcEQEHTE0HEE0HkGkHnFBAECwsgASAFNgIAQQELIQAgHCQGIAALqAIBBX8gAEHoCmohBSAFKAIAIQICQCACQQBIBEBBACEABSACIAFIBEAgAUEYSgRAIABBGBAsIQIgAUFoaiEBIAAgARAsIQAgAEEYdCEAIAAgAmohACAADwsgAkUEQCAAQeQKaiECIAJBADYCAAsgAEHkCmohAwJAAkACQANAIAAQLiECIAJBf0YNASAFKAIAIQQgAiAEdCECIAMoAgAhBiAGIAJqIQIgAyACNgIAIAUgBEEIaiICNgIAIAIgAUgNAAwCAAsACyAFQX82AgBBACEADAQLIARBeEgEQEEAIQAMBAsLCyAAQeQKaiEEIAQoAgAhA0EBIAF0IQAgAEF/aiEAIAMgAHEhACADIAF2IQMgBCADNgIAIAIgAWshASAFIAE2AgALCyAAC40CAAJAIABBAEgEf0EABSAAQYCAAUgEQCAAQRBIBEAgAEGACGohACAALAAAIQAMAwsgAEGABEgEQCAAQQV2IQAgAEGACGohACAALAAAIQAgAEEFaiEABSAAQQp2IQAgAEGACGohACAALAAAIQAgAEEKaiEACwwCCyAAQYCAgAhIBH8gAEGAgCBIBH8gAEEPdiEAIABBgAhqIQAgACwAACEAIABBD2oFIABBFHYhACAAQYAIaiEAIAAsAAAhACAAQRRqCwUgAEGAgICAAkgEfyAAQRl2IQAgAEGACGohACAALAAAIQAgAEEZagUgAEEediEAIABBgAhqIQAgACwAACEAIABBHmoLCwshAAsgAAuiAQEDfyAAQdQKaiECIAIsAAAhAQJAAkAgAQ0AIABB3ApqIQEgASgCACEBIAEEQEF/IQMFIAAQLyEBIAEEQCACLAAAIQEgAQ0CQaEUQcQTQfYLQbUUEAQFQX8hAwsLDAELIAFBf2pBGHRBGHUhASACIAE6AAAgAEHsCmohASABKAIAIQIgAkEBaiECIAEgAjYCACAAEDAhACAAQf8BcSEDCyADC6wCAQd/IABB3ApqIQIgAigCACEBAkAgAUUEQCAAQdgKaiEEIAQoAgAhASABQX9GBEAgAEHQCGohASABKAIAIQEgAUF/aiEBIABB4ApqIQMgAyABNgIAIAAQMSEBIAFFBEAgAkEBNgIADAMLIABB0wpqIQEgASwAACEBIAFBAXEhASABBH8gBCgCAAUgAEEgEBUMAwshAQsgAUEBaiEHIAQgBzYCACAAQdQIaiABaiEDIAMsAAAhBiAGQf8BcSEDIAZBf0cEQCACQQE2AgAgAEHgCmohAiACIAE2AgALIABB0AhqIQEgASgCACEBIAcgAU4EQCAEQX82AgALIABB1ApqIQAgACwAACEBIAEEQEHFFEHEE0HoC0HaFBAEBSAAIAY6AAAgAyEFCwsLIAULUQEDfyAAQRRqIQMgAygCACEBIABBHGohAiACKAIAIQIgASACSQR/IAFBAWohACADIAA2AgAgASwAAAUgAEHUAGohACAAQQE2AgBBAAshACAACyABAX8gABAyIQEgAQR/IAAQMwUgAEEeEBVBAAshACAAC2ABAX8gABAwIQEgAUH/AXFBzwBGBEAgABAwIQEgAUH/AXFB5wBGBEAgABAwIQEgAUH/AXFB5wBGBEAgABAwIQAgAEH/AXFB0wBGIQAFQQAhAAsFQQAhAAsFQQAhAAsgAAvZAwEGfyAAEDAhAQJ/IAFB/wFxBH8gAEEfEBVBAAUgABAwIQEgAEHTCmohAiACIAE6AAAgABAjIQUgABAjIQIgABAjGiAAECMhASAAQcwIaiEDIAMgATYCACAAECMaIAAQMCEBIAFB/wFxIQEgAEHQCGohAyADIAE2AgAgAEHUCGohBCAAIAQgARAiIQEgAUUEQCAAQQoQFUEADAILIABB8ApqIQQgBEF+NgIAIAIgBXEhAQJAIAFBf0cEQCADKAIAIQEgAUEASgRAA0ACQCABQX9qIQIgAEHUCGogAmohBiAGLAAAIQYgBkF/Rw0AIAFBAUwNBCACIQEMAQsLIAQgAjYCACAAQfQKaiEBIAEgBTYCAAsLCyAAQdUKaiEBIAEsAAAhASABBEAgAygCACEDIANBAEoEf0EAIQJBACEBA0AgAEHUCGogAWohBCAELQAAIQQgBEH/AXEhBCACIARqIQIgAUEBaiEBIAEgA0gNAAsgAkEbagVBGwshASAAQShqIQIgAigCACECIAEgA2ohASABIAJqIQEgAEEsaiEDIAMgAjYCACAAQTBqIQIgAiABNgIAIABBNGohASABIAU2AgALIABB2ApqIQAgAEEANgIAQQELCyEAIAALowEBB38gAEHoCmohAyADKAIAIQECQCABQRlIBEAgAEHkCmohBCABRQRAIARBADYCAAsgAEHUCmohBSAAQdwKaiEGA0AgBigCACEBIAEEQCAFLAAAIQEgAUUNAwsgABAuIQIgAkF/Rg0CIAMoAgAhASACIAF0IQIgBCgCACEHIAcgAmohAiAEIAI2AgAgAUEIaiECIAMgAjYCACABQRFIDQALCwsLrQUBCX8gABA0IAFBIGohAiACKAIAIQUCQAJAIAVFIgNFDQAgAUGkEGohAiACKAIAIQIgAg0AQX8hAQwBCyABQQRqIQIgAigCACECAkACQCACQQhKBEAgAUGkEGohAyADKAIAIQMgAw0BBSADDQELDAELIABB5ApqIQggCCgCACEJIAkQOiEHIAFBrBBqIQIgAigCACECIAJBAUoEQCABQaQQaigCACEKQQAhAwNAIAJBAXYhBSAFIANqIQQgCiAEQQJ0aiEGIAYoAgAhBiAGIAdLIQYgAiAFayECIAMgBCAGGyEDIAUgAiAGGyECIAJBAUoNAAsFQQAhAwsgAUEXaiECIAIsAAAhAiACRQRAIAFBqBBqIQIgAigCACECIAIgA0ECdGohAiACKAIAIQMLIAFBCGohASABKAIAIQEgASADaiEBIAEtAAAhASABQf8BcSEBIABB6ApqIQIgAigCACEAIAAgAUgEf0EAIQBBfwUgACABayEAIAkgAXYhASAIIAE2AgAgAwshASACIAA2AgAMAQsgAUEXaiEDIAMsAAAhAyADBEBBgRVBxBNB6gxBjBUQBAsCQCACQQBKBEAgASgCCCEIIABB5ApqIQlBACEBA0ACQCAIIAFqIQMgAywAACEEIARB/wFxIQMgBEF/RwRAIAUgAUECdGoh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IwZBEGokBiACIQECfCAAvUIgiKdB/////wdxIgNB/MOk/wNJBHwgA0GewZryA0kEfEQAAAAAAADwPwUgAEQAAAAAAAAAABByCwUgACAAoSADQf//v/8HSw0BGgJAAkACQAJAIAAgARBuQQNxDgMAAQIDCyABKwMAIAErAwgQcgwECyABKwMAIAErAwhBARBwmgwDCyABKwMAIAErAwgQcpoMAgsgASsDACABKwMIQQEQcAsLIQAgAiQGIAALywEBA38jBiECIwZBEGokBiACIQECQCAAvUIgiKdB/////wdxIgNB/MOk/wNJBEAgA0GAgMDyA08EQCAARAAAAAAAAAAAQQAQcCEACwUgA0H//7//B0sEQCAAIAChIQAMAgsCQAJAAkACQAJAIAAgARBuQQNxDgMAAQIDCyABKwMAIAErAwhBARBwIQAMBQsgASsDACABKwMIEHIhAAwECyABKwMAIAErAwhBARBwmiEADAMLIAErAwAgASsDCBBymiEACwsLIAIkBiAAC5sDAwJ/AX4CfCAAvSIDQj+IpyEBAnwCfwJAIANCIIinQf////8HcSICQarGmIQESwR8IANC////////////AINCgICAgICAgPj/AFYEQCAADwsgAETvOfr+Qi6GQGQEQCAARAAAAAAAAOB/og8FIABE0rx63SsjhsBjIABEUTAt1RBJh8BjcUUNAkQAAAAAAAAAACIADwsABSACQcLc2P4DSwRAIAJBscXC/wNLDQIgAUEBcyABawwDCyACQYCAwPEDSwR8QQAhASAABSAARAAAAAAAAPA/oA8LCwwCCyAARP6CK2VHFfc/oiABQQN0QYATaisDAKCqCyEBIAAgAbciBEQAAOD+Qi7mP6KhIgAgBER2PHk17znqPaIiBaELIQQgACAEIAQgBCAEoiIAIAAgACAAIABE0KS+cmk3Zj6iRPFr0sVBvbu+oKJELN4lr2pWET+gokSTvb4WbMFmv6CiRD5VVVVVVcU/oKKhIgCiRAAAAAAAAABAIAChoyAFoaBEAAAAAAAA8D+gIQAgAUUEQCAADwsgACABEGULnwMDAn8BfgV8IAC9IgNCIIinIQECfyADQgBTIgIgAUGAgMAASXIEfyADQv///////////wCDQgBRBEBEAAAAAAAA8L8gACAAoqMPCyACRQRAIABEAAAAAAAAUEOi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mgDjqR0AXmGRAAgb5gCFmWUAoBRfAI1AaACA2P8AJ3NNAAYGMQDKVhUAyahzAHviYABrjMAAQcMSC11A+yH5PwAAAAAtRHQ+AAAAgJhG+DwAAABgUcx4OwAAAICDG/A5AAAAQCAlejgAAACAIoLjNgAAAAAd82k1AAAAAAAA4D8AAAAAAADgvwAAAAAAAPA/AAAAAAAA+D8AQagTCwgG0M9D6/1MPgBBuxMLigZAA7jiP09nZ1MuL3N0Yl92b3JiaXMuYwBmLT5hbGxvYy5hbGxvY19idWZmZXJfbGVuZ3RoX2luX2J5dGVzID09IGYtPnRlbXBfb2Zmc2V0AHZvcmJpc19kZWNvZGVfaW5pdGlhbABmLT5ieXRlc19pbl9zZWcgPiAwAGdldDhfcGFja2V0X3JhdwBmLT5ieXRlc19pbl9zZWcgPT0gMABuZXh0X3NlZ21lbnQAdm9yYmlzX2RlY29kZV9wYWNrZXRfcmVzdAAhYy0+c3BhcnNlAGNvZGVib29rX2RlY29kZV9zY2FsYXJfcmF3ACFjLT5zcGFyc2UgfHwgeiA8IGMtPnNvcnRlZF9lbnRyaWVzAGNvZGVib29rX2RlY29kZV9kZWludGVybGVhdmVfcmVwZWF0AHogPCBjLT5zb3J0ZWRfZW50cmllcwBjb2RlYm9va19kZWNvZGVfc3RhcnQAKG4gJiAzKSA9PSAwAGltZGN0X3N0ZXAzX2l0ZXIwX2xvb3AAMABnZXRfd2luZG93AGYtPnRlbXBfb2Zmc2V0ID09IGYtPmFsbG9jLmFsbG9jX2J1ZmZlcl9sZW5ndGhfaW5fYnl0ZXMAc3RhcnRfZGVjb2RlcgB2b3JiaXNjLT5zb3J0ZWRfZW50cmllcyA9PSAwAGNvbXB1dGVfY29kZXdvcmRzAHogPj0gMCAmJiB6IDwgMzIAbGVuW2ldID49IDAgJiYgbGVuW2ldIDwgMzIAYXZhaWxhYmxlW3ldID09IDAAayA9PSBjLT5zb3J0ZWRfZW50cmllcwBjb21wdXRlX3NvcnRlZF9odWZmbWFuAGMtPnNvcnRlZF9jb2Rld29yZHNbeF0gPT0gY29kZQBsZW4gIT0gTk9fQ09ERQBpbmNsdWRlX2luX3NvcnQAcG93KChmbG9hdCkgcisxLCBkaW0pID4gZW50cmllcwBsb29rdXAxX3ZhbHVlcwAoaW50KSBmbG9vcihwb3coKGZsb2F0KSByLCBkaW0pKSA8PSBlbnRyaWVzAOoPBG5hbWUB4g9+AAVhYm9ydAENZW5sYXJnZU1lbW9yeQIOZ2V0VG90YWxNZW1vcnkDF2Fib3J0T25DYW5ub3RHcm93TWVtb3J5BA5fX19hc3NlcnRfZmFpbAULX19fc2V0RXJyTm8GBl9hYm9ydAcWX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZwgQX19ncm93V2FzbU1lbW9yeQkKc3RhY2tBbGxvYwoJc3RhY2tTYXZlCwxzdGFja1Jlc3RvcmUME2VzdGFibGlzaFN0YWNrU3BhY2UNCHNldFRocmV3DgtzZXRUZW1wUmV0MA8LZ2V0VGVtcFJldDAQEV9zdGJfdm9yYmlzX2Nsb3NlEQ5fdm9yYmlzX2RlaW5pdBILX3NldHVwX2ZyZWUTGl9zdGJfdm9yYmlzX2ZsdXNoX3B1c2hkYXRhFCFfc3RiX3ZvcmJpc19kZWNvZGVfZnJhbWVfcHVzaGRhdGEVBl9lcnJvchYgX3ZvcmJpc19zZWFyY2hfZm9yX3BhZ2VfcHVzaGRhdGEXGF9pc193aG9sZV9wYWNrZXRfcHJlc2VudBgVX3ZvcmJpc19kZWNvZGVfcGFja2V0GQxfZ2V0OF9wYWNrZXQaFF92b3JiaXNfZmluaXNoX2ZyYW1lGxlfc3RiX3ZvcmJpc19vcGVuX3B1c2hkYXRhHAxfdm9yYmlzX2luaXQdDl9zdGFydF9kZWNvZGVyHg1fdm9yYmlzX2FsbG9jHxtfc3RiX3ZvcmJpc19nZXRfZmlsZV9vZmZzZXQgE19tYXliZV9zdGFydF9wYWNrZXQhDV9mbHVzaF9wYWNrZXQiBV9nZXRuIwZfZ2V0MzIkE19zdGJfdm9yYmlzX2pzX29wZW4lFF9zdGJfdm9yYmlzX2pzX2Nsb3NlJhdfc3RiX3ZvcmJpc19qc19jaGFubmVscycaX3N0Yl92b3JiaXNfanNfc2FtcGxlX3JhdGUoFV9zdGJfdm9yYmlzX2pzX2RlY29kZSkNX2NyYzMyX3VwZGF0ZSoWX3ZvcmJpc19kZWNvZGVfaW5pdGlhbCsaX3ZvcmJpc19kZWNvZGVfcGFja2V0X3Jlc3QsCV9nZXRfYml0cy0FX2lsb2cuEF9nZXQ4X3BhY2tldF9yYXcvDV9uZXh0X3NlZ21lbnQwBV9nZXQ4MQtfc3RhcnRfcGFnZTIQX2NhcHR1cmVfcGF0dGVybjMdX3N0YXJ0X3BhZ2Vfbm9fY2FwdHVyZXBhdHRlcm40DV9wcmVwX2h1ZmZtYW41G19jb2RlYm9va19kZWNvZGVfc2NhbGFyX3JhdzYOX3ByZWRpY3RfcG9pbnQ3D19kZWNvZGVfcmVzaWR1ZTgJX2RvX2Zsb29yOQ1faW52ZXJzZV9tZGN0OgxfYml0X3JldmVyc2U7EV9tYWtlX2Jsb2NrX2FycmF5PBJfc2V0dXBfdGVtcF9tYWxsb2M9JF9jb2RlYm9va19kZWNvZGVfZGVpbnRlcmxlYXZlX3JlcGVhdD4PX3Jlc2lkdWVfZGVjb2RlPxVfY29kZWJvb2tfZGVjb2RlX3N0ZXBAEF9jb2RlYm9va19kZWNvZGVBFl9jb2RlYm9va19kZWNvZGVfc3RhcnRCCl9kcmF3X2xpbmVDF19pbWRjdF9zdGVwM19pdGVyMF9sb29wRBlfaW1kY3Rfc3RlcDNfaW5uZXJfcl9sb29wRRlfaW1kY3Rfc3RlcDNfaW5uZXJfc19sb29wRh9faW1kY3Rfc3RlcDNfaW5uZXJfc19sb29wX2xkNjU0RwhfaXRlcl81NEgLX2dldF93aW5kb3dJEF92b3JiaXNfdmFsaWRhdGVKDV9zdGFydF9wYWNrZXRLBV9za2lwTAtfY3JjMzJfaW5pdE0NX3NldHVwX21hbGxvY04QX3NldHVwX3RlbXBfZnJlZU8SX2NvbXB1dGVfY29kZXdvcmRzUBdfY29tcHV0ZV9zb3J0ZWRfaHVmZm1hblEcX2NvbXB1dGVfYWNjZWxlcmF0ZWRfaHVmZm1hblIPX2Zsb2F0MzJfdW5wYWNrUw9fbG9va3VwMV92YWx1ZXNUDl9wb2ludF9jb21wYXJlVQpfbmVpZ2hib3JzVg9faW5pdF9ibG9ja3NpemVXCl9hZGRfZW50cnlYEF9pbmNsdWRlX2luX3NvcnRZD191aW50MzJfY29tcGFyZVoYX2NvbXB1dGVfdHdpZGRsZV9mYWN0b3JzWw9fY29tcHV0ZV93aW5kb3dcE19jb21wdXRlX2JpdHJldmVyc2VdB19zcXVhcmVeB19tYWxsb2NfBV9mcmVlYAhfcmVhbGxvY2ESX3RyeV9yZWFsbG9jX2NodW5rYg5fZGlzcG9zZV9jaHVua2MRX19fZXJybm9fbG9jYXRpb25kB19tZW1jbXBlB19zY2FsYm5mBl9xc29ydGcFX3NpZnRoBF9zaHJpCF90cmlua2xlagRfc2hsawVfcG50emwIX2FfY3R6X2xtBl9jeWNsZW4LX19fcmVtX3BpbzJvEV9fX3JlbV9waW8yX2xhcmdlcAZfX19zaW5xBl9sZGV4cHIGX19fY29zcwRfY29zdARfc2ludQRfZXhwdgRfbG9ndwRfcG93eAtydW5Qb3N0U2V0c3kHX21lbWNweXoHX21lbXNldHsFX3Nicmt8C2R5bkNhbGxfaWlpfQJiMA=="),function(c){return c.charCodeAt(0)});var Module=typeof Module!=="undefined"?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=function(status,toThrow){throw toThrow};Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){var ret;if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",function(reason,p){process["exit"](1)});Module["quit"]=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){Module["read"]=function shell_read(f){return read(f)}}Module["readBinary"]=function readBinary(f){var data;if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=function(status){quit(status)}}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WEB){if(document.currentScript){scriptDirectory=document.currentScript.src}}else{scriptDirectory=self.location.href}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.split("/").slice(0,-1).join("/")+"/"}else{scriptDirectory=""}Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)};Module["setWindowTitle"]=function(title){document.title=title}}else{}var out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);var err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var STACK_ALIGN=16;function staticAlloc(size){var ret=STATICTOP;STATICTOP=STATICTOP+size+15&-16;return ret}function dynamicAlloc(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=ret+size+15&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}function alignMemory(size,factor){if(!factor)factor=STACK_ALIGN;var ret=size=Math.ceil(size/factor)*factor;return ret}function getNativeTypeSize(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return 4}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;err(text)}}var asm2wasmImports={"f64-rem":function(x,y){return x%y},debugger:function(){debugger}};var jsCallStartIndex=1;var functionPointers=new Array(0);function addFunction(func,sig){var base=0;for(var i=base;i<base+0;i++){if(!functionPointers[i]){functionPointers[i]=func;return jsCallStartIndex+i}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}function removeFunction(index){functionPointers[index-jsCallStartIndex]=null}var funcWrappers={};function getFuncWrapper(func,sig){if(!func)return;assert(sig);if(!funcWrappers[sig]){funcWrappers[sig]={}}var sigCache=funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}function makeBigInt(low,high,unsigned){return unsigned?+(low>>>0)+ +(high>>>0)*4294967296:+(low>>>0)+ +(high|0)*4294967296}function dynCall(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}var Runtime={dynCall:dynCall};var GLOBAL_BASE=1024;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var globalScope=this;function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}var JSfuncs={stackSave:function(){stackSave()},stackRestore:function(){stackRestore()},arrayToC:function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret},stringToC:function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret}};var toC={string:JSfuncs["stringToC"],array:JSfuncs["arrayToC"]};function ccall(ident,returnType,argTypes,args,opts){function convertReturnValue(ret){if(returnType==="string")return Pointer_stringify(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);ret=convertReturnValue(ret);if(stack!==0)stackRestore(stack);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=1?tempDouble>0?(Math_min(+Math_floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for getValue: "+type)}return null}var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:staticAlloc,stackAlloc,staticAlloc,dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var stop;ptr=ret;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}function getMemory(size){if(!staticSealed)return staticAlloc(size);if(!runtimeInitialized)return dynamicAlloc(size);return _malloc(size)}function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return UTF8ToString(ptr)}function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF16ToString(ptr){var endPtr=ptr;var idx=endPtr>>1;while(HEAP16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder){return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr))}else{var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)return str;++i;str+=String.fromCharCode(codeUnit)}}}function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr}function lengthBytesUTF16(str){return str.length*2}function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}}function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len}function allocateUTF8(str){var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8Array(str,HEAP8,ret,size);return ret}function allocateUTF8OnStack(str){var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8Array(str,HEAP8,ret,size);return ret}function demangle(func){return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"})}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}var PAGE_SIZE=16384;var WASM_PAGE_SIZE=65536;var ASMJS_PAGE_SIZE=16777216;var MIN_TOTAL_MEMORY=16777216;function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBuffer(buf){Module["buffer"]=buffer=buf}function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}if(!Module["reallocBuffer"])Module["reallocBuffer"]=function(size){var ret;try{if(ArrayBuffer.transfer){ret=ArrayBuffer.transfer(buffer,size)}else{var oldHEAP8=HEAP8;ret=new ArrayBuffer(size);var temp=new Int8Array(ret);temp.set(oldHEAP8)}}catch(e){return false}var success=_emscripten_replace_memory(ret);if(!success)return false;return ret};function enlargeMemory(){var PAGE_MULTIPLE=Module["usingWasm"]?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE;var LIMIT=2147483648-PAGE_MULTIPLE;if(HEAP32[DYNAMICTOP_PTR>>2]>LIMIT){return false}var OLD_TOTAL_MEMORY=TOTAL_MEMORY;TOTAL_MEMORY=Math.max(TOTAL_MEMORY,MIN_TOTAL_MEMORY);while(TOTAL_MEMORY<HEAP32[DYNAMICTOP_PTR>>2]){if(TOTAL_MEMORY<=536870912){TOTAL_MEMORY=alignUp(2*TOTAL_MEMORY,PAGE_MULTIPLE)}else{TOTAL_MEMORY=Math.min(alignUp((3*TOTAL_MEMORY+2147483648)/4,PAGE_MULTIPLE),LIMIT)}}var replacement=Module["reallocBuffer"](TOTAL_MEMORY);if(!replacement||replacement.byteLength!=TOTAL_MEMORY){TOTAL_MEMORY=OLD_TOTAL_MEMORY;return false}updateGlobalBuffer(replacement);updateGlobalBufferViews();return true}var byteLength;try{byteLength=Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,"byteLength").get);byteLength(new ArrayBuffer(4))}catch(e){byteLength=function(buffer){return buffer.byteLength}}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function"){Module["wasmMemory"]=new WebAssembly.Memory({initial:TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=Module["wasmMemory"].buffer}else{buffer=new ArrayBuffer(TOTAL_MEMORY)}Module["buffer"]=buffer}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPreMain(cb){__ATMAIN__.unshift(cb)}function addOnExit(cb){__ATEXIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}function writeStringToMemory(string,buffer,dontAddNull){warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}function unSign(value,bits,ignore){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}function reSign(value,bits,ignore){if(value<=0){return value}var half=bits<=32?Math.abs(1<<bits-1):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value}return value}var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_max=Math.max;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}function integrateWasmJS(){var method="native-wasm";var wasmTextFile="main.wast";var wasmBinaryFile="main.wasm";var asmjsCodeFile="main.temp.asm.js";if(!isDataURI(wasmTextFile)){wasmTextFile=locateFile(wasmTextFile)}if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}if(!isDataURI(asmjsCodeFile)){asmjsCodeFile=locateFile(asmjsCodeFile)}var wasmPageSize=64*1024;var info={global:null,env:null,asm2wasm:asm2wasmImports,parent:Module};var exports=null;function mergeMemory(newBuffer){var oldBuffer=Module["buffer"];if(newBuffer.byteLength<oldBuffer.byteLength){err("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here")}var oldView=new Int8Array(oldBuffer);var newView=new Int8Array(newBuffer);newView.set(oldView);updateGlobalBuffer(newBuffer);updateGlobalBufferViews()}function fixImports(imports){return imports}function getBinary(){try{if(Module["wasmBinary"]){return new Uint8Array(Module["wasmBinary"])}if(Module["readBinary"]){return Module["readBinary"](wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!Module["wasmBinary"]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return new Promise(function(resolve,reject){resolve(getBinary())})}function doNativeWasm(global,env,providedBuffer){if(typeof WebAssembly!=="object"){err("no native wasm support detected");return false}if(!(Module["wasmMemory"]instanceof WebAssembly.Memory)){err("no native wasm Memory in use");return false}env["memory"]=Module["wasmMemory"];info["global"]={NaN:NaN,Infinity:Infinity};info["global.Math"]=Math;info["env"]=env;function receiveInstance(instance,module){exports=instance.exports;if(exports.memory)mergeMemory(exports.memory);Module["asm"]=exports;Module["usingWasm"]=true;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}function receiveInstantiatedSource(output){receiveInstance(output["instance"],output["module"])}function instantiateArrayBuffer(receiver){getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver).catch(function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}if(!Module["wasmBinary"]&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){WebAssembly.instantiateStreaming(fetch(wasmBinaryFile,{credentials:"same-origin"}),info).then(receiveInstantiatedSource).catch(function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)})}else{instantiateArrayBuffer(receiveInstantiatedSource)}return{}}Module["asmPreload"]=Module["asm"];var asmjsReallocBuffer=Module["reallocBuffer"];var wasmReallocBuffer=function(size){var PAGE_MULTIPLE=Module["usingWasm"]?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE;size=alignUp(size,PAGE_MULTIPLE);var old=Module["buffer"];var oldSize=old.byteLength;if(Module["usingWasm"]){try{var result=Module["wasmMemory"].grow((size-oldSize)/wasmPageSize);if(result!==(-1|0)){return Module["buffer"]=Module["wasmMemory"].buffer}else{return null}}catch(e){return null}}};Module["reallocBuffer"]=function(size){if(finalMethod==="asmjs"){return asmjsReallocBuffer(size)}else{return wasmReallocBuffer(size)}};var finalMethod="";Module["asm"]=function(global,env,providedBuffer){env=fixImports(env);if(!env["table"]){var TABLE_SIZE=Module["wasmTableSize"];if(TABLE_SIZE===undefined)TABLE_SIZE=1024;var MAX_TABLE_SIZE=Module["wasmMaxTableSize"];if(typeof WebAssembly==="object"&&typeof WebAssembly.Table==="function"){if(MAX_TABLE_SIZE!==undefined){env["table"]=new WebAssembly.Table({initial:TABLE_SIZE,maximum:MAX_TABLE_SIZE,element:"anyfunc"})}else{env["table"]=new WebAssembly.Table({initial:TABLE_SIZE,element:"anyfunc"})}}else{env["table"]=new Array(TABLE_SIZE)}Module["wasmTable"]=env["table"]}if(!env["memoryBase"]){env["memoryBase"]=Module["STATIC_BASE"]}if(!env["tableBase"]){env["tableBase"]=0}var exports;exports=doNativeWasm(global,env,providedBuffer);assert(exports,"no binaryen method succeeded.");return exports};var methodHandler=Module["asm"]}integrateWasmJS();var ASM_CONSTS=[];STATIC_BASE=GLOBAL_BASE;STATICTOP=STATIC_BASE+4816;__ATINIT__.push();var STATIC_BUMP=4816;Module["STATIC_BASE"]=STATIC_BASE;Module["STATIC_BUMP"]=STATIC_BUMP;var tempDoublePtr=STATICTOP;STATICTOP+=16;function copyTempFloat(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3]}function copyTempDouble(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];HEAP8[tempDoublePtr+4]=HEAP8[ptr+4];HEAP8[tempDoublePtr+5]=HEAP8[ptr+5];HEAP8[tempDoublePtr+6]=HEAP8[ptr+6];HEAP8[tempDoublePtr+7]=HEAP8[ptr+7]}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"])}function _abort(){Module["abort"]()}var _llvm_floor_f64=Math_floor;function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}DYNAMICTOP_PTR=staticAlloc(4);STACK_BASE=STACKTOP=alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;var ASSERTIONS=false;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["wasmTableSize"]=4;Module["wasmMaxTableSize"]=4;function invoke_iii(index,a1,a2){var sp=stackSave();try{return Module["dynCall_iii"](index,a1,a2)}catch(e){stackRestore(sp);if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}Module.asmGlobalArg={};Module.asmLibraryArg={abort:abort,assert:assert,enlargeMemory:enlargeMemory,getTotalMemory:getTotalMemory,abortOnCannotGrowMemory:abortOnCannotGrowMemory,invoke_iii:invoke_iii,___assert_fail:___assert_fail,___setErrNo:___setErrNo,_abort:_abort,_emscripten_memcpy_big:_emscripten_memcpy_big,_llvm_floor_f64:_llvm_floor_f64,DYNAMICTOP_PTR:DYNAMICTOP_PTR,tempDoublePtr:tempDoublePtr,ABORT:ABORT,STACKTOP:STACKTOP,STACK_MAX:STACK_MAX};var asm=Module["asm"](Module.asmGlobalArg,Module.asmLibraryArg,buffer);Module["asm"]=asm;var ___errno_location=Module["___errno_location"]=function(){return Module["asm"]["___errno_location"].apply(null,arguments)};var _emscripten_replace_memory=Module["_emscripten_replace_memory"]=function(){return Module["asm"]["_emscripten_replace_memory"].apply(null,arguments)};var _free=Module["_free"]=function(){return Module["asm"]["_free"].apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return Module["asm"]["_malloc"].apply(null,arguments)};var _memcpy=Module["_memcpy"]=function(){return Module["asm"]["_memcpy"].apply(null,arguments)};var _memset=Module["_memset"]=function(){return Module["asm"]["_memset"].apply(null,arguments)};var _sbrk=Module["_sbrk"]=function(){return Module["asm"]["_sbrk"].apply(null,arguments)};var _stb_vorbis_js_channels=Module["_stb_vorbis_js_channels"]=function(){return Module["asm"]["_stb_vorbis_js_channels"].apply(null,arguments)};var _stb_vorbis_js_close=Module["_stb_vorbis_js_close"]=function(){return Module["asm"]["_stb_vorbis_js_close"].apply(null,arguments)};var _stb_vorbis_js_decode=Module["_stb_vorbis_js_decode"]=function(){return Module["asm"]["_stb_vorbis_js_decode"].apply(null,arguments)};var _stb_vorbis_js_open=Module["_stb_vorbis_js_open"]=function(){return Module["asm"]["_stb_vorbis_js_open"].apply(null,arguments)};var _stb_vorbis_js_sample_rate=Module["_stb_vorbis_js_sample_rate"]=function(){return Module["asm"]["_stb_vorbis_js_sample_rate"].apply(null,arguments)};var establishStackSpace=Module["establishStackSpace"]=function(){return Module["asm"]["establishStackSpace"].apply(null,arguments)};var getTempRet0=Module["getTempRet0"]=function(){return Module["asm"]["getTempRet0"].apply(null,arguments)};var runPostSets=Module["runPostSets"]=function(){return Module["asm"]["runPostSets"].apply(null,arguments)};var setTempRet0=Module["setTempRet0"]=function(){return Module["asm"]["setTempRet0"].apply(null,arguments)};var setThrew=Module["setThrew"]=function(){return Module["asm"]["setThrew"].apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return Module["asm"]["stackAlloc"].apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return Module["asm"]["stackRestore"].apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return Module["asm"]["stackSave"].apply(null,arguments)};var dynCall_iii=Module["dynCall_iii"]=function(){return Module["asm"]["dynCall_iii"].apply(null,arguments)};Module["asm"]=asm;Module["ccall"]=ccall;Module["cwrap"]=cwrap;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};function run(args){args=args||Module["arguments"];if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]&&status===0){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}Module["quit"](status,new ExitStatus(status))}var abortDecorators=[];function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){out(what);err(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;run();(function(Module){var initializeP=new Promise(function(resolve){if(typeof useWasm!=="undefined"){Module.onRuntimeInitialized=function(){var fs={};fs.open=Module.cwrap("stb_vorbis_js_open","number",[]);fs.close=Module.cwrap("stb_vorbis_js_close","void",["number"]);fs.channels=Module.cwrap("stb_vorbis_js_channels","number",["number"]);fs.sampleRate=Module.cwrap("stb_vorbis_js_sample_rate","number",["number"]);fs.decode=Module.cwrap("stb_vorbis_js_decode","number",["number","number","number","number","number"]);resolve(fs)};return}var fs={};fs.open=Module["_stb_vorbis_js_open"];fs.close=Module["_stb_vorbis_js_close"];fs.channels=Module["_stb_vorbis_js_channels"];fs.sampleRate=Module["_stb_vorbis_js_sample_rate"];fs.decode=Module["_stb_vorbis_js_decode"];resolve(fs)});function arrayBufferToHeap(buffer,byteOffset,byteLength){var ptr=Module._malloc(byteLength);var heapBytes=new Uint8Array(Module.HEAPU8.buffer,ptr,byteLength);heapBytes.set(new Uint8Array(buffer,byteOffset,byteLength));return heapBytes}function ptrToInt32(ptr){var a=new Int32Array(Module.HEAPU8.buffer,ptr,1);return a[0]}function ptrToFloat32(ptr){var a=new Float32Array(Module.HEAPU8.buffer,ptr,1);return a[0]}function ptrToInt32s(ptr,length){var buf=new ArrayBuffer(length*Int32Array.BYTES_PER_ELEMENT);var copied=new Int32Array(buf);copied.set(new Int32Array(Module.HEAPU8.buffer,ptr,length));return copied}function ptrToFloat32s(ptr,length){var buf=new ArrayBuffer(length*Float32Array.BYTES_PER_ELEMENT);var copied=new Float32Array(buf);copied.set(new Float32Array(Module.HEAPU8.buffer,ptr,length));return copied}function concatArrays(arr1,arr2){if(!arr1){arr1=new ArrayBuffer}if(!arr2){arr2=new ArrayBuffer}var newArr=new Uint8Array(arr1.byteLength+arr2.byteLength);if(arr1 instanceof ArrayBuffer){newArr.set(new Uint8Array(arr1),0)}else if(arr1 instanceof Uint8Array){newArr.set(arr1,0)}else{throw"not reached"}if(arr2 instanceof ArrayBuffer){newArr.set(new Uint8Array(arr2),arr1.byteLength)}else if(arr2 instanceof Uint8Array){newArr.set(arr2,arr1.byteLength)}else{throw"not reached"}return newArr}var sessions={};self.addEventListener("message",function(event){initializeP.then(function(funcs){var statePtr=null;if(event.data.id in sessions){statePtr=sessions[event.data.id].state}else{statePtr=funcs.open();sessions[event.data.id]={state:statePtr,input:null}}sessions[event.data.id].input=concatArrays(sessions[event.data.id].input,event.data.buf);while(sessions[event.data.id].input.byteLength>0){var input=sessions[event.data.id].input;var copiedInput=null;var chunkLength=Math.min(65536,input.byteLength);if(input instanceof ArrayBuffer){copiedInput=arrayBufferToHeap(input,0,chunkLength)}else if(input instanceof Uint8Array){copiedInput=arrayBufferToHeap(input.buffer,input.byteOffset,chunkLength)}var outputPtr=Module._malloc(4);var readPtr=Module._malloc(4);var length=funcs.decode(statePtr,copiedInput.byteOffset,copiedInput.byteLength,outputPtr,readPtr);Module._free(copiedInput.byteOffset);var read=ptrToInt32(readPtr);Module._free(readPtr);sessions[event.data.id].input=input.slice(read);var result={id:event.data.id,data:null,sampleRate:0,eof:false,error:null};if(length<0){result.error="stbvorbis decode failed: "+length;postMessage(result);funcs.close(statePtr);delete sessions[event.data.id];Module._free(outputPtr);return}var channels=funcs.channels(statePtr);if(channels>0){var dataPtrs=ptrToInt32s(ptrToInt32(outputPtr),channels);result.data=new Array(dataPtrs.length);for(var i=0;i<dataPtrs.length;i++){result.data[i]=ptrToFloat32s(dataPtrs[i],length);Module._free(dataPtrs[i])}}Module._free(ptrToInt32(outputPtr));Module._free(outputPtr);if(read===0){break}if(result.sampleRate===0){result.sampleRate=funcs.sampleRate(statePtr)}postMessage(result,result.data.map(function(array){return array.buffer}))}if(event.data.eof){var len=sessions[event.data.id].input.length;if(len){console.warn("not all the input data was decoded. remaining: "+len+"[bytes]")}var result={id:event.data.id,data:null,sampleRate:0,eof:true,error:null};postMessage(result);funcs.close(statePtr);delete sessions[event.data.id]}})})})(Module)}function httpGet(url){return new Promise(function(resolve,reject){var xhr=new XMLHttpRequest;xhr.open("GET",url);xhr.addEventListener("load",function(){var status=xhr.status;if(status<200||status>=300){reject({status:status});return}resolve(xhr.response)});xhr.addEventListener("error",function(){reject({status:xhr.status})});xhr.send()})}var initializeWorkerP=new Promise(function(resolve,reject){if(typeof WebAssembly==="object"&&!(navigator.userAgent.match(/iPhone|iPad|iPod/) && navigator.userAgent.match(/AppleWebKit/))){var workerURL=URL.createObjectURL(new Blob(["("+decodeWorker.toString()+")();"],{type:"text/javascript"}));resolve(new Worker(workerURL));return}var scriptPath=document.currentScript.src;var directoryPath=scriptPath.slice(0,scriptPath.lastIndexOf("/")+1);httpGet(directoryPath+"stbvorbis_stream_asm.js").then(function(script){workerURL=URL.createObjectURL(new Blob([script],{type:"text/javascript"}));resolve(new Worker(workerURL))}).catch(function(err){reject(new Error("asmjs version is not available (HTTP status: "+err.status+" on stbvorbis_stream_asm.js). Deploy stbvorbis_stream_asm.js at the same place as stbvorbis.js."))})});initializeWorkerP.catch(function(e){});stbvorbis.decode=function(buf,outCallback){var inCallback=stbvorbis.decodeStream(outCallback);inCallback({data:buf,eof:false});inCallback({data:null,eof:true})};var sessionId=0;var outCallbacks={};stbvorbis.decodeStream=function(outCallback){var inCallbackImpl=null;var inputQueue=[];var inCallback=function(input){if(!inCallbackImpl){inputQueue.push(input);return}inCallbackImpl(input)};initializeWorkerP.then(function(worker){var currentId=sessionId;sessionId++;var sampleRate=0;var data=[];var onmessage=function(event){var result=event.data;if(result.id!==currentId){return}if(result.error){outCallback({data:null,sampleRate:0,eof:false,error:result.error});worker.removeEventListener("message",onmessage);return}if(result.eof){outCallback({data:null,sampleRate:0,eof:true,error:null});worker.removeEventListener("message",onmessage);return}outCallback({data:result.data,sampleRate:result.sampleRate,eof:false,error:null})};worker.addEventListener("message",onmessage);inCallbackImpl=function(input){if(input.eof){worker.postMessage({id:currentId,buf:null,eof:true});return}var buf=input.data;worker.postMessage({id:currentId,buf:buf,eof:false},[buf instanceof Uint8Array?buf.buffer:buf])};for(var i=0;i<inputQueue.length;i++){inCallbackImpl(inputQueue[i])}inputQueue=null});return inCallback}})();
// -------------------------------------------------------------------------------


AudioManager.audioFileExt = function() {
    return '.ogg';
};

fetch('').catch(_ => window.cordova = window.cordova || true);

if (window.ResourceHandler) {
    ResourceHandler.fetchWithRetry = async function(
        method,
        url,
        _retryCount = 0
    ) {
        let retry;
        try {
            const response = await (!window.cordova ?
                fetch(url, { credentials: 'same-origin' }) :
                new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = () => resolve(new Response(xhr.response, { status: xhr.status }));
                    xhr.onerror = reject;
                    xhr.open('GET', url);
                    xhr.send();
                })
            );
            if (response.ok) {
                switch (method) {
                    case 'stream':
                        if (response.body) {
                            return response.body.getReader();
                        }
                        const value = new Uint8Array(await response.arrayBuffer());
                        return {
                            _done: false,
                            read() {
                                if (!this._done) {
                                    this._done = true;
                                    return Promise.resolve({ done: false, value });
                                } else {
                                    return Promise.resolve({ done: true });
                                }
                            }
                        };
                    case 'arrayBuffer':
                    case 'blob':
                    case 'formData':
                    case 'json':
                    case 'text':
                        return await response[method]();
                    default:
                        return Promise.reject(new Error('method not allowed'));
                }
            } else if (response.status < 500) {
                // client error
                retry = false;
            } else {
                // server error
                retry = true;
            }
        } catch (error) {
            if (Utils.isNwjs() || window.cordova) {
                // local file error
                retry = false;
            } else {
                // network error
                retry = true;
            }
        }
        if (!retry) {
            const error = new Error('Failed to load: ' + url);
            SceneManager.catchException(error);
            throw error;
        } else if (_retryCount < this._defaultRetryInterval.length) {
            await new Promise(resolve =>
                setTimeout(resolve, this._defaultRetryInterval[_retryCount])
            );
            return this.fetchWithRetry(method, url, _retryCount + 1);
        } else {
            if (this._reloaders.length === 0) {
                Graphics.printLoadingError(url);
                SceneManager.stop();
            }
            return new Promise(resolve =>
                this._reloaders.push(() =>
                    resolve(this.fetchWithRetry(method, url, 0))
                )
            );
        }
    };
}

WebAudio.prototype.clear = function() {
    this.stop();
    this._chunks = [];
    this._gainNode = null;
    this._pannerNode = null;
    this._totalTime = 0;
    this._sampleRate = 0;
    this._loopStart = 0;
    this._loopLength = 0;
    this._startTime = 0;
    this._volume = 1;
    this._pitch = 1;
    this._pan = 0;
    this._loadedTime = 0;
    this._offset = 0;
    this._loadListeners = [];
    this._stopListeners = [];
    this._hasError = false;
    this._autoPlay = false;
    this._isReady = false;
    this._isPlaying = false;
    this._loop = false;
};

WebAudio.prototype._load = async function(url) {
    if (WebAudio._context) {
        if (Decrypter.hasEncryptedAudio) {
            url = Decrypter.extToEncryptExt(url);
        }
        const reader = await ResourceHandler.fetchWithRetry('stream', url);
        this._loading(reader);
    }
};

WebAudio.prototype._loading = async function(reader) {
    try {
        const decode = stbvorbis.decodeStream(result => this._onDecode(result));
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                decode({ eof: true });
                return;
            }
            let array = value;
            if (Decrypter.hasEncryptedAudio) {
                array = Decrypter.decryptUint8Array(array);
            }
            this._readLoopComments(array);
            decode({ data: array, eof: false });
        }
    } catch (error) {
        console.error(error);
        const autoPlay = this._autoPlay;
        const loop = this._loop;
        const pos = this.seek();
        this.initialize(this._url);
        if (autoPlay) {
            this.play(loop, pos);
        }
    }
};

WebAudio.prototype._onDecode = function(result) {
    if (result.error) {
        console.error(result.error);
        return;
    }
    if (result.eof) {
        this._totalTime = this._loadedTime;
        if (this._loopLength === 0) {
            this._loopStart = 0;
            this._loopLength = this._totalTime;
            if (this._loop) {
                this._createSourceNodes();
            }
        } else if (this._totalTime < this._loopStart + this._loopLength) {
            this._loopLength = this._totalTime - this._loopStart;
            if (this._loop) {
                this._createSourceNodes();
            }
        }
        if (this._totalTime <= this.seek()) {
            this.stop();
        }
        return;
    }
    if (result.data[0].length === 0) {
        return;
    }
    let buffer;
    try {
        buffer = WebAudio._context.createBuffer(
            result.data.length,
            result.data[0].length,
            result.sampleRate
        );
    } catch (error) {
        if (8000 <= result.sampleRate && result.sampleRate < 22050) {
            result.sampleRate *= 3;
            for (let i = 0; i < result.data.length; i++) {
                const old = result.data[i];
                result.data[i] = new Float32Array(result.data[i].length * 3);
                for (let j = 0; j < old.length; j++) {
                    result.data[i][j * 3] = old[j];
                    result.data[i][j * 3 + 1] = old[j];
                    result.data[i][j * 3 + 2] = old[j];
                }
            }
            buffer = WebAudio._context.createBuffer(
                result.data.length,
                result.data[0].length,
                result.sampleRate
            );
        } else {
            throw error;
        }
    }
    for (let i = 0; i < result.data.length; i++) {
        if (buffer.copyToChannel) {
            buffer.copyToChannel(result.data[i], i);
        } else {
            buffer.getChannelData(i).set(result.data[i]);
        }
    }
    const chunk = { buffer, sourceNode: null, when: this._loadedTime };
    this._chunks.push(chunk);
    this._loadedTime += buffer.duration;
    this._createSourceNode(chunk);
    if (!this._isReady && this._loadedTime >= this._offset) {
        this._isReady = true;
        this._onLoad();
    }
};

Object.defineProperty(WebAudio.prototype, 'pitch', {
    get: function() {
        return this._pitch;
    },
    set: function(value) {
        if (this._pitch !== value) {
            this._pitch = value;
            if (this.isPlaying()) {
                this.play(this._loop, 0);
            }
        }
    },
    configurable: true
});

WebAudio.prototype.isReady = function() {
    return this._isReady;
};

WebAudio.prototype.isPlaying = function() {
    return this._isPlaying;
};

WebAudio.prototype.play = function(loop, offset) {
    this._autoPlay = true;
    this._loop = loop;
    this._offset = offset || 0;
    if (this._loop && this._loopLength > 0) {
        while (this._offset >= this._loopStart + this._loopLength) {
            this._offset -= this._loopLength;
        }
    }
    if (this.isReady()) {
        this._startPlaying();
    }
};

WebAudio.prototype.stop = function() {
    const wasPlaying = this.isPlaying();
    this._isPlaying = false;
    this._autoPlay = false;
    this._removeNodes();
    if (this._stopListeners && wasPlaying) {
        this._stopListeners.forEach(listener => listener());
        this._stopListeners.length = 0;
    }
};

WebAudio.prototype.seek = function() {
    if (WebAudio._context && this.isPlaying()) {
        let pos =
            (WebAudio._context.currentTime - this._startTime) * this._pitch;
        if (this._loop && this._loopLength > 0) {
            while (pos >= this._loopStart + this._loopLength) {
                pos -= this._loopLength;
            }
        }
        return pos;
    } else {
        return 0;
    }
};

WebAudio.prototype._startPlaying = function() {
    this._isPlaying = true;
    this._startTime =
        WebAudio._context.currentTime - this._offset / this._pitch;
    this._removeNodes();
    this._createNodes();
    this._connectNodes();
    this._createSourceNodes();
};

WebAudio.prototype._calcSourceNodeParams = function(chunk) {
    const currentTime = WebAudio._context.currentTime;
    const chunkEnd = chunk.when + chunk.buffer.duration;
    const pos = this.seek();
    let when, offset, duration;
    if (this._loop && this._loopLength) {
        const loopEnd = this._loopStart + this._loopLength;
        if (pos <= chunk.when) {
            when = currentTime + (chunk.when - pos) / this._pitch;
        } else if (pos <= (window.AudioContext ? chunkEnd : chunkEnd - 0.0001)) {
            when = currentTime;
            offset = pos - chunk.when;
        } else if (this._loopStart <= pos) {
            when =
                currentTime +
                (chunk.when - pos + this._loopLength) / this._pitch;
        } else {
            return;
        }
        if (this._loopStart <= pos && chunk.when < this._loopStart) {
            if (!offset) {
                when += (this._loopStart - chunk.when) / this._pitch;
                offset = this._loopStart - chunk.when;
            }
            if (chunk.buffer.duration <= offset) {
                return;
            }
        }
        if (loopEnd < chunkEnd) {
            if (!offset) {
                offset = 0;
            }
            duration = loopEnd - chunk.when - offset;
            if (duration <= 0) {
                return;
            }
        }
    } else {
        if (pos <= chunk.when) {
            when = currentTime + (chunk.when - pos) / this._pitch;
        } else if (pos <= (window.AudioContext ? chunkEnd : chunkEnd - 0.0001)) {
            when = currentTime;
            offset = pos - chunk.when;
        } else {
            return;
        }
    }
    return { when, offset, duration };
};

WebAudio.prototype._createSourceNode = function(chunk) {
    if (!this.isPlaying() || !chunk) {
        return;
    }
    if (chunk.sourceNode) {
        chunk.sourceNode.onended = null;
        chunk.sourceNode.stop();
        chunk.sourceNode = null;
    }
    const params = this._calcSourceNodeParams(chunk);
    if (!params) {
        if (!this._reservedSeName) {
            this._chunks[this._chunks.indexOf(chunk)] = null;
        }
        return;
    }
    const { when, offset, duration } = params;
    const context = WebAudio._context;
    const sourceNode = context.createBufferSource();
    sourceNode.onended = _ => {
        this._createSourceNode(chunk);
        if (this._totalTime && this._totalTime <= this.seek()) {
            this.stop();
        }
    };
    sourceNode.buffer = chunk.buffer;
    sourceNode.playbackRate.setValueAtTime(this._pitch, context.currentTime);
    sourceNode.connect(this._gainNode);
    sourceNode.start(when, offset, duration);
    chunk.sourceNode = sourceNode;
};

WebAudio.prototype._createSourceNodes = function() {
    this._chunks.forEach(chunk => this._createSourceNode(chunk));
};

WebAudio.prototype._createNodes = function() {
    const context = WebAudio._context;
    this._gainNode = context.createGain();
    this._gainNode.gain.setValueAtTime(this._volume, context.currentTime);
    this._pannerNode = context.createPanner();
    this._pannerNode.panningModel = 'equalpower';
    this._updatePanner();
};

WebAudio.prototype._connectNodes = function() {
    this._gainNode.connect(this._pannerNode);
    this._pannerNode.connect(WebAudio._masterGainNode);
};

WebAudio.prototype._removeNodes = function() {
    if (this._chunks) {
        this._chunks
            .filter(chunk => chunk && chunk.sourceNode)
            .forEach(chunk => {
                chunk.sourceNode.onended = null;
                chunk.sourceNode.stop();
                chunk.sourceNode = null;
            });
    }
    this._gainNode = null;
    this._pannerNode = null;
};

WebAudio.prototype._onLoad = function() {
    if (this._autoPlay) {
        this.play(this._loop, this._offset);
    }
    this._loadListeners.forEach(listener => listener());
    this._loadListeners.length = 0;
};

WebAudio.prototype._readLoopComments = function(array) {
    if (this._sampleRate === 0) {
        this._readOgg(array);
        if (this._loopLength > 0 && this._sampleRate > 0) {
            this._loopStart /= this._sampleRate;
            this._loopLength /= this._sampleRate;
        }
    }
};

Decrypter.decryptUint8Array = function(uint8Array) {
    const ref = this.SIGNATURE + this.VER + this.REMAIN;
    for (let i = 0; i < this._headerlength; i++) {
        if (uint8Array[i] !== parseInt('0x' + ref.substr(i * 2, 2), 16)) {
            return uint8Array;
        }
    }
    uint8Array = new Uint8Array(uint8Array.buffer, this._headerlength);
    this.readEncryptionkey();
    for (var i = 0; i < this._headerlength; i++) {
        uint8Array[i] = uint8Array[i] ^ parseInt(this._encryptionKey[i], 16);
    }
    return uint8Array;
};

}
//=============================================================================
// MVP_Gamepad.js
// Version: 2.0
//----------------------------------------------------------------------------
// Copyright (c) 2017-2020 RyanBram
// Copyright (c) 2015-2017 uchuzine, NAK
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
@plugindesc
[Ver.2.0.0] Plug-in for smartphone operation. The virtual buttons that support landscape/portrait
holding and touch operation methods have been added and expanded to make smartphone play more comfortable.
@author
uchuzine, NAK, RyanBram
@help
MVP_Gamepad (Version: 2.0)

------------------------------------------------------------------------------
■Changelog
------------------------------------------------------------------------------

      ----------------
-----| MVP_Gamepad.js |-------------------------------------
      ----------------

2.0.0 2020/11/28 Disable touch when showing Gamepad overlay to avoid unwanted behavior

      ----------------------------------
-----| UCHU_MobileOperation_Modified.js |-------------------------------------
      ----------------------------------
https://github.com/DICE2000/RPGMVplugins/blob/master/UCHU_MobileOperation_Modified.js

1.2 2018/1/26
- If hidden when the HideButton Switch option is enabled,
  The transparency was set to 0 so that it was completely invisible.

1.1 2018/1/5
- Fixed the problem that HideButton OnMessage did not respond to the common event "Display text" even if it was enabled.

1.0 2018/1/4
- Since the degree of modification is large, this plugin is,
  renamed to UCHU_MobileOperation_Modified.js.
- Set the plug-in parameters of MV core script 1.5.0
  made it a little easier to use.
  Up to 3 digits after the decimal point are enabled.
  Please put the image file of the virtual pad in the img / system folder.
  An error will occur if the file extension is not all lowercase.
- Depending on the version of Chrome, an error may appear on the console when flicking.
　 It was suppressed by referring to the following Qiita article.
　 https://qiita.com/ru_shalm/items/4d79e94b5d9c7c88607d
- Fixed the memory leak problem of HideButton OnMessage.
　 (Reference)
　 https://qiita.com/EudyptesCapital/items/d4a76d665b038e027638
　 https://tm.lucky-duet.com/viewtopic.php?t=371
- Added HideButton Switch option.
  On the map screen (Scene_Map) / battle screen (Scene_Battle)
  The display of the virtual pad is switched by the switch with the specified number.
  This display state will be carried over to other screens (Scene).
  (If you move to the battle screen (Scene_Battle) while hiding it on the map screen,
  Not displayed even in battle)
  If this function is enabled, HideButton On Message will not work.
  (Even if HideButton OnMessage is set to true, it will not be hidden if the switch is OFF)
- Added HideButton Switch Value option.
  At the value set here, the virtual pad will be displayed.
  When HideButtonSwitch is 10,
  Set this option to true:
  Displayed when the 10th switch is on, hidden when it is off
  Set this option to false:
  Displayed when the 10th switch is off, hidden when it is on

      -------------------------
-----| UCHU_MobileOperation.js |----------------------------------------------
      -------------------------
http://uchuzine.com/mv/demo/download/UCHU_MobileOperation.js

1.1.4 2015/12/04  Fixed the problem that the following problem reoccurs after displaying the message at the bottom of the screen.
1.1.3 2015/11/29  Fixed a bug that the button cannot be pressed when the button is installed on the upper left of the screen.
1.1.2 2015/11/24  Fixed a bug that parameters cannot be changed
1.1.1 2015/11/23  Fixed a bug when operating virtual buttons on PC
1.1.0 2015/11/17  Supports analog movement when using "AnalogMove.js". See description below
1.0.0 2015/11/15  Plugin released

------------------------------------------------------------------------------
■ Features
------------------------------------------------------------------------------
When creating the plugin, I (uchuzine) refer to por Masked's MBS_MobileDirPad.js.
https://github.com/masked-rpgmaker/JS/blob/master/mv/MBS_MobileDirPad.js

○ Features of this plug-in
- Since the button is installed outside the game screen (black belt part), it does not easily interfere with the play screen.
- Pads and buttons can be displayed / hidden individually.
- The reference point of the button can be specified in any of the four corners of the screen, and it can be held vertically.
- Emphasis is placed on the operability of the directional pad, and the touch judgment area and diagonal sensitivity can be adjusted.
  (See the explanation below for details)
- Movement by direction pad and movement by default destination touch can be used together
- Expansion of button operations by specific touch operations and gestures

Using these,

- Use only the MENU button and enter button without using the virtual cross key.
- Do not use all the buttons, press and hold the screen for automatic repeated hits, and touch outside the screen to call the menu

You can also use it like this.

------------------------------------------------------------------------------
■ Explanation of some parameters
------------------------------------------------------------------------------
▼ DPad Opelation Range ‥‥‥
Direction Pad Specifies the size of the touch judgment area with respect to the display size of the image by a magnification.
Increasing the value does not change the appearance, but the judgment spreads from the center of the image to the outside.
Example)
When it is "1", the size of the image becomes the size of the touch judgment (only in the inscribed circle of the image)
When it is "2", the size of the touch judgment is doubled vertically and horizontally (50% spreads outside the image).

You can prevent operation mistakes and improve operability by increasing the value.
Be careful not to raise it too much and overlap it with other buttons.

▼ DPad Diagonal Range (diagonal range of direction pad) ‥‥‥
Judgment of the direction is divided into top, bottom, left and right with the diagonal line of the pad image as the boundary line.
Increasing this number will turn on both directions when you touch diagonally.
("Right" + "Up", etc.), you will be able to judge in 8 directions.
Set this value when using a plug-in that moves in eight directions.

The size of the numerical value is the width of the diagonal judgment angle, and it is specified in the range of "0 to 1".
Example)
When "0" ... Only 4 directions of up, down, left and right can be input.
When "0.5": Equal 8 direction input is possible.
When it is "1" ... Input in 4 directions: "upper right", "lower right", "upper left", and "lower left".

The higher the number, the more mistakes such as "I intended to push up was in the upper right" occur.
If there is no problem in 4 directions, specify "0" to minimize operation mistakes.


(Added from var1.1.0)
▼ Analog Move ‥‥‥
When using Sanshiro's plug-in "AnalogMove.js", analog movement is possible.
You can move in dot units by the distance and angle of the touch position from the center of the direction pad.
When using it, load "AnalogMove.js" first with the plugin manager.
Change this parameter "AnalogMove" to true.
* While using analog movement, the value of "D Pad Diagonal Range" is ignored.

▼ Analog Sensitivity (input sensitivity) ‥‥
"Analog Sensitivity" is the input sensitivity, the higher the value
The finger movement required to enter the maximum value (maximum speed) is reduced.
Example)
When it is "1", it reaches the maximum value at the outer end of the input judgment. Requires large finger movement.
When it is the same as "D Pad Opelation Range" ... Maximum value at the outer edge of the direction pad image.

Specifying a number larger than the DPad Opelation Range will make the input easier.
(The initial value of Analog Sensitivity is 1.8 while the initial value of DPad Opelation Range is 1.3)

------------------------------------------------------------------------------
■ About pad and button images
------------------------------------------------------------------------------
- (Addition) Put the pad / button image in the system folder (img / system),
  The extension (.png) should be all lowercase.

- Image files can be created in any size, but please create them with an aspect ratio of 1: 1.
  When displayed, it will be resized to the number of pixels specified in "DPad Size".
  The same applies to the button image.
- Make sure that the center of the graphic on the direction pad is the center of the image.

@param ---PC Option---
@default

@param PC BtnDisplay
@desc Show virtual buttons when running on PC. Yes: true / Not:false
Default:false
@default false
@type boolean

@param PC TouchExtend
@desc Enable touch operation extension when running on PC. Yes: true / Not:false
Default:false
@default false
@type boolean

@param ---File Path---
@default

@param DPad Image
@desc The file path of the D-Pad image
@default DirPad
@require 1
@dir img/system/
@type file

@param ActionBtn Image
@desc The file path of the Action button image
@default ActionButton
@require 1
@dir img/system/
@type file

@param CancelBtn Image
@desc File path of Cancel (menu) button image
@default CancelButton
@require 1
@dir img/system/
@type file

@param ---Button Customize---
@default

@param Button Opacity
@desc Button opacity (0 to 1) Default: 0.7
@default 0.700
@type number
@max 1.000
@min 0.000
@decimals 3

@param Vertical BtnZoom
@desc Magnification of all buttons when displayed in portrait
初期値:1.700
@default 0.900
@type number
@decimals 3

@param Tablet BtnZoom
@desc Magnification of all buttons when displayed in landscape in Tablet
初期値:0.800
@default 0.800
@type number
@decimals 3

@param TabVertical BtnZoom
@desc Magnification of all buttons when displayed in portrait in Tablet
初期値:1.100
@default 0.900
@type number
@decimals 3

@param HideButton OnMessage
@desc When the message is displayed at the bottom of the screen, lower the display order of the virtual button to the bottom of the game screen.
初期値:false
@default false
@type boolean

@param HideButton Switch
@desc Control the display of virtual buttons with this numbered switch. Disabled at 0.
@default 0
@type number

@param HideButton Switch Value
@desc When controlling a virtual button with a switch, set whether to display ON (true) or OFF (false).
@default false
@type boolean

@param DPad Visible
@desc Show direction pad. Yes:true / Not:false. Default:true
@default true
@type boolean

@param DPad Size
@desc Direction pad size (px). Initial value: 200
@default 128
@type number

@param DPad Margin
@desc The position of the direction pad image. The size of the gap from the edge of the screen.
(width from left; width from bottom) Initial value: 10; 10
@default 20; 20

@param DPad Orientation
@desc You want to change the reference position of the direction pad to something other than the lower left.
left か right; top か bottom で指定。 初期値:left; bottom
@default left; bottom
@type select
@option left; top
@option left; bottom
@option right; top
@option right; bottom

@param DPad OpelationRange
@desc For the direction pad image, the operating range of the touch (magnification, 1~ )
to widen the touch determination to the outside of the image, to prevent operation error. Initial value: 1.3
@default 1.000
@type number
@decimals 3

@param DPad DiagonalRange
@desc The size of the determination of the direction pad oblique direction (0-1). The easier it is to enter diagonally, the easier it is to shake the operation. 0 if it is good in four directions. Initial value: 0.3;
@default 0.300
@type number
@max 1.000
@min 0.000
@decimals 3

@param ActionBtn Visible
@desc Show Action button: true Not:false Initial value: true
@default true
@type boolean

@param ActionBtn Size
@desc The size of the decision button (px). Initial value: 100
@default 60
@type number

@param ActionBtn Margin
@desc The position of the decision button. The size of the gap from the edge of the screen.
 (width from right; width from bottom) Initial value: 10; 90
@default 20; 70

@param ActionBtn Orientation
@desc You want to change the reference position of the decision button to something other than the lower right.
left か right; top か bottom で指定。 Initial value: right; bottom
@default right; bottom
@type select
@option left; top
@option left; bottom
@option right; top
@option right; bottom

@param CancelBtn Visible
@desc Show cancel (menu) button: true Do not: false
初期値:true
@default true
@type boolean

@param CancelBtn Size
@desc The size of the cancel button (px). Initial value: 100
@default 60
@type number

@param CancelBtn Margin
@desc The position of the cancel button. Specify by the size of the gap from the edge of the screen.
 (Width from right; Height from bottom) Initial value: 110; 10
@default 70; 20

@param CancelBtn Orientation
@desc When you want to change the reference position of the cancel button to something other than the lower right.
left か right; top か bottomで指定。 Initial value: right; bottom
@default right; bottom
@type select
@option left; top
@option left; bottom
@option right; top
@option right; bottom

@param ---TouchInput Extend---
@default 

@param Flick PageUp-PageDown
@desc Flick left or right on the screen to get the PageUp/PageDown operation.
When you want to switch characters on the status screen. Initial value: true
@default true
@type boolean

@param HoldCanvas ActionBtn
@desc Press and hold the screen to press the decision button.
初期値:true
@default true
@type boolean

@param OutCanvas CancelBtn
@desc The entire black belt outside the game screen is treated like a cancel button.
初期値:false
@default false
@type boolean

@param OutCanvas ActionBtn
@desc The entire black belt part outside the game screen becomes the decision button treatment.
初期値:false
@default false
@type boolean

@param --!need AnalogMove.js!--
@default

@param Analog Move
@desc [* Please load AnalogMove.js first]
Allow analog movement with the directional pad. Initial value: false
@default false
@type boolean

@param Analog Sensitivity
@desc アInput sensitivity for analog movement. If you increase the value, the character will move greatly with small finger movements.
初期値:1.800
@default 1.800
@type number
@decimals 3

*/

var Imported = Imported || {};
Imported.MVP_Gamepad = "1.2";

var MVP_Gamepad = {};

(function() {
    "use strict";
	
	//-----------------------------------------------------------------------------
	// Setup
	
	var Parameters = PluginManager.parameters('GamepadOverlay');
	var PRM = PRM || {};
	
	var paramDisplayOverlayOnPc = Boolean(Parameters["PC BtnDisplay"] === 'true' || false);
	var paramExtendTouchFeatures = Boolean(Parameters["PC TouchExtend"] === 'true' || false);
	var paramDpadImageLocation = "./img/system/" + String(Parameters["DPad Image"]) + ".png";
	var paramURL = [];
        paramURL[1] = "./img/system/" + String(Parameters["ActionBtn Image"])+ ".png";
	    paramURL[2] = "./img/system/" + String(Parameters["CancelBtn Image"])+ ".png";
	var paramOverlayOpacity = Number(Parameters["Button Opacity"]);
	var paramOverlayVZoom = Number(Parameters["Vertical BtnZoom"]);
	var paramTabletOverlayZoom = Number(Parameters["Tablet BtnZoom"]);
	var paramTabletOverlayVZoom = Number(Parameters["TabVertical BtnZoom"]);
	var paramHideOverlayOnMessage = Boolean(Parameters["HideButton OnMessage"] === 'true' || false);
	var paramVisible=[];
	    paramVisible[0] = Boolean(Parameters["DPad Visible"] === 'true' || false);
	    paramVisible[1] = Boolean(Parameters["ActionBtn Visible"] === 'true' || false);
	    paramVisible[2] = Boolean(Parameters["CancelBtn Visible"] === 'true' || false);
	var paramSize =[];
	    paramSize[0] = Number(Parameters["DPad Size"]);
		paramSize[1] = Number(Parameters["ActionBtn Size"]);
		paramSize[2] = Number(Parameters["CancelBtn Size"]);
	var paramPosition =[];
		paramPosition[0] = Parameters["DPad Margin"].split(";");
		paramPosition[1] = Parameters["ActionBtn Margin"].split(";");
		paramPosition[2] = Parameters["CancelBtn Margin"].split(";");	
	var paramOrientation=[];
		paramOrientation[0] = Parameters["DPad Orientation"].split(";");
		paramOrientation[1] = Parameters["ActionBtn Orientation"].split(";");
		paramOrientation[2] = Parameters["CancelBtn Orientation"].split(";");
	var paramOverlayScale = Number(Parameters["DPad OpelationRange"]);
	var paramDPadDiagonalRange = Math.max(0,Math.min(1,(1-Number(Parameters["DPad DiagonalRange"]))));
	var paramFlipPage = Boolean(Parameters["Flick PageUp-PageDown"] === 'true' || false);
	var paramHoldAsAction = Boolean(Parameters["HoldCanvas ActionBtn"] === 'true' || false);
	var paramOutCanvasAsCancel = Boolean(Parameters["OutCanvas CancelBtn"] === 'true' || false);
	var paramOutCanvasAsAction = Boolean(Parameters["OutCanvas ActionBtn"] === 'true' || false);
	var paramOverlayAnalogMove = Boolean(Parameters["Analog Move"] === 'true' || false);
	var paramOverlayAnalogSensitivity = Number(Parameters["Analog Sensitivity"]);
	// Addition of functions by the modifier
	var paramHideOverlayOnMessageSwitch = Number(Parameters["HideButton Switch"]);
	var paramHideOverlayOnMessageSwitchValue = Boolean(Parameters["HideButton Switch Value"] === 'true' || false);
	
	var btn_id=["DirPad","ok","escape"];
	var current_zoom=1;	
	var st_x = 0;
	var st_y = 0;
	var pad_range=paramSize[0]*paramOverlayScale;
	var pad_size=pad_range*current_zoom/2;
	var Btn_ready=false;
	var Btn_hide=false;
	var PressBtn=false;
	var dirx=0;
	var diry=0;
	var touchx=0;
	var touchy=0;
	var autofire=false;
	var hvzoom=[1, paramOverlayVZoom];
	var ua = (function(u){
	  return {
	    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1
	  };
	})(window.navigator.userAgent.toLowerCase());

	if(ua.Tablet){
		hvzoom=[paramTabletOverlayZoom, paramTabletOverlayVZoom];
	}
	if (!Utils.isMobileDevice() && !paramDisplayOverlayOnPc) {paramVisible[0]=paramVisible[1]=paramVisible[2]=false;}


	//-----------------------------------------------------------------------------
	// Locate_DirPad

	function Locate_DirPad() {
		this.initialize.apply(this, arguments);
	}


	Locate_DirPad.prototype.initialize = function() {
		var img = new Image();
		var url = paramDpadImageLocation;
		img.onerror = function() {Graphics.printError('DirPad Image was Not Found:',url);};
		img.src = url;
		img = null;
		this.Div = document.createElement("div");
		this.Div.id = 'Dirpad';
		this.Div.style.position = 'fixed';
		this.Div.style[paramOrientation[0][0].replace(/\s+/g, "")] = String(paramPosition[0][0]-(pad_range-paramSize[0])/2)+'px';
		this.Div.style[paramOrientation[0][1].replace(/\s+/g, "")] = String(paramPosition[0][1]-(pad_range-paramSize[0])/2)+'px';
		this.Div.style.width = pad_range+'px';
		this.Div.style.height = pad_range+'px';
		this.Div.style.opacity = paramOverlayOpacity;
		this.Div.style.zIndex = '11';
		this.Div.style.userSelect="none";
		this.Div.style["-webkit-tap-highlight-color"]="rgba(0,0,0,0)";
		this.Div.style.background = 'url('+paramDpadImageLocation+') 50% 50% / '+String(Math.round(paramSize[0]/pad_range*100))+'% no-repeat';
		/*
		if(!Utils.isMobileDevice() && paramDisplayOverlayOnPc){
			this.Div.addEventListener('mousedown', function(e) {
			  if (!SceneManager.isSceneChanging()){dirope(e.layerX,e.layerY,true);PressBtn=true;}
			}, false);
			this.Div.addEventListener('mousemove', function(e) {
			  if(PressBtn && !SceneManager.isSceneChanging()){dirope(e.layerX,e.layerY,false);}
			}, false);
			this.Div.addEventListener('mouseup', function() {
				disope();PressBtn=false;
			}, false);
			this.Div.addEventListener('mouseout', function() {
			    disope();PressBtn=false;
			}, false);
		}
		*/
		this.Div.addEventListener('touchstart', function(e) {
			PressBtn=true;
			if (!SceneManager.isSceneChanging()){dirope(e.touches[0].clientX-dirx, e.touches[0].clientY-diry,true)};
		}, false);
		this.Div.addEventListener('touchmove', function(e) {
			if (!SceneManager.isSceneChanging()){dirope(e.touches[0].clientX-dirx, e.touches[0].clientY-diry,false)};
			PressBtn=true;
		}, false);
		this.Div.addEventListener('touchend', function() {
			disope();PressBtn=false;
		}, false);
			document.body.appendChild(this.Div);
	};
	
	function dirope(xx,yy,st) {
		touchx=(xx-pad_size)/pad_size;
		touchy=(yy-pad_size)/pad_size;
		if(st && Math.sqrt(touchx*touchx+touchy*touchy)>1){
			disope();
		}else{
			if(touchx>Math.abs(touchy)*paramDPadDiagonalRange){Input._currentState['right']=true;Input._currentState['left']=false;}
			else if(touchx<-Math.abs(touchy)*paramDPadDiagonalRange){Input._currentState['left']=true;Input._currentState['right']=false;}
			else{Input._currentState['left']=false;Input._currentState['right']=false;}
			if(touchy>Math.abs(touchx)*paramDPadDiagonalRange){Input._currentState['down']=true;Input._currentState['up']=false;}
			else if(touchy<-Math.abs(touchx)*paramDPadDiagonalRange){Input._currentState['up']=true;Input._currentState['down']=false;}
			else{Input._currentState['up']=false;Input._currentState['down']=false;}
		}
	}
	function disope() {
		touchx=0; touchy=0;
		Input._currentState['up']=false;
		Input._currentState['down']=false;
		Input._currentState['left']=false;
		Input._currentState['right']=false;
	}
	
	//-----------------------------------------------------------------------------
	// Locate_Button

	function Locate_Button() {
		this.initialize.apply(this, arguments);
	}
	Locate_Button.prototype.initialize = function(type) {
		var img = new Image();
		var url = paramURL[type];
		img.onerror = function() {Graphics.printError('Button Image was Not Found:',url);};
		img.src = url;
		img = null;
		this.Div = document.createElement("div");
		this.Div.id = btn_id[type]+'Btn';
		this.Div.style.position = 'fixed';
		this.Div.style[paramOrientation[type][0].replace(/\s+/g, "")] = paramPosition[type][0]+'px';
		this.Div.style[paramOrientation[type][1].replace(/\s+/g, "")] = paramPosition[type][1]+'px';
		this.Div.style.width = paramSize[type]+'px';
		this.Div.style.height = paramSize[type]+'px';
		this.Div.style.opacity = paramOverlayOpacity;
		this.Div.style.zIndex = '11';
		this.Div.style.userSelect="none";
		this.Div.style.background = 'url('+paramURL[type]+') 0 0 / cover no-repeat';
		/*
		if(!Utils.isMobileDevice() && paramDisplayOverlayOnPc){
			this.Div.addEventListener('mousedown', function() {
				Input._currentState[btn_id[type]] = true;PressBtn=true;
			}, false);
			this.Div.addEventListener('mouseover', function() {
			  if(TouchInput.isPressed()){Input._currentState[btn_id[type]] = true;PressBtn=true;return false;}
			}, false);
			this.Div.addEventListener('mouseup', function() {
			  Input._currentState[btn_id[type]] = false;PressBtn=false;
			}, false);
			this.Div.addEventListener('mouseout', function() {
			  Input._currentState[btn_id[type]] = false;PressBtn=false;
			}, false);
		}
		*/
        // Disable TouchPad -------------------------------------
		if(Utils.isMobileDevice() || paramDisplayOverlayOnPc){
                        var _TouchInput_initialize = TouchInput.initialize;
                        TouchInput.initialize = function() {
                            _TouchInput_initialize.call(this);
                            this._touchEnabled = false;
                        }


                        var _TouchInput_update = TouchInput.update;
                        TouchInput.update = function() {
                            if (this._touchEnabled)
                            _TouchInput_update.call(this);
                        }
		}
		// --------------------------------------------------------

		this.Div.addEventListener('touchstart', function() {
			if (!SceneManager.isSceneChanging()){Input._currentState[btn_id[type]] = true;PressBtn=true;}
		}, false);
		this.Div.addEventListener('touchend', function() {
			Input._currentState[btn_id[type]] = false;PressBtn=false;
		}, false);
		
		document.body.appendChild(this.Div);
	};

	//-----------------------------------------------------------------------------
	// Replace function
			
	var _Scene_Base_start = Scene_Base.prototype.start;
	Scene_Base.prototype.start = function() {
        _Scene_Base_start.call(this);
	    if (Utils.isMobileDevice() || paramDisplayOverlayOnPc) {
			if(!Btn_ready){
				Btn_ready=true;
				if(paramVisible[0]){this.DirPad = new Locate_DirPad();}
				if(paramVisible[1]){this.okButton = new Locate_Button(1);}
				if(paramVisible[2]){this.canselButton = new Locate_Button(2);}
				Graphics._updateRealScale();
				document.documentElement.style["-webkit-user-select"]="none";
				document.addEventListener("touchmove", function(evt) {evt.preventDefault();}, {passive: false});
			}
		}
	};

        if(paramVisible[0] || paramVisible[1] || paramVisible[2]){
            var _Game_Temp_setDestination = Game_Temp.prototype.setDestination;
            Game_Temp.prototype.setDestination = function(x, y) {
                _Game_Temp_setDestination.apply(this, arguments);
                if(PressBtn){
                    this._destinationX = null;
                    this._destinationY = null;
                }
            };
		
            var _Graphics_updateRealScale = Graphics._updateRealScale;
            Graphics._updateRealScale = function() {
                _Graphics_updateRealScale.call(this);
                if (this._stretchEnabled) {
                    if(document.getElementById("Dirpad")){
                    if(window.innerWidth<window.innerHeight){current_zoom=hvzoom[1];}else{current_zoom=hvzoom[0];}
                    pad_size=pad_range*current_zoom/2;
                    if(paramVisible[0]){
                            document.getElementById("Dirpad").style.zoom=current_zoom;
                            dirx=document.getElementById("Dirpad").offsetLeft*current_zoom;
                            diry=document.getElementById("Dirpad").offsetTop*current_zoom;
                    }
                    if(paramVisible[1]){document.getElementById("okBtn").style.zoom=current_zoom;}
                    if(paramVisible[2]){document.getElementById("escapeBtn").style.zoom=current_zoom;}
                    }
                }
            };
	}
	
	//-----------------------------------------------------------------------------
	// Option
        // Where there are many modifications from MVP_Gamepad

        // Almost the same as the method of the same name in MVP_Gamepad
        Scene_Base.prototype.hideUserInterface = function() {
            if (Utils.isMobileDevice() || paramDisplayOverlayOnPc) {
                Btn_hide = true;
                // Original MVP_Gamepad processing
                if(paramVisible[0]){document.getElementById("Dirpad").style.zIndex = '0';}
                if(paramVisible[1]){document.getElementById("okBtn").style.zIndex = '0';}
                if(paramVisible[2]){document.getElementById("escapeBtn").style.zIndex = '0';}
                if(paramHideOverlayOnMessageSwitch != 0){
                    // Processing to make transparency zero
                    if(paramVisible[0]){document.getElementById("Dirpad").style.opacity = '0';}
                    if(paramVisible[1]){document.getElementById("okBtn").style.opacity = '0';}
                    if(paramVisible[2]){document.getElementById("escapeBtn").style.opacity = '0';}
                }
            }
        };
        
        // Almost the same as the method of the same name in MVP_Gamepad
        Scene_Base.prototype.showUserInterface = function() {
            if (Utils.isMobileDevice() || paramDisplayOverlayOnPc) {
                Btn_hide = false;
                // Original MVP_Gamepad processing
                if(paramVisible[0]){document.getElementById("Dirpad").style.zIndex = '11';}
                if(paramVisible[1]){document.getElementById("okBtn").style.zIndex = '11';}
                if(paramVisible[2]){document.getElementById("escapeBtn").style.zIndex = '11';}
                if(paramHideOverlayOnMessageSwitch != 0){
                    // Processing to set transparency
                    if(paramVisible[0]){document.getElementById("Dirpad").style.opacity = paramOverlayOpacity;}
                    if(paramVisible[1]){document.getElementById("okBtn").style.opacity = paramOverlayOpacity;}
                    if(paramVisible[2]){document.getElementById("escapeBtn").style.opacity = paramOverlayOpacity;}                      
                }
            }
        };


        // Check the display status with updateMain
        var _Scene_Map_updatemain = Scene_Map.prototype.updateMain;
        Scene_Map.prototype.updateMain = function() {
            _Scene_Map_updatemain.apply(this, arguments);
            // When the switch number is set
            if(paramHideOverlayOnMessageSwitch != 0){
                // Which value to display depends on paramHideOverlayOnMessageSwitchValue (truth value)
                // Hide
                if($gameSwitches.value(paramHideOverlayOnMessageSwitch) != paramHideOverlayOnMessageSwitchValue){
                    // Call the method in the display state (Btn_hide is false) and set Btn_hide to true at the destination
                    if(!Btn_hide) this.hideUserInterface();
                // Put it in the display state
                }else{
                    // Call the method in the hidden state (Btn_hide is true) and set Btn_hide to false at the destination
                    if(Btn_hide) this.showUserInterface();
                }
            // When the switch number is not set and HideButton OnMessage is set to true
            }else if(paramHideOverlayOnMessage){
                // Erase condition: When there is text in the message window & when not in scroll mode & when the window position is down
                // You can change the timing of erasing by changing the conditional expression here
                if($gameMessage.hasText() && !$gameMessage.scrollMode() && $gameMessage.positionType() == 2){
                    if(!Btn_hide) this.hideUserInterface();
                }else{
                    if(Btn_hide) this.showUserInterface();
                }
            }
        };

        var _Scene_Battle_update = Scene_Battle.prototype.update;
        Scene_Battle.prototype.update = function() {
            _Scene_Battle_update.apply(this, arguments);
            if(paramHideOverlayOnMessageSwitch != 0){
                if($gameSwitches.value(paramHideOverlayOnMessageSwitch) != paramHideOverlayOnMessageSwitchValue){
                    if(!Btn_hide) this.hideUserInterface();
                }else{
                    if(Btn_hide) this.showUserInterface();
                }
            }else if(paramHideOverlayOnMessage){
                if($gameMessage.hasText() && !$gameMessage.scrollMode() && $gameMessage.positionType() == 2){
                    if(!Btn_hide) this.hideUserInterface();
                }else{
                    if(Btn_hide) this.showUserInterface();
                }
            }
        };

	if(Utils.isMobileDevice() || paramExtendTouchFeatures){
		if(paramHoldAsAction){
			var TouchInput_update = TouchInput.update;
			TouchInput.update = function() {
				TouchInput_update.call(this);
				if (!PressBtn && TouchInput.isLongPressed()) {
					Input._currentState['ok']=true;autofire=true;
				}
				if(!TouchInput.isPressed() && autofire){
					Input._currentState['ok']=false;autofire=false;
				}
			};
		}
		
		if(paramFlipPage || paramOutCanvasAsCancel || paramOutCanvasAsAction){
			TouchInput._endRequest= function(type) {
				Input._currentState[type]=false;
			}
			if(Utils.isMobileDevice()){
				var TouchInput_onTouchStart = TouchInput._onTouchStart;
				TouchInput._onTouchStart = function(event) {
				    TouchInput_onTouchStart.apply(this, arguments);
					var touch = event.changedTouches[0];
					if(!PressBtn){
						st_x = Graphics.pageToCanvasX(touch.pageX);
						st_y = Graphics.pageToCanvasY(touch.pageY);
						if(st_x<0 || st_y<0 || st_x>Graphics.boxWidth || st_y>Graphics.boxHeight){
							if(paramOutCanvasAsCancel){Input._currentState['escape']=true;setTimeout("TouchInput._endRequest('escape');", 100);}
							if(paramOutCanvasAsAction){Input._currentState['ok']=true;setTimeout("TouchInput._endRequest('ok');", 100);}
						}
					}
				};
			}else{
				var TouchInput_onLeftButtonDown = TouchInput._onLeftButtonDown;
				TouchInput._onLeftButtonDown = function(event) {
					TouchInput_onLeftButtonDown.apply(this, arguments);
					if(!PressBtn){
						st_x = Graphics.pageToCanvasX(event.pageX);
						st_y = Graphics.pageToCanvasY(event.pageY);
						if(st_x<0 || st_y<0 || st_x>Graphics.boxWidth || st_y>Graphics.boxHeight){
							if(paramOutCanvasAsCancel){Input._currentState['escape']=true;setTimeout("TouchInput._endRequest('escape');", 100);}
							if(paramOutCanvasAsAction){Input._currentState['ok']=true;setTimeout("TouchInput._endRequest('ok');", 100);}
						}
					}
				};
			}
		}
			
		if(paramFlipPage){
			var TouchInput_onMove = TouchInput._onMove;
			TouchInput._onMove = function(x, y) {
				TouchInput_onMove.apply(this, arguments);
				if(!PressBtn){
					if((st_x-x)<-50 && Math.abs(st_y-y)<100){st_y=9999;Input._currentState['pageup']=true;setTimeout("TouchInput._endRequest('pageup');", 100);}
					if((st_x-x)>50 && Math.abs(st_y-y)<100){st_y=9999;Input._currentState['pagedown']=true;setTimeout("TouchInput._endRequest('pagedown');", 100);}
				}
			}
		}
	}
	
	//AnalogMove.js
	if(paramOverlayAnalogMove && Utils.isMobileDevice() || paramOverlayAnalogMove && paramDisplayOverlayOnPc){
		Input.leftStick = function() {
			var threshold = 0.1;
			var x = touchx;
			var y = touchy;
			var tilt = Math.min(1,Math.sqrt(touchx*touchx+touchy*touchy)*paramOverlayAnalogSensitivity);
			var direction = 0.0;
			if (x === 0.0) {
				direction = (-y > 0 ? Math.PI * 0.0 : Math.PI * 1.0);
			} else if (y === 0.0) {
				direction = (-x > 0 ? Math.PI * 0.5 : Math.PI * 1.5);
			} else {
				direction = Math.atan2(-x, -y);
			}
			return {tilt: tilt, direction: direction};
		};
	}

	//-----------------------------------------------------------------------------
})(MVP_Gamepad);
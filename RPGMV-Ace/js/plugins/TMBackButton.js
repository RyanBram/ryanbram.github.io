//=============================================================================
// TMPlugin - 戻るボタン
// バージョン: 1.0.0
// 最終更新日: 2016/10/28
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc Displays a back button for tap operation in the menu scene.
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param menuButtonImage
 * @desc The image to display as a menu button.
 * Default: menuButton
 * @default menuButton
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * @param backButtonImage
 * @desc The image to display as a back button.
 * Default: backButton
 * @default backButton
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @help
 * Preparation:
 *
 *   Save the button image distributed with the plugin in the img/system folder.
 *   The file name is backButton.png.
 *   If you want to use an original button image, prepare one with the same file name as above,
 *   or change the plugin parameter buttonImage.
 *
 *
 * Usage:
 *
 *   If you place the button image in the img/system folder and introduce this plugin,
 *   a back button will be automatically displayed.
 *
 *   You can adjust the button display position for each scene with the plugin parameters,
 *   so please change it as you like.
 *
 *   The transparent part of the button image (alpha value 0) does not respond to taps.
 *
 *   There are no plugin commands.
 *
 *   This plugin has been confirmed to work with RPG Maker MV Version 1.3.3.
 */

var Imported = Imported || {};
Imported.TMBackButton = true;

var TMPlugin = TMPlugin || {};
TMPlugin.BackButton = {};
TMPlugin.BackButton.Parameters = PluginManager.parameters('TMBackButton');

TMPlugin.BackButton.MenuButtonImage = TMPlugin.BackButton.Parameters['menuButtonImage'] || 'menuButton';
TMPlugin.BackButton.BackButtonImage = TMPlugin.BackButton.Parameters['backButtonImage'] || 'backButton';

(function() {

  //-----------------------------------------------------------------------------
  // Window_Selectable
  //

  // Modify the processTouch function
  var _Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
  Window_Selectable.prototype.processTouch = function() {
    if (TouchInput.isTriggered()) {
      var menuButton = SceneManager._scene._menuButtonSprite;
      if (menuButton && menuButton.width) {
        var x = menuButton.x;
        var y = menuButton.y;
        if (TouchInput.x >= x && TouchInput.x < x + menuButton.width &&
          TouchInput.y >= y && TouchInput.y < y + menuButton.height &&
          +menuButton.bitmap.getAlphaPixel(TouchInput.x - x, TouchInput.y - y) > 0) {
        SoundManager.playOk();    
        SceneManager.push(Scene_Menu);
        return;
        }
      }
    }
    if (this.isOpenAndActive() && TouchInput.isTriggered()) {
      var backButton = SceneManager._scene._backButtonSprite;
      if (this.isCancelEnabled() && backButton && backButton.width) {
        var x = backButton.x;
        var y = backButton.y;
        if (TouchInput.x >= x && TouchInput.x < x + backButton.width &&
            TouchInput.y >= y && TouchInput.y < y + backButton.height &&
            +backButton.bitmap.getAlphaPixel(TouchInput.x - x, TouchInput.y - y) > 0) {
          this.processCancel();
          return;
        }
      }
    }
    _Window_Selectable_processTouch.call(this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_create = Scene_Map.prototype.create;
  Scene_Map.prototype.create = function() {
    _Scene_Map_create.call(this);
    this.createMenuButton();
};

  Scene_Map.prototype.createMenuButton = function() {
    this._menuButtonSprite = new Sprite();
    this._menuButtonSprite.bitmap = ImageManager.loadSystem(TMPlugin.BackButton.MenuButtonImage);
    this._menuButtonSprite.x = this.menuButtonX();
    this._menuButtonSprite.y = this.menuButtonY();
    this.addChild(this._menuButtonSprite);
  };



  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMenuButton();
  };

  Scene_Map.prototype.menuButtonX = function() {
    if (Graphics.width < 1056) {
        return Graphics.width - 72 - 4;
    } else {
        return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (48/2);
    }
};
  
  Scene_Map.prototype.menuButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
        return 0 + 4;
    } else {
        return (Graphics.height - Graphics.boxHeight) / 2;
    }
  };

  var _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
  var menuButton = this._menuButtonSprite;
  if (menuButton && menuButton.width) {
    var x = menuButton.x;
    var y = menuButton.y;
    if (TouchInput.x >= x && TouchInput.x < x + menuButton.width &&
      TouchInput.y >= y && TouchInput.y < y + menuButton.height &&
      +menuButton.bitmap.getAlphaPixel(TouchInput.x - x, TouchInput.y - y) > 0) {
      // If the touch event is within the button area, return without processing the map touch
      return;
    }
  }
  // If the touch event is not within the button area, process the map touch as usual
  _Scene_Map_processMapTouch.call(this);
  };
  //-----------------------------------------------------------------------------
  // Scene_MenuBase
  //

  var _Scene_MenuBase_create = Scene_MenuBase.prototype.create;
  Scene_MenuBase.prototype.create = function() {
    _Scene_MenuBase_create.call(this);
    this.createBackButton();
  };

  Scene_MenuBase.prototype.createBackButton = function() {
    this._backButtonSprite = new Sprite();
    this._backButtonSprite.bitmap = ImageManager.loadSystem(TMPlugin.BackButton.BackButtonImage);
    this._backButtonSprite.x = this.backButtonX();
    this._backButtonSprite.y = this.backButtonY();
    this.addChild(this._backButtonSprite);
  };

  Scene_MenuBase.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }  
  };

  Scene_MenuBase.prototype.backButtonY = function() {
    return 0 + 4;
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  Scene_Menu.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }    
  };

  Scene_Menu.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  Scene_Item.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Item.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Skill
  //

  Scene_Skill.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Skill.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Equip
  //

  Scene_Equip.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Equip.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Status
  //

  Scene_Status.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Status.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Options
  //

  Scene_Options.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Options.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Save
  //

  Scene_Save.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Save.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Load
  //

  Scene_Load.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Load.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_GameEnd
  //

  Scene_GameEnd.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_GameEnd.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Shop
  //

  Scene_Shop.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Shop.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

  //-----------------------------------------------------------------------------
  // Scene_Name
  //

  Scene_Name.prototype.backButtonX = function() {
    if (Graphics.width < 1056) {
      return Graphics.width - 96 - 4;
  } else {
      return Graphics.width - ((Graphics.width-Graphics.boxWidth)/4) - (96/2);
  }   
  };

  Scene_Name.prototype.backButtonY = function() {
        if (Graphics.height <= 720 && Graphics.width < 1056) {
      return 0 + 4;
  } else {
      return (Graphics.height - Graphics.boxHeight) / 2;
  }
  };

})();

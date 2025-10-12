//=============================================================================
// MPP_TouchTargetSelect.js
//=============================================================================
// Copyright (c) 2018-2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.9】戦闘時のターゲット選択で、キャラクターをタッチして選択できるようにします。
 * @author 木星ペンギン
 *
 * @help ●タッチ操作によるキャラクター選択
 *  デフォルトと同じです。
 *  マウス/タッチ操作改善プラグイン(MPP_SimpleTouch3.js)導入時のみ、
 *  そちらの操作に準じます。
 * 
 * ●カーソル表示
 *  ▽画像ファイルは system フォルダから読み込まれます。
 *    未設定の場合は自動生成されます。
 * 
 *  ▽カーソルの位置について
 *   0:画面左側にいる場合は右、画面右側にいる場合は左、
 *     左に表示される場合は左右反転されます。
 *   1～9:それぞれテンキーの位置
 * 
 *  ▽幅とレートについて
 *   画像を幅で分割し、レートの速度で左から順に表示します。
 *   幅を 0 にした場合はアニメーションを行いません。
 * 
 *  ▽画像の回転について
 *   0:回転なし, 1:通常の回転, 2:横回転, 3:縦回転
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param === Actor ===
 * 
 * @param Actor Window View?
 * @type boolean
 * @desc アクターの選択ウィンドウを表示するかどうか
 * @default true
 * @parent === Actor ===
 *
 * @param Actor Arrow View?
 * @type boolean
 * @desc アクター選択カーソルを表示するかどうか
 * @default true
 * @parent === Actor ===
 *
 * @param Actor Arrow Name
 * @desc アクター選択カーソルの画像ファイル名
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 * @parent === Actor ===
 *
 * @param Actor Arrow Pos
 * @type number
 * @max 9
 * @desc アクター選択カーソルの表示位置
 * @default 5
 * @parent === Actor ===
 *
 * @param Actor Arrow Width
 * @type number
 * @desc アクター選択カーソルの幅
 * @default 0
 * @parent === Actor ===
 *
 * @param Actor Arrow Rate
 * @type number
 * @desc アクター選択カーソルのアニメーションのレート
 * @default 4
 * @parent === Actor ===
 *
 * @param Actor Arrow Rotation
 * @type number
 * @max 3
 * @desc アクター選択カーソルの回転方向
 * (0:回転なし, 1:通常の回転, 2:横回転, 3:縦回転)
 * @default 1
 * @parent === Actor ===
 *
 * @param Actor Arrow Speed
 * @type number
 * @min -180
 * @max 180
 * @desc アクター選択カーソルの回転速度
 * @default 2
 * @parent === Actor ===
 *
 * @param Actor Arrow Opacity
 * @type number
 * @max 255
 * @desc アクター選択カーソルの不透明度
 * @default 255
 * @parent === Actor ===
 * 
 * @param === Enemy ===
 * 
 * @param Enemy Window View?
 * @type boolean
 * @desc エネミーの選択ウィンドウを表示するかどうか
 * @default true
 * @parent === Enemy ===
 *
 * @param Enemy Arrow View?
 * @type boolean
 * @desc エネミー選択カーソルを表示するかどうか
 * @default true
 * @parent === Enemy ===
 *
 * @param Enemy Arrow Name
 * @desc エネミー選択カーソルの画像ファイル名
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 * @parent === Enemy ===
 *
 * @param Enemy Arrow Pos
 * @type number
 * @max 9
 * @desc エネミー選択カーソルの表示位置
 * @default 5
 * @parent === Enemy ===
 *
 * @param Enemy Arrow Width
 * @type number
 * @desc エネミー選択カーソルの幅
 * @default 0
 * @parent === Enemy ===
 *
 * @param Enemy Arrow Rate
 * @type number
 * @desc エネミー選択カーソルのアニメーションのレート
 * @default 4
 * @parent === Enemy ===
 *
 * @param Enemy Arrow Rotation
 * @type number
 * @max 3
 * @desc エネミー選択カーソルの回転方向
 * (0:回転なし, 1:通常の回転, 2:横回転, 3:縦回転)
 * @default 1
 * @parent === Enemy ===
 *
 * @param Enemy Arrow Speed
 * @type number
 * @min -180
 * @max 180
 * @desc エネミー選択カーソルの回転速度
 * @default 2
 * @parent === Enemy ===
 *
 * @param Enemy Arrow Opacity
 * @type number
 * @max 255
 * @desc エネミー選択カーソルの不透明度
 * @default 255
 * @parent === Enemy ===
 *
 */
var MPP = MPP || {};

(function(exports) {
    'use strict';

const Params = {};

{
    
    let parameters = PluginManager.parameters('MPP_TouchTargetSelect');

    // === Actor ===
    Params.actorWindowView = !!eval(parameters['Actor Window View?']);
    Params.actorArrowView = !!eval(parameters['Actor Arrow View?']);
    Params.actorArrow = {};
    Params.actorArrow.Name = parameters['Actor Arrow Name'];
    Params.actorArrow.Pos = Number(parameters['Actor Arrow Pos'] || 0);
    Params.actorArrow.Width = Number(parameters['Actor Arrow Width'] || 0);
    Params.actorArrow.Rate = Number(parameters['Actor Arrow Rate'] || 4);
    Params.actorArrow.Rotation = Number(parameters['Actor Arrow Rotation'] || 0);
    Params.actorArrow.Speed = Number(parameters['Actor Arrow Speed'] || 0);
    Params.actorArrow.Opacity = Number(parameters['Actor Arrow Opacity'] || 255);

    // === Enemy Arrow ===
    Params.enemyWindowView = !!eval(parameters['Enemy Window View?']);
    Params.enemyArrowView = !!eval(parameters['Enemy Arrow View?']);
    Params.enemyArrow = {};
    Params.enemyArrow.Name = parameters['Enemy Arrow Name'];
    Params.enemyArrow.Pos = Number(parameters['Enemy Arrow Pos'] || 0);
    Params.enemyArrow.Width = Number(parameters['Enemy Arrow Width'] || 0);
    Params.enemyArrow.Rate = Number(parameters['Enemy Arrow Rate'] || 4);
    Params.enemyArrow.Rotation = Number(parameters['Enemy Arrow Rotation'] || 0);
    Params.enemyArrow.Speed = Number(parameters['Enemy Arrow Speed'] || 0);
    Params.enemyArrow.Opacity = Number(parameters['Enemy Arrow Opacity'] || 255);
    
}

const Alias = {};

//-----------------------------------------------------------------------------
// Window_BattleActor

//
if (Window_BattleActor.prototype.hasOwnProperty('cursorDown')) {
    Alias.WiBaAc_cursorDown = Window_BattleActor.prototype.cursorDown;
}
Window_BattleActor.prototype.cursorDown = function(wrap) {
    if (Params.actorWindowView) {
        var _super = Alias.WiBaAc_cursorDown || Window_BattleStatus.prototype.cursorDown;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() + 1) % this.maxItems());
    }
};

//
if (Window_BattleActor.prototype.hasOwnProperty('cursorUp')) {
    Alias.WiBaAc_cursorUp = Window_BattleActor.prototype.cursorUp;
}
Window_BattleActor.prototype.cursorUp = function(wrap) {
    if (Params.actorWindowView) {
        var _super = Alias.WiBaAc_cursorUp || Window_BattleStatus.prototype.cursorUp;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() - 1).mod(this.maxItems()));
    }
};

//
if (Window_BattleActor.prototype.hasOwnProperty('cursorRight')) {
    Alias.WiBaAc_cursorRight = Window_BattleActor.prototype.cursorRight;
}
Window_BattleActor.prototype.cursorRight = function(wrap) {
    if (Params.actorWindowView) {
        var _super = Alias.WiBaAc_cursorRight || Window_BattleStatus.prototype.cursorRight;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() + 1) % this.maxItems());
    }
};

//
if (Window_BattleActor.prototype.hasOwnProperty('cursorLeft')) {
    Alias.WiBaAc_cursorLeft = Window_BattleActor.prototype.cursorLeft;
}
Window_BattleActor.prototype.cursorLeft = function(wrap) {
    if (Params.actorWindowView) {
        var _super = Alias.WiBaAc_cursorLeft || Window_BattleStatus.prototype.cursorLeft;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() - 1).mod(this.maxItems()));
    }
};

//21
Alias.WiBaAc_show = Window_BattleActor.prototype.show;
Window_BattleActor.prototype.show = function() {
    if (Params.actorWindowView) {
        Alias.WiBaAc_show.apply(this, arguments);
    } else {
        this.select(0);
    }
};

//
if (Window_BattleActor.prototype.hasOwnProperty('isTouchedInsideFrame')) {
    Alias.WiBaAc_isTouchedInsideFrame = Window_BattleActor.prototype.isTouchedInsideFrame;
}
Window_BattleActor.prototype.isTouchedInsideFrame = function() {
    if (this._hitActorHandler && this._hitActorHandler())
        return true;
    if (this.visible) {
        var _super = Alias.WiBaAc_isTouchedInsideFrame ||
                Window_BattleStatus.prototype.isTouchedInsideFrame;
        return _super.apply(this, arguments);
    }
    return false;
};

//
if (Window_BattleActor.prototype.hasOwnProperty('hitTest')) {
    Alias.WiBaAc_hitTest = Window_BattleActor.prototype.hitTest;
}
Window_BattleActor.prototype.hitTest = function(x, y) {
    if (this._hitActorHandler) {
        var actor = this._hitActorHandler();
        if (actor) return (this._cursorAll ? 0 : actor.index());
    }
    if (this.visible) {
        var _super = Alias.WiBaAc_hitTest || Window_BattleStatus.prototype.hitTest;
        return _super.apply(this, arguments);
    }
    return -1;
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy

//
if (Window_BattleEnemy.prototype.hasOwnProperty('cursorDown')) {
    Alias.WiBaEn_cursorDown = Window_BattleEnemy.prototype.cursorDown;
}
Window_BattleEnemy.prototype.cursorDown = function(wrap) {
    if (Params.enemyWindowView) {
        var _super = Alias.WiBaEn_cursorDown || Window_Selectable.prototype.cursorDown;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() + 1) % this.maxItems());
    }
};

//
if (Window_BattleEnemy.prototype.hasOwnProperty('cursorUp')) {
    Alias.WiBaEn_cursorUp = Window_BattleEnemy.prototype.cursorUp;
}
Window_BattleEnemy.prototype.cursorUp = function(wrap) {
    if (Params.enemyWindowView) {
        var _super = Alias.WiBaEn_cursorUp || Window_Selectable.prototype.cursorUp;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() - 1).mod(this.maxItems()));
    }
};

//
if (Window_BattleEnemy.prototype.hasOwnProperty('cursorRight')) {
    Alias.WiBaEn_cursorRight = Window_BattleEnemy.prototype.cursorRight;
}
Window_BattleEnemy.prototype.cursorRight = function(wrap) {
    if (Params.enemyWindowView) {
        var _super = Alias.WiBaEn_cursorRight || Window_Selectable.prototype.cursorRight;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() + 1) % this.maxItems());
    }
};

//
if (Window_BattleEnemy.prototype.hasOwnProperty('cursorLeft')) {
    Alias.WiBaEn_cursorLeft = Window_BattleEnemy.prototype.cursorLeft;
}
Window_BattleEnemy.prototype.cursorLeft = function(wrap) {
    if (Params.enemyWindowView) {
        var _super = Alias.WiBaEn_cursorLeft || Window_Selectable.prototype.cursorLeft;
        _super.apply(this, arguments);
    } else {
        this.select((this.index() - 1).mod(this.maxItems()));
    }
};

//58
Alias.WiBaEn_show = Window_BattleEnemy.prototype.show;
Window_BattleEnemy.prototype.show = function() {
    if (Params.enemyWindowView) {
        Alias.WiBaEn_show.apply(this, arguments);
    } else {
        this.select(0);
    }
};

if (Window_BattleEnemy.prototype.hasOwnProperty('isTouchedInsideFrame')) {
    Alias.WiBaEn_isTouchedInsideFrame = Window_BattleEnemy.prototype.isTouchedInsideFrame;
}
Window_BattleEnemy.prototype.isTouchedInsideFrame = function() {
    if (this._hitEnemyHandler && this._hitEnemyHandler())
        return true;
    if (this.visible) {
        var _super = Alias.WiBaEn_isTouchedInsideFrame ||
                Window_Selectable.prototype.isTouchedInsideFrame;
        return _super.apply(this, arguments);
    }
    return false;
};

if (Window_BattleEnemy.prototype.hasOwnProperty('hitTest')) {
    Alias.WiBaEn_hitTest = Window_BattleEnemy.prototype.hitTest;
}
Window_BattleEnemy.prototype.hitTest = function(x, y) {
    if (this._hitEnemyHandler) {
        var enemy = this._hitEnemyHandler();
        if (enemy) return (this._cursorAll ? 0 : this._enemies.indexOf(enemy));
    }
    if (this.visible) {
        var _super = Alias.WiBaEn_hitTest || Window_Selectable.prototype.hitTest;
        return _super.apply(this, arguments);
    }
    return -1;
};

//-----------------------------------------------------------------------------
// Sprite_Battler

Sprite_Battler.prototype.isArrowView = function() {
    return this._battler.isSpriteVisible();
};

//112
Alias.SpBa_updateSelectionEffect = Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    Alias.SpBa_updateSelectionEffect.apply(this, arguments);
    if (this.isArrowView()) {
        if (this._battler.isSelected()) {
            if (!this._mppArrowSprite)
                this.createMppArrowSprite();
            if (this._mppArrowSprite)
                this.updateMppArrowVisibility();
        } else if (this._mppArrowSprite) {
            this._mppArrowSprite.remove();
            this._mppArrowSprite = null;
        }
    }
};

Sprite_Battler.prototype.createMppArrowSprite = function() {
    var sprite = new Sprite_SelectArrow();
    sprite.setup(this._effectTarget, this.mppArrowParams());
    this.parent.addChild(sprite);
    this._mppArrowSprite = sprite;
};

Sprite_Battler.prototype.updateMppArrowVisibility = function() {
    this._mppArrowSprite.visible = true;
};

Sprite_Battler.prototype.isOverlap = function(x, y) {
    if (!this.visible) return false;
    var target = this._effectTarget;
    var tw = Math.abs(target.width * target.scale.x);
    var th = Math.abs(target.height * target.scale.y);
    var sx = this.x - tw * target.anchor.x;
    var sy = this.y - th * target.anchor.y;
    return (x >= sx && y >= sy && x < sx + tw && y < sy + th);
};

//-----------------------------------------------------------------------------
// Sprite_Actor

Sprite_Actor.prototype.isArrowView = function() {
    return Sprite_Battler.prototype.isArrowView.call(this) && Params.actorArrowView;
};

Sprite_Actor.prototype.mppArrowParams = function() {
    return Params.actorArrow;
};

//-----------------------------------------------------------------------------
// Sprite_Enemy

Sprite_Enemy.prototype.isArrowView = function() {
    return Sprite_Battler.prototype.isArrowView.call(this) && Params.enemyArrowView;
};

Sprite_Enemy.prototype.mppArrowParams = function() {
    return Params.enemyArrow;
};

Sprite_Enemy.prototype.updateMppArrowVisibility = function() {
    this._mppArrowSprite.visible = this._appeared;
};

Sprite_Enemy.prototype.isOverlap = function(x, y) {
    return Sprite_Battler.prototype.isOverlap.call(this, x, y) && this._enemy.isAlive();
};

//-----------------------------------------------------------------------------
// Sprite_SelectArrow

function Sprite_SelectArrow() {
    this.initialize.apply(this, arguments);
}

Sprite_SelectArrow.prototype = Object.create(Sprite.prototype);
Sprite_SelectArrow.prototype.constructor = Sprite_SelectArrow;

MPP.Sprite_SelectArrow = Sprite_SelectArrow;

Sprite_SelectArrow.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
};

Sprite_SelectArrow.createArrowBitmap = function() {
    var bitmap = new Bitmap(52, 52);
    var context = bitmap.context;
    context.save();

    context.globalAlpha = 0.8;
    context.lineWidth = 6;
    context.lineCap = 'round';

    var gradient = context.createLinearGradient(3, 0, 49, 0);
    gradient.addColorStop(0, 'rgb(128,0,0)');
    gradient.addColorStop(1, 'rgba(255,128,0,0.75)');
    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(26, 26, 23, 0, 150/180*Math.PI);
    context.stroke();

    var gradient = context.createLinearGradient(3, 0, 49, 0);
    gradient.addColorStop(0, 'rgba(255,128,0,0.75)');
    gradient.addColorStop(1, 'rgb(128,0,0)');
    context.strokeStyle = gradient;

    context.beginPath();
    context.arc(26, 26, 23, Math.PI, 330/180*Math.PI);
    context.stroke();

    context.restore();
    
    bitmap.smooth = true;
    this.arrowBitmap = bitmap;
};

Sprite_SelectArrow.prototype.setup = function(target, params) {
    this._target = target;
    if (params.Name) {
        this.bitmap = ImageManager.loadSystem(params.Name);
    } else {
        this.bitmap = Sprite_SelectArrow.arrowBitmap;
    }
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.opacity = params.Opacity;
    
    this._pos = params.Pos;
    this._width = params.Width;
    this._rate = params.Rate;
    this._rotation = params.Rotation;
    this._speed = params.Speed;
    this._animeCount = 0;
    this._angle = 0;
    this.update();
};

Sprite_SelectArrow.prototype.remove = function() {
    this.parent.removeChild(this);
};

Sprite_SelectArrow.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateAnime();
    this.updateRotation();
    this.updatePos();
};

Sprite_SelectArrow.prototype.updateAnime = function() {
    this._animeCount++;
    var w = this._width;
    if (w > 0) {
        var h = this.height;
        var x = Math.floor(this._animeCount / this._rate) * w;
        var y = 0;
        if (x >= this.bitmap.width) {
            this._animeCount = 0;
            x = 0;
        }
        this.setFrame(x, y, w, h);
    }
};

Sprite_SelectArrow.prototype.updateRotation = function() {
    this._angle += this._speed;
    this._angle = this._angle.mod(360);
    var radian = this._angle * Math.PI / 180;
    switch (this._rotation) {
        case 1:
            this.rotation = radian;
            break;
        case 2:
            this.scale.x = Math.cos(radian);
            break;
        case 3:
            this.scale.y = Math.cos(radian);
            break;
    }
};

Sprite_SelectArrow.prototype.updatePos = function() {
    var target = this._target;
    var pos = this._pos - 1;
    var hw = target.width / 2;
    var hh = target.height / 2;
    var parent = target.parent;
    var grandparent = parent ? parent.parent : null;
    this.x = target.x;
    this.y = target.y;
    if (this.parent === grandparent) {
        this.x += parent.x;
        this.y += parent.y;
    }
    if (pos === -1) {
        if (this.x < Graphics.width / 2) {
            this.x += hw;
            this.scale.x = 1;
        } else {
            this.x -= hw;
            this.scale.x = -1;
        }
        this.y -= hh;
    } else {
        if (pos % 3 === 0) this.x -= hw;
        else if (pos % 3 === 2) this.x += hw;
        if (Math.floor(pos / 3) === 1) this.y -= hh;
        else if (Math.floor(pos / 3) === 2) this.y -= hh * 2;
    }
};


//-----------------------------------------------------------------------------
// Spriteset_Battle

Spriteset_Battle.prototype.hitActor = function() {
    var x = TouchInput.x;
    var y = TouchInput.y;
    var sprites = this._actorSprites;
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].isOverlap(x, y)) return sprites[i]._battler;
    }
    return null;
};

Spriteset_Battle.prototype.hitEnemy = function() {
    var x = TouchInput.x;
    var y = TouchInput.y;
    var sprites = this._enemySprites;
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].isOverlap(x, y)) return sprites[i]._battler;
    }
    return null;
};

//-----------------------------------------------------------------------------
// Scene_Boot

//18
Alias.ScBo_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function() {
    Alias.ScBo_create.apply(this, arguments);
    if (!Params.actorArrow.Name || !Params.enemyArrow.Name)
        Sprite_SelectArrow.createArrowBitmap();
};

//29
Alias.ScBo_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    Alias.ScBo_loadSystemImages.apply(this, arguments);
    if (Params.actorArrow.Name)
        ImageManager.reserveSystem(Params.actorArrow.Name);
    if (Params.enemyArrow.Name)
        ImageManager.reserveSystem(Params.enemyArrow.Name);
};

//-----------------------------------------------------------------------------
// Scene_Battle

//210
Alias.ScBa_createActorWindow = Scene_Battle.prototype.createActorWindow;
Scene_Battle.prototype.createActorWindow = function() {
    Alias.ScBa_createActorWindow.apply(this, arguments);
    this._actorWindow._hitActorHandler = this._spriteset.hitActor.bind(this._spriteset);
};

//217
Alias.ScBa_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
    Alias.ScBa_createEnemyWindow.apply(this, arguments);
    this._enemyWindow._hitEnemyHandler = this._spriteset.hitEnemy.bind(this._spriteset);
};





})(this);

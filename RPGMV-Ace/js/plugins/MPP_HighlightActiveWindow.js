//=============================================================================
// MPP_HighlightActiveWindow.js
//=============================================================================
// Copyright (c) 2017 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.0】現在アクティブなウィンドウを強調表示します。
 * @author 木星ペンギン
 *
 * @help 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Back Blend Color
 * @desc 背景の強調表示の色
 * @default 160,192,192,96
 * 
 * @param Frame Blend Color
 * @desc フレームの強調表示の色
 * @default 160,128,0,224
 * 
 * @param Highlight Type
 * @desc 表示タイプ (0:明滅、1:フラッシュ)
 * @default 0
 * 
 * 
 * 
 */

(function () {

var MPPlugin = { params: PluginManager.parameters('MPP_HighlightActiveWindow') };

MPPlugin.BackBlendColor = MPPlugin.params['Back Blend Color'].split(",").map(Number);
MPPlugin.FrameBlendColor = MPPlugin.params['Frame Blend Color'].split(",").map(Number);
MPPlugin.HighlightType = Number(MPPlugin.params['Highlight Type']);

var Alias = {};

//-----------------------------------------------------------------------------
// Window

//6259
Alias.Wi_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
    Alias.Wi_initialize.call(this);
    this._highlight = false;
    this._highlightCount = 0;
};

Object.defineProperty(Window.prototype, 'highlight', {
    get: function() {
        return this._highlight;
    },
    set: function(value) {
        if (this._highlight !== value) {
            this._highlight = value;
            this._highlightCount = 0;
            this._windowBackSprite.setBlendColor([0,0,0,0]);
            this._windowFrameSprite.setBlendColor([0,0,0,0]);
        }
    },
    configurable: true
});

//6605
Alias.Wi_updateTransform = Window.prototype.updateTransform;
Window.prototype.updateTransform = function() {
    this._updateHighlight();
    Alias.Wi_updateTransform.call(this);
};

Window.prototype._updateHighlight = function() {
    if (this._highlight) {
        if (this._highlightCount % 6 === 0) {
            var color1 = MPPlugin.BackBlendColor.clone();
            var color2 = MPPlugin.FrameBlendColor.clone();
            var alpha = 0;
            if (MPPlugin.HighlightType === 0) {
                alpha = 1 - Math.abs(30 - this._highlightCount % 60) / 30;
            } else {
                alpha = Math.max(1 - this._highlightCount / 60, 0);
            }
            color1[3] *= alpha;
            color2[3] *= alpha;
            this._windowBackSprite.setBlendColor(color1);
            this._windowFrameSprite.setBlendColor(color2);
        }
        this._highlightCount++;
    }
};


//-----------------------------------------------------------------------------
// Window_Selectable

//270
Alias.WiSe_update = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function() {
    Alias.WiSe_update.call(this);
    this.highlight = this.active;
};



})();

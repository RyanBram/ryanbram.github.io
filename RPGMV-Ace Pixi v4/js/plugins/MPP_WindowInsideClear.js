//=============================================================================
// MPP_WindowInsideClear.js
//=============================================================================
// Copyright (c) 2018 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.0】ウィンドウを重ねて表示する際の、下のウィンドウが削除される領域を若干狭めることができます。
 * @author 木星ペンギン
 * 
 * @help 説明文ままのプラグインです。
 *   
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 *
 * @param Inside Width
 * @type number
 * @desc 内側に寄せる幅
 * @default 4
 *
 *
 *
 * 
 */

(function() {

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_WindowInsideClear');
    
    MPPlugin.InsideWidth = Number(parameters['Inside Width'] || 4);
    
})();

//7096
WindowLayer.prototype._canvasClearWindowRect = function(renderSession, window) {
    var rx = this.x + window.x;
    var ry = this.y + window.y + window.height / 2 * (1 - window._openness / 255);
    var rw = window.width;
    var rh = window.height * window._openness / 255;
    
    var iw = MPPlugin.InsideWidth;
    rx += iw;
    ry += iw * window._openness / 255;
    rw -= iw * 2;
    rh -= iw * 2 * window._openness / 255;
    
    renderSession.context.clearRect(rx, ry, rw, rh);
};

//7158
var _WiLa__maskWindow = WindowLayer.prototype._maskWindow;
WindowLayer.prototype._maskWindow = function(window, shift) {
    _WiLa__maskWindow.call(this, window, shift);
    var rect = this._windowRect;
    var iw = MPPlugin.InsideWidth;
    rect.x += iw;
    rect.y += iw * window._openness / 255;
    rect.width -= iw * 2;
    rect.height -= iw * 2 * window._openness / 255;
};








})();

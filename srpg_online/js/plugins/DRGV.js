//=============================================================================
// Esh_Crow Plugin - DRGW (Dynamic Resize the Game Window)
// DRGV.js
// Version: 1.01
//=============================================================================

var Imported = Imported || {};
Imported.ScreenResolution = true;

var Esh_Crow = Esh_Crow || {};
Esh_Crow.ScrRes = Esh_Crow.ScrRes || {};

//=============================================================================
 /*:
 * @plugindesc Dynamic Resize the Game Window
 * @author Esh Crow
 *
 *
 *
 * 
 */
//=============================================================================

Esh_Crow.Parameters = PluginManager.parameters('ScreenResolution');

//=============================================================================
// Scene_Manager
//=============================================================================

SceneManager._screenWidth  =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
SceneManager._screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
SceneManager._boxWidth     =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
SceneManager._boxHeight    = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 

Esh_Crow.ScrRes.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    Esh_Crow.ScrRes.SceneManager_run.call(this, sceneClass);
    if (Utils.isMobileDevice()) return;
    if (Utils.isMobileSafari()) return;
    if (Utils.isAndroidChrome()) return;
		var resizeWidth = Graphics.boxWidth - window.innerWidth;
		var resizeHeight = Graphics.boxHeight - window.innerHeight;
		window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
		window.resizeBy(resizeWidth, resizeHeight);
};

//=============================================================================
// End of File
//=============================================================================

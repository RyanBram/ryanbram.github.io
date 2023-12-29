/*:
 * @target MZ
 * @plugindesc Adjusts screen width based on device aspect ratio with an optional specified screen height.
 * @author RPG Maker Coder
 *
 * @param Screen Height
 * @type number
 * @desc Set the constant screen height (630 is the best), leave blank to disable screen adjustment.
 * @default 
 *
 * @help
 * This plugin adjusts the game's screen width based on the device's aspect ratio using an optional specified screen height. 
*  If the screen height is not specified, the screen adjustment will not be performed.
 */

(() => {
    const pluginName = 'FitScreenOld';
    const parameters = PluginManager.parameters(pluginName);
    const screenHeightParam = parameters['Screen Height'];
    const screenHeight = parseInt(screenHeightParam, 10);
    
    // Make sure always stretch in any supported platform
    Graphics._defaultStretchMode = function() {
        return true;
    };

    // Disable window margin in Mobile device
    Graphics._stretchHeight = function() {
	    if (Utils.isMobileDevice()) {
		    return document.documentElement.clientHeight;
	    } else {
		    return window.innerHeight;
	    }
    };

    function adjustScreenWidth() {
        if (!SceneManager._scene || isNaN(screenHeight)) return;

        const aspectRatio = window.innerWidth / window.innerHeight;
        const screenWidth = Math.round(screenHeight * aspectRatio);

        // Adjusting automatic screen ratio
        Graphics.width = screenWidth;
        Graphics.height = screenHeight;
        Graphics.resize(screenWidth, screenHeight);
        Graphics._updateAllElements();

        // Adjusting scene size
        SceneManager._screenWidth = screenWidth;
        SceneManager._screenHeight = screenHeight;

        // Refreshing title screen whenever screen ratio is changed
        if (SceneManager._scene instanceof Scene_Title) {
            SceneManager.goto(Scene_Title);
        }
    }

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        if (screenHeightParam !== undefined && screenHeightParam !== '') {
            adjustScreenWidth();
        }
    };

    // Handling change in window size
    window.addEventListener('resize', () => {
        if (screenHeightParam !== undefined && screenHeightParam !== '') {
            adjustScreenWidth();
        }
    });
})();
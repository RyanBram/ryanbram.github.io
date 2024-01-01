/*:
 * @target MZ
 * @plugindesc Adjusts screen width based on device aspect ratio with an optional specified screen height.
 * @author RPG Maker Coder
 *
 * @param Dynamic Screen Ratio
 * @type boolean
 * @desc Make screen adaptable with device aspect ratio
 * @default true
 *
 *
 * @help
 * This plugin adjusts the game's screen width based on the device's aspect ratio using an optional specified screen height. 
*  If the screen height is not specified, the screen adjustment will not be performed.
 */

(() => {
    const pluginName = 'DynamicScreen';
    const parameters = PluginManager.parameters(pluginName);
    const dynamicRatio = parameters['Dynamic Screen Ratio'] === 'true';
    
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

    function adjustRatio() {
        if (!dynamicRatio) return;

        const aspectRatio = window.innerWidth / window.innerHeight;
        const minAspectRatio = $dataSystem.advanced.uiAreaWidth / $dataSystem.advanced.uiAreaHeight;

        const screenHeight = $dataSystem.advanced.screenHeight;
        let screenWidth = Math.round(screenHeight * aspectRatio);

        
        if (screenWidth / screenHeight < minAspectRatio) {
            screenWidth = Math.round(screenHeight * minAspectRatio);
        }

        // Adjusting automatic screen ratio
        Graphics.width = screenWidth;
        Graphics.height = screenHeight;
        Graphics.resize(screenWidth, screenHeight);
        Graphics._updateAllElements();

        if (SceneManager._scene instanceof Scene_Title) {
            SceneManager.goto(Scene_Title);
        }

    }

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        if (dynamicRatio) {
            adjustRatio();
        }
    };

    // Handling change in window size
    window.addEventListener('resize', () => {
        if (dynamicRatio) {
            adjustRatio();
        }
    });
})();
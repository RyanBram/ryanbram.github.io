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
	    if (Utils.isMobileDevice()){//&& !window.cordova) {
		    return document.documentElement.clientHeight;
	    } else {
		    return window.innerHeight;
	    }
    };

    function adjustRatio() {
        if (!dynamicRatio) return;

        // Check if $dataSystem or $dataSystem.advanced is null
        if (!$dataSystem || !$dataSystem.advanced) return;

        // Detecting device aspect ratio
        const aspectRatio = window.innerWidth / window.innerHeight;
        // Calculating UI aspect ratio
        const minAspectRatio = $dataSystem.advanced.uiAreaWidth / $dataSystem.advanced.uiAreaHeight;

        const screenHeight = $dataSystem.advanced.screenHeight;
        // Calculating screen width based on aspect ratio
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

        // Refresh the map scene if the current scene is a map
        if (SceneManager._scene instanceof Scene_Map) {
            $gameScreen.clearZoom();
        }

    }

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        if (dynamicRatio) {
            adjustRatio();
        }
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
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
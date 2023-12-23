/*:
 * @target MZ
 * @plugindesc Adjusts screen width based on device aspect ratio with an optional specified screen height and enables fullscreen in NWJS.
 * @author RPG Maker Coder
 *
 * @param Screen Height
 * @type number
 * @desc Set the constant screen height, leave blank to disable screen adjustment.
 * @default 
 *
 * @help
 * This plugin adjusts the game's screen width based on the device's aspect ratio using an optional specified screen height and enables fullscreen in NWJS. If the screen height is not specified, the screen adjustment will not be performed.
 */

(() => {
    const pluginName = 'FitScreen';
    const parameters = PluginManager.parameters(pluginName);
    const screenHeightParam = parameters['Screen Height'];
    const screenHeight = parseInt(screenHeightParam, 10);

    Graphics._defaultStretchMode = function() {
        return true;
    };

    Graphics._stretchHeight = function() {
	    if (Utils.isMobileDevice()) {
		    // [Note] Mobile browsers often have special operations at the top and
		    //   bottom of the screen.
		    return document.documentElement.clientHeight;
	    } else {
		    return window.innerHeight;
	    }
    };

    function adjustScreenWidth() {
        if (!SceneManager._scene || isNaN(screenHeight)) return;

        const aspectRatio = window.innerWidth / window.innerHeight;
        const screenWidth = Math.round(screenHeight * aspectRatio);

        // Menyesuaikan ukuran layar
        Graphics.width = screenWidth;
        Graphics.height = screenHeight;
        Graphics.resize(screenWidth, screenHeight);
        Graphics._updateAllElements();

        // Menyesuaikan ukuran scene
        SceneManager._screenWidth = screenWidth;
        SceneManager._screenHeight = screenHeight;

        // Periksa dan muat ulang Title Screen jika diperlukan
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

    // Menangani perubahan ukuran jendela
    window.addEventListener('resize', () => {
        if (screenHeightParam !== undefined && screenHeightParam !== '') {
            adjustScreenWidth();
        }
    });
})();
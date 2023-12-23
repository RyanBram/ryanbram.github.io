/*:
 * @target MZ
 * @plugindesc Adjusts screen width based on device aspect ratio with a specified screen height and enables fullscreen in NWJS.
 * @author RPG Maker Coder
 *
 * @param Screen Height
 * @type number
 * @desc Set the constant screen height
 * @default 624
 *
 * @help
 * This plugin adjusts the game's screen width based on the device's aspect ratio using a specified screen height and enables fullscreen in NWJS.
 */

(() => {
    const pluginName = 'FitScreen';
    const parameters = PluginManager.parameters(pluginName);
    const screenHeight = parseInt(parameters['Screen Height']) || 624;

    function adjustScreenWidth() {
        if (!SceneManager._scene) return;

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
        adjustScreenWidth();
    };

    // Menangani perubahan ukuran jendela
    window.addEventListener('resize', () => {
        adjustScreenWidth();
    });
})();
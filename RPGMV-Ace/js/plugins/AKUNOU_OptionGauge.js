//=============================================================================
// AKUNOU_OptionGauge.js
// Version: 1.01
// ----------------------------------------------------------------------------
// 河原 つつみ
// 連絡先 ：『アクマの脳髄』http://www.akunou.com/
//=============================================================================

/*:
 * @plugindesc Draws a gauge for some items represented by numbers in the options.
 * @author Tsutumi Kawahara
 *
 * @param Gauge Color 1
 * @desc Color 1 used for the gauge gradient.
 * Each number is R (red), G (green), B (blue), A (alpha value).
 * @default 255, 204, 32, 255
 *
 * @param Gauge Color 2
 * @desc Color 2 used for the gauge gradient.
 * Each number is R (red), G (green), B (blue), A (alpha value).
 * @default 255, 255, 160, 255
 *
 * @param Gauge Color R 1
 * @desc Color 1 used for the R value gauge gradient.
 * Only necessary if using the window color option.
 * @default 255, 96, 96, 255
 *
 * @param Gauge Color R 2
 * @desc Color 2 used for the R value gauge gradient.
 * Only necessary if using the window color option.
 * @default 255, 192, 192, 255
 *
 * @param Gauge Color G 1
 * @desc Color 1 used for the G value gauge gradient.
 * Only necessary if using the window color option.
 * @default 96, 255, 96, 255
 *
 * @param Gauge Color G 2
 * @desc Color 2 used for the G value gauge gradient.
 * Only necessary if using the window color option.
 * @default 192, 255, 192, 255
 *
 * @param Gauge Color B 1
 * @desc Color 1 used for the B value gauge gradient.
 * Only necessary if using the window color option.
 * @default 96, 96, 255, 255
 *
 * @param Gauge Color B 2
 * @desc Color 2 used for the B value gauge gradient.
 * Only necessary if using the window color option.
 * @default 192, 192, 255, 255
 *
 * @help
 * Plugin command:
 *   Not necessary
 * This is a script that is applied just by turning the plugin ON.
 */

(function() {

	var parameters = PluginManager.parameters('AKUNOU_OptionGauge');
	var gaugeColor1 = 'rgba(' + parameters['Gauge Color 1'] + ')';
	var gaugeColor2 = 'rgba(' + parameters['Gauge Color 2'] + ')';
	var gaugeColorR1 = 'rgba(' + parameters['Gauge Color R 1'] + ')';
	var gaugeColorR2 = 'rgba(' + parameters['Gauge Color R 2'] + ')';
	var gaugeColorG1 = 'rgba(' + parameters['Gauge Color G 1'] + ')';
	var gaugeColorG2 = 'rgba(' + parameters['Gauge Color G 2'] + ')';
	var gaugeColorB1 = 'rgba(' + parameters['Gauge Color B 1'] + ')';
	var gaugeColorB2 = 'rgba(' + parameters['Gauge Color B 2'] + ')';

	//-------------------------------------------------------------------------
	// Window_Options
	//-------------------------------------------------------------------------

	var akunou10_drawItem = Window_Options.prototype.drawItem;

	Window_Options.prototype.drawItem = function(index) {
		var symbol = this.commandSymbol(index);
		if (this.isVolumeSymbol(symbol) || this.isHexSymbol(symbol)) {
			if (this.isVolumeSymbol(symbol)) {
				var max = 100;
			} else if (this.isOpacitySymbol(symbol)) {
				var max = 255;
			} else if (this.isColorSymbol(symbol)) {
				var max = 510;
			}
			var value = this.getConfigValue(symbol);
			var rect = this.itemRectForText(index);
			var statusWidth = this.statusWidth();
			if (this.isColorSymbol(symbol)) {
				if (symbol === 'windowColorRHex') {
					this.drawGauge(rect.width - statusWidth, rect.y, statusWidth, (value + 255) / max, gaugeColorR1, gaugeColorR2);
				} else if (symbol === 'windowColorGHex') {
					this.drawGauge(rect.width - statusWidth, rect.y, statusWidth, (value + 255) / max, gaugeColorG1, gaugeColorG2);
				} else if (symbol === 'windowColorBHex') {
					this.drawGauge(rect.width - statusWidth, rect.y, statusWidth, (value + 255) / max, gaugeColorB1, gaugeColorB2);
				}
			} else {
				this.drawGauge(rect.width - statusWidth, rect.y, statusWidth, value / max, gaugeColor1, gaugeColor2);
			}
		}
		akunou10_drawItem.call(this, index);
	};

})();

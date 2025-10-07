//=============================================================================
// AKUNOU_OptionWindowColor.js
// Version: 1.00
// ----------------------------------------------------------------------------
// 河原 つつみ
// 連絡先 ：『アクマの脳髄』http://www.akunou.com/
//=============================================================================

/*:
 * @plugindesc オプションにウィンドウ透明度の変更を追加します。
 * 動作には同作者のオプションベーススクリプトが必須です。
 * @author Tsutumi Kawahara
 *
 * @param Window Color R Term
 * @desc ウィンドウカラーRのオプション画面での表示名を変更します。
 * @default ウィンドウ R
 *
 * @param Window Color G Term
 * @desc ウィンドウカラーGのオプション画面での表示名を変更します。
 * @default ウィンドウ G
 *
 * @param Window Color B Term
 * @desc ウィンドウカラーBのオプション画面での表示名を変更します。
 * @default ウィンドウ B
 *
 * @param Window Color Offset
 * @desc ウィンドウカラーのオフセット値。
 * @default 17
 *
 * @param Window Color R Default
 * @desc ウィンドウカラーRのデフォルト値。
 * -255～255の間で設定して下さい。
 * @default 0
 *
 * @param Window Color G Default
 * @desc ウィンドウカラーGのデフォルト値。
 * -255～255の間で設定して下さい。
 * @default 0
 *
 * @param Window Color B Default
 * @desc ウィンドウカラーBのデフォルト値。
 * -255～255の間で設定して下さい。
 * @default 0
 *
 * @help
 * プラグインコマンド:
 *   必要なし
 * プラグイン ON にするだけで適用されるスクリプトです。
 * 仕様上、本体側で設定したウィンドウカラーは無視されますので、
 * こちらのプラグイン側で初期値を入力して下さい。
 */

(function() {

	var parameters = PluginManager.parameters('AKUNOU_OptionWindowColor');
	var windowColorRText = parameters['Window Color R Term'];
	var windowColorGText = parameters['Window Color G Term'];
	var windowColorBText = parameters['Window Color B Term'];
	var windowColorOffset = Number(parameters['Window Color Offset']);
	var windowColorRDefault = Number(parameters['Window Color R Default']);
	var windowColorGDefault = Number(parameters['Window Color G Default']);
	var windowColorBDefault = Number(parameters['Window Color B Default']);

	//-------------------------------------------------------------------------
	// ConfigManager
	//-------------------------------------------------------------------------

	ConfigManager.windowColorRHex = windowColorRDefault;
	ConfigManager.windowColorGHex = windowColorGDefault;
	ConfigManager.windowColorBHex = windowColorBDefault;

	var akunou11_makeExtraData = ConfigManager.makeExtraData;
	
	ConfigManager.makeExtraData = function(config) {
		akunou11_makeExtraData.call(this, config);
		config.windowColorRHex = this.windowColorRHex;
		config.windowColorGHex = this.windowColorGHex;
		config.windowColorBHex = this.windowColorBHex;
		return config;
	};

	var akunou11_applyData = ConfigManager.applyData;

	ConfigManager.applyData = function(config) {
		akunou11_applyData.call(this, config);
		this.windowColorRHex = this.readWindowColor(config, 'windowColorRHex');
		this.windowColorGHex = this.readWindowColor(config, 'windowColorGHex');
		this.windowColorBHex = this.readWindowColor(config, 'windowColorBHex');
	};
	
	ConfigManager.readWindowColor = function(config, name) {
		var value = config[name];
		if (value !== undefined) {
			return Number(value).clamp(-255, 255);
		} else {
			if (name === 'windowColorRHex') {
				return windowColorRDefault;
			} else if (name === 'windowColorGHex') {
				return windowColorGDefault;
			} else if (name === 'windowColorBHex') {
				return windowColorBDefault;
			}
		}
	};

	//-------------------------------------------------------------------------
	// Window_Base
	//-------------------------------------------------------------------------

	Window_Base.prototype.updateTone = function() {
		this.setTone(ConfigManager['windowColorRHex'],
			ConfigManager['windowColorGHex'],
			ConfigManager['windowColorBHex']);
	};

	//-------------------------------------------------------------------------
	// Window_Options
	//-------------------------------------------------------------------------

    var akunou11_addExtraOptions = Window_Options.prototype.addExtraOptions;

	Window_Options.prototype.addExtraOptions = function() {
		this.addCommand(windowColorRText, 'windowColorRHex');
		this.addCommand(windowColorGText, 'windowColorGHex');
		this.addCommand(windowColorBText, 'windowColorBHex');
		akunou11_addExtraOptions.call(this);
	};

	Window_Options.prototype.colorOffset = function() {
    	if (windowColorOffset <= 0) {
			return 1;
		}
		return windowColorOffset;
	};

	var akunou11_setConfigValue = Window_Options.prototype.setConfigValue;

	Window_Options.prototype.setConfigValue = function(symbol, volume) {
		akunou11_setConfigValue.call(this, symbol, volume);
		this.updateTone();
	};

	var akunou11_defaultAll = Window_Options.prototype.defaultAll;

	Window_Options.prototype.defaultAll = function() {
		akunou11_defaultAll.call(this);
		this.changeValue('windowColorRHex', windowColorRDefault);
		this.changeValue('windowColorGHex', windowColorGDefault);
		this.changeValue('windowColorBHex', windowColorBDefault);
	};

})();

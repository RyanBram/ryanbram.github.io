// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"YEP_CoreEngine","status":true,"description":"v1.31 Needed for the majority of Yanfly Engine Scripts. Also\r\ncontains bug fixes found inherently in RPG Maker.","parameters":{"---Screen---":"","Screen Width":"","Screen Height":"","Scale Battlebacks":"true","Scale Title":"true","Scale Game Over":"true","Open Console":"false","Reposition Battlers":"true","GameFont Load Timer":"0","Update Real Scale":"false","Collection Clear":"true","---Gold---":"","Gold Max":"99999999","Gold Font Size":"20","Gold Icon":"313","Gold Overlap":"A lotta","---Items---":"","Default Max":"99","Quantity Text Size":"20","---Parameters---":"","Max Level":"99","Actor MaxHP":"9999","Actor MaxMP":"9999","Actor Parameter":"999","Enemy MaxHP":"999999","Enemy MaxMP":"9999","Enemy Parameter":"999","---Battle---":"","Animation Rate":"4","Flash Target":"false","Show Events Transition":"true","Show Events Snapshot":"true","---Map Optimization---":"","Refresh Update HP":"true","Refresh Update MP":"true","Refresh Update TP":"false","---Font---":"","Chinese Font":"SimHei, Heiti TC, sans-serif","Korean Font":"Dotum, AppleGothic, sans-serif","Default Font":"GameFont, Verdana, Arial, Courier New","Font Size":"28","Text Align":"left","---Windows---":"","Digit Grouping":"true","Line Height":"36","Icon Width":"32","Icon Height":"32","Face Width":"144","Face Height":"144","Window Padding":"18","Text Padding":"6","Window Opacity":"192","Gauge Outline":"true","Gauge Height":"6","Menu TP Bar":"true","---Window Colors---":"","Color: Normal":"0","Color: System":"16","Color: Crisis":"17","Color: Death":"18","Color: Gauge Back":"19","Color: HP Gauge 1":"20","Color: HP Gauge 2":"21","Color: MP Gauge 1":"22","Color: MP Gauge 2":"23","Color: MP Cost":"23","Color: Power Up":"24","Color: Power Down":"25","Color: TP Gauge 1":"28","Color: TP Gauge 2":"29","Color: TP Cost Color":"29"}},
{"name":"YEP_FpsSynchOption","status":true,"description":"v1.03 Adds a new command to Options menu for synching\nthe FPS of moniters with higher FPS rates.","parameters":{"Command Name":"Synch Monitor FPS","Default Setting":"false"}},
{"name":"YEP_BattleEngineCore","status":true,"description":"v1.50 Have more control over the flow of the battle system\nwith this plugin and alter various aspects to your liking.","parameters":{"---General---":"","Action Speed":"agi","Default System":"dtb","---Escape---":"","Escape Ratio":"0.5 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.10","---Animation---":"","Animation Base Delay":"0","Animation Next Delay":"0","Certain Hit Animation":"0","Physical Animation":"52","Magical Animation":"51","Enemy Attack Animation":"39","Reflect Animation":"42","Motion Waiting":"false","---Frontview---":"","Front Position X":"Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index","Front Position Y":"Graphics.boxHeight - 180","Front Actor Sprite":"false","Front Sprite Priority":"1","---Sideview---":"","Home Position X":"screenWidth - 16 - (maxSize + 2) * 32 + index * 32","Home Position Y":"screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 32","Side Sprite Priority":"1","---Sprites---":"","Default X Anchor":"0.50","Default Y Anchor":"1.00","Step Distance":"48","Flinch Distance":"12","Show Shadows":"true","---Damage Popups---":"","Popup Duration":"128","Newest Popup Bottom":"true","Popup Overlap Rate":"0.9","Critical Popup":"255, 0, 0, 160","Critical Duration":"60","---Tick-Settings---":"","Timed States":"false","Timed Buffs":"false","Turn Time":"100","AI Self Turns":"true","---Window Settings---":"","Lower Windows":"true","Window Rows":"4","Command Window Rows":"4","Command Alignment":"center","Start Actor Command":"true","Current Max":"false","---Selection Help---":"","Mouse Over":"true","Select Help Window":"true","User Help Text":"User","Ally Help Text":"Ally","Allies Help Text":"Allies","Enemy Help Text":"Enemy","Enemies Help Text":"Enemies","All Help Text":"All %1","Random Help Text":"%2 Random %1","---Enemy Select---":"","Visual Enemy Select":"true","Show Enemy Name":"true","Show Select Box":"false","Enemy Font Size":"20","Enemy Auto Select":"this.furthestRight()","---Actor Select---":"","Visual Actor Select":"true","---Battle Log---":"","Show Emerge Text":"false","Show Pre-Emptive Text":"true","Show Surprise Text":"true","Optimize Speed":"true","Show Action Text":"false","Show State Text":"false","Show Buff Text":"false","Show Counter Text":"true","Show Reflect Text":"true","Show Substitute Text":"true","Show Fail Text":"false","Show Critical Text":"false","Show Miss Text":"false","Show Evasion Text":"false","Show HP Text":"false","Show MP Text":"false","Show TP Text":"false"}},
{"name":"YEP_X_ActSeqPack1","status":true,"description":"v1.13 (Requires YEP_BattleEngineCore.js) Basic functions are\nadded to the Battle Engine Core's action sequences.","parameters":{"Default Volume":"90","Default Pitch":"100","Default Pan":"0"}},
{"name":"YEP_X_ActSeqPack2","status":true,"description":"v1.12 (Requires YEP_BattleEngineCore.js) Visual functions\nare added to the Battle Engine Core's action sequences.","parameters":{}},
{"name":"YEP_X_ActSeqPack3","status":true,"description":"v1.05 (Requires YEP_BattleEngineCore.js) Camera control is\nadded to the Battle Engine Core's action sequences.","parameters":{"Camera Option":"Battle Camera"}},
{"name":"--KADOKAWA Plugins-----","status":false,"description":"----------------------------------------------------------------------","parameters":{}},
{"name":"MadeWithMv","status":true,"description":"メイン画面へ進む前に、\"Made with MV\"のスプラッシュ画面もしくはカスタマイズされたスプラッシュ画面を表示します。","parameters":{"Show Made With MV":"true","Made with MV Image":"MadeWithMv","Show Custom Splash":"false","Custom Image":"","Fade Out Time":"40","Fade In Time":"40","Wait Time":"80"}},
{"name":"Community_Basic","status":true,"description":"Plugin used to set basic parameters.","parameters":{"cacheLimit":"10","screenWidth":"1110","screenHeight":"624","changeWindowWidthTo":"","changeWindowHeightTo":"","renderingMode":"webgl","alwaysDash":"off"}},
{"name":"SimpleMsgSideView","status":true,"description":"サイドビューバトルで技/アイテムの名前のみ表示します。","parameters":{"displayAttack":"0","position":"1"}},
{"name":"--SRPG Plugins--------","status":false,"description":"----------------------------------------------------------------------","parameters":{}},
{"name":"SRPG_core","status":true,"description":"SRPG battle system (tactical battle system) on map.","parameters":{"srpgTroopID":"1","srpgBattleSwitchID":"1","existActorVarID":"1","existEnemyVarID":"2","turnVarID":"3","activeEventID":"4","targetEventID":"5","defaultMove":"4","srpgBattleExpRate":"0.4","srpgBattleExpRateForActors":"0.1","srpgBattleQuickLaunch":"true","srpgActorCommandEquip":"true","srpgBattleEndAllHeal":"true","srpgStandUnitSkip":"true","srpgPredictionWindowMode":"1","srpgAutoBattleStateId":"14","srpgBestSearchRouteSize":"30","srpgDamageDirectionChange":"true","enemyDefaultClass":"Enemy","textSrpgEquip":"Equip","textSrpgMove":"Move","textSrpgRange":"Range","textSrpgWait":"Wait","textSrpgTurnEnd":"End Turn","textSrpgAutoBattle":"Auto Battle"}},
{"name":"SRPG_ImmediateSkill","status":true,"description":"ターンを消費しないスキルを作れるようにします。","parameters":{}},
{"name":"SRPG_AgiAttackPlus","status":true,"description":"SRPGコンバータで敏捷が高い方が2回攻撃する仕様に変更します。","parameters":{"srpgAgilityAffectsRatio":"2","AAPwithYEP_BattleEngineCore":"true"}},
{"name":"--Other Plugins--------","status":false,"description":"----------------------------------------------------------------------","parameters":{}},
{"name":"AudioStreaming","status":true,"description":"Load audio faster and use only ogg files.","parameters":{"mode":"10","deleteM4a":"false"}},
{"name":"YEP_X_BattleObject","status":true,"description":"Adding \"Battle Object\" to Yanfly Action Sequence","parameters":{}},
{"name":"CXJ_Exit","status":true,"description":"Adds an exit option to desktop versions of the game","parameters":{"Text - Exit":"Exit","Text - To Desktop":"Exit","Add to title":"true","Add to Game End":"true"}},
{"name":"RS_MessageAlign","status":true,"description":"(v1.0.12) This plugin allows you to align the text in the message system.","parameters":{}},
{"name":"Fullscreen_Options","status":true,"description":"v1.1 Add fullscreen option, force fullscreen in Stretch Mode and disable F3.","parameters":{"fullscreenOptionName":"Fullscreen","forceFullscreen":"false","Add command to option?":"false","Disable F3?":"true","Disable F4?":"false"}},
{"name":"ChangeWindowTouchPolicy","status":true,"description":"Change Window Touch Policy","parameters":{"ActionOutsideFrame":"cancel"}},
{"name":"Irina_PerformanceUpgrade","status":true,"description":"<PerformanceUpgrade> for RPG Maker MV version 1.6.2.","parameters":{"":"","AnimationHue":"true","BlurMenuBackground":"true","BlurIntensity":"0.5","CacheTextColors":"true","EnemyHue":"true","PixiContainerFlush":"true","SkipUnnecessarySnapshots":"true"}}
];
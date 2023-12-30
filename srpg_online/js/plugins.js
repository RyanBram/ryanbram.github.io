// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"PluginCommonBase","status":true,"description":"Plugin Analysis Common Base","parameters":{}},
{"name":"StartUpFullScreen","status":true,"description":"Full Screen Startup Plugin","parameters":{"Shutdown":"Exit","DefaultFullScreen":"true","Immediate":"true","StartUpFullScreen":"Fullscreen","UseGameEnd":"true"}},
{"name":"DynamicScreen","status":true,"description":"Adjusts screen width based on device aspect ratio with an optional specified screen height.","parameters":{"Screen Width":"816","Screen Height":"630","Keep Aspect Ratio":"false"}},
{"name":"SingleTouchMenu","status":true,"description":"Enables single touch selection for menu items in RPG Maker MZ while preserving swipe scrolling and mouse functionality.","parameters":{}},
{"name":"MPP_ToneDownDeactiveWindow","status":true,"description":"Makes the inactive window where the cursor is displayed less noticeable.","parameters":{"Excluded Window Classes":"[\"Window_BattleStatus\",\"Window_NameEdit\"]"}},
{"name":"MPP_Pseudo3DBattle","status":true,"description":"A function to move the camera three-dimensionally during battle is added.","parameters":{"Battleback Scale":"1.3","Battleback2 Pivot Y Fixes":"[\"{\\\"Battleback2 Image\\\":\\\"Town2\\\",\\\"Pivot Y\\\":\\\"182\\\"}\"]"}},
{"name":"SRPG_core_MZ","status":true,"description":"SRPG battle system (tactical battle system) for RPG maker(tkool) MV based on SRPG converter MV.","parameters":{"BasicParam":"全体にかかわる基本的な機能","WithYEP_BattleEngineCore":"false","srpgTroopID":"1","srpgBattleSwitchID":"1","existActorVarID":"1","existEnemyVarID":"2","turnVarID":"3","activeEventID":"4","targetEventID":"5","battleDistanceID":"6","MapBattle(skip battle scene)":"Map battle settings","Use Map Battle":"1","Map Battle Switch":"3","Animation Delay":"-1","BattleBasicParam":"戦闘で使用する基本的数値","defaultMove":"4","srpgBattleExpRate":"0.4","srpgBattleExpRateForActors":"0.1","srpgAutoBattleStateId":"14","maxActorVarID":"0","srpgBestSearchRouteSize":"25","BattleExtensionParam":"戦闘の拡張的な機能","srpgActorCommandList":"attack,skill,item,equip,wait","srpgActorCommandOriginalId":"46","srpgMenuCommandList":"turnEnd,autoBattle,winLose,item,status,options,save,gameEnd","srpgPredictionWindowMode":"1","useAgiAttackPlus":"true","srpgAgilityAffectsRatio":"2","srpgAgiAttackPlusPayCost":"1","srpgBattleOrder":"1","srpgBattleReaction":"1","srpgDefaultReactionSkill":"2","srpgBattleQuickLaunch":"true","srpgNotShowUpDeadActor":"false","srpgBattleEndAllHeal":"true","srpgDamageDirectionChange":"true","srpgSkipTargetForSelf":"true","srpgRangeTerrainTag7":"true","SRPGTerm":"SRPG戦闘で使用する用語","enemyDefaultClass":"Enemy","textSrpgEquip":"Weapon","textSrpgNone":"None","textSrpgMove":"Move","textSrpgRange":"Range","textSrpgWait":"Wait","textSrpgWinLoseCondition":"Objectives","textSrpgWinCondition":"Victory Condition","textSrpgLoseCondition":"Defeat Condition","textSrpgTurnEnd":"End Turn","textSrpgAutoBattle":"Auto Battle","textSrpgDamage":"Damage","textSrpgHealing":"Healing","textSrpgOptMapBattle":"Map Battle","SRPGFiles":"SRPG戦闘で使用する画像やＳＥの設定","srpgSet":"!srpg_set","Path Image":"srpgPath","rewardSound":"Item3","expSound":"Up4"}},
{"name":"SRPG_RangeControl_MZ","status":true,"description":"SRPG line of sight, passability, variable range, and more, edited by OhisamaCraft.","parameters":{"Range":"","Default Range":"1","Default Min Range":"0","Line of Sight":"","Through Objects":"false","Through Opponents":"false","Through Friends":"true","Through Events":"true","Through Terrain":"7","Unit Passability":"","Block Friends":"false","Block Opponents":"true","Event Passability":"","Block Units":"false","Zone of Control":"","Base ZoC":"0","Base Through ZoC":"0","Terrain Cost":"","Terrain 0 Cost":"1.00","Terrain 1 Cost":"1.00","Terrain 2 Cost":"1.00","Terrain 3 Cost":"1.00","Terrain 4 Cost":"1.00","Terrain 5 Cost":"1.00","Terrain 6 Cost":"1.00","Terrain 7 Cost":"1.00"}},
{"name":"SRPG_PositionEffects_MZ","status":true,"description":"SRPG extension for movement and positioning skills, edited by OhisamaCraft.","parameters":{}},
{"name":"SRPG_AoE_MZ","status":true,"description":"SRPG area-of-effect skills, edited by OhisamaCraft.","parameters":{"AoE Color":"DarkOrange","Show One Square AoE":"false","Refocus Camera":"false"}},
{"name":"SRPG_AIControl_MZ","status":true,"description":"SRPG advanced AI (v0.9), edited by OhisamaCraft.","parameters":{"Target Formula":"1","Move Formula":"nearestOpponent"}},
{"name":"SRPG_AuraSkill_MZ","status":true,"description":"This plugin allows you to create Aura skills for SRPG battle. Place it below all SRPG plugins for best compatibility, edited by OhisamaCraft.","parameters":{"max range":"3","default range":"2","default target":"friend","default shape":"circle","Aura color":"green","show Aura color":"true"}},
{"name":"SRPG_UX_Windows_MZ","status":true,"description":"SRPG window improvements, edited by OhisamaCraft.","parameters":{"Hide No Rewards":"true","Hide Self Target":"true"}},
{"name":"SRPG_BattlePrepare_MZ","status":true,"description":"Add battle Prepare phase at the beginning of SRPG battle, edited by OhisamaCraft.","parameters":{"disable actor prepare command":"true","auto open menu":"true","textBattlerNumber":"Units","textFinishPrepare":"Start Battle","textFormation":"Unit Selection","textPosition":"Formation","textPrepareEvent":"Prepare","textExchange":"Exchange","textStatus":"Status","textRemove":"Remove","lockIconIndex":"195"}},
{"name":"SRPG_BattleUI_MZ","status":true,"description":"SRPG Battle UI adjustment, edited by Shoukang and Ohisama Craft.","parameters":{"useTurnWindow":"false","textTurn":"turn"}},
{"name":"SRPG_DispHPOnMap_MZ","status":true,"description":"v1.01 SRPG戦闘中、マップでもHPが確認できるようになるプラグイン(おひさまクラフトによる改変あり)。","parameters":{"actorHPColor1":"20","actorHPColor2":"21","enemyHPColor1":"22","enemyHPColor2":"23"}},
{"name":"SRPG_MoveMethod_MZ","status":true,"description":"More move modes and improved pathfinding that can handle all conditions! , edited by OhisamaCraft.","parameters":{"search range":"40","confusion move rate":"3","enable fall back":"true"}},
{"name":"SRPG_ShowPath_MZ","status":true,"description":"SRPG move path indicator, edited by OhisamaCraft.","parameters":{"Path Blend Mode":"0","Path Opacity":"255","Path Layer":"2","Max Path Length":"99"}},
{"name":"SRPG_Summon_MZ","status":true,"description":"Allow you to summon/enemy/objects during SRPG battle. v 1.04 Fix a bug for wrong action subject, edited by OhisamaCraft.","parameters":{"Summon Map Id":"1","summon appear Animation Id":"121","summon disappear Animation Id":"122"}},
{"name":"SRPG_UX_Cursor_MZ","status":true,"description":"SRPG cursor, movement, and selection upgrades, edited by OhisamaCraft.","parameters":{"Cursor-Style Movement":"true","Cursor Delay":"2","Cursor Speed":"5","Animate Cursor":"false","Animate Delay":"15","Start On Next Actor":"true","Switch Actor While Moving":"true","Quick Attack":"true","Quick Target Switch":"true","Quick Switch From Preview":"false","Auto Target":"true","Auto Select":"0"}},
{"name":"SRPG_MouseOperation_MZ","status":true,"description":"SRPG mouse operation improvements, modified by OhisamaCraft","parameters":{"borderMoveSettings":"","borderSwitch":"0","borderDistance1":"55","scrollSpeed1":"3.5","useSecondSpeed":"true","borderDistance2":"15","scrollSpeed2":"5.5","dragScrollSettings":"","dragSwitch":"1","dragSpeed":"2","cursorFollowMouse":"","isCursorFollowMouse":"true","useCenteringFeature":"true","centerCameraDelay":"800","wheelSettings":"","isWheelPrevNext":"true","isWheelCenter":"true"}},
{"name":"SRPG_MouseOperation_MZ - new","status":false,"description":"SRPG mouse operation improvements, modified by OhisamaCraft","parameters":{"borderMoveSettings":"","borderSwitch":"0","borderDistance1":"55","scrollSpeed1":"3.5","useSecondSpeed":"true","borderDistance2":"15","scrollSpeed2":"5.5","dragScrollSettings":"","dragSwitch":"1","dragSpeed":"2","cursorFollowMouse":"","isCursorFollowMouse":"true","useCenteringFeature":"true","centerCameraDelay":"800","wheelSettings":"","isWheelPrevNext":"true","isWheelCenter":"true"}},
{"name":"EliMZ_Book","status":false,"description":"♦5.0.2♦ Essential plugin for all Eli plugins.","parameters":{"engine":"{\"pixelPerfect\":\"false\",\"styleOverflow\":\"false\",\"disableEffekseer\":\"false\",\"--- BUG FIXES ---\":\"\",\"fixBitmapStartLoad\":\"true\"}","playtest":"{\"openDevTools\":\"false\",\"nwWindowPos\":\"0, 0\",\"--- MZ ONLY ---\":\"\",\"gameFocus\":\"true\",\"quickRestart\":\"true\"}"}},
{"name":"EliMZ_MobileControls","status":false,"description":"♦5.0.0♦ Add responsive on screen controls to mobile games!","parameters":{"disableScreenMove":"true","disableDoubleTouchMenu":"true","hideOnMessage":"false","controlButton":"{\"enable\":\"true\",\"img\":\"Gamepad\",\"width\":\"5\",\"horizontalOrientation\":\"left\",\"padX\":\"2\",\"verticalOrientation\":\"top\",\"padY\":\"2\",\"vibration\":\"0\",\"enableScreenMove\":\"true\",\"enableDoubleTouchMenu\":\"false\"}","buttons":"[\"{\\\"scenes\\\":\\\"[\\\\\\\"Scene_Title\\\\\\\",\\\\\\\"Scene_Menu\\\\\\\",\\\\\\\"Scene_Item\\\\\\\",\\\\\\\"Scene_Skill\\\\\\\",\\\\\\\"Scene_Equip\\\\\\\",\\\\\\\"Scene_Status\\\\\\\",\\\\\\\"Scene_Options\\\\\\\",\\\\\\\"Scene_Save\\\\\\\",\\\\\\\"Scene_Load\\\\\\\",\\\\\\\"Scene_GameEnd\\\\\\\",\\\\\\\"Scene_Shop\\\\\\\",\\\\\\\"Scene_Name\\\\\\\",\\\\\\\"Scene_Debug\\\\\\\",\\\\\\\"Scene_Battle\\\\\\\",\\\\\\\"Scene_Gameover\\\\\\\"]\\\",\\\"img\\\":\\\"NextButton\\\",\\\"width\\\":\\\"7\\\",\\\"horizontalOrientation\\\":\\\"right\\\",\\\"padX\\\":\\\"5\\\",\\\"verticalOrientation\\\":\\\"bottom\\\",\\\"padY\\\":\\\"15\\\",\\\"key\\\":\\\"pageup\\\",\\\"scriptIn\\\":\\\"\\\",\\\"scriptOut\\\":\\\"\\\",\\\"vibration\\\":\\\"0\\\"}\",\"{\\\"scenes\\\":\\\"[\\\\\\\"Scene_Map\\\\\\\",\\\\\\\"Scene_Title\\\\\\\",\\\\\\\"Scene_Menu\\\\\\\",\\\\\\\"Scene_Item\\\\\\\",\\\\\\\"Scene_Skill\\\\\\\",\\\\\\\"Scene_Equip\\\\\\\",\\\\\\\"Scene_Status\\\\\\\",\\\\\\\"Scene_Options\\\\\\\",\\\\\\\"Scene_Save\\\\\\\",\\\\\\\"Scene_Load\\\\\\\",\\\\\\\"Scene_GameEnd\\\\\\\",\\\\\\\"Scene_Shop\\\\\\\",\\\\\\\"Scene_Name\\\\\\\",\\\\\\\"Scene_Debug\\\\\\\",\\\\\\\"Scene_Battle\\\\\\\",\\\\\\\"Scene_Gameover\\\\\\\"]\\\",\\\"img\\\":\\\"ActionButton\\\",\\\"width\\\":\\\"7\\\",\\\"horizontalOrientation\\\":\\\"right\\\",\\\"padX\\\":\\\"14\\\",\\\"verticalOrientation\\\":\\\"bottom\\\",\\\"padY\\\":\\\"6\\\",\\\"key\\\":\\\"z\\\",\\\"scriptIn\\\":\\\"\\\",\\\"scriptOut\\\":\\\"\\\",\\\"vibration\\\":\\\"0\\\"}\",\"{\\\"scenes\\\":\\\"[\\\\\\\"Scene_Map\\\\\\\",\\\\\\\"Scene_Title\\\\\\\",\\\\\\\"Scene_Menu\\\\\\\",\\\\\\\"Scene_Item\\\\\\\",\\\\\\\"Scene_Skill\\\\\\\",\\\\\\\"Scene_Equip\\\\\\\",\\\\\\\"Scene_Status\\\\\\\",\\\\\\\"Scene_Options\\\\\\\",\\\\\\\"Scene_Save\\\\\\\",\\\\\\\"Scene_Load\\\\\\\",\\\\\\\"Scene_GameEnd\\\\\\\",\\\\\\\"Scene_Shop\\\\\\\",\\\\\\\"Scene_Name\\\\\\\",\\\\\\\"Scene_Debug\\\\\\\",\\\\\\\"Scene_Battle\\\\\\\",\\\\\\\"Scene_Gameover\\\\\\\"]\\\",\\\"img\\\":\\\"CancelButton\\\",\\\"width\\\":\\\"7\\\",\\\"horizontalOrientation\\\":\\\"right\\\",\\\"padX\\\":\\\"13\\\",\\\"verticalOrientation\\\":\\\"bottom\\\",\\\"padY\\\":\\\"24\\\",\\\"key\\\":\\\"x\\\",\\\"scriptIn\\\":\\\"\\\",\\\"scriptOut\\\":\\\"\\\",\\\"vibration\\\":\\\"0\\\"}\",\"{\\\"scenes\\\":\\\"[\\\\\\\"Scene_Map\\\\\\\"]\\\",\\\"img\\\":\\\"NextButton\\\",\\\"width\\\":\\\"7\\\",\\\"horizontalOrientation\\\":\\\"right\\\",\\\"padX\\\":\\\"5\\\",\\\"verticalOrientation\\\":\\\"bottom\\\",\\\"padY\\\":\\\"15\\\",\\\"key\\\":\\\"pageup\\\",\\\"scriptIn\\\":\\\"\\\",\\\"scriptOut\\\":\\\"\\\",\\\"vibration\\\":\\\"0\\\"}\"]","dPadType":"singlePad","singlePad":"{\"scenes\":\"[\\\"Scene_Map\\\",\\\"Scene_Title\\\",\\\"Scene_Menu\\\",\\\"Scene_Item\\\",\\\"Scene_Skill\\\",\\\"Scene_Equip\\\",\\\"Scene_Status\\\",\\\"Scene_Options\\\",\\\"Scene_Save\\\",\\\"Scene_Load\\\",\\\"Scene_GameEnd\\\",\\\"Scene_Shop\\\",\\\"Scene_Name\\\",\\\"Scene_Debug\\\",\\\"Scene_Battle\\\",\\\"Scene_Gameover\\\"]\",\"img\":\"DirPad\",\"baseWidth\":\"18\",\"horizontalOrientation\":\"left\",\"padX\":\"3\",\"verticalOrientation\":\"bottom\",\"padY\":\"4\"}","joystickPad":"{\"scenes\":\"[\\\"Scene_Map\\\",\\\"Scene_Title\\\",\\\"Scene_Menu\\\",\\\"Scene_Item\\\",\\\"Scene_Skill\\\",\\\"Scene_Equip\\\",\\\"Scene_Status\\\",\\\"Scene_Options\\\",\\\"Scene_Save\\\",\\\"Scene_Load\\\",\\\"Scene_GameEnd\\\",\\\"Scene_Shop\\\",\\\"Scene_Name\\\",\\\"Scene_Debug\\\",\\\"Scene_Battle\\\",\\\"Scene_Gameover\\\"]\",\"baseImg\":\"baseJoystick\",\"baseWidth\":\"20\",\"ballImg\":\"ballJoystick\",\"ballWidth\":\"4\",\"extraDistance\":\"0\",\"horizontalOrientation\":\"left\",\"padX\":\"2\",\"verticalOrientation\":\"bottom\",\"padY\":\"2\"}"}},
{"name":"DarkPlasma_ImportExportSaveFile","status":false,"description":"セーブデータのインポート・エクスポート機能","parameters":{"textAreaRect":"{\"x\":\"208\", \"y\":\"100\", \"width\":\"400\", \"height\":\"400\"}","okButtonPos":"{\"x\":\"308\", \"y\":\"520\"}","cancelButtonPos":"{\"x\":\"508\", \"y\":\"520\"}","menuButtonType":"1","importButtonPos":"{\"x\":\"680\", \"y\":\"16\"}","exportButtonPos":"{\"x\":\"750\", \"y\":\"16\"}","exportHelpText":"表示されているテキストを保存してください。","importHelpText":"セーブデータのテキストを貼り付けてください。","buttonImages":"{\"ok\":\"buttonOk\",\"cancel\":\"buttonCancel\",\"import\":\"buttonImport\",\"export\":\"buttonExport\"}"}},
{"name":"Zoom","status":false,"description":"v0.6.0 Map zoom","parameters":{"Default zoom for maps":"1.50","Always free camera":"false","Fix sprite black lines":"true","Fix map encounter zoom":"false"}}
];

// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"SRPG_core_MZ","status":true,"description":"SRPG battle system (tactical battle system) for RPG maker(tkool) MV based on SRPG converter MV.","parameters":{"BasicParam":"全体にかかわる基本的な機能","WithYEP_BattleEngineCore":"false","WithCommunityBasic_CoreScript":"false","srpgTroopID":"1","srpgBattleSwitchID":"1","existActorVarID":"1","existEnemyVarID":"2","turnVarID":"3","activeEventID":"4","targetEventID":"5","battleDistanceID":"6","MapBattle(skip battle scene)":"Map battle settings","Use Map Battle":"1","Map Battle Switch":"3","Animation Delay":"-1","BattleBasicParam":"戦闘で使用する基本的数値","defaultMove":"4","srpgBattleExpRate":"0.4","srpgBattleExpRateForActors":"0.1","srpgAutoBattleStateId":"14","maxActorVarID":"0","srpgBestSearchRouteSize":"25","BattleExtensionParam":"戦闘の拡張的な機能","srpgActorCommandList":"attack,skill,item,equip,wait","srpgActorCommandOriginalId":"46","srpgMenuCommandList":"turnEnd,autoBattle,winLose,item,status,options,save,gameEnd","srpgPredictionWindowMode":"1","useAgiAttackPlus":"true","srpgAgilityAffectsRatio":"2","srpgAgiAttackPlusPayCost":"1","srpgBattleOrder":"1","srpgBattleReaction":"1","srpgDefaultReactionSkill":"2","srpgBattleQuickLaunch":"true","srpgNotShowUpDeadActor":"false","srpgBattleEndAllHeal":"true","srpgDamageDirectionChange":"true","srpgSkipTargetForSelf":"true","srpgRangeTerrainTag7":"true","SRPGTerm":"SRPG戦闘で使用する用語","enemyDefaultClass":"Enemy","textSrpgEquip":"Weapon","textSrpgNone":"None","textSrpgMove":"Move","textSrpgRange":"Range","textSrpgWait":"Wait","textSrpgWinLoseCondition":"Objectives","textSrpgWinCondition":"Victory Condition","textSrpgLoseCondition":"Defeat Condition","textSrpgTurnEnd":"End Turn","textSrpgAutoBattle":"Auto Battle","textSrpgDamage":"Damage","textSrpgHealing":"Healing","textSrpgOptMapBattle":"Map Battle","SRPGFiles":"SRPG戦闘で使用する画像やＳＥの設定","srpgSet":"srpg_set","rewardSound":"Item3","expSound":"Up4"}},
{"name":"SRPG_RangeControl_MZ","status":true,"description":"SRPG戦闘での射線（攻撃範囲の制限）、移動、射程の変更などを実装する (SRPG_gearMV用)","parameters":{"Range":"","Default Range":"1","Default Min Range":"0","Line of Sight":"","Through Objects":"false","Through Opponents":"false","Through Friends":"true","Through Events":"true","Through Terrain":"7","Unit Passability":"","Block Friends":"false","Block Opponents":"true","Event Passability":"","Block Units":"false","Zone of Control":"","Base ZoC":"0","Base Through ZoC":"0","Terrain Cost":"","Terrain 0 Cost":"1.00","Terrain 1 Cost":"1.00","Terrain 2 Cost":"1.00","Terrain 3 Cost":"1.00","Terrain 4 Cost":"1.00","Terrain 5 Cost":"1.00","Terrain 6 Cost":"1.00","Terrain 7 Cost":"1.00"}},
{"name":"SRPG_PositionEffects_MZ","status":true,"description":"SRPG extension for movement and positioning skills","parameters":{}},
{"name":"SRPG_AoE_MZ","status":true,"description":"SRPG area-of-effect skills, edited by OhisamaCraft.","parameters":{"AoE Color":"DarkOrange","Show One Square AoE":"false","Refocus Camera":"false"}},
{"name":"SRPG_AIControl_MZ","status":true,"description":"SRPG advanced AI (v0.9)(for SRPG_gearMV)","parameters":{"Target Formula":"1","Move Formula":"nearestOpponent"}},
{"name":"SRPG_AuraSkill_MZ","status":true,"description":"This plugin allows you to create Aura skills for SRPG battle. Place it below all SRPG plugins for best compatibility.","parameters":{"max range":"3","default range":"2","default target":"friend","default shape":"circle","Aura color":"green","show Aura color":"true"}},
{"name":"SRPG_UX_Windows_MZ","status":true,"description":"SRPG window improvements","parameters":{"Hide No Rewards":"true","Hide Self Target":"true"}},
{"name":"SRPG_BattlePrepare_MZ","status":true,"description":"Add battle Prepare phase at the beginning of SRPG battle, edited by OhisamaCraft.","parameters":{"disable actor prepare command":"true","auto open menu":"true","textBattlerNumber":"Units","textFinishPrepare":"Start Battle","textFormation":"Unit Selection","textPosition":"Formation","textPrepareEvent":"Prepare","textExchange":"Exchange","textStatus":"Status","textRemove":"Remove","lockIconIndex":"195"}},
{"name":"SRPG_BattleUI_MZ","status":true,"description":"SRPG戦闘でのメニュー画面の変更(Shoukang, おひさまクラフトによる改変あり)","parameters":{}},
{"name":"SRPG_DispHPOnMap_MZ","status":true,"description":"v1.01 SRPG戦闘中、マップでもHPが確認できるようになるプラグイン。","parameters":{"actorHPColor1":"20","actorHPColor2":"21","enemyHPColor1":"22","enemyHPColor2":"23"}},
{"name":"SRPG_MoveMethod_MZ","status":true,"description":"More move modes and improved pathfinding that can handle all conditions! (for SRPG_gearMV)","parameters":{"search range":"40","confusion move rate":"3","enable fall back":"true"}},
{"name":"SRPG_ShowPath_MZ","status":true,"description":"SRPG move path indicator","parameters":{"Path Image":"srpgPath","Path Blend Mode":"0","Path Opacity":"255","Path Layer":"2","Max Path Length":"99"}},
{"name":"SRPG_Summon_MZ","status":true,"description":"Allow you to summon/enemy/objects during SRPG battle. v 1.04 Fix a bug for wrong action subject.","parameters":{"Summon Map Id":"1","summon appear Animation Id":"121","summon disappear Animation Id":"122"}},
{"name":"SRPG_UX_Cursor_MZ","status":true,"description":"SRPG cursor, movement, and selection upgrades","parameters":{"Cursor-Style Movement":"true","Cursor Delay":"2","Cursor Speed":"6","Animate Cursor":"false","Animate Delay":"15","Start On Next Actor":"true","Switch Actor While Moving":"true","Quick Attack":"true","Quick Target Switch":"true","Quick Switch From Preview":"false","Auto Target":"true","Auto Select":"0"}},
{"name":"EliMZ_Book","status":true,"description":"♦5.0.2♦ Essential plugin for all Eli plugins.","parameters":{"engine":"{\"pixelPerfect\":\"false\",\"styleOverflow\":\"false\",\"disableEffekseer\":\"false\",\"--- BUG FIXES ---\":\"\",\"fixBitmapStartLoad\":\"true\"}","playtest":"{\"openDevTools\":\"false\",\"nwWindowPos\":\"0, 0\",\"--- MZ ONLY ---\":\"\",\"gameFocus\":\"true\",\"quickRestart\":\"true\"}"}},
{"name":"EliMZ_MobileControls","status":true,"description":"♦5.0.0♦ Add responsive on screen controls to mobile games!","parameters":{"disableScreenMove":"true","disableDoubleTouchMenu":"true","hideOnMessage":"true","controlButton":"{\"enable\":\"false\",\"img\":\"\",\"width\":\"5\",\"horizontalOrientation\":\"left\",\"padX\":\"2\",\"verticalOrientation\":\"top\",\"padY\":\"2\",\"vibration\":\"0\",\"enableScreenMove\":\"true\",\"enableDoubleTouchMenu\":\"true\"}","buttons":"[\"{\\\"scenes\\\":\\\"[\\\\\\\"Scene_Map\\\\\\\"]\\\",\\\"img\\\":\\\"CancelButton\\\",\\\"width\\\":\\\"7\\\",\\\"horizontalOrientation\\\":\\\"right\\\",\\\"padX\\\":\\\"3\\\",\\\"verticalOrientation\\\":\\\"bottom\\\",\\\"padY\\\":\\\"18\\\",\\\"key\\\":\\\"shift\\\",\\\"scriptIn\\\":\\\"\\\",\\\"scriptOut\\\":\\\"\\\",\\\"vibration\\\":\\\"0\\\"}\",\"{\\\"scenes\\\":\\\"[\\\\\\\"Scene_Map\\\\\\\"]\\\",\\\"img\\\":\\\"ActionButton\\\",\\\"width\\\":\\\"7\\\",\\\"horizontalOrientation\\\":\\\"right\\\",\\\"padX\\\":\\\"11\\\",\\\"verticalOrientation\\\":\\\"bottom\\\",\\\"padY\\\":\\\"6\\\",\\\"key\\\":\\\"z\\\",\\\"scriptIn\\\":\\\"\\\",\\\"scriptOut\\\":\\\"\\\",\\\"vibration\\\":\\\"0\\\"}\"]","dPadType":"singlePad","singlePad":"{\"scenes\":\"[\\\"Scene_Map\\\"]\",\"img\":\"DirPad\",\"baseWidth\":\"18\",\"horizontalOrientation\":\"left\",\"padX\":\"3\",\"verticalOrientation\":\"bottom\",\"padY\":\"4\"}","joystickPad":"{\"scenes\":\"[\\\"Scene_Map\\\"]\",\"baseImg\":\"baseJoystick\",\"baseWidth\":\"20\",\"ballImg\":\"ballJoystick\",\"ballWidth\":\"4\",\"extraDistance\":\"0\",\"horizontalOrientation\":\"left\",\"padX\":\"2\",\"verticalOrientation\":\"bottom\",\"padY\":\"2\"}"}}
];

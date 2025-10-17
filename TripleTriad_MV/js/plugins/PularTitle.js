Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
	SoundManager.preloadImportantSounds();
	if (DataManager.isBattleTest()) {
	    DataManager.setupBattleTest();
		SceneManager.goto(Scene_Battle);
	} else if (DataManager.isEventTest()) {
	    DataManager.setupEventTest();
		SceneManager.goto(SceneMap);
	} else {
	    this.checkPlayerLocation();
		DataManager.setupNewGame();
		// SceneManager.goto(SceneTitle);
		// Window_TitleCommand.initCommandPosition();
		DataManager.setupNewGame();
		SceneManager.goto(Scene_Map);
	}	
	this.updateDocumentTitle();
};	
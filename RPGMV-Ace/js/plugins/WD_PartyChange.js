//=============================================================================
// WD_PartyChange.js v1.02
//=============================================================================

/*:
 * @plugindesc パーティ編成システムです。ルイ○ダの酒場みたいなのが作れます。(v1.02)
 * @author Izumi (http://izumiwhite.web.fc2.com/)
 *
 *
 * @help
 *
 * プラグインコマンド:
 *   PartyChange open       # パーティ編成画面の呼び出し
 *   PartyChange eliminate  # 除籍画面の呼び出し
 *   PartyChange show       # メンバーリスト画面の表示
 *
 * ※細かい設定はスクリプトを直接編集してください。
 * ※別途レイアウトファイルの導入が必要です。
 *
 * ※除籍機能は、アクターの加入条件のスイッチをOFFにするだけの機能です。
 *
 */

(function () {
    //======== 基本設定 ========

    //使用するソートを順に記載。対応は下記の通り。
    // 0:ID順, 1:職業順, 2:レベル順, 3:ＨＰ順, 4:ＭＰ順, 5:攻撃力順, 6:防御力順,
    // 7:魔法力順, 8:魔法防御順, 9:敏捷性順, 10:運順, 11:指定ソート
    var wd_sort_series = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    //wd_sort_seriesで指定したソートの名称を順に記載。
    var wd_sort_names = [
        "ID順",
        "職業順",
        "レベル順",
        "ＨＰ順",
        "ＭＰ順",
        "攻撃力順",
        "防御力順",
        "魔法力順",
        "魔法防御順",
        "敏捷性順",
        "運順",
        "指定ソート",
    ];

    //指定ソート。アクターのID順に優先順位を記載。
    var wd_sort_assing = [2, 1, 3, 4, 5, 6, 8, 7];

    //ソート番号格納用の変数
    var wd_sort_variables = 11;

    //メニュー画面でソート切り替え機能を使用するか。
    var wd_sort_change = true;

    //キャンセル時の確認・ソート切り替え用ウィンドウの表示。
    //表示しない場合は、ソート切り替えはwd_sort_variablesで指定した変数を操作して行なってください。
    var wd_cancel_confirm = true;

    //除籍時のコマンドの記載テキスト
    var wd_eliminate_text = "除籍する";

    //テキストウィンドウ1に表示するテキスト。
    var wd_text1_mess = "パーティリスト";

    //テキストウィンドウ2に表示するテキスト。
    var wd_text2_mess = "メンバーリスト";

    //1番のアクターの加入条件 (この場合スイッチ11がONの時、加入可能)
    //2番以降のアクターの加入条件は、この数値に1ずつ足したものになります。
    var wd_actor1_switch = 21;

    //パーティメンバーの最大数
    var wd_party_max = 8;

    //パーティから外すのみの処理を可能にする場合はtrue。falseの場合追加と交代のみ。
    var wd_remove_only = true;

    //アクターの入れ替え不可用のスイッチ
    var wd_fix_switch1 = []; //この行は消さないこと
    wd_fix_switch1[1] = 6; //6番のスイッチがONの時、1番のアクターは入れ替え(外すこと)不可。
    wd_fix_switch1[3] = 7; //7番のスイッチがONの時、3番のアクターは入れ替え(外すこと)不可。

    //アクターの除籍不可用のスイッチ
    var wd_fix_switch2 = []; //この行は消さないこと
    wd_fix_switch2[1] = 8; //8番のスイッチがONの時、1番のアクターは除籍不可。
    wd_fix_switch2[3] = 9; //9番のスイッチがONの時、3番のアクターは除籍不可。

    //======== 基本設定終わり(以下、本体プログラム) ========

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "PartyChange") {
            switch (args[0]) {
                case "open":
                    this.wd03_preload();
                    SceneManager.push(Scene_PartyChange);
                    break;
                case "eliminate":
                    this.wd03_preload();
                    SceneManager.push(Scene_PartyEliminate);
                    break;
                case "show":
                    this.wd03_preload();
                    SceneManager.push(Scene_PartyShow);
                    break;
            }
        }
    };

    Game_Interpreter.prototype.wd03_preload = function () {
        if (wd_front_charaview || wd_back_charaview || wd_status_charaview) {
            for (i = 1; i < $dataActors.length; i++) {
                actor = $gameActors.actor(i);
                ImageManager.loadCharacter(actor.characterName(), 0);
                this.setWaitMode("image");
            }
        }
        if (wd_front_faceview || wd_back_faceview || wd_status_faceview) {
            for (i = 1; i < $dataActors.length; i++) {
                actor = $gameActors.actor(i);
                ImageManager.loadFace(actor.faceName(), 0);
                this.setWaitMode("image");
            }
        }
    };

    function Scene_PartyChange() {
        this.initialize.apply(this, arguments);
    }

    Scene_PartyChange.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_PartyChange.prototype.constructor = Scene_PartyChange;

    Scene_PartyChange.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_PartyChange.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this._frontWindow = new Window_PartyChangeFront();
        this._frontWindow.setHandler("ok", this.frontOk.bind(this));
        if (wd_cancel_confirm) {
            this._frontWindow.setHandler("cancel", this.frontCancel.bind(this));
        } else {
            this._frontWindow.setHandler("cancel", this.popScene.bind(this));
        }
        this._backWindow = new Window_PartyChangeBack(0);
        this._backWindow.setHandler("ok", this.backOk.bind(this));
        this._backWindow.setHandler("cancel", this.backCancel.bind(this));
        this._statusWindow = new Window_PartyChangeStatus();
        this._text1Window = new Window_PartyChangeText1();
        this._text2Window = new Window_PartyChangeText2(0);
        this._cancelWindow = new Window_PartyChangeCancel();
        this._cancelWindow.setHandler("ok", this.cancelOk.bind(this));
        this._cancelWindow.setHandler("change", this.cancelChange.bind(this));
        this._cancelWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._frontWindow);
        this.addWindow(this._backWindow);
        this.addWindow(this._statusWindow);
        this.addWindow(this._text1Window);
        this.addWindow(this._text2Window);
        this.addWindow(this._cancelWindow);
        this._cancelWindow.deactivate();
        this._cancelWindow.hide();
        this._frontWindow.setStatusWindow(this._statusWindow);
        this._backWindow.setStatusWindow(this._statusWindow);
    };

    Scene_PartyChange.prototype.frontOk = function () {
        this._frontWindow.deactivate();
        this._backWindow.activate();
    };

    Scene_PartyChange.prototype.frontCancel = function () {
        this._frontWindow.deactivate();
        this._cancelWindow.show();
        this._cancelWindow.activate();
    };

    Scene_PartyChange.prototype.backOk = function () {
        if (this._backWindow._list[this._backWindow._index]) {
            $gameParty._actors.splice(
                this._frontWindow._index,
                1,
                this._backWindow._list[this._backWindow._index]._actorId
            );
        } else {
            $gameParty._actors.splice(this._frontWindow._index, 1);
        }
        $gamePlayer.refresh();
        this._frontWindow.refresh();
        this._backWindow.refresh();
        this._backWindow.deactivate();
        this._frontWindow.activate();
    };

    Scene_PartyChange.prototype.backCancel = function () {
        this._backWindow.deactivate();
        this._frontWindow.activate();
    };

    Scene_PartyChange.prototype.cancelChange = function () {
        $gameVariables.setValue(wd_sort_variables, $gameVariables.value(wd_sort_variables) + 1);
        if ($gameVariables.value(wd_sort_variables) >= wd_sort_series.length) {
            $gameVariables.setValue(wd_sort_variables, 0);
        }
        this._backWindow.refresh();
        this._cancelWindow.refresh();
        this._cancelWindow.activate();
    };

    Scene_PartyChange.prototype.cancelOk = function () {
        this._frontWindow.activate();
        this._cancelWindow.hide();
        this._cancelWindow.deactivate();
    };

    function Scene_PartyEliminate() {
        this.initialize.apply(this, arguments);
    }

    Scene_PartyEliminate.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_PartyEliminate.prototype.constructor = Scene_PartyEliminate;

    Scene_PartyEliminate.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_PartyEliminate.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this._backWindow = new Window_PartyChangeBack(1);
        this._backWindow.setHandler("ok", this.backOk.bind(this));
        if (wd_cancel_confirm) {
            this._backWindow.setHandler("cancel", this.backCancel.bind(this));
        } else {
            this._backWindow.setHandler("cancel", this.popScene.bind(this));
        }
        this._statusWindow = new Window_PartyChangeStatus();
        this._text1Window = new Window_PartyChangeText1();
        this._text2Window = new Window_PartyChangeText2(1);
        this._eliminateWindow = new Window_PartyChangeEliminate();
        this._eliminateWindow.setHandler("ok", this.eliminateOk.bind(this));
        this._eliminateWindow.setHandler("cancel", this.eliminateCancel.bind(this));
        this._cancelWindow = new Window_PartyChangeCancel();
        this._cancelWindow.setHandler("ok", this.cancelOk.bind(this));
        this._cancelWindow.setHandler("change", this.cancelChange.bind(this));
        this._cancelWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._backWindow);
        this.addWindow(this._statusWindow);
        this.addWindow(this._text1Window);
        this.addWindow(this._text2Window);
        this.addWindow(this._eliminateWindow);
        this.addWindow(this._cancelWindow);
        this._backWindow.activate();
        this._eliminateWindow.deactivate();
        this._eliminateWindow.hide();
        this._cancelWindow.deactivate();
        this._cancelWindow.hide();
        this._backWindow.setStatusWindow(this._statusWindow);
    };

    Scene_PartyEliminate.prototype.backOk = function () {
        this._backWindow.deactivate();
        this._eliminateWindow.select(1);
        this._eliminateWindow.show();
        this._eliminateWindow.activate();
    };

    Scene_PartyEliminate.prototype.backCancel = function () {
        this._backWindow.deactivate();
        this._cancelWindow.show();
        this._cancelWindow.activate();
    };

    Scene_PartyEliminate.prototype.eliminateOk = function () {
        if (this._backWindow._list[this._backWindow._index]) {
            var i = this._backWindow._list[this._backWindow._index]._actorId;
            $gameSwitches.setValue(wd_actor1_switch + i - 1, false);
        }
        this._backWindow.refresh();
        this._backWindow.activate();
        this._eliminateWindow.hide();
        this._eliminateWindow.deactivate();
        if (!this._backWindow._list[this._backWindow._index]) {
            this._backWindow.select(this._backWindow._index - 1);
        }
    };

    Scene_PartyEliminate.prototype.eliminateCancel = function () {
        this._backWindow.activate();
        this._eliminateWindow.hide();
        this._eliminateWindow.deactivate();
    };

    Scene_PartyEliminate.prototype.cancelChange = function () {
        $gameVariables.setValue(wd_sort_variables, $gameVariables.value(wd_sort_variables) + 1);
        if ($gameVariables.value(wd_sort_variables) >= wd_sort_series.length) {
            $gameVariables.setValue(wd_sort_variables, 0);
        }
        this._backWindow.refresh();
        this._cancelWindow.refresh();
        this._cancelWindow.activate();
    };

    Scene_PartyEliminate.prototype.cancelOk = function () {
        this._backWindow.activate();
        this._cancelWindow.hide();
        this._cancelWindow.deactivate();
    };

    function Scene_PartyShow() {
        this.initialize.apply(this, arguments);
    }

    Scene_PartyShow.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_PartyShow.prototype.constructor = Scene_PartyShow;

    Scene_PartyShow.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_PartyShow.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this._backWindow = new Window_PartyChangeBack(2);
        if (wd_cancel_confirm) {
            this._backWindow.setHandler("cancel", this.backCancel.bind(this));
        } else {
            this._backWindow.setHandler("cancel", this.popScene.bind(this));
        }
        this._statusWindow = new Window_PartyChangeStatus();
        this._text1Window = new Window_PartyChangeText1();
        this._text2Window = new Window_PartyChangeText2(2);
        this._cancelWindow = new Window_PartyChangeCancel();
        this._cancelWindow.setHandler("ok", this.cancelOk.bind(this));
        this._cancelWindow.setHandler("change", this.cancelChange.bind(this));
        this._cancelWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._backWindow);
        this.addWindow(this._statusWindow);
        this.addWindow(this._text1Window);
        this.addWindow(this._text2Window);
        this.addWindow(this._cancelWindow);
        this._backWindow.activate();
        this._cancelWindow.deactivate();
        this._cancelWindow.hide();
        this._backWindow.setStatusWindow(this._statusWindow);
    };

    Scene_PartyShow.prototype.backCancel = function () {
        this._backWindow.deactivate();
        this._cancelWindow.show();
        this._cancelWindow.activate();
    };

    Scene_PartyShow.prototype.cancelChange = function () {
        $gameVariables.setValue(wd_sort_variables, $gameVariables.value(wd_sort_variables) + 1);
        if ($gameVariables.value(wd_sort_variables) >= wd_sort_series.length) {
            $gameVariables.setValue(wd_sort_variables, 0);
        }
        this._backWindow.refresh();
        this._cancelWindow.refresh();
        this._cancelWindow.activate();
    };

    Scene_PartyShow.prototype.cancelOk = function () {
        this._backWindow.activate();
        this._cancelWindow.hide();
        this._cancelWindow.deactivate();
    };

    function Window_PartyChangeBase() {
        this.initialize.apply(this, arguments);
    }
    Window_PartyChangeBase.prototype = Object.create(Window_Selectable.prototype);

    Window_PartyChangeBase.prototype.setStatusWindow = function (statusWindow) {
        this._statusWindow = statusWindow;
        this.updateStatus();
    };

    Window_PartyChangeBase.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        this.updateStatus();
    };

    Window_PartyChangeBase.prototype.updateStatus = function () {
        if (this._statusWindow && this.active) {
            var item = this._list[this.index()];
            this._statusWindow.setItem(item);
        }
    };

    Window_PartyChangeBase.prototype.isCurrentItemEnabled = function () {
        return this._listEnabled[this._index];
    };

    Window_PartyChangeBase.prototype.maxItems = function () {
        return this._list ? this._list.length : 0;
    };

    Window_PartyChangeBase.prototype.drawActorParam = function (actor, i, x, y, width) {
        var lineHeight = this.lineHeight();
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(i), x, y, width - 60);
        this.resetTextColor();
        this.drawText(actor.param(i), x + width - 60, y, 60, "right");
    };

    Window_PartyChangeBase.prototype.drawActorLevel = function (actor, x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + width - 36, y, 36, "right");
    };

    Window_PartyChangeBase.prototype.processCursorMove = function () {
        var lastIndex2;
        if (this.isCursorMovable()) {
            lastIndex2 = this.index();
        }
        Window_Selectable.prototype.processCursorMove.call(this);
        if (this.isCursorMovable()) {
            if (typeof testflag === "undefined") {
            } else {
                testflag = 0;
                this.refresh();
            }
            if (this.index() !== lastIndex2) {
                testflag = 1;
            }
        }
    };

    function Window_PartyChangeFront() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyChangeFront.prototype = Object.create(Window_PartyChangeBase.prototype);
    Window_PartyChangeFront.prototype.constructor = Window_PartyChangeFront;

    Window_PartyChangeFront.prototype.initialize = function () {
        var x = wd_front_x;
        var y = wd_front_y;
        var width = wd_front_width;
        var height = wd_front_height;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.setTopRow(0);
        this.select(0);
        this.activate();
    };

    Window_PartyChangeFront.prototype.maxCols = function () {
        return wd_front_maxcols;
    };

    Window_PartyChangeFront.prototype.refresh = function () {
        var i, actor;
        this._list = [];
        $gameParty.members().forEach(function (actor) {
            this._list.push(actor);
        }, this);

        this._listEnabled = [];
        for (i = 0; i < this._list.length; i++) {
            actor = this._list[i];
            if ($gameSwitches.value(wd_fix_switch1[actor._actorId])) {
                this._listEnabled.push(false);
            } else {
                this._listEnabled.push(true);
            }
        }

        if ($gameParty.members().length < wd_party_max) {
            this._list.push(null);
            this._listEnabled.push(true);
        }

        this.createContents();
        this.drawAllItems();
    };

    Window_PartyChangeFront.prototype.processCancel = function () {
        Window_Selectable.prototype.processCancel.call(this);
    };

    Window_PartyChangeFront.prototype.itemRect = function (index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = wd_front_rect_width;
        rect.height = wd_front_rect_height;
        rect.x = (index % maxCols) * (rect.width + wd_front_rect_spacing) - this._scrollX;
        rect.y = Math.floor(index / maxCols) * (rect.height + wd_front_rect_interval) - this._scrollY;
        return rect;
    };

    Window_PartyChangeFront.prototype.maxRows = function () {
        return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
    };

    Window_PartyChangeFront.prototype.maxPageRows = function () {
        var pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / (wd_front_rect_height + wd_front_rect_interval));
    };

    Window_PartyChangeFront.prototype.topRow = function () {
        return Math.floor(this._scrollY / (wd_front_rect_height + wd_front_rect_interval));
    };

    Window_PartyChangeFront.prototype.setTopRow = function (row) {
        var scrollY = row.clamp(0, this.maxTopRow()) * (wd_front_rect_height + wd_front_rect_interval);
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    };

    Window_PartyChangeFront.prototype.drawItem = function (index) {
        var actor = this._list[index];
        var rect = this.itemRect(index);
        if (actor) {
            this.changePaintOpacity(this._listEnabled[index]);

            if (wd_front_faceview) {
                this.drawActorFace(actor, rect.x + wd_front_faceview_x, rect.y + wd_front_faceview_y);
            }
            if (wd_front_charaview) {
                this.drawActorCharacter(actor, rect.x + wd_front_charaview_x, rect.y + wd_front_charaview_y);
            }
            if (wd_front_stateview) {
                this.drawActorIcons(
                    actor,
                    rect.x + wd_front_stateview_x,
                    rect.y + wd_front_stateview_y,
                    wd_front_stateview_width
                );
            }
            if (wd_front_nameview) {
                this.drawActorName(
                    actor,
                    rect.x + wd_front_nameview_x,
                    rect.y + wd_front_nameview_y,
                    wd_front_nameview_width
                );
            }
            if (wd_front_classview) {
                this.drawActorClass(
                    actor,
                    rect.x + wd_front_classview_x,
                    rect.y + wd_front_classview_y,
                    wd_front_classview_width
                );
            }
            if (wd_front_nickview) {
                this.drawActorNickname(
                    actor,
                    rect.x + wd_front_nickview_x,
                    rect.y + wd_front_nickview_y,
                    wd_front_nickview_width
                );
            }
            if (wd_front_lvview) {
                this.drawActorLevel(
                    actor,
                    rect.x + wd_front_lvview_x,
                    rect.y + wd_front_lvview_y,
                    wd_front_lvview_width
                );
            }
            if (wd_front_hpgaugeview) {
                this.drawActorHp(
                    actor,
                    rect.x + wd_front_hpgaugeview_x,
                    rect.y + wd_front_hpgaugeview_y,
                    wd_front_hpgaugeview_width
                );
            }
            if (wd_front_mpgaugeview) {
                this.drawActorMp(
                    actor,
                    rect.x + wd_front_mpgaugeview_x,
                    rect.y + wd_front_mpgaugeview_y,
                    wd_front_mpgaugeview_width
                );
            }
            if (wd_front_tpgaugeview) {
                this.drawActorTp(
                    actor,
                    rect.x + wd_front_tpgaugeview_x,
                    rect.y + wd_front_tpgaugeview_y,
                    wd_front_tpgaugeview_width
                );
            }
            if (wd_front_mhpview) {
                this.drawActorParam(
                    actor,
                    0,
                    rect.x + wd_front_mhpview_x,
                    rect.y + wd_front_mhpview_y,
                    wd_front_mhpview_width
                );
            }
            if (wd_front_mmpview) {
                this.drawActorParam(
                    actor,
                    1,
                    rect.x + wd_front_mmpview_x,
                    rect.y + wd_front_mmpview_y,
                    wd_front_mmpview_width
                );
            }
            if (wd_front_atkview) {
                this.drawActorParam(
                    actor,
                    2,
                    rect.x + wd_front_atkview_x,
                    rect.y + wd_front_atkview_y,
                    wd_front_atkview_width
                );
            }
            if (wd_front_defview) {
                this.drawActorParam(
                    actor,
                    3,
                    rect.x + wd_front_defview_x,
                    rect.y + wd_front_defview_y,
                    wd_front_defview_width
                );
            }
            if (wd_front_matview) {
                this.drawActorParam(
                    actor,
                    4,
                    rect.x + wd_front_matview_x,
                    rect.y + wd_front_matview_y,
                    wd_front_matview_width
                );
            }
            if (wd_front_mdfview) {
                this.drawActorParam(
                    actor,
                    5,
                    rect.x + wd_front_mdfview_x,
                    rect.y + wd_front_mdfview_y,
                    wd_front_mdfview_width
                );
            }
            if (wd_front_agiview) {
                this.drawActorParam(
                    actor,
                    6,
                    rect.x + wd_front_agiview_x,
                    rect.y + wd_front_agiview_y,
                    wd_front_agiview_width
                );
            }
            if (wd_front_lucview) {
                this.drawActorParam(
                    actor,
                    7,
                    rect.x + wd_front_lucview_x,
                    rect.y + wd_front_lucview_y,
                    wd_front_lucview_width
                );
            }
        }
    };

    function Window_PartyChangeBack() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyChangeBack.prototype = Object.create(Window_PartyChangeBase.prototype);
    Window_PartyChangeBack.prototype.constructor = Window_PartyChangeBack;

    Window_PartyChangeBack.prototype.initialize = function (mode) {
        var x;
        var y;
        var width;
        var height;

        this._mode = mode;
        if (this._mode == 0) {
            x = wd_back_x;
            y = wd_back_y;
            width = wd_back_width;
            height = wd_back_height;
        }
        if (this._mode >= 1) {
            x = wd_back_x2;
            y = wd_back_y2;
            width = wd_back_width2;
            height = wd_back_height2;
        }
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.setTopRow(0);
        this.select(0);
        this.deactivate();
    };

    Window_PartyChangeBack.prototype.maxCols = function () {
        return wd_back_maxcols;
    };

    Window_PartyChangeBack.prototype.refresh = function () {
        var i, actor;
        this._list = [];
        for (i = 1; i < $dataActors.length; i++) {
            if ($gameSwitches.value(wd_actor1_switch + i - 1)) {
                actor = $gameActors.actor(i);
                this._list.push(actor);
            }
        }
        sort_flag = wd_sort_series[$gameVariables.value(wd_sort_variables)];
        switch (sort_flag) {
            case 0:
                this._list.sort(function (a, b) {
                    return -b._actorId + a._actorId;
                });
                break;
            case 1:
                this._list.sort(function (a, b) {
                    return -b._classId * 1000000 - b._actorId + a._classId * 1000000 + a._actorId;
                });
                break;
            case 2:
                this._list.sort(function (a, b) {
                    return b.level * 1000000 - b._actorId - a.level * 1000000 + a._actorId;
                });
                break;
            case 3:
                this._list.sort(function (a, b) {
                    return b.mhp * 1000000 - b._actorId - a.mhp * 1000000 + a._actorId;
                });
                break;
            case 4:
                this._list.sort(function (a, b) {
                    return b.mmp * 1000000 - b._actorId - a.mmp * 1000000 + a._actorId;
                });
                break;
            case 5:
                this._list.sort(function (a, b) {
                    return b.atk * 1000000 - b._actorId - a.atk * 1000000 + a._actorId;
                });
                break;
            case 6:
                this._list.sort(function (a, b) {
                    return b.def * 1000000 - b._actorId - a.def * 1000000 + a._actorId;
                });
                break;
            case 7:
                this._list.sort(function (a, b) {
                    return b.mat * 1000000 - b._actorId - a.mat * 1000000 + a._actorId;
                });
                break;
            case 8:
                this._list.sort(function (a, b) {
                    return b.mdf * 1000000 - b._actorId - a.mdf * 1000000 + a._actorId;
                });
                break;
            case 9:
                this._list.sort(function (a, b) {
                    return b.agi * 1000000 - b._actorId - a.agi * 1000000 + a._actorId;
                });
                break;
            case 10:
                this._list.sort(function (a, b) {
                    return b.luc * 1000000 - b._actorId - a.luc * 1000000 + a._actorId;
                });
                break;
            case 11:
                this._list.sort(function (a, b) {
                    return -wd_sort_assing[b._actorId - 1] + wd_sort_assing[a._actorId - 1];
                });
                break;
        }

        this._listEnabled = [];
        for (i = 0; i < this._list.length; i++) {
            actor = this._list[i];
            if (this._mode != 2 && $gameParty.members().contains(actor)) {
                this._listEnabled.push(false);
            } else if (this._mode == 1 && $gameSwitches.value(wd_fix_switch2[actor._actorId])) {
                this._listEnabled.push(false);
            } else {
                this._listEnabled.push(true);
            }
        }

        if (wd_remove_only && this._mode == 0 && $gameParty.members().length > 1) {
            this._list.push(null);
            this._listEnabled.push(true);
        }

        this.createContents();
        this.drawAllItems();
    };

    Window_PartyChangeBack.prototype.processCancel = function () {
        Window_Selectable.prototype.processCancel.call(this);
    };

    Window_PartyChangeBack.prototype.itemRect = function (index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = wd_back_rect_width;
        rect.height = wd_back_rect_height;
        rect.x = (index % maxCols) * (rect.width + wd_back_rect_spacing) - this._scrollX;
        rect.y = Math.floor(index / maxCols) * (rect.height + wd_back_rect_interval) - this._scrollY;
        return rect;
    };

    Window_PartyChangeBack.prototype.maxRows = function () {
        return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
    };

    Window_PartyChangeBack.prototype.maxPageRows = function () {
        var pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / (wd_back_rect_height + wd_back_rect_interval));
    };

    Window_PartyChangeBack.prototype.topRow = function () {
        return Math.floor(this._scrollY / (wd_back_rect_height + wd_back_rect_interval));
    };

    Window_PartyChangeBack.prototype.setTopRow = function (row) {
        var scrollY = row.clamp(0, this.maxTopRow()) * (wd_back_rect_height + wd_back_rect_interval);
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    };

    Window_PartyChangeBack.prototype.drawItem = function (index) {
        var actor = this._list[index];
        var rect = this.itemRect(index);
        if (actor) {
            this.changePaintOpacity(this._listEnabled[index]);

            if (wd_back_faceview) {
                this.drawActorFace(actor, rect.x + wd_back_faceview_x, rect.y + wd_back_faceview_y);
            }
            if (wd_back_charaview) {
                this.drawActorCharacter(actor, rect.x + wd_back_charaview_x, rect.y + wd_back_charaview_y);
            }
            if (wd_back_stateview) {
                this.drawActorIcons(
                    actor,
                    rect.x + wd_back_stateview_x,
                    rect.y + wd_back_stateview_y,
                    wd_back_stateview_width
                );
            }
            if (wd_back_nameview) {
                this.drawActorName(
                    actor,
                    rect.x + wd_back_nameview_x,
                    rect.y + wd_back_nameview_y,
                    wd_back_nameview_width
                );
            }
            if (wd_back_classview) {
                this.drawActorClass(
                    actor,
                    rect.x + wd_back_classview_x,
                    rect.y + wd_back_classview_y,
                    wd_back_classview_width
                );
            }
            if (wd_back_nickview) {
                this.drawActorNickname(
                    actor,
                    rect.x + wd_back_nickview_x,
                    rect.y + wd_back_nickview_y,
                    wd_back_nickview_width
                );
            }
            if (wd_back_lvview) {
                this.drawActorLevel(actor, rect.x + wd_back_lvview_x, rect.y + wd_back_lvview_y, wd_back_lvview_width);
            }
            if (wd_back_hpgaugeview) {
                this.drawActorHp(
                    actor,
                    rect.x + wd_back_hpgaugeview_x,
                    rect.y + wd_back_hpgaugeview_y,
                    wd_back_hpgaugeview_width
                );
            }
            if (wd_back_mpgaugeview) {
                this.drawActorMp(
                    actor,
                    rect.x + wd_back_mpgaugeview_x,
                    rect.y + wd_back_mpgaugeview_y,
                    wd_back_mpgaugeview_width
                );
            }
            if (wd_back_tpgaugeview) {
                this.drawActorTp(
                    actor,
                    rect.x + wd_back_tpgaugeview_x,
                    rect.y + wd_back_tpgaugeview_y,
                    wd_back_tpgaugeview_width
                );
            }
            if (wd_back_mhpview) {
                this.drawActorParam(
                    actor,
                    0,
                    rect.x + wd_back_mhpview_x,
                    rect.y + wd_back_mhpview_y,
                    wd_back_mhpview_width
                );
            }
            if (wd_back_mmpview) {
                this.drawActorParam(
                    actor,
                    1,
                    rect.x + wd_back_mmpview_x,
                    rect.y + wd_back_mmpview_y,
                    wd_back_mmpview_width
                );
            }
            if (wd_back_atkview) {
                this.drawActorParam(
                    actor,
                    2,
                    rect.x + wd_back_atkview_x,
                    rect.y + wd_back_atkview_y,
                    wd_back_atkview_width
                );
            }
            if (wd_back_defview) {
                this.drawActorParam(
                    actor,
                    3,
                    rect.x + wd_back_defview_x,
                    rect.y + wd_back_defview_y,
                    wd_back_defview_width
                );
            }
            if (wd_back_matview) {
                this.drawActorParam(
                    actor,
                    4,
                    rect.x + wd_back_matview_x,
                    rect.y + wd_back_matview_y,
                    wd_back_matview_width
                );
            }
            if (wd_back_mdfview) {
                this.drawActorParam(
                    actor,
                    5,
                    rect.x + wd_back_mdfview_x,
                    rect.y + wd_back_mdfview_y,
                    wd_back_mdfview_width
                );
            }
            if (wd_back_agiview) {
                this.drawActorParam(
                    actor,
                    6,
                    rect.x + wd_back_agiview_x,
                    rect.y + wd_back_agiview_y,
                    wd_back_agiview_width
                );
            }
            if (wd_back_lucview) {
                this.drawActorParam(
                    actor,
                    7,
                    rect.x + wd_back_lucview_x,
                    rect.y + wd_back_lucview_y,
                    wd_back_lucview_width
                );
            }
        }
    };

    function Window_PartyChangeStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyChangeStatus.prototype = Object.create(Window_Base.prototype);
    Window_PartyChangeStatus.prototype.constructor = Window_PartyChangeStatus;

    Window_PartyChangeStatus.prototype.initialize = function () {
        var x = wd_status_x;
        var y = wd_status_y;
        var width = wd_status_width;
        var height = wd_status_height;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._rerefreshflag = false;
    };

    Window_PartyChangeStatus.prototype.setItem = function (item) {
        if (this._item !== item) {
            this._item = item;
            this.refresh();
        }
    };

    Window_PartyChangeStatus.prototype.drawActorParam = function (actor, i, x, y, width) {
        var lineHeight = this.lineHeight();
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(i), x, y, width - 60);
        this.resetTextColor();
        this.drawText(actor.param(i), x + width - 60, y, 60, "right");
    };

    Window_PartyChangeStatus.prototype.drawActorLevel = function (actor, x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + width - 36, y, 36, "right");
    };

    Window_PartyChangeStatus.prototype.drawActorEquipments = function (actor, x, y) {
        var equips = actor.equips();
        var count = Math.min(equips.length, 6);
        for (var i = 0; i < count; i++) {
            this.drawItemName(equips[i], x, y + this.lineHeight() * i);
        }
    };

    Window_PartyChangeStatus.prototype.refresh = function () {
        var actor = this._item;

        var x = 0;
        var y = 0;
        var lineHeight = this.lineHeight();

        this.contents.clear();

        if (!actor) {
            return;
        }

        if (wd_status_faceview) {
            this.drawActorFace(actor, x + wd_status_faceview_x, y + wd_status_faceview_y);
        }
        if (wd_status_charaview) {
            this.drawActorCharacter(actor, x + wd_status_charaview_x, y + wd_status_charaview_y);
        }
        if (wd_status_stateview) {
            this.drawActorIcons(actor, x + wd_status_stateview_x, y + wd_status_stateview_y, wd_status_stateview_width);
        }
        if (wd_status_nameview) {
            this.drawActorName(actor, x + wd_status_nameview_x, y + wd_status_nameview_y, wd_status_nameview_width);
        }
        if (wd_status_classview) {
            this.drawActorClass(actor, x + wd_status_classview_x, y + wd_status_classview_y, wd_status_classview_width);
        }
        if (wd_status_nickview) {
            this.drawActorNickname(actor, x + wd_status_nickview_x, y + wd_status_nickview_y, wd_status_nickview_width);
        }
        if (wd_status_lvview) {
            this.drawActorLevel(actor, x + wd_status_lvview_x, y + wd_status_lvview_y, wd_status_lvview_width);
        }
        if (wd_status_hpgaugeview) {
            this.drawActorHp(
                actor,
                x + wd_status_hpgaugeview_x,
                y + wd_status_hpgaugeview_y,
                wd_status_hpgaugeview_width
            );
        }
        if (wd_status_mpgaugeview) {
            this.drawActorMp(
                actor,
                x + wd_status_mpgaugeview_x,
                y + wd_status_mpgaugeview_y,
                wd_status_mpgaugeview_width
            );
        }
        if (wd_status_tpgaugeview) {
            this.drawActorTp(
                actor,
                x + wd_status_tpgaugeview_x,
                y + wd_status_tpgaugeview_y,
                wd_status_tpgaugeview_width
            );
        }
        if (wd_status_mhpview) {
            this.drawActorParam(actor, 0, x + wd_status_mhpview_x, y + wd_status_mhpview_y, wd_status_mhpview_width);
        }
        if (wd_status_mmpview) {
            this.drawActorParam(actor, 1, x + wd_status_mmpview_x, y + wd_status_mmpview_y, wd_status_mmpview_width);
        }
        if (wd_status_atkview) {
            this.drawActorParam(actor, 2, x + wd_status_atkview_x, y + wd_status_atkview_y, wd_status_atkview_width);
        }
        if (wd_status_defview) {
            this.drawActorParam(actor, 3, x + wd_status_defview_x, y + wd_status_defview_y, wd_status_defview_width);
        }
        if (wd_status_matview) {
            this.drawActorParam(actor, 4, x + wd_status_matview_x, y + wd_status_matview_y, wd_status_matview_width);
        }
        if (wd_status_mdfview) {
            this.drawActorParam(actor, 5, x + wd_status_mdfview_x, y + wd_status_mdfview_y, wd_status_mdfview_width);
        }
        if (wd_status_agiview) {
            this.drawActorParam(actor, 6, x + wd_status_agiview_x, y + wd_status_agiview_y, wd_status_agiview_width);
        }
        if (wd_status_lucview) {
            this.drawActorParam(actor, 7, x + wd_status_lucview_x, y + wd_status_lucview_y, wd_status_lucview_width);
        }
        if (wd_status_equipview) {
            this.drawActorEquipments(actor, x + wd_status_equipview_x, y + wd_status_equipview_y);
        }
    };

    function Window_PartyChangeCancel() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyChangeCancel.prototype = Object.create(Window_Command.prototype);
    Window_PartyChangeCancel.prototype.constructor = Window_PartyChangeCancel;

    Window_PartyChangeCancel.prototype.initialize = function () {
        var x = (Graphics.boxWidth - this.windowWidth()) / 2;
        var y = 120;
        Window_Command.prototype.initialize.call(this, x, y);
    };

    Window_PartyChangeCancel.prototype.windowWidth = function () {
        if (wd_sort_change) {
            return 500;
        } else {
            return 240;
        }
    };

    Window_PartyChangeCancel.prototype.makeCommandList = function () {
        this.addCommand("終了", "cancel");
        if (wd_sort_change) {
            this.addCommand(
                "ソート切り替え (現在:" + wd_sort_names[$gameVariables.value(wd_sort_variables)] + ")",
                "change"
            );
        }
        this.addCommand("キャンセル", "ok");
    };

    function Window_PartyChangeEliminate() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyChangeEliminate.prototype = Object.create(Window_Command.prototype);
    Window_PartyChangeEliminate.prototype.constructor = Window_PartyChangeEliminate;

    Window_PartyChangeEliminate.prototype.initialize = function () {
        var x = (Graphics.boxWidth - this.windowWidth()) / 2;
        var y = 120;
        Window_Command.prototype.initialize.call(this, x, y);
    };

    Window_PartyChangeEliminate.prototype.windowWidth = function () {
        return 240;
    };

    Window_PartyChangeEliminate.prototype.makeCommandList = function () {
        this.addCommand(wd_eliminate_text, "ok");
        this.addCommand("キャンセル", "cancel");
    };

    function Window_PartyChangeText1() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyChangeText1.prototype = Object.create(Window_Base.prototype);
    Window_PartyChangeText1.prototype.constructor = Window_PartyChangeText1;

    Window_PartyChangeText1.prototype.initialize = function () {
        var x = wd_text1_x;
        var y = wd_text1_y;
        var width = wd_text1_width;
        var height = wd_text1_height;

        this._width = width;

        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_PartyChangeText1.prototype.refresh = function () {
        this.contents.clear();
        this.drawText(wd_text1_mess, 0, 0, this._width - 32, "center");
    };

    function Window_PartyChangeText2() {
        this.initialize.apply(this, arguments);
    }

    Window_PartyChangeText2.prototype = Object.create(Window_Base.prototype);
    Window_PartyChangeText2.prototype.constructor = Window_PartyChangeText2;

    Window_PartyChangeText2.prototype.initialize = function (mode) {
        var x;
        var y;
        var width;
        var height;

        this._mode = mode;
        if (this._mode == 0) {
            x = wd_text2_x;
            y = wd_text2_y;
            width = wd_text2_width;
            height = wd_text2_height;
        }
        if (this._mode >= 1) {
            x = wd_text2_x2;
            y = wd_text2_y2;
            width = wd_text2_width2;
            height = wd_text2_height2;
        }
        this._width = width;

        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_PartyChangeText2.prototype.refresh = function () {
        this.contents.clear();
        this.drawText(wd_text2_mess, 0, 0, this._width - 32, "center");
    };
})();

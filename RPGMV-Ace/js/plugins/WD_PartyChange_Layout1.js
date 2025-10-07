//=============================================================================
// WD_PartyChange_Layout.js v1.00
//=============================================================================

/*:
 * @plugindesc パーティ編成システム(WD_PartyChange.js)のレイアウト設定です。(v1.00)
 * @author Izumi (http://izumiwhite.web.fc2.com/)
 *
 *
 * @help
 *
 *
 * ※レイアウトを変更したい場合は、スクリプトを直接編集してください。
 *
 */

(function () {
    //======== パーティリストウィンドウ レイアウト ========

    //ウィンドウの設定
    wd_front_x = 0;
    wd_front_y = 72;
    wd_front_width = 408;
    wd_front_height = 180;

    //列数の設定
    wd_front_maxcols = 1;

    //カーソルの設定
    wd_front_rect_width = 372;
    wd_front_rect_height = 36;
    wd_front_rect_spacing = 0;
    wd_front_rect_interval = 0;

    //顔グラフィックの表示
    wd_front_faceview = false;
    wd_front_faceview_x = 0;
    wd_front_faceview_y = 0;

    //歩行グラフィックの表示
    wd_front_charaview = false;
    wd_front_charaview_x = 24;
    wd_front_charaview_y = 48;

    //ステートの表示
    wd_front_stateview = false;
    wd_front_stateview_x = 0;
    wd_front_stateview_y = 0;
    wd_front_stateview_width = 144;

    //名前の表示
    wd_front_nameview = true;
    wd_front_nameview_x = 0;
    wd_front_nameview_y = 0;
    wd_front_nameview_width = 220;

    //職業の表示
    wd_front_classview = false;
    wd_front_classview_x = 0;
    wd_front_classview_y = 0;
    wd_front_classview_width = 220;

    //二つ名の表示
    wd_front_nickview = false;
    wd_front_nickview_x = 0;
    wd_front_nickview_y = 0;
    wd_front_nickview_width = 220;

    //レベルの表示
    wd_front_lvview = true;
    wd_front_lvview_x = 240;
    wd_front_lvview_y = 0;
    wd_front_lvview_width = 120;

    //HPゲージの表示
    wd_front_hpgaugeview = false;
    wd_front_hpgaugeview_x = 0;
    wd_front_hpgaugeview_y = 0;
    wd_front_hpgaugeview_width = 186;

    //MPゲージの表示
    wd_front_mpgaugeview = false;
    wd_front_mpgaugeview_x = 0;
    wd_front_mpgaugeview_y = 0;
    wd_front_mpgaugeview_width = 186;

    //TPゲージの表示
    wd_front_tpgaugeview = false;
    wd_front_tpgaugeview_x = 0;
    wd_front_tpgaugeview_y = 0;
    wd_front_tpgaugeview_width = 186;

    //最大HPの表示
    wd_front_mhpview = false;
    wd_front_mhpview_x = 0;
    wd_front_mhpview_y = 0;
    wd_front_mhpview_width = 220;

    //最大MPの表示
    wd_front_mmpview = false;
    wd_front_mmpview_x = 0;
    wd_front_mmpview_y = 0;
    wd_front_mmpview_width = 220;

    //攻撃力の表示
    wd_front_atkview = false;
    wd_front_atkview_x = 0;
    wd_front_atkview_y = 0;
    wd_front_atkview_width = 220;

    //防御力の表示
    wd_front_defview = false;
    wd_front_defview_x = 0;
    wd_front_defview_y = 0;
    wd_front_defview_width = 220;

    //魔法力の表示
    wd_front_matview = false;
    wd_front_matview_x = 0;
    wd_front_matview_y = 0;
    wd_front_matview_width = 220;

    //魔法防御の表示
    wd_front_mdfview = false;
    wd_front_mdfview_x = 0;
    wd_front_mdfview_y = 0;
    wd_front_mdfview_width = 220;

    //敏捷性の表示
    wd_front_agiview = false;
    wd_front_agiview_x = 0;
    wd_front_agiview_y = 0;
    wd_front_agiview_width = 220;

    //運の表示
    wd_front_lucview = false;
    wd_front_lucview_x = 0;
    wd_front_lucview_y = 0;
    wd_front_lucview_width = 220;

    //======== メンバーリストウィンドウ レイアウト ========

    //ウィンドウの設定
    wd_back_x = 0;
    wd_back_y = 324;
    wd_back_width = 408;
    wd_back_height = 300;

    //ウィンドウの設定(除籍時、リスト表示時)
    wd_back_x2 = 0;
    wd_back_y2 = 72;
    wd_back_width2 = 408;
    wd_back_height2 = 552;

    //列数の設定
    wd_back_maxcols = 1;

    //カーソルの設定
    wd_back_rect_width = 372;
    wd_back_rect_height = 36;
    wd_back_rect_spacing = 0;
    wd_back_rect_interval = 0;

    //顔グラフィックの表示
    wd_back_faceview = false;
    wd_back_faceview_x = 0;
    wd_back_faceview_y = 0;

    //歩行グラフィックの表示
    wd_back_charaview = false;
    wd_back_charaview_x = 24;
    wd_back_charaview_y = 48;

    //ステートの表示
    wd_back_stateview = false;
    wd_back_stateview_x = 0;
    wd_back_stateview_y = 0;
    wd_back_stateview_width = 144;

    //名前の表示
    wd_back_nameview = true;
    wd_back_nameview_x = 0;
    wd_back_nameview_y = 0;
    wd_back_nameview_width = 220;

    //職業の表示
    wd_back_classview = false;
    wd_back_classview_x = 0;
    wd_back_classview_y = 0;
    wd_back_classview_width = 220;

    //二つ名の表示
    wd_back_nickview = false;
    wd_back_nickview_x = 0;
    wd_back_nickview_y = 0;
    wd_back_nickview_width = 220;

    //レベルの表示
    wd_back_lvview = true;
    wd_back_lvview_x = 240;
    wd_back_lvview_y = 0;
    wd_back_lvview_width = 120;

    //HPゲージの表示
    wd_back_hpgaugeview = false;
    wd_back_hpgaugeview_x = 0;
    wd_back_hpgaugeview_y = 0;
    wd_back_hpgaugeview_width = 186;

    //MPゲージの表示
    wd_back_mpgaugeview = false;
    wd_back_mpgaugeview_x = 0;
    wd_back_mpgaugeview_y = 0;
    wd_back_mpgaugeview_width = 186;

    //TPゲージの表示
    wd_back_tpgaugeview = false;
    wd_back_tpgaugeview_x = 0;
    wd_back_tpgaugeview_y = 0;
    wd_back_tpgaugeview_width = 186;

    //最大HPの表示
    wd_back_mhpview = false;
    wd_back_mhpview_x = 0;
    wd_back_mhpview_y = 0;
    wd_back_mhpview_width = 220;

    //最大MPの表示
    wd_back_mmpview = false;
    wd_back_mmpview_x = 0;
    wd_back_mmpview_y = 0;
    wd_back_mmpview_width = 220;

    //攻撃力の表示
    wd_back_atkview = false;
    wd_back_atkview_x = 0;
    wd_back_atkview_y = 0;
    wd_back_atkview_width = 220;

    //防御力の表示
    wd_back_defview = false;
    wd_back_defview_x = 0;
    wd_back_defview_y = 0;
    wd_back_defview_width = 220;

    //魔法力の表示
    wd_back_matview = false;
    wd_back_matview_x = 0;
    wd_back_matview_y = 0;
    wd_back_matview_width = 220;

    //魔法防御の表示
    wd_back_mdfview = false;
    wd_back_mdfview_x = 0;
    wd_back_mdfview_y = 0;
    wd_back_mdfview_width = 220;

    //敏捷性の表示
    wd_back_agiview = false;
    wd_back_agiview_x = 0;
    wd_back_agiview_y = 0;
    wd_back_agiview_width = 220;

    //運の表示
    wd_back_lucview = false;
    wd_back_lucview_x = 0;
    wd_back_lucview_y = 0;
    wd_back_lucview_width = 220;

    //======== ステータスウィンドウ レイアウト ========

    //ウィンドウの設定
    wd_status_x = 408;
    wd_status_y = 0;
    wd_status_width = 408;
    wd_status_height = 624;

    //顔グラフィックの表示
    wd_status_faceview = true;
    wd_status_faceview_x = 220;
    wd_status_faceview_y = 36;

    //歩行グラフィックの表示
    wd_status_charaview = true;
    wd_status_charaview_x = 340;
    wd_status_charaview_y = 208;

    //ステートの表示
    wd_status_stateview = true;
    wd_status_stateview_x = 220;
    wd_status_stateview_y = 0;
    wd_status_stateview_width = 144;

    //名前の表示
    wd_status_nameview = true;
    wd_status_nameview_x = 0;
    wd_status_nameview_y = 0;
    wd_status_nameview_width = 220;

    //職業の表示
    wd_status_classview = true;
    wd_status_classview_x = 16;
    wd_status_classview_y = 36;
    wd_status_classview_width = 220;

    //二つ名の表示
    wd_status_nickview = true;
    wd_status_nickview_x = 16;
    wd_status_nickview_y = 72;
    wd_status_nickview_width = 220;

    //レベルの表示
    wd_status_lvview = true;
    wd_status_lvview_x = 16;
    wd_status_lvview_y = 108;
    wd_status_lvview_width = 120;

    //HPゲージの表示
    wd_status_hpgaugeview = true;
    wd_status_hpgaugeview_x = 16;
    wd_status_hpgaugeview_y = 144;
    wd_status_hpgaugeview_width = 186;

    //MPゲージの表示
    wd_status_mpgaugeview = true;
    wd_status_mpgaugeview_x = 16;
    wd_status_mpgaugeview_y = 180;
    wd_status_mpgaugeview_width = 186;

    //TPゲージの表示
    wd_status_tpgaugeview = false;
    wd_status_tpgaugeview_x = 0;
    wd_status_tpgaugeview_y = 0;
    wd_status_tpgaugeview_width = 186;

    //最大HPの表示
    wd_status_mhpview = false;
    wd_status_mhpview_x = 0;
    wd_status_mhpview_y = 0;
    wd_status_mhpview_width = 220;

    //最大MPの表示
    wd_status_mmpview = false;
    wd_status_mmpview_x = 0;
    wd_status_mmpview_y = 0;
    wd_status_mmpview_width = 220;

    //攻撃力の表示
    wd_status_atkview = true;
    wd_status_atkview_x = 0;
    wd_status_atkview_y = 234;
    wd_status_atkview_width = 160;

    //防御力の表示
    wd_status_defview = true;
    wd_status_defview_x = 192;
    wd_status_defview_y = 234;
    wd_status_defview_width = 160;

    //魔法力の表示
    wd_status_matview = true;
    wd_status_matview_x = 0;
    wd_status_matview_y = 270;
    wd_status_matview_width = 160;

    //魔法防御の表示
    wd_status_mdfview = true;
    wd_status_mdfview_x = 192;
    wd_status_mdfview_y = 270;
    wd_status_mdfview_width = 160;

    //敏捷性の表示
    wd_status_agiview = true;
    wd_status_agiview_x = 0;
    wd_status_agiview_y = 306;
    wd_status_agiview_width = 160;

    //運の表示
    wd_status_lucview = true;
    wd_status_lucview_x = 192;
    wd_status_lucview_y = 306;
    wd_status_lucview_width = 160;

    //装備の表示
    wd_status_equipview = true;
    wd_status_equipview_x = 16;
    wd_status_equipview_y = 354;

    //======== テキストウィンドウ1 レイアウト ========

    //ウィンドウの設定
    wd_text1_x = 0;
    wd_text1_y = 0;
    wd_text1_width = 408;
    wd_text1_height = 72;

    //======== テキストウィンドウ2 レイアウト ========

    //ウィンドウの設定
    wd_text2_x = 0;
    wd_text2_y = 252;
    wd_text2_width = 408;
    wd_text2_height = 72;

    //ウィンドウの設定(除籍時、リスト表示時)
    wd_text2_x2 = 0;
    wd_text2_y2 = 0;
    wd_text2_width2 = 408;
    wd_text2_height2 = 72;

    //======== 設定終わり ========
})();

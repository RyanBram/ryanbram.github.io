//=============================================================================
// RaceBattle.js
//
// (c)2016 KADOKAWA CORPORATION.
//=============================================================================

/*:
 * @plugindesc Race Battle
 * @author Keiji Agusa
 *
 * @requiredAssets img/racebattle/character/chara1-4_jump
 * @requiredAssets img/racebattle/character/chara1-ip_jump
 * @requiredAssets img/racebattle/character/chara1_d
 * @requiredAssets img/racebattle/character/chara1_dl
 * @requiredAssets img/racebattle/character/chara1_dl_helmet
 * @requiredAssets img/racebattle/character/chara1_dl_mask
 * @requiredAssets img/racebattle/character/chara1_dl_ribbon
 * @requiredAssets img/racebattle/character/chara1_d_helmet
 * @requiredAssets img/racebattle/character/chara1_d_mask
 * @requiredAssets img/racebattle/character/chara1_d_ribbon
 * @requiredAssets img/racebattle/character/chara1_l
 * @requiredAssets img/racebattle/character/chara1_l_helmet
 * @requiredAssets img/racebattle/character/chara1_l_mask
 * @requiredAssets img/racebattle/character/chara1_l_ribbon
 * @requiredAssets img/racebattle/character/chara1_u
 * @requiredAssets img/racebattle/character/chara1_ul
 * @requiredAssets img/racebattle/character/chara1_ul_helmet
 * @requiredAssets img/racebattle/character/chara1_ul_mask
 * @requiredAssets img/racebattle/character/chara1_ul_ribbon
 * @requiredAssets img/racebattle/character/chara1_u_helmet
 * @requiredAssets img/racebattle/character/chara1_u_mask
 * @requiredAssets img/racebattle/character/chara1_u_ribbon
 * @requiredAssets img/racebattle/character/chara2_d
 * @requiredAssets img/racebattle/character/chara2_dl
 * @requiredAssets img/racebattle/character/chara2_l
 * @requiredAssets img/racebattle/character/chara2_u
 * @requiredAssets img/racebattle/character/chara2_ul
 * @requiredAssets img/racebattle/character/chara3_d
 * @requiredAssets img/racebattle/character/chara3_dl
 * @requiredAssets img/racebattle/character/chara3_l
 * @requiredAssets img/racebattle/character/chara3_u
 * @requiredAssets img/racebattle/character/chara3_ul
 * @requiredAssets img/racebattle/character/chara4_d
 * @requiredAssets img/racebattle/character/chara4_dl
 * @requiredAssets img/racebattle/character/chara4_l
 * @requiredAssets img/racebattle/character/chara4_u
 * @requiredAssets img/racebattle/character/chara4_ul
 * @requiredAssets img/racebattle/character/chara5-8_jump
 * @requiredAssets img/racebattle/character/chara5_d
 * @requiredAssets img/racebattle/character/chara5_dl
 * @requiredAssets img/racebattle/character/chara5_l
 * @requiredAssets img/racebattle/character/chara5_u
 * @requiredAssets img/racebattle/character/chara5_ul
 * @requiredAssets img/racebattle/character/chara6_d
 * @requiredAssets img/racebattle/character/chara6_dl
 * @requiredAssets img/racebattle/character/chara6_l
 * @requiredAssets img/racebattle/character/chara6_u
 * @requiredAssets img/racebattle/character/chara6_ul
 * @requiredAssets img/racebattle/character/chara7_d
 * @requiredAssets img/racebattle/character/chara7_dl
 * @requiredAssets img/racebattle/character/chara7_l
 * @requiredAssets img/racebattle/character/chara7_u
 * @requiredAssets img/racebattle/character/chara7_ul
 * @requiredAssets img/racebattle/character/chara8_d
 * @requiredAssets img/racebattle/character/chara8_dl
 * @requiredAssets img/racebattle/character/chara8_l
 * @requiredAssets img/racebattle/character/chara8_u
 * @requiredAssets img/racebattle/character/chara8_ul
 * @requiredAssets img/racebattle/overlay/bar
 * @requiredAssets img/racebattle/overlay/bar_icon_01
 * @requiredAssets img/racebattle/overlay/bar_icon_02
 * @requiredAssets img/racebattle/overlay/bar_icon_03
 * @requiredAssets img/racebattle/overlay/bar_icon_04
 * @requiredAssets img/racebattle/overlay/bar_icon_05
 * @requiredAssets img/racebattle/overlay/bar_icon_06
 * @requiredAssets img/racebattle/overlay/bar_icon_07
 * @requiredAssets img/racebattle/overlay/bar_icon_08
 * @requiredAssets img/racebattle/overlay/bidding_gauge
 * @requiredAssets img/racebattle/overlay/bidding_gauge_table
 * @requiredAssets img/racebattle/overlay/button_off
 * @requiredAssets img/racebattle/overlay/button_on
 * @requiredAssets img/racebattle/overlay/cutin_01
 * @requiredAssets img/racebattle/overlay/cutin_02
 * @requiredAssets img/racebattle/overlay/cutin_03
 * @requiredAssets img/racebattle/overlay/cutin_balloon_01_a
 * @requiredAssets img/racebattle/overlay/cutin_balloon_01_b
 * @requiredAssets img/racebattle/overlay/cutin_balloon_02_a
 * @requiredAssets img/racebattle/overlay/cutin_balloon_02_b
 * @requiredAssets img/racebattle/overlay/cutin_balloon_03_a
 * @requiredAssets img/racebattle/overlay/cutin_balloon_03_b
 * @requiredAssets img/racebattle/overlay/cutin_table_01
 * @requiredAssets img/racebattle/overlay/cutin_table_02
 * @requiredAssets img/racebattle/overlay/cutin_table_03
 * @requiredAssets img/racebattle/overlay/player_arrow
 * @requiredAssets img/racebattle/overlay/umaface
 * @requiredAssets img/racebattle/overlay/instruction_button
 * @requiredAssets img/racebattle/overlay/stamina_window
 * @requiredAssets img/racebattle/track/bg_corner
 * @requiredAssets img/racebattle/track/bg_corner_fence_a
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_ip_01
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_ip_02
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_ip_03
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_normal_01
 * @requiredAssets img/racebattle/track/bg_corner_fence_b
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_ip_01
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_ip_02
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_ip_03
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_normal_01
 * @requiredAssets img/racebattle/track/bg_corner_padding
 * @requiredAssets img/racebattle/track/bg_corner_sand
 * @requiredAssets img/racebattle/track/bg_front
 * @requiredAssets img/racebattle/track/bg_front_fence_a
 * @requiredAssets img/racebattle/track/bg_front_fence_a_ip_01
 * @requiredAssets img/racebattle/track/bg_front_fence_a_ip_02
 * @requiredAssets img/racebattle/track/bg_front_fence_a_ip_03
 * @requiredAssets img/racebattle/track/bg_front_fence_a_normal_01
 * @requiredAssets img/racebattle/track/bg_front_fence_b
 * @requiredAssets img/racebattle/track/bg_front_fence_b_ip_01
 * @requiredAssets img/racebattle/track/bg_front_fence_b_ip_02
 * @requiredAssets img/racebattle/track/bg_front_fence_b_ip_03
 * @requiredAssets img/racebattle/track/bg_front_fence_b_normal_01
 * @requiredAssets img/racebattle/track/bg_front_fence_c
 * @requiredAssets img/racebattle/track/bg_front_sand
 * @requiredAssets img/racebattle/track/bg_overthere
 * @requiredAssets img/racebattle/track/bg_overthere_fence_a
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_ip_01
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_ip_02
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_ip_03
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_normal_01
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_ip_01
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_ip_02
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_ip_03
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_normal_01
 * @requiredAssets img/racebattle/track/bg_overthere_grass
 * @requiredAssets img/racebattle/track/bg_overthere_grass_b
 * @requiredAssets img/racebattle/track/bg_overthere_sand
 * @requiredAssets img/racebattle/track/goal
 * @requiredAssets img/racebattle/track/obstacle_easy
 * @requiredAssets img/racebattle/track/obstacle_effect_easy
 * @requiredAssets img/racebattle/track/obstacle_effect_hard
 * @requiredAssets img/racebattle/track/obstacle_effect_normal
 * @requiredAssets img/racebattle/track/obstacle_hard
 * @requiredAssets img/racebattle/track/obstacle_normal
 *
 * @requiredAssets img/system/Window
 * @requiredAssets img/animations/Hit1
 * @requiredAssets img/animations/HitPhoton
 * @requiredAssets img/animations/Hit2
 * @requiredAssets img/animations/HitThunder
 *
 * @requiredAssets audio/se/Evasion2
 * @requiredAssets audio/se/Damage4
 * @requiredAssets audio/se/Powerup
 * @requiredAssets audio/se/Blow3
 * @requiredAssets audio/se/Thunder8
 *
 * @requiredAssets audio/se/Blow1
 * @requiredAssets audio/se/Blow2
 * @requiredAssets audio/se/Applause1
 * @requiredAssets audio/se/Applause2
 * @requiredAssets audio/se/Horse
 * @requiredAssets audio/se/Wind1
 * @requiredAssets audio/se/Dive
 * @requiredAssets audio/se/Liquid
 * @requiredAssets audio/se/Jump1
 * @requiredAssets audio/se/horse_run
 *
 * @help
 * Plugin Command:
 *	 RaceBattle switch <flag>
 *	 	# change a battle scene into a race battle or not. <flag>: 1: Race Battle, 0: Normal Battle.
 *	 RaceBattle bgm <mainBGM name> <volume> <pitch> <lastBGM name> <volume> <pitch>
 *	 	# specify BGM.
 *	 RaceBattle enemies <number of opponents>
 *	 	# specify the number of opponents.
 *	 RaceBattle ground <kind>
 *	 	# specify the kind of ground. <kind>: 0: grass, 1: dirt.
 *	 RaceBattle fence <kind>
 *	 	# specify the kind of fence. <fence>: 0: normal, 1: IP01, 2: IP02, 3: IP03, 4: normal event character
 *	 RaceBattle raceTitle <line1> < line2>
 *	 	# specify a race title. <line1>: 1st line text of the title, <line2>: 2nd line text of the title.
 *	 RaceBattle obstacle <difficulty> <appearance> <slowdown>
 *	 	# specify the property of obstacles. <difficulty>: easy/normal/hard. <appearance>: the probability of appearance. not appears if it is 0. <slowdown>: rate of slow down. ex. 50% slow down when it is 0.5.
 *	 RaceBattle cheer <IP number> <times>
 *	 	# specify the times of IP character's cheering. <IP number>: 1/2/3. My character wears a harness of the IP character.
 *	 RaceBattle equip <IP equipment number> [<IP equipment number> <IP equipment number>]
 *	 	# specify IP equipment to equip. specify up to three. <IP equipment number>: 1/2/3.
 *	 RaceBattle param <character number> <stamina> <speed> <guts> <smartness>
 *	 	# specify properties of a character. <character number>: 0 means my character. ex. <stamina>=1000, <speed>=50, <guts>=40, <smartness>=100
 *	 RaceBattle charaName <character number> <name> [<color>]
 *	 	# specify the name of a character. <character number>: 0 means my character. <color>: 1: red hat,brown horse 2: blue Hat,red horse 3: yellow hat,white horse 4: green hat,purple horse 5: orange hat,orange horse 6: purple hat,pink horse 7: black hat,yellow horse 8: light blue hat,black horse
 *	 RaceBattle arrival <variabe number1> <variable number2> ... <variable number (number of opponents + 1)>
 *	 	# specify variable numbers for setting the orders of characters' goaling. My character's goal order is set to <variable number1>.
 *	 RaceBattle rankingName <variable number1> <variable number2> ... <variable number(number of opponents + 1)>
 *	 	# from the first horse, specify the variable number to store the horse name.
 *	 RaceBattle help <flag>
 *	 	# specify it shows help or not. <flag>: 1: shows help.
 *	 RaceBattle helpText <kind> <text> <font color> <edge color>
 *	 	# specify help text, and so on. <kind>: training/compete/move/racing/last_spurt. <text>: text of a help. it is possible to specify the character color only for each line (add "#rrggbb" at the beginning of the line). by using "#p" you can create 2 pages or later. items after the color specification of characters can be omitted.<font color>: a font color like #ffffff. <edge color>: an edge color like rgba(255,0,0,255).
 *	 RaceBattle skill <slot> <number>
 *	 	# set a skill of <number> to slot <slot>. <slot>: 0/1/2. <number>: 0/1/... # if <number> = 0, then all skills of <slot> and the following get clear.
 *	 RaceBattle course <distance1> <angle1> [<distance1b> compete] <disntace2> <angle2> [<distance2b> compete] ... <distanceN> front>
 *	 	# specify the track. goal point is at 0m. specify angle at a distance point, and specify compete phase at a distance point. you may omit compete phases, then racing phase continues. at the end, you should specify front angle, and it becomes last spurt phase.
 *   		ex. RaceBattle course 2400 front 2200 move 1800 upCorner 1650 move 1500 overthere 1200 move 900 downCorner 750 move 600 front
 */

/*:ja
 * @plugindesc レースバトル
 * @author Keiji Agusa
 *
 * @requiredAssets img/racebattle/character/chara1-4_jump
 * @requiredAssets img/racebattle/character/chara1-ip_jump
 * @requiredAssets img/racebattle/character/chara1_d
 * @requiredAssets img/racebattle/character/chara1_dl
 * @requiredAssets img/racebattle/character/chara1_dl_helmet
 * @requiredAssets img/racebattle/character/chara1_dl_mask
 * @requiredAssets img/racebattle/character/chara1_dl_ribbon
 * @requiredAssets img/racebattle/character/chara1_d_helmet
 * @requiredAssets img/racebattle/character/chara1_d_mask
 * @requiredAssets img/racebattle/character/chara1_d_ribbon
 * @requiredAssets img/racebattle/character/chara1_l
 * @requiredAssets img/racebattle/character/chara1_l_helmet
 * @requiredAssets img/racebattle/character/chara1_l_mask
 * @requiredAssets img/racebattle/character/chara1_l_ribbon
 * @requiredAssets img/racebattle/character/chara1_u
 * @requiredAssets img/racebattle/character/chara1_ul
 * @requiredAssets img/racebattle/character/chara1_ul_helmet
 * @requiredAssets img/racebattle/character/chara1_ul_mask
 * @requiredAssets img/racebattle/character/chara1_ul_ribbon
 * @requiredAssets img/racebattle/character/chara1_u_helmet
 * @requiredAssets img/racebattle/character/chara1_u_mask
 * @requiredAssets img/racebattle/character/chara1_u_ribbon
 * @requiredAssets img/racebattle/character/chara2_d
 * @requiredAssets img/racebattle/character/chara2_dl
 * @requiredAssets img/racebattle/character/chara2_l
 * @requiredAssets img/racebattle/character/chara2_u
 * @requiredAssets img/racebattle/character/chara2_ul
 * @requiredAssets img/racebattle/character/chara3_d
 * @requiredAssets img/racebattle/character/chara3_dl
 * @requiredAssets img/racebattle/character/chara3_l
 * @requiredAssets img/racebattle/character/chara3_u
 * @requiredAssets img/racebattle/character/chara3_ul
 * @requiredAssets img/racebattle/character/chara4_d
 * @requiredAssets img/racebattle/character/chara4_dl
 * @requiredAssets img/racebattle/character/chara4_l
 * @requiredAssets img/racebattle/character/chara4_u
 * @requiredAssets img/racebattle/character/chara4_ul
 * @requiredAssets img/racebattle/character/chara5-8_jump
 * @requiredAssets img/racebattle/character/chara5_d
 * @requiredAssets img/racebattle/character/chara5_dl
 * @requiredAssets img/racebattle/character/chara5_l
 * @requiredAssets img/racebattle/character/chara5_u
 * @requiredAssets img/racebattle/character/chara5_ul
 * @requiredAssets img/racebattle/character/chara6_d
 * @requiredAssets img/racebattle/character/chara6_dl
 * @requiredAssets img/racebattle/character/chara6_l
 * @requiredAssets img/racebattle/character/chara6_u
 * @requiredAssets img/racebattle/character/chara6_ul
 * @requiredAssets img/racebattle/character/chara7_d
 * @requiredAssets img/racebattle/character/chara7_dl
 * @requiredAssets img/racebattle/character/chara7_l
 * @requiredAssets img/racebattle/character/chara7_u
 * @requiredAssets img/racebattle/character/chara7_ul
 * @requiredAssets img/racebattle/character/chara8_d
 * @requiredAssets img/racebattle/character/chara8_dl
 * @requiredAssets img/racebattle/character/chara8_l
 * @requiredAssets img/racebattle/character/chara8_u
 * @requiredAssets img/racebattle/character/chara8_ul
 * @requiredAssets img/racebattle/overlay/bar
 * @requiredAssets img/racebattle/overlay/bar_icon_01
 * @requiredAssets img/racebattle/overlay/bar_icon_02
 * @requiredAssets img/racebattle/overlay/bar_icon_03
 * @requiredAssets img/racebattle/overlay/bar_icon_04
 * @requiredAssets img/racebattle/overlay/bar_icon_05
 * @requiredAssets img/racebattle/overlay/bar_icon_06
 * @requiredAssets img/racebattle/overlay/bar_icon_07
 * @requiredAssets img/racebattle/overlay/bar_icon_08
 * @requiredAssets img/racebattle/overlay/bidding_gauge
 * @requiredAssets img/racebattle/overlay/bidding_gauge_table
 * @requiredAssets img/racebattle/overlay/button_off
 * @requiredAssets img/racebattle/overlay/button_on
 * @requiredAssets img/racebattle/overlay/cutin_01
 * @requiredAssets img/racebattle/overlay/cutin_02
 * @requiredAssets img/racebattle/overlay/cutin_03
 * @requiredAssets img/racebattle/overlay/cutin_balloon_01_a
 * @requiredAssets img/racebattle/overlay/cutin_balloon_01_b
 * @requiredAssets img/racebattle/overlay/cutin_balloon_02_a
 * @requiredAssets img/racebattle/overlay/cutin_balloon_02_b
 * @requiredAssets img/racebattle/overlay/cutin_balloon_03_a
 * @requiredAssets img/racebattle/overlay/cutin_balloon_03_b
 * @requiredAssets img/racebattle/overlay/cutin_table_01
 * @requiredAssets img/racebattle/overlay/cutin_table_02
 * @requiredAssets img/racebattle/overlay/cutin_table_03
 * @requiredAssets img/racebattle/overlay/player_arrow
 * @requiredAssets img/racebattle/overlay/umaface
 * @requiredAssets img/racebattle/overlay/instruction_button
 * @requiredAssets img/racebattle/overlay/stamina_window
 * @requiredAssets img/racebattle/track/bg_corner
 * @requiredAssets img/racebattle/track/bg_corner_fence_a
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_ip_01
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_ip_02
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_ip_03
 * @requiredAssets img/racebattle/track/bg_corner_fence_a_normal_01
 * @requiredAssets img/racebattle/track/bg_corner_fence_b
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_ip_01
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_ip_02
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_ip_03
 * @requiredAssets img/racebattle/track/bg_corner_fence_b_normal_01
 * @requiredAssets img/racebattle/track/bg_corner_padding
 * @requiredAssets img/racebattle/track/bg_corner_sand
 * @requiredAssets img/racebattle/track/bg_front
 * @requiredAssets img/racebattle/track/bg_front_fence_a
 * @requiredAssets img/racebattle/track/bg_front_fence_a_ip_01
 * @requiredAssets img/racebattle/track/bg_front_fence_a_ip_02
 * @requiredAssets img/racebattle/track/bg_front_fence_a_ip_03
 * @requiredAssets img/racebattle/track/bg_front_fence_a_normal_01
 * @requiredAssets img/racebattle/track/bg_front_fence_b
 * @requiredAssets img/racebattle/track/bg_front_fence_b_ip_01
 * @requiredAssets img/racebattle/track/bg_front_fence_b_ip_02
 * @requiredAssets img/racebattle/track/bg_front_fence_b_ip_03
 * @requiredAssets img/racebattle/track/bg_front_fence_b_normal_01
 * @requiredAssets img/racebattle/track/bg_front_fence_c
 * @requiredAssets img/racebattle/track/bg_front_sand
 * @requiredAssets img/racebattle/track/bg_overthere
 * @requiredAssets img/racebattle/track/bg_overthere_fence_a
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_ip_01
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_ip_02
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_ip_03
 * @requiredAssets img/racebattle/track/bg_overthere_fence_b_normal_01
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_ip_01
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_ip_02
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_ip_03
 * @requiredAssets img/racebattle/track/bg_overthere_fence_c_normal_01
 * @requiredAssets img/racebattle/track/bg_overthere_grass
 * @requiredAssets img/racebattle/track/bg_overthere_grass_b
 * @requiredAssets img/racebattle/track/bg_overthere_sand
 * @requiredAssets img/racebattle/track/goal
 * @requiredAssets img/racebattle/track/obstacle_easy
 * @requiredAssets img/racebattle/track/obstacle_effect_easy
 * @requiredAssets img/racebattle/track/obstacle_effect_hard
 * @requiredAssets img/racebattle/track/obstacle_effect_normal
 * @requiredAssets img/racebattle/track/obstacle_hard
 * @requiredAssets img/racebattle/track/obstacle_normal
 *
 * @requiredAssets img/system/Window
 * @requiredAssets img/animations/Hit1
 * @requiredAssets img/animations/HitPhoton
 * @requiredAssets img/animations/Hit2
 * @requiredAssets img/animations/HitThunder
 *
 * @requiredAssets audio/se/Evasion2
 * @requiredAssets audio/se/Damage4
 * @requiredAssets audio/se/Powerup
 * @requiredAssets audio/se/Blow3
 * @requiredAssets audio/se/Thunder8
 *
 * @requiredAssets audio/se/Blow1
 * @requiredAssets audio/se/Blow2
 * @requiredAssets audio/se/Applause1
 * @requiredAssets audio/se/Applause2
 * @requiredAssets audio/se/Horse
 * @requiredAssets audio/se/Wind1
 * @requiredAssets audio/se/Dive
 * @requiredAssets audio/se/Liquid
 * @requiredAssets audio/se/Jump1
 * @requiredAssets audio/se/horse_run
 *
 * @help
 * Plugin Command:
 *	 RaceBattle switch <切り替え指定>
 *	 	# バトルをレースバトルにするかを切り替えます: <切り替え指定>: 1=レースバトルにする, 0=通常バトルにする
 *	 RaceBattle bgm <メイン曲名> <volume> <pitch> <ラストスパート曲名> <volume> <pitch>
 *	 	# ＢＧＭを指定します
 *	 RaceBattle enemies <敵の数>
 *	 	# 敵の数を指定します
 *	 RaceBattle ground <地面の種類>
 *	 	# 地面の種類を指定します: 0: 芝, 1: ダート
 *	 RaceBattle fence <埒の種類>
 *	 	# 埒の種類を指定します: 0: 通常, 1: IP01, 2: IP02, 3: IP03, 4: normal01
 *	 RaceBattle raceTitle <レースタイトル名>
 *	 	# レースタイトル名を指定します
 *	 RaceBattle obstacle <難易度> <出現確率> <減速率>
 *	 	# 障害物の<難易度>の<出現確率><減速率>を設定します。<難易度>: easy/normal/hard <出現確率>=0の場合はその難易度の障害物は出現しません。<減速率>:0～100で指定(50で半分,100で減衰無し)
 *	 RaceBattle cheer <IP1回数> <IP2回数> <IP3回数>
 *	 	# IPキャラの応援回数を指定します。<IP1回数>:パックマン、<IP2回数>:もじくん、<IP3回数>:ワルキューレ
 *	 RaceBattle equip <IP装備1> [<IP装備2> <IP装備3>]
 *	 	# 装備するIP装備品を指定する。最大３個。<IP装備n>:IP装備番号。1:パックマン,2:もじくん,3:ワルキューレ
 *	 RaceBattle param <キャラ番号> <スタミナ> <はやさ> <こんじょう> <かしこさ>
 *	 	# キャラのパラメータを設定します。<キャラ番号>=0が自キャラです。
 *	 RaceBattle charaName <番号> <馬名> [<色>]
 *	 	# 馬名と色を指定します。<番号>=0は自馬の名前の指定となります。<色>=1:赤帽,茶馬、2:青帽,赤馬、3:黄帽,白馬、4:緑帽,紫馬、5:橙帽,橙馬、6:紫帽,桃馬、7:黒帽,黄馬、8:水帽,黒馬
 *	 RaceBattle arrival <馬1の着順格納変数番号> <馬2の着順格納変数番号> ... <馬(enemies + 1>の着順格納変数番号>
 *	 	# 着順を格納する変数番号を指定します。
 *	 RaceBattle rankingName <1位の馬名格納変数番号> <2位の馬名格納変数番号> ... <(enemies + 1>位の馬名格納変数番号>
 *	 	# １位から順に馬名を格納する変数番号を指定します。
 *	 RaceBattle help <ヘルプを表示させるか>
 *	 	# <ヘルプを表示させるか>: 1: ヘルプを表示させる
 *	 RaceBattle helpText <ヘルプ種別> <ヘルプテキスト> <文字色> <文字縁色>
 *	 	# ヘルプテキストを設定する。<ヘルプ種別>: training(訓練), compete(競り合いフェイズ), move(移動指示フェイズ), racing(走行フェイズ), last_spurt(ラストスパートフェイズ), <ヘルプテキスト>: 行単位のみ文字色指定が可能（行の先頭に「#rrggbb」を付ける）#pで改ページ ,文字色以降は省略可能
 *	 RaceBattle skill <スキル番号>
 *	 	# <スキル番号>のスキルを追加する。<スキル番号>: 1～
 *	 RaceBattle course <distance1> <angle1> [<distance1b> compete] <disntace2> <angle2> [<distance2b> compete] ... <distanceN> front>
 *	 	# コースを指定します。ゴール地点を0mとして、どの距離にどのアングルがあるか、また、フェイズ(compete,competeX,move)の距離位置を指定します。フェイズの距離位置指定は省略可能です。（単に走行フェーズが続くようになります。） 最後にfront(=最後の直線)を指定しますが、これがラストスパートフェイズとなります。
 *   		例: RaceBattle course 2400 front 2200 move 1800 upCorner 1650 move 1500 overthere 1200 move 900 downCorner 750 move 600 front
 */

(function (){
"use strict";

var parameters = PluginManager.parameters('RaceBattle');
var _isRaceBattle = 0;
var _bgmPrm = [[],[]];
var _enemies = null;
var _startX = null;
var _angleChange = null;
var _phaseChange = null;
var _counter = 0;
var _goaledCounter = 0;
var _raceResult = null;
var _camera = null;
var _phaseScrollVx = 0;
var _cornerRad = 0;
var _angleStart = 0;
var _angleDistance = 1;
var _raceTrack = null;
var _trackSpr = null;
var _fenceASpr = null;
var _fenceBSpr = null;
var _fenceCSpr = null;
var _grassSpr = null;
var _goalSpr = null;
var _chrSprList = null;
var _chrSprVX = null;
var _whipIconSprList = null;
var _progressGaugeSpr = null;
var _positionMarkerSprList = null;
var WhipPosList = [283 - 20, 391, 499 + 20];
var _phase = null;
var _angle = null;
var _oldPhase = null;
var _startPhaseUse = false;
var _clockwise = true;
var _groundKind = null;
var _fenceKind = null;
var CharacterAngleTest = false;
var HorseWidth = 2.4*8; //*8で八倍速設定。メートル単位の馬身（大きくするとメートル単位での馬の移動量が大きくなる→レース時間が短くなる。）
var MeterToScrCoordScaling = 108 / HorseWidth;	 // 1mを画面のドット数に変換する係数。（１馬身と馬グラフィックの馬の幅との比率で設定。）
var _blankFrames = 0;
var _whipSelect = null;
var _angleLaneCount = 0;
var _angleLaneWidth = 0;
var _lastStraight = true;
var _raceTitle = null;
var _staminaList = null;
var _maxStaminaList = null;
var _lastStaminaList = null;
var _maxStamina = 1000;
var _speedList = null;
var _gutsList = null;
var _smartList = null;
var _competeInfo = null;
var _competeDamagedPrevent = 1;

var GroundImageList = {
	grass: ["bg_front", "bg_corner", "bg_overthere", "bg_overthere_grass"],
	sand: ["bg_front_sand", "bg_corner_sand", "bg_overthere_sand", "bg_overthere_grass_b"]
};
var FenceImageList = {
	normal: ["bg_front_fence_a", "bg_front_fence_b", "bg_front_fence_c", "bg_corner_fence_a", "bg_corner_fence_b", "bg_overthere_fence_a", "bg_overthere_fence_b", "bg_overthere_fence_c"],
	ip01: ["bg_front_fence_a_ip_01", "bg_front_fence_b_ip_01", "bg_front_fence_c", "bg_corner_fence_a_ip_01", "bg_corner_fence_b_ip_01", "bg_overthere_fence_a", "bg_overthere_fence_b_ip_01", "bg_overthere_fence_c_ip_01"],
	ip02: ["bg_front_fence_a_ip_02", "bg_front_fence_b_ip_02", "bg_front_fence_c", "bg_corner_fence_a_ip_02", "bg_corner_fence_b_ip_02", "bg_overthere_fence_a", "bg_overthere_fence_b_ip_02", "bg_overthere_fence_c_ip_02"],
	ip03: ["bg_front_fence_a_ip_03", "bg_front_fence_b_ip_03", "bg_front_fence_c", "bg_corner_fence_a_ip_03", "bg_corner_fence_b_ip_03", "bg_overthere_fence_a", "bg_overthere_fence_b_ip_03", "bg_overthere_fence_c_ip_03"],
	no01: ["bg_front_fence_a_normal_01", "bg_front_fence_b_normal_01", "bg_front_fence_c", "bg_corner_fence_a_normal_01", "bg_corner_fence_b_normal_01", "bg_overthere_fence_a", "bg_overthere_fence_b_normal_01", "bg_overthere_fence_c_normal_01"]
};
var CutinImageList = [
	["cutin_01", "cutin_balloon_01_a", "cutin_balloon_01_b", "cutin_table_01"],
	["cutin_02", "cutin_balloon_02_a", "cutin_balloon_02_b", "cutin_table_02"],
	["cutin_03", "cutin_balloon_03_a", "cutin_balloon_03_b", "cutin_table_03"],
];
var CharacterImageKindMax = 8;
var Obstacle_Easy = 0;
var Obstacle_Normal = 1;
var Obstacle_Hard = 2;
var _obstacleInfo = null;
var ObstacleHeightList = [120, 100, 60];
var _obstacleList = null;
var _characterNameList = null;
var _characterColorList = null;
var _cheerIp = null;
var _cutinIp = 0;
var _equipIp = null;
var _help = false;
var _helpedList = null;
var _helpPause = false;
var _helpInfoList = null;
var _arrivalVarList = null;
var _rankNameVarList = null;
var _skillList = null;
var _goalOrderList = null;
var _goalCharaCount = 0;
var _finishedCharaCount = 0;
var _myMarkerSpr = null;

var _sceneBattle = null;
var _delayedCount = 0;
var _delayedPhase = null;

var _raceSignWindow = null;
var _rankWindow = null;
var _rankWindowNum = 1;
var _myStaminaWindow = null;
var _myStaminaGauge = null;
var _myStaminaContents = null;
var _othersStaminaWindow = null;
var _othersStaminaGaugeList = null;
var _restTurnSprite = null;
var _restTurnBitmap = null;
var _restTurnCount = 2;//3;
var _zanWinSprite = null;
var _competeList = null;
var MoveDirection_None = 0;
var MoveDirection_InCourse = 1;
var MoveDirection_Forward = 2;
var MoveDirection_Backward = 3;
var MoveDirection_OutCourse = 4;
var _moveDirection = MoveDirection_None;
var _moveSelectedSkill = -1;
var _competeLastTarget = -1;
var InitialSkillEffect = {
	'compete_damaging_rate': 1,
	'compete_damaged_rate': 1,
	'compete_invisible': false,
	'compete_weakest_damaging_rate': 1,
	'move_forward_rate_add': 0,
	'move_in_course_rate_add': 0,
	'racing_speed_rate': 1,
	'obstacle_easy_avoid_rate_add': 0,
	'obstacle_normal_avoid_rate_add': 0,
	'obstacle_hard_avoid_rate_add': 0,
};

var _skillEffect = null;
var SkillInfo_Name = 0;
var SkillInfo_Effect = 1;
var SkillInfo_Count = 2;
var SkillInfo_Help = 3;
var SkillInfoList = [
	['火事場のウマ力', {operation: 'mul', property: 'compete_damaging_rate', value: 1.5}, 2, "ここぞで発揮のウマ力！\n競り合いフェイズで与えるダメージが上昇する。"],
	['馬耳東風', {operation: 'mul', property: 'compete_damaged_rate', value: 0.75}, 2, "春風のように攻撃を華麗に避ける！\n競り合いフェイズで受けるダメージが減少する。"],
	['ダークホース', {operation: 'set', property: 'compete_invisible', value: true}, 2, "闇に紛れて気配を消す！\n競り合いフェイズで攻撃をしない代わりに標的にされない。"],
	['塞翁が馬', {operation: 'mul', property: 'compete_weakest_damaging_rate', value: 2}, 2, "まだ負けは決まっていない！\n残スタミナ量が使用競り合いフェイズ内で一番低い場合、\n競り合いフェイズで与えるダメージが上昇する。"],

	['強い扶助(前進)', {operation: 'set', property: 'move_forward_rate_add', value: 1}, 1, "的確な指示を出す！\n移動指示フェイズで前進が必ず成功する。"],
	['強い扶助(インコース)', {operation: 'set', property: 'move_in_course_rate_add', value: 1}, 2, "的確な指示を出す！\n移動指示フェイズでインコースへの移動が必ず成功する。"],

	['100馬力ブースト', {operation: 'mul', property: 'racing_speed_rate', value: 1.5}, 2, "他馬の追随を許さない！\n走行フェイズで走る速さが上昇する。"],
	['馬草の友', {operation: 'set', property: 'obstacle_easy_avoid_rate_add', value: 1}, 99, "ウマと草はともだち！\n障害物「生垣」を必ず避けることができる。"],
	['天馬のはばたき', {operation: 'set', property: 'obstacle_hard_avoid_rate_add', value: 1}, 3, "天馬のように軽やかに飛び抜ける！\n障害物「水濠」を必ず避けることができる。"],
	['馬竹の勢い', {operation: 'set', property: 'obstacle_normal_avoid_rate_add', value: 1}, 4, "この勢いをとめることはできない！\n障害物「竹柵」を必ず避けることができる。"],
];

//温存ルートフラグ
var _isSparing = false;

var _otherCompeteIndex = null;
var _competeOrder = 0;
var _competePhase = null;
var _movePhase = null;
var _lastSpurtPhase = null;
var RaceBattleLogRacingX = 0;
var RaceBattleLogRacingY = 444;
var RaceBattleLogRacingWidth = 817;
var RaceBattleLogRacingHeight = 180;
var RaceBattleLogCompeteX = 192;
var RaceBattleLogCompeteY = 444;
var RaceBattleLogCompeteWidth = 408;
var RaceBattleLogCompeteHeight = 180;

var SkillEffectMessageWindowX = 192;
var SkillEffectMessageWindowY = 128 - 24;
var SkillEffectMessageWindowWidth = 408;
var SkillEffectMessageWindowHeight = 176;
var ResultWindowX = 156;
var ResultWindowY = 152;
var ResultWindowWidth = 480;
var ResultWindowHeight = 128;
var _helpWindow = null;

var HelpWindowX = 20;
var HelpWindowY = 20;
var HelpWindowWidth = 816 - 40;
var HelpWindowHeight = 624 - 40;
var _staminaList = null;

var _debugSprite = null;

var _competeVx = _startX;
var _chrMinVx = _startX;
var _movePhaseSkip = false;
var _moveCount = 0;
var PhaseScrollVxDegree = 1/MeterToScrCoordScaling;
var _topCam = true;
var _competeAdjust = 0;
var _cutin = null;
var _commentCounter = 0;

var _moveHorseForceMoveX = 0;
var _moveHorseForceKeep = 0;
var _lastPartyCommandWindow = null;
var _lastStatusWindow = null;
var _lastSKillWindow = null;
var _competeHorseSprList = null;
var _competeHorseOffset = null;
var _competeHorseKnockBack = null;
var ZanWindowX = 214;
var ZanWindowY = 294;

var CompeteHorseMinX = 224;
var CompeteHorseMaxX = 710;
var CompeteHorseMinY = 330;
var CompeteHorseMaxY = 345;
var _moveOrderWindow = null;
var MyStaminaWindowX = 600;
var MyStaminaWindowY = 444;
var MyStaminaWindowWidth = 216;
var MyStaminaWindowHeight = 60;
var OthersStaminaWindowX = 600;
var OthersStaminaWindowY = 504;

var SkillHelpX = 0;
var SkillHelpY = 110;
var SkillHelpWidth = 816;
var SkillHelpHeight = 320;

var _raceStartCount = 0;

var IntermediateTopGroupCommentList = [
	//1～5は、２頭レースの場合用に３位以下の表記をしない事
	"%1o安定した走り。",
	"%1o依然として１位をキープ。",
	"先頭争いは%1oと%2o！",
	"%2oは%1oを捉えられるか！？",
	"%1o先頭\nその後ろから%2oが追っています！",
	//
	"1番手%1o\n2番手%2o\n次いで%3o。",
	"%2o追い上げます！\n%3oもいい走り！",
	"%4oと%5oもいい走りをみせております！",
	"%mも先頭グループの中にいます！",
	"%m懸命な走りをみせております！",
];
var IntermediateFollowingGroupCommentList = [
	//1～5は、２頭レースの場合用に３位以下の表記をしない事
	"%1o安定した走り。",
	"%1o依然として１位をキープ。",
	"先頭争いは%1oと%2o！",
	"%2oは%1oを捉えられるか！？",
	"%1o先頭\nその後ろから%2oが追っています！",
	//
	"1番手%1o\n2番手%2o\n次いで%3o。",
	"%2o追い上げます\n%3oもいい走り！",
	"%4oと%5oもいい走りをみせております！",
	"%mは先頭グループに懸命に割り込もうとしてます！",
	"%mは先頭グループに割り込めるか！？",
];
var _intermediateLiveCommentIndex = 0;
var StartLiveCommentList = [
	"各馬一斉ににスタートしました。",
	"揃ってスタートしました。",
	"まずまずのスタートです。",
	"おっと%d出遅れた。"
];
var _startLiveCommentIndex = 0;
var _lastSpurtLiveCommentIndex = 0;
var _lastSpurtMyCharaInTopGroup = 0;
//ラストスパート：スタート
var LastSpurtStartCommentList = [
	"各馬一斉に駆け出しました！",
	"最終コーナー抜けて最後の直線です！"
];
//ラストスパート：区間A
var LastSpurtSegmentA_TopGroupCommentList = [
	"%m速い！抜けきります！",
	"うなる%m！速い！速い！！",
	"%m逃げる！逃げ切れるか！"
];
var LastSpurtSegmentA_FollowingGroupCommentList = [
	"逃げる！%1o逃げる！",
	"%1o逃げ切る！逃げ切ります！",
	"%1o粘る！このままゴールか！？"
];
//ラストスパート：区間B
var LastSpurtSegmentB_TopGroupCommentList = [
	"%m抜け出した！",
	"%mきている！",
	"%m強い！のびてきます！"
];
var LastSpurtSegmentB_FollowingGroupCommentList = [
	"トップは%1o！2番手は%2o！",
	"リードは依然%1o！",
	"先頭をいく%1o！"
];
//ラストスパート：区間C
var LastSpurtSegmentC_TopGroupCommentList = [
	"さあ%m抜け出しにかかります！",
	"ここで注目するのは%m！",
	"いいペースです%m！"
];
var LastSpurtSegmentC_FollowingGroupCommentList = [
	"さあここで抜け出すのはどの馬か！",
	"先頭は%1oに入れ替わった！",
	"%1oがきている！"
];
//ラストスパート：ゴール
var WinGoalCommentList = [
	"やりました！%m先頭でゴールです！",
	"%m今颯爽とゴールしました！" //イベント時はこちらを使用で固定		
];
var LoseGoalCommentList = [
	"%1o先頭でゴールです！",
	"%1oゴーーーール！" //イベント時はこちらを使用で固定		
];

//-----------------------------------------------------------------------------
//	制御文字対応
//-----------------------------------------------------------------------------

var getConvertString = function(arg) {
	return convertEscapeCharacters(arg);
};

var getConvertNumber = function(arg) {
	return (parseInt(convertEscapeCharacters(arg), 10) || 0);
};

var convertEscapeCharacters = function(text) {
	if (text == null) text = '';

	text = text.replace(/\\/g, '\x1b');
	text = text.replace(/\x1b\x1b/g, '\\');
	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
		return $gameVariables.value(parseInt(arguments[1]));
	}.bind(this));
	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
		return $gameVariables.value(parseInt(arguments[1]));
	}.bind(this));
	text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
		return actorName(parseInt(arguments[1]));
	}.bind(this));
	text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
		return partyMemberName(parseInt(arguments[1]));
	}.bind(this));
	text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
	return text;
};

var actorName = function(n) {
	var actor = n >= 1 ? $gameActors.actor(n) : null;
	return actor ? actor.name() : '';
};

var partyMemberName = function(n) {
	var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
	return actor ? actor.name() : '';
};

//-----------------------------------------------------------------------------

function initParameters()
{
	_enemies = 5;
	_startX = 300;
	_angleChange = [
		{"vx": 600, "angle": 'front'},
		{"vx": 900, "angle": 'downCorner'},
		{"vx": 1500, "angle": 'overthere'},
		{"vx": 1800, "angle": 'upCorner'},
		{"vx": 2400, "angle": 'front'},
		{"vx": 2700, "angle": 'downCorner'},
		{"vx": 10000, "angle": 'overthere'},
	];
	_phaseChange = [
		{"vx": 3400, "phase": "compete", "skip": false},
		{"vx": 3000, "phase": "compete", "skip": false},
		{"vx": 2600, "phase": "compete", "skip": false},
		{"vx": 2200, "phase": "compete", "skip": false},
		{"vx": 1650, "phase": "compete", "skip": false},
		{"vx": 1200, "phase": "compete", "skip": false},
		{"vx":  750, "phase": "compete", "skip": false},
	];
	_counter = 0;
	_goaledCounter = 0;
	_raceResult = null;
	_camera = {"initial": true, "vx": _startX, "vy": 0, "x": 0, "y": 0};
	_phaseScrollVx = 0;
	_cornerRad = 0;
	_angleStart = 0;
	_angleDistance = 1;
	_raceTrack = null;
	_trackSpr = null;
	_fenceASpr = null;
	_fenceBSpr = null;
	_fenceCSpr = null;
	_grassSpr = null;
	_goalSpr = null;
	_chrSprList = null;
	_chrSprVX = null;
	_whipIconSprList = null;
	_progressGaugeSpr = null;
	_positionMarkerSprList = null;
	_phase = 'init';
	_angle = 'front';
	_clockwise = true;
	_groundKind = 'grass';
	_fenceKind = 'normal';
	_blankFrames = 0;
	_whipSelect = null;
	_angleLaneCount = 4;
	_angleLaneWidth = 80;
	_lastStraight = true;
	_raceTitle = "ＧⅠＭＶ杯";
	_maxStamina = 1000;
	_staminaList = []
	_speedList = []
	_gutsList = []
	_smartList = []
	for(var i = 0; i <= _enemies; i++){
		_staminaList.push(1000);
		_speedList.push(50 + 50 * Math.random());
		_gutsList.push(40);
		_smartList.push(100);
	}
	_maxStaminaList = _staminaList.clone();
	_lastStaminaList = _staminaList.clone();
	_competeInfo = {
		'counter': 0,
	};
	_competeDamagedPrevent = 1;	 //自馬が競い合う相手から与えられるダメージの係数

	_obstacleInfo = [[0, 0], [0, 0], [0, 0]];
	_obstacleList = null;
	_characterNameList = [];
	_characterColorList = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	_cheerIp = [0,0,0];  //各ＩＰキャラの応援してくれる回数
	_cutinIp = 0;
	_equipIp = [false, false, false];	//IP装備
	_help = false;	//ヘルプを表示させるか
	_helpedList = {"training": false, 'compete': false, 'move': false, 'racing': false, 'last_spurt': false};  //ヘルプ表示したか
	_helpPause = false;	   //ヘルプポーズ中か
	_helpInfoList = {
		'training': ["■訓練について■\n\nこのゲームではいきなり本番に挑むのではなく、訓練を行ってウマの能力を上げる必要があります。\n訓練は全部で4種類ありますが、内容は同じです。", '#20A0D6', 'rgba(255,0,0,255)', 0],
		'compete': ["■競り合いフェイズについて■\n\n表示するタイミング\n\n【チュートリアル】\n最初の競り合いフェイズ遷移直後", '#20A0D6', 'rgba(255,0,0,0)', 0],
		'move': ["■移動指示フェイズについて■\n\n表示するタイミング\n\n【チュートリアル】\n最初の移動指示フェイズ遷移直後", '#20A0D6', 'rgba(255,0,0,0)', 0],
		'racing': ["■走行フェイズについて■\n\n表示するタイミング\n\n【チュートリアル】\n最初の走行フェイズ遷移直後", '#20A0D6', 'rgba(255,0,0,0)', 0],
		'last_spurt': ["■ラストスパートフェイズについて■\n\n表示するタイミング\n\n【チュートリアル】\nラストスパートフェイズ遷移直後", '#20A0D6', 'rgba(255,0,0,0)', 0]
	};
	_arrivalVarList = []; //各馬の着順を格納する変数番号リスト
	_rankNameVarList = []; //着順に馬名を格納する変数番号リスト
	_skillList = [];
	_goalOrderList = [];
	for(var i = 0; i <= _enemies; i++){
		_goalOrderList.push(-1);
	}
	_goalCharaCount = 0;
	_finishedCharaCount = 0;
	_myMarkerSpr = null;

	_sceneBattle = null;
	_delayedCount = 0;
	_delayedPhase = null;

	_raceSignWindow = null;
	_rankWindow = null;
	_rankWindowNum = 1;
	_myStaminaWindow = null;
	_myStaminaGauge = null;
	_myStaminaContents = null;
	_othersStaminaWindow = null;
	_othersStaminaGaugeList = null;
	_restTurnSprite = null;
	_restTurnBitmap = null;
	_restTurnCount = 2;
	_zanWinSprite = null;
	_competeList = [0];
	_moveDirection = MoveDirection_None;
	_moveSelectedSkill = -1;
	_competeLastTarget = -1;

	_skillEffect = objClone(InitialSkillEffect);

	_otherCompeteIndex = null;
	_competeOrder = 2;
	_competePhase = null;
	_movePhase = null;
	_lastSpurtPhase = null;
	_helpWindow = null;

	_debugSprite = null;

	_competeVx = _startX;
	_chrMinVx = _startX;
	_movePhaseSkip = false;
	_moveCount = 0;
	_competeAdjust = 0;
	_cutin = null;
	_commentCounter = 0;

	_moveHorseForceMoveX = 0;
	_moveHorseForceKeep = 0;
	_lastPartyCommandWindow = null;
	_lastStatusWindow = null;
	_lastSKillWindow = null;
	_competeHorseSprList = null;
	_competeHorseOffset = null;
	_competeHorseKnockBack = null;

	_moveOrderWindow = null;

	_intermediateLiveCommentIndex = 0;
	_startLiveCommentIndex = 0;
	_lastSpurtLiveCommentIndex = 0;
}

function getHorseImgIndex(id)
{
	if(id == 1){
		return 0;
	}
	return ((id - 2) % (CharacterImageKindMax - 1) + 1);
}

//-----------------------------------------------------------------------------
//バトル突入演出変更
var _Scene_Map_startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
Scene_Map.prototype.startEncounterEffect = function()
{
	if(_isRaceBattle){	//レースなら突入演出カット
		return;
	}
    _Scene_Map_startEncounterEffect.call(this);
};

//-----------------------------------------------------------------------------
//バトルＢＧＭ差し替え
var _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
	if(!_isRaceBattle){
		_BattleManager_playBattleBgm.call();
		return;
	}
	AudioManager.playBgm({"name":_bgmPrm[0][0],"volume":_bgmPrm[0][1],"pitch":_bgmPrm[0][2],"pan":0}, 1);
	AudioManager.stopBgs();
};
//ラストスパートＢＧＭ
function lastSpurtBgm()
{
	if(!_isRaceBattle){
		return;
	}
	AudioManager.playBgm({"name":_bgmPrm[1][0],"volume":_bgmPrm[1][1],"pitch":_bgmPrm[1][2],"pan":0}, 1);
    AudioManager.stopBgs();
}

//-----------------------------------------------------------------------------
//Spriteset_Battle
var _Spriteset_Battle_createBackground = Spriteset_Battle.prototype.createBackground;
Spriteset_Battle.prototype.createBackground = function()
{
	if(!_isRaceBattle){
		_Spriteset_Battle_createBackground.call(this);
		return;
	}

	//全パラメータが設定されたところでの、初期化
	_goalOrderList = [];
	for(var i = 0; i <= _enemies; i++){
		_goalOrderList.push(-1);
	}

	var img_path = "img/racebattle/track/";
	var ground_list = GroundImageList[_groundKind];
	var fence_list = FenceImageList[_fenceKind];
	var cutin_list = [];
	for (var i=0; i<3; i++){
		cutin_list[i] = (_cheerIp[i] == 0) ? null : CutinImageList[i];
	}
	var bg_front_bm = ImageManager.loadBitmap(img_path, ground_list[0]);
	var bg_front_fence_a_bm = ImageManager.loadBitmap(img_path, fence_list[0]);
	var bg_front_fence_b_bm = ImageManager.loadBitmap(img_path, fence_list[1]);
	var bg_front_fence_c_bm = ImageManager.loadBitmap(img_path, fence_list[2]);
	var bg_corner_bm = ImageManager.loadBitmap(img_path, ground_list[1]);
	var bg_corner_fence_a_bm = ImageManager.loadBitmap(img_path, fence_list[3]);
	var bg_corner_fence_b_bm = ImageManager.loadBitmap(img_path, fence_list[4]);
	var bg_overthere_bm = ImageManager.loadBitmap(img_path, ground_list[2]);
	var bg_overthere_fence_a_bm = ImageManager.loadBitmap(img_path, fence_list[5]);
	var bg_overthere_fence_b_bm = ImageManager.loadBitmap(img_path, fence_list[6]);
	var bg_overthere_fence_c_bm = ImageManager.loadBitmap(img_path, fence_list[7]);
	var bg_overthere_grass_bm = ImageManager.loadBitmap(img_path, ground_list[3]);
	var goal_bm = ImageManager.loadBitmap(img_path, "goal");
	var obstacle_easy_bm = ImageManager.loadBitmap(img_path, "obstacle_easy");
	var obstacle_effect_easy_bm = ImageManager.loadBitmap(img_path, "obstacle_effect_easy");
	var obstacle_normal_bm = ImageManager.loadBitmap(img_path, "obstacle_normal");
	var obstacle_effect_normal_bm = ImageManager.loadBitmap(img_path, "obstacle_effect_normal");
	var obstacle_hard_bm = ImageManager.loadBitmap(img_path, "obstacle_hard");
	var obstacle_effect_hard_bm = ImageManager.loadBitmap(img_path, "obstacle_effect_hard");

	img_path = "img/racebattle/character/";
	var chara_l_bm_list = [];
	var chara_u_bm_list = [];
	var chara_ul_bm_list = [];
	var chara_d_bm_list = [];
	var chara_dl_bm_list = [];
	var image_kinds = Math.min(_enemies + 1, CharacterImageKindMax);
	for(var i = 0; i < image_kinds; i++){
		//色指定に合わせる
		var base = 'chara' + _characterColorList[i];
		chara_l_bm_list.push(ImageManager.loadBitmap(img_path, base + '_l'));
		chara_u_bm_list.push(ImageManager.loadBitmap(img_path, base + '_u'));
		chara_ul_bm_list.push(ImageManager.loadBitmap(img_path, base + '_ul'));
		chara_d_bm_list.push(ImageManager.loadBitmap(img_path, base + '_d'));
		chara_dl_bm_list.push(ImageManager.loadBitmap(img_path, base + '_dl'));
	}
	var acce_list = ['helmet', 'mask', 'ribbon'];
	//ＩＰ複数装備対応
	for(var i=0; i<3; i++){
		if(_equipIp[i]){
			var base = 'chara1';
			var acce = acce_list[i];
			chara_l_bm_list.push(ImageManager.loadBitmap(img_path, base + '_l_' + acce));
			chara_u_bm_list.push(ImageManager.loadBitmap(img_path, base + '_u_' + acce));
			chara_ul_bm_list.push(ImageManager.loadBitmap(img_path, base + '_ul_' + acce));
			chara_d_bm_list.push(ImageManager.loadBitmap(img_path, base + '_d_' + acce));
			chara_dl_bm_list.push(ImageManager.loadBitmap(img_path, base + '_dl_' + acce));
		} else {
			chara_l_bm_list.push(0);
			chara_u_bm_list.push(0);
			chara_ul_bm_list.push(0);
			chara_d_bm_list.push(0);
			chara_dl_bm_list.push(0);
		}
	}
	var chara_jump_bm_list = [];
	chara_jump_bm_list.push(ImageManager.loadBitmap(img_path, 'chara1-4_jump'));
	chara_jump_bm_list.push(ImageManager.loadBitmap(img_path, 'chara5-8_jump'));
	chara_jump_bm_list.push(ImageManager.loadBitmap(img_path, 'chara1-ip_jump'));

	img_path = "img/racebattle/overlay/";
	var position_marker_bm_list = [];
	for(var i = 0; i < image_kinds; i++){
		//指定色に合わせる。
		position_marker_bm_list.push(ImageManager.loadBitmap(img_path, "bar_icon_0" + _characterColorList[i]));
	}
	var progress_gauge_bm = ImageManager.loadBitmap(img_path, "bar");
	var whip_icon_bm_list = [
		ImageManager.loadBitmap(img_path, "button_off"),
		ImageManager.loadBitmap(img_path, "button_on")
	];
	var player_arrow_bm = ImageManager.loadBitmap(img_path, "player_arrow");

	var cutin_bm = [];
	var cutin_balloon_a_bm = [];
	var cutin_balloon_b_bm = [];
	var cutin_table_bm = [];
	for(var i=0; i<3; i++){
		if(cutin_list[i] != null){
			cutin_bm[i] = ImageManager.loadBitmap(img_path, cutin_list[i][0]);
			cutin_balloon_a_bm[i] = ImageManager.loadBitmap(img_path, cutin_list[i][1]);
			cutin_balloon_b_bm[i] = ImageManager.loadBitmap(img_path, cutin_list[i][2]);
			cutin_table_bm[i] = ImageManager.loadBitmap(img_path, cutin_list[i][3]);
		}
	}

	var face_bm = ImageManager.loadBitmap(img_path, "umaface");
	var window_bm = ImageManager.loadBitmap(img_path, "instruction_button");
	var zanstamina_bm = ImageManager.loadBitmap(img_path, "stamina_window");

	_raceTrack = new Racetrack(
			bg_front_bm, bg_front_fence_a_bm, bg_front_fence_b_bm, bg_front_fence_c_bm,
			bg_corner_bm, bg_corner_fence_a_bm, bg_corner_fence_b_bm,
			bg_overthere_bm,
			bg_overthere_fence_a_bm, bg_overthere_fence_b_bm, bg_overthere_fence_c_bm, bg_overthere_grass_bm,
			goal_bm,
			obstacle_easy_bm, obstacle_effect_easy_bm,
			obstacle_normal_bm, obstacle_effect_normal_bm,
			obstacle_hard_bm, obstacle_effect_hard_bm,
			cutin_bm, cutin_balloon_a_bm, cutin_balloon_b_bm, cutin_table_bm,
			face_bm, window_bm, zanstamina_bm,
			chara_l_bm_list, chara_u_bm_list, chara_ul_bm_list, chara_d_bm_list, chara_dl_bm_list,
			chara_jump_bm_list,
			position_marker_bm_list,
			progress_gauge_bm,
			whip_icon_bm_list,
			player_arrow_bm);
	this._baseSprite.addChild(_raceTrack);

	_progressGaugeSpr = new Sprite(progress_gauge_bm);
	_progressGaugeSpr.x = 13;
	_progressGaugeSpr.y = 7;
	this._baseSprite.addChild(_progressGaugeSpr);
	_positionMarkerSprList = [];
	for(var i = 0; i < _enemies + 1; i++){
		var img_index = getHorseImgIndex(i + 1);
		_positionMarkerSprList.push(new Sprite(position_marker_bm_list[img_index]));
		_positionMarkerSprList[i].x = _progressGaugeSpr.x;
		_positionMarkerSprList[i].y = 5;
		this._baseSprite.addChild(_positionMarkerSprList[i]);
	}
	_myMarkerSpr = new Sprite(player_arrow_bm);
	_myMarkerSpr.x = 0;
	_myMarkerSpr.y = 0;
	this._baseSprite.addChild(_myMarkerSpr);
};

var _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function()
{
	if(!_isRaceBattle){
		_Spriteset_Battle_createBattleField.call(this);
		return;
	}
	_Spriteset_Battle_createBattleField.call(this);
	this._battleField.visible = false;
}

//-----------------------------------------------------------------------------
//Scene_Battle
Scene_Battle.prototype.start = function() {
	Scene_Base.prototype.start.call(this);
	this.startFadeOut(1, false);
	BattleManager.playBattleBgm();
	BattleManager.startBattle();
	this._startDelay = 36;
}

var _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	if(this._startDelay > 0){
		this._startDelay--;
		if(this._startDelay == 0) this.startFadeIn(24);
	}
	//
	if(_isRaceBattle){
		_raceTrack.update();
		if(_competeAdjust){
			_competeAdjust--;
		}
	}
	_Scene_Battle_update.call(this);
};

// define Scene_Battle.prototype.removeWindow if not yet.
if(!('removeWindow' in Scene_Battle.prototype)){
	Scene_Battle.prototype.removeWindow = function(window) {
		this._windowLayer.removeChild(window);
	};
}

var _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
	if(!_isRaceBattle){
		_Scene_Battle_startPartyCommandSelection.call(this);
		return;
	}
	if(_phase == 'init'){
		setPhase('racing');
		_raceStartCount = _counter;
	}
};

var _Scene_Battle_updateWindowPositions = Scene_Battle.prototype.updateWindowPositions;
Scene_Battle.prototype.updateWindowPositions = function() {
	if(!_isRaceBattle){
		_Scene_Battle_updateWindowPositions.call(this);
		return;
	}
};


//-----------------------------------------------------------------------------
//BattleManager
var _BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function()
{
	_BattleManager_startTurn.call(this);
}

var _BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
	_BattleManager_startBattle.call(this);
	if(!_isRaceBattle){
		return;
	}
	$gameMessage.clear();
};

//-----------------------------------------------------------------------------
//Game_Battler
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args)
{
	_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === "RaceBattle") {
		switch (args[0]) {
			case "switch":
				switch(args[1]){
				case "1":
					//バトルシーンをレースバトルにする
					if(!_isRaceBattle){
						_isRaceBattle = true;
					}
					break;
				default:
					//バトルシーンを通常に戻す
					if(_isRaceBattle){
						_isRaceBattle = false;
					}
					break;
				}
				break;
			case "bgm":		//BGM指定 メイン曲名,volume,pitch,ラストスパート曲名,volume,pitch
				for(var i=0; i<2; i++) {
					_bgmPrm[i][0] = getConvertString(args[1+i*3+0]);
					_bgmPrm[i][1] = getConvertNumber(args[1+i*3+1]);
					_bgmPrm[i][2] = getConvertNumber(args[1+i*3+2]);
				}
				break;
			case "enemies":
				if(args[1] <= 0){
					_enemies = 1;
				} else {
					_enemies = getConvertNumber(args[1]);
				}

				_staminaList = []
				_speedList = []
				_gutsList = []
				_smartList = []
				for(var i = 0; i <= _enemies; i++){
					_staminaList.push(1000);
					_speedList.push(20 - 5 + 11 * Math.random());
					_gutsList.push(40 - 5 + 11 * Math.random());
					_smartList.push(40 - 5 + 11 * Math.random());
				}
				_maxStaminaList = _staminaList.clone();
				_lastStaminaList = _staminaList.clone();
				updateMaxStamina();
				break;
			case "clockwise":
				if(getConvertNumber(args[1]) == 0){
					_clockwise = false;
				} else {
					_clockwise = true;
				}
				break;
			case "distance":
				var dis = getConvertNumber(args[1]);
				if(dis < 600){
					_startX = 600;
				} else {
					_startX = dis;
				}
				break;
			case "ground":
				if(getConvertNumber(args[1]) == 0){
					_groundKind = 'grass';
				} else {
					_groundKind = 'sand';
				}
				break;
			case "fence":
				var id = getConvertNumber(args[1]);
				_fenceKind = 'normal';
				switch(id){
				case 1:
					_fenceKind = 'ip01';
					break;
				case 2:
					_fenceKind = 'ip02';
					break;
				case 3:
					_fenceKind = 'ip03';
					break;
				case 4:
					_fenceKind = 'no01';
					break;
				}
				break;
			case "raceTitle":
				_raceTitle = getConvertString(args[1]);
				break;
			case "obstacle":
				var kind = getConvertString(args[1]);
				var prob = getConvertNumber(args[2]);
				var rate = getConvertNumber(args[3]) / 100;
				var index = -1;
				switch(kind){
				case 'easy':
					index = Obstacle_Easy;
					break;
				case 'normal':
					index = Obstacle_Normal;
					break;
				case 'hard':
					index = Obstacle_Hard;
					break;
				}
				if(index >= 0){
					_obstacleInfo[index] = [prob, rate];
				}
				break;
			case "cheer":
				for(var i=0; i<3; i++) _cheerIp[i] = getConvertNumber(args[1+i]);
				break;
			case "equip":
				for(var i=1; i<args.length; i++){
					var num = getConvertNumber(args[i]);
					if(num >= 1 && num <= 3) _equipIp[num-1] = true;
				}
				break;
			case "param":
				var index = getConvertNumber(args[1]);
				if(index >= 0 && index <= _enemies){
					_staminaList[index] = getConvertNumber(args[2]);
					_maxStaminaList[index] = _staminaList[index];
					_lastStaminaList[index] = _staminaList[index];
					_speedList[index] = getConvertNumber(args[3]);
					_gutsList[index] = getConvertNumber(args[4]);
					_smartList[index] = getConvertNumber(args[5]);
					if(_characterNameList[index] == null) _characterNameList[index] = '馬'+(index+1);	//名前が無い場合、デフォルト指定しておく
				}
				updateMaxStamina();
				break;
			case "charaName":
				var index = getConvertNumber(args[1]);
				if(index >= 0){
					_characterNameList[index] = getConvertString(args[2]);
					if(args.length >= 4) _characterColorList[index] = getConvertNumber(args[3]);
				}
				break;
			case "arrival":
				_arrivalVarList = [];
				for(var i = 0; i <= _enemies; i++){
					_arrivalVarList[i] = getConvertNumber(args[i + 1]);
				}
				break;
			case "rankingName":
				_rankNameVarList = [];
				for(var i = 0; i <= _enemies; i++){
					_rankNameVarList[i] = getConvertNumber(args[i + 1]);
				}
				break;
			case "help":
				if(getConvertNumber(args[1]) == 1){
					_help = true;
					for(var key in _helpedList){
						_helpedList[key] = false;
					}
				}
				break;
			case "helpText":
				if(args[3] == null) args[3] = '#ffffff';
				if(args[4] == null) args[4] = 'rgba(0,0,0,128)'
				switch(args[1]){
				case 'training':
				case 'compete':
				case 'move':
				case 'racing':
				case 'last_spurt':
					_helpInfoList[args[1]] = [args[2].split('\\n').join("\n"), args[3], args[4], 0];
					break;
				}
				break;
			case "skill":
				var index = getConvertNumber(args[1]);
				_skillList.push([index-1, SkillInfoList[index-1][SkillInfo_Count]]);
				break;
			case "course":
				var index = 1;
				_angleChange = [];
				_phaseChange = [];
				while(index + 1 < args.length){
					var distance = getConvertNumber(args[index]);
					var angle = getConvertString(args[index+1]);
					var skipF = false;
					switch(angle){
					case 'front':
					case 'upCorner':
					case 'overthere':
					case 'downCorner':
						_angleChange.unshift({"vx": distance, "angle": angle});
						break;
					case 'compete':
					case 'competeX':
					case 'move':
						if(angle == 'competeX'){
							angle = 'compete';
							skipF = true;
						}
						_phaseChange.push({"vx": distance, "phase": angle, "skip": skipF});
						break;
					}
					index += 2;
				}
				_startX = _angleChange[_angleChange.length - 1].vx;
				break;
		}
	}
};

function objClone(obj)
{
	var copy = {};
	for (var attr in obj) {
		copy[attr] = obj[attr];
	}
	return copy;
}

function resetCompeteTargetSelect()
{
	if(_competeLastTarget < 0){
		return;
	}
	_chrSprList[_competeList[_competeLastTarget]].setBlendColor([0, 0, 0, 0]);
	_competeHorseSprList[_competeLastTarget].setBlendColor([0, 0, 0, 0]);
	_competeLastTarget = -1;
}
function selectCometeTarget(index, color)
{
	var list = [];
	for(var i=0; i<_competeList.length; i++){
		if(_staminaList[ _competeList[i] ] > 0) list.push(i);
	}
	if(index >= list.length) return;
	index = list[index];		//リタイア馬を抜いたindexにする。

	if(index != _competeLastTarget){
		resetCompeteTargetSelect();
	}
	_competeLastTarget = index;
	_chrSprList[_competeList[_competeLastTarget]].setBlendColor(color);
	_competeHorseSprList[_competeLastTarget].setBlendColor(color);
}

//-----------------------------------------------------------------------------
//Scene_Battle
//	compete phase
Scene_Battle.prototype._commandCompete = function()
{
	this._partyCommandWindow.deselect();
	this._partyCommandWindow.deactivate();
	this._statusWindow.close();
	this._targetWindow.setup();
};

Scene_Battle.prototype._commandCompeteTarget = function(index)
{
	this._targetWindow.select(-1);
	resetCompeteTargetSelect();
	this._targetWindow.close();
	this._statusWindow.open();
	var is_weakest = true;
	for(var i = 1; i < _competeList.length; i++){
		var stamina = _staminaList[_competeList[i]];
		if(stamina > 0 && stamina < _staminaList[0]){
			is_weakest = false;
			break;
		}
	}
	var damage = _gutsList[0] * _skillEffect.compete_damaging_rate;
	if(is_weakest){
		damage *= _skillEffect.compete_weakest_damaging_rate;
	}
	//ランダム要素（96%～104%）
	damage = damage * (Math.random()*8+96) / 100;
	//ダメージ値から小数以下は省く
	damage = Math.floor(damage);
	//
	if(damage <= _gutsList[0]){
		// SE: 10
		AudioManager.playSe({"name":"Blow1","volume":90,"pitch":60,"pan":0});
	} else {
		// SE: 11
		AudioManager.playSe({"name":"Blow2","volume":90,"pitch":90,"pan":0});
	}
	//表示前に表示をクリアする
	this._statusWindow.clear();
	this._statusWindow.addText(_characterNameList[_competeList[index]] + "と競り合い！");
	var gauge_x = MyStaminaWindowX + 108;
	var gauge_y = MyStaminaWindowY + 30;
	if(index >= 1){
		gauge_x = OthersStaminaWindowX + 108;
		gauge_y = OthersStaminaWindowY + 30 + (index - 1) * 28;
	}
	var competeAnim = new CompeteAnim(index, 0, gauge_x, gauge_y, function(){
		addStamina(_competeList[index], -damage);
		_competeHorseOffset[index].extra_energy = -100 * 10/2 * damage / 40;
		var knockBack = Math.min( 1.5, 0.7 + 0.8 * damage / (_maxStaminaList[_competeList[index]]*0.04) );	//最大スタミナの４％範囲でダメージ値にあわせてノックバック距離変化
		_competeHorseKnockBack[index] = knockBack * MeterToScrCoordScaling;
		updateGauge(index, true);
		_sceneBattle._statusWindow.addText("スタミナを" + damage + "減らした！");
		if(_staminaList[_competeList[index]] <= 0){
			_competeHorseSprList[index].visible = false;
			_chrSprList[_competeList[index]]._retireCnt = 45;
		}
	}, function(){
		if(!isCompeteEnemy()){
			//もう敵がいない。
			_restTurnCount = 0;
			setRestTurn(_restTurnCount);
			return;
		}
		startOthersCompete();
	});
	this.addChild(competeAnim);
};

//他のウマからの競り合いを処理。
function startOthersCompete()
{
	_otherCompeteIndex = 1;
	startOthersCompeteSub();
}

//他のウマからの競り合いを処理。
function startOthersCompeteSub()
{
	//負け状態（プレイヤーがリタイア等）だと全ターン即終了
	if(_raceResult == 'lose'){
		_restTurnCount = 0;
		setRestTurn(_restTurnCount);
		return;
	}

	if(_otherCompeteIndex >= _competeList.length){
		_restTurnCount--;
		setRestTurn(_restTurnCount);
		return;
	}
	if(_staminaList[_competeList[_otherCompeteIndex]] <= 0){
		//リタイヤ済み
		_otherCompeteIndex++;
		startOthersCompeteSub();
		return;
	}
	var target_list = [];
	for(var i = 0; i < _competeList.length; i++){
		if(i == 0 && _skillEffect.compete_invisible){	//スキル「ダークホース」中はプレイヤーは狙われない。
			continue;
		}
		if(i == _otherCompeteIndex || _staminaList[_competeList[i]] == 0){
			continue;
		}
		target_list.push(i);
	}
	if(target_list.length == 0){
		//競い合う相手がいない
		_otherCompeteIndex++;
		startOthersCompeteSub();
		return;
	}
	//競い合う相手リストからランダムに選択。
	var index = target_list[Math.floor(Math.random() * target_list.length)];
	var damage = _gutsList[_otherCompeteIndex] * (index == 0 ? _competeDamagedPrevent * _skillEffect.compete_damaged_rate : 1);
	if(index == 0){
		if(('win_' + _competeInfo.counter) in _competeInfo){
			//この競り合いフェイズでの競り合いに必ず勝てる。
			damage = 0;
		}
	}
	//ランダム要素（96%～104%）
	damage = damage * (Math.random()*8+96) / 100;
	//ダメージ値から小数以下は省く
	damage = Math.floor(damage);
	//
	if(index == 0 && _competeDamagedPrevent < 1) {
		//敬遠による効果（ガード的な）
	} else {
		// SE: 11
		AudioManager.playSe({"name":"Blow2","volume":90,"pitch":90,"pan":0});
	}
	//温存ルートの場合以外は、表示前に表示をクリアする
	if (!_isSparing) _sceneBattle._statusWindow.clear();
	_isSparing = false;

	var text = _characterNameList[_competeList[_otherCompeteIndex]] + 'と';
	text += (index == 0 ? _characterNameList[0] : (_characterNameList[_competeList[index]] + ''));
	_sceneBattle._statusWindow.addText(text + 'との競り合い！');
	var gauge_x = MyStaminaWindowX + 108;
	var gauge_y = MyStaminaWindowY + 30;
	if(index >= 1){
		gauge_x = OthersStaminaWindowX + 108;
		gauge_y = OthersStaminaWindowY + 30 + (index - 1) * 28;
	}
	var competeAnim = new CompeteAnim(index, _otherCompeteIndex, gauge_x, gauge_y, function(){
		addStamina(_competeList[index], -damage);
		_competeHorseOffset[index].extra_energy = -100 * 10/2 * damage / 40;
		var knockBack = Math.min( 1.5, 0.7 + 0.8 * damage / (_maxStaminaList[_competeList[index]]*0.04) );	//最大スタミナの４％範囲でダメージ値にあわせてノックバック距離変化
		_competeHorseKnockBack[index] = knockBack * MeterToScrCoordScaling;
		updateGauge(index, true);
		var text = null;
		if(damage == 0){
			text = "スタミナが減るのを防いだ！";
		} else
		if(index == 0){
			text = "スタミナを" + damage + "減らされた！";
		} else {
			text = "スタミナを" + damage + "減らした！";
		}
		_sceneBattle._statusWindow.addText(text);
		if(_staminaList[_competeList[index]] == 0){
			_competeHorseSprList[index].visible = false;
			_chrSprList[_competeList[index]]._retireCnt = 45;
		}
	}, function(){
		if(!isCompeteEnemy()){
			//もう敵がいない。
			_restTurnCount = 0;
			setRestTurn(_restTurnCount);
			return;
		}
		_otherCompeteIndex++;
		startOthersCompeteSub();
	});
	_sceneBattle.addChild(competeAnim);
}

function isCompeteEnemy()
{
	for(var i = 1; i < _competeList.length; i++){
		if(_staminaList[_competeList[i]] > 0){
			return true;
		}
	}
	return false;
}

Scene_Battle.prototype._commandCompeteCancel = function() {
	this._targetWindow.select(-1);
	resetCompeteTargetSelect();
	this._targetWindow.close();
	this._statusWindow.open();
	this._partyCommandWindow.setup();
};

Scene_Battle.prototype._commandEscape = function() {
	//非アクティブにする
	this._partyCommandWindow.deselect();
	this._partyCommandWindow.deactivate();
	this._targetWindow.close();
	this._statusWindow.open();
	_competeDamagedPrevent = 0.5;
	//表示前に表示をクリアする
	this._statusWindow.clear();
	this._statusWindow.addText("力を温存した！");
	//こっちルートからの処理ということを記録
	_isSparing = true;
	startOthersCompete();
};

//	move phase
Scene_Battle.prototype._commandMove = function() {
	this._partyCommandWindow.deselect();
	this._partyCommandWindow.deactivate();
	this._statusWindow.close();
	this._targetWindow.activate();
	this._targetWindow.open();
	this._targetWindow.select(-1);
};

function getMoveDirectionByIndex(index)
{
	var move_direction = MoveDirection_None;
	//「front」で固定
	switch(index){
	case 0:
		move_direction = MoveDirection_InCourse;
		break;
	case 1:
		move_direction = MoveDirection_Forward;
		break;
	case 2:
		move_direction = MoveDirection_Backward;
		break;
	case 3:
		move_direction = MoveDirection_OutCourse;
		break;
	}
	return move_direction;
}

Scene_Battle.prototype._commandMoveOk = function() {
	this._targetWindow.close();
	this._statusWindow.clear();
	this._statusWindow.open();
	var index = _sceneBattle._targetWindow.index();
	var move_direction = getMoveDirectionByIndex(index);
	var success = false;
	var is_skill_effect = false;
	switch(move_direction){
	case MoveDirection_InCourse:
		this._statusWindow.addText("インコースへ移動指示！");
		if(_skillEffect.move_in_course_rate_add != 0){
			is_skill_effect = true;			//スキル発動中（必ず成功）
			success = true;
		} else {
			if(_competeOrder == 1){			//競り合い１位
				success = true;
			} else if(_competeOrder == 2){	//競り合い２位
				//確率で成功
				if(Math.random() < 0.5){
					success = true;
				}
			}
		}
		break;
	case MoveDirection_Forward:
		this._statusWindow.addText("前進指示！");
		if(_skillEffect.move_forward_rate_add != 0){
			is_skill_effect = true;
		}
		if(_competeOrder <= 2){
			success = true;
		} else {
			//確率で成功
			if(Math.random() < 0.5 + _skillEffect.move_forward_rate_add){
				success = true;
			}
		}
		if(success){
			_chrSprList[0].extra_energy = 0;
			_moveHorseForceMoveX += -3 * MeterToScrCoordScaling;
		}
		break;
	case MoveDirection_Backward:
		this._statusWindow.addText("後退指示！");
		success = true;
		if(success){
			_chrSprList[0].extra_energy = 0;
			_moveHorseForceMoveX += 3 * MeterToScrCoordScaling;
			var recov = _maxStaminaList[0] * (5 + Math.random()*6) / 100;
			addStamina(0, recov);
			_myStaminaGauge.setRecover();
		}
		break;
	case MoveDirection_OutCourse:
		this._statusWindow.addText("アウトコースへ移動指示！");
		success = true;
		break;
	}
	function next(){
		this._statusWindow.downArrowVisible = false;
		if(success){
			this._statusWindow.addText("指示成功！");
			_moveDirection = move_direction;
		} else {
			this._statusWindow.addText("指示失敗！");
		}
		_delayedCount = 60 * 2.5;
		_delayedPhase = 'racing';
	}
	if(is_skill_effect){
		showSkillEffectMessage(next, this);
	} else {
		this._statusWindow.downArrowVisible = true;
		waitDummy(next, this);
	}
};
//決定待ちするためのダミーウィンドウ（非表示でＯＫコールバックのみ使う）
function waitDummy(callback, instance)
{
	_helpWindow = new Window_RaceBattleLog(RaceBattleLogCompeteX, RaceBattleLogCompeteY, RaceBattleLogCompeteWidth, RaceBattleLogCompeteHeight);
	_sceneBattle.addWindow(_helpWindow);
	_helpWindow.setOkCallback(function(){
		_sceneBattle.removeWindow(_helpWindow);
		_helpWindow = null;
		callback.call(instance, null);
	});
}

Scene_Battle.prototype._commandMoveCancel = function() {
	this._targetWindow.close();
	this._statusWindow.open();
	this._partyCommandWindow.setup();
};

Scene_Battle.prototype._commandSkillExec = function() {
	this._partyCommandWindow.deselect();
	this._partyCommandWindow.deactivate();
	this._statusWindow.close();
	this._skillWindow.setup();
	this._skillHelp.open();
};

Scene_Battle.prototype._commandSkill = function(index) {
	this._skillWindow.close();
	this._skillHelp.close();
	this._statusWindow.open();
	var sindex = _skillList[index][0];
	this._statusWindow.addText("スキル選択！:" + SkillInfoList[sindex][SkillInfo_Name]);
	_moveSelectedSkill = index;
	if(_skillList[index][1] > 0 && _skillList[index][1] < 99){
		//使用回数を減らす
		_skillList[index][1]--;
	}
	//スキル効果設定
	var effect = SkillInfoList[sindex][SkillInfo_Effect];
	switch(effect.operation){
	case 'mul':
		_skillEffect[effect.property] *= effect.value;
		break;
	case 'set':
		_skillEffect[effect.property] = effect.value;
		break;
	}
	updateGauge(0);
	this._partyCommandWindow.setup();
};

Scene_Battle.prototype._commandSkillCancel = function(index) {
	this._skillWindow.close();
	this._skillHelp.close();
	this._statusWindow.open();
	this._partyCommandWindow.setup();
};

var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function()
{
	if(!_isRaceBattle){
		_Scene_Battle_createAllWindows.call(this);
		return;
	}
	_sceneBattle = this;

	_Scene_Battle_createAllWindows.call(this);

	//敵グラフィックを見えなくする。
	var enemies = this._spriteset._enemySprites;
	for(var i = 0; i < enemies.length; i++){
		enemies[i].opacity = 0;
	}

	this._statusWindow.hide();
	this._partyCommandWindow.hide();

	_raceSignWindow = new Window_Base(630, 0, 184, 64);
	_raceSignWindow.drawText(_raceTitle, 0,-2, 144, "center");
	_sceneBattle.addWindow(_raceSignWindow);

	//順位表示
	_rankWindow = new Window_Base(630+88, 64, 96, 64);
	_rankWindow.drawText(' 位', 0,-2, 64, "center");
	_rankWindowNum =-1;
	_sceneBattle.addWindow(_rankWindow);

	createMyStaminaWindow();

	_lastStatusWindow = _sceneBattle._statusWindow;
	_lastStatusWindow.hide();
	_sceneBattle._statusWindow = new Window_RaceBattleLog(RaceBattleLogRacingX, RaceBattleLogRacingY, RaceBattleLogRacingWidth, RaceBattleLogRacingHeight);
	_sceneBattle.addWindow(_sceneBattle._statusWindow);

	_raceSignWindow.open();
	_rankWindow.open();
	_myStaminaWindow.open();
};

function setRestTurn(turns)
{
	_restTurnBitmap.clear();
	if(turns > 0) _restTurnBitmap.drawText('残りターン数 ' + turns, 0, 0, _restTurnBitmap.width, _restTurnBitmap.height, 'left');
	if(turns == 0){
		_delayedCount = 1;
		_delayedPhase = _movePhaseSkip? 'racing':'move';	//移動指示スキップチェック
		//順位算出
		var order_list = [];
		for(var i = 0; i < _competeList.length; i++){
			order_list.push({index: i, stamina: _staminaList[_competeList[i]]});
		}
		order_list.sort(function(x, y){
			return -(x.stamina - y.stamina);
		});
		var last_stamina = 0;
		var last_order = 0;
		for(var i = 0; i < order_list.length; i++){
			if(order_list[i].stamina == last_stamina){
				order_list[i].order = last_order;
			} else {
				last_stamina = order_list[i].stamina;
				last_order++;
				order_list[i].order = last_order;
			}
		}
		_competeOrder = 0;
		for(var i = 0; i < order_list.length; i++){
			if(order_list[i].index == 0){
				_competeOrder = order_list[i].order;
				break;
			}
		}
		
		if(isCompeteEnemy() && _raceResult != 'lose'){
			//もし、もう敵馬が居なかったり「負け（プレイヤーがリタイア）」なら、このままレースは終了するので「競り合い順位」表示は不要
			var text = '競り合い順位は' + _competeOrder + '位です';
			setHelpPause(true, true);
			_helpWindow = new Window_RaceBattleLog(SkillEffectMessageWindowX, SkillEffectMessageWindowY, SkillEffectMessageWindowWidth, SkillEffectMessageWindowHeight);;
			_sceneBattle.addWindow(_helpWindow);
			_helpWindow.open();
			_helpWindow.setText(text, '#ffffff', 'rgba(0, 0, 0, 128)');
			_helpWindow.downArrowVisible = true;
			_helpWindow.setOkCallback(function(){
				_helpWindow.close();
				_sceneBattle.removeWindow(_helpWindow);
				_helpWindow = null;
				setHelpPause(false);
			});
			_competeHorseSprList[0].setBlink();		//プレイヤー馬顔アイコン明滅
		}
	} else {
		_sceneBattle._partyCommandWindow.setup();
		_competeDamagedPrevent = 1;
	}
}

//フェイズ設定
function setPhase(phase)
{
	if(_raceResult != null && (phase != 'goal' && phase != 'end')){
		return;
	}
	if(phase == _phase){
		return;
	}
	_startPhaseUse = false;

	//元フェーズ（終了処理）
	switch(_phase){
	case 'init':
		_skillEffect = objClone(InitialSkillEffect);
		break;
	case 'racing':
		_sceneBattle.startFadeOut(24, false);
		_startPhaseUse = true;
		break;
	case 'goal':
		break;
	case 'end':
		break;
	case 'compete':
		_sceneBattle.startFadeOut(24, false);
		_startPhaseUse = true;
		break;
	case 'move':
		_sceneBattle.startFadeOut(24, false);
		_startPhaseUse = true;
		break;
	case 'last_spurt':
		_lastSpurtPhase.finalize();
		_lastSpurtPhase = null;
		break;
	}
	_oldPhase = _phase;
	_phase = phase;

	return _startPhaseUse;
}

//新フェイズ開始処理
function startPhase()
{
	_startPhaseUse = false;

	//元フェーズ（終了処理）
	switch(_oldPhase){
	case 'racing':
		_skillEffect.racing_speed_rate = 1;
		_skillEffect.obstacle_easy_avoid_rate_add = 0;
		_skillEffect.obstacle_normal_avoid_rate_add = 0;
		_skillEffect.obstacle_hard_avoid_rate_add = 0;
		break;
	case 'compete':
		_competePhase.finalize();
		_competePhase = null;
		for(var i = 0; i < _chrSprList.length; i++){
			if(_staminaList[i] > 0) _chrSprList[i].visible = true;
		}
		_skillEffect = objClone(InitialSkillEffect);
		_skillEffect.compete_damaging_rate = 1;
		_skillEffect.compete_damaged_rate = 1;
		_skillEffect.compete_invisible = false;
		_skillEffect.compete_weakest_damaging_rate = 1;
		break;
	case 'move':
		_movePhase.finalize();
		_movePhase = null;
		_sceneBattle._statusWindow.open();
		_skillEffect.move_forward_rate_add = 0;
		_skillEffect.move_in_course_rate_add = 0;
		break;
	}

	//フェードイン開始
	_sceneBattle.startFadeIn(24, false);

	//開始処理
	switch(_phase){
	case 'racing':
		showProgressGauge(true);
		_rankWindow.open();
		_phaseScrollVx = 0;
		_myStaminaWindow.move(MyStaminaWindowX, MyStaminaWindowY - MyStaminaWindowHeight, MyStaminaWindowWidth, MyStaminaWindowHeight);
		_sceneBattle._statusWindow.move(RaceBattleLogRacingX, RaceBattleLogRacingY, RaceBattleLogRacingWidth, RaceBattleLogRacingHeight);
		_sceneBattle._statusWindow.clear();
		if(_help && !_helpedList['racing'] && _helpedList['compete']){
			setHelpPause(true);
			showHelp('racing', function(){
				showSkillEffectMessage();
			});
			_helpedList['racing'] = true;
		} else {
			showSkillEffectMessage();
		}
		break;
	case 'compete':
		showProgressGauge(false);
		_rankWindow.close();
		_competeDamagedPrevent = 1;
		_sceneBattle._statusWindow.move(RaceBattleLogCompeteX, RaceBattleLogCompeteY, RaceBattleLogCompeteWidth, RaceBattleLogCompeteHeight);
		_sceneBattle._statusWindow.clear();
		_competePhase = new CompetePhase();
		if(_help && !_helpedList['compete']){
			setHelpPause(true);
			showHelp('compete', function(){
				showSkillEffectMessage();
			});
			_helpedList['compete'] = true;
		} else {
			showSkillEffectMessage();
		}
		break;
	case 'move':
		_rankWindow.open();
		_moveSelectedSkill = -1;
		_sceneBattle._statusWindow.clear();
		_sceneBattle._statusWindow.move(RaceBattleLogCompeteX, RaceBattleLogCompeteY, RaceBattleLogCompeteWidth, RaceBattleLogCompeteHeight);
		_sceneBattle._statusWindow.close();
		_movePhase = new MovePhase();
		if(_help && !_helpedList['move']){
			setHelpPause(true);
			showHelp('move');
			_helpedList['move'] = true;
		}
		_topCam = true;
		break;
	case 'last_spurt':
		_rankWindow.open();
		_phaseScrollVx = 0;
		_sceneBattle._statusWindow.clear();
		_lastSpurtPhase = new LastSpurtPhase();
		if(_help && !_helpedList['last_spurt']){
			setHelpPause(true);
			showHelp('last_spurt');
			_helpedList['last_spurt'] = true;
		}
		_topCam = true;
		break;
	}
}
//
function showSkillEffectMessage(callback, instance)
{
	var skill_info = null;
	var effect_key_list = [];
	switch(_phase){
	case 'racing':
		if(_angle != 'overthere'){
			break;
		}
		effect_key_list = [
			'racing_speed_rate',
			'obstacle_easy_avoid_rate_add',
			'obstacle_normal_avoid_rate_add',
			'obstacle_hard_avoid_rate_add'
		];
		break;
	case 'compete':
		effect_key_list = [
			'compete_damaging_rate',
			'compete_damaged_rate',
			'compete_invisible',
			'compete_weakest_damaging_rate'
		];
		break;
	case 'move':
		effect_key_list = [
			'move_forward_rate_add',
			'move_in_course_rate_add'
		];
		break;
	}
	var target_key = null;
	for(var i = 0; i < effect_key_list.length; i++){
		var key = effect_key_list[i];
		if(_skillEffect[key] != InitialSkillEffect[key]){
			target_key = key;
			break;
		}
	}
	if(target_key != null){
		for(var i = 0 ;i < SkillInfoList.length; i++){
			if(SkillInfoList[i][SkillInfo_Effect].property == target_key){
				skill_info = SkillInfoList[i];
				break;
			}
		}
	}
	if(skill_info != null){
		var last_help_pause = _helpPause;
		if(!_helpPause) setHelpPause(true);
		var text = skill_info[SkillInfo_Name] + "　発動！";
		_helpWindow = new Window_RaceBattleLog(SkillEffectMessageWindowX, SkillEffectMessageWindowY, SkillEffectMessageWindowWidth, SkillEffectMessageWindowHeight);;
		_sceneBattle.addWindow(_helpWindow);
		_helpWindow.open();
		_helpWindow.setText(text, '#ffffff', 'rgba(0, 0, 0, 128)');
		_helpWindow.downArrowVisible = true;
		_helpWindow.setOkCallback(function(){
			_helpWindow.close();
			_sceneBattle.removeWindow(_helpWindow);
			_helpWindow = null;
			if(!last_help_pause) setHelpPause(false);
			if(!!callback){
				callback.call(instance, null);
			}
		});
	}
}

//ヘルプを表示させる。
function showHelp(phase, helpEndCallback)
{
	if(!(phase in _helpInfoList)){
		return;
	}
	var text = '';
	text = _helpInfoList[phase][0];
	//複数ページ対応（ページ分ウィンドウを再起動）
	var page = text.split("#p");
	text = page[_helpInfoList[phase][3]];
	_helpInfoList[phase][3]++;
	var _helpPageNum = page.length;
	var _helpPageCnt = _helpInfoList[phase][3];
	//
	_helpWindow = new Window_RaceBattleLog(HelpWindowX, HelpWindowY, HelpWindowWidth, HelpWindowHeight);
	_sceneBattle.addWindow(_helpWindow);
	_helpWindow.open();
	_helpWindow.setText(text, _helpInfoList[phase][1], _helpInfoList[phase][2], 26);
	_helpWindow.downArrowVisible = false;
	//ウィンドウタップでヘルプを抜ける。（or 次のページへ）
	_helpWindow.setOkCallback(function(){
		_helpWindow.close();
		_sceneBattle.removeWindow(_helpWindow);
		_helpWindow = null;
		//
		if(_helpPageCnt < _helpPageNum){
			showHelp(phase, helpEndCallback);
			return;		//次のページが有る場合、もう一度ヘルプウィンドウ起動
		}
		//
		setHelpPause(false);
		if(!!helpEndCallback){
			helpEndCallback();
		}
	});
}

function setHelpPause(pause, horseSprFlag)
{
	if(_helpPause == pause){
		return;
	}
	_helpPause = pause;
	if(_helpPause){
		switch(_phase){
		case 'compete':
			_sceneBattle._partyCommandWindow.deactivate();
			_restTurnSprite.visible = false;
			if(!horseSprFlag) {
				_zanWinSprite.visible = false;
				for(var i = 0; i < _competeHorseSprList.length; i++){
					_competeHorseSprList[i].visible = false;
				}
			}
			break;
		case 'move':
			_sceneBattle._partyCommandWindow.deactivate();
			_sceneBattle._statusWindow.deactivate();
			break;
		}
	} else {
		switch(_phase){
		case 'compete':
			_othersStaminaWindow.open();
			_sceneBattle._partyCommandWindow.activate();
			_restTurnSprite.visible = true;
			_zanWinSprite.visible = true;
			if(!horseSprFlag) {
				for(var i = 0; i < _competeHorseSprList.length; i++){
					_competeHorseSprList[i].visible = true;
				}
			}
			break;
		case 'move':
			_sceneBattle._partyCommandWindow.activate();
			_sceneBattle._statusWindow.activate();
			break;
		}
	}
}

function updateMaxStamina()
{
	_maxStamina = _staminaList[0];
	for(var i = 1; i < _staminaList.length; i++){
		if(_staminaList[i] > _maxStamina){
			_maxStamina = _staminaList[i];
		}
	}
}

function addStamina(index, add)
{
	_staminaList[index] = Math.max(0, _staminaList[index] + add);
	if(_staminaList[index] == 0){
		if(_goalOrderList[index] == -1){
			//リタイア
			_finishedCharaCount++;
			_goalOrderList[index] = 0;
			if(_finishedCharaCount == _enemies){
				//残り１頭
				var win_index = -1;
				for(var i = 0; i < _staminaList.length; i++){
					if(_staminaList[i] > 0){
						win_index = i;
						break;
					}
				}
				_goalCharaCount++;
				_finishedCharaCount++;
				_goalOrderList[win_index] = _goalCharaCount;
				setRaceResult((win_index == 0) ? 'win' : 'lose');
				_goaledCounter = _counter;
			} else if(_raceResult == null && index == 0){
				//自馬のスタミナが0
				setRaceResult('lose');
				_goaledCounter = _counter;
				//他馬について現在の順番で順位をつける。
				var list = _chrSprList.clone();
				list.sort(function(x, y){
					if(x.vx != y.vx){
						return (x.vx - y.vx);
					}
					return (x.id - y.id);
				});
				for(var i = 0; i < list.length; i++){
					if(_goalOrderList[i] != -1){
						continue;
					}
					_finishedCharaCount++;
					if(_staminaList[i] == 0){
						_goalOrderList[i] = 0;
					} else {
						_goalCharaCount++;
						_goalOrderList[i] = _goalCharaCount;
					}
				}
			}
		}
	}
}
//スタミナゲージ更新
function updateGauge(competeIndex, damage, force)
{
	var index = _competeList[competeIndex];
	if(force || _staminaList[index] != _lastStaminaList[index]){
		if(competeIndex == 0){
			if(force){
				_myStaminaGauge.initGauge(_staminaList[index], _maxStaminaList[index]);
			} else {
				_myStaminaGauge.setGauge(_staminaList[index], _maxStaminaList[index]);
			}
			if(damage) _myStaminaGauge.setDamage();
		} else {
			if(force){
				_othersStaminaGaugeList[competeIndex - 1].initGauge(_staminaList[index], _maxStaminaList[index]);
			} else {
				_othersStaminaGaugeList[competeIndex - 1].setGauge(_staminaList[index], _maxStaminaList[index]);
			}
			if(damage) _othersStaminaGaugeList[competeIndex - 1].setDamage();
		}
		_lastStaminaList[index] = Math.ceil(_staminaList[index]);
	}
}

function endBattle()
{
	//着順馬名を初期化
	for(var i = 0; i < _rankNameVarList.length; i++){
		$gameVariables.setValue(_rankNameVarList[i], '');
	}
	//馬名を着順に_rankNameVarListに格納する。
	var rmax=0, j=[], k=0;
	for(var i = 0; i < _rankNameVarList.length; i++){
		if(_goalOrderList[i] > 0) {
			$gameVariables.setValue(_rankNameVarList[_goalOrderList[i]-1], _characterNameList[i]);
			if(rmax < _goalOrderList[i]) rmax = _goalOrderList[i];
		} else {
			j[k] = i;	//リタイア組を保留
			k++;
		}
	}
	for (var i=0; i < k; i++){	//保留していたリタイア組を追加
		$gameVariables.setValue(_rankNameVarList[rmax+i], _characterNameList[j[i]]);
		_goalOrderList[j[i]] = rmax+1;		//着順数値もリタイア組は同着最下位に。
	}
	//着順を_arrivalVarListに格納する。
	for(var i = 0; i < _arrivalVarList.length; i++){
		$gameVariables.setValue(_arrivalVarList[i], _goalOrderList[i]);
	}
	//勝敗を通知。
	var result = (_raceResult == 'win') ? 0 : 2;
	BattleManager.endBattle(result);
}

function setRaceResult(result)
{
	if(_raceResult == null){
		_raceResult = result;
		if(result == 'win'){
			// SE: 17
			AudioManager.playSe({"name":"Applause1","volume":70,"pitch":100,"pan":0});
			AudioManager.playSe({"name":"Applause2","volume":90,"pitch":100,"pan":0});
		}
		AudioManager.fadeOutBgm(2.0);
	}
}

var _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	if(!_isRaceBattle){
		_Scene_Battle_terminate.call(this);
		return;
	}
	_Scene_Battle_terminate.call(this);

	//終了処理
	initParameters();
};

//-----------------------------------------------------------------------------
// Container
function Racetrack() {
	this.initialize.apply(this, arguments);
}

Racetrack.prototype = Object.create(Sprite.prototype);
Racetrack.prototype.constructor = Racetrack;

Racetrack.prototype.initialize = function (
		bg_front_bm, bg_front_fence_a_bm, bg_front_fence_b_bm, bg_front_fence_c_bm,
		bg_corner_bm, bg_corner_fence_a_bm, bg_corner_fence_b_bm,
		bg_overthere_bm,
		bg_overthere_fence_a_bm, bg_overthere_fence_b_bm, bg_overthere_fence_c_bm, bg_overthere_grass_bm,
		goal_bm,
		obstacle_easy_bm, obstacle_effect_easy_bm,
		obstacle_normal_bm, obstacle_effect_normal_bm,
		obstacle_hard_bm, obstacle_effect_hard_bm,
		cutin_bm, cutin_balloon_a_bm, cutin_balloon_b_bm, cutin_table_bm,
		face_bm, window_bm, zanstamina_bm,
		chara_l_bm_list, chara_u_bm_list, chara_ul_bm_list, chara_d_bm_list, chara_dl_bm_list,
		chara_jump_bm_list,
		position_marker_bm_list,
		progress_gauge_bm,
		whip_icon_bm_list)
{
	Sprite.prototype.initialize.call(this, null);

	this.bg_front_bm = bg_front_bm;
	this.bg_front_fence_a_bm = bg_front_fence_a_bm;
	this.bg_front_fence_b_bm = bg_front_fence_b_bm;
	this.bg_front_fence_c_bm = bg_front_fence_c_bm;
	this.bg_corner_bm = bg_corner_bm;
	this.bg_corner_fence_a_bm = bg_corner_fence_a_bm;
	this.bg_corner_fence_b_bm = bg_corner_fence_b_bm;
	this.bg_overthere_bm = bg_overthere_bm;
	this.bg_overthere_fence_a_bm = bg_overthere_fence_a_bm;
	this.bg_overthere_fence_b_bm = bg_overthere_fence_b_bm;
	this.bg_overthere_fence_c_bm = bg_overthere_fence_c_bm;
	this.bg_overthere_grass_bm = bg_overthere_grass_bm;
	this.goal_bm = goal_bm;
	this.obstacle_easy_bm = obstacle_easy_bm;
	this.obstacle_effect_easy_bm = obstacle_effect_easy_bm;
	this.obstacle_normal_bm = obstacle_normal_bm;
	this.obstacle_effect_normal_bm = obstacle_effect_normal_bm;
	this.obstacle_hard_bm = obstacle_hard_bm;
	this.obstacle_effect_hard_bm = obstacle_effect_hard_bm;
	this.cutin_bm = cutin_bm;
	this.cutin_balloon_a_bm = cutin_balloon_a_bm;
	this.cutin_balloon_b_bm = cutin_balloon_b_bm;
	this.cutin_table_bm = cutin_table_bm;
	this.face_bm = face_bm;
	this.window_bm = window_bm;
	this.zanstamina_bm = zanstamina_bm;
	this.chara_l_bm_list = chara_l_bm_list;
	this.chara_u_bm_list = chara_u_bm_list;
	this.chara_ul_bm_list = chara_ul_bm_list;
	this.chara_d_bm_list = chara_d_bm_list;
	this.chara_dl_bm_list = chara_dl_bm_list;
	this.chara_jump_bm_list = chara_jump_bm_list;
	this.position_marker_bm_list = position_marker_bm_list;
	this.progress_gauge_bm = progress_gauge_bm;
	this.whip_icon_bm_list = whip_icon_bm_list;

	_goalSpr = new GoalSprite(this.goal_bm);
	this.addChild(_goalSpr);

	_chrSprList = [];
	_chrSprVX = [];
	for(var i = 0; i < _enemies + 1; i++){
		var sprite = new CharacterSprite(null, i + 1);
		this.addChild(sprite);
		_chrSprList.push(sprite);
	}

	_competeVx = _startX;
	_chrMinVx = _startX;
	_movePhaseSkip = false;
	_moveCount = 0;

	var img_path = "img/racebattle/overlay/";
	var bm = ImageManager.loadBitmap(img_path, "bidding_gauge");
_debugSprite = new Sprite(bm);
this.addChild(_debugSprite);
_debugSprite.x = 0;
_debugSprite.y = 0;
_debugSprite.visible = false;
	this.resetPosition(_startX);
};


Racetrack.prototype.getAngleInfo = function(camera_x)
{
	//コーナーでスタートさせないための特殊判定。
	var start_angle = _angleChange[_angleChange.length - 1].angle;
	var start_index = _angleChange.length - 1;
	for(var i = 0; i < _angleChange.length; i++){
		if(_startX <= _angleChange[i].vx){
			start_angle = _angleChange[i].angle;
			start_index = i;
			break;
		}
	}
	var start_adjust_index = -1;
	if(start_angle == 'upCorner' || start_angle == 'downCorner'){
		//開始地点がコーナーになってしまう。
		start_adjust_index = start_index;
	}
	var angle = _angleChange[_angleChange.length - 1].angle;

	var angle_start = _angleChange[_angleChange.length - 1].vx;
	var angle_distance = (_angleChange.length - 1 >= 1 ? (angle_start - _angleChange[_angleChange.length - 2].vx) : angle_start);
	var last_straight = (_angleChange.length - 1 == 0);
	if(_angleChange.length - 1 == start_adjust_index){
		angle = _angleChange[start_adjust_index - 1].angle;
		angle_start = _angleChange[start_adjust_index - 1].vx;
		angle_distance = (start_adjust_index - 1 >= 1 ? (angle_start - _angleChange[start_adjust_index - 2].vx) : angle_start);
		last_straight = (start_adjust_index - 1 == 0);
	}
	for(var i = 0; i < _angleChange.length; i++){
		if(camera_x <= _angleChange[i].vx){
			angle = _angleChange[i].angle;
			angle_start = _angleChange[i].vx;
			angle_distance = (i >= 1 ? (angle_start - _angleChange[i - 1].vx) : angle_start);
			last_straight = (i == 0);
			if(i == start_adjust_index){
				angle = _angleChange[start_adjust_index - 1].angle;
				angle_start = _angleChange[start_adjust_index - 1].vx;
				angle_distance = (start_adjust_index - 1 >= 1 ? (angle_start - _angleChange[start_adjust_index - 2].vx) : angle_start);
				last_straight = (start_adjust_index - 1 == 0);
			}
			break;
		}
	}

	//「競い合い」「走行指示」は必ずサイドビューに。
	if(_phase == 'compete' || _phase == 'move'){
		angle = 'front';
	}
	if(angle == 'upCorner'){
		angle = (_clockwise ? 'leftCorner' : 'rightCorner');
	} else if(angle == 'downCorner'){
		angle = (_clockwise ? 'rightCorner' : 'leftCorner');
	}
	var info = {"angle": angle, "start": angle_start, "distance": angle_distance, "last_straight": last_straight};
	return info;
}

Racetrack.prototype.resetPosition = function(start_x)
{
	_counter = 0;
	_goaledCounter = 0;
	setPhase('init');
	_angle = null;
	var info = this.getAngleInfo(start_x);
	var new_angle = info.angle;
	if(new_angle != _angle){
		_angleStart = info.start;
		_angleDistance = info.distance;
		this.changeAngle(new_angle);
	}

	_camera.initial = true;
	_camera.vx = start_x;
	_camera.vy = 0;
	_camera.x = start_x;
	_camera.y = 0;

	_goalSpr.x = 0;
	_goalSpr.y = 0;

	var list = [];
	for(var i = 0; i < _chrSprList.length; i++){
		list.push([i, Math.random()]);
	}
	list.sort(function(x, y){
		return x[1] - y[1];
	});
	for(var i = 0; i < _chrSprList.length; i++){
		var sprite = _chrSprList[i];
		if(_angle == 'overthere'){
			sprite.vx = start_x + 128/2/MeterToScrCoordScaling;
		} else {
			sprite.vx = start_x + (Graphics.width / 2/2	 - 128/2)/MeterToScrCoordScaling;
		}
		sprite.vy = list[i][0] * 40;
		if(CharacterAngleTest){
			sprite.vx += -i * HorseWidth;
			sprite.vy = i;
		}
		sprite.x = sprite.vx * MeterToScrCoordScaling;
		sprite.y = sprite.vy * MeterToScrCoordScaling;
		sprite.speed = 0.5;
		sprite.energy = start_x;
		sprite.extra_energy = 0;
	}
	updateLaneCount(info);
};

function updateLaneCount(info)
{
	_angleLaneCount = 4;
	_angleLaneWidth = 30;
	_lastStraight = info.last_straight;
	switch(info.angle){
	case 'front':
		if(info.last_straight){
			_angleLaneCount = 8;
			_angleLaneWidth = 20;
		} else {
			_angleLaneCount = 4;
			_angleLaneWidth = 30;
		}
		break;
	case 'leftCorner':
		_angleLaneCount = 4;
		_angleLaneWidth = 30;
		break;
	case 'rightCorner':
		_angleLaneCount = 4;
		_angleLaneWidth = 30;
		break;
	case 'overthere':
		_angleLaneCount = 4;
		_angleLaneWidth = 30;
		break;
	}
}

//論理座標から正面アングルでの画面座標を返す
//["x": X座標, "y": Y座標]
Racetrack.prototype.getFrontCoordinates = function(vx, vy)
{
	if(_clockwise){
		return {"x": (vx * MeterToScrCoordScaling), "y": (vy)};
	} else {
		return {"x": (-vx * MeterToScrCoordScaling), "y": (vy)};
	}
}

//論理座標から奥側アングルでの画面座標を返す
//["x": X座標, "y": Y座標]
Racetrack.prototype.getOverthereCoordinates = function(vx, vy)
{
	var x = vx * MeterToScrCoordScaling * 2;
	if(_clockwise){
		x = -x;
	}
	var y = _trackSpr.bitmapHeight - vy;
	return {"x": (x), "y": (y)};
}

var CornerRadiusIn = 525;
var CornerRadiusOut = 1170;
var CornerDisplace = 100;

var CharaDirRight = 0;
var CharaDirUpRight = 1;
var CharaDirUp = 2;
var CharaDirUpLeft = 3;
var CharaDirLeft = 4;
var CharaDirDownLeft = 5;
var CharaDirDown = 6;
var CharaDirDownRight = 7;

var rightCornerAdjustX =  16;
var rightCornerAdjustY = -32;
var leftCornerAdjustX = -96-16-16;
var leftCornerAdjustY = -32;

//論理座標からコーナーアングルでの画面座標と角度係数を返す
//コーナーはカメラ位置を基準に変形させるため、カメラの論理座標を引数に追加指定する。
//a: 角度係数。0: 左向き, 1: 左上向き, 2: 上向き, 3: 右上向き, 4: 右向き, -1: 左下向き, -2: 下向き, -2: 右下向き
//["x": X座標, "y": Y座標, "a": 角度係数]
Racetrack.prototype.getCornerCoordinates = function(vx, vy, camera_vx, for_bg)
{
	var x = vx * MeterToScrCoordScaling * 0.5;
	var y = vy / (40 * 9);
	var a;
	var aa;
	if(_angle == 'rightCorner'){
		x -= camera_vx*MeterToScrCoordScaling * 0.5;
		if(!_clockwise){
			x = -x;
		}
		var rad = x / (2 * Math.PI * CornerRadiusIn) * (2 * Math.PI) + _cornerRad;

		if(for_bg){
			x = 0;
			y = 0;
		} else {
			x = Math.cos(rad) * (CornerRadiusIn + (CornerRadiusOut - CornerRadiusIn) * y) + rightCornerAdjustX;
			y = -Math.sin(rad) * (CornerRadiusIn + (CornerRadiusOut - CornerRadiusIn) * y) + rightCornerAdjustY;
		}
		var k = Math.floor((rad + Math.PI / 16) / (Math.PI / 8));
		a = (k + 8 + CharaDirDown) % 8;
		aa = rad;
		var rad = ((_clockwise ? -_cornerRad : -_cornerRad));
		x += -Math.cos(rad) * CornerRadiusMid + Graphics.width / 2;
		y += -Math.sin(rad) * CornerRadiusMid + Graphics.height / 2;
	} else {
		x -= camera_vx*MeterToScrCoordScaling * 0.5;
		if(!_clockwise){
			x = -x;
		}
		var rad = x / (2 * Math.PI * CornerRadiusIn) * (2 * Math.PI) + _cornerRad;

		if(for_bg){
			x = 0;
			y = 0;
		} else {
			x = -Math.cos(rad) * (CornerRadiusIn + (CornerRadiusOut - CornerRadiusIn) * y) + leftCornerAdjustX;
			y = Math.sin(rad) * (CornerRadiusIn + (CornerRadiusOut - CornerRadiusIn) * y) + leftCornerAdjustY;
		}

		var k = Math.floor((rad + Math.PI /16) / (Math.PI / 8));
		a = (k + 8 + CharaDirUp) % 8;
		aa = rad;
		var rad = (Math.PI + (_clockwise ? -_cornerRad : -_cornerRad));
		x += -Math.cos(rad) * CornerRadiusMid + Graphics.width / 2;
		y += -Math.sin(rad) * CornerRadiusMid + Graphics.height / 2;
	}
	return {"x": (x), "y": (y), "a": (a), "aa": (aa)};
}

Racetrack.prototype.changeAngle = function(angle)
{
	if(angle == _angle) return;

	_angle = angle;
	this.destroyObstacle();
	if(_trackSpr != null){
		_trackSpr.visible = false;
		_trackSpr = null;
	}
	if(_fenceASpr != null){
		_fenceASpr.visible = false;
		_fenceASpr = null;
	}
	if(_fenceBSpr != null){
		_fenceBSpr.visible = false;
		_fenceBSpr = null;
	}
	if(_fenceCSpr != null){
		_fenceCSpr.visible = false;
		_fenceCSpr = null;
	}
	if(_grassSpr != null){
		_grassSpr.visible = false;
		_grassSpr = null;
	}
	var at = 1;
	if(_angle == 'leftCorner'){
		_trackSpr = new CornerSprite(this.bg_corner_bm, 1.0);
		this.addChildAt(_trackSpr, 0);
		_fenceBSpr = new CornerSprite(this.bg_corner_fence_b_bm, 1.0);
		this.addChildAt(_fenceBSpr, 1);
		_fenceASpr = new CornerSprite(this.bg_corner_fence_a_bm, 1.0);
		this.addChildAt(_fenceASpr, 2);
	} else if(_angle == 'rightCorner'){
		_trackSpr = new CornerSprite(this.bg_corner_bm, 1.0);
		this.addChildAt(_trackSpr, 0);
		_fenceBSpr = new CornerSprite(this.bg_corner_fence_b_bm, 1.0);
		this.addChildAt(_fenceBSpr, 1);
		_fenceASpr = new CornerSprite(this.bg_corner_fence_a_bm, 1.0);
		this.addChildAt(_fenceASpr, 2);
	} else if(_angle == 'front'){
		_trackSpr = new TrackSprite(this.bg_front_bm, 0, 1.0);
		this.addChildAt(_trackSpr, 0);
		_fenceCSpr = new TrackSprite(this.bg_front_fence_c_bm, 36, 1.0);
		this.addChildAt(_fenceCSpr, 1);
		_fenceBSpr = new TrackSprite(this.bg_front_fence_b_bm, 67, 1.0);
		this.addChildAt(_fenceBSpr, 2);
		_fenceASpr = new TrackSprite(this.bg_front_fence_a_bm, 425, 2.0);
		this.addChildAt(_fenceASpr, 3);
	} else if(_angle == 'overthere'){
		_trackSpr = new TrackSprite(this.bg_overthere_bm, 0, 1.0);
		this.addChildAt(_trackSpr, 0);
		_grassSpr = new TrackSprite(this.bg_overthere_grass_bm, 0, 0.85);
		this.addChildAt(_grassSpr, 1);
		_fenceCSpr = new TrackSprite(this.bg_overthere_fence_c_bm, 67, 0.9);
		this.addChildAt(_fenceCSpr, 2);
		_fenceBSpr = new TrackSprite(this.bg_overthere_fence_b_bm, 425, 1.25);
		this.addChildAt(_fenceBSpr, 3);
		_fenceASpr = new TrackSprite(this.bg_overthere_fence_a_bm, 476, 1.25);
		this.addChildAt(_fenceASpr, 3);
		at = 3;
	}

	if(_angle == 'front' || _angle == 'overthere'){
		_goalSpr.visible = true;
	} else {
		_goalSpr.visible = false;
	}
	for(var i = 0; i < _chrSprList.length; i++){
		var sprite = _chrSprList[i];
		var img_index = getHorseImgIndex(i + 1);
		if(_angle == 'front'){
			sprite.setBitmapInfo(this.chara_l_bm_list[img_index], 1, 4, 17, this.chara_l_bm_list);
		} else if(_angle == 'leftCorner'){
			sprite.setBitmapInfo(this.chara_u_bm_list[img_index], 1, 4, 15, this.chara_u_bm_list);
		} else if(_angle == 'rightCorner'){
			sprite.setBitmapInfo(this.chara_d_bm_list[img_index], 1, 4, 15, this.chara_d_bm_list);
		} else if(_angle == 'overthere'){
			sprite.setBitmapInfo(this.chara_l_bm_list[img_index], 2, 4, 15, this.chara_l_bm_list);
		}
		sprite.setJump(false);
		sprite._jumpOffset = 0;
		sprite._obstacleIndex = 0;
	}
	if(_angle == 'overthere' && this.bitmapHeight){
		this.createObstacle(at);
	}
}

Racetrack.prototype.createObstacle = function(at)
{
	this.destroyObstacle();
	//障害物を配置する。
	_obstacleList = [];
	_chrMinVx = Math.min(_chrMinVx, _chrSprList[0].vx);
	var info = this.getAngleInfo(_chrMinVx);
	var obstacle_rate = 0;
	for(var i = 0; i < _obstacleInfo.length; i++){
		obstacle_rate += _obstacleInfo[i][0];
	}
	var compete_space_list = [];
	for(var i = 0; i < _phaseChange.length; i++){
		if(_phaseChange[i].vx <= info.start && _phaseChange[i].vx > info.start - info.distance){
			compete_space_list.push(-(_phaseChange[i].vx - info.start));
		}
	}
	var pos = HorseWidth + (info.start - _camera.vx);
	while(pos < info.distance){
		var skip = false;
		for(var i = 0; i < compete_space_list.length; i++){
			if(pos >= compete_space_list[i] - HorseWidth * 5
			&& pos <  compete_space_list[i] + HorseWidth * 5){
				skip = true;
				pos = compete_space_list[i] + HorseWidth * 5;
				break;
			}
		}
		if(skip){
			continue;
		}
		if(Math.random() * 100 < obstacle_rate){
			var rate = Math.random() * obstacle_rate;
			var kind = Obstacle_Easy;
			for(var i = 0; i < _obstacleInfo.length; i++){
				if(rate < _obstacleInfo[i][0]){
					kind = i;
					break;
				}
				rate -= _obstacleInfo[i][0];
			}
			var bitmap = null;
			var width_in_meter = 0;
			var y = 0;
			var lm = 0; //障害物画像の左側の障害物でない部分の幅
			var rm = 0; //障害物画像の右側の障害物でない部分の幅
			switch(kind){
				case Obstacle_Easy:
					bitmap = this.obstacle_easy_bm;
					width_in_meter = 62 / MeterToScrCoordScaling;
					y = -22;
					lm = 31 / MeterToScrCoordScaling;
					rm = 5 / MeterToScrCoordScaling;
					break;
				case Obstacle_Normal:
					bitmap = this.obstacle_normal_bm;
					width_in_meter = 130 / MeterToScrCoordScaling;
					y = -17;
					lm = 35 / MeterToScrCoordScaling;
					rm = 1 / MeterToScrCoordScaling;
					break;
				case Obstacle_Hard:
					bitmap = this.obstacle_hard_bm;
					width_in_meter = 139 / MeterToScrCoordScaling;
					y = -75;
					lm = 15 / MeterToScrCoordScaling;
					rm = 10 / MeterToScrCoordScaling;
					break;
			}
			var sprite = new Sprite(bitmap);
			sprite.vx = info.start - pos;
			sprite.vy = y;
			sprite.vw = width_in_meter;
			var xy = this.getOverthereCoordinates(sprite.vx, sprite.vy + 600);
			sprite.x = xy.x;
			sprite.y = xy.y;
			sprite.kind = kind;
			sprite.lm = lm;
			sprite.rm = rm;

			this.addChildAt(sprite, at);
			_obstacleList.push(sprite);
			pos += width_in_meter + HorseWidth;
		} else {
			pos += HorseWidth;
		}
	}
};

Racetrack.prototype.destroyObstacle = function()
{
	//直線のアングルの障害物を消す。
	if(_obstacleList != null && _obstacleList.length > 0){
		for(var i = 0; i < _obstacleList.length; i++){
			this.removeChild(_obstacleList[i]);
		}
		_obstacleList = [];
		_obstacleList = null;
	}
};

function showProgressGauge(bShow)
{
	if(bShow){
		_progressGaugeSpr.visible = true;
		for(var i = 0; i < _positionMarkerSprList.length; i++){
			_positionMarkerSprList[i].visible = _chrSprList[i].visible;
		}
	} else {
		_progressGaugeSpr.visible = false;
		for(var i = 0; i < _positionMarkerSprList.length; i++){
			_positionMarkerSprList[i].visible = false;
		}
	}
}

Racetrack.prototype.updateBlank = function(newBlankFrames)
{
	if(newBlankFrames > 0 && _blankFrames == 0){
		if(_trackSpr != null){
			_trackSpr.visible = false;
		}
		if(_fenceASpr != null){
			_fenceASpr.visible = false;
		}
		if(_fenceBSpr != null){
			_fenceBSpr.visible = false;
		}
		if(_fenceCSpr != null){
			_fenceCSpr.visible = false;
		}
		if(_grassSpr != null){
			_grassSpr.visible = false;
		}
		if(_goalSpr != null){
			_goalSpr.visible = false;
		}
		for(var i = 0; i < _chrSprList.length; i++){
			_chrSprList[i].visible = false;
		}
	} else if(newBlankFrames == 0 && _blankFrames > 0){
		if(_trackSpr != null){
			_trackSpr.visible = true;
		}
		if(_fenceASpr != null){
			_fenceASpr.visible = true;
		}
		if(_fenceBSpr != null){
			_fenceBSpr.visible = true;
		}
		if(_fenceCSpr != null){
			_fenceCSpr.visible = true;
		}
		if(_grassSpr != null){
			_grassSpr.visible = true;
		}
		if(_goalSpr != null){
			if(_angle == 'front' || _angle == 'overthere'){
				_goalSpr.visible = true;
			} else {
				_goalSpr.visible = false;
			}
		}
		for(var i = 0; i < _chrSprList.length; i++){
			_chrSprList[i].visible = (_staminaList[i] > 0);	//スタミナに依存。
		}
	}
	_blankFrames = newBlankFrames;
}

Racetrack.prototype.update = function()
{
	if(_sceneBattle != null) {
		if(_startPhaseUse){						//フェイズ変更申請
			if(_sceneBattle.isBusy()) return;		//フェードアウト中は待つ
			startPhase();							//保留していた処理をフェイズ変更処理
		}
	}

	if(!_helpPause && _delayedCount > 0 && _delayedPhase != null){
		_delayedCount--;
		if(_delayedCount == 0){
			if(setPhase(_delayedPhase)) return;
			_delayedPhase = null;
		}
	}
	if(_phase == 'racing'){
		if(_phase == 'racing' && _angle == 'front' && _camera.vx <= _angleChange[0].vx){
			setPhase('last_spurt')
		} else {
			for(var i = 0; i < _phaseChange.length; i++){
				//カメラではなくプレイヤー位置でフェーズ変更
				_chrMinVx = Math.min(_chrMinVx, _chrSprList[0].vx);
				if(_competeVx > _phaseChange[i].vx && _chrMinVx <= _phaseChange[i].vx){
					_competeVx = _chrMinVx;
					_movePhaseSkip = _phaseChange[i].skip;
					if(setPhase(_phaseChange[i].phase)) return;
					break;
				}
			}
		}
	}

	//カメラではなくプレイヤーの位置でアングル決定
	_chrMinVx = Math.min(_chrMinVx, _chrSprList[0].vx);
	var info = this.getAngleInfo(_chrMinVx);
	var new_angle = info.angle;
	if(new_angle != _angle){
		_angleStart = info.start;
		_angleDistance = info.distance;
		this.changeAngle(new_angle);
	}
	if(_angle == 'front'){
		var xy = this.getFrontCoordinates(_camera.vx, _camera.vy);
		this.x = -xy.x + (Graphics.width / 2);
		this.y = 0;
	} else if(_angle == 'leftCorner' || _angle == 'rightCorner'){
		this.x = 0;
		this.y = 0;
	} else if(_angle == 'overthere'){
		var xy = this.getOverthereCoordinates(_camera.vx, _camera.vy);
		this.x = -xy.x + (Graphics.width / 2);
		this.y = 0;
	}
	var goaled = false;

	if(_trackSpr != null){
		_trackSpr.update();
	}
	if(_fenceASpr != null){
		_fenceASpr.update();
	}
	if(_fenceBSpr != null){
		_fenceBSpr.update();
	}
	if(_fenceCSpr != null){
		_fenceCSpr.update();
	}
	if(_grassSpr != null){
		_grassSpr.update();
	}
	_goalSpr.update();
	if(_cutin != null){
		_cutin.update();
	}

	for(var i = 0; i < _chrSprList.length; i++){
		if(_chrSprList[i].update()){
			goaled = true;
			if(_goalOrderList[i] == -1){
				_goalCharaCount++;
				_finishedCharaCount++;
				_goalOrderList[i] = _goalCharaCount;

				//プレイヤーがゴールした時点でムチアイコン消去
				if(i == 0) {
					for(var j = 0; j < WhipPosList.length; j++){
						_raceTrack.getBaseSprite().removeChild(_whipIconSprList[j]);
					}
					_whipIconSprList = [];
				}
				//
			}
		}
		_positionMarkerSprList[i].x = 26 + (586 - 26) * _chrSprList[i].vx / _startX;
	}
	if(_angle == 'front' || _angle == 'last_spurt' || _angle == 'goal' || _angle == 'end'){
		_myMarkerSpr.x = _chrSprList[0].x - 36 + this.x;
		_myMarkerSpr.y = _chrSprList[0].y - 74;
	} else if(_angle == 'front' || _angle == 'overthere'){
		_myMarkerSpr.x = _chrSprList[0].x - 36 + this.x;
		_myMarkerSpr.y = _chrSprList[0].y - 116;
	} else {
		_myMarkerSpr.x = _chrSprList[0].x - 36;
		_myMarkerSpr.y = _chrSprList[0].y - 82;
	}

	this.sortCharacter();
	if((_phase == 'racing' || _phase == 'last_spurt') && goaled){
		setPhase('goal');
		_goaledCounter = _counter;

		if(_raceResult == null){
			var result = 'win';
			for(var i = 1; i < _chrSprList.length; i++){
				if(_chrSprList[i].vx < _chrSprList[0].vx){
					//負け
					result = 'lose';
					break;
				}
			}
			setRaceResult(result);
		}
	}
	if(_phase == 'goal' || _phase == 'end'){
		if(_camera.vx > 0){
			var tagX = _chrSprList[0].vx - 10;
			_camera.vx = cameraMoveX(tagX, _camera.vx);
		}
	} else if(_phase == 'racing' || _phase == 'last_spurt' || _competeAdjust){
		if(CharacterAngleTest){
			//中央のインデックスのキャラクターにカメラ位置を設定する。
			_camera.vx = _chrSprList[_chrSprList.length >> 1].vx;
		} else if(_topCam){
			//先頭を走っているキャラクターにカメラ位置を設定する。
			var vx = _chrSprList[0].vx;
			for(var i = 0; i < _chrSprList.length; i++){
				if(_chrSprList[i].vx < vx){
					vx = _chrSprList[i].vx;
				}
			}
			_camera.vx = vx;
			_topCam = false;
		} else {
			//レース中のカメラ位置をキャラの位置を元に更新する。
			var tagX = _chrSprList[0].vx;
			if(_angle == 'front') tagX -= 10;			//front位置補正
			if(_angle == 'overthere') tagX -= 20;		//overthere位置補正
			_camera.vx = cameraMoveX(tagX, _camera.vx);
		}
		if(_angle == 'leftCorner'){
			if(_clockwise){
				_cornerRad = Math.PI / 16 + Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			} else {
				_cornerRad = -Math.PI / 16 - Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			}
		} else if(_angle == 'rightCorner'){
			if(_clockwise){
				_cornerRad = Math.PI / 16 + Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			} else {
				_cornerRad = -Math.PI / 16 - Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			}
		}
	} else if(_phase == 'compete'){
		if(!_helpPause){
			_phaseScrollVx -= PhaseScrollVxDegree;
		}
		//カメラ位置を競い合い馬（自分含む）の先頭と最後尾の中央に設定。
		var vxs = [];
		for(var i = 0; i < _competeList.length; i++) {
			if(_staminaList[_competeList[i]] > 0) {			//（リタイア馬は除外）
				vxs.push(_chrSprList[_competeList[i]].vx);
			}
		}
		var tagX = (Math.max.apply(null, vxs) + Math.min.apply(null, vxs)) / 2;
		var offX = (_angle == 'overthere')? 20:40;
		if(tagX < _chrSprList[0].vx-offX) tagX = _chrSprList[0].vx-offX;	//プレイヤーが画面外に行かないように範囲制限する。
		if(tagX > _chrSprList[0].vx+offX) tagX = _chrSprList[0].vx+offX;
		_camera.vx = cameraMoveX(tagX, _camera.vx);

		if(_angle == 'leftCorner'){
			if(_clockwise){
				_cornerRad = Math.PI / 16 + Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			} else {
				_cornerRad = -Math.PI / 16 - Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			}
		} else if(_angle == 'rightCorner'){
			if(_clockwise){
				_cornerRad = Math.PI / 16 + Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			} else {
				_cornerRad = -Math.PI / 16 - Math.PI / 8 / _angleDistance * (_camera.vx - _angleStart);
			}
		}

		if(_competeHorseSprList != null){
			//馬顔アイコン位置を、スタミナから画面右半分に入るように相対位置計算。
			var sts = [];
			var sti = [];
			for(var i = 0; i < _competeList.length; i++) {
				if(_staminaList[_competeList[i]] > 0) {			//（リタイア馬は除外）
					sts.push(_staminaList[_competeList[i]]);
					sti.push(i);
				}
			}
			var minX = Math.min.apply(null, sts);
			var posW = Math.max.apply(null, sts) - minX;
			for(var i = 0; i < sts.length; i++){
				_competeHorseSprList[sti[i]].x = CompeteHorseMinX + (Math.min(posW*10, (CompeteHorseMaxX-CompeteHorseMinX)) * (1.0 - (sts[i] - minX) / posW));
			}
		}
		//馬キャラ、ダメージ時のノックバック処理。
		if(_competeHorseKnockBack != null){
			for(var i = 0; i < _competeHorseKnockBack.length; i++){
				if(_competeHorseKnockBack[i] > 0){
					var degree = Math.min(2/MeterToScrCoordScaling, _competeHorseKnockBack[i]);
					_competeHorseKnockBack[i] -= degree;			//ノックバック値減衰
					_chrSprList[_competeList[i]].vx += degree;		//レースＸ位置を下げる
				}
			}
		}

	} else if(_phase == 'move'){
		if(!_helpPause){
			_phaseScrollVx -= PhaseScrollVxDegree;
		}
		if(_topCam){
			//先頭を走っているキャラクターにカメラ位置を設定する。
			var vx = _chrSprList[0].vx;
			for(var i = 0; i < _chrSprList.length; i++){
				if(_chrSprList[i].vx < vx){
					vx = _chrSprList[i].vx;
				}
			}
			_camera.vx = vx;
			_topCam = false;
		} else {
			//レース中のカメラ位置をキャラの位置を元に更新する。
			_camera.vx = cameraMoveX(_chrSprList[0].vx, _camera.vx);
		}
	}
	if(!_helpPause && (_phase == 'last_spurt' || _phase == 'goal')){
		if((Input.isTriggered('ok') || TouchInput.isTriggered()) && _whipIconSprList.length > 0){
			var active = false;
			var ready_count = 0;
			for(var i = 0; i < _whipIconSprList.length; i++){
				if(_whipIconSprList[i]._active){
					active = true;
				}
				if(_whipIconSprList[i]._ready){
					ready_count++;
				}
			}
			if(!active){
				//鞭（ブースト）使用。
				for(var i = 0; i < _whipIconSprList.length; i++){
					var wh = _whipIconSprList[i].width  / 2;
					var hh = _whipIconSprList[i].height / 2;
					if(_whipIconSprList[i].visible && _whipIconSprList[i]._ready) {
						if(Input.isTriggered('ok') || (    TouchInput.x >= _whipIconSprList[i].x - wh 
														&& TouchInput.x < _whipIconSprList[i].x + wh
														&& TouchInput.y >= _whipIconSprList[i].y - hh
														&& TouchInput.y < _whipIconSprList[i].y + hh)){
							_whipIconSprList[i].setActive();
							//スタミナ消費追加
							addStamina(0,-_maxStaminaList[0]*0.20);	//最大スタミナの２０％
							updateGauge(0, false, true);
							if(_staminaList[0] <= 0){
								_chrSprList[0]._retireCnt = 45;	//リタイア
							} else {
								//加速エフェクト発動
								_chrSprList[0].setAccEff();
								SoundManager.playOk();
								// SE: 16
								AudioManager.playSe({"name":"Horse","volume":90,"pitch":100,"pan":0});
								if(_chrSprList.length > 0){
									_chrSprList[0].extra_energy += 60 * 10 / 2;
									_moveHorseForceMoveX += -3 * MeterToScrCoordScaling;
									_moveHorseForceKeep = 30;
									_chrSprList[0].whip_spurt = true;
									if(ready_count == 1){
										_chrSprList[0].last_spurt = true;
									}
								}
							}
							break;
						}
					}
				}
			}
		}
	}
	if((_phase == 'racing' || _phase == 'last_spurt' || _phase == 'goal') && !_helpPause){
		if(_sceneBattle._statusWindow.isAdding()){
			_commentCounter = _counter;
		} else if((_counter - _commentCounter) >= 120){
			var comment = null;
			do {
				comment = getStartLiveComment();
				if(comment != null){
					break;
				}
				if(_phase == 'racing'){
					comment = getIntermediateLiveComment();
				} else {
					comment = getLastSpurtLiveComment();
				}
			} while(0);
			if(comment != null){
				//後ろに改行コード付与(半角スペースも)
				_sceneBattle._statusWindow.addText(comment + "\n ");
				_commentCounter = _counter;
			}
		}
	}
	if(!_helpPause && _phase == 'racing' && _raceResult == null){
		if(_cutin == null){
			if(Math.random() * 900 < 1){			//1回/900fr≒1回/30秒
				var j = Math.floor(Math.random()*3);	//発動可能チェック順番もランダムで。
				for(var i=0; i<3; i++){
					var k = (j + i) % 3;
					if(_cheerIp[k] > 0){
						_cheerIp[k]--;
						_cutinIp = k+1;
						_cutin = new Cutin(k, Math.floor(Math.random()*2), function(){
							if(_cutinIp == 1){			//パックマン
								//次の次の競り合いフェイズでの競り合いに必ず勝つ。
								_competeInfo['win_' + (_competeInfo.counter + 2)] = true;
							} else if(_cutinIp == 2){	//もじくん
								//かしこさＵＰ。
								_smartList[0] += 96;
							} else if(_cutinIp == 3){	//ワルキューレ
								//スタミナを大きく回復する。
								addStamina(0, 500);
							}
						}, function(){
							_cutin.parent.removeChild(_cutin);
							_cutin = null;
						});
						_raceTrack.getBaseSprite().addChild(_cutin);
						break;
					}
				}
			}
		}
		
	}
	if(_phase != 'end' && _raceResult != null){
		if(_finishedCharaCount < _enemies + 1){
			//まだ全頭がゴール（またはリタイア）していない。
			_goaledCounter = _counter;
		} else if(_counter - _goaledCounter >= 60 * 2){
			if(_phase == 'goal'){
				//全頭がゴール（またはリタイア）して、２秒経過した。
				setPhase('end');
				endBattle();
			} else {
				//決着がついて２秒経過した。
				if(!_helpPause){
					var text = (_raceResult == 'win') ? '\n他馬がリタイアしたため優勝です！' : '\n       リタイア負けです。';
					setHelpPause(true);
					_helpWindow = new Window_RaceBattleLog(ResultWindowX, ResultWindowY, ResultWindowWidth, ResultWindowHeight);
					_sceneBattle.addWindow(_helpWindow);
					_helpWindow.open();
					_helpWindow.setText(text, '#ffffff', 'rgba(0, 0, 0, 128)');
					_helpWindow.downArrowVisible = true;
					_helpWindow.setOkCallback(function(){
						_helpWindow.close();
						_sceneBattle.removeWindow(_helpWindow);
						_helpWindow = null;
						endBattle();

					});
				}
			}
		}
	}
	if(_phase != 'init'){
		if(!_helpPause && _counter >= _raceStartCount + 60){
			// SE: 蹄ＳＥ horse_run
			if((_counter % 75) == 0){
				AudioManager.playSe({"name":"horse_run","volume":50,"pitch":90,"pan":0});
			}
		}
	}
	//現プレイヤー順位
	var nowRank = 1;
	for(var i=1; i<_chrSprList.length; i++){
		if(_chrSprList[0].vx > _chrSprList[i].vx) nowRank++;
	}
	if(_rankWindowNum != nowRank) {
		_rankWindowNum = nowRank;		//順位表示
		_rankWindow.contents.clear();
		_rankWindow.drawText(nowRank+'位', 0,-2, 64, "center");
	}

	_counter++;
	if(_blankFrames > 0){
		this.updateBlank(_blankFrames - 1);
	}
};

function cameraMoveX(targetX, nowX)
{
	if(nowX < targetX){
		if(targetX - nowX >= 128/MeterToScrCoordScaling){
			nowX += 4/MeterToScrCoordScaling;
		} else if(targetX - nowX >= 64/MeterToScrCoordScaling){
			nowX += 3/MeterToScrCoordScaling;
		} else if(targetX - nowX >= 32/MeterToScrCoordScaling){
			nowX += 2/MeterToScrCoordScaling;
		} else {
			nowX += 1/MeterToScrCoordScaling;
		}
	} else if(nowX > targetX){
		if(nowX - targetX >= 128/MeterToScrCoordScaling){
			nowX -= 4/MeterToScrCoordScaling;
		} else if(nowX - targetX >= 64/MeterToScrCoordScaling){
			nowX -= 3/MeterToScrCoordScaling;
		} else if(nowX - targetX >= 32/MeterToScrCoordScaling){
			nowX -= 2/MeterToScrCoordScaling;
		} else {
			nowX -= 1/MeterToScrCoordScaling
		}
	}
	return nowX;
}

Racetrack.prototype.sortCharacter = function()
{
	var list = [];
	for(var i = 0; i < _chrSprList.length; i++){
		this.removeChild(_chrSprList[i]);
		list.push(_chrSprList[i]);
	}
	if(_angle == 'front'){
		list.sort(function(x, y){
			return (x.vy - y.vy);
		});
	} else if(_angle == 'leftCorner'){
		for(var i = 0; i < list.length; i++){
			list[i].sort_weight = Math.abs(list[i].vx / list[i].vy);
		}
		var sign;
		if(_clockwise){
			sign = -1;
		} else {
			sign = 1;
		}
		list.sort(function(x, y){
			return (x.sort_weight - y.sort_weight) * sign * (x.vx >= _camera.vx ? 1 : -1);
		});
	} else if(_angle == 'rightCorner'){
		for(var i = 0; i < list.length; i++){
			list[i].sort_weight = Math.abs(list[i].vx / list[i].vy);
		}
		var sign;
		if(_clockwise){
			sign = 1;
		} else {
			sign = -1;
		}
		list.sort(function(x, y){
			return (x.sort_weight - y.sort_weight) * sign * (x.vx >= _camera.vx ? 1 : -1);
		});
	} else if(_angle == 'overthere'){
		list.sort(function(x, y){
			return -(x.vy - y.vy);
		});
	}
	for(var i = 0; i < list.length; i++){
		this.addChild(list[i]);
	}
	for(var i = 0; i < _chrSprList.length; i++){
		var spr = _chrSprList[i]._obstacleSpr;
		if(spr != null && spr._kind != Obstacle_Hard){
			//表示優先度を上げるため追加し直す。
			this.removeChild(spr);
			this.addChild(spr);
		}
	}
	this.removeChild(_debugSprite);
	this.addChild(_debugSprite);
};

Racetrack.prototype.getBaseSprite = function()
{
	return this.parent.parent._baseSprite;
};

//-----------------------------------------------------------------------------
// BG
//
// This Sprite is for track display.

function TrackSprite() {
	this.initialize.apply(this, arguments);
}

TrackSprite.prototype = Object.create(Sprite.prototype);
TrackSprite.prototype.constructor = TrackSprite;

TrackSprite.prototype.initialize = function (bitmap, vy, speed) {
	Sprite.prototype.initialize.call(this, bitmap);

	this._located = false;
	this._bitmap = bitmap;

	this.vx = 0;
	this.vy = vy;
	this.y = this.vy;
	this.speed = speed;
};

TrackSprite.prototype.update = function()
{
	if(this.width == 0){
		return;
	}
	if(!this._located){
		this._located = true;

		this.bitmapWidth = this.width;
		this.bitmapHeight = this.height;
		if(_angle == 'overthere' && _obstacleList == null){
			_raceTrack.createObstacle(3);
		}
		//スクロールしても破たんしないよう、必要な枚数分を敷き詰める。
		var extras = Math.ceil((Graphics.width * 2) / this.bitmapWidth) - 1;
		for(var i = extras - 1; i >= 0; i--){
			var sprite = new Sprite(this._bitmap);
			sprite.vx = this.bitmapWidth * (i + 1) - 1;
			sprite.vy = 0;
			sprite.x = sprite.vx;
			sprite.y = sprite.vy;
			sprite.scale.x = (this.bitmapWidth+4) / this.bitmapWidth;
			this.addChild(sprite);
			this['bg' + (i + 2)] = sprite;
		}
		this._bitmap = null;
	}
	var x;
	if(_angle == 'front'){
		var xy = _raceTrack.getFrontCoordinates(_camera.vx + _phaseScrollVx, _camera.vy);
		var offset = (-xy.x + this.vx) * this.speed;
		if(offset <= -this.bitmapWidth){
			x = offset + this.bitmapWidth * Math.floor((-offset) / this.bitmapWidth);
		} else if(offset > 0){
			x = offset - this.bitmapWidth * Math.ceil(offset / this.bitmapWidth);
		} else {
			x = offset;
		}
		x -= _raceTrack.x;
	} else if(_angle == 'overthere'){
		var xy = _raceTrack.getOverthereCoordinates(_camera.vx + _phaseScrollVx, _camera.vy);
		var offset = (-xy.x + this.vx) * this.speed;
		if(offset <= -this.bitmapWidth){
			x = offset + this.bitmapWidth * Math.floor((-offset) / this.bitmapWidth);
		} else if(offset > 0){
			x = offset - this.bitmapWidth * Math.ceil(offset / this.bitmapWidth);
		} else {
			x = offset;
		}
		x -= _raceTrack.x;
	}
	this.x = x;
}

//-----------------------------------------------------------------------------
// Corner BG
//
// This Sprite is for corner display.

function CornerSprite() {
	this.initialize.apply(this, arguments);
}

CornerSprite.prototype = Object.create(Sprite.prototype);
CornerSprite.prototype.constructor = CornerSprite;

CornerSprite.prototype.initialize = function (bitmap, speed)
{
	Sprite.prototype.initialize.call(this, null);
	this._bitmap = bitmap;

	this._located = false;

	this.vx = 0;
	this.vy = 0;
	this.speed = speed;
};

var CornerRadiusMid = 861;
CornerSprite.prototype.update = function()
{
	if(this._bitmap != null && this._bitmap.width == 0){
		return;
	}
	if(!this._located){
		this._located = true;

		this.bitmapWidth = this._bitmap.width;
		this.bitmapHeight = this._bitmap.height;

		var sprite = new Sprite(this._bitmap);
		sprite.x = 0;
		sprite.y = 0;
		sprite.scale.x = (this.bitmapWidth+1)  / this.bitmapWidth;
		sprite.scale.y = (this.bitmapHeight+1) / this.bitmapHeight;
		sprite.anchor.x = this.bitmapWidth  / (this.bitmapWidth+1);
		sprite.anchor.y = this.bitmapHeight / (this.bitmapHeight+1);
		sprite.rotation = 0;
		this.addChild(sprite);
		sprite = new Sprite(this._bitmap);
		sprite.x = 0;
		sprite.y = 0;
		sprite.scale.x = (this.bitmapWidth+1)  / this.bitmapWidth;
		sprite.scale.y = (this.bitmapHeight+1) / this.bitmapHeight;
		sprite.anchor.x = this.bitmapWidth  / (this.bitmapWidth+1);
		sprite.anchor.y = this.bitmapHeight / (this.bitmapHeight+1);
		sprite.rotation = Math.PI / 2;
		this.addChild(sprite);
		sprite = new Sprite(this._bitmap);
		sprite.x = 0;
		sprite.y = 0;
		sprite.scale.x = (this.bitmapWidth+1)  / this.bitmapWidth;
		sprite.scale.y = (this.bitmapHeight+1) / this.bitmapHeight;
		sprite.anchor.x = this.bitmapWidth  / (this.bitmapWidth+1);
		sprite.anchor.y = this.bitmapHeight / (this.bitmapHeight+1);
		sprite.rotation = Math.PI;
		this.addChild(sprite);
		sprite = new Sprite(this._bitmap);
		sprite.x = 0;
		sprite.y = 0;
		sprite.scale.x = (this.bitmapWidth+1)  / this.bitmapWidth;
		sprite.scale.y = (this.bitmapHeight+1) / this.bitmapHeight;
		sprite.anchor.x = this.bitmapWidth  / (this.bitmapWidth+1);
		sprite.anchor.y = this.bitmapHeight / (this.bitmapHeight+1);
		sprite.rotation = Math.PI * 3 / 2;
		this.addChild(sprite);

		this._bitmap = null;
	}

	var xy = _raceTrack.getCornerCoordinates((_camera.vx + _phaseScrollVx) * this.speed, 0, 0, true);
	this.rotation = xy.aa;
	this.x = xy.x;
	this.y = xy.y;
};

//-----------------------------------------------------------------------------
function GoalSprite() {
	this.initialize.apply(this, arguments);
}

GoalSprite.prototype = Object.create(Sprite.prototype);
GoalSprite.prototype.constructor = GoalSprite;

GoalSprite.prototype.initialize = function (bitmap) {
	Sprite.prototype.initialize.call(this, bitmap);
	this._located = false;
};

GoalSprite.prototype.update = function(){
	if(this._located || this.width == 0){
		return;
	}
	this._located = true;

	//画像の中心がX座標になるようセンタリング
	this.x += -this.width / 2;
}

//-----------------------------------------------------------------------------
function CharacterSprite() {
	this.initialize.apply(this, arguments);
}

CharacterSprite.prototype = Object.create(Sprite.prototype);
CharacterSprite.prototype.constructor = CharacterSprite;

CharacterSprite.prototype.initialize = function(bitmap, id)
{
	Sprite.prototype.initialize.call(this, bitmap);

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.id = id;
	this.energy = _startX;	//定常速度を維持するエネルギー
	this.extra_energy = 0;	//定常速度を超える／下げるエネルギー。このエネルギー分だけ、加速・減速する。
	this.outlet_size = 1*0.5/2;	//加減速の上限。大きくするとピーキーになる。
	if(this.id > 0){
		this.outlet_size = (1.0 + Math.random() * 0.2 - 0.1)*0.5/2;	//20%の出力幅を付けてみる。
	}
	this._located = false;
	this.scaling = 1;
	this.patterns = 1;
	this.pattern_counter = 0;
	this.pattern_cycle = 12;
	this.pattern_index = 0;
	this.changeTextureFrame = true;
	this.lane_move = 0;
	this._jumping = false;
	this._jumpOffset = 0;
	this._obstacleIndex = 0;
	this._downRate = 0;
	this._downCountdown = 0;
	//IP複数装備対応
	this._child = [];
	if(this.id == 1){
		for(var i=0; i<3; i++){
			if(_equipIp[i]){
				var sprite = new Sprite();
				sprite.anchor.x = 0.5;
				sprite.anchor.y = 0.5;
				this.addChild(sprite);
				this._child[i] = sprite;
				this.ip_pattern_index = 0;
			}
		}
	}
	this._obstacleSpr = null;
	this.changeTextureFrame = true;
	this.pattern_index = 1;
	this.ip_pattern_index = 1;
	//残像acceleEff;
	this._accEff = false;
	this._accEffCnt = 0;
	this._accEffSpr = [];
	this._accEffSprCnt = [];
	this._accEffSprVX = [];
	this._accEffSprVY = [];
	if(this.id == 1){
		for(var i=0; i<4; i++){
			var spr = new Sprite();
			spr.anchor.x = 0.5;
			spr.anchor.y = 0.5;
			spr.setBlendColor([0, 0, 255, 255]);
			spr.opacity = 128;
			spr.visible = false;
			this.addChild(spr);
			this._accEffSpr[i] = spr;
		}
	}
	//リタイア
	this._retireCnt = 0;
	//
};
//加速エフェクト発動
CharacterSprite.prototype.setAccEff = function()
{
	this._accEff = true;
	this._accEffCnt = 220;
}

function getLaneVy(vy)
{
	vy = Math.floor((vy + _angleLaneWidth / 2) / _angleLaneWidth) * _angleLaneWidth;
	return vy;
}

function getLaneIndex(vy)
{
	return Math.floor((vy + _angleLaneWidth / 2) / _angleLaneWidth);
}

function getLaneBit(vy)
{
	var index = Math.floor(vy / _angleLaneWidth);
	var bit = (1 << index);
	if(vy > index * _angleLaneWidth){
		bit |= (1 << (index + 1));
	}
	return bit;
}

function getLaneCharaCount(lane_index, vx)
{
	var count = 0;
	for(var i = 0; i < _chrSprList.length; i++){
		if(!_chrSprList[i].visible) continue;		//消えてるなら却下
		if(_chrSprList[i].vx >= vx) continue;		//後ろにいるなら却下
		if(getLaneIndex(_chrSprList[i].vy) != lane_index) continue;
		count++;
	}
	return count;
}

CharacterSprite.prototype.update = function()
{
	if(this.bitmap.width == 0){
		return;
	}
	if(!this._located){
		this._located = true;

		this.frameWidth = Math.floor(this.bitmap.width / this.patterns);
		this.frameHeight = this.bitmap.height;
	}
	if(_helpPause){
		//ヘルプポーズ中
	} else if(_phase == 'racing' || _phase == 'goal' || _phase == 'end' || _phase == 'last_spurt' || _competeAdjust){
		//「はやさ」調整計算式
		var base_speed = _speedList[this.id - 1] * 23 + 6983;	//最低速度=はやさx0.0023+0.6983：20～120⇒0.7443～0.9743
		var speed = (base_speed - 7443) / 2 + 10000;			//基準速度=(最低速度-0.7443)/2+1.0：1.0を基準に最低速度が0.7443を超える分に応じて増加
		base_speed /= 10000;
		speed /= 10000;
		//
		var last_lane_move = this.lane_move;
		var is_obstacle = false;	//前方に障害物があるか
		var scan_distance = HorseWidth;
		var lvy = this.vy;
		if(_angle == 'overthere'){
			if(this._obstacleIndex < _obstacleList.length && this.vx < _obstacleList[this._obstacleIndex].vx){
				this._obstacleIndex++;
			}
			if(this._obstacleIndex < _obstacleList.length){
				var obstacle = _obstacleList[this._obstacleIndex];
				var cx = this.vx - scan_distance;
				var hit = false;
				if(_clockwise){
					if(cx <= obstacle.vx - obstacle.lm
							&& cx > obstacle.vx - obstacle.vw + obstacle.rm){
								hit = true;
							}
				} else {
					if(cx >= obstacle.vx + obstacle.lm
							&& cx < obstacle.vx + obstacle.vw - obstacle.rm){
								hit = true;
							}
				}
				if(hit && !this._jumping){
					this.setJump(true);
					this._jumpVx = this.vx;
					this._jumpOffset = 0;
					this._jumpObstacleIndex = this._obstacleIndex;
					this._jumpFailed = true;
					var smart = _smartList[this.id - 1];   //障害物と「かしこさ」の兼ね合いで失敗するかを決める。
					var xy = _raceTrack.getOverthereCoordinates(this.vx, 0);
					var hx = xy.x + this.frameWidth / 2;
					xy = _raceTrack.getOverthereCoordinates(_camera.vx, 0);
					var sdx = Math.abs(hx - xy.x);
					var isVisible = (sdx < Graphics.width / 2 + 64);
					var rate = Math.random() * 100;
					switch(obstacle.kind){
						case Obstacle_Easy:
							this._jumpFailed = rate > 60 + smart * 0.36;	//かしこさ：40～112～ ⇒ 成功率74%～100%～
							if(this.id == 1 && _skillEffect.obstacle_easy_avoid_rate_add !=  0) this._jumpFailed = false;	//スキルにより成功確定
							break;
						case Obstacle_Normal:
							this._jumpFailed = rate > 50 + smart * 0.29;	//かしこさ：40～173～ ⇒ 成功率62%～100%～
							if(this.id == 1 && _skillEffect.obstacle_normal_avoid_rate_add !=  0) this._jumpFailed = false;	//スキルにより成功確定
							break;
						case Obstacle_Hard:
							this._jumpFailed = rate > 40 + smart * 0.26;	//かしこさ：40～232～ ⇒ 成功率50%～100%～
							if(this.id == 1 && _skillEffect.obstacle_hard_avoid_rate_add !=  0) this._jumpFailed = false;	//スキルにより成功確定
							break;
					}
					if(this._jumpFailed){
						this._jumpWidth = obstacle.vw * 0.25 + (this.vx - obstacle.vx);// + HorseWidth;
						this._jumpHeight = ObstacleHeightList[obstacle.kind] / 2;
						if(isVisible){
							switch(obstacle.kind){
								case Obstacle_Easy:
									// SE: 13
									AudioManager.playSe({"name":"Wind1","volume":90,"pitch":90,"pan":0});
									break;
								case Obstacle_Normal:
									// SE: 14
									AudioManager.playSe({"name":"Wind1","volume":90,"pitch":130,"pan":0});
									break;
								case Obstacle_Hard:
									// SE: 15
									AudioManager.playSe({"name":"Dive","volume":90,"pitch":140,"pan":0});
									AudioManager.playSe({"name":"Liquid","volume":90,"pitch":140,"pan":0});
									break;
							}
						}
					} else {
						this._jumpWidth = obstacle.vw + (this.vx - obstacle.vx);// + HorseWidth;
						this._jumpHeight = ObstacleHeightList[obstacle.kind];
						if(isVisible){
							// SE: 12
							AudioManager.playSe({"name":"Jump1","volume":65,"pitch":90,"pan":0});
							AudioManager.playSe({"name":"Horse","volume":90,"pitch":100,"pan":0});
						}
					}
					//障害物失敗グラフィック
					var bitmap = null;
					switch(obstacle.kind){
						case Obstacle_Easy:
							bitmap = _raceTrack.obstacle_effect_easy_bm;
							break;
						case Obstacle_Normal:
							bitmap = _raceTrack.obstacle_effect_normal_bm;
							break;
						case Obstacle_Hard:
							bitmap = _raceTrack.obstacle_effect_hard_bm;
							break;
					}
					var spr = new ObstacleEffectSprite(bitmap);
					spr.x = this.x;
					spr.y = this.y;
					spr.scale.x = this.scale.x;
					spr.scale.y = this.scale.y;
					spr.anchor.x = this.anchor.x;
					spr.anchor.y = this.anchor.y;
					spr.visible = false;
					spr._kind = obstacle.kind;
					this._obstacleSpr = spr;
					_raceTrack.addChild(spr);
				}
			}
		}
		var my_lane_index = getLaneIndex(this.vy);
		if(this._jumping){
			var x = (this._jumpVx - this.vx) / this._jumpWidth;
			var spr = this._obstacleSpr;
			var obstacle = _obstacleList[this._jumpObstacleIndex];
			if(x >= 1){
				this.setJump(false);
				this._jumpOffset = 0;
				if(this._jumpFailed){
					if(!spr.visible){
						spr.visible = true;
						spr.x = this.x;
						spr.y = this.y;
						spr.startAnim();
					}
					this.speed = this.speed * 0.1;
					this.extra_energy = 0;
					this._downRate = _obstacleInfo[obstacle.kind][1];
					this._downCountdown = 60*2;	 //とりあえず2秒間
				} else {
					if(this.speed < 0.9) this.speed = 0.9;	//ジャンプ時は、最低0.9は速度を出す（あまりゆっくりジャンプすると浮いてるようで変なので）
				}
			} else {
				this._jumpOffset = (0.5 * 0.5 - (x - 0.5) * (x - 0.5)) * this._jumpHeight;
				if(!this._jumpFailed){
					if(this.speed < 0.9) this.speed = 0.9;	//ジャンプ時は、最低0.9は速度を出す（あまりゆっくりジャンプすると浮いてるようで変なので）
				}
			}
		} else if(_staminaList[this.id - 1] == 0){
			//スタミナ0ならレーン移動しない。
		} else if(this.lane_move != 0){
			this.vy += this.lane_move;
			if(Math.abs(getLaneVy(this.vy) - this.vy) < 0.001){
				this.lane_move = 0;
			}
		} else if(this.id == 1 && my_lane_index < _angleLaneCount - 1){
			//自馬のレーン移動は指定されたものだけ。(外枠スタート直後を除く)
			switch(_moveDirection){
				case MoveDirection_InCourse:
					this.lane_move = -0.25;
					this.vy += this.lane_move;
					_moveDirection = MoveDirection_None;
					break;
				case MoveDirection_OutCourse:
					this.lane_move = 0.25;
					this.vy += this.lane_move;
					_moveDirection = MoveDirection_None;
					break;
			}
		} else {
			//他馬のレーン移動
			var move_inner_if_able = false;
			//前が詰まっているか
			var my_bit = getLaneBit(this.vy);
			var vacant = true;
			for(var i = 0; i < _chrSprList.length; i++){
				if(_chrSprList[i].id == this.id) continue;
				if(!_chrSprList[i].visible) continue;		//消えてるなら却下
				var bit = getLaneBit(_chrSprList[i].vy);
				if(!(bit & my_bit)){
					continue;
				}
				if(_chrSprList[i].vx + HorseWidth * 1.2 > this.vx
				&& _chrSprList[i].vx < this.vx)
				{
					vacant = false;
					break;
				}
			}
			if(!vacant){
				var inner_vacant = (my_lane_index > 0);
				var outer_vacant = (my_lane_index < _angleLaneCount - 1);
				//前が詰まっていたら、内か外に移動。
				for(var i = 0; i < _chrSprList.length; i++){
					if(_chrSprList[i].id == this.id) continue;
					if(!_chrSprList[i].visible) continue;		//消えてるなら却下
					var bit = getLaneBit(_chrSprList[i].vy);
					if(inner_vacant){
						if((bit & (0 | (1 << (my_lane_index - 1))))){
							if(_chrSprList[i].vx + HorseWidth > this.vx
							&& _chrSprList[i].vx < this.vx + HorseWidth)
							{
								inner_vacant = false;
							}
						}
					}
					if(outer_vacant){
						if((bit & (0 | (1 << (my_lane_index + 1))))){
							if(_chrSprList[i].vx + HorseWidth > this.vx
							&& _chrSprList[i].vx < this.vx + HorseWidth)
							{
								outer_vacant = false;
							}
						}
					}
				}
				var current_lane_count = getLaneCharaCount(my_lane_index, this.vx);
				var inner_lane_count = _chrSprList.length;
				var outer_lane_count = _chrSprList.length;
				if(inner_vacant){
					inner_lane_count = getLaneCharaCount(my_lane_index - 1, this.vx);
					if(inner_lane_count > current_lane_count){
						inner_vacant = false;
					}
				}
				if(outer_vacant){
					outer_lane_count = getLaneCharaCount(my_lane_index + 1, this.vx);
					if(outer_lane_count > current_lane_count){
						outer_vacant = false;
					}
				}
				if(inner_vacant && outer_vacant){
					if(outer_vacant && inner_vacant){
						inner_vacant = false;
					}
				}
				if(inner_vacant){
					this.lane_move = -0.25;
					this.vy += this.lane_move;
				} else if(outer_vacant){
					this.lane_move = 0.25;
					this.vy += this.lane_move;
				}
			}
			if(this.lane_move == 0 && !_lastStraight){
				//最後の直線でないときは、前が詰まっていなくても、内が空いていれば内に移動
				//最後の直線でなく、コーナーのときは、前が詰まっていなくても、内が空いていれば内に移動
				if(_angle == 'leftCorner' || _angle == 'rightCorner'){
					move_inner_if_able = true;
				} else if(my_lane_index >= 4){
					move_inner_if_able = true;
				}
			}
			if(move_inner_if_able){
				var my_lane_index = getLaneIndex(this.vy);
				if(my_lane_index > 0){
					var my_bit = getLaneBit(this.vy) | (1 << (my_lane_index - 1));
					var vacant = true;
					for(var i = 0; i < _chrSprList.length; i++){
						if(_chrSprList[i].id == this.id) continue;
						if(!_chrSprList[i].visible) continue;		//消えてるなら却下
						var bit = getLaneBit(_chrSprList[i].vy);
						if(!(bit & my_bit)){
							continue;
						}
						if(_chrSprList[i].vx + HorseWidth > this.vx
						&& _chrSprList[i].vx < this.vx + HorseWidth)
						{
							vacant = false;
							break;
						}
					}
					if(vacant){
						this.lane_move = -0.25;
						this.vy += this.lane_move;
					}
				}
			}

		}
		if(this._jumping){
			//speedをキープ。
			speed = this.speed;
		} else if(this.extra_energy > 0){
			var amount = Math.min(this.outlet_size, this.extra_energy);
			this.extra_energy -= amount;
			speed += amount;
			if(this.last_spurt && this.extra_energy == 0){
				//疲労が出て減速させる。
				this.last_spurt = false;
				this.whip_spurt = false;
				this.extra_energy = -100 * 10/2;
			} else 
			if(this.whip_spurt && this.extra_energy == 0){
				//疲労が出て減速させる。
				this.whip_spurt = false;
				this.extra_energy = -15 * 10/2;
			}
			var lane_move_penalty_rate = 1;
			if(Math.abs(this.vy - lvy) > 0.1){
				lane_move_penalty_rate = (this.id==1)? 0.85:0.7;
			}
			speed *= lane_move_penalty_rate;
		} else if(this.extra_energy < 0){
			var amount = Math.min(this.outlet_size, -this.extra_energy);
			this.extra_energy += amount;
			speed -= amount;
		}
		if(speed < base_speed){
			speed = base_speed;
		}
		if(_staminaList[this.id - 1] == 0){
			speed = this.speed * 0.9;
		}
		if(_goalOrderList[this.id - 1] < 0){
			//ゴールもリタイアもしていない場合にスタミナを減らす。
			var stamina_rate = 1;
			if(this.id == 1 && _moveDirection == MoveDirection_Backward){
				stamina_rate = 0.8;
			}
			var i = this.id - 1;
			addStamina(i, -speed / 20 * stamina_rate);
			if(_staminaList[i] <= 0){							//ただ走っていてスタミナ切れリタイア
				_chrSprList[i]._retireCnt = 45;
				_positionMarkerSprList[i].visible = false;			//レーダーアイコン消去
			}
		}
		if(this.id == 1){
			updateGauge(0);
		}
		if(_angle == 'leftCorner' || _angle == 'rightCorner'){
			//コーナーのときは外側を遅くする。
			var y = this.vy / (40 * 9);
			speed = speed * (1 + (CornerRadiusIn / CornerRadiusOut - 1) * y);
		} else if(_phase != 'last_spurt'){
			//ラストスパート以外の直線では、外側を少し(仮設定で最大10%)遅くする。
			var y = this.vy / (40 * 9);
			speed = speed * (1 + (0.9 - 1) * y);
		}
		if(this._downCountdown > 0){
			this._downCountdown--;
			speed *= this._downRate;
		}
		if(this.id == 1 && _moveHorseForceMoveX != 0){
			//強制前後移動値の減衰
			var degree;
			if(_moveHorseForceMoveX > 0){
				degree = Math.min(1/MeterToScrCoordScaling, _moveHorseForceMoveX);
			} else if(_moveHorseForceMoveX < 0){
				degree = Math.max(-1/MeterToScrCoordScaling, _moveHorseForceMoveX);
				if(_moveHorseForceKeep > 0) {
					_moveHorseForceKeep--;
					degree = 0;
				}
			}
			_moveHorseForceMoveX -= degree;
			_chrSprList[this.id - 1].vx += degree;
		}
		this.speed = speed;
		this.checkAndUpdate(-speed * (this.id == 0 ? _skillEffect.racing_speed_rate : 1) / MeterToScrCoordScaling * 2);
		if(this.id > 0 && this.extra_energy == 0){
			var order_bonus_rate = (_competeOrder == 1) ? 2 : (_competeOrder >= 3) ? 0.5 : 1;
			this.extra_energy = (Math.random() * 10 - 5) * 10/2 * order_bonus_rate + _speedList[this.id - 1] / 5;
		}
	} else if(_phase == 'compete'){
		//
	} else if(_phase == 'move'){
		//
	}
	var xy;
	if(_angle == 'front'){
		xy = _raceTrack.getFrontCoordinates(this.vx, this.vy + 52);
		xy.a = (_clockwise ? CharaDirLeft : CharaDirRight);
	} else if(_angle == 'leftCorner'){
		xy = _raceTrack.getCornerCoordinates(this.vx, this.vy, _camera.vx, false);
	} else if(_angle == 'rightCorner'){
		xy = _raceTrack.getCornerCoordinates(this.vx, this.vy, _camera.vx, false);
	} else if(_angle == 'overthere'){
		xy = _raceTrack.getOverthereCoordinates(this.vx, this.vy + 320 + this._jumpOffset);
		xy.a = (_clockwise ? CharaDirRight : CharaDirLeft);
	}
	this.x = xy.x + this.frameWidth / 2;
	this.y = xy.y + this.frameHeight / 2;
	var img_index = getHorseImgIndex(this.id);
	var bm_list = null;
	if(_angle == 'leftCorner'){
		//角度に応じてキャラパターンを切り替え、さらに回転。
		var last_bitmap = this.bitmap;
		if(-xy.aa < -Math.PI / 32){
			this.rotation = -xy.aa + Math.PI / 4;
			if(_clockwise){
				this.bitmap = _raceTrack.chara_ul_bm_list[img_index];
				this.scale.x = this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_ul_bm_list;
			} else {
				this.bitmap = _raceTrack.chara_dl_bm_list[img_index];
				this.scale.x = -this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_dl_bm_list;
			}
		} else if(-xy.aa > Math.PI / 16){
			this.rotation = -xy.aa - Math.PI / 4;
			if(_clockwise){
				this.bitmap = _raceTrack.chara_ul_bm_list[img_index];
				this.scale.x = -this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_ul_bm_list;
			} else {
				this.bitmap = _raceTrack.chara_dl_bm_list[img_index];
				this.scale.x = this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_dl_bm_list;
			}
		} else {
			this.rotation = -xy.aa;
			if(_clockwise){
				this.bitmap = _raceTrack.chara_u_bm_list[img_index];
				bm_list = _raceTrack.chara_u_bm_list;
			} else {
				this.bitmap = _raceTrack.chara_d_bm_list[img_index];
				bm_list = _raceTrack.chara_d_bm_list;
			}
			this.scale.x = this.scaling;
			this.scale.y = this.scaling;
		}
		if(this.bitmap != last_bitmap){
			this.changeTextureFrame = true;
		}
	} else if(_angle == 'rightCorner'){
		//角度に応じてキャラパターンを切り替え、さらに回転。
		var last_bitmap = this.bitmap;
		if(-xy.aa < -Math.PI / 8){
			//上側
			this.rotation = -xy.aa + Math.PI / 4;
			if(_clockwise){
				this.bitmap = _raceTrack.chara_dl_bm_list[img_index];
				this.scale.x = -this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_dl_bm_list;
			} else {
				this.bitmap = _raceTrack.chara_ul_bm_list[img_index];
				this.scale.x = this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_ul_bm_list;
			}
		} else if(-xy.aa > Math.PI / 16){
			//下側
			this.rotation = -xy.aa - Math.PI / 4;
			if(_clockwise){
				this.bitmap = _raceTrack.chara_dl_bm_list[img_index];
				this.scale.x = this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_dl_bm_list;
			} else {
				this.bitmap = _raceTrack.chara_ul_bm_list[img_index];
				this.scale.x = -this.scaling;
				this.scale.y = this.scaling;
				bm_list = _raceTrack.chara_ul_bm_list;
			}
		} else {
			//中央
			this.rotation = -xy.aa;
			if(_clockwise){
				this.bitmap = _raceTrack.chara_d_bm_list[img_index];
				bm_list = _raceTrack.chara_d_bm_list;
			} else {
				this.bitmap = _raceTrack.chara_u_bm_list[img_index];
				bm_list = _raceTrack.chara_u_bm_list;
			}
			this.scale.x = this.scaling;
			this.scale.y = this.scaling;
		}
		if(this.bitmap != last_bitmap){
			this.changeTextureFrame = true;
		}
	} else if(xy.a == CharaDirRight || xy.a == CharaDirUpRight || xy.a == CharaDirDownRight){
		this.rotation = -(xy.a - CharaDirRight) * 2 * Math.PI / 8;
		this.scale.x = -this.scaling;
		this.scale.y = this.scaling;
	} else {
		this.rotation = -(xy.a - CharaDirLeft) * 2 * Math.PI / 8;
		this.scale.x = this.scaling;
		this.scale.y = this.scaling;
	}
	//IP複数装備対応
	if(this.id == 1){
		if(bm_list != null){
			for(var i=0; i<3; i++) {
				if(_equipIp[i]) this._child[i].bitmap = bm_list[bm_list.length - 3 + i];
			}
		}
	}
	if(this.patterns > 1 && !_helpPause){
		if(_phase != 'init'){
			var pattern_index = 0;
			if(this._jumping){
				var img_index = getHorseImgIndex(this.id);
				//指定色に合わせる。
				pattern_index = (_characterColorList[img_index] - 1) % 4;
			} else if(_staminaList[this.id - 1] == 0){
				pattern_index = 1;
			} else {
				pattern_index = Math.floor(this.pattern_counter / this.pattern_cycle) % this.patterns;
			}
			if(pattern_index != this.pattern_index){
				this.changeTextureFrame = true;
				this.pattern_index = pattern_index;
			}
			//IP複数装備対応
			if(this.id == 1){
				for(var i=0; i<3; i++){
					if(_equipIp[i]){
						var ip_pattern_index = 0;
						if(this._jumping){
							ip_pattern_index = 100;
						} else {
							ip_pattern_index = pattern_index;
						}
						if(ip_pattern_index != this.ip_pattern_index){
							this.changeTextureFrame = true;
							this.ip_pattern_index = ip_pattern_index;
						}
					}
				}
			}
		}
	}
	if(this.changeTextureFrame){
		this.changeTextureFrame = false;
		this.setFrame(this.frameWidth * this.pattern_index, 0, this.frameWidth, this.texture.height);
		//IP複数装備対応
		if(this.id == 1){
			for(var i=0; i<3; i++) {
				var j = this.ip_pattern_index;
				if(j == 100) j = i;
				if(_equipIp[i]) this._child[i].setFrame(this.frameWidth * j, 0, this.frameWidth, this.texture.height);
			}
		}
	}
	//体力低下赤明滅
	if(_staminaList[this.id-1] > 0){
		if(_staminaList[this.id-1] < 100) {
			var blinkSpeed = (_staminaList[this.id-1] < 40)? 16:40; 
			if(_counter % blinkSpeed == 0           ) this.setBlendColor([255,  64,  64, 224]);
			if(_counter % blinkSpeed == blinkSpeed/2) this.setBlendColor([  0,   0,   0,   0]);

			//IP複数装備対応
			if(this.id == 1){
				for(var i=0; i<3; i++) {
					if(_equipIp[i]) {
						if(_counter % blinkSpeed == 0           ) this._child[i].setBlendColor([255,  64,  64, 224]);
						if(_counter % blinkSpeed == blinkSpeed/2) this._child[i].setBlendColor([  0,   0,   0,   0]);
					}
				}
			}
		}
	}
	//リタイア
	if(this._retireCnt > 0){
		this._retireCnt--;
		if(this._retireCnt > 0){	//半透明で消えていく。
			this.opacity = 255 * this._retireCnt / 45;
			if(this.opacity > 255) this.opacity = 255;
		} else {
			this.visible = false;	//消える。
			if(this.id == 1) {		//プレイヤーの場合、カーソルも消す。
				_myMarkerSpr.visible = false;
			}
		}
	}
	//加速エフェクト
	if(this.id == 1) {						//プレイヤー馬のみ
		if(this._accEff){						//加速エフェクト起動
			//４体の残像
			for(var i=0; i<4; i++){
				if(this._accEffSprCnt[i] > 0){
					this._accEffSprCnt[i]--;		//出現待機状態カウントダウン
					if(this._accEffSprCnt[i] == 0) {
						this._accEffSpr[i].visible = true;
					}
				}
				if(this._accEffSpr[i].visible){		//残像出現状態
					var spr = this._accEffSpr[i];		//本体移動に合わせて、取り残されるように相対座標を設定
					spr.x = (this._accEffSprVX[i] - this.vx);
					spr.y = (this._accEffSprVY[i] - this.vy);
				}
			}
			//一定時間遅れ毎に残像（準備）
			var diff = 20;
			if(this._accEffCnt > diff*4){
				if(this._accEffCnt % diff == 0){			//diff単位で残像準備
					var i = Math.floor(this._accEffCnt / diff % 4);
					this._accEffSprCnt[i] = diff;
					this._accEffSprVX[i] = this.vx;
					this._accEffSprVY[i] = this.vy;
					var spr = this._accEffSpr[i];				//この瞬間の本体を写し取る
					spr.bitmap = this.bitmap;
					spr.scale.x = this.scale.x;
					spr.scale.y = this.scale.y;
					spr.setFrame(this.frameWidth * this.pattern_index, 0, this.frameWidth, this.texture.height);
					spr.visible = false;						//あとで出現するので、とりあえず消えておく。
				}
			//加速エフェクト最後消えていく
			} else if(this._accEffCnt > 0){
				if(this._accEffCnt % diff == 0){			//diff単位ｘ４残像分の最後の一巡
					var i = Math.floor(this._accEffCnt / diff % 4);
					this._accEffSpr[i].visible = false;			//一体づつ消えていく
				}
			//加速エフェクト終了
			} else {
				this._accEff = false;
			}
			this._accEffCnt--;
		}
	}
	//
	this.pattern_counter++;
	var goaled = false;
	if(this.vx <= 0){
		//ゴールしている
		goaled = true;
	}
	if(this._obstacleSpr != null){
		this._obstacleSpr.update();
		if(this._obstacleSpr.opacity == 0){
			_raceTrack.removeChild(this._obstacleSpr);
			this._obstacleSpr = null;
		}
	}
	return goaled;
}

CharacterSprite.prototype.setBitmapInfo = function (bitmap, scaling, patterns, cycle, bm_list)
{
	this.bitmap = bitmap;
	this._located = false;

	this.frameWidth = 0;
	this.frameHeight = 0;
	this.scaling = scaling;
	this.patterns = patterns;
	this.pattern_cycle = cycle;
	this.changeTextureFrame = true;
	//IP複数装備対応
	if(this.id == 1){
		for(var i=0; i<3; i++){
			if(_equipIp[i]) this._child[i].bitmap = bm_list[bm_list.length - 3 + i];
		}
	}
};
//実際の走行(Ｘ移動)。当たり判定も。
CharacterSprite.prototype.checkAndUpdate = function(dx)
{
	if(this.id == 1){
		if(_moveHorseForceMoveX != 0){
			this.vx += dx;
			return;
		}
	}
	//重なりがあれば間隔を保つよう調整する。馬同士の「押し当り」判定。
	var my_bit = getLaneBit(this.vy);
	for(var i = 0; i < _chrSprList.length; i++){
		if(_chrSprList[i].id == this.id) continue;
		if(!_chrSprList[i].visible) continue;		//消えてるなら却下
		var bit = getLaneBit(_chrSprList[i].vy);
		if((bit & my_bit)){
			if(this.vx + dx < _chrSprList[i].vx + HorseWidth && _chrSprList[i].vx < (this.vx + dx) + HorseWidth)
			{
				if(this.vx + dx < _chrSprList[i].vx){
					dx += (_chrSprList[i].vx - (this.vx + dx + HorseWidth)) / 2;
					//dx += -0.1;
				} else {
					dx += ((_chrSprList[i].vx + HorseWidth) - (this.vx + dx)) / 2;
					//dx += 0.1;
				}
			}
		}
	}
	this.vx += dx;
};

CharacterSprite.prototype.setJump = function(jump)
{
	if(this._jumping == jump){
		return;
	}
	this._jumping = jump;
	if(_angle == 'overthere'){
		var img_index = getHorseImgIndex(this.id);
		if(this._jumping){
			//指定色に合わせる。
			this.bitmap = _raceTrack.chara_jump_bm_list[Math.floor( (_characterColorList[img_index]-1) / 4)];
			//IP複数装備対応
			if(this.id == 1){
				for(var i=0; i<3; i++){
					if(_equipIp[i]) this._child[i].bitmap = _raceTrack.chara_jump_bm_list[2];
				}
			}
		} else {
			this.bitmap = _raceTrack.chara_l_bm_list[img_index];
			//IP複数装備対応
			if(this.id == 1){
				for(var i=0; i<3; i++){
					if(_equipIp[i]) this._child[i].bitmap = _raceTrack.chara_l_bm_list[_raceTrack.chara_l_bm_list.length - 3 + i];
				}
			}
		}
		this.changeTextureFrame = true;
	}
};

//-----------------------------------------------------------------------------
// WhipIconSprite	鞭アイコン
function WhipIconSprite() {
	this.initialize.apply(this, arguments);
}

WhipIconSprite.prototype = Object.create(Sprite.prototype);
WhipIconSprite.prototype.constructor = WhipIconSprite;

WhipIconSprite.prototype.initialize = function(whip_icon_bm_list, consumeStamina)
{
	Sprite.prototype.initialize.call(this, whip_icon_bm_list[1]);
	this._ready = true;
	this._active = false;
	this._countdown = 50;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._whipIconBmList = whip_icon_bm_list;

	this._consumeStamina = consumeStamina;

	//消費スタミナ表示
	this._consumeStaminaWin = new Window_Base(-100, 0, 200, 100);
	this._consumeStaminaWin.opacity = 0;
	this._consumeStaminaWin.contents.fontSize = 10;
	this._consumeStaminaWin.drawText("消費スタミナ", 0 - this._consumeStaminaWin.standardPadding() - 8, 0 + 8, 200, 'center');
	this._consumeStaminaWin.contents.fontSize = 20;
	this._consumeStaminaWin.drawText("-" + this._consumeStamina, 0 - this._consumeStaminaWin.standardPadding() + 16, 0 + 5 + 18, 120, 'right');
	this.addChild(this._consumeStaminaWin);

}

WhipIconSprite.prototype.setActive = function()
{
	this._active = true;
	this._ready = false;
	this._bx = this.x;
}

WhipIconSprite.prototype.update = function()
{
	if(this._active){
		this._countdown--;
		if(this._countdown > 0){
			var now = 25 - this._countdown % 25;	//２回演出する（ムチで２回叩くイメージ）
			if(now <= 15) {
				this.scale.x = 0.7;						//小さくなってブルブル。
				this.scale.y = 0.7;
				this.opacity = 255;
				var offx = [ -1, 2,-2, 1, 0 ];
				this.x = this._bx + offx[(now-1)%5] * 2;
			} else {
				now -= 15;								//スッと元のサイズに。
				var scl = now / 10 * 0.3 + 0.7;
				this.scale.x = scl;
				this.scale.y = scl;
				this.opacity = 128;
			}
		} else {
			this.scale.x = 1.0;						//元に戻して非アクティブ画像に切り替え
			this.scale.y = 1.0;
			this.opacity = 255;
			this.bitmap = this._whipIconBmList[0];
			this._active = false;

			//消費スタミナも半透明化
			this._consumeStaminaWin.contents.clear();
			this._consumeStaminaWin.changePaintOpacity(false);
			this._consumeStaminaWin.drawText("使用済み", 0 - this._consumeStaminaWin.standardPadding(), 0 + 8, 200, 'center');
		}
	}
}
//-----------------------------------------------------------------------------
// StaminaGauge
function StaminaGauge() {
	this.initialize.apply(this, arguments);
}

StaminaGauge.prototype = Object.create(Sprite.prototype);
StaminaGauge.prototype.constructor = StaminaGauge;

StaminaGauge.prototype.initialize = function(wnd, x, y)
{
	Sprite.prototype.initialize.call(this, null);
	var img_path = "img/racebattle/overlay/";
	var bm, sprite;
	bm = ImageManager.loadBitmap(img_path, "bidding_gauge_table");
	sprite = new Sprite(bm);
	sprite.x = x;
	sprite.y = y + 10;
	this.addChild(sprite);
	bm = ImageManager.loadBitmap(img_path, "bidding_gauge");
	this._gauge = new Sprite(bm);
	this._gauge.x = x;
	this._gauge.y = y + 10;
	this.addChild(this._gauge);
	this._contents = new Bitmap(64, 32);
	this.wnd = wnd;
	sprite = new Sprite();
	sprite.bitmap = this._contents;
	sprite.x = x + 54;
	sprite.y = y;
	this.addChild(sprite);
	//
	this._nowGauge = 100;
	this._tagGauge = 100;
	this._maxGauge = 100;
	this._movGauge = 0;
	//
	this._numSpr = sprite;
	this._numX = sprite.x;
	this._numY = sprite.y;
	this._dmgEff = 0;
	//
	this._oneSet = true;
	//
	this.coltext = 'rgba(255,255,47,1.0)';
	this._recvEff = 0;
	//
	wnd.addChild(this);
};

StaminaGauge.prototype.initGauge = function(gauge, maxGauge)
{
	this._nowGauge = gauge;
	this._tagGauge = gauge;
	this._maxGauge = maxGauge;
	this._movGauge = 0;
	this._dmgEff = 0;
	this._recvEff = 0;
	this._oneSet = true;
};
StaminaGauge.prototype.setGauge = function(gauge, maxGauge)
{
	this._tagGauge = gauge;
	this._maxGauge = maxGauge;
	this._movGauge = (this._tagGauge - this._nowGauge) / 90;
	if(Math.abs(this._movGauge) < 0.15) this._movGauge = (this._movGauge >= 0)? 0.15:-0.15;
};

StaminaGauge.prototype.remove = function()
{
	this.wnd.removeChild(this);
};

//ダメージリアクション
StaminaGauge.prototype.setDamage = function()
{
	this._dmgEff = 30;
};
//ダメージリアクション
StaminaGauge.prototype.setRecover = function()
{
	//this._recvEff = 150;
};
//アップデート追加
StaminaGauge.prototype.update = function() {
	Sprite.prototype.update.call(this);

	//ゲージ値変化
	if(this._nowGauge != this._tagGauge || this._movGauge != 0 || this._oneSet){
		this._oneSet = false;
		var recov = false;
		//内部値変化
		this._nowGauge += this._movGauge;
		var dif = Math.abs(this._tagGauge - this._nowGauge);
		if(dif < 2 || dif < this._movGauge*1.5) {
			this._nowGauge = this._tagGauge;
			this._movGauge = 0;
		}
		if(this._movGauge > 0) recov = true;
		//ゲージ画像サイズ変更
		this._gauge.setFrame(0, 0, this._gauge.bitmap.width * this._nowGauge / this._maxGauge, this._gauge.height);
		//ゲージ値文字列変更＆色変化
		this._contents.clear();
		var cr=0, cg=0, cb=0;
		var rate = (this._nowGauge / this._maxGauge) * 2.0;
		if (rate >= 2.0) rate = 2.0;	//最大値越え対処（応援された時など）
		if (rate >= 1.0) {				//半分以上
			rate -= 1.0;
			cr = 255 - 105 * rate;
			cg = 255 -	25 * rate;
			cb = 47 * rate;
		} else {						//半分未満
			cr = 255;
			cg = 85 + 170 * rate;
			cb = 45 -  45 * rate;
		}
		if(recov){						//回復状態の白明滅
			var wcnt = _counter % 40;
			if(wcnt > 20) wcnt = 40 - wcnt;
			cr += (255 - cr) * wcnt / 20;
			cg += (255 - cg) * wcnt / 20;
			cb += (255 - cb) * wcnt / 20;
			this._contents.textColor = 'white';
		}
		this.coltext = 'rgba(' + parseInt(cr) + ',' + parseInt(cg) + ',' + parseInt(cb) + ',1.0)';
		this._contents.textColor = this.coltext;				//文字色をゲージ位置に合わせた色にする。
		this._contents.outlineColor = 'rgba(0, 0, 0, 0.75)';	//文字のアウトライン色の半透明度を下げて強調する。
		this._contents.drawText(Math.ceil(this._nowGauge), 0, 0, 64, 32, 'right');
	}
	//ダメージ時の文字振動
	if(this._dmgEff > 0){
		this._dmgEff--;
		var dmgOff = [ -1, 2,-2, 1, 0 ];
		this._numSpr.x = this._numX + dmgOff[this._dmgEff % 5] * 2;
		this._numSpr.y = this._numY + dmgOff[this._dmgEff % 4];
	} else {
		this._numSpr.x = this._numX;
		this._numSpr.y = this._numY;
	}
}
//

//-----------------------------------------------------------------------------
// Window_CompetePhaseCommand

function Window_CompetePhaseCommand() {
	this.initialize.apply(this, arguments);
}

Window_CompetePhaseCommand.prototype = Object.create(Window_Command.prototype);
Window_CompetePhaseCommand.prototype.constructor = Window_CompetePhaseCommand;

Window_CompetePhaseCommand.prototype.initialize = function() {
	var y = Graphics.boxHeight - this.windowHeight();
	Window_Command.prototype.initialize.call(this, 0, y);
	this.openness = 0;
	this.deactivate();
};

Window_CompetePhaseCommand.prototype.windowWidth = function() {
	return 192;
};

Window_CompetePhaseCommand.prototype.numVisibleRows = function() {
	return 4;
};

Window_CompetePhaseCommand.prototype.makeCommandList = function() {
	if(!_skillEffect.compete_invisible){
		this.addCommand('競り合う',	 'compete');
	}
	this.addCommand('敬遠する', 'avoid');
};

Window_CompetePhaseCommand.prototype.setup = function() {
	this.clearCommandList();
	this.makeCommandList();
	this.refresh();
	this.select(0);
	this.activate();
	this.open();
};

//-----------------------------------------------------------------------------
// Window_RaceBattleLog
//

function Window_RaceBattleLog() {
	this.initialize.apply(this, arguments);
}

Window_RaceBattleLog.prototype = Object.create(Window_Base.prototype);
Window_RaceBattleLog.prototype.constructor = Window_RaceBattleLog;

Window_RaceBattleLog.prototype.initialize = function(x, y, width, height) {
	if(!width){
		width = this.windowWidth();
	}
	if(!height){
		height = this.windowHeight();
	}
	if(!x && x !== 0){
		x = Graphics.boxWidth - width;
	}
	if(!y){
		y = Graphics.boxHeight - height;
	}
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._lines = [];
	this._backBitmap = new Bitmap(this.width, this.height);
	this._spriteList = [];
	this._bitmapList = [];
	this._cursorLine = 0;
	this._cursorX = 0;
	this._scrollDots = 0;
	this._scrollUnit = 2;
	this._hMargin = 16;
	this._vMargin = 16;
	this._dispLineHeight = 32;
	this._dispLineCount = Math.ceil((this.height - this._vMargin * 2) / this._dispLineHeight);
	this._okCallback = null;
	for(var i = 0; i < this._dispLineCount + 1; i++){
		var bitmap = new Bitmap(this.width, this._dispLineHeight);
		this._bitmapList.push(bitmap);
		var sprite = new Sprite();
		sprite.bitmap = bitmap;
		sprite.x = this._hMargin;
		sprite.y = this._vMargin + this._dispLineHeight * i;
		sprite._frameOffset = 0;
		this.addChild(sprite);
		this._spriteList.push(sprite);
	}
	this.openness = 0;
};

Window_RaceBattleLog.prototype.windowWidth = function() {
	return Graphics.boxWidth - 192 - 216;
};

Window_RaceBattleLog.prototype.windowHeight = function() {
	return this.fittingHeight(this.numVisibleRows());
};

Window_RaceBattleLog.prototype.numVisibleRows = function() {
	return 4;
};

Window_RaceBattleLog.prototype.maxItems = function() {
	return $gameParty.battleMembers().length;
};

Window_RaceBattleLog.prototype.update = function() {
	Window_Base.prototype.update.call(this);

	if (Input.isTriggered('ok')
	|| (TouchInput.isTriggered() && this.isTouchedInsideFrame())){
		if(this._okCallback){
			SoundManager.playOk();
			this._okCallback();
		}
	}
	if(this._scrollDots > 0){
		this._scrollDots -= this._scrollUnit;
		for(var i = 0; i < this._dispLineCount + 1; i++){
			var sprite = this._spriteList[i];
			sprite.y -= this._scrollUnit;
			if(sprite.y < this._vMargin){
				sprite._frameOffset += this._vMargin - sprite.y;
				sprite.y = this._vMargin;
				var bitmap = this._bitmapList[i];
				if(sprite._frameOffset >= bitmap.height){
					sprite.visible = false;
				} else {
					sprite.setFrame(0, sprite._frameOffset, bitmap.width, bitmap.height - sprite._frameOffset);
				}
			}
		}
		return;
	}
	if(this._lines.length == 0){
		return;
	}
	var text = this._lines[0];
	if(this._cursorX >= text.length){
		this._lines.shift();
		if(this._cursorLine >= this._dispLineCount - 1){
			this._scrollDots = this._dispLineHeight;
			var sprite = this._spriteList[(this._cursorLine + 1) % (this._dispLineCount + 1)];
			sprite.y = this._vMargin + this._dispLineHeight * this._dispLineCount;
			var bitmap = this._bitmapList[(this._cursorLine + 1) % (this._dispLineCount + 1)];
			bitmap.clear();
			sprite.visible = true;
			sprite.setFrame(0, 0, bitmap.width, bitmap.height);
			sprite._frameOffset = 0;
		}
		this._cursorX = 0;
		this._cursorLine++;
		return;
	}
	//位置文字ずつ描画
	this._cursorX++;
	var bitmap = this._bitmapList[this._cursorLine	% (this._dispLineCount + 1)];
	bitmap.clear();
	bitmap.drawText(text.substr(0, this._cursorX), 0, 0, bitmap.width, bitmap.height, 'left');
};

Window_RaceBattleLog.prototype.drawItem = function(index) {
	//var actor = $gameParty.battleMembers()[index];
};

Window_RaceBattleLog.prototype.numLines = function() {
	return this._lines.length;
};

Window_RaceBattleLog.prototype.clear = function() {
	this._lines = [];
	this._scrollDots = 0;
	this._cursorX = 0;
	this._cursorLine = 0;
	for(var i = 0; i < this._dispLineCount + 1; i++){
		var sprite = this._spriteList[i];
		sprite.y = this._vMargin + this._dispLineHeight * i;
		sprite.visible = true;
		var bitmap = this._bitmapList[i];
		bitmap.clear();
		sprite.setFrame(0, 0, bitmap.width, bitmap.height);
	}
};

Window_RaceBattleLog.prototype.getLineBreakList = function(text) {
	var list = [];
	var width = 0;
	var head = 0;
	for(var i = 0; i < text.length; i++){
		if(text[i] == "\n"){
			list.push(text.substring(head, i));
			head = i + 1;
			width = 0;
			continue;
		}
		var c = text.charCodeAt(i);
		var w;
		if(c < 256 || (c >= 0xff61 && c <= 0xff9f)){
			w = 28 / 2;
		} else {
			w = 28;
		}
		if(width + w > this.width - this._hMargin * 2){
			list.push(text.substring(head, i));
			head = i;
			width = w;
		} else {
			width += w;
		}
	}
	if(head < text.length){
		list.push(text.substring(head));
	}
	return list;
};

Window_RaceBattleLog.prototype.addText = function(text) {
	this._lines = this._lines.concat(this.getLineBreakList(text));
};

Window_RaceBattleLog.prototype.setText = function(text, color, outlineColor, fsize) {
	this.clear();
	while(text.length > 0){
		var next = '';
		var index = text.indexOf("\n");
		if(index >= 0){
			next = text.substr(index + 1);
			text = text.substr(0, index);
		}
		var bitmap = this._bitmapList[this._cursorLine	% (this._dispLineCount + 1)];
		bitmap.textColor = color;
		bitmap.outlineColor = outlineColor;
		//行単位色変え対応
		if(text.charAt(0) == '#'){
			bitmap.textColor = text.substr(0,7);
			text = text.substr(7);
		}
		bitmap.clear();
		if(fsize > 0) bitmap.fontSize = fsize;
		bitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'left');
		this._cursorLine++;
		text = next;
	}
};

Window_RaceBattleLog.prototype.isAdding = function() {
	if(this._lines.length > 0){
		return true;
	}
	return false;
};


Window_RaceBattleLog.prototype.drawBackground = function() {
	var rect = this.backRect();
	var color = this.backColor();
	this._backBitmap.clear();
	this._backBitmap.paintOpacity = this.backPaintOpacity();
	this._backBitmap.fillRect(rect.x, rect.y, rect.width, rect.height, color);
	this._backBitmap.paintOpacity = 255;
};

Window_RaceBattleLog.prototype.backRect = function() {
	return {
		x: 0,
		y: this.padding,
		width: this.width,
		height: this.numLines() * this.lineHeight()
	};
};

Window_RaceBattleLog.prototype.backColor = function() {
	return '#000000';
};

Window_RaceBattleLog.prototype.backPaintOpacity = function() {
	return 64;
};

Window_RaceBattleLog.prototype.deselect = function() {
};

Window_RaceBattleLog.prototype.updateArrows = function() {
};

Window_RaceBattleLog.prototype.setOkCallback = function(callback)
{
	this._okCallback = callback;
};

Window_RaceBattleLog.prototype.isTouchedInsideFrame = function() {
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//-----------------------------------------------------------------------------
// Window_CompetePhaseTarget

function Window_CompetePhaseTarget() {
	this.initialize.apply(this, arguments);
}

Window_CompetePhaseTarget.prototype = Object.create(Window_Command.prototype);
Window_CompetePhaseTarget.prototype.constructor = Window_CompetePhaseTarget;

Window_CompetePhaseTarget.prototype.initialize = function() {
	this._count = 0;
	var width = this.windowWidth();
	var height = this.windowHeight();
	var x = 192;
	var y = Graphics.boxHeight - height;
	Window_Command.prototype.initialize.call(this, x, y);
	this.openness = 0;
	this.deactivate();
};

Window_CompetePhaseTarget.prototype.windowWidth = function() {
	return Graphics.boxWidth - 192 - 216;
};

Window_CompetePhaseTarget.prototype.numVisibleRows = function() {
	return 4;
};

Window_CompetePhaseTarget.prototype.makeCommandList = function() {
	for(var i = 0; i < _competeList.length - 1; i++){
		if(_staminaList[_competeList[i + 1]] == 0){
			continue;
		}
		this.addCommand(_characterNameList[_competeList[i + 1]], '' + (i + 0));
	}
};

Window_CompetePhaseTarget.prototype.setup = function() {
	this.clearCommandList();
	this.makeCommandList();
	this.refresh();
	this.select(0);
	this.activate();
	this.open();
};

Window_CompetePhaseTarget.prototype.update = function() {
	Window_Command.prototype.update.call(this);
	var index = this.index();
	if(index >= 0){
		selectCometeTarget(index + 1, [255, 255, 255, 128]);
	} else {
		if(_competeLastTarget >= 0){
			resetCompeteTargetSelect();
		}
	}
};

//-----------------------------------------------------------------------------
// CompetePhase
function CompetePhase() {
	this.initialize.apply(this, arguments);
}

CompetePhase.prototype = Object.create(Sprite.prototype);
CompetePhase.prototype.constructor = CompetePhase;

CompetePhase.prototype.initialize = function()
{
	Sprite.prototype.initialize.call(this, null);

	_competeInfo.counter++;
	if(('win_' + _competeInfo.counter) in _competeInfo){
		//この競り合いフェイズでの競り合いに必ず勝てる。
	}
	_restTurnCount = 2;

	createCompeteList();

	var order = [];
	var min_x = _chrSprList[0].vx;
	var max_x = _chrSprList[0].vx;
	var min_y = _chrSprList[0].vy;
	var max_y = _chrSprList[0].vy;
	for(var i = 0; i < _competeList.length; i++){
		order[i] = i;
		if(_chrSprList[i].vx < min_x){
			min_x = _chrSprList[i].vx;
		}
		if(_chrSprList[i].vx > max_x){
			max_x = _chrSprList[i].vx;
		}
		if(_chrSprList[i].vy < min_y){
			min_y = _chrSprList[i].vy;
		}
		if(_chrSprList[i].vy > max_y){
			max_y = _chrSprList[i].vy;
		}
	}
	order.sort(function(x, y){
		if(_chrSprList[x].vy != _chrSprList[y].vy){
			return _chrSprList[x].vy - _chrSprList[y].vy;
		}
		if(_chrSprList[x].vx != _chrSprList[y].vx){
			return _chrSprList[x].vx - _chrSprList[y].vx;
		}
		return x - y;
	});
	//残スタミナ順ウィンドウ
	_zanWinSprite = new Sprite(_raceTrack.zanstamina_bm);
	_zanWinSprite.x = ZanWindowX;
	_zanWinSprite.y = ZanWindowY;
	_sceneBattle.addWindow(_zanWinSprite);

	_competeHorseSprList = [];
	_competeHorseOffset = [];
	_competeHorseKnockBack = [];
	//馬顔アイコン
	for(var i = 0; i < _competeList.length; i++){
		//指定色に合わせる
		var spr = new HorseSprite(_raceTrack.face_bm);
		var img_index = _characterColorList[getHorseImgIndex(_competeList[i] + 1)] - 1;
		spr.setFrame(144 * (img_index % 4) + 1, 144 * Math.floor(img_index / 4) + 1, 144-2, 144-2);
		var w = max_x - min_x;
		spr.x =-1000;
		spr.y = CompeteHorseMinY + (_chrSprList[i].vy - min_y) / Math.max(1, max_y - min_y) * (CompeteHorseMaxY - CompeteHorseMinY);
		spr.scale.x = 96/144;
		spr.scale.y = 96/144;
		_competeHorseSprList.push(spr);
		_competeHorseOffset.push({x: spr.x, y: spr.y, dx: 0, dy: 0, energy:0, extra_energy:((Math.random() * 10 - 5) * 10/2)*0, outlet_size: _chrSprList[i].outlet_size});
		_competeHorseKnockBack.push(0);
	}
	for(var i = 0; i < _competeList.length; i++){	//優先を考慮して改めてaddChild
		//ウィンドウレイヤーにadd
		_sceneBattle.addWindow(_competeHorseSprList[order[i]]);
	}

	_lastPartyCommandWindow = _sceneBattle._partyCommandWindow;
	_sceneBattle._partyCommandWindow = new Window_CompetePhaseCommand();
	_sceneBattle._partyCommandWindow.setHandler('compete',	_sceneBattle._commandCompete.bind(_sceneBattle));
	_sceneBattle._partyCommandWindow.setHandler('avoid', _sceneBattle._commandEscape.bind(_sceneBattle));
	_sceneBattle._partyCommandWindow.deselect();
	_sceneBattle.addWindow(_sceneBattle._partyCommandWindow);

	_sceneBattle._partyCommandWindow.setup();
	_competeDamagedPrevent = 1;

	var others = Math.min(_competeList.length-1, 3);
	_sceneBattle._targetWindow = new Window_CompetePhaseTarget();
	for(var i = 0; i < others; i++){
		_sceneBattle._targetWindow.setHandler('' + (i + 0),	 _sceneBattle._commandCompeteTarget.bind(_sceneBattle, i + 1));
	}
	_sceneBattle._targetWindow.setHandler('cancel', _sceneBattle._commandCompeteCancel.bind(_sceneBattle));
	_sceneBattle._targetWindow.openness = 0;
	_sceneBattle._targetWindow.deselect();
	_sceneBattle.addWindow(_sceneBattle._targetWindow);

	_myStaminaWindow.move(MyStaminaWindowX, MyStaminaWindowY, MyStaminaWindowWidth, MyStaminaWindowHeight);
	_othersStaminaGaugeList = [];
	var gauge = null;
	_othersStaminaWindow = new Window_Base(OthersStaminaWindowX, OthersStaminaWindowY, 216, 120);
	_othersStaminaWindow.makeFontSmaller();

	for(var i = 0; i < others; i++){
		gauge = new StaminaGauge(_othersStaminaWindow, 82, 18 + 30 * i);
		gauge.initGauge(_staminaList[_competeList[i+1]], _maxStaminaList[_competeList[i+1]]);
		_othersStaminaGaugeList.push(gauge);
		//ゲージより優先上の馬名表示
		createNameText(_othersStaminaWindow, _characterNameList[_competeList[i+1]], 16, 30*i+12);
	}
	_othersStaminaWindow.openness = 0;
	_othersStaminaWindow.deactivate();
	_sceneBattle.addWindow(_othersStaminaWindow);

	_restTurnBitmap = new Bitmap(192, 32);
	_restTurnSprite = new Sprite();
	_restTurnSprite.bitmap = _restTurnBitmap;
	_restTurnSprite.x = 0;
	_restTurnSprite.y = 408;

	//ウィンドウレイヤーにadd
	_sceneBattle.addWindow(_restTurnSprite);
	setRestTurn(_restTurnCount);

	updateGauge(0, false, true);

	for(var i = 0; i < _competeList.length - 1; i++){
		updateGauge(i + 1);
	}
	for(var i = 0; i < _chrSprList.length; i++){
		if(_competeList.indexOf(i) < 0){
			_chrSprList[i].visible = false;
		}
		_chrSprVX[i] = _chrSprList[i].vx;	//ノックバック結果算出の為、競り合い開始Ｘを覚えておく。
	}

	_othersStaminaWindow.open();
	_sceneBattle._partyCommandWindow.show();
}

function createCompeteList()
{
	{
		//前方と後方の内、前方からは少なくとも１頭(いない場合もあり)。あとは距離が近いものから選んでいく。
		var list = [];
		for(var i = 0; i < _chrSprList.length; i++){
			if(_staminaList[i] == 0){
				continue;
			}
			list.push(i);
		}
		list.sort(function(x, y){
			var sx = _chrSprList[x];
			var sy = _chrSprList[y];
			if(sx.vx != sy.vx){
				return sx.vx - sy.vx;
			}
			if(sx.vy != sy.vy){
				return sx.vy - sy.vy;
			}
			return x - y;
		});
		//自馬の場所
		var min, max;
		for(var i = 0; i < list.length; i++){
			if(list[i] == 0){
				min = i;
				max = i;
				break;
			}
		}
		//前方から選ぶ
		if(min > 0){
			min--;
		}
		while(max - min + 1 < 4){
			if(min == 0 && max == list.length - 1){
				break;
			}
			if(min == 0){
				max++;
			} else if(max == list.length - 1){
				min--;
			} else {
				var sx = _chrSprList[list[min - 1]];
				var sy = _chrSprList[list[max + 1]];
				var d = Math.abs(sx.vx - _chrSprList[0].vx) - Math.abs(sy.vx - _chrSprList[0].vx);
				if(d < 0){
					min--;
				} else if(d > 0){
					max++;
				} else {
					d = Math.abs(sx.vy - _chrSprList[0].vy) - Math.abs(sy.vy - _chrSprList[0].vy);
					if(d <= 0){
						min--;
					} else {
						max++;
					}
				}
			}
		}
		_competeList = list.slice(min, max + 1);
		_competeList.sort();
	}
}

function createMyStaminaWindow()
{
	_myStaminaWindow = new Window_Base(MyStaminaWindowX, MyStaminaWindowY - MyStaminaWindowHeight, MyStaminaWindowWidth, MyStaminaWindowHeight);
	_myStaminaWindow.makeFontSmaller();

	_myStaminaWindow.openness = 0;
	_myStaminaWindow.deactivate();
	_myStaminaGauge = new StaminaGauge(_myStaminaWindow, 82, 18);
	_myStaminaGauge.initGauge(_staminaList[0], _maxStaminaList[0]);
	updateGauge(0, false, true);

	//ゲージより優先上の馬名表示
	createNameText(_myStaminaWindow, _characterNameList[0], 16, 12);

	_sceneBattle.addWindow(_myStaminaWindow);
}
function createNameText(baseWin, nameText, x, y)
{
	var spr = new Sprite();
	spr.bitmap = new Bitmap(160, 32);	//実際の文字サイズに必要十分なサイズを確保
	spr.bitmap.fontSize = 24;
	spr.x = x;
	spr.y = y;
	baseWin.addChild(spr);
	spr.bitmap.drawText(nameText, 0, 0, 120, 32, 'left');	//ここのサイズ内に収まるように文字列が縮小される。
	spr.update();						//これがないと更新されない。
}

CompetePhase.prototype.finalize = function()
{
	//競り合い不参加馬も、全体の平均分下がる（「勝ち抜け」を防ぐ）
	var competeOff = [];
	for(var i = 0; i < _chrSprList.length; i++){
		competeOff[i] = false;
		if(_competeList.indexOf(i) < 0) competeOff[i] = true;	//リストにないので競り合い不参加だった。
	}
	var backX = 0;
	var backCnt = 0;
	for(var i=0; i<_chrSprList.length; i++){
		if(!competeOff[i]) {
			backX += _chrSprList[i].vx - _chrSprVX[i];
			backCnt++;
		}
	}
	backX /= backCnt;

	for(var i=0; i<_chrSprList.length; i++){
		if(competeOff[i]) {						//競り合い不参加馬は平均値分下げる。
			_chrSprList[i].vx += backX;
		}
	}

	_sceneBattle._windowLayer.removeChild(_restTurnSprite);
	_restTurnSprite = null;
	_restTurnBitmap = null;

	_sceneBattle._windowLayer.removeChild(_zanWinSprite);
	_zanWinSprite = null;
	for(var i = 0; i < _competeHorseSprList.length; i++){
		_sceneBattle._windowLayer.removeChild(_competeHorseSprList[i]);
	}
	_competeHorseSprList = null;

	_sceneBattle.removeWindow(_sceneBattle._partyCommandWindow);
	_sceneBattle._partyCommandWindow = _lastPartyCommandWindow;
	if(_sceneBattle._partyCommandWindow){
		_sceneBattle._partyCommandWindow.show();
	}

	_sceneBattle.removeWindow(_othersStaminaWindow);
	_othersStaminaWindow = null;
}

//-----------------------------------------------------------------------------
// CompeteAnim
function CompeteAnim(){
	this.initialize.apply(this, arguments);
};
CompeteAnim.prototype = Object.create(Sprite.prototype);
CompeteAnim.prototype.initialize = function(index1, index2, gauge_x, gauge_y, damageTimingCallback, finishCallback)
{
	Sprite.prototype.initialize.call(this, null);

	this.index1 = index1;
	this.index2 = index2;
	this.gauge_x = gauge_x;
	this.gauge_y = gauge_y;
	this.damageTimingCallback = damageTimingCallback;
	this.finishCallback = finishCallback;
	this.counter = 0;

	var horse_spr1 = _competeHorseSprList[this.index1];
	var horse_spr2 = _competeHorseSprList[this.index2];
	this._lastInfo1 = {x: horse_spr1.x, y: horse_spr1.y};
	this._lastInfo2 = {x: horse_spr2.x, y: horse_spr2.y};
	this.move_frames = 30;
	this.compete_x1 = 272+24;
	this.compete_x2 = 416-24;
	this.compete_y = 120;
	this.cycle_frames = 60 / 4;
	this.vib_width1 = 8;
	this.vib_width2 = 8;
	this.anim = null;
	this.effectList = [];
};

CompeteAnim.prototype.update = function()
{
	var horse_spr1 = _competeHorseSprList[this.index1];
	var horse_spr2 = _competeHorseSprList[this.index2];
	var progress = this.counter;
	var guard = (this.index1 == 0 && _competeDamagedPrevent < 1);
	this.counter++;
	if(progress <= this.move_frames){
		//移動
		horse_spr1.x = this.compete_x1 + (this._lastInfo1.x - this.compete_x1) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		horse_spr1.y = this.compete_y + (this._lastInfo1.y - this.compete_y) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		horse_spr2.x = this.compete_x2 + (this._lastInfo2.x - this.compete_x2) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		horse_spr2.y = this.compete_y + (this._lastInfo2.y - this.compete_y) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		
		return;
	}
	progress -= this.move_frames + 1;
	var cycle = 4;		//テンポＵＰ
	if(progress < cycle * this.cycle_frames){
		//ぶるぶる
		if((progress % this.cycle_frames) == 0){
			this.vib_width1 = Math.random() * 4 + 2;
			this.vib_width2 = Math.random() * 4 + 2;
		}
		var i = progress % this.cycle_frames;
		horse_spr1.x = this.compete_x1 + Math.sin(i * Math.PI / this.cycle_frames) * this.vib_width1;
		horse_spr2.x = this.compete_x2 + Math.sin(i * Math.PI / this.cycle_frames) * this.vib_width2;
		if(progress == 15){
			//エフェクト追加
			this.x = this.compete_x2;
			this.y = this.compete_y + 96 / 2;
			var sprite = new Sprite_Animation();

			//エフェクト変更
			if(guard){	//敬遠
				sprite.setup(this, $dataAnimations[2], false, 0);
			} else {	//通常
				sprite.setup(this, $dataAnimations[5], false, 0);
			}
			_sceneBattle.addChild(sprite);
			this.effectList.push(sprite);

			//ゲージ側にもエフェクト追加
			var dmy = new Sprite();		//ゲージ位置用のダミー空スプライト（これにエフェクトを付随させる）
			dmy.x = this.gauge_x + 56;
			dmy.y = this.gauge_y;
			var sprite = new Sprite_Animation();
			sprite.setup(dmy, $dataAnimations[2], false, 0);
			_sceneBattle.addChild(sprite);
			this.effectList.push(sprite);

			if(!guard) {								//赤くする（敬遠時はなし）
				horse_spr1.setBlendColor([255,32,32,192]);
			}
			//実際のダメージ処理
			this.damageTimingCallback();
		}
		//ダメージ側をHITの瞬間ブルブルさせる（敬遠時はなし）
		if((progress >= 15 && progress < 45) && !guard){
			var offx = [ -1, 2,-2, 1, 0 ];
			horse_spr1.x += offx[(progress-15)%5] * 4;
		}
		if(progress == 32){								//赤点滅を戻す
			horse_spr1.setBlendColor([0,0,0,0]);
		}
		
		//アニメ終了チェック
		for(var i = this.effectList.length - 1; i >= 0; i--){
			if(!this.effectList[i].isPlaying()){
				_sceneBattle.removeChild(this.effectList[i]);
				this.effectList.splice(i, 1);
			}
		}
		if(progress == cycle * this.cycle_frames - 1){
			//残っていたら強制削除
			for(var i = 0; i < this.effectList.length; i++){
				_sceneBattle.removeChild(this.effectList[i]);
			}
			this.effectList = [];
		}
		return;
	}
	progress -= cycle * this.cycle_frames;

	if(progress <= this.move_frames){
		//戻る
		horse_spr1.x = this._lastInfo1.x + (this.compete_x1 - this._lastInfo1.x) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		horse_spr1.y = this._lastInfo1.y + (this.compete_y - this._lastInfo1.y) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		horse_spr2.x = this._lastInfo2.x + (this.compete_x2 - this._lastInfo2.x) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		horse_spr2.y = this._lastInfo2.y + (this.compete_y - this._lastInfo2.y) * (this.move_frames - progress) * (this.move_frames - progress) / (this.move_frames * this.move_frames);
		return;
	}
	progress -= this.move_frames + 1;
	//終了
	if(progress == 0){
		this.finishCallback();
		this.parent.removeChild(this);	//自身を削除
		return;
	}
	progress -= 1;
};


//-----------------------------------------------------------------------------
// Window_MovePhaseCommand

function Window_MovePhaseCommand() {
	this.initialize.apply(this, arguments);
}

Window_MovePhaseCommand.prototype = Object.create(Window_Command.prototype);
Window_MovePhaseCommand.prototype.constructor = Window_MovePhaseCommand;

Window_MovePhaseCommand.prototype.initialize = function() {
	var y = Graphics.boxHeight - this.windowHeight();
	Window_Command.prototype.initialize.call(this, 0, y);
	this.openness = 0;
	this.deactivate();
};

Window_MovePhaseCommand.prototype.windowWidth = function() {
	return 192;
};

Window_MovePhaseCommand.prototype.numVisibleRows = function() {
	return 4;
};

Window_MovePhaseCommand.prototype.makeCommandList = function() {
	this.addCommand('移動',	 'move');
	var flag = (_skillList.length > 0 && _moveSelectedSkill < 0);	//スキルが有るなら選択可能
	if(flag && _skillList.length > 0) {
		flag = false;													//スキルは有るが全部０個なら選択不可
		for(var i=0; i<_skillList.length; i++){
			if(_skillList[i][1] > 0) flag = true;
		}
	}
	this.addCommand('スキル発動', 'skill_exec', flag);
};

Window_MovePhaseCommand.prototype.setup = function() {
	this.clearCommandList();
	this.makeCommandList();
	this.refresh();
	this.select(0);
	this.activate();
	this.open();
};

//-----------------------------------------------------------------------------
// Window_SkillTarget

function Window_SkillTarget() {
	this.initialize.apply(this, arguments);
}

Window_SkillTarget.prototype = Object.create(Window_Command.prototype);
Window_SkillTarget.prototype.constructor = Window_SkillTarget;

Window_SkillTarget.prototype.initialize = function() {
	var width = this.windowWidth();
	var height = this.windowHeight();
	var x = 192;
	var y = Graphics.boxHeight - height;
	Window_Command.prototype.initialize.call(this, x, y);
	this.openness = 0;
	this.deactivate();
};

Window_SkillTarget.prototype.windowWidth = function() {
	return Graphics.boxWidth - 192 - 216;
};

Window_SkillTarget.prototype.numVisibleRows = function() {
	return 4;
};

Window_SkillTarget.prototype.makeCommandList = function() {
	for(var i = 0; i < _skillList.length; i++){
		if(_skillList[i][1] > 0){
			this.addCommand(SkillInfoList[_skillList[i][0]][SkillInfo_Name], '' + i);
		}
	}
};

Window_SkillTarget.prototype.setup = function() {
	this.clearCommandList();
	this.makeCommandList();
	this.refresh();
	this.select(0);
	this.activate();
	this.open();
};

Window_SkillTarget.prototype.callUpdateHelp = function()
{
	if(_sceneBattle._skillHelp == null){
		return;
	}
	var help = '';
	var index = this.index();
	for(var i = 0; i < _skillList.length; i++){
		if(_skillList[i][1] > 0){
			if(index == 0){
				help = SkillInfoList[_skillList[i][0]][SkillInfo_Help];
				//残り使用可能回数
				help += "\n\n残り回数：";
				if(_skillList[i][1] >= 99){
					help += "無制限";
				} else {
					help += "あと" + _skillList[i][1] + "回";
				}
				break;
			}
			index--;
		}
	}
	_sceneBattle._skillHelp.setText(help, '#ffffff', 'rgba(0, 0, 0, 0.5)');
};

//-----------------------------------------------------------------------------
// MovePhase
function MovePhase() {
	this.initialize.apply(this, arguments);
}

MovePhase.prototype = Object.create(Sprite.prototype);
MovePhase.prototype.constructor = MovePhase;

MovePhase.prototype.initialize = function()
{
	Sprite.prototype.initialize.call(this, null);

	_lastPartyCommandWindow = _sceneBattle._partyCommandWindow;
	_sceneBattle._partyCommandWindow = new Window_MovePhaseCommand();
	_sceneBattle._partyCommandWindow.setHandler('move',	 _sceneBattle._commandMove.bind(_sceneBattle));
	_sceneBattle._partyCommandWindow.setHandler('skill_exec', _sceneBattle._commandSkillExec.bind(_sceneBattle));
	_sceneBattle._partyCommandWindow.deselect();
	_sceneBattle.addWindow(_sceneBattle._partyCommandWindow);

	_sceneBattle._partyCommandWindow.setup();

	_sceneBattle._targetWindow = new Window_MoveMenu(192, 444, 408, 180);
	_sceneBattle._targetWindow.setHandler('ok',	 _sceneBattle._commandMoveOk.bind(_sceneBattle));
	_sceneBattle._targetWindow.setHandler('cancel', _sceneBattle._commandMoveCancel.bind(_sceneBattle));
	_sceneBattle._targetWindow.openness = 0;
	_sceneBattle._targetWindow.deselect();
	_sceneBattle.addWindow(_sceneBattle._targetWindow);

	_lastSKillWindow = _sceneBattle._skillWindow;
	_sceneBattle._skillWindow = new Window_SkillTarget();
	for(var i = 0; i < _skillList.length; i++){
		if(_skillList[i][1] > 0){
			_sceneBattle._skillWindow.setHandler('' + i,  _sceneBattle._commandSkill.bind(_sceneBattle, i));
		}
	}
	_sceneBattle._skillWindow.setHandler('cancel',	_sceneBattle._commandSkillCancel.bind(_sceneBattle, i));
	_sceneBattle._skillWindow.openness = 0;
	_sceneBattle._skillWindow.deselect();
	_sceneBattle.addWindow(_sceneBattle._skillWindow);

	_sceneBattle._skillHelp = new Window_RaceBattleLog(SkillHelpX, SkillHelpY, SkillHelpWidth, SkillHelpHeight);
	_sceneBattle.addWindow(_sceneBattle._skillHelp);

	_moveDirection = MoveDirection_None;
	_moveSelectedSkill = -1;
	_myStaminaWindow.move(MyStaminaWindowX, MyStaminaWindowY, MyStaminaWindowWidth, MyStaminaWindowHeight);
	if(_competeList == null){
		createCompeteList();
	}

	_moveOrderWindow = new Window_Order();
	_moveOrderWindow.drawText('競り合い順位', 0, 0, 180, 'center');
	_moveOrderWindow.drawText('' + _competeOrder + '位', 0, 40, 180, 'center');
	_sceneBattle.addWindow(_moveOrderWindow);

	//次のコースの情報
	var minVx = Math.min(_chrMinVx, _chrSprList[0].vx);

	var nextPX = 0;
	for(var i = _phaseChange.length-1; i >= 0; i--){		//次にPhaseが切り替わる距離を求める
		if(minVx < _phaseChange[i].vx) {
			if(i < _phaseChange.length-1) nextPX = _phaseChange[i+1].vx;
			break;
		}
	}

	var angleList = [];
	for(var i = 0; i < _angleChange.length; i++){
		if(minVx <= _angleChange[i].vx){
			angleList.push(_angleChange[i].angle);
			i--;
			for( ; i >= 0; i--){
				if(nextPX < _angleChange[i].vx){
					angleList.push(_angleChange[i].angle);
				} else {
					break;
				}
			}
			break;
		}
	}
	if(angleList.length == 0) angleList.push('front');

	var nextInfo = 'コース情報';
	var beforeInfo = '';
	for(var i = 0; i < angleList.length; i++){
		var addInfo = '・コーナー';
		switch(angleList[i]){
		case 'front':
			addInfo = '・ホームストレッチ';
			break;
		case 'overthere':
			var rate = 0;
			for(var j = 0; j < _obstacleInfo.length; j++) rate += _obstacleInfo[j][0];
			if(rate > 0) {
				addInfo = '・バックストレッチ：障害有';
			} else {
				addInfo = '・バックストレッチ';
			}
			break;
		}
		if (addInfo != beforeInfo) nextInfo += '\n' + addInfo;
		beforeInfo = addInfo;
	}
	_sceneBattle._statusWindow.addText(nextInfo);

	updateGauge(0, false, true);

	_sceneBattle._partyCommandWindow.show();
}

MovePhase.prototype.finalize = function()
{
	_sceneBattle.removeWindow(_sceneBattle._partyCommandWindow);
	_sceneBattle._partyCommandWindow = _lastPartyCommandWindow;
	if(_sceneBattle._partyCommandWindow){
		_sceneBattle._partyCommandWindow.show();
	}

	_sceneBattle.removeWindow(_sceneBattle._skillWindow);
	_sceneBattle._skillWindow = _lastSKillWindow;

	_sceneBattle.removeWindow(_moveOrderWindow);
	_moveOrderWindow = null;

	_sceneBattle.removeWindow(_sceneBattle._skillHelp);
	_sceneBattle._skillHelp = null;
}

//-----------------------------------------------------------------------------
// LastSpurtPhase
function LastSpurtPhase() {
	this.initialize.apply(this, arguments);
}

LastSpurtPhase.prototype = Object.create(Sprite.prototype);
LastSpurtPhase.prototype.constructor = LastSpurtPhase;

LastSpurtPhase.prototype.initialize = function()
{
	Sprite.prototype.initialize.call(this, null);

	_whipIconSprList = [];
	for(var i = 0; i < WhipPosList.length; i++){
		//消費スタミナ量も渡す
		_whipIconSprList.push(new WhipIconSprite(_raceTrack.whip_icon_bm_list, Math.floor(_maxStaminaList[0]*0.20)));
		_whipIconSprList[i].x = WhipPosList[i];
		_whipIconSprList[i].y = 349;
		_raceTrack.getBaseSprite().addChild(_whipIconSprList[i]);
	}
	if(_whipIconSprList != null){
		if(true||_angle == 'overthere'){
			for(var i = 0; i < _whipIconSprList.length; i++){
				_whipIconSprList[i].visible = true;
			}
		} else {
			for(var i = 0; i < _whipIconSprList.length; i++){
				_whipIconSprList[i].visible = false;
			}
		}
	}
	updateGauge(0, false, true);

	lastSpurtBgm();		//ラストスパートＢＧＭ
}

LastSpurtPhase.prototype.finalize = function()
{
	//
}

//-----------------------------------------------------------------------------
// Window_MoveMenu
//

function Window_MoveMenu() {
	this.initialize.apply(this, arguments);
}

Window_MoveMenu.prototype = Object.create(Window_Selectable.prototype);
Window_MoveMenu.prototype.constructor = Window_MoveMenu;

Window_MoveMenu.prototype.initialize = function(x, y, width, height)
{
	this._indexSelectable = [true, true, true, true];
	if(_competeOrder > 3){
		//競り合い順位が3位、4位だと、インコースを選択できない。
		for(var i = 0; i < 4; i++){
			if(getMoveDirectionByIndex(i) == MoveDirection_InCourse){
				this._indexSelectable[i] = false;
			}
		}
	}
	var lane_index = getLaneIndex(_chrSprList[0].vy);
	if(lane_index == 0){
		//最内の場合にインコースを選択できなくする。
		for(var i = 0; i < 4; i++){
			if(getMoveDirectionByIndex(i) == MoveDirection_InCourse){
				this._indexSelectable[i] = false;
			}
		}
	}
	if(lane_index == _angleLaneCount - 1){
		//最外の場合にアウトコースを選択できなくする。
		for(var i = 0; i < 4; i++){
			if(getMoveDirectionByIndex(i) == MoveDirection_OutCourse){
				this._indexSelectable[i] = false;
			}
		}
	}
	this.lastOk = true;
	if(!width){
		width = this.windowWidth();
	}
	if(!height){
		height = this.windowHeight();
	}
	if(!x){
		x = Graphics.boxWidth - width;
	}
	if(!y){
		y = Graphics.boxHeight - height;
	}
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.openness = 0;
};

Window_MoveMenu.prototype.windowWidth = function() {
	return Graphics.boxWidth - 192 - 216;
};

Window_MoveMenu.prototype.windowHeight = function() {
	return Graphics.boxHeight;
};

Window_MoveMenu.prototype.numVisibleRows = function() {
	return 3;
};

Window_MoveMenu.prototype.maxCols = function() {
	return 3;
};

Window_MoveMenu.prototype.maxItems = function() {
	return 4;
};

Window_MoveMenu.prototype.itemWidth = function() {
	return 32;
};

Window_MoveMenu.prototype.itemHeight = function() {
	return 32;
};

Window_MoveMenu.prototype.maxRows = function() {
	return 3;
};

Window_MoveMenu.prototype.row = function() {
	var index = this.index();
	switch(index){
	case 0:
		return 0;
	case 1:
	case 2:
		return 1;
	default:
		return 2;
	}
};

Window_MoveMenu.prototype.topRow = function() {
	return 0;
};

Window_MoveMenu.prototype.maxTopRow = function() {
	return 0;
};

Window_MoveMenu.prototype.setTopRow = function(row) {
};

Window_MoveMenu.prototype.maxPageRows = function() {
	return 3;
};

Window_MoveMenu.prototype.maxPageItems = function() {
	return 4;
};

Window_MoveMenu.prototype.isHorizontal = function() {
	return false;
};

Window_MoveMenu.prototype.bottomRow = function() {
	return 2;
};

Window_MoveMenu.prototype.setBottomRow = function(row) {
	//
};

Window_MoveMenu.prototype.topIndex = function() {
	return 0;
};

Window_MoveMenu.prototype.itemRect = function(index) {
	var rect = new Rectangle();

	if(this.isSelectable(index)){
		rect.width = 64;
		rect.height = 64;
	} else {
		rect.width = 0;
		rect.height = 0;
	}
	switch(index){
	case 0:
		rect.x = 154;
		rect.y = 0;
		break;
	case 1:
		rect.x = 0;
		rect.y = 47;
		break;
	case 2:
		rect.x = 310;
		rect.y = 47;
		break;
	case 3:
		rect.x = 154;
		rect.y = 82;
		break;
	}
	return rect;
};

Window_MoveMenu.prototype.isSelectable = function(index) {
	if(index < 0 || index >= this._indexSelectable.length){
		return false;
	}
	return this._indexSelectable[index];
};

Window_MoveMenu.prototype.cursorDown = function(wrap) {
	var index = this.index();
	if(index != 3){
		this.select(3);
	}
};

Window_MoveMenu.prototype.cursorUp = function(wrap) {
	var index = this.index();
	if(this.isSelectable(0)){
		if(index != 0){
			this.select(0);
		}
	} else {
		if(index == 3){
			this.select(1);
		}
	}
};

Window_MoveMenu.prototype.cursorRight = function(wrap) {
	var index = this.index();
	if(index != 2){
		this.select(2);
	}
};

Window_MoveMenu.prototype.cursorLeft = function(wrap) {
	var index = this.index();
	if(index != 1){
		this.select(1);
	}
};

Window_MoveMenu.prototype.cursorPagedown = function() {
	var index = this.index();
	if(index == 2){
		this.select(2);
	}
};

Window_MoveMenu.prototype.cursorPageup = function() {
	var index = this.index();
	if(this.isSelectable(0)){
		if(index != 0){
			this.select(0);
		}
	} else {
		if(index == 3){
			this.select(1);
		}
	}
};

Window_MoveMenu.prototype.scrollDown = function() {
	var index = this.index();
	if(index == 2){
		this.select(2);
	}
};

Window_MoveMenu.prototype.scrollUp = function() {
	var index = this.index();
	if(this.isSelectable(0)){
		if(index != 0){
			this.select(0);
		}
	} else {
		if(index == 3){
			this.select(1);
		}
	}
};

var WindowArrowInfo = [
	[  0,  0, 64, 64],		//↑
	[192,  0, 64, 64],		//←
	[128,  0, 64, 64],		//→
	[ 64,  0, 64, 64],		//↓
];

Window_MoveMenu.prototype.drawItem = function(index) {
	if(!this.isSelectable(index)){
		return;
	}
		
	var info = WindowArrowInfo[index];
	var rect = this.itemRect(index);
	this.contents.blt(_raceTrack.window_bm,
			info[0], info[1], info[2], info[3], 
			rect.x, rect.y, rect.width, rect.height);
};

Window_MoveMenu.prototype.processCursorMove = function() {
	if (this.isCursorMovable()) {
		var lastIndex = this.index();
		if (Input.isRepeated('down')) {
			this.cursorDown(Input.isTriggered('down'));
		}
		if (Input.isRepeated('up')) {
			this.cursorUp(Input.isTriggered('up'));
		}
		if (Input.isRepeated('right')) {
			this.cursorRight(Input.isTriggered('right'));
		}
		if (Input.isRepeated('left')) {
			this.cursorLeft(Input.isTriggered('left'));
		}
		if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
			this.cursorPagedown();
		}
		if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
			this.cursorPageup();
		}
		if (this.index() !== lastIndex) {
			SoundManager.playCursor();
		}
	}
};

Window_MoveMenu.prototype.isCursorVisible = function() {
	var index = this.index();
	return (index != -1);
};

Window_MoveMenu.prototype.ensureCursorVisible = function() {
};

Window_MoveMenu.prototype.isCurrentItemEnabled = function() {
	var index = this.index();
	return (index != -1);
};

Window_MoveMenu.prototype.isOkTriggered = function() {
	var ok = Input.isRepeated('ok');
	if(!this.lastOk && ok){
		var index = this.index();
		if(index < 0){
			if(this.isSelectable(0)){
				this.select(0);
			} else {
				this.select(1);
			}
			ok = false;
			this.updateInputData();
		}
	}
	this.lastOk = ok;
	return ok;
};

//-----------------------------------------------------------------------------
// Window_Order
//

function Window_Order() {
	this.initialize.apply(this, arguments);
}

Window_Order.prototype = Object.create(Window_Base.prototype);
Window_Order.prototype.constructor = Window_Order;

Window_Order.prototype.initialize = function()
{
	var x = 600;
	var y = 504;
	var width = 216;
	var height = 120;
	Window_Base.prototype.initialize.call(this, x, y, width, height);
};

//-----------------------------------------------------------------------------

function getIntermediateLiveComment()
{
	var limit2 = (_enemies > 1)? 1:2;	//２頭レースだとリストの半分から取得。
	if(isMyCharaInTopGroup()){
		return getFilledComment(IntermediateTopGroupCommentList[Math.floor(Math.random() * (IntermediateTopGroupCommentList.length/limit2))]);
	} else {
		return getFilledComment(IntermediateFollowingGroupCommentList[Math.floor(Math.random() * (IntermediateFollowingGroupCommentList.length/limit2))]);
	}
}
function getStartLiveComment()
{
	if(_startLiveCommentIndex > 0){
		return null;
	}
	_startLiveCommentIndex++;
	var index = Math.floor(Math.random() * StartLiveCommentList.length);
	return getFilledComment(StartLiveCommentList[index]);
}

function getLastSpurtLiveComment()
{
	if(_lastSpurtLiveCommentIndex == 0){
		_lastSpurtLiveCommentIndex++;
		_lastSpurtMyCharaInTopGroup = isMyCharaInTopGroup();
		if(_fenceKind != 'normal'){
			//イベント用
			return getFilledComment(LastSpurtStartCommentList[1]);
		}
		return getFilledComment(LastSpurtStartCommentList[Math.floor(Math.random() * LastSpurtStartCommentList.length)]);
	}
	if(_phase == 'goal'){
		if(_lastSpurtLiveCommentIndex < 0){
			return null;
		}
		_lastSpurtLiveCommentIndex = -1;
		if(_raceResult == 'win'){
			if(_fenceKind != 'normal'){
				//イベント用
				return getFilledComment(WinGoalCommentList[1]);
			} else {
				return getFilledComment(WinGoalCommentList[Math.floor(Math.random() * WinGoalCommentList.length)]);
			}
		} else {
			if(_fenceKind != 'normal'){
				//イベント用
				return getFilledComment(LoseGoalCommentList[1]);
			} else {
				return getFilledComment(LoseGoalCommentList[Math.floor(Math.random() * LoseGoalCommentList.length)]);
			}
		}
	}
	var segment = Math.floor(_camera.vx * 3 / _angleChange[0].vx);
	var inTopGroup = isMyCharaInTopGroup();
	if(inTopGroup == _lastSpurtMyCharaInTopGroup){
		return null;
	}
	_lastSpurtMyCharaInTopGroup = inTopGroup;
	if(segment >= 2){
		//区間C
		if(inTopGroup){
			return getFilledComment(LastSpurtSegmentC_TopGroupCommentList[Math.floor(Math.random() * LastSpurtSegmentC_TopGroupCommentList.length)]);
		} else {
			return getFilledComment(LastSpurtSegmentC_FollowingGroupCommentList[Math.floor(Math.random() * LastSpurtSegmentC_FollowingGroupCommentList.length)]);
		}
	} else if(segment >= 1){
		//区間B
		if(inTopGroup){
			return getFilledComment(LastSpurtSegmentB_TopGroupCommentList[Math.floor(Math.random() * LastSpurtSegmentB_TopGroupCommentList.length)]);
		} else {
			return getFilledComment(LastSpurtSegmentB_FollowingGroupCommentList[Math.floor(Math.random() * LastSpurtSegmentB_FollowingGroupCommentList.length)]);
		}
	} else {
		//区間A
		if(inTopGroup){
			return getFilledComment(LastSpurtSegmentA_TopGroupCommentList[Math.floor(Math.random() * LastSpurtSegmentA_TopGroupCommentList.length)]);
		} else {
			return getFilledComment(LastSpurtSegmentA_FollowingGroupCommentList[Math.floor(Math.random() * LastSpurtSegmentA_FollowingGroupCommentList.length)]);
		}
	}
}

function getFilledComment(comment)
{
	var list = _chrSprList.clone();
	list.sort(function(x, y){
		if(x.vx != y.vx){
			return (x.vx - y.vx);
		}
		return (x.id - y.id);
	});
	var ncomment = '';
	var a0 = '0'.charCodeAt(0);
	var a9 = '9'.charCodeAt(0);
	while(comment.length > 0){
		var index = comment.indexOf('%');
		if(index < 0){
			ncomment += comment;
			break;
		}
		ncomment += comment.substr(0, index);
		if(comment[index + 1] == 'd'){
			//%d   --> 出遅れの馬名に置き換える
			//最後尾の馬
			ncomment += _characterNameList[list[list.length - 1].id - 1];
			comment = comment.substr(index + 2);
		} else if(comment[index + 1] == 'm'){
			//%m   --> 自馬名に置き換える
			ncomment += _characterNameList[0];
			comment = comment.substr(index + 2);
		} else {
			//%no	--> n位の馬名に置き換える
			var index2 = index + 1;
			while(true){
				var a = comment.charCodeAt(index2);
				if(a >= a0 && a <= a9){
					index2++;
					continue;
				}
				break;
			}
			if(comment.substr(index2, 1) != 'o'){
				break;
			}
			var os = comment.substr(index + 1, index2 - index  - 1);
			var o = parseInt(os, 10);
			ncomment += _characterNameList[list[o - 1].id - 1];
			comment = comment.substr(index2 + 1);
		}
	}
	return ncomment;
}

function isMyCharaInTopGroup()
{
	var list = _chrSprList.clone();
	list.sort(function(x, y){
		return (x.vx - y.vx);
	});
	var lvx = list[0].vx;
	for(var i = 0; i < list.length; i++){
		if(list[i].vx - lvx > HorseWidth * 1.1){
			break;
		}
		if(list[i].id == 1){
			return true;
		}
	}
	return false;
}

//-----------------------------------------------------------------------------
// ObstacleEffectSprite	障害物
function ObstacleEffectSprite() {
	this.initialize.apply(this, arguments);
}

ObstacleEffectSprite.prototype = Object.create(Sprite.prototype);
ObstacleEffectSprite.prototype.constructor = ObstacleEffectSprite;

ObstacleEffectSprite.prototype.initialize = function(bitmap)
{
	Sprite.prototype.initialize.call(this, bitmap);
	this._animating = false;
	this._counter = 0;
	this._animCount = 60;
};

ObstacleEffectSprite.prototype.startAnim = function()
{
	this._animating = true;
};

ObstacleEffectSprite.prototype.update = function()
{
	if(this._animating){
		this._counter++;
		if(this._counter >= this._animCount){
			this.opacity = 0;
			this._animating = false;
			this.parent.removeChild(this);
			return;
		}
		this.scale.x = 1 + 0.5 * this._counter / this._animCount;
		this.scale.y = 1 + 0.5 * this._counter / this._animCount;
		if(this._counter >= this._animCount / 2){
			this.opacity = 255 - 255 * (this._counter - this._animCount / 2) / (this._animCount / 2);
		}
	}
};

//-----------------------------------------------------------------------------
// Cutin
function Cutin() {
	this.initialize.apply(this, arguments);
}

Cutin.prototype = Object.create(Sprite.prototype);
Cutin.prototype.constructor = Cutin;

//kind: 0 or 1
Cutin.prototype.initialize = function(ip, kind, balloonCallback, finishCallback)
{
	Sprite.prototype.initialize.call(this, null);

	this.x = 0;
	this.y = 0;
	var base_y = 145;
	this._tableSpr1 = new Sprite(_raceTrack.cutin_table_bm[ip]);
	this._tableSpr1.x = 0;
	this._tableSpr1.y = base_y;
	this.addChild(this._tableSpr1);
	this._tableSpr2 = new Sprite(_raceTrack.cutin_table_bm[ip]);
	this._tableSpr2.x = Graphics.width;
	this._tableSpr2.y = base_y;
	this.addChild(this._tableSpr2);
	this._tableSpr1.opacity = 0;
	this._tableSpr2.opacity = 0;

	this._balloonSpr = new Sprite(kind == 0 ? _raceTrack.cutin_balloon_a_bm[ip] : _raceTrack.cutin_balloon_b_bm[ip]);
	this._balloonSpr.x = this._balloonSpr.bitmap.width / 2;
	this._balloonSpr.y = base_y + _raceTrack.cutin_table_bm[ip].height / 2;
	this._balloonSpr.anchor.x = 0.5;
	this._balloonSpr.anchor.y = 0.5;
	this.addChild(this._balloonSpr);
	this._balloonSpr.opacity = 0;

	this._charaSpr = new Sprite(_raceTrack.cutin_bm[ip]);
	this._charaSpr.x = Graphics.width;
	this._charaSpr.y = base_y;
	this.addChild(this._charaSpr);

	this._balloonCallback = balloonCallback;
	this._finishCallback = finishCallback;

	this._counter = 0;
};

Cutin.prototype.update = function()
{
	//背景スクロール
	var speed = 2;
	var offset = -((this._counter * speed) % Graphics.width);
	this._tableSpr1.x = offset;
	this._tableSpr2.x = offset + Graphics.width;

	//フェード
	var counter = this._counter;
	var fadein_count = 45;
	if(counter < fadein_count){
		var progress = (counter - 0) / (fadein_count - 1);
		var opacity = 255 * progress;
		this._tableSpr1.opacity = opacity;
		this._tableSpr2.opacity = opacity;
	}
	//counter -= fadein_count;
	//カットイン
	var cutin_count = 60;
	if(counter >= 0 && counter < cutin_count){
		var progress = (counter - 0) / (cutin_count - 1);
		var offset = Graphics.width * (1 - progress);
		this._charaSpr.x = offset;
	}
	counter -= cutin_count;
	//拡大・縮小
	if(counter == 0){
		if(this._balloonCallback){
			this._balloonCallback();
		}
	}
	var cycle = 60;
	var repat_count = 3;
	if(counter >= 0 && counter < cycle * repat_count){
		if(counter == 0){
			this._balloonSpr.opacity = 255;
		}
		var radian = (counter % cycle) / cycle * Math.PI * 2;
		this._balloonSpr.scale.x = 
		this._balloonSpr.scale.y = 1 + 0.1 * Math.sin(radian);
		if(counter == cycle * repat_count - 1){
			this._balloonSpr.scale.x = this._balloonSpr.scale.y = 1;
		}
	}
	counter -= cycle * repat_count;
	var wait_count = 60;
	counter -= wait_count;
	//フェードアウト
	var fadeout_count = 60;
	if(counter >= 0 && counter < fadeout_count){
		var progress = (counter - 0) / (fadein_count - 1);
		var opacity = 255 * (1 - progress);
		this._tableSpr1.opacity = opacity;
		this._tableSpr2.opacity = opacity;
		this._charaSpr.opacity = opacity;
		this._charaSpr.x -= speed * 2;
		this._balloonSpr.opacity = opacity;
		this._balloonSpr.x -= speed * 2;
	}
	counter -= fadeout_count;
	if(counter == 0){
		if(this._finishCallback){
			this._finishCallback();
		}
	}

	this._counter++;
};

//-----------------------------------------------------------------------------
//馬顔アイコン
function HorseSprite() {
	this.initialize.apply(this, arguments);
}
HorseSprite.prototype = Object.create(Sprite.prototype);
HorseSprite.prototype.constructor = HorseSprite;

HorseSprite.prototype.initialize = function(bitmap)
{
	Sprite.prototype.initialize.call(this, bitmap);
	this._blink = 0;
};
HorseSprite.prototype.update = function()
{
	Sprite.prototype.update.call(this, null);
	if(this._blink > 0){
		this._blink--;
		if(this._blink > 0){
			if(this._blink % 10 == 0) this.setBlendColor([255,255,255,128]);
			if(this._blink % 10 == 5) this.setBlendColor([  0,  0,  0,  0]);
		} else {
			this.setBlendColor([0,0,0,0]);
		}
	}
};
HorseSprite.prototype.setBlink = function()
{
	this._blink = 90;
};
//

initParameters();

})();

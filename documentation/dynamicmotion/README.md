# Introduction
It is a plug-in that freely controls the battle motion when executing the skill.

You can move the battler and perform motions at any time.
Furthermore, by linking with Dynamic Animation, you can freely insert animations.

We aimed for something with a lower threshold than existing motion plug-ins such as YEP_BattleEngineCore.

The following is an introductory video.

https://newrpg.up.seesaa.net/image/20200321_DynamicMotion.mp4

## Download

Download the following two files and throw them into '[Project]\js\plugins'.
Please turn on the function from the plug-in management of RPG Maker MV.
- [NRP_DynamicMotion.js](https://newrpg.up.seesaa.net/mv/NRP_DynamicMotion.js)
- [NRP_DynamicAnimation.js](https://newrpg.up.seesaa.net/mv/NRP_DynamicAnimation.js)

*) Please see the explanation page for the animation plug-in (NRP_DynamicAnimation.js) .

Optional Plugins

Launch Dynamic Animation on the map ( details )
- [NRP_DynamicAnimationMap.js](https://newrpg.up.seesaa.net/mv/NRP_DynamicAnimationMap.js)

Weight reduction of animation for MV ( details )
- [NRP_LightAnimation.js](https://newrpg.up.seesaa.net/mv/NRP_LightAnimation.js)

Read the definition of DynamicAnimation & Motion from txt ( details )
- [NRP_DynamicReadTxt.js](https://newrpg.up.seesaa.net/mv/NRP_DynamicReadTxt.js)

## How to Use

Battler works by calling the template from the note tag of the skill or item.
The following is an example how to call `near` template.
```
<D-Motion:near/>
```

Furthermore, specific parameters can be added to overwrite the pre-defined template.
```
<D-Motion:near>
frame = 8 // 移動時間
</D-Motion>
```

The minimum usage is as above, but there are numerous parameters that can be customized.
First of all, it will be easy to understand from the "Basic usage" page below.
After that, it is smooth to refer to "Explanation of template" and "List of plug-in parameters".

If it is troublesome, the "Sample Technique" page is recommended.
It's quick because you can make skills almost by just copy-pasting.

## Compatibility Issues

Since version 1.04, you can change the display priority .
However, this feature has a large impact and can be turned off in the event of conflicts or other issues.

For example, "YEP_BattleEngineCore" has a similar function.
If there is a conflict, it is safer to turn off the function and leave it as is.

## Change log

### 2020/10/10 (ver1.11)

Fixed with the execution of Dynamic Animation on the map .

### 2020/10/07 (ver1.10)

Supports text reading plugins .

### 2020/10/04 (ver1.09)

Added back , head , and foot templates.
Corrected the movement position when targeting overhead (position = 0). The feet of the actor and the head of the subject are aligned.

*) Additions / modifications of templates will not be reflected unless the plug-in is re-registered.
However, if you re-register, all the setting changes will be initialized.
If you want to avoid it, we recommend copying and pasting from the template definition list .

### 2020/09/22 (ver1.08-> 1.081)

Changed the execution condition (condition) to a repeat item.
Example: Motion display only when the target is sleeping with "condition = b.isStateAffected (10)".
Fixed a bug that an error occurs because the target cannot be acquired when there is no range. (It targets itself as the default.) (09/27 ver1.081)

### 2020/06/07 (ver1.07-> 1.072)

Supports plug-in commands .
Example: You can call it like "plugin = hoge 100 200".
I also added a sample technique .
Fixed a bug that the motion is cleared after the damage processing is completed.
Modified to calculate Z coordinate in real time. (Ver1.071)
The template modification in v1.06 was not reflected in the plugin itself, so it was modified. (09/03 ver1.072)

### 2020/05/18 (ver1.06-> 1.063)

Added the function to change the referenced battler (a, b). (* Settings are on the Dynamic Animation side)
Along with that, the "pierce", "stepForward", "stepBack", "friend only (ifActor)", and "enemy only (ifEnemy)" type templates have been modified.
* Because it is compatible, there is no difference in operation even if it is not reflected.
Fixed a bug that the operation is delayed when the plug-in placement is higher than Dynamic Animation.
Adjusted for the damage batch display plugin under development. (Ver1.062)
Fixed the late damage display to be displayed in the foreground. (Ver1.061)
Fixed to bring the characters in the air to the front. (Ver1.063)
* Please check the Dynamic Animation side as it has been updated a lot.

### 2020/05/09 (ver1.05)

Significantly reduced the weight of mass animation operations.
The processing efficiency on the motion side has been improved accordingly.

### 2020/05/06 (ver1.04)

Implemented a function to change the display priority (Z coordinate) .
* The Dynamic Animation side has also been updated (ver1.07).
* Added notes about competition .
Supports production control using the immortal state .
Implemented battler image change (battlerImage) .
Added items related to circular motion .
Added a revolve type template .
Fixed to refer to width for definition of pierce type.

### 2020/04/10 (ver1.03-> 1.031)

Added a user setting function for tag names .
You can write like <D-Motion: near /> → <dm: near />.
Implemented the weight reduction of "Target Flash" in the animation weight reduction plug-in .
→ 4/11 Fixed a problem that the actor did not flash!
Implemented color parameters.
Implemented each parameter of "X coordinate correction (addX)", "Y coordinate correction (addY)", "Dynamic X coordinate (dx)", and "Dynamic Y coordinate (dy)" .
(Bonus: Alternate sword using "X coordinate correction (addX)" )
Added a shake type template. ( Details )
Fixed a bug that an error occurs when a missed target is missed. (04/24 ver1.031)

### 2020/03/29 (ver1.02-> 1.022)

Added soon (soon) template. ( Details )
Added zoom templates (3 types). ( Details )
Fixed a bug that does not take effect when zooming independently. (Ver1.021)
Added parameters for sound effect (playSe) and weapon type (weaponType) .
Stabilized behavior when repeating the same motion. (Ver1.022)
Implemented a delay (performerDelay) for each motion target . (Ver1.022)
You can always refer to the action subject of the skill with "subject". (Ver1.022)

### 2020/03/23 (ver1.01)

Added the function to execute common events. ( Details )
Added script execution function.
* A script-based zoom process has been added to sample technique (2 ).
Fixed a bug that jumps do not occur when the execution time is 0.

### 2020/03/21 (ver1.00-> 1.002)

Release!
Fixed a bug that an error occurs when there are 3 or less parties. (Ver1.001)
Fixed a bug that an error occurs when executing with save data in the middle. (Ver1.002)


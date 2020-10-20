# Introduction
It is a plugin that automates and truly improvr battle animation.

You can freely call the battle animation from the skill or item.
It is possible to display or move animations with different IDs at the same time.
It has a very high degree of freedom, but if you call the template, it will work even if you write one line in the note tag (example: `<D-Animation:shot/>`).

Furthermore , by linking with Dynamic Motion, you can freely set the movement of the battler.

The following is an introductory video.

*) If the screen is small, click the full screen display at the bottom right.

## Download

Download the following file and place it into directory [Project]\js\plugins.
Please turn on the function from the plug-in management of RPG Maker MV or MZ.

NRP_DynamicAnimation.js

### Optional Plugins

Control battle motion freely 
- NRP_DynamicMotion.js

Launch Dynamic Animation on the map
- NRP_DynamicAnimationMap.js

Launch Dynamic Motion on the map
- NRP_DynamicMotionMap.js

Read the definition of DynamicAnimation & Motion from txt
- NRP_DynamicReadTxt.js

Animation performance improvement for MV
- NRP_LightAnimation.js ver2.01 (2020/04/11)

*) Please note the order of arrangement of plugins.
It is safe to place them in the order listed above.

## How to Use

The behavior of the animation changes by calling the template from the notetag of the skill or item).
The following is an example of calling a shot type template.
`<D-Animation: shot />`

Furthermore, parameters can be added to overwrite the template.
```
<D-Animation: shot>
repeat = 5 // Repeat count
</ D-Animation>
```
The minimum usage is as above, but there are numerous parameters.
First of all, it will be easy to understand from the "Basic usage" page below.
After that, it is recommended to refer to "Explanation of template" and "List of plug-in parameters".

## Basic Usage
Template description

### Shooting template
射撃（shot）、乱射（shotRandom）、全乱射（shotRandomAll）
投射（arc）、乱投射（arcRandom）、全乱投射（arcRandomAll）

### Random template
ランダム（random）、全ランダム（randomAll）
円ランダム（randomCircle）、雨（rain）

### Range template
水平（horizontal）、水平射撃（shotHorizontal）、垂直（vertical）
貫通（pierce）

### Circular template
円周（circle）、渦（vortex）、発散渦（spreadVortex）、公転（revolve）
移動渦（moveVortex）、発散移動渦（spreadMoveVortex）、ブレス（breath）
FVブレス（fv_breath）、収束（converge）、放射（radiate）

### Special template
ビーム（beam）、拡散ビーム（diffusionBeam）、継続（keep）
ブーメラン（boomerang）、魔法発動（spell）

### Display template
進路を向く（lookCourse）、回転（roll）、画面（screen）、頭上（head）
足元（foot）

### Control system template
追従（follow）、自分（self）、ウェイト（wait）、ディレイ（delay）
ダメージ（damage）、戦闘中（ifBattle）、マップ中（ifMap）

### Other information
- List of plugin parameters
- Other functions etc.
- Template definition list

## Difference between MZ and MV version
MZ has undergone a major change in animation specifications.
Among the changes that have impacted this plugin include:

### Adoption of Effekseer
MZ now displays 3D effects created with Effekseer.
As a result, the animation is many times heavier overall.
If you use the mass generation template as it is, the processing will drop unless the PC specifications are very high.
In that case, it may be better to edit on the Effekseer side from the beginning rather than forcibly using this plug-in.

Since it also supports the old MV animation ( details ), there is also a way to use that.

### End of frame is uncertain
Effekseer effects do not have a constant end time.
This made it difficult for the plugin to predict the end frame.
Therefore, in some parts of DynamicAnimationMZ, the last set flash and sound effect setting position is used instead of the end frame.
Specifically, it is the timing to reach the target with the shot type template.

### 3D parameters
Due to the 3D conversion, the enlargement ratio has been divided into three types: "scaleX", "scaleY", and "scaleZ".
In the MV version, the width was changed with "scaleX" and the height was changed with "scaleY", but the behavior changes.

*) Since the parameters are only passed to Effekseer, the author is not sure.
If you simply want to enlarge the whole, change the value of "scale" and it will be reflected.

In addition, the turnover rate is also divided into three types: "rotationX", "rotationY", and "rotationZ".
If you use the unmarked "rotation", it will rotate clockwise just like the MV. However, it seems that the behavior is different from MV, and there were some parts that did not work as expected.
The "beam" and "diffusionBeam" templates didn't work as expected.

### 1 frame unit
The animation frame has been changed to 1/60 second in MZ. This is 4 times faster than MV.

However, in the initial state of DynamicAnimationMZ, processing is performed in 4/60 second units.
Therefore, the timing is maintained even if the description of MV is brought as it is.
Specifically, values, such as "frame", "interval", "motionFrame", "wait", "delay", "arrival", "nextDelay", and "afterimageInterval" are targeted.

If you want to change it, change the value of "Calculation rate" in the plug-in parameter to "1".

### Options that become invalid
The items of "opacity", "drawing rate", and "color" are invalid.
It seems that Effekseer does not accept changes. (Maybe ...)
These items are for MV animation (planned to be implemented).

## Compatibility issue
### YEP
When sharing with "YEP_CoreEngine.js", place NRP_DynamicAnimation.js at the bottom. It's overwriting the same function, otherwise it won't work.

Also, if you use it together with "YEP_BattleEngineCore.js" , change the conflict countermeasure mode (details) to 1 and it will work for the time being.
I have confirmed that it is reasonably stable with YEP_BattleEngineCore v1.50. If it is an old version that can be downloaded from the MV formula, the background will disappear and the behavior is suspicious.

### MOG
When sharing with "MOG_BattleHud.js", please place the MOG side below. Otherwise, the animation targeted by the actor will not work.
　
If you touch the source, you can modify the line `_alias_mog_bhud_sprt_actor_setupAnimation.call(this);` to `Sprite_Battler.prototype.setupAnimation.call(this);`.
In this case, the order should not affect .

In the case of non-side view, it may not work unless you erase `Sprite_Actor.prototype.setupAnimation` on the MOG_BattleHud side. (Unverified)

### VisuStella
Currently, we have confirmed that the behavior becomes strange when used in combination with "VisuStella BatttleCore".
However, because the source there is obfuscated, it is probably impossible to deal with it.
For the motion system, it seems better to choose whether to use our DynamicMotion or combining the plug-ins with the VisuStella system.
　
## Change log

### 2020/10/17 (ver1.18)

Added templates for in battle (ifBattle) and in map (ifMap) .
Fixed a bug that unnecessary weights are generated when multiple commands are combined in the map version. And processing weight reduction.

*) Additions / modifications of templates will not be reflected unless the plug-in is re-registered.
However, if you re-register, all the setting changes will be initialized.
If you want to avoid it, we recommend copying and pasting from the template definition list .

### 2020/10/15 (ver1.17)

Supports execution of Dynamic Motion on a map .
Implemented the overall scale .

### 2020/10/10 (ver1.16)

Supports execution on the map .

### 2020/10/07 (ver1.15)

Supports text reading plugins .

### 2020/10/04 (ver1.14)

Added head and foot templates.

### 2020/09/22 (ver1.13-> 1.131)

Changed the execution condition (condition) to a repeat item.
Example: "condition = b.isStateAffected (10)" is displayed as an animation only for sleeping subjects.
Fixed a bug that an error occurs because the target cannot be acquired when there is no range. (It targets itself as the default.) (09/27 ver1.131)

### 2020/09/05 (ver1.12)

Changed the initial value of "Reference Butler (a, b)" to "1: Game_Battler".
We do not recommend references like "a._battler.atk" in the future. (Unified to "a.atk")
Fine-tuned to reduce competition with other plugins. (09/10 ver1.121)

### 2020/06/13 (ver1.11> 1.111)

Enhanced the loose adjustment function .
Depending on the set numerical value, the animation with random coordinates will be scattered like that.
Addressed the problem that playback was delayed when an animation was interrupted from an external plug-in.
Fixed a bug that the damage type template is not reflected. (Ver1.111)

### 2020/06/07 (ver1.10-> 1.101)

Supports plug-in commands .
Example: You can call it like "plugin = hoge 100 200".
Fixed a bug that afterimages are not displayed correctly in random coordinate animation. (Ver1.101)

### 2020/05/18 (ver1.09-> 1.096)

Added common event & script function .
Added the function to change the referenced butler (a, b) .
Along with that, the "horizontal", "pierce", and "spell" type templates have been modified.
* Since it is compatible, there is no difference in operation even if it is not reflected. (Adjusted with ver1.092)
Also fixed a bug that multiple animations are displayed when multiple targets are displayed in the "pierce" type template.
Added damage function .
Damage processing will be performed at the end of the animation.
Along with that, a "damage" type template has been added.
The sample is also modified for reference .
Fixed a bug that freezes when only <D-Motion> is specified.
Adjusted for the damage batch display plugin under development. (Ver1.093)
Added frame specification to the damage function . (Ver1.094)
Fixed a bug that damage processing is done even when "damage = false" is specified. (Ver1.095)
Removed unnecessary debugging processing. (Ver1.096)
Fixed a bug that index cannot be obtained by the compatibility function of the referenced Butler. (Ver1.096)

### 2020/05/09 (ver1.08)

Significantly reduced the weight of mass animation operations.
Fixed definition of keep type template.
The delay value is adjusted to match the end point of the first animation.

### 2020/05/06 (ver1.07)

The weight has been reduced by removing unnecessary processing when multiple targets are used.
Implemented the function to change the display priority (Z coordinate) .

### 2020/04/20 (ver1.06-> 1.062)

The sound effect is pre-read to reduce the delay.
Added screen type to template. ( Details )
Fixed a bug that an error occurs when a missed target is missed. (04/24 ver1.061)
Fixed a bug that animationBaseDelay is not played when it is 0. (04/26 ver1.062)

### 2020/04/10 (ver1.05)

Added a user setting function for tag names .
You can write like <D-Animation: shot /> → <da: shot />.
Implemented the weight reduction of "Target Flash" in the animation weight reduction plug-in .
→ 4/11 Fixed a problem that the actor did not flash!
Implemented color parameters.
Fixed an error in the animation display position of the "horizontal", "horizontal shooting (shotHorizontal)", and "vertical" templates.
Added a roll type template. ( Details )

### 2020/03/28 (ver1.04-> 1.041)

Addition of lookCourse type template. ( Usage example )
Removed the angle change of the pierce type template with ↑.
Fixed a bug that the "Normal Attack" animation was not displayed. (Ver1.041)

### 2020/03/16 (ver1.03)

Added a function to link with the motion plug-in under development.
Fixed a bug that ignores the previous weight when delay = auto.
Corrected the time difference (delay) value for each target for each animation frame.
Added wait type and delay type templates.
Fixed shot, shotRandom, arc, arcRandom, horizontal, shotHorizontal, vertical, pierce, spell, follow templates to refer to the "position" set in the animation.
Follow type definition re-correction
Added self-type template. (Ver1.031) Click here for
the explanation of additional templates .
Fixed a bug that the noMirror attribute does not work. (Ver1.032)

### 2020/02/29 (ver1.02)

Fixed a bug that the parameters of "Adjustment after reversing Y coordinate", "dx" and "dy" do not work.
Fine-tune the timing to connect the animations.
Fixed a bug that weight is applied excessively.
Implemented template & fusion function. ( Details )
Implemented cooperation processing with the motion plug-in under development.
Added follow type to template. ( Details )

### 2020/02/23 (ver1.01)

Compatible with Tsukuru MV1.5.X.

### 2020/02/20 (ver1.00)

Release!
Fixed a bug that caused an error in some formulas. (Ver1.001 02/22)
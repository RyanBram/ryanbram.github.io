# Dynamic Motion on the Map
Launch Dynamic Motion from the map.
Characters can perform normally difficult movements such as rotation, enlargement, and free movement.

![Image](https://newrpg.up.seesaa.net/image/20201014_DynamicMotionMap.gif)

The following plugins are required for this plugin to work.

*) This plug-in itself is valid for both MV and MZ.

MZ version
- NRP_DynamicAnimationMZ
- NRP_DynamicMotionMZ
- NRP_DynamicAnimationMapMZ

MV version

- NRP_DynamicAnimation
- NRP_DynamicMotion
- NRP_DynamicAnimationMap

If you register, Dynamic Motion on the map will be enabled.
Start from the plug-in command of NRP_DynamicAnimationMap .

## Requirements

The following plugins need to be placed and activated in [Project]/js/plugins directory.
Please turn on the function from the plug-in management of RPG Maker.

*) This plug-in is valid for both MV and MZ.

- NRP_DynamicMotionMap.js

Please update the following plugins to the latest version.

*) If there are discrepancy between the versions, it may not work.

MZ version
- NRP_DynamicAnimationMZ.js
- NRP_DynamicMotionMZ.js
- NRP_DynamicAnimationMapMZ.js

MV version
- NRP_DynamicAnimation.js
- NRP_DynamicMotion.js
- NRP_DynamicAnimationMap.js　

*) Make sure to place it lower than the above three plugins.


## New Template
It is a template that can be set for the skill.
See the Dynamic Motion page for existing templates.
The following are registered in the common template list.

### ifBattle

### ifMap
You can create a process that works only on the battle screen and the map screen.
`<D-Motion:ifBattle&near/>`
`<D-Motion:ifMap&back/>`

In the above example, it is a skill that executes near on the battle screen and back on the map screen.

## Changes for Map Template
Template are also registered in the map template list.
There is a template with the same name and ID for battle scene, but the setting for the map has priority.
Be careful not change the wrong template.

### near (Approach)

Move next to the target.
To be precise, it moves to the coordinate closest to the action subject among the four coordinates of the target up, down, left and right.

### back

Move behind the subject.
To be precise, it moves to the coordinate farthest from the action subject among the four coordinates of the target up, down, left, and right.

### stepForward
Take a step forward in the direction of the actor.

### stepBack
Take a step back in the opposite direction of the actor.

### return
When the plug-in command is executed, it jumps back to the position where the actor was originally.

### home
When the plug-in command is executed, the actor returns to the original position.
The only difference from return is the presence or absence of a jump and the difference in required time.

## Additional Template for Map

This is a new template registered in the map template list.
Only available on the map.

### turnToward
The actor faces the target direction.
Even if you combine it at the same time as stepForward, be careful as it will change direction after moving forward.
```
<D-Motion:turnToward&soon/>
<D-Motion:stepForward/>
```

For example, if you do the above, it will turn to the target and then move forward.

### turnAway
The actor faces the opposite direction of the subject.

## Additional Parameters for map

When Dynamic Motion is started from the map, the following parameters are newly enabled.

### gridEx, gridEy
The X and Y coordinates of the end point (move destination).
Unlike ex and ey, these are the coordinates in grid units.

For example, if you want to move to the coordinates (x = 10, y = 5), write as follows.
```
<D-Motion>
gridEx = 10
gridEy = 15
</D-Motion>
```

You can also refer to the start point with gridSx and gridSy.
```
<D-Motion>
gridEx = gridSx + 1
gridEy = gridSy + 1
</D-Motion>
```
If you write as above, the character will move to the lower right by one from the current coordinates.

Also, `gx` and `gy` are valid abbreviations.
```
<D-Motion>
gx = a.gx + 1
gy = a.gy + 1
</D-Motion>
```
It is also possible to refer to the current grid coordinates of the actor or target, such as `a.gx` or `b.gy`.
This may be recommended because it can be written more concisely.

### direction
Specify the orientation of the character.
It will be `2`: down, `4`: left, `6`: right, and `8`: up.
In addition to numerical values, you can also specify character strings such as `up`, `down`, `left`, and `right`.

### pattern
Specify the character pattern (stepping).
It will be `0`: left, `1`: center, and `2`: right.

### image
Change the character image to the specified file (no extension required).
It returns to the original by switching the screen.

By the way, you can change the Butler image even if you use it during battle.
Originally, there was an item called battlerImage for battle, but it was integrated into image. Characters on the map and butlers during battle are automatically targeted.

### imageIndex

Change the index (0-7) of the character image.
It returns to the original by switching the screen.
```
<D-Motion>
image = "Actor2"
imageIndex = 5
</D-Motion>
```

You can change the character image by combining image and imageIndex like this.
It is also possible to specify only one.

## Plugin Parameter
### NoMultipleMotion
Prohibits multiple execution of Dynamic Motion for events.
This prevents unexpected behavior.

### RoundCoordinate (Rounding of destination coordinates)
If the grid coordinates to which the event is moved are decimal, they are rounded off.

*) Grid coordinates are equivalent to multiples of 48 (standard) in pixel units.

It seems that the rest to the decimal coordinates is not supposed on the RPG Maker side, and problems such as not accepting operations will occur.
It is a measure to avoid it.
If you combine multiple moves, make adjustments for the final destination.
For intermediate movements, it is possible to stay in decimal coordinates.

It is designed to be turned off, assuming that it will be combined with a plug-in such as half-step movement.
Even in that case, please be aware of the above problems.

### StepOnMove
Specify the stepping method when moving.
In the initial state, it is designed to step on when moving other than jumping.

If a pattern is specified, that will be given priority.

## Plugin Parameter for Movement
Adjusts the behavior when approaching.
Mainly related to **near** or **back** templates.

### ConsiderSize
When approaching, consider the size of the target.
If it is off, the target size is considered as one grid.

### RoundTypeNear
How to round the grid coordinates when approaching.
When you move to coordinates like 10.5, you get a sense of unity in the process.

Basically, it is used for adjustment when "Rounding of destination coordinates" and "Consider target size" are turned on.
If this item is off, you may move to an uneven grid depending on the direction when approaching a large target such as a big monster.
This is because the coordinates of the destination will be rounded off.
This item is a measure to eliminate those discomforts.

## Differences in behavior from battle scene
Due to the specifications, the behavior is different from that in battle, so I summarized that point.

### Template behavior
As mentioned above, some templates behave differently on the map.
Besides, of course, motion systems such as swinging weapons have no effect.
If you want to create a motion with a character chip, you need to prepare and implement a separate image.

### References for a and b (for advanced users)

During the battle, we are able to access the information of Game_Battler as `a` = actor, `b` = target, such as `a.hp`, `b.atk`.
(At least in the current version of the standard)
But the map version behaves differently and the reference is not `Game_Character`. `a` and `b` are `Sprite_Character`.

*) Reason: The coordinate information (x, y) of `Game_Character` is based on the grid coordinates.

Because there are huge difference with specification from the battle scene.

If you want to access `Game_Character`, you can refer to `a._character` and `b._character`.
Basically, it seems that `Game_Character` is the center of control rather than `Sprite_Character` on the map, and this tends to have more useful information & functions.

## Update history (history)

### 2020/10/17 (ver1.01)
Added the map template definition list to the Dynamic Motion plugin parameters. Even templates with the same ID can behave differently on the map.
With ↑, each template of near , back , stepForward , stepBack , return , home has different specifications on the map.
Directed to the target (TurnToward) , facing away (turnAway) add to the map for the template.
Added templates for in battle (ifBattle) and in map (ifMap) .
Added plugin parameters to adjust the behavior of near, back templates .
Implemented gx and gy as abbreviations for gridEx and Ey .
Fixed a bug that some weight processing is not working properly.
Fixed a bug that characters rarely disappear when opening and closing the menu.
Fixed NRP_DynamicAnimationMapMZ file being MV version.

*) If you do not reset the plug-in command, an error may occur. Sorry to trouble you, but thank you.

*) Template additions / modifications will not be reflected unless the Dynamic Motion plug-in is re-registered.
However, if you re-register, all the setting changes will be initialized.
If you want to avoid it, we recommend copying and pasting from the template definition list ( MZ , MV ).
In addition, ifBattle and ifMap templates have been added to the Dynamic Animation side. ( MZ , MV )

### 2020/10/15 (ver1.00)
Released!
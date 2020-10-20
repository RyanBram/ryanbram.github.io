# Plug-in Parameter list
This page is part of the description of the DynamicAnimationMZ plug-in .

I will summarize the plug-in parameters.
Since there are a lot of them, it may be better to refer to them as needed rather than forcibly reading them all at once.

In addition, everything included under "Template parameters" here is the same as the description made in the note tag.
For example, in the case of "repeat", the description is as follows.
Please use the alphabet to specify.
```
<D-Animation>
repeat = 5
</ D-Animation>
```
## Overall parameters

### templateList

A list of templates with predefined animation settings.
Click to display a list of templates.
You can also add new templates.
In a way, it's the core of this plugin.

By the way, the items in the list can be sorted by dragging the mouse.

### shortTagName

Allows the tag name to be omitted in the specified character string.
For example, `<D-Animation: shot />` can be abbreviated as `<da: shot />`.

### CalculationRate

The calculation rate used to specify interval, wait, etc.
The initial value is 4. In other words, it processes in 4/60 second units.

## Animation Position

Parameters related to the display position of the animation.

### Screen animation display X coordinates (screenX)

### Display Y coordinate of screen animation (screenY)

These are the standard coordinates for displaying animations with a display type of "center of screen".
In short, it is the center position when displaying the entire target animation.
If the target is an actor, the X coordinate is flipped horizontally.

The initial values are set so that both the side view and the front view look good.

### allRangeX, allRangeY

This is the range for displaying the entire animation.
X is horizontal and Y is vertical.
Since the template of the whole target system refers to it, change these values, if you want to widen or narrow the range.

The initial values are set so that both the side view and the front view look good.

### mirrorAdjustX, mirrorAdjustY

When the target inverts the animation position of the actor, it is further shifted by this numerical value.

For example, in many side-view battles, enemies have more space than allies. Therefore, if you simply flip the position of the battle animation left and right, it may cover the enemy.
In such a case, adjust with the value here.

![image](https://newrpg.up.seesaa.net/image/20200218_mirrorAdjustX-thumbnail2.JPG)
![image](https://newrpg.up.seesaa.net/image/20200218_mirrorAdjustX_2-thumbnail2.JPG)

In addition, when displaying the animation for the actor in the front view, you can use it by shifting the Y coordinate downward.

### randomAdjust

The numerical values at the time of random calculation are artificially dispersed.
If it is 0.20, it will be 20% or more away from the previous position.
This function is for adjusting the display position of random animation so that it is not extremely biased.

It is not set in the initial state because it has a slightly experimental meaning.

## For FrontView

Front view related items.

### fvActorHomeX, fvActorHomeY

In front view, set the coordinate position of the actor.
Actors are usually transparent, but they are involved in the starting point of the anime.
This item is not necessary if you place it with another plugin.
Empty it if it gets in the way.

The initial value of the X coordinate "Graphics.boxWidth / 2" points to the center of the screen.
"Graphics.boxWidth" is the width of the entire screen.

If you want to expand the arrangement to the left and right depending on the number of parties
```
Graphics.boxWidth * (index + 1) / ($ gameParty.battleMembers (). length + 1)
```

Something is recommended.
With this formula, the width of the screen is divided equally according to the number of participants in the battle ($ gameParty.battleMembers (). Length).

It may be fun to combine it with the side-by-side layout like this.

## Compatibility Issues

This item is related to solve compatibility issues between plugins.

### ConflictMode

Change how to call the process for conflict countermeasures.
0 is standard, but some plugins may work if you change it to 1.

If it is 1, "YEP_BattleEngineCore" will work for the time being.
But we cannot guarantee it strongly.

*) The situation has changed with MZ, but I will leave it for the time being.

### ignoreCondition

If the conditions set in the array are met, the processing of this plug-in will not be executed.
In the initial state, the settings for "YEP_BattleEngineCore" are included.

## Template parameters

Animation call information defined as the contents of the template list.
Almost all items support JavaScript formulas.

### Basic

This is a basic item.
When the animation is executed, the value is set before the repeat.

#### Name
This is a memo for identification. Please give it a descriptive name.
Actually, you can use it even if you specify this in the memo field of the skill item.

#### templateId

The identifier used to call the template.
Specify this ID in the memo field of the skill item.

#### delay

This is the time difference frame before the animation is displayed.
The value corresponds to one frame of the animation.
If you specify "auto", it waits for the end of the previous animation.

#### wait

This is the waiting frame after displaying the animation.
The value corresponds to one frame of the animation.
If you specify "auto", it will wait for the end of this animation.

#### repeat

The number of times the animation is repeated.

#### limitFlash

Flash processing is limited by the set value.
Both "target flash" and "screen flash" are targeted.
A value of 2 halves the number of flashes.
Also, if the value is 0, it will be completely disabled.
In particular, the "target flash" is extremely heavy, so it is effective in improving performance.
*) There is also information that MZ is not too heavy ...

#### limitSound

The sound effect is limited by the set value.
If the value is 2, the number of performances will be halved.
Also, if the value is 0, it will be completely disabled.

#### target

Changes the display of the animation to the specified target.
You can specify a battler or its array.

For example, if you specify "a", the actor will be the target.
It is supposed to be used for magic activation production.

#### mv

Use RPG Maker MV animations in RPG Maker MZ.
The animation with the same ID set on the MV side will be displayed.

The following plug-ins are required to use this function.
http://newrpg.seesaa.net/article/477285411.html

## Template repeat parameters

　This item is processed for each repeat.
　You can refer to the current number of repeats with "r". Note that it starts at 0.

　After that, all items will be processed for each repeat.

### Basic Repeat

　This is a basic setting item that is processed for each repeat.

#### id

The ID of the animation to call.
If it is empty, the one set for the skill will be used.

#### condition

Execution condition (JavaScript calculation formula).
If this condition is not met, the animation will not run.

Description example: When the actor is the actor.
```
condition = a.isActor ()
```

#### Animation position

The position of the animation. 0: overhead, 1: center, 2: feet, 3: screen.
Except for the screen, the target number of people is displayed.

Originally, it is a function that is removed from RPG Maker MZ, but it works properly with DynamicAnimationMZ.

#### interval

The interval at which the animation repeats.
The value depends on the "calculation rate".

#### rate

*) This parameter does not work with RPG Maker MZ effekseer animations.

It is the display time of one frame of animation.
The initial value is 4.
In other words, the drawing is updated every 4/60 seconds.

#### nextDelay

The time difference for displaying the animation when there are multiple targets.
This is effective when the animation display type is "For each target".

The value depends on the "calculation rate".

#### noMirror

If true is specified, the display inversion of the animation is disabled when the target is an actor.
When the display collapses due to left-right reversal.

#### damage

If set to true, damage processing will be performed when the animation ends.

*) To be exact, it is judged by the sound effect and the end time of the flash.

Also, if you specify a numerical value (example: damage = 10), damage processing will be performed according to the number of frames.
This is more convenient than the one in DynamicMotion.

In addition, when combined with the whole multiple attacks, the behavior is suspicious because the damage is not displayed. It is recommended to display all at once with the damage timing adjustment plug- in because it will be stable.

#### CommonEvent

Executes the common event with the specified number.
The behavior is like calling parallel processing only once.

You can freely change the color tone of the screen, shake, display the picture, change the BGM, etc.
However, please note that the progress will not stop even if you display a message or apply a wait.

#### script

Executes the specified script.

#### plugin

Executes the specified plug-in command.

Description example
```
plugin = hoge a.x 200
```
Unlike regular plug-in commands, formulas are also valid.
However, note that spaces are treated as delimiters.

### Starting Point

Start point related parameters.
If there is no start point for the end point, the animation ends with just the start point.

#### sx, sy

The X and Y coordinates of the start point.

#### sxRandom, syRandom

Disperses the coordinates of the start point horizontally or vertically.
If the value is 100, it will be distributed by 200 pixels from -100 to 100.

### End Point

End point related parameters.

#### ex), ey

The X and Y coordinates of the end point.
If you enter this, the animation will move from the start point to the end point.

#### exRandom, eyRandom

Disperse the coordinates of the end points.
X is horizontal and Y is vertical.
If the value is 100, it will be distributed by 200 pixels from -100 to 100.

#### arrival

The frame that reaches the end point.
It is used for animations that land and explode.

The value depends on the "calculation rate".

#### arcX, arcY

The width and height of the parabola.
Note that the minus number will move vertically upwards!

### Afterimage

It is an parameter related to afterimages.

#### afterimage

Creates an afterimage for the set value.
Note that the larger the number, the heavier it becomes.

*) The transparency of the afterimage does not change in RPG Maker MZ effekseer animations.
Usability may be subtle ...

#### AfterimageInterval

Specify the interval at which the afterimage is created numerically.

## Real-time parameters of template

This item is calculated every 1/60 second.
There are many items for advanced users.

In the following items, you can refer to the elapsed time as "t" and the end time as "et".
Also. You can refer to the arrival time at the end point in "arrival". Unlike the "arrival frame" mentioned above, it is in 1/60 second units.

### Real Time

　This is a real-time basic item.

#### dx, dy

Set the formula that defines the XY coordinates every 1/60 second.

Normally, if this item is not set, the coordinates will be calculated by the formula from the start point to the end point. If you set this item, it will be ignored and the calculation will be performed using your own formula.
In theory, you can create as many complex movements as you like, but it's for advanced users only.

#### addX, addY

It is a value to be added to the X and Y coordinates.
After all the position calculations are completed, the correction is applied at the end.

#### scale

The overall magnification. 1.0 is the standard.

#### scaleX, scale Y, scale Z

The magnification for each direction. 1.0 is the standard.
Unlike the animation editing screen, different settings can be made for each direction.

#### rotation

The turnover rate. Specify radians instead of frequencies.
"Math.PI * 2" corresponds to 360 degrees.

Rotates clockwise by the specified value.
This is the same behavior as in MV.
By the way, the direction is exactly the opposite of the turnover rate Z.

#### RotationX, Rotation Y, RotationZ

The turnover rate for each direction. Specify radians instead of frequencies.
"Math.PI * 2" corresponds to 360 degrees.

#### Opacity

*) This parameter does not work with RPG Maker MZ effekseer animations.

Opacity
255 is opaque, 0 is transparent.

#### color

*) This parameter does not work with RPG Maker MZ effekseer animations.

Changes the color tone in the specified array.
Example: [255, 255, 255, 255] (in order of red, green, blue, intensity)

This process is heavy, so be careful when displaying a large amount of animation.

#### z

Change the Z coordinate (display priority) of the animation.
The initial value is 8. Animation is displayed below Butler at 2 or less (standard case).

*) This function does not work unless "Enable display priority" is turned on in Dynamic Motion.
(Alternatively, you can do the same with an external plug-in.)

### Real Time Circle

Parameter related to real-time circular motion.

#### radiusX, radius Y

Circular radius of motion in the X and Y directions.

If both have the same value, it will be a circle, and if only one is enlarged, it will be an ellipse.
In addition to this, if you set the lower circular motion angle, the animation will make a circular motion

#### radX, radY

Circular motion angles in the X and Y directions.
2π is one cycle.

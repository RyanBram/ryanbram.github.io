## Plug-in Parameter list
This page is part of the description of the Dynamic Motion plug-in .

We will summarize the plug-in parameters.
Since there are a lot of them, it may be better to refer to them as needed rather than forcibly reading them all at once.

In addition, everything included under "Template parameters" here is the same as the description made in the note tag.
For example, in the case of "wait", the description is as follows. Please use the alphabet to specify.
```
<D-Motion>
wait = 5
</D-Motion>
```

## Overall parameters

#### templateList

A list of templates with predefined motion settings.
Click to display a list of templates.
You can also add new templates.
In a way, it's the core of this plugin.

By the way, the items in the list can be sorted by dragging the mouse.

#### shortTagName

Allows the tag name to be omitted in the specified string.
For example, `<D-Motion:near/>` can be abbreviated as `<dm:near/>`.

#### shortSettingTagName

Allows the setting tag name to be omitted in the specified character string.
For example, `<D-Setting:NoStep>` can be omitted as `<ds:NoStep>`.

#### setStartMotion

Set the presence or absence of motion to be executed when using an attack, skill, or item.
0: Always Yes, 1: Always No, 2: No Only when the motion is specified

Initial value is 2.

#### setStepForward

Set whether to take a step forward when using attacks, skills, or items.
0: Always Yes, 1: Always No, 2: No Only when the motion is specified

Initial value is 0.
Even if it is 0, if you write `<D-Setting:NoStep>` in the note tag of the skill or item, you will not be able to move forward.

#### defaultDuration

This is the initial value of the travel time when not specified.

#### defaultEnemyMotionDuration

This is the initial value of the enemy motion time when not specified.
Normally, the enemy has no motion.
When using the same skill as the actor, it will be the wait time for the motion.
If set to 0, there will be no weight.

#### jumpShadow

Whether to display a shadow when jumping.
A shadow is displayed by default.

#### immortalState

This is the number of the immortal state used for directing control.
If you enter `<D-Setting:Immortal>`, the death judgment will not be made until the skill production is completed. You can prevent the opponent from dying during the continuous hit technique and the production will be missed.

In the initial state, "3: Immortal" is set, but please create and set a dedicated immortal state as much as possible.
Since it is added and released internally, even those used for other purposes will be released at the same time.

## Overall display priority related parameters

This item is related to the overall display priority.
By specifying the Z coordinate, you can change the priority at which Butler is displayed on the screen.
*) The larger the Z coordinate, the more it will be displayed on the front.

#### usePriority

Enables the display priority change function.
It is enabled by default, but if you don't need it, set it to false.

For example, "YEP_BattleEngineCore" has a similar function. If there is a conflict, it is safer to turn off the function and leave it to that.

#### battlerZ

This is the initial value of the Battler's Z coordinate (display priority).
The initial value is 3. If you change the Z coordinate in the individual description, you can make fine adjustments for each skill.

#### opponentSideZ

At the time of action, change the Z coordinate of the opponent side.

For example, the display priority in the initial state is "Actor> Enemy character". Therefore, even if you create an action that the enemy character leans on, the actor will always be displayed in the foreground.
With this setting, it is possible to make adjustments so that the target is automatically displayed below the actor.

If left blank, the same value as "Battler's Z coordinate" will be applied as it is.


## Template parameters

Animation call information defined as the contents of the template list.
Almost all items support JavaScript formulas.

### Basic

This is a basic item.
When the animation is executed, the value is set before the repeat.

#### name

This is a note for identification. Please give it a descriptive name.
Actually, you can use it even if you specify this in the note tag of the skill item.

#### templateId

The identifier used to call the template.
Specify this ID in the note tag of the skill item.

#### delay

This is the time difference frame before the motion is displayed.
The value corresponds to one frame of the animation.
If you specify "auto", it waits for the end of the previous motion.

#### wait

This is the standby frame after displaying the motion.
The value corresponds to one frame of the animation.
If you specify "auto", it waits for the end of this motion.

Also, if you specify "autoMove", only the motion movement will wait for the end.

#### repeat

The number of times the motion is repeated.

#### performer

Changes the motion display to the specified target.
You can specify a battler (and its sprites) or its array.

Normally, the target of the motion is the performer of the skill.
For example, if you specify `b` or `b._battler`, the target of the skill will be the target of motion.

#### noReturn

Specify true to prevent the actor from automatically returning to the home position.
*) Depending on the specifications of Maker MV, the actor will automatically return to the specified position after the action is completed.

It is supposed to be combined with other unlocking skills by common events and continuous moves using states.
To cancel, specify false.

#### battlerImage

Temporarily changes the battler image to the specified file name (no extension required).
It is effective for both actors and enemy characters.
It is also effective when you want to increase the motion pattern of actors.

Enter "false" or "" "for the value to return to the original value.
Also, it will return to its original state even after the battle is over.

## Template repeat parameters

This item is processed for each repeat.
You can refer to the current number of repeats with "r". Note that it starts at 0.

After that, all items will be processed for each repeat.

### Basic Repeat

This is a basic setting item that is processed for each repeat.

#### condition (Execution condition)

Execution condition (JavaScript calculation formula).
If this condition is not met, no motion will be performed.

Description example: When the actor is the actor.
`condition = a.isActor()`

#### position

The target position of the motion. 0: overhead, 1: center, 2: feet, 3: screen.

#### interval

The interval at which the motion is repeated.
The value corresponds to one frame of the animation.

#### rate

It is the display time of one motion frame.
The initial value is 4. In other words, the drawing is updated every 4/60 seconds.

#### every

If ON, the motion is repeated for each target.

#### nextDelay

This is the time difference between the "motion target" and the action when there are multiple "skill target".
It is meaningless unless "Repeat for each target" is turned ON.

#### performerDelay

This is the time difference between each person performing an action when there are multiple "motion target persons".

#### mirror

If set to true, the battler display will be flipped horizontally.
Note that until you specify false after that, it will remain the same even after the action is completed.

#### damage

If true is specified, damage processing will be performed without waiting for the end of all motions.
This is processed only once.

In addition, when combined with multiple attacks as a whole, the behavior is suspicious because the damage is not displayed. It is recommended because it will be stable if it is displayed all at once with the damage timing adjustment plug-in .

#### damageAll

If true is specified, damage processing will be performed without waiting for the end of all motions.
All processing is done by specifying it once.
I think that it is more stable than the above "damage processing" because it is a form that accelerates the normal damage processing.

By the way, this is set by default in the `return` type template.
This is why the damage is displayed before the battler finishes returning.

#### noShadow

If set to true, the shadow will be erased.

#### playSe

Plays the specified sound effect (SE).
There are two ways to specify, "1. Specify only the file name" and "2. Specify details (volume, pitch, phase)".

[Example]
1. `Cat`
2. `{"name":"Cat","volume":90,"pitch":100,"pan":0}`

For example, it is supposed to be used to add a jump sound to a jump template.

#### commonEvent

Executes the common event with the specified number.
The behavior is like calling parallel processing only once.

You can freely change the color tone of the screen, shake, display the picture, change the BGM, etc.
However, please note that the progress will not stop even if you display a message or apply a wait.

#### script

Executes the specified script.

#### plugin

Executes the specified plug-in command.

Description example
`plugin = hoge a.x 200`

Unlike regular plug-in commands, formulas are also valid.
However, note that spaces are treated as delimiters.

### End Point

End point related parameters.
By the way, unlike Dynamic Animation, there is no parameter for the start point.
This is because Butler's current location is always the starting point.

#### ex

#### ey

The X and Y coordinates of the end point.
If you enter this, the butler will move from the start point to the end point.

#### airY

The aerial Y coordinate of the end point.
Butler moves with the end point in the air.

When combined with arcY below, you can create an action that jumps up and stands still in the air.

#### duration 

The time it takes to move.

#### frame

The time it takes to move.
This is 4/60 seconds as standard.
In other words, it is the same as an animation frame, so it is convenient when you want to link animation and movement.
If you enter both `duration` above, this will take precedence.

#### arcX 

#### arcY

The width and height of the parabola.
Note that the vertical width is minus upwards!

Jump operation is performed by setting a negative value for arcY.

### Motion

Motion related parameters.

#### motion

The name of the motion to execute.
Example: walk, wait, etc.
If you specify an attack, the current weapon will be automatically swung.

List of motion
- 攻撃（attack）
- 前進（walk）
- 通常待機（wait）
- 詠唱待機（chant）
- 防御（guard）
- ダメージ（damage）
- 回避（evade）
- 突き（thrust）
- 振り（swing）
- 飛び道具（missile）
- 汎用スキル（skill）
- 魔法（spell）
- アイテム（item）
- 逃げる（escape）
- 勝利（victory）
- 瀕死（dying）
- 状態異常（abnormal）
- 睡眠（sleep）
- 戦闘不能（dead）

If you want to know the specific motion, you may refer to "Side View Character Standard" in RPG Maker MV Help.

#### motionDuration 

The time required for motion. (Motion time in 1/60 seconds)

#### motionFrame 

The time required for motion (Motion time in frame).
If specified alongside `motionDuration`, this will be given priority.

#### motionPattern

It is a motion pattern.
There are 3 patterns for each motion, and they are usually executed in the order of 0 → 1 → 2.
If you specify a value from 0 to 2, you can fix the motion with that pattern.

Although it is for advanced users, it is also possible to specify the real-time display order with a mathematical formula.

#### motionStartPattern

This is the motion start pattern.
Normally it is 0, but if you specify 1 or 2, it will start from that pattern.

If you want to fix the motion with a specific pattern, you need to set it at the same time as the above "Motion pattern".

#### weaponId 

Weapon ID used during motion (Weapon ID in database).
The displayed weapon type changes depending on the specified ID.
If you specify this, you can also display weapons that are not equipped.
Try making a magic sword-like technique.

#### weaponType

Weapon type used during motion.
Use this if you want to specify the weapon type directly instead of the ID.

## Real-time parameters of template

This item is calculated every 1/60 second.
There are many items for advanced users.

In the following items, you can refer to the elapsed time as `t` and the end time as `et`.

### Real Time

#### dx

#### dy

Set the formula that defines the X and Y coordinates every 1/60 second.

Normally, if this item is not set, the coordinates will be calculated by the formula from the start point to the end point. If you set this item, it will be ignored and the calculation will be performed using your own formula.
In theory, you can create as many complex movements as you like, but it's for advanced users only.

#### addX

#### addY

It is a value to be added to the X and Y coordinates.
After all the position calculation is completed, the correction is applied at the end.

#### scaleX

#### scaleY

It is the enlargement ratio of the width and height. 1.0 is the standard.

#### rotation

The turnover rate. Specify radians instead of frequencies.
`Math.PI * 2` corresponds to 360 degrees.

#### opacity

Opacity 255 is opaque, 0 is transparent.

#### color

Changes the color tone in the specified array.
Example: [255, 255, 255, 255] (in order of red, green, blue, strength)

#### z

Change the Z coordinate (display priority) of the battler.
The initial value is 3. However, it is a specification that the priority of the other side is changed to 2.5 at the time of action.
When set to 2 or less (in the standard case), the battler to be motioned is displayed below the other butlers.

*) This function does not work unless "Enable display priority" is turned on. (Alternatively, you can do the same with an external plug-in.)

#### scriptRT

Executes the specified script in real time.

### Real Time Circle

Items related to real-time circular motion.

#### radiusX

#### radiusY

The radius of circular motion in the X and Y directions.

If both have the same value, it will be a circle, and if only one is enlarged, it will be an ellipse.
In addition to this, if you set the lower circular motion angle, the butler will make a circular motion.

#### radX

#### radY

Circular motion angles in the X and Y directions.
2π is one cycle.
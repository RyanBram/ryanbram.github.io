# Basic Usage

This page is part of the description of the Dynamic Motion plug-in.

This will introduce you the basic usage of this plug-in.
You can copy and paste as it is, so feel free to use it.

## motion

Perform the motion. Please refer to the plug-in parameter list for what kind of motion there is.
As an example, write the following in the note tag of the skill (or item).
*) Please note the presence or absence of "/" at the end of `<D-Motion>` and `<D-Animation>`.
```
<D-Motion>
motion = thrust // 突き
</D-Motion>
<D-Animation/> // アニメーション
```
![Image](https://newrpg.up.seesaa.net/image/20200315_thrust.gif)

At the same time as the action of "thrust", the animation set for the skill is played.
For <D-Animation/> , refer to the description of the Dynamic Animation plug-in .

Animation specification is optional.
After the operation is completed, the animation set for the skill will be played automatically.
If you don`t need to make explicit setup, this is fine.

Also, if you call the pre-made template, you can omit it as follows.
```
<D-Motion:thrust/> // 突き
<D-Animation/> // アニメーション
```

The content is exactly the same. The contents of the template can be freely changed / added from the plugin parameters.
*) Only the ones registered in the template are valid. Not all motions can be called in the same way.

## near

You can get closer to the target by calling the template as follows.
```
<D-Motion:near/> // 対象へ接近
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
```
![Image](https://newrpg.up.seesaa.net/image/20200314_attack.gif)

`<D-Motion: attack/>` can be used in the same way as "Motion" above.
Performs an attack action with the equipped weapon.
In this way, the processes are executed in the order described.

Also, the destination depends on the "position" of the set animation. "Overhead", "Center", "Foot", "Screen", move to the position according to each setting.
(The screen goes to the center of the enemy team.)

## duration

By default, the approach to the enemy is done in 12/60 seconds.
If you want to change this value for each skill, add the description to the template as follows.
```
<D-Motion:near> // 対象へ接近
duration = 6 // 6/60秒で移動
</D-Motion>
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
```
![Image](https://newrpg.up.seesaa.net/image/20200314_duration.gif)

It's speed will become doubled.

## frame

There is another way to specify the travel time.
```
<D-Motion:near> // 対象へ接近
frame = 2 // 2フレームで移動
</D-Motion>
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
```

If you specify frame, you can specify the time for each frame of the animation.
Normally, one frame is 4/60 seconds.
This is convenient if you want to match the timing with the animation.
By the way, you can also use decimals and fractions.

## ex, ey

It is also possible to freely specify the destination without using a template.
```
<D-Motion>
ex = a.x + 300 * mirroring // 終点Ｘ座標 = 現在地 + 300
wait = auto // 動作終了を待つ
</D-Motion>
<D-Motion:near/> // 対象へ接近
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
```
![Image](https://newrpg.up.seesaa.net/image/20200315_ex100.gif)

Once, you went back and tried to act like a run-up.

For those who have already called the explanation of Dynamic Animation, this is the information already mentioned ...

"Ax" is the X coordinate of the action subject. If it is "ay", it will be the Y coordinate.
"Wait = auto" is an instruction to wait for the end of operation.
Note that without this, the next move operation will be overwritten.
Templates such as "near" have this setting from the beginning.
"Mirroring (details)" is a variable whose value is "-1" if the target is an ally.
In other words, if the enemy attacks an ally, it will run to the left.

To specify the coordinates based on the target, describe as follows.
```
<D-Motion:near> // 対象へ接近
ey = defaultY + 100 // 終点Ｙ座標 = 対象 + 100
</D-Motion>
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
```
![Image](https://newrpg.up.seesaa.net/image/20200315_ey.gif)

You will attack by moving slightly downward.
The X coordinate is the same as in the case of "near", so it is used as it is.

"DefaultX" and "defaultY" contain the coordinates of the target (b) in consideration of the animation position settings (overhead, center, feet, screen).

- Overhead： `defaultX = b.x, defaultY = b.y - b.height`
- Center： `defaultX = b.x, defaultY = b.y - b.height / 2`
- Feet： `defaultX = b.x, defaultY = b.y`
- Screen： `Plugin parameter settings for both defaultX and defaultY`


Details are as above.
It is troublesome to enter `b.y - b.height / 2` one by one, so it is convenient to use this.

## return

In addition, let`s put in the process of returning to the original position properly.
```
<D-Motion:near/> // 対象へ接近
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200314_dashSlash.gif)

Even if this is not explicitly specified, the actor will automatically return to its original position.
This is due to the specifications of RPG Maker MV.
However, if the user of the skill is an enemy, it will not return automatically.
Basically, we recommend that you specify it properly.

## NoStep

It's a small detail, but in the dash slash above, we take a step forward and then start approaching the enemy.
If you don't need to take the first step, add the following description.
```
<D-Setting:NoStep> // 前進しない
<D-Motion:near/> // 対象へ接近
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200314_dashSlash.gif)

Now you can run straight to the enemy.

If you don`t want to write it one by one, you can set the plugin parameters to not always take a step forward.
Even in that case, you can move forward by writing <D-Motion: stepForward />.

This is the basic form of the type of skill that shoots close to the enemy. It is convenient to copy and use it.

## jump

Next, let`s jump.
```
<D-Motion:jump/>
```
　If you just write, it will jump on the spot.

…… But basically, this template is used in combination with others.
If you connect the templates with `&`, you can execute the functions at the same time.
```
<D-Setting:NoStep> // 前進しない
<D-Motion:near&jump/> // 対象へジャンプして接近
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200315_jumpSlash.gif)

It became a jump slash.
By the way, it`s okay to put a space like `<D-Motion: near & jump/>`. Please make it easy to see.

The jump height can be changed with arcY. The initial value is -100, so I tried to multiply it by 5.
*) Depending on the specifications of Maker MV, the minus will be higher.
```
<D-Setting:NoStep> // 前進しない
<D-Motion:near&jump> // 対象へジャンプして接近
arcY = -500 // 高度500ピクセル
duration = 30 // 30/60秒で移動
</D-Motion>
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200315_highJumpSlash.gif)

You can also change the jump movement (airborne) time with "duration" or "frame". The initial value was too fast, so I tried to lengthen it.

If it is delicate to swing the weapon after landing each time, you can also write as follows.
```
<D-Setting:NoStep> // 前進しない
<D-Motion:near&jump&attack/> // 対象へジャンプ＆接近＆武器振り
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200315_jumpSlash2.gif)

This one is faster, isn`t it?
Actually, you can adjust the timing more finely, but since it is a basic edition, it is in such a place.

## repeat, interval

If you specify "repeat", you can repeat the operation.
Specify the interval with "interval".
```
<D-Animation:randomAll/> // アニメーションの大量生成
<D-Motion:attack> // 武器振り
repeat = 5 // ５回繰り返す
interval = 5 // 繰り返し間隔
</D-Motion>
```
![Image](https://newrpg.up.seesaa.net/image/20200315_repeatSlash.gif)


The repeat interval specified by interval is the length based on the animation frame.
Even if it is in the middle of a motion, it will be interrupted and the next motion will be started.

If no interval is specified, the repeat interval is automatically adjusted to the length of movement or motion.
If both are specified, the longer one will be given priority.
However, loop motions such as walking are not covered.

## motionDuration

Adjust and shorten the length of the motion. This is in 1/60 second units.
Omit the interval and leave it to the length of the motion.
The initial value of the motion length is 12/60 seconds.
In the following, double speed 6/60 seconds is specified.
Since the motion is a set of 3 patterns, it actually takes 18/60 seconds, which is 3 times that.
```
<D-Animation:randomAll/> // アニメーションの大量生成
<D-Motion:attack> // 武器振り
repeat = 5 // ５回繰り返す
motionDuration = 6 // モーション時間
</D-Motion>
```
![Image](https://newrpg.up.seesaa.net/image/20200315_repeatSlash2.gif)

Weapon swings are faster and motion is no longer interrupted.
Basically, I think this is more stable than using interval.

## motionFrame

As with movement, you can specify the length of motion in animation frame units.
This is convenient if you want to match the animation.
```
<D-Animation:randomAll/> // アニメーションの大量生成
<D-Motion:attack> // 武器振り
repeat = 5 // ５回繰り返す
motionFrame = 2 // モーション時間
</D-Motion>
```
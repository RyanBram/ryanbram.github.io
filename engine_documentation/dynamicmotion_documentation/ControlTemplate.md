# Control System Template
This page is part of the description of the Dynamic Motion plug-in .

I will introduce the control system template.


## target

Change the target of motion to the target of skill.
Basically, it is used in combination with other templates.
```
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:target&stepBack/> // 対象が後退
<D-Motion:target&home/> // 対象が戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200318_knockBack.gif)

I tried to make the attacked target retreat.

## every
Execute for each target
Repeat the motion for the skill target.
For example, if there are 4 skill targets, the motion is repeated 4 times.

Also, the repetition interval is specified by "nextDelay".
This value is in animation frame units.
By matching the animation and spacing, it becomes a natural action.
```
<D-Motion:every&attack> // 全対象に武器振り
motionFrame = 2 // 2*3=6フレーム
nextDelay = 6 // 繰り返し間隔
</D-Motion>
<D-Animation>
nextDelay = 6 // 繰り返し間隔
</D-Animation>
```
![Image](https://newrpg.up.seesaa.net/image/20200316_midare.gif)

The above is an example combined with a random multiple attack, but it works fine with a whole attack.

There are some tricks to make it look natural, such as adjusting the motion time.
*) MotionFrame is the frame time of one pattern. Actually, it takes time for x3 patterns.

## Wait

Wait for the operation by combining with other templates.
```
<D-Motion:attack&wait/> // 武器振りを待つ
```
![Image](https://newrpg.up.seesaa.net/image/20200320_wait.gif)

By the way, many mobile templates include weighting from the beginning.
Basically, you don't have to bother with it.

## noWait

By concatenating after other templates, the weight of the operation is skipped.
Combine it with a mobile template that has weights from the beginning.
```
<D-Motion:near&noWait/> // 接近を待たずに
<D-Animation:shotRandom/> // アニメを再生
```
![Image](https://newrpg.up.seesaa.net/image/20200320_noWait.gif)

...... Well, in the above example, it's the same even if you run the animation first.

## delay

Wait for the previous motion or animation to work.
```
<D-Motion:jump/> // ジャンプ
<D-Motion:delay&near/> // ジャンプを待って移動
```
![Image](https://newrpg.up.seesaa.net/image/20200320_delay.gif)

Only the weight and the specified timing are different, so use the one you like.

## noDelay

Disable the delay by concatenating it after the other template.
...... I prepared it in the flow, but the delay is attached from the beginning only for the "return" type, so it is not very useful.
Maybe if you want to return multiple butlers at the same time.
```
<D-Motion:near&jump&attack/> // 接近＆ジャンプ＆武器振り
<D-Animation/> // アニメーション
<D-Motion:target&stepBack/> // 対象が後退
<D-Motion:target&return/> // 対象が元の位置へ
<D-Motion:return&noDelay/> // 自分もディレイなしで元の位置へ
```
![Image](https://newrpg.up.seesaa.net/image/20200320_noDelay.gif)

## ifOther

Execute only when the target of the skill is other than the actor who performs the action.

## ifSelf

Only execute if the target of the skill is the actor who performs the action.

As for how to use it together, for example, you can use it like this.
```
<D-Setting:NoStep> // 前進しない
<D-Motion:near&mirror&ifOther/> // 対象が他者なら反転して接近
<D-Motion:stepForward&ifSelf/> // 対象が自分なら一歩前進
<D-Animation/>
<D-Motion:return&ifOther/> // 対象が他者なら戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200318_ifOther.gif)

If the target is a companion, move forward and face each other to use the item.
However, if the target is yourself, it is unnatural because you turn to the back on the spot.



Therefore, if I am the target, I simply go one step further and use it.

## ifActor, ifEnemy

Each is executed only when the action subject is an actor or enemy.
Please use it when you want to divide the processing between your allies and enemies.

## soon

Execute each instruction immediately (1/60 seconds).
For example, when you want to immediately reflect changes in transparency, angle, and motion.
It can also be used for teleportation.
```
<D-Motion:near&soon/> // 接近＆即時
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return&soon/> // 戻る＆即時
```
![Image](https://newrpg.up.seesaa.net/image/20200329_soon.gif)
# Sample Technique 1
This page is DynamicAnimation and DynamicMotion is part of the description of the plug-in.

I will introduce sample techniques.
First of all, the ones that are not very complicated.
You can copy and paste it into the memo field of the skill (item).
You can use it as it is or modify it.

The ones that have already been introduced on another page are also summarized here.

## Dash Attack

First of all, from the basic form.
I think that just copying this and changing the animation will create a certain atmosphere.

![Image](https://newrpg.up.seesaa.net/image/20200314_NoStep.gif)

```
<D-Setting:NoStep> // 自動前進禁止
<D-Motion:near/> // 対象へ接近
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```

## Jump Attack

Since it's a big deal, I'll stick to timing adjustment.

![Image](https://newrpg.up.seesaa.net/image/20200321_jumpAttack.gif)

```
<D-Setting:NoStep> // 自動前進禁止
<D-Motion:near&jump> // 接近＆ジャンプ
arcY = -200 // 高度
frame = 8 // 移動フレーム数
</D-Motion>
<D-Motion:attack> // 武器振り
delay = -4 // 着地の４フレーム前
</D-Motion>
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```
The point is the "attack" part.
By specifying a negative value for delay, the weapon swing is started before landing.
This adjusts the weapon to swing down while descending.

## Rolling Attack

In cooperation with the effect range expansion plug-in , it attacks on a straight line.
Since the actors position are separated, it is more suitable for using against the enemy.

![Image](https://newrpg.up.seesaa.net/image/20200321_rolling.gif)

```
<RangeEx:line> // 直線を対象に
<D-Setting:NoStep> // 自動前進禁止

<D-Motion:roll&pierce>
frame = 8 // 移動時間
rotation *= 4 // 回転数
</D-Motion>

<D-Animation>
delay = 6 // ６フレーム待つ
</D-Animation>

<D-Motion:return/> // 戻る
```
The number of rotations is specified by "rotation". By default, it rotates forward, but if you want to rotate in the reverse direction, apply a minus.

## Meteor Sword
Use a large amount of animation and repeat weapon swings to make it look like it.

![Image](https://newrpg.up.seesaa.net/image/20200321_ryuusei.gif)

```
<D-Animation:randomAll/> // アニメーションの大量生成
<D-Motion:attack> // 武器振り
repeat = 5 // ５回繰り返す
motionFrame = 1 // 1*3=3フレーム
</D-Motion>
```
Please note that a single motion takes 3 patterns of time. "MotionFrame = 1" is the time of the 3 frame part of the animation. It's repeated 5 times, so it's a total of 15 frames.

## Midare Uchi

It is the familiar "Barrage" in the FF series.
The range is "Random 4 enemies".

![Image](https://newrpg.up.seesaa.net/image/20200316_midare.gif)

```
<D-Motion:every&attack> // 全対象に武器振り
motionFrame = 2 // 2*3=6フレーム
nextDelay = 6 // 繰り返し間隔
</D-Motion>
<D-Animation>
nextDelay = 6 // 繰り返し間隔
</D-Animation>
```
It's a little complicated, but you can also display the damage for each hit.
*) It has been greatly simplified by the damage type template of Dynamic Animation ver1.09.

![Image](https://newrpg.up.seesaa.net/image/20200321_midare2.gif)

```
// 対象毎に武器振り
<D-Motion:every&attack>
motionFrame = 2 // 2*3=6フレーム
nextDelay = 6 // 繰り返し間隔
</D-Motion>

// 対象毎にアニメーション＆ダメージ
<D-Animation:damage>
nextDelay = 6 // 繰り返し間隔
</D-Animation>
```
The difficulty is that the timing is off due to the weight at the time of defeat.
Damage processing is performed after the animation is displayed by using the damage type template.

## Continuous Attack (immortal)

Use the immortal setting to prevent enemies from dying during a series of attacks.
In the example below, the number of consecutive skills is set.

![Image](https://newrpg.up.seesaa.net/image/20200511_immortal.gif)

```
// 不死身設定
<D-Setting:Immortal>

// 攻撃毎に武器振り
<D-Motion:every&attack>
motionFrame = 2 // 2*3=6フレーム
nextDelay = 6 // 繰り返し間隔
</D-Motion>

// 攻撃毎にアニメーション＆ダメージ
<D-Animation:damage>
nextDelay = 6 // 繰り返し間隔
</D-Animation>
```
`<D-Setting: Immortal>` will immortalize the target so that it will not die until the skill is completed.
*) Please change the immortal state from the initial setting as much as possible. ( Explanation )
In addition, even in the middle of the skill, if you execute the following command, you can cause death processing.
(It is also included in the return type from the beginning.)
```
<D-Motion>
damageAll = true // 全体ダメージ処理
</D-Motion>
```
This time, the range is set to a single unit, but it works fine even if you use "4 random enemies".

## Throw

Please throw like this.

![Image](https://newrpg.up.seesaa.net/image/20200321_throw.gif)

```
<D-Motion:swing/> // 振る
<D-Animation:shot> // アニメーションを飛ばす
delay = 2 // タイミング調整
sx = a.x - a.width/2 * mirroring // 左寄り
sy = a.y - a.height // 頭上
arrival = 5 // 到達フレーム
</D-Animation>
```
The arrival frame must match the content of the animation.

## Friendly Skill

For recovery skills and items.

![Image](https://newrpg.up.seesaa.net/image/20200318_ifOther.gif)

```
<D-Setting:NoStep> // 前進しない
<D-Motion:stepForward&ifSelf/> // 対象が自分なら一歩前進
<D-Motion:near&mirror&ifOther/> // 対象が他者なら反転して接近
<D-Animation/>
<D-Motion:return&ifOther/> // 対象が他者なら戻る
```
If the target is a friend, move to the front and then face each other to display the animation.
If you are the target, you only have to take a step forward.

## Dual Wield

Normally, when this plugin is applied to a normal attack, the second shot of dual wield will not be displayed.
However, depending on the setting, it is possible to produce a second shot.

![Image](https://newrpg.up.seesaa.net/image/20200330_dualAttack.gif)

```
<D-Setting:NoStep> // 自動前進禁止
<D-Motion:near/> // 接近

// 一撃目
<D-Motion:attack/>
<D-Animation:wait>
id = a._battler.attackAnimationId1() // 一撃目のID
</D-Animation>

// 二撃目
// ※アクターかつ二撃目のアニメーション有
<D-Motion:attack>
condition = a._actor && a._actor.attackAnimationId2()
weaponType = a._actor.weapons()[1].wtypeId // 二撃目の武器タイプ
</D-Motion>
<D-Animation>
condition = a._actor && a._actor.attackAnimationId2()
id = a._battler.attackAnimationId2() // 二撃目のID
</D-Animation>

<D-Motion:return/> // 戻る
```
The condition is specified in "condition", and it is displayed only when the second shot is valid.
If it is not dual wield, it will attack once normally.
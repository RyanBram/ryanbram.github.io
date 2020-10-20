# Sample Technique 2
This page is DynamicAnimation and DynamicMotion is part of the description of the plug-in.

I will introduce sample techniques.
I'm going to do something a little complicated.
You can copy and paste it into the memo field of the skill (item).
You can use it as it is or modify it.

## Explosive Kick
It collides with the enemy with a rider kick-like behavior.

`id=107（無属性/単体2）)` is used for the animation, but you can use it as you like.

![Image](https://newrpg.up.seesaa.net/image/20200323_bakuretsu.gif)
```
// 自動前進しない
<D-Setting:NoStep>

// 回転しながら浮上
<D-Motion:jump&roll&wait>
frame = 8
rotation *= 4
airY = -200 // 空中Ｙ座標
ex = sx - 50 * mirroring
</D-Motion>

// 体を傾けて衝突
<D-Motion:crash>
frame = 3
rotation = (Math.PI * 2) / 6 // 360/6度
</D-Motion>

// 角度を戻す＆しゃがむ
<D-Motion>
rotation = 0
motion = abnormal // 瀕死ポーズ
frame = 10
</D-Motion>

// アニメーション
<D-Animation/>

// 対象が吹っ飛ぶ
<D-Motion:jump&target>
ex = sx - 500 * mirroring
wait = 10
</D-Motion>

// 対象元の位置へ
<D-Motion:jump&home&target/>

// 戻る
<D-Motion:return/>
```


## Zoom Attack

While attacking, gradually zoom toward the target.

*) The description has been simplified due to the template of zoom processing. (2020/03/29)

![Image](https://newrpg.up.seesaa.net/image/20200329_zoomB.gif)

```
<D-Motion:near&zoomB/> // 対象にズーム
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return&zoomOff/> // ズーム解除
```
If you want to zoom to the action subject, use `zoomA`.
Note that these processes automatically track even if the zoom target is moving.

## Sliding

Spin the enemy by sliding.

![Image](https://newrpg.up.seesaa.net/image/20200324_sliding.gif)

Set the position of the animation to the skill to `foot`.
Also, an animation for sand smoke is required separately. The example below uses the `Earth1` pattern. The position is `foot`. It is natural to set the composition method to `Normal`.

![Image](https://newrpg.up.seesaa.net/image/20200324_sliding_smoke.JPG)

```
// 90度回転して体を地面へ
<D-Motion:wait>
duration = 1
airY = a.height/3
rotation = (Math.PI * 2) / 4
</D-Motion>

// 砂煙のアニメーション
<D-Animation:self>
id = XXX // ←ここに砂煙用のIDを指定
repeat = 5
</D-Animation>

// 対象の左へ
<D-Motion:pierce>
frame = 5
wait = 4
ex = defaultX - 100 * mirroring
</D-Motion>

<D-Animation/> // アニメーション

// 敵がスピン
<D-Motion:target&roll&jump>
frame = 5
rotation *= 3
arcY = -100
</D-Motion>

// 角度と位置を戻す
<D-Motion:wait>
delay = 1
duration = 1
airY = 0
rotation = 0
</D-Motion>

// しゃがんで待つ
<D-Motion:wait>
motion = abnormal // 瀕死ポーズ
frame = 5
</D-Motion>

<D-Motion:return/> // 戻る
```

## Ultra Jump

Randomly tramples the enemy.
In the example, the range is set to `Random 4 enemies`, but it works fine even if you use `Whole enemies`.

![Image](https://newrpg.up.seesaa.net/image/20200325_ultraJump.gif)

Aim at the head by setting the animation set for the skill to `overhead`.
In the example, `2: Strike / Effect` is changed overhead.
```
<D-Setting:NoStep> // 自動前進禁止

// 着地に合わせてアニメーション表示
<D-Animation:damage>
delay = 7 // 最初の着地までのフレーム
nextDelay = 7 // 滞空時間に間隔を合わせる
</D-Animation>

// 対象ごとにジャンプで踏む
<D-Motion:crash&jump&every>
ey += b.height/8 // 少し下を狙う
arcY = -200
motion = victory // 勝利ポーズ
frame = 7 // 移動（滞空）時間
nextDelay = 7 // ７フレーム間隔
playSe = Jump1 // ジャンプの効果音
wait = auto
</D-Motion>

// 戻る
<D-Motion:return>
arcY = -200
damageAll = false // ダメージ表示は個別に任せる
</D-Motion>
```

By applying this, you can also create techniques such as hitting the body in order.
Please note that timing adjustment is a little difficult. Please be careful about the deficit part.

## Cross Slash

Perform a slash while passing by the target.
The angle of the slash also changes depending on the angle with the target.

![Image](https://newrpg.up.seesaa.net/image/20200331_harainuke.gif)

Make a left-facing slash as shown below.
This is possible by rotating `6: Slash / Physical` by 45 degrees in a batch setting.

![Image](https://newrpg.up.seesaa.net/image/20200331_harainuke_animation.JPG)

```
<D-Setting:NoStep> // 自動前進禁止

// 対象の向こうまで移動
// Ｘ座標だけ指定すれば、Ｙ座標も自動計算
<D-Motion:pierce&attack>
frame = 5
ex = defaultX - 150 * mirroring // 対象の左150pxまで移動
</D-Motion>

// 対象との位置関係でアニメーション角度変更
<D-Animation>
delay = 2
wait = auto
rotation = da.startRotation(Math.atan2(a.y - a.height/2 - defaultY, a.x - defaultX))
</D-Animation>

<D-Motion:return/> // 戻る
```

In the red part, we are doing various fine work.

da.startRotation () is the author's own function that keeps the angle at the start.
Math.atan2 () finds the angle between the subject (a) and the object (defaultX, Y).
This is a standard function of JavaScript.

*) It may be a little unclear, but don't worry too much as you can copy it.

## Gale Sword

Cut it while passing by the target.
Random slashing is played while changing the angle.
The animation set for the skill is a different color tone of `6: Slash / Physics`.

![Image](https://newrpg.up.seesaa.net/image/20200403_sippuu.gif)

```
<D-Setting:NoStep> // 自動前進禁止

// 対象とすれ違いながら武器振り
<D-Motion:pierce&attack>
frame = 5
ex = defaultX - 150 * mirroring
</D-Motion>

// 武器の止めポーズ
<D-Motion:attack2>
delay = 2
</D-Motion>

// 角度を変えながら斬撃リピート
<D-Animation>
delay = 3
repeat = 10
rotation = (Math.PI * 2) * da.startRandom()
</D-Animation>

<D-Motion:return/> // 戻る
```

Basically, it is a diversion of `payment`.
By randomly changing the `rotation`, we are trying to launch slashes from various angles.
`Math.PI * 2` means 360 degrees, and `da.startRandom ()` is a function that takes a value between 0 and 1.
In other words, it means 0 to 359 degrees.

## Nerikiken (single)

*) Dynamic Motion ver1.021 or later is required.
Hit while attracting the enemy.
The skill is set to just a batting animation.
In addition, an animation for suction is required.
In the example, based on `102: Darkness / Single 2`, the composition method is changed to `Addition` in the batch setting.

![Image](https://newrpg.up.seesaa.net/image/20200406_renkiken1.gif)

```
// 自身に吸引アニメを表示
<D-Animation>
id = 102 // ←ここに吸引アニメのIDを指定
sx = a.x
sy = a.y - a.height/2
</D-Animation>

// 対象を引き寄せる
<D-Motion:target&wait>
frame = 5 // 引き寄せ時間
ex = subject.x - (subject.width/2 + a.width/2) * mirroring
ey = subject.y - subject.height/2 + a.height/2
</D-Motion>

// 殴るアニメとモーション
<D-Animation:follow/>
<D-Motion:thrust/>

// 対象をhomeへ戻す
<D-Motion:target&home>
delay = 1 // 殴り初めから吹っ飛ぶまでの時間差
frame = 2 // 吹っ飛び時間
</D-Motion>
```
`Subject` always means the actor of the skill.
It is confusing, but if you change the motion target, `a` becomes the motion target person.

## Nerikiken (all)

*) Dynamic Motion ver1.021 or later is required.
Speaking of Nekiken, it is a whole skill in the first place. Of course I have prepared it properly.
*) The original story is Romancing SaGa 3.

![Image](https://newrpg.up.seesaa.net/image/20200406_renkiken.gif)

```
// 自身に吸引アニメを表示
<D-Animation>
id = 102 // ←ここに吸引アニメのIDを指定
nextDelay = 4
sx = a.x
sy = a.y - a.height/2
</D-Animation>

// 対象を引き寄せる
<D-Motion:target>
frame = 5
performerDelay = 4
ex = subject.x - (subject.width/2 + a.width/2) * mirroring
ey = subject.y - subject.height/2 + a.height/2
</D-Motion>

// 殴るアニメ（対象を追尾）
<D-Animation:follow>
delay = 5
nextDelay = 4
</D-Animation>

// 殴るモーション（対象毎）
<D-Motion:thrust&every>
delay = 5
nextDelay = 4
motionFrame = 1
</D-Motion>

// 対象をhomeへ戻す
<D-Motion:target&home>
delay = 6
frame = 2
performerDelay = 4
</D-Motion>
```

The point is to match the values ​​of `performerDelay` and `nextDelay`. This is the time difference for the processing of each target.
It's a little confusing, but `performerDelay` is the time difference when there are multiple motion targets.
`NextDelay` is `time difference to display animation for each target` and `time difference for action subject to execute motion for each target`.

## Illussion Sword

*) Dynamic Motion ver1.03 or later is required.

Cut into pieces while splitting up.

![Image](https://newrpg.up.seesaa.net/image/20200410_bunshin.gif)
```
<D-Setting:NoStep>
<D-Motion:near/>

// 左右に分身しながら武器振り
<D-Motion:attack>
repeat = 5
addX = (t % 4 < 2) ? -(b.width + a.width) : 0
scaleX = (t % 4 < 2) ? -1 : 1 // 左右反転
motionFrame = 1
frame = 3
</D-Motion>

// 右から攻撃アニメ
<D-Animation:random>
repeat = 8
interval = 2
</D-Animation>

// 左から攻撃アニメ
<D-Animation:random&wait>
repeat = 8
delay = 1 // １フレームずらす
interval = 2
rotation = -Math.PI/2 // 90度回転
</D-Animation>

<D-Motion:return/>
```
The position is changed momentarily every 2/60 seconds in the red part.
`ScaleX` is a value that means the width of the butler, but if you set the value to `-1`, it will be flipped horizontally. Inversion is also possible with `mirror = true`, but if you want to change it in real time, you can use `scaleX`.

## Transformation

Change the image of Butler.
It can be used for literal transformation techniques, but it can also be used for adding motion patterns.
Also, the enemy can change the image in the same way.

![Image](https://newrpg.up.seesaa.net/image/20200510_trans.gif)

```
// グラフィックを変更して接近
<D-Motion:near>
battlerImage = Actor1_1
</D-Motion>

<D-Motion:attack/>
<D-Animation/>

// グラフィックを戻して元の位置へ
<D-Motion:return>
battlerImage = ""
</D-Motion>
```
Change the character to the specified image such as `battlerImage = Actor1_1`.
To return it, enter a blank character such as `battlerImage =""` and it's OK.

By the way, this image change is a temporary effect only during battle.
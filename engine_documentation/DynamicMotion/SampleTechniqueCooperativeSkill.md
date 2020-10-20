# Sample Technique Cooperative Skill

This page is DynamicAnimation and DynamicMotion is part of the commentary.

*) DynamicAnimationMZ, DynamicMotionMZ is also valid.

Romance in romance - I will introduce a sample technique of the combined system.
As a premise, it is assumed to be used in combination with the following plug-ins.

[NRP_CombinationSkill](http://newrpg.seesaa.net/article/474570191.html)

Introduction of this, it will be possible to acquire actors who will participate in the union technique with the "$ actor (id)" and "$ cs (id)" functions.

## X-Slash
Slash the enemy so that the two actors intersect.

![Image](https://newrpg.up.seesaa.net/image/20200411_XSlash.gif)

The following is an example with ID = 1 (Alex) and 2 (Brian).
```
<CS_Actors:1,2>
<D-Setting:NoStep&Sync> // 並列モードで実行

// アレックス：対象の中心を基準に移動
<D-Motion:crash>
performer = $cs(1) // 1: アレックス
ex += 120 // 目標から右に120
ey -= 120 // 目標から上に120
frame = 5
</D-Motion>

// ブライアン：対象の中心を基準に移動
<D-Motion:crash>
performer = $cs(2) // 2: ブライアン
ex += 120 // 目標から右に120
ey += 120 // 目標から下に120
frame = 5
wait = 10 // 少しだけ待つ
</D-Motion>

// 二人同時に敵の向こう側まで移動
<D-Motion:pierce&attack>
performer = [$cs(1),$cs(2)] // 二人
ex = defaultX - 120 // 対象から左に120
</D-Motion>

// Ｘ字アニメーション
<D-Animation/>
<D-Animation:wait>
rotation = Math.PI*2 / 4 // 90度回転
</D-Animation>

// 二人で戻る
<D-Motion:return>
delay = 5
performer = [$cs(1),$cs(2)] // 二人
</D-Motion>
```

There are many things to explain, but I will cover them one by one.

"<D-Setting: Sync>" on the second line is the parallel execution mode ( explanation ).
This will ignore the default weights and delays in the template.
Mobility templates such as "near" and "crash" usually wait for Battler to move.
If you specify this Sync, you will not have to wait.
This is useful when moving multiple butlers.

"Performer = $ cs (1)" means that the first participant is targeted for motion.
It's the function set in the previous explanation.

It is also possible to target multiple people at the same time, such as "performer = [$ cs (1), $ cs (2)]".
By the way, the "pierce" type moves to the other side of the target while keeping the angle.
That's why they move to another point even though they are ordering together.
Convenient.

The "X-shaped animation" part is playing two "7: Slashing / Effects" at different angles.
Of course, you can also make an X-shaped slashing animation normally.

## All Out Strike (2020/5/2)

We will make a total attack with everyone.

![Image](https://newrpg.up.seesaa.net/image/20200502_AllAttack.gif)

```
// 全員を合体技の対象に
<CS_Battlers:1,2,3,4>

// メッセージ用（先頭の名前＋達）
<CS_UserName:$cs(1).name() + "達">

// 自動前進禁止＆非同期
<D-Setting:NoStep &Sync>

// 接近
<D-Motion:near>
performer = $cs() // 全員対象
performerDelay = 2
ey += a.height * (-1.5 + a._battler.index()) // 縦位置調整
frame = 3
wait = 3
</D-Motion>

// 武器振り
<D-Motion:attack>
performer = $cs()
performerDelay = 2
</D-Motion>

// 通常攻撃のアニメーション
<D-Animation>
repeat = 4
id = $cs(r + 1).attackAnimationId1() // 通常攻撃アニメ
interval = 2
wait = 5
</D-Animation>

// 戻る
<D-Motion:return>
performer = $cs()
performerDelay = 2
damageAll = false // 全員が終わるまでダメージ表示禁止
</D-Motion>
```
All participants can be targeted for motion with "performer = $ cs ()".
"Ey + = a.height * (-1.5 + a._battler.index ())" adjusts the destination according to the order of the characters.
"DamageAll = false" is for turning off the damage display function that comes with the return type from the beginning.
If you do not cut it, the damage will be displayed when the first person returns.

I wondered if I could do something like a persona in combination with the "forced combat action" area ...

## Magic Combo
Perform magic by multiple actors.

![Image](https://newrpg.up.seesaa.net/image/20200907_bomb.gif)

```
// 参加者指定
<CS_Actors:2,6>

// 前進禁止
<D-Setting:NoStep>

// 全員一歩前へ
<D-Motion:stepForward>
performer = $cs()
performerDelay = 0 // 各人時間差
</D-Motion>

// 全員魔法モーション
<D-Motion:spell>
performer = $cs()
performerDelay = 0 // 各人時間差
</D-Motion>

// 全員発動アニメーション
<D-Animation:spell>
target = $cs()
nextDelay = 0 // 各人時間差
</D-Animation>

// アニメーション
<D-Animation/>
```
The above is for 2 people, but you can use it as it is for 3 or 4 people just by changing the value of <CS_Actors: 2,6> at the beginning.
After that, set the animation as you like.

## Simultaneous Shooting
*) NRP_CombinationSkill ver1.302 is required.

Everyone shoots all at once.
The animation is a reduced version of "82: Water / Single 2".
I'm also playing with the animation triggered by <D-Animation: spell>.
As usual, change to your favorite animation. Don't forget the value of the landing frame (arrival).

![Image](https://newrpg.up.seesaa.net/image/20200504_bouble.gif)

```
<CS_Battlers:1,2,3,4>
<CS_UserName:$cs(1).name() + "達">

// 前進禁止
<D-Setting:NoStep>

// 全員一歩前へ
<D-Motion:stepForward>
performer = $cs()
performerDelay = 1 // 各人時間差
</D-Motion>

// 全員魔法モーション
<D-Motion:spell>
performer = $cs()
performerDelay = 1 // 各人時間差
</D-Motion>

// 全員発動アニメーション
<D-Animation:spell>
target = $cs()
nextDelay = 1 // 各人時間差
</D-Animation>

// 一斉射撃
<D-Animation:shotRandomAll>
repeat = 60
interval = 1/2
sx = $cs(r%4+1).x
sy = $cs(r%4+1).y - $cs(r%4+1).height/2
arrival = 7
</D-Animation>
```

`$cs(r%4+1)` refers to the coordinates of the participants in the coalescing technique.
`r%4+1` means the remainder of dividing the number of repeats (starting from 0) by 4.
In other words, by referring to `$cs(1)～$cs(4)` while patrolling, animation is fired from each position.
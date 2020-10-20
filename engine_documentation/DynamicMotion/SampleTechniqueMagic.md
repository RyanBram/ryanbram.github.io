# Sample Technique - Magic
This page is DynamicAnimation and DynamicMotion is part of the description of the plug-in.

I will introduce some magical sample techniques.

## Summon

*) Screen type template required. (Added in Dynamic Animation ver1.06)
Deletes the actor and displays the whole animation.

![Image](https://newrpg.up.seesaa.net/image/20200420_summon.gif)

```
// 全員透明化
<D-Motion:invisible>
performer = a.friendsUnit().members()
</D-Motion>

// 画面全体にアニメーション
<D-Animation:screen&wait/>

// 透明化解除
<D-Motion:visible>
performer = a.friendsUnit().members()
</D-Motion>
```
By "performer = a.friendsUnit (). members ()", the whole actor is targeted.
*) It is also valid for "$ gameParty.members ()", but if it is "a.friendsUnit (). members ()", it will work even if the user is an enemy.

## Vortex of Flame

Causes a flame that wraps around the subject.
The display priority change function that is possible with DynamicMotion ver1.04 (DynamicAnimation ver1.07) or later is used.
The animation is "67: Flame / Single 2", but please change it to your liking.

![Image](https://newrpg.up.seesaa.net/image/20200509_fireVortex.gif)

```
<D-Animation:vortex> // 渦型
position = 2
repeat = 100
interval = 1/4
scaleX = 0.5
scaleY = 0.5
radiusX *= 2 + b.width/2 // Ｘ半径
radiusY *= 1 // Ｙ半径
radX *= 5 // 回転角度Ｘ
radY *= 5 // 回転角度Ｙ
z = this.y < b.y ? b.z - 1 : this.z // Ｚ座標
</D-Animation>
```
　Ｘ半径（radiusX）に『b.width/2』を足しているのは、最終的な半径を対象の横幅に合わせるためです。そっちのほうが炎に包まれた感じがしてカッコいいからですが、その辺はお好みで調整してください。

　『z = this.y < b.y ? b.z - 1 : this.z』はＺ座標（＝表示優先度）の変更処理です。「アニメーションの位置が対象より上の時はＺ座標－１、それ以外は元の値」を設定することで背面表示しています。

　※『z = b.z』でよさそうな気がしますが、なぜかアニメーションの一部描画が止まるバグが発生しました。解決できそうにないのでこれを使ってください。


## Whirlpool

Rotate the enemy around the center of the enemy team.
We already have a sample of a simple circumferential motion, but this one is for general attacks.
The skill animation just repeats the "Darkness2" pattern.
The position is "screen".

![Image](https://newrpg.up.seesaa.net/image/20200512_whirlpool.gif)

```
<D-Animation>
sy = defaultY + 50 // 位置を下寄りに
z = 0 // 対象より下に表示
</D-Animation>

<D-Motion:target&revolve>
frame = 40
performerDelay = 2 // 時間差
radiusX *= 2 // Ｘ半径
radiusY *= 1 // Ｙ半径
radX *= 4 // Ｘ回転角度
radY *= 4 // Ｙ回転角度
dx = sx + (screenX - sx) * (Math.sin(t/et * Math.PI))
dy = sy + (screenY + a.height/2 - sy) * (Math.sin(t/et * Math.PI))
</D-Motion>
```

The target is rotated by the revolve type function.
If you do not specify a time difference value for "performerDelay", enemy characters will overlap.

The most esoteric is the formula for "dx, dy" ... This is a formula in which the enemy character moves toward the center of the enemy team and then returns to its original position.
Since sin changes the value from 0-> 1-> 0 every 90 degrees, we use that property to move back and forth.
The whole operation is realized by adding the rotation component to this formula.

## Psychokinesis

Rocks that appeared at random positions are moved to random positions. Hit the target from there.
A keep type template is used to hold a random position.

In addition, the definition of the continuation type update on 2020/05/09 Since it has, there is a possibility that does not work and does not reflect.

![Image](https://newrpg.up.seesaa.net/image/20200525_psychokinesis.gif)

```
// 術者前方にランダムで砂煙
<D-Animation>
id = XX // 砂煙のアニメ
position = 1
repeat = 15
sx = a.x - 100
sy = a.y - 60
sxRandom = 50
syRandom = 20
</D-Animation>

// 砂煙の発生位置を引き継いで岩石登場→対象の上空へ移動
<D-Animation:keep>
id = XX // 岩石の停止アニメ
delay = 1
ex = b.x
ey = 50
exRandom = 200
eyRandom = 50
arrival = 8 // 対空地点に到達するフレーム
</D-Animation>

// 対象の上空から対象へ岩石が殺到
<D-Animation:shotRandom&keep>
id = XX // 岩石の衝突アニメ
arrival = 5
</D-Animation>
```

The keep type has the effect of copying the end point coordinates of the previous `<D-Animation>`` to the start point.
In addition, information such as the number of repetitions is automatically inherited.
The point is to join to the back side with &, like `<D-Animation: shotRandom & keep>``.
This is because shotRandom itself has the information.
In this case, the setting of the template on the back side has priority.

Also, this skill requires 3 animations.

- Sand Smoke Animation: A simple sand smoke created with Earh1. Same as the one used for sliding .
- Stopping Rocks Animation: This is a copy of 25 frames of Earth3 rocks.
- No changes are required except to change the composition method to "normal".
- Rock collision animation: ↑ This is an animation in which rocks break from the 6th frame.
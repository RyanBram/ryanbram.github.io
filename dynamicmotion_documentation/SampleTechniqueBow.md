# Sample Technique - Bow
This page is DynamicAnimation and DynamicMotion is part of the description of the plug-in.

I will introduce the sample technique of the bow system.

As a premise, it is assumed that you understand the basic usage of Dynamic Animation .
If this is not the case, it would be easier to understand if you can see only the upper part of the link (around the arrival frame).

*) The sample on this page is recommended for " DynamicAnimation ver1.04 or later".
In addition, the "lookCourse" type template must be added to the plugin parameters.
(Reference: Template definition list )

Arrows are not included in the standard material of Tsukuru MV, but they are included in the bow attack pattern.
I extracted it so that it can be used as an animation. I also removed the arrow from the bow.
*) Due to the rules of the Maker series, only regular MV users can use it.

Animations (img / animations)

*) With a piercing pattern

![Image](https://newrpg.up.seesaa.net/mv/Arrow.png)

Weapon (img / system)

*) Except for the upper right bow

![Image](https://newrpg.up.seesaa.net/mv/Weapons1.png)

Now create an arrow animation and you're ready to go.
Even if you say creation, the movement is controlled by a plug-in, so you can simply paste the pattern in the center of the screen.
The size is too small in the initial state, so it may be better to enlarge it to about 150%.

![Image](https://newrpg.up.seesaa.net/image/20200328_arrow.JPG)

In the example, I tried to make the 1st to 4th frames the 1st pattern and the 5th to 8th frames the 2nd pattern (the one that stabbed).

## Bow Attack

First, shoot an arrow normally.
If you want to use it as a normal attack, you can link it to the weapon with the official plugin "WeaponSkill.js".
There is a problem of what to do with enemy characters who do not have weapons.

![Image](https://newrpg.up.seesaa.net/image/20200329_arrow.gif)
```
<D-Motion:attack/>
<D-Animation:shot&lookCourse>
sx -= 10 * mirroring // 始点Ｘ座標
sy += 10 // 始点Ｙ座標
arrival = 4 // 到達フレーム
</D-Animation>
```

Change the start point position and arrival frame according to your own settings.
I also added a hit effect as appropriate, but please feel free to use that area.

## Rapid Shoot

Shoot arrows rapidly.

![Image](https://newrpg.up.seesaa.net/image/20200329_rensya.gif)
```
// １０連射（モーション）
<D-Motion:attack>
repeat = 10 // 繰返回数
interval = 1 // 間隔
motionFrame = 1/3 // interval/3
</D-Motion>

// 矢
<D-Animation:shotRandom&lookCourse>
repeat = 10 // 繰返回数
interval = 1 // 間隔
sx -= 10 * mirroring // 始点Ｘ座標
sy += 10 // 始点Ｙ座標
arrival = 4 // 到達フレーム
</D-Animation>
```

You're just repeating the "arrow".
If you change the value of "repeat", the number of arrows will also change. At that time, make sure that the values ​​of "repeat" and "interval" of the motion and animation match.

## Arrow Rain

Shoot an arrow in the sky and attack with an arrow that falls like rain.
The animation of the arrow is changed so that it sticks to the target in 12 frames.
Since there is a flight time, it is more natural to make it longer.

![Image](https://newrpg.up.seesaa.net/image/20200328_arrowRain.gif)
```
// 弓を引く
<D-Motion:attack>
repeat = 40
interval = 1/2
motionFrame = 1/2/3 // interval/3
</D-Motion>

// 矢連射
<D-Animation:arcRandomAll&lookCourse&wait>
repeat = 40
interval = 1/2
sx -= 10 * mirroring // 弓に位置を合わせる
sy += 10 // 弓に位置を合わせる
eyRandom = 130 // 終点Ｙ座標ランダム幅
arrival = 12 // 到達フレーム
arcY = -500 // 放物線の高さ
</D-Animation>
```
"EyRandom = 130" is to narrow the random width of the end point Y coordinate than the standard. At the standard value, it felt a bit strange because it stuck in the space above the background.

## Wind Dirt

Fires wind arrows in rapid succession.
The orbit takes a parabola of random height.
Furthermore, the number of arrows increases for every 20 magical power (mat) increase.

![Image](https://newrpg.up.seesaa.net/image/20200328_windDart.gif)

By the way, the wind arrow is created as follows. (Click to enlarge)
It is assumed that the target will be reached in 8 frames.
It doesn't matter if it's a ball of fire, not just an arrow of the wind.

![Image](https://newrpg.up.seesaa.net/image/20200326_windDart_animation.JPG)

```
// 弓を引く
<D-Motion:attack>
repeat = 10 + Math.floor(a._battler.mat / 20)
interval = 2
motionFrame = 2/3 // interval/3
</D-Motion>

// 風の矢連射
<D-Animation:shotRandom&lookCourse&wait>
repeat = 10 + Math.floor(a._battler.mat / 20)
interval = 2
sx -= 20 * mirroring // 弓に位置を合わせる
sy += 10 // 弓に位置を合わせる
exRandom = 50
eyRandom = 50
arrival = 8 // 到達フレーム
arcY = -150 + Math.random() * 300 // -150～150
</D-Animation>
```

- With the "lookCourse" template, the arrow always points.
- "Math.floor (a._battler.mat / 20)" divides the magic power by 20 and rounds it down.
- "Math.random ()" is a function that generates a random value from 0 to 1.
- This randomizes the height of the parabola.
- "Math.random ()" is a function that generates a random value from 0 to 1.

## Thousand Needles

A large number of arrows appearing from around the enemy will pierce you.

![Image](https://newrpg.up.seesaa.net/image/20200409_harisen.gif)

```
// 連射（モーション）
<D-Motion:attack>
repeat = 15
interval = 1
motionFrame = 1/3 // interval÷3
</D-Motion>

// 矢（収束アニメ）
<D-Animation:converge&lookCourse>
repeat = 60
interval = 1/4
exRandom = 20
syRandom = 20
arrival = 4 // 到達フレーム
scaleX = 1 + (1 - Math.min(t, arrival) / arrival) * 2
scaleY = 1 + (1 - Math.min(t, arrival) / arrival) * 2
</D-Animation>
```
The arrow is reduced in the red part.
It is a mathematical formula that changes from the usual 3 times to the same size.
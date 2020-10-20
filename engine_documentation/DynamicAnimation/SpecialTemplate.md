# Special Template

This page is part of the description of the Dynamic Animation plugin .

## beam

Shoot a beam at the opponent. All you are doing is directing the animation in the direction of the target.
You need to have a left-facing and landscape animation, as shown below.

![image](https://newrpg.up.seesaa.net/image/20200201_animatioon.JPG)

By the way, the above is the one that changed the color tone of "Thunder1" which is the default, and changed the angle of the last 3 patterns by about 270 degrees.
It's really cool to make it purple, so I really recommend it.
```
<D-Animation:beam>
scaleY = 1 * (1-t/et) // 縦幅
scaleX = 2 // 横幅
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200220_beam.gif)

Please note that if the length is not enough, it will be interrupted in the middle and it will not be cool.
In the above example, it is dealt with by making it elongated sideways.
Furthermore, by setting the vertical width to 0 over time, it disappears naturally.

If you want a production when the beam hits, you can incorporate other animations with a time lag.
```
<D-Animation:beam>
scaleY = 1 * (1-t/et) // 縦幅
scaleX = 2 // 横幅
</D-Animation>
<D-Animation>
delay = 3 // 時間差
id = 77 // 雷/単体2
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200220_beam_2.gif)

Since it looks like a penetration, it may be good to combine it with the range expansion plug-in "line".

## diffusionBeam

Shoot the beam. In the initial state, the target is a range with an angle of 90 degrees.
```
<D-Animation:diffusionBeam>
position = 3 // アニメーション位置（3:画面）
sx = a.x - 48 * mirroring // 始点を左に48ずらす
scaleY = 0.5 * (1-t/et) // 縦幅
scaleX = 2 // 横幅
<D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200220_diffusionBeam.gif)

Basically, it is supposed to be the whole target, but if you switch the animation position, you can use it for a single unit.
Since the range of random shooting is determined by rotation, you can also adjust it there.
```
<D-Animation:diffusionBeam>
position = 1 // アニメーション位置（1:中心）
sx = a.x - 48 * mirroring // 始点を左に48ずらす
scaleY = 0.5 * (1-t/et) // 縦幅
scaleX = 2 // 横幅
rotation *= 0.5 // 乱射角度を半分に
<D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200220_diffusionBeam_2.gif)

## keep

Starting from the end point of the previous <D-Animation>, each setting is inherited.
The timing is also adjusted arbitrarily.
Due to its specifications, if there is no previous <D-Animation> or if there are more repeats than before, there will be no takeover source and an error will occur.
In addition, due to adult circumstances, coordinate changes due to real-time calculation cannot be inherited.
The starting point is the value set as the ending point.

For example, the following is an example of connecting different animations to an animation that scatters fireballs.
```
<D-Animation:shotRandomAll>
repeat = 10
interval = 3
</D-Animation>
<D-Animation:keep>
id = 66 // 炎/単体1
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200220_keep.gif)

The animation is like a pillar of fire rising from the point of impact of a fireball.

## boomerang

Starting from the end point of the previous <D-Animation>, each setting is inherited in the same way as the continuous type.
However, by changing the parabola in the opposite direction, it will return to the action subject like a boomerang.
It is supposed to be combined with a projection (arc) type.
```
<D-Animation:arc>
rotation = 2 * t/et * Math.PI * 2 // ２回転
</D-Animation>
<D-Animation:boomerang/>
```
![image](https://newrpg.up.seesaa.net/image/20200220_boomerang.gif)

## spell

A chanting effect is performed for the action subject.
It is assumed to be placed on top of other `<D-Animation>` and combined as shown below.
```
<D-Animation:spell/>
```
![image](https://newrpg.up.seesaa.net/image/20200220_spell.gif)

In the initial state, the animation with ID = 52 (enhancement 2) is displayed at "foot".
Since the wait time is applied automatically, there is no need to adjust the delay value.

In addition, it will be long if it is left as it is, so it is recommended to set the properly adjusted one in the plug-in parameter.
Of course, you can make something for special skills, and I think it would be interesting to change the production for each magic system.
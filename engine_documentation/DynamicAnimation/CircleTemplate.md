Circle Template

This section describes the circular template.

## circle

The animation is displayed repeatedly in a circular motion.
`<D-Animation:circle/>`

The animation below is "Flame / Single 2 (id = 67)", but the position has been changed to "center" to make it look good.

The default setting is to go around the circumference of a 100-pixel radius while repeating 10 times in total.

Circular templates have their own parameters.
For example, let's change it as follows.
```
<D-Animation:circle>
repeat = 20 // 繰り返し回数
radiusX = 200 // 半径（Ｘ方向）
radiusY = 100 // 半径（Ｙ方向）
radX *= 2 // 回転角度（Ｘ）
radY *= 2 // 回転角度（Ｙ）
</D-Animation>
```


I extended the radius in the X direction to make it an ellipse. Furthermore, I doubled each rotation angle and tried to make two rounds.

Furthermore, if you move the circular template, it will look like a spiral.
```
<D-Animation:circle>
repeat = 50 // 繰返し回数
interval = 1/2 // 間隔
sy = defaultY - 500 * r/repeat // 始点Ｙ座標
radX *= 4 // 回転角度（Ｘ）
radY *= 4 // 回転角度（Ｙ）
scaleX = 0.5 // 横幅
scaleY = 0.5 // 縦幅
</D-Animation>
```


Not limited to this type, it will be interesting to move it in various ways.

## Vortex

The animation is displayed repeatedly toward the center of the vortex.
`<D-Animation:vortex/>`

By default, it goes around a circle with a radius of 100 pixels toward the center.
radiusX and radiusY have formulas that gradually reduce the radius.
Instead of rewriting the value directly, it is easy to write as follows.
```
<D-Animation:vortex>
radiusX *= 2 // 半径（Ｘ方向）
radiusY *= 1 // 半径（Ｙ方向）
radX *= 2 // 回転角度（Ｘ）
radY *= 2 // 回転角度（Ｙ）
</D-Animation>
```

Now the ellipse with a semimajor axis of 200 makes two rounds toward the center.


## spreadVortex

The animation is repeatedly displayed from the center of the vortex to the outside.
`<D-Animation:spreadVortex/>`

The settings are the same as the "vortex" type above, so I will omit them.

## revolve

It is confusing with the circumference, but here the animation itself moves on the circumference.
`<D-Animation:revolve/>`




## moveVortex

The animation moves toward the center of the vortex.
`<D-Animation:moveVortex/>`



Note that this type can specify the arrival frame.
```
<D-Animation:moveVortex>
repeat = 10 // 繰返し回数
interval = 2 // 間隔
arrival = 7 // 到達フレーム
radiusX *= 2 // 半径（Ｘ方向）
radiusY *= 2 // 半径（Ｙ方向）
radX *= 1.5 // 回転角度（Ｘ）
radY *= 1.5 // 回転角度（Ｙ）
scaleX = 0.5 // 横幅
scaleY = 0.5 // 縦幅
</D-Animation>
```

In this way, it is possible to create an animation that swirls and lands on the target. It's too early to understand if it's a GIF ...

## spreadMoveVortex

The animation moves from the center of the vortex to the outside.
`<D-Animation:spreadMoveVortex/>`

...I'm not sure.
I think the animation of a still pattern is more suitable.
```
<D-Animation:spreadMoveVortex>
repeat = 20 // 繰返し回数
radiusX *= 3 // 半径（Ｘ方向）
radiusY *= 3 // 半径（Ｙ方向）
radX *= 3 // 回転角度（Ｘ）
radY *= 3 // 回転角度（Ｙ）
</D-Animation>
```

It is like this.
The above is just a 20 frame stationary bubble.
If there are not a certain number of frames, the movement will be too fast and it will be hard to see.

After that, it may be interesting to combine it with enlargement processing.
```
<D-Animation:spreadMoveVortex>
repeat = 20 // 繰返し回数
radiusX *= 3 // 半径（Ｘ方向）
radiusY *= 3 // 半径（Ｙ方向）
radX *= 3 // 回転角度（Ｘ）
radY *= 3 // 回転角度（Ｙ）
scaleX = 2 * t/et // 横幅
scaleY = 2 * t/et // 縦幅
</D-Animation>
```

As I explained in the shooting system, "t / et" is "elapsed time / end time".
It's an expression that starts from 0 and becomes 1 at the end.
Separately, the size can be changed on the animation edit screen, so you can change that area as you like.

## breath

A large amount of animation is released on the pendulum with RPG's flower dragon breath-like movement. It is faster to see what kind of movement it is.
`<D-Animation:breath/>`

*) The position is adjusted by rotating the original animation by 90 degrees.

This movement is realized by rotating only the Y coordinate.
For example, if you set as follows ...
```
<D-Animation:breath>
radiusY *= 2 // 半径（Ｙ方向）
radY *= 2 // 回転角度（Ｙ）
</D-Animation>
```

The flame will make two round trips over a wide area. The radius is the range and the rotation angle is equivalent to the number of round trips.

## fv_breath
Breath for front view.

`<D-Animation:fv_breath/>`

Here, only the X coordinate is rotated.
Therefore, when changing the definition, it will be as follows.
```
<D-Animation:breath>
radiusX *= 2 // 半径（Ｘ方向）
radX *= 2 // 回転角度（Ｘ）
</D-Animation>
```

## converge

A large amount of animation converges towards the target.
`<D-Animation:converge/>`

The example uses a 6-frame stationary fireball.
If you keep the animation facing left, it will always face the target direction.
If you don't need the automatic orientation adjustment, you can clear it with "rotation = 0".

You can also do this.
```
<D-Animation:converge>
repeat = 80 // 繰返し回数
interval = 1/4 // 間隔
scaleX = 5 * (1-t/et) // 横幅
scaleY = 1 * (1-t/et) // 縦幅
</D-Animation>
```

(1-t / et) is a formula that changes from 1 to 0 over time. This is reducing the size.
Furthermore, it is a rough work that forcibly stretches only the width 5 times to make it look like radiation.
The interval is reduced to 1/4 to increase the radiation, but it may be a little heavy ...

This type can also specify the arrival frame. The first 4 frames are fixed, and I will try to make an animation of a fireball that explodes after that.
```
<D-Animation:converge>
arrival = 4 // 到達フレーム
scaleX = 0.5 + 2 * (1 - Math.min(t, arrival) / arrival) // 横幅
scaleY = 0.5 + 2 * (1 - Math.min(t, arrival) / arrival) // 縦幅
</D-Animation>
```

I also added a formula to reduce it to the reached frame, but it's a little too complicated ...
Scaling can be done normally by editing animation, so if you don't understand the meaning, you can use it.
For the time being, it is a formula that starts from 2.5 times and increases by 0.5 times in the arrival frame.

## radiate

A large amount of animation is emitted from the target.
`<D-Animation:radiate/>`

If you keep the animation facing left, it will always face outward.

By default, it radiates in a random direction, but it can also be fixed.
```
<D-Animation:radiate>
radX = r/repeat * Math.PI * 2 // 回転角度（Ｘ）
radY = r/repeat * Math.PI * 2 // 回転角度（ｙ）
</D-Animation>
```

I tried to make just one rotation for every repeat.
It's something like barrage shooting.
As usual, the more you multiply the whole number, the more rotation speed will increase.
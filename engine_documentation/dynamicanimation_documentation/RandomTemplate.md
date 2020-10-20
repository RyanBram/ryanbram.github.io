# DynamicAnimation Random template [RPG Maker MV plugin]
This page is part of the description of the Dynamic Animation plugin .

This section describes random templates.

## random
Play the animation multiple times around the target.
Basically, it is assumed that the target is a single object.
The following is an example of setting "Flame / Single 2 (id = 67)" as a skill.
`<D-Animation: random />``

By default, 5 animations are displayed within the range that matches the target size.
Various arrangements are possible as with the "shooting template".
```
<D-Animation:random>
repeat = 10 // 繰返回数
interval = 2 // 間隔
scaleX = 0.5 // 横幅
scaleY = 0.5 // 縦幅
sx = defaultX + 100 * mirroring // 始点Ｘ座標
sy = defaultY - 100 // 始点Ｙ座標
sxRandom = 50 // 始点Ｘ座標分散
syRandom = 50 // 始点Ｙ座標分散
</D-Animation>
```

Unlike the shooting system, specifying the end point and arrival frame is meaningless.
All display is done only at the start point.

## randomAll

Plays a large amount of animation for the entire target.
`<D-Animation:randomAll/>`

By default, 25 animations are displayed in a range that fits half of the entire screen.
At this time, the "position" of the animation is forcibly converted to the "screen".

If you want to change the start point or variance width, it is the same as the random case above.
If you use defaultX and defaultY, it will take into consideration even if the position is on the screen.
The standard position of the screen target animation can be set from the overall plug-in parameters.
Since the original position of this animation is "foot", it may look more natural to shift the Y coordinate slightly downward.
```
<D-Animation:randomAll>
sy = defaultY + 50 // 始点Ｙ座標
</D-Animation>
```
Like this.

By the way, what needs attention here is the handling of "flash" and "sound effect".
Since a large number of animations are displayed repeatedly, the load of these processes is also heavy.
In particular, the "target flash" is extremely heavy and requires caution.
The sound effect is not as good as the "target flash", but it is a heavy process.
Rather, it simply hurts my ears when I hit it repeatedly.

Therefore, the flash and sound effects are set to be limited from the beginning for the types that perform a large amount of repetition, including this all-random type.
For this type, the flash (both screen and target) is processed once every 5 repeats and the sound effect is processed only once every 2 repeats.

To change the setting, specify as follows.
```
<D-Animation:randomAll>
limitFlash = 10 // フラッシュの制限
limitSound = 10 // 効果音の制限
</D-Animation>
```

Also, if it is 0 or 1, there is no limit.
If you set a value larger than the number of repeats such as 1000, it will be processed only the first time.

This mold is not just for spreading flames.
For example, what about this?


Above, I just changed the color tone of "Slashing / Effect (id = 7)", but there are many uses.
In addition, the weapon is swung by an external plug-in.
Not bad.

## randomCircle

The range of randomAll is changed to a circle.
`<D-Animation:randomCircle/>`

As you can see by looking at the template settings of the plugin parameters, the contents are rather complicated formulas.
You can use it without knowing the contents, but please note that the method of specification is characteristic.

If you just want to change the radius of the circle, you can change the value of `sxRandom`.
Once the value of `sxRandom` is determined, the value of `syRandom` is automatically calculated by the internal formula based on it.
```
<D-Animation:randomCircle>
sxRandom = 100 // 始点Ｘ座標分散
</D-Animation>
```

So what if you want an ellipse?
It is NG to rewrite the value of `syRandom` directly.
The internal formula is overwritten and is simply the same as the `randomAll` type.

Write like this.

*) This notation is introduced on this page.

```
<D-Animation:randomCircle>
sxRandom = 300 // 始点Ｘ座標分散
syRandom *= 0.5 // 始点Ｙ座標分散
</D-Animation>
```

A horizontally long ellipse with a semi-major axis of 300 and a semi-minor axis of 150.
If you want to make it vertically long, you can write "syRandom * = 2".

## Rain

Makes the animation rain a lot.
```
<D-Animation:rain>
arrival = 7 // 到達フレーム
scaleX = 0.5 // 横幅
scaleY = 0.5 // 縦幅
</D-Animation>
```

This type allows you to specify the arrival frame.
Make bubbles as usual.

Next, let's drop it diagonally instead of straight.
First, move the start point to the right. The end point is just below the start point, so move it to the left.
If you specify mirroring, it will fly from the opposite direction when the target becomes an actor.
```
<D-Animation:rain>
arrival = 7 // 到達フレーム
sx += 500 * mirroring // 始点Ｘ座標
ex -= 500 * mirroring // 終点Ｘ座標
scaleX = 0.5 // 横幅
scaleY = 0.5 // 縦幅
</D-Animation>
```
# BasicUsage
This page is part of the description of the Dynamic Animation plugin .

We will introduce the basic usage of this plug-in and how to specify parameters.
You can copy and paste as it is, so please use it.

First of all, I will explain using a shot type template.

As an example, try setting the default "Water 2 (id = 82)" animation to your skill.
*) Since the screen flash is hard to see, it is erased in the following examples.

Then, write the following in the memo field.
`<D-Animation:shot/>`

Note the "/" at the end.
If it is completed in one line, write like this.

As you can see, the shooting type shoots the animation straight from the actor to the target.
But this alone is not enough.

## arrival

The total number of frames for this animation is 15.
Unless otherwise specified, the target will be reached in 15 frames.
However, this animation has a content that makes bubbles pop in the 8th frame.
If possible, I want to reach just before that (7th frame) so that I can play there.

So, specify the number of frames reached.
Add parameters for the shooting type as follows.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
</D-Animation>
```

It feels good.
You can make a fireball that hits an enemy and explodes in the same way.
By the way, the annotation is to the right of "//", but it works fine even if you copy and paste it as it is.

## repeat, interval
Next, let's fire continuously.
Specify the number of repeats (repeats) and their intervals.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
repeat = 5 // 繰返回数
interval = 2 // 間隔
</D-Animation>
```

If interval is not specified, 1 is applied. This number corresponds to the animation frame time (4/60 seconds by default).
Not only integers but also values, such as 1/4 and 1/2 can be entered.
However, if the interval is too short, a large number of animations will be called at the same time.
Please note that the operation will be heavy.

Also, the current number of repetitions can be referred to as a formula with "r" (starting with 0).
You can also see the total number of repeats with "repeat".
For example, if you write as follows, the animation will start from interval = 5 and the firing interval will narrow as you repeat.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
repeat = 5 // 繰返回数
interval = repeat - r // 間隔
</D-Animation>
```
*) The above will result in an error unless it is ver1.001 or higher.
Please be careful.

## scaleX, scaleY
By the way, aren't the bubbles a little too big?
Let's make it smaller.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
repeat = 5 // 繰返回数
interval = 2 // 間隔
scaleX = 0.5 // 横幅
scaleY = 0.5 // 縦幅
</D-Animation>
```

I specified the width (scaleX) and height (scaleY) to 0.5. 1.0 corresponds to the original size.
Of course, you can change the size on the animation edit screen.
However, here you can specify the width and height separately.
It's a big deal, so let's do it.　
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
repeat = 5 // 繰返回数
interval = 2 // 間隔
scaleX = 1.0 // 横幅
scaleY = 0.5 // 縦幅
</D-Animation>
```

The atmosphere changes quite a bit.
Hopefully you can even make a water bullet.

## sx, sy

If you worried that bubbles are coming out of the character's torso.
So, let's adjust the starting point coordinates.
The start point coordinates consist of two parameters, `sx` and `sy`.
By the way, s is an abbreviation for start.

In the case of shot type, the coordinates of the action subject are set from the beginning, but change it.
```
<D-Animation:shot>
sx = a.x - 48 * mirroring // 始点Ｘ座標
sy = a.y - a.height - 48 // 始点Ｙ座標
arrival = 7 // 到達フレーム
</D-Animation>
```

Bubbles are coming out from the left overhead.
You may not like the formula-like thing that comes out, but please keep in touch.

`a` means the sprite of the action subject.
`a.x` and `a.y` are the X and Y coordinates, respectively.

*) Because the contents are different, you cannot refer to the items used in the usual calculation formula such as `a.atk`.
In that case, you need to write something like `a._battler.atk`.

`a.height` is the height of the character.
Overhead of the action subject in `a.y - a.height`.
From there, `-48` means that the overhead 48 pixels are the starting point Y coordinate.
If you are new with the basic operation level of RPG Maker MV, the minus in Y coordinate means higher position.

`a.x - 48` also means that the starting point is the left 48 pixels of the action subject.
`mirroring` is a variable to flip the coordinates left and right when the target becomes an actor.

## ex, ey
When it comes to the start point, let's play with the end point (coordinates that reach the target).
The end point coordinates consist of two parameters, "ex" and "ey".
Of course, e stands for end.
```
<D-Animation: shot>
ex = defaultX + 100 * mirroring // End point X coordinate
ey = defaultY + 100 // End point X coordinate
arrival = 7 // Reach frame
</ D-Animation>
```

It doesn't mean anything, but it now explodes around the lower right corner of the enemy.

Rather, a mysterious variable came out.
"defaultX" and "defaultY" contain the coordinates of the target (b) in consideration of the animation position settings (overhead, center, feet, screen).

- Overhead: defaultX = b.x, defaultY = b.y - b.height
- Center: defaultX = b.x, defaultY = b.y - b.height / 2
- Feet: defaultX = b.x, defaultY = b.y
- Screen: Plugin parameter settings for both defaultX and defaultY

Details are as above.
It is troublesome to enter "b.y - b.height / 2" one by one, so it is convenient to use this.

## sxRandom, syRandom, exRandom, eyRandom

But what if you want to distribute the coordinates that hit the target?
It's more natural to randomly disperse the continuous shooting technique.
```
<D-Animation:shot>
sxRandom = 50 // 始点Ｘ座標分散
syRandom = 50 // 始点Ｙ座標分散
exRandom = 50 // 終点Ｘ座標分散
eyRandom = 50 // 終点Ｙ座標分散
arrival = 7 // 到達フレーム
repeat = 5 // 繰返回数
scaleX = 0.5 // 横幅
scaleY = 0.5 // 縦幅
</D-Animation>
```

As mentioned above, I tried to disperse the X and Y coordinates of the start point and end point by about 50 pixels each.
In terms of production, it seems more natural to have only the end point, but the start point is also incidental.
Since it means 50 pixels on each of the top, bottom, left, and right, the width of the dispersion is 100 pixels.

In addition, the following specification is also one method.
```
<D-Animation:shot>
exRandom = b.width / 3 // 対象の横幅÷３
eyRandom = b.height / 3 // 対象の縦幅÷３
</D-Animation>
```

This looks at the target image size and distributes it within that range.
The reason for ÷ 3 instead of ÷ 2 is that the edges of the image are usually blank.
I think it's more natural to set it a little smaller.

## arcX, arcY
Throwing is a parabola.
Of course, it has functions.
Specifies the number of pixels that will be the height of the parabola.
As usual, the minus is upward.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
arcY = -100 // 放物線のＹ座標成分
</D-Animation>
```

Bubbles look better in this kind of movement.
You can also specify a horizontal parabola with "arcX".
It may be difficult to use in the side view, but it may be used for something because it has a unique acceleration.

## id
With this plugin, you can freely call multiple animations ID from one skill.
The method is simply to add a description.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
</D-Animation>
<D-Animation>
id = 81 // 水/単体1
</D-Animation>
```

If you specify the animation ID in "id", you can call the animation other than the one set in the skill.
By the way, if you just write `<D-Animation />`, the animation will be executed normally.

## delay

However, with the above method, the animation will be played at exactly the same time without any timing.
Therefore, specify the time difference.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
</D-Animation>
<D-Animation>
delay = 7 // 7フレーム待つ
id = 81 // 水/単体1
</D-Animation>
```

Now you can play the next animation according to the arrival frame.

If you want to match the end timing, specify "auto" and it will wait automatically.
It is convenient because it calculates the end timing considering repeat and interval.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
</D-Animation>
<D-Animation>
delay = auto
id = 81 // 水/単体1
</D-Animation>
```

## Wait

You can also adjust the timing by specifying the wait in the previous `<D-Animation: shot>`.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
wait = auto
</D-Animation>
<D-Animation>
id = 81 // 水/単体1
</D-Animation>
```
It is exactly the same as "delay" except that the specified part is different.
Please use the one you like.

## afterimage, afterimageInterval

In addition, it is an afterimage function.
Specifies the number and spacing of afterimages.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
arcY = -100 // 放物線のＹ座標成分
afterimage = 5 // 残像数
afterimageInterval = 1 // 残像間隔
</D-Animation>
```

The specifications of the afterimage interval are the same as the normal interval.
1 corresponds to 1 frame of animation.
*) It is not "afterImage" but "afterimage".
It will not work if you specify the wrong case.

This feature is cool, but it's heavy, so be careful.
Please think that the load is the same as increasing the number of displays by specifying repeat normally.

## rotation
It's a little advanced, but let's add some rotation.
As a matter of fact, rotation is also possible on the animation edit screen, so it is not necessary to set it here.
Well, it's possible to do this.

The turnover rate is called radian, and 2π (pie) is specified as 360 degrees.
This is the range to learn in high school mathematics.
But maybe everyone has forgotten.
That's why you can copy and paste for the time being.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
arcY = -100 // 放物線のＹ座標成分
scaleY = 0.5 // 縦幅
rotation = t/et * Math.PI * 2 // 回転率
</D-Animation>
```

*) It is elongated to make the rotation easier to understand.

You can see that `Math.PI * 2` is 2π, but there are other new variables such as `t` and `et`.
`rotation` is a function that performs real-time calculation every 1/60 during animation playback, and this is an expression that calculates the time change.

- `t`: Elapsed time from the start of animation (1/60 second unit)
- `et`: Animation end time (1/60 second unit)

The `t` starts at 0 and becomes equal to the `et` at the end time.
This means that the value of `t/et` will change from 0 to 1.
In other words, the entire formula above changes from 0 to 2π.
This means that it just goes around while the animation is playing.

Even if the explanation is unclear, it is OK as long as you know that you are going to do.

By the way, the animation above seems strange.
Even after the bubbles hit, it doesn't feel right to keep spinning.
So, I will also introduce a formula that stops rotation when it reaches.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
arcY = -100 // 放物線のＹ座標成分
scaleY = 0.5 // 縦幅
rotation = Math.min(t, arrival) / arrival * Math.PI * 2 // 回転率
</D-Animation>
```

The `arrival` that appears here has the same name as the "arrival frame" that has already appeared, but the contents are slightly different.
It is in 1/60 second units, not in frame units for animation.
But there is usually no problem even if you are not aware of the difference.
It is the same as the arrival timing.

`Math.min(t, arrival)` means to take the smaller of `t` and `arrival`.
In short, the result of the expression is fixed from the time when t reaches the arrival time.
This will stop the rotation there.

Now the rotation will stop when it reaches.

What if you want to make two or three rotations?
This is easy. Just multiply the value for the entire formula.
```
<D-Animation:shot>
arrival = 7 // 到達フレーム
arcY = -100 // 放物線のＹ座標成分
scaleY = 0.5 // 縦幅
rotation = 3 * Math.min(t, arrival) / arrival * Math.PI * 2 // 回転率
</D-Animation>
```

We are trying to make 3 rotations.

That is all for the basic usage of this plug-in.
There are a lot of templates other than shooting type, and there are many parameters.
See other pages for that.
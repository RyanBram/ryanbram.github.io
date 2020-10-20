# Other Functions
This page is part of the description of the Dynamic Animation plugin .

It is a supplementary function explanation.

## mirroring

For example, if you have the following definition:
```
<D-Animation:shot>
sx = a.x - 48 // 始点Ｘ座標
sy = a.y - a.height - 48 // 始点Ｙ座標
arrival = 7 // 到達フレーム
</D-Animation>
```

An animation fired from the action subject's left 48 pixels reaches the target.
However, there is one problem.

When used by an actor, it is fired from the left-front.
…… But if the enemy uses this, it will be fired from the back side this time.
When it comes to that, I want to switch the definition to "ax --48" for allies and "ax + 48" for enemies.
Therefore, we have prepared the following functions.
```
<D-Animation:shot>
sx = a.x - 48 * mirroring // 始点Ｘ座標
sy = a.y - a.height - 48 // 始点Ｙ座標
arrival = 7 // 到達フレーム
</D-Animation>
```
This variable called "mirroring" has a value of -1 when the target is an actor. By applying this, only the necessary part can be flipped horizontally.
Also, if you want to invert the vertical coordinates in the front view etc., perform the same operation on the Y coordinate side.

![image](https://newrpg.up.seesaa.net/image/20200216_bubble_mirroring.gif)

As you can see, it was fired from the right side of the enemy's head.

## Direct calculation

If you specify as follows, you can calculate directly on the template setting value. It is convenient because you can set it without knowing the original value.
```
<D-Animation:shot>
sx += 100 // テンプレートの設定値 + 100
sy -= 100 // テンプレートの設定値 - 100
repeat *= 2 // テンプレートの設定値 * 2
exRandom /= 2 // テンプレートの設定値 / 2
</D-Animation>
```

Please note that these operations are only "string concatenation" to JavaScript expressions.

What this means is that the template setting is "sx = ax + 100".
If the input in the memo field is as follows:
```
<D-Animation:shot>
sx *= 2
</D-Animation>
```
The content after concatenation will be "sx = ax + 100 * 2".
In other words, only the last 100 parts are multiplied.
To apply to the whole, set the plug-in setting value as "sx = (ax + 100)" and it's OK.
There is no problem with addition and subtraction, but be careful with multiplication and division.

## `&` Combination
It is possible to combine templates.
For example ...
```
<D-Animation:shot&circle/>
```
And, by connecting the shot type and circle type templates with `&``, the definitions are fused.
An animation that flies toward the target while playing in a circular orbit is completed.

Actually, it fuses the parameters of the template definition registered in the plugin.
If there is a parameter conflict, the definition given after it takes precedence.

There is no limit to the number that can be fused, and 3 or more are possible.
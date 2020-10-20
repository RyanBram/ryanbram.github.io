# Other Functions
This page is part of the description of the Dynamic Motion plug-in .

It is a supplementary function explanation.
Some features are the same as Dynamic Animation.


## mirroring

For example, if you have the following definition:
```
<D-Motion:near>
ex = b.x + 200 // 終点Ｘ座標
</D-Motion>
```
It moves to the right 200 pixels of the target.
However, there is one problem.

If used by an actor, it will move to the right, which is the front of the target, without any problem.
…… But if the enemy uses this, it will move to the back of the actor this time.
Then, I want to switch the definition to `b.x + 200` for allies and `b.x - 200` for enemies.
Therefore, we have prepared the following functions.
```
<D-Motion:near>
ex = b.x + 200 * mirroring // 終点Ｘ座標
</D-Motion>
```

This variable called `mirroring` has a value of -1 when the target is an actor.
By applying this, only the necessary part can be flipped left and right.
Also, if you want to invert the vertical coordinates in the front view etc.,
perform the same operation on the Y coordinate side.

![image](https://newrpg.up.seesaa.net/image/20200322_mirroring.gif)

As you can see, it now moves to the left of the target.

## Direct calculation

If you specify as follows, you can calculate directly on the template setting value. It is convenient because you can set it without knowing the original value.
```
<D-Motion:near&jump&roll>
ex += 100 // テンプレートの設定値 + 100
ey -= 100 // テンプレートの設定値 - 100
rotation *= 2 // テンプレートの設定値 * 2
arcY /= 2 // テンプレートの設定値 / 2
</D-Motion>
```

Please note that these operations are only "string concatenation" to the JavaScript expression.

What this means is that the template setting is `ex = b.x + 100`.
If the input in the note tag is as follows:
```
<D-Motion:jump>
ex *= 2
</D-Motion>
```

The content after concatenation will be `ex = b.x + 100 * 2`.
In other words, only the last 100 parts are multiplied.
To apply it to the whole, set the plug-in setting value as `ex = (b.x + 100)` and it's OK.
There is no problem with addition and subtraction, but be careful with multiplication and division.

## `&` symbol for combining Template

Templates can be combined by the `&` symbol.
For example ...
`<D-Motion:near&jump/>`

And, the definition is combined by connecting the approach type `near` and `jump` types templates with `&`. Approach the target while jumping.

Actually, the values of the template definition registered in the plugin are combined.
Note that if there is a parameter conflict, the following definition takes precedence.

First of all, the definition of `near` type is as follows.
```
<D-Motion>
wait = (isSync ? 0 : "autoMove")
ex = defaultX + a.width/2 * mirroring + (position != 3 ? b.width/2 : 150) * mirroring
ey = defaultY + a.height/2
airY = 0
motion = walk // 歩行モーション
</D-Motion>
```

The definition of jump type for this is as follows.
```
<D-Motion>
arcY = -100
motion = wait
</D-Motion>
```

The result of combining the two is as follows.
```
<D-Motion>
wait = (isSync ? 0 : "autoMove")
ex = defaultX + a.width/2 * mirroring + (position != 3 ? b.width/2 : 150) * mirroring
ey = defaultY + a.height/2
airY = 0
arcY = -100
motion = wait // 待機モーション
</D-Motion>
```
The definition of `motion = walk` in the near type has been overwritten with `motion = wait`.
Please note that it is natural that you cannot take two motions at the same time.

There is no limit to the number that can be combined, and 3 or more are possible.

## `<D-Setting>` function

You can perform the following functions by filling in the memo field.
If you want to set multiple functions, please describe as follows.
`<D-Setting:NoStep&Sync>`

### NoStep

Eliminates one step forward when executing skills (items).
`<D-Setting:NoStep>`

### Sync

Disables the wait and delay instructions that are initialized in the template (performing parallel execution).
It is supposed to be used when you want to perform complicated timing adjustment such as coalescence technique.
`<D-Setting:Sync>`

However, it is not always necessary to use it forcibly.
If you use templates such as "noWait" and "noDelay", you can create a combination technique without using them.
Please use the one that is easier to use.

### Immortal

By using the immortal state, you can control the production. Set the state to be used in the plug-in parameter in advance.
`<D-Setting:Immortal>`

As a result, the death calculation will not be made until the skill process is completed.
You can prevent the opponent from dying during the continuous hit technique that causing the process to be missed.
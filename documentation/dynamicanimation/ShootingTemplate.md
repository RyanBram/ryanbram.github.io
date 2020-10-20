# Shooting template
This page is part of the description of the Dynamic Animation plugin .

I will introduce an example of using the shooting system (throwing system) template.

## shot

The animation flies straight from the actor to the target.
This is the most basic processing of the shooting system.
```
<D-Animation:shot/>
```

![image](https://newrpg.up.seesaa.net/image/20200216_bubble_1.gif)

Please refer to the " Basic Usage " page for details on how to specify the parameters .

## shotRandom

Shoot the animation at the target.
```
<D-Animation:shotRandom>
arrival = 7 // 到達フレーム
</D-Animation>
```

![image](https://newrpg.up.seesaa.net/image/20200217_bubble_shotRandom.gif)

It is a combination of the contents already explained for shot.
There is no difference from the following.
```
<D-Animation:shot>
repeat = 5 // 繰返回数
exRandom = b.width / 3 // 終点Ｘ座標分散
eyRandom = b.height / 3 // 終点Ｙ座標分散
</D-Animation>
```

I hope you can change the values of repeat and interval as you like.

## shotRandomAll

Shoots at the entire target.
```
<D-Animation:shotRandomAll>
arrival = 7 // 到達フレーム
</D-Animation>
```

![image](https://newrpg.up.seesaa.net/image/20200217_bubble_shotRandomAll.gif)

Since it calls a lot of animations, it tends to be heavy.
The points to note about this are explained on the "Random template" page, so I will omit them here.

## arc

Throw an animation at the target while drawing a parabola.
```
<D-Animation:arc>
arrival = 7 // 到達フレーム
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200216_bubble_9.gif)

Yes, this is exactly the same as the one introduced above.
I just added "arcY = -100" to the shot type.

## arcRandom
```
<D-Animation:arcRandom>
arrival = 7 // 到達フレーム
</D-Animation>
```

![image](https://newrpg.up.seesaa.net/image/20200217_bubble_arcRandom.gif)

It's just a combination of arc and shotRandom.

## arcRandomAll
```
<D-Animation:arcRandomAll>
arrival = 7 // 到達フレーム
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200217_bubble_arcRandomAll.gif)

A parabolic version of all-out shooting.
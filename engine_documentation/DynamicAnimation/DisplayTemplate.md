# Display Template
This page is part of the description of the Dynamic Animation plugin .

## lookCourse

The animation always turn toward target.
```
<D-Animation:arcRandom&lookCourse/>
arrival = 8 // 到達フレーム
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200328_lookCourse.gif)

For example, you can express an arrow that changes its angle according to the parabola.

## roll

Rotate the animation.
```
<D-Animation:shot&roll/>
arrival = 10 // 到達フレーム
rotation *= 3 // ３回転
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200410_roll.gif)


You can change the number of rotations by multiplying "rotation" by a value.
If not specified, it will be one rotation.
The rotation will stop when the target is reached.

## screen

Display the animation on the entire screen.
```
<D-Animation:screen/>
```
![image](https://newrpg.up.seesaa.net/image/20200420_screen.gif)

Please use it for directing and cut-in on the entire screen.
Click here for a sample of summon-like production using this .

## head

The animation is displayed based on the target's overhead.
In Maker MZ, the function to change the position of the animation to "overhead" or "foot" has disappeared.
It is an alternative function.
```
<D-Animation:head/>
```

## foot (ver1.14)

The animation is displayed based on the target's feet.
```
<D-Animation:foot/>
```
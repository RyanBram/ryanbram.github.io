# Control System Template
This page is a part of the explanation of Dynamic Animation plug-in ( MZ , MV ).

This section describes the control system template.

## follow

Display the animation on the target.
It also automatically tracks when the target moves.
```
<D-Animation:follow/>
```

It is a function that demonstrates its true value in cooperation with DynamicMotion.

## self

The subject of action is the target of the animation display.
```
<D-Animation:self/>
```
```
<D-Animation:random&self/>
```

You can use it normally, or you can use it with the `&` function.

## Wait

Wait for the animation to finish displaying.
```
<D-Animation:wait/>
```
```
<D-Animation:random&wait/>
```

This is also suitable for `&` function.

## delay

Wait for the previous animation to finish displaying. Only the timing to specify is different from the weight. Please use the one that is easier to use.
```
<D-Animation:delay/>
```

## damage

Damage processing is performed at the end of the animation.
Note that it has no effect unless you specify the number of consecutive times in the skill database.
```
<D-Animation:damage>
nextDelay = 7 // 連続攻撃の間隔
</D-Animation>
```
![image](https://newrpg.up.seesaa.net/image/20200518_damage.gif)

## ifBattle / ifMap

Each condition is executed only for the battle screen and only for the map screen.
There is no point unless you install the map version of Dynamic Animation .

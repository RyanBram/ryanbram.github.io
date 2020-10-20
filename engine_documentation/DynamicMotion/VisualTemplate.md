# Visual Template

This page is part of the description of the Dynamic Motion plug-in .

I will introduce the display template.

*) The ver notation is based on the MV version of Dynamic Motion, but all are also valid for Dynamic Motion MZ.

## invisible

Make the battler transparent.
To make it clear, you need to specify "visible" below.

## visible

Releases the transparent state.
```
<D-Motion:stepForward&invisible/> // 透明化しながら前進
<D-Motion:near>
ex += 48 * mirroring // 対象の少し手前に移動
</D-Motion>
<D-Motion:near&visible&attack/> // 透明解除しながら前進アタック
<D-Animation/>
<D-Motion:return/> // 戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200318_invisible.gif)

I tried to combine transparency and detransparency.

## mirror
```
<D-Motion:mirror&near/> // 左右反転して対象へ接近
<D-Animation/> // アニメーション
<D-Motion:return/> // 戻る
```
![Image](https://newrpg.up.seesaa.net/image/20200320_mirror.gif)

It can be used for skills and items for allies.
It can be combined with an attack, but be careful as it changes the arm that swings the weapon.

In addition, it does not return until the left-right reversal is canceled.
You need to specify "mirrorOff" below.
Alternatively, as in the example, it is automatically canceled by the "return" type, so it is recommended to leave it to that.

## mirrorOff

Cancels the left-right reversal of the butler.
```
<D-Motion:mirror&near/> // 左右反転して対象へ接近
<D-Motion:mirrorOff/> // 左右反転解除
```

## zoomA

Zoom to the subject.

## zoomB

Zoom to the target.
"The subject of action is A" and "the target is B" are the same as the skill calculation formula. It is recommended to remember it when it seems to be confused.

## zoomOff

Resetting the zoom.
The following is an example of combining with your own zoom and the target zoom.
```
<D-Motion:zoomA/> // 自分にズーム
<D-Animation:wait/> // アニメーション＆ウェイト
<D-Motion:zoomOff/> // ズーム解除
```
![Image](https://newrpg.up.seesaa.net/image/20200329_zoomA.gif)

```
<D-Motion:near&zoomB/> // 対象にズーム
<D-Motion:attack/> // 武器振り
<D-Animation/> // アニメーション
<D-Motion:return&zoomOff/> // ズーム解除
```
![Image](https://newrpg.up.seesaa.net/image/20200329_zoomB.gif)


## shake

Vibrates the motion target. The vibration width is 6 pixels in total on the left and right.
```
<D-Animation/> // アニメーション
<D-Motion:attack/> // 武器振り
<D-Motion:target&shake/> // 対象を振動
```
![Image](https://newrpg.up.seesaa.net/image/20200410_shake.gif)

Also, if you want to increase the vibration width, multiply "addX" by a value.
```
<D-Animation/> // アニメーション
<D-Motion:attack/> // 武器振り
<D-Motion:target&shake> // 対象を振動
addX *= 20 // 振動幅２０倍
</D-Motion>
```
![Image](https://newrpg.up.seesaa.net/image/20200410_shake2.gif)
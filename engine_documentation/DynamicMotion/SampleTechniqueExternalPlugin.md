# Sample Technique - Combination with External Pulugins

This page is DynamicAnimation and DynamicMotion is part of the description of the plug-in.

*) Operation with RPG Maker MZ has also been confirmed.

We will introduce sample techniques in cooperation with external plug-ins.
Obviously, it will not work unless the related plug-in is downloaded and turned on.

## Blackout

In combination with [battleback color tone changer plugin](http://rpgmaker-script-wiki.xyz/battle_back_tone_plugin.php) by 村人A, the background is darkened.
Unlike normal color tones, it maintains the tones of characters and animations.

![Image](https://newrpg.up.seesaa.net/image/20200607_darkness.gif)

```
<D-Motion>
plugin = tintBB12 64 64 64 64 64 64
</D-Motion>

// 好きなように定義
<D-Animation/>

// アニメーション終了を待って実行
<D-Motion:delay>
plugin = tintBB12 255 255 255 255 255 255
</D-Motion>
```

Please refer to the link for how to use the plug-in.
Simply put, the six numbers are in the order of red-green-blue on the background (bottom) and red-green-blue on the background (top).
If it is 0, it is black, and if it is 255, there is no change.

*) The description of the sample is only the dark part. Please implement the contents as you like.

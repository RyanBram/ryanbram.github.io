# DynamicAnimation Range Template
Introducing how to use range templates.
The template below is intended for use with the skill range extension plugin .
It requires NRP_SkillRangeEX.js version 1.01 or higher.

## horizontal
Displays a repeating animation for a horizontal row.
Combine with the range expansion plug-in "horizontal".

*) Please do not worry that the wording of horizontal and horizontal is not unified.

```
<RangeEx:horizontal>
<D-Animation:horizontal/>
```
![image](https://newrpg.up.seesaa.net/image/20200220_horizontal.gif)

Please be careful about the handling of "/" as usual.
RangeEx does not require "/". If you make a mistake, it will not work.

In the initial state, it is a specification to display 5 animations within the range.
If you increase repeat, it will be automatically divided into equal parts within the range.
It may be more natural to set a value for "syRandom" to disperse the vertical positions.

## shotHorizontal

Move the animation so that it runs through a horizontal row.
This is also combined with the range expansion plug-in "horizontal".
```
<RangeEx:horizontal>
<D-Animation:shotHorizontal/>
```
![image](https://newrpg.up.seesaa.net/image/20200220_shotHorizontal.gif)

## vertical

Shows a repeating animation for a vertical column.
Combine with the range extension plug-in "vertical".
```
<RangeEx:vertical>
<D-Animation:vertical/>
```
![image](https://newrpg.up.seesaa.net/image/20200220_vertical.gif)

The basic notes are the same as "horizontal", so I will omit them.

## pierce

Displays an animation that penetrates a straight line connecting the actor and the object.
Combine with the range expansion plug-in "line".
```
<RangeEx:line>
<D-Animation:pierce/>
```
![image](https://newrpg.up.seesaa.net/image/20200220_pierce.gif)
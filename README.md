# magic-menu

Getted started
=====================
Adaptive menu in one line with hiding menu items in a drop-down list
---
### HTML
```html
<link rel="stylesheet" href="../css/magic-menu.min.css">

<ul class="example-menu">
    <li><a href="#">Full width</a></li>
    <li><a href="#">Not the full width</a></li>
    <li><a href="#">Inline menu</a></li>
    <li><a href="#">Variability menu</a></li>
    <li><a href="#">Multi-level menus</a></li>
    <li><a href="#">Getter started</a></li>
</ul>

<script src="magic-menu.min.js"></script>
```
### JS
```js
$('.example-menu').magicMenu({
    moreHtml: 'Ещё...'
});
```


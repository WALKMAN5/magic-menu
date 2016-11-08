$(document).ready(function(){
    'use strict';
    $('.example-menu').magicMenu({
        moreHtml: 'Ещё...',
        name: 'magicMenu1',
        callbackHide: 'hello'
    });
    $('.example-menu2')
        .on('init', function(event, menu){
            console.log('init', menu);
        })
        .magicMenu({
            name: 'magicMenu2',
            moreHtml: 'Ещёёёёёёёё...',
            className: 'magic-menu'
        })
        .on('afterHide', function(event, item, subItem){
            console.log('afterHide', $(item), $(subItem));
        })
        .on('afterShow', function(event, item, subItem){
            console.log('afterShow', $(item), $(subItem));
        });
});

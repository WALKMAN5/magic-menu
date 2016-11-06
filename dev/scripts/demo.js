$(document).ready(function(){
  $('.example-menu').magicMenu({
    moreHtml: 'Ещё...',
    name: 'magicMenu1',
    callbackHide: 'hello'
  });
  $('.example-menu2').magicMenu({
    name: 'magicMenu2',
    moreHtml: 'Ещёёёёёёёё...',
    className: 'magic-menu',
    callbackInit: function(menu){
      console.log('init', menu);
    },
    callbackHide: function(item, subItem){
      console.log('hidden', item, subItem);
    },
    callbackShow: function(item, subItem){
      console.log('show', item, subItem);
    }
  });
});

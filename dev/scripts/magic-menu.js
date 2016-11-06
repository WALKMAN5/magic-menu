(function($){
    'use strict';

    var Menu = {};

    Menu = (function() {

        function Menu(element, options) {

            var self = this;
            self.$menu = $(element);
            self.options = self.setOptions(options);

            self.init();
            self.match();
            self.initEvents();
        }

        return Menu;

    }());
    Menu.prototype.setOptions = function(options){
        var self = this;
        self.name = options.name || 'default';
        self.moreHtml = options.moreHtml || 'More...';
        return self;
    }
    Menu.prototype.init = function(){
        var self = this;
        self.$item = self.$menu.children();
        self.$link = self.$item.children('a');
        self.$menu.addClass('magic-menu');
        self.$item.addClass('magic-menu__item');
        self.$link.addClass('magic-menu__link');
        self.$moreMenu = '';
        var $last = self.$item.last(),
            $item = $last.clone();

        $item.addClass('magic-menu__item_more').children('a').html(self.options.moreHtml);
        $last.after($item);

        $item.append('<ul class="magic-menu__more-menu"></ul>');
        self.$moreMenu = $item.find('.magic-menu__more-menu');
        self.$itemMore = self.$item.last().next();
        self.$item = self.$item.not('.magic-menu__item_more');

        self.$item.each(function(){
            var $item = $(this).clone();
            $item.removeClass('magic-menu__item').children('a');
            self.$moreMenu.append($item);
        });
    }
    Menu.prototype.match = function(){

        var self = this,
            widthMenu = self.$menu.outerWidth(),
            $subItem = self.$moreMenu.children('li'),
            $item = self.$item,
            $itemMore = self.$itemMore,
            widthItems = 0,
            length = $item.length - 1,
            isVisibleMore = false,
            excessSize = 0;

        $item.each(function () {
            widthItems += $(this).outerWidth();
            $(this).data('width', $(this).outerWidth());
        });
        widthItems += $itemMore.outerWidth();

        for (var i = length; i >= 0; i--) {
            excessSize += $item.eq(i).outerWidth();

            if (widthItems - excessSize + $item.eq(i).outerWidth() >= widthMenu) {
                $item.eq(i).hide();
                $subItem.eq(i).show();
            } else {
                $item.eq(i).show();
                $subItem.eq(i).hide();
            }

            if ($item.is(':hidden')) {
                $itemMore.show();
            } else {
                $itemMore.hide();
            }
        }
    }
    Menu.prototype.initEvents = function(){

        var self = this,
            $win = $(window);

        $win.on('resize', function(){
            self.match();
        });
    }
    $.fn.magicMenu = function (options) {

        var menu = this,
            opt = options,
            length = menu.length,
            i;

        if(length){
            for(i = 0; i < length; i++){
                menu[i].menu = new Menu(menu[i], opt);
            }
        }else{
            console.error('no elements');
        }
        return menu;




        // $(window).on('resize', self.match);
    };

})($);


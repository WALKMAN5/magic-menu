(function($){
    'use strict';
    var Menu = {};

    Menu = (function(){
        function Menu(element, options){
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
        function isFunc(func){
            if (func && typeof func == 'function'){
                return func;
            }
            return function(){};
        }

        var self = this;

        self.name = options.name || 'default';
        self.moreHtml = options.moreHtml || 'More...';
        self.className = options.className || 'magic-menu';
        self.callbackInit = isFunc(options.callbackInit);
        self.callbackHide = isFunc(options.callbackHide);
        self.callbackShow = isFunc(options.callbackShow);

        return self;
    };

    Menu.prototype.init = function(){
        var self = this,
            className = self.className;

        self.$item = self.$menu.children();
        self.$link = self.$item.children('a');

        self.$menu.addClass(className);
        self.$item.addClass(className + '__item');
        self.$link.addClass(className + '__link');

        self.isVisibleMore = false;
        self.$moreMenu = '';

        var $last = self.$item.last(),
            $item = $last.clone();

        $item
            .addClass(className + '__item_more')
            .children('a')
                .html(self.options.moreHtml);
        $last.after($item);

        $item.append('<ul class="' + className + '__more-menu"></ul>');
        self.$moreMenu = $item.find('.' + className + '__more-menu');
        self.$itemMore = self.$item.last().next();
        self.$item = self.$item.not('.' + className + '__item_more');

        self.$item.each(function(){
            var $item = $(this).clone();

            $item
                .removeClass(className + '__item')
                .addClass(className + '__item_more')
                .children('a');
            self.$moreMenu.append($item);
        });
        self.callbackInit(self.$menu);
    };
    Menu.prototype.match = function(){
        var self = this,
            widthMenu = self.$menu.outerWidth(),
            $subItem = self.$moreMenu.children('li'),
            $item = self.$item,
            $itemMore = self.$itemMore,
            widthItems = 0,
            length = $item.length - 1,
            excessSize = 0,
            i;

        $item.each(function(){
            widthItems += $(this).outerWidth();
        });

        if (!self.isVisibleMore && widthItems > widthMenu || self.isVisibleMore){
            widthItems += $itemMore.outerWidth();
        }

        for (i = length; i >= 0; i--){
            excessSize += $item.eq(i).outerWidth();

            if (widthItems - excessSize + $item.eq(i).outerWidth() >= widthMenu){

                if ($item.eq(i).is(':visible')){
                    $item.eq(i).hide();
                    $subItem.eq(i).show();
                    self.isVisibleMore = true;
                    console.log(self.$menu);
                    console.log('visibleMore', self.isVisibleMore);
                    self.callbackHide($item.eq(i), $subItem.eq(i));
                }
            } else{

                if ($item.eq(i).is(':hidden')){
                    $item.eq(i).show();
                    $subItem.eq(i).hide();
                    self.callbackShow($item.eq(i), $subItem.eq(i));
                }
            }

            if ($item.is(':hidden')){
                $itemMore.show();
            }
            else{
                $itemMore.hide();
                self.isVisibleMore = false;
            }
        }

    };
    Menu.prototype.initEvents = function(){
        var self = this,
            $win = $(window);

        $win.on('resize', function(){
            self.match();
        });
    };
    $.fn.magicMenu = function(options){
        var menu = this,
            length = menu.length,
            i;

        if (length){
            for (i = 0; i < length; i++){
                menu[i].menu = new Menu(menu[i], options);
            }
        } else{
            console.error('no elements');
        }
        return menu;

    };

})($);

(function($){
    'use strict';
    var Menu = {};

    Menu = (function(){
        function Menu(element, options){
            console.time('initMenu');
            var self = this;

            self.$menu = $(element);
            self.options = self.setOptions(options);

            self.init();
            self.match();
            self.initEvents();
            console.timeEnd('initMenu');
        }

        return Menu;
    }());
    Menu.prototype.setOptions = function(options){
        var self = this;

        self.name = options.name || 'default';
        self.moreHtml = options.moreHtml || 'More...';
        self.className = options.className || 'magic-menu';

        return self;
    };

    Menu.prototype.init = function(){
        console.time('init');
        var self = this,
            className = self.className;

        self.$item = self.$menu.children();
        self.$link = self.$item.children('a');

        self.$menu.addClass(className);
        self.$item.addClass(className + '__item');
        self.$link.addClass(className + '__link');

        self.isVisibleMore = false;
        self.$moreMenu = '';

        self.$moreItem = self.$item.eq(0).clone();

        self.$moreItem
            .addClass(className + '__item_more')
            .children('a')
                .html(self.options.moreHtml)
                .attr('href', '#more');
        self.$moreMenu = $('<ul class="' + className + '__more-menu">');
        self.$moreMenu.append(self.$item.clone())
                .children()
                    .removeClass(className + '__item')
                    .addClass(className + '__item-more');
        self.$moreItem.append(self.$moreMenu);
        self.$menu.append(self.$moreItem);
        self.$item = self.$item.not('.' + className + '__item_more');
        console.timeEnd('init');
        self.$menu.trigger('init', [this.$menu]);
    };
    Menu.prototype.match = function(){
        console.time('Match');
        var self = this,
            widthMenu = self.$menu.outerWidth(),
            $subItem = self.$moreMenu.children('li'),
            $item = self.$item,
            $itemMore = self.$moreItem,
            $currentItem,
            $currentSubItem,
            length = $item.length - 1,
            excessSize = 0,
            i,
            lastIndex = length;

        console.time('for');
        for (i = 0; i <= length; i++){
            console.log($item.eq(i).outerWidth());
            excessSize += $item.eq(i).outerWidth();
            $currentItem = $item.eq(i);
            $currentSubItem = $subItem.eq(i);
            if($currentItem.is(':hidden')){
                $currentItem.show();
            }
            if($currentSubItem.is(':hidden')){
                $currentSubItem.show();
            }
            if(excessSize + $itemMore.outerWidth() > widthMenu){
                lastIndex = i;
                break;
            }
        }
        if(lastIndex < length){
            $itemMore.show();
        }else{
            $itemMore.hide();
        }
        $item.slice(lastIndex).hide();
        $subItem.slice(0, lastIndex).hide();
        $subItem.slice(lastIndex).show();
        console.timeEnd('for');

        console.timeEnd('Match');
    };
    Menu.prototype.initEvents = function(){
        var self = this,
            $win = $(window);

        $win.bind('resizeEnd', function(){
            console.log('resizeEnd');
            self.match();
        });
        $win.on('resize', function(){

            if(this.resizeTO){
                clearTimeout(this.resizeTO);
            }
            this.resizeTO = setTimeout(function(){
                $(this).trigger('resizeEnd');
            }, 0);
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

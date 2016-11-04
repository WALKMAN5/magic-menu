$.fn.magicMenu = function (options) {
    var menu = [],
        self = {},
        params = {
            moreHtml: 'More...'
        }
    if(options.moreHtml){
        params.moreHtml = options.moreHtml;
    }
    self.init = function(menu){
        self.$menu = $(menu);
        self.$item = self.$menu.children();
        self.$link = self.$item.children('a');
        self.$menu.addClass('magic-menu');
        self.$item.addClass('magic-menu__item');
        self.$link.addClass('magic-menu__link');
        self.$moreMenu = '';
        var $last = self.$item.last(),
            $item = $last.clone();

        $item.addClass('magic-menu__item_more').children('a').html(params.moreHtml);
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
        self.match();
    }
    self.match = function(){
        console.log(self.$menu);
        console.log('widthMenu:', self.$menu.width());
        var widthMenu = self.$menu.outerWidth(),
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
        console.log(widthItems);
        console.log(widthMenu);
        for (var i = length; i >= 0; i--) {
            excessSize += $item.eq(i).outerWidth();
            console.log('width', widthItems - excessSize + $item.eq(i).outerWidth());
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


    if($(this).length){
        self.init(this);
    }else{
        console.error('no elements');
    }

    $(window).on('resize', self.match)

};

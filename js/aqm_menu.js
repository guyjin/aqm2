;(function($) {

    var menuOpen = false;
    var inMenu = false;

    var menuStandUp = function() {
        $('body').addClass('menu_locked');
        $('nav').clone().appendTo('body').addClass('rNav');
        $('.frame nav').addClass('wideNav');
        $('.menuctrl span').on('click', function() {
            if (!menuOpen) {
                showMenu();
            }
        });

        $('nav.rNav a.menued').on('click', function(event) {
            event.preventDefault();
            var tid = $(this).attr('id');
            var eid = '';
            $('a.menued').each(function() {
                eid = $(this).attr('id');
                if(eid !== tid && $(this).is(':visible')){
                    $(this).next().slideUp(100);
                }
            });
            $(this).next().slideToggle(100);
        });

        $('nav.rNav h2').on('click', function() {
            openSubNav($(this));
        });

        $('.wideNav>ul>li').hoverIntent(
            function(){
                var lih = $(this).offset().top;
                if ($(this).children('a').hasClass('menued')) {
                    $(this).addClass('open');
                    $(this).children('div.submenu').css({
                        'top': (lih - 30) + 'px'
                    });
                }
            },
            function() {
                $(this).removeClass('open');
                destroySubNav();
            }
        );

        $('.wideNav .singlemenu').hoverIntent(
            function() {
                displaySubNav($(this));
            //$(this).parent('.section').addClass('open');
            }
        );
    };

    var hideMenu = function() {
        $('body').removeClass('menu_locked').addClass('menu_hidden');
        $(window).off('resize');
        $('nav.rNav').animate({
            left: '-190',
            backgroundColor: '#313131',
            queue: false
        }, 100, function() {
            menuOpen = false;
            $(document).off('click');
            $('nav.rNav').off('mouseleave');
            $('a.menued').each(function() {
                $(this).next().hide();
            });
        });

        $('.dept').animate({
            backgroundColor: '#4a6580',
            queue: false
        }, 300);
        $('.cloze').fadeOut({queue: false},300);
        $('.menu').fadeIn({queue:false},300);

        $('.section ul').css({'left':-300});

    };

    var showMenu = function() {
        $('body').removeClass('menu_hidden').addClass('menu_open');

        fixMenuHeight();

        if($('nav.rNav').css('backgroundColor') !== 'rgb(49,49,49)'){

            $('nav.rNav').css({'background-color':'rgb(49,49,49)'});
        }
        $('nav.rNav').animate({
            left: '0',
            width: '190',
            queue: false
        }, 100, function() {
            menuOpen = true;
            $(window).on('resize', function() {
                fixMenuHeight();
            });
        });
        $('.menu').fadeOut({queue:false},300);
        $('.cloze').fadeIn({queue: false},300);


        $(document).on('click', function() {
            if(menuOpen) {
                if(!inMenu){
                    hideMenu();
                }
            }
        });

        $('nav.rNav').on('mouseenter', function() {
            inMenu = true;
        });

        $('nav.rNav').on('mouseleave', function() {
            inMenu = false;
            hideMenu();
        });
    };

    var fixMenuHeight = function() {
        var h = $(document).height();
        var hh = $('header').height();
        var targeth = (h-hh);
        $('nav.rNav').css({'height':targeth});
    };

    var openSubNav = function(target) {
        $('.section ul').each(function(){
            if($(this).is(':visible')) {
                $(this).animate({
                    left: -300,
                    queue: false
                }, 100);
            }
        });
        target.next().show().animate({
            left: 190,
            queue: false
        }, 100);
    };

    var displaySubNav = function(box) {
        destroySubNav();
        box.append('<div class="submenubox"></div>');
        var s = $('.submenubox');
        var bo = box.offset();
        var botop = bo.top;
        var boleft = bo.left;
        var submenuWidth = box.width();
        var submenuLeft = box.offset().left;
        var boxLeft = submenuWidth + submenuLeft;
        box.children('ul').clone().appendTo(s);
        s.css({
            'left' : box.width() + 'px',
            'top': '0',
            'display': 'block'
        });
        $('.submenubox').on('mouseleave', function() {
            console.log('out');
        });
    };

    var destroySubNav = function() {
        $('.submenubox').off('mouseleave').remove();
    };




    var init = function() {
        menuStandUp();
    };

    $(init);

})(jQuery);
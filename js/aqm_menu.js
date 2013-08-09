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
                var fh = $('.frame').height() - 55; // frame height
        // var fw = $('.frame').width(); // frame width
                if ($(this).children('a').hasClass('menued')) {
                    $(this).addClass('open');
                    $(this).children('div.submenu').css({
                        'height': fh,
                        'position': 'absolute',
                        'top': 55
                    });
                }
            },
            function() {
                $(this).removeClass('open');
            }
        );

        $('a.twostage+.submenu .section h2').hover(function() {
            $(this).toggleClass('open');
        });

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


    var init = function() {
        menuStandUp();
    };

    $(init);

})(jQuery);
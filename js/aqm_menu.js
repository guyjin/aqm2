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

        $('.wideNav>ul>li').hoverIntent(function(){
            var fh = $('.frame').height(); // frame height
            var fw = $('.frame').width(); // frame width
            var mt = $(this).children('a').next().offset().top;  // menu top
            var mh = $(this).children('a').next().height(); // menu height
            var mw = $(this).children('a').next().width(); // menu height
            var mb = mt + mh;  // bottom of menu
            var sp = fh - mt; // space from the top of the menu to the bottom of the frame.
            if(sp < mh) {
                $(this).children('a').next().css({'bottom': 10 });
            } else  {
                $(this).children('a').next().css({'bottom': null});
            }
            if(mw > fw) {

            }
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
                console.log('resize');
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
        var h = $('nav.rNav').height() + 55;
        var mh = target.next().height();
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

    var openNav = function(target) {
        console.log(target);
        target.addClass('open');
    };

    var closeNav = function(target) {
        console.log(target);
        target.removeClass('open');
    };


    var init = function() {
        menuStandUp();
    };

    $(init);

})(jQuery);
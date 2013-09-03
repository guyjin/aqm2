;(function($) {

    var menuOpen = false;
    var inMenu = false;
    var fh = ''; //global for content window height;



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
                    $('.singlemenu ul').css({'left':'-300px'});
                }
            });
            $(this).next().slideToggle(100);
        });

        $('nav.rNav h2').on('click', function() {
            openSubNav($(this));
        });

        $('.wideNav>ul>li').hoverIntent(
            function(){

                if ($(this).children('a').hasClass('menued')) {

                    $(this).addClass('open');
                    if($('.singlemenu', this).length === 1) {
                        $(this).addClass('onemenu');
                    }
                }
            },
            function() {
                $(this).removeClass('open');
            }
        );



        $('.singlemenu').hoverIntent(
            function() {
                var menu = $(this).children('ul');
                // var mh = $(this).children('ul').height;
                // var mt = $(this).children('ul').offset().top;
                // var mb = mh + mt;
                // var wh = $('.frame').height();
                // if(mb > wh) {
                //     var t = ((mh+mt) - wh)*-1;
                //     $(this).next().css({
                //         'top': t + 'px'
                //     });
                // }
                fixMenu(menu);
            },
            function() {
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

    var watchWindow = function() {
        $(window).on('resize', function() {
            fixSubs();
        });
    };

    var fixSubs = function() {
        $('.submenu').each(function() {
            fixMenu($(this));
        });
    };

    var fixMenu = function (menu) {
        fh = $('.frame').height(); // height of .frame;
        var fo = $('.frame').offset().top; //.frame offset from top of document window;
        var fb = fh + fo; // bottom of .frame
        console.log(fb);
        var h = menu.height(); // height of menu
        var t = menu.offset().top; // menu offset from the top of the window;
        //adding the offset and menu height tells us where the bottom of the menu is.
        var th = h + t;
        console.log(th);
        if(th > fb) {
            var diff = (th - fb);
            menu.css({'top':'-' + diff + 'px'});
        }
    };

    var init = function() {
        menuStandUp();
        watchWindow();
        fixSubs();
    };

    $(init);

})(jQuery);
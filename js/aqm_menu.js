;(function($) {

    var menuOpen = false;
    var inMenu = false;

    var menuStandUp = function() {
        $('body').addClass('menu_locked');
        $('nav').clone().appendTo('body').addClass('rNav');
        $('.menuctrl span').on('click', function() {
            if (!menuOpen) {
                showMenu();
            };
        });

        $('nav.rNav a.menued').on('click', function(event) {
            event.preventDefault();
            var tid = $(this).attr('id');
            $('a.menued').each(function() {
                eid = $(this).attr('id');
                if(eid !== tid && $(this).is(":visible")){
                    $(this).next().slideUp(100);
                }
            })
            $(this).next().slideToggle(100);
        });

        $('nav.rNav h2').on('click', function() {
            openSubNav($(this));
        })
    }

    var hideMenu = function() {
        $('body').removeClass('menu_locked').addClass('menu_hidden');
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
            })
        });

        $('.dept').animate({
            backgroundColor: '#4a6580',
            queue: false
        }, 300);
        $('.cloze').fadeOut({queue: false},300);
        $('.menu').fadeIn({queue:false},300);

        $('.section ul').css({'left':-300});

    }

    var showMenu = function() {
        $('body').removeClass('menu_hidden').addClass('menu_open');
        if($('nav.rNav').css('backgroundColor') !== 'rgb(49,49,49)'){
            var h = $('.frame').height();
            var hh = $('header').height();
            targeth = (h-hh);
            $('nav.rNav').css({'background-color':'rgb(49,49,49)'});
        }
        $('nav.rNav').animate({
            left: '0',
            width: '190',
            queue: false
        }, 100, function() {

            menuOpen = true;
        });
        $('.menu').fadeOut({queue:false},300);
        $('.cloze').fadeIn({queue: false},300);


        $(document).on('click', function() {
            if(menuOpen) {
                if(!inMenu){
                    hideMenu();
                }
            }
        })

        $('nav.rNav').on('mouseenter', function() {
            inMenu = true;
        });

        $('nav.rNav').on('mouseleave', function() {
            inMenu = false;
            hideMenu();
        });
    }

    var openSubNav = function(target) {
        var h = $('nav.rNav').height() + 55;
        var mh = target.next().height();
        console.log(parseInt(target.next().offset().top));
        $('.section ul').each(function(){
            if($(this).is(":visible")) {
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
    }


    var init = function() {
        menuStandUp();
    }

    $(init);

})(jQuery);
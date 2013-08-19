/*global define */
define([
    'jquery',
    'response',
    'dropkick',
    'icheck',
    'swipe',
    'fitvids'
], function (jQuery, response, dropkick, icheck, swipe, fitvids){
    'use strict';

    window.loadList = [];

    $ = jQuery;

    $('.zoetrope').each(function(){
        var $this = $(this);
        var opts = $this.data();

        if( !/^\./.test(opts.ext) ) opts.ext = '.' + opts.ext;

        var context = this.getContext('2d');

        var imgs = [];
        for(var i = 0; i < opts.frames; i++){
            var img = new Image();
            img.onload = function(){ if(imgs.length == opts.frames) setInterval(render, 200); };
            img.src = opts.dir + '/' + opts.name + i + opts.ext;
            imgs.push(img);
        }

        var f = 0;
        function render(){
            if(++f == opts.frames) f = 0;
            context.drawImage(imgs[f], 0, 0);
        }
    });

    $('.overlay').each(function(){
        var $this = $(this);
        var opts = $this.data();
        var $parent = $this.parent();
        var aspect;

        // Setup
        $parent.css({
            'position': 'relative'
        });

        $this.css({
            'position' : 'absolute',
            'left'     : '50%',
            'top'      : '50%'
        });

        this.onload = function(){
            aspect = 1;

            $(window).resize(sizeIt);
            sizeIt();
        }
        this.src = opts.src;

        window.loadList.push(sizeIt);

        function sizeIt(){
            var p_h = $parent.height();
            var p_w = $parent.width();

            var e_h = p_h * $this.data('ratio');
            var e_w = aspect * e_h;

            $this.css({
                'width'       : e_w,
                'height'      : e_h,
                'margin-left' : -e_w/2,
                'margin-top'  : -e_h/2
            });
        }
    });

    // $('.read-more__arrow').each(function(){
    //     var $this = $(this);

    //     var img = new Image();
    //     img.onload = sizeIt;
    //     img.src = this.src;

    //     function sizeIt(){
    //         var $parent = $this.parent();
    //         $this.css('position', 'absolute');
    //         var p_h = $parent.height();
    //         $this.css('position', 'static');
    //         $this.height(p_h);
    //     }

    //     $(window).resize(sizeIt);
    // });

    $('.read-more__arrow').each(function(){
        var $this = $(this);

        var img = new Image();
        img.onload = centerIt;
        img.src = this.src;

        function centerIt(){
            var $parent = $this.parent();
            var p_h = $parent.height();
            var e_h = $this.outerHeight();

            var margins = (p_h - e_h) / 2

            $this.css({
                'top': margins
            });
        }

        window.loadList.push(centerIt);

        $(window).resize(centerIt);
    });

    window.loadComplete = function(){
        var list = window.loadList, i = list.length;

        while(i--){
            list[i]();
        }
    }

    $('.nav').each(function(){
        var $this = $(this);
        var $activate = $this.find('.nav__activate');
        var $items = $this.find('.nav__item');

        var toggle = true;
        $activate.click(function(){
            if(toggle){
                $items.each(function(i){
                    var $this = $(this);
                    setTimeout(function(){
                        $this.toggleClass('active');
                    }, i * 90);
                });
                toggle = false;
            }
            else{
                var l = $items.length;
                $items.each(function(i){
                    var $this = $(this);
                    setTimeout(function(){
                        $this.toggleClass('active');
                    }, (l - i) * 90);
                });
                toggle = true;
            }
        });
    });

    $('input[type="text"], input[type="email"], textarea').each(function(){
        var $input = $(this);

        $input.wrap('<div class="input-type-text"/>');
    });

    window.loadList.push(function(){
        $('select').dropkick();
    });

    $('[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_minimal-grey',
        radioClass: 'iradio_minimal-grey',
        inheritClass: true
    }).on('ifChanged', function(event){
        var $input = $(event.target);
        var $label = $input.parent().parent();

        if($input.is(':checked')){
            $label.addClass('isChecked');
        }
        else{
            $label.removeClass('isChecked');
        }
    });

    var $form   = $('#mc-embedded-subscribe-form');
    var $button = $form.find('#mc-embedded-subscribe');
    var $email  = $form.find('#mce-EMAIL');

    $button.click(function(e){
        e.preventDefault();

        if(/@/.test($email.val())){
            var interests = [];

            $('input[name="INTEREST"]').each(function(){
                var $this = $(this);

                if($this.is(':checked')){
                    interests.push($this.val());
                }
            }).last().val(interests.join(','));

            $form.submit();
        }
        else{
            $email.css('outline', '4px solid red');
        }
    });

    var $carousel = $('#mySwipe');

    window.loadList.push(function(){
        $carousel.Swipe({
           startSlide: 4,
           auto: 3000,
           continuous: true,
          // disableScroll: true,
          // stopPropagation: true,
           callback: function(index, element) {},
           transitionEnd: function(index, element) {}
        });

        var mySwipe = $carousel.data('Swipe');

        $('#swipe_prev').click(function(){
            mySwipe.prev();
        });

        $('#swipe_next').click(function(){
            mySwipe.next();
        });
    });

    window.meep = $(".fitvid").fitVids();
});

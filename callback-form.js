/**
 * Created by quix on 28.01.15.
 */


$(function(){

    $.fn.callbackForm = function($params) {

        var self = $.fn.callbackForm;

        $.fn.callbackForm.initCss();

        var defaultParams = {
            analyticsType: 'callbackForm',
            position: 'anywhere',
            closeFormTime: 3000
        };
        $params = $.extend(defaultParams, $params);

        $(this).data('params', $params);
        $(this).bind('click', function(e){
            e.preventDefault();

            var tag = $(this);
            var params = tag.data('params');
            params.position = tag.data('position');
            if(!params.position)
                params.position = '';

            self.buildForm(tag, params);
        });

        return this;
    };

    $.fn.callbackForm.buildForm = function(e, $params) {

        $.fn.callbackForm.close();

        try {
            ga('send', 'event', $params.analyticsType, 'shown', $params.position);
            $params.ya.reachGoal($params.analyticsType, {'action': 'shown', 'position': $params.position});
        } catch(err) {}

        var html = '';
        html = '' +
        '<div id="callback-form">' +
        '<a href="#close">+</a>' +
        '<div class="wrapper">' +
        '<div class="title">'+ $params.title +'</div>' +
        '<form action="'+ $params.url +'" method="post">';

        if($params.fields) {
            for(var i in $params.fields) {
                var field = $params.fields[i];

                html += '<div class="item">';

                if(field.type == 'textarea') {
                    html += '<textarea name="'+ field.name +'" '+ (field.required ? ' required=""' : '') +' '+ (field.placeholder ? 'placeholder="'+ field.placeholder +'"' : '') +' row="4" col="30"></textarea>';
                }
                else {
                    html += '<input type="'+ (field.type ? field.type : 'text') +'" name="'+ field.name +'" '+ (field.required ? ' required=""' : '') +' '+ (field.placeholder ? 'placeholder="'+ field.placeholder +'"' : '') +' />';
                }

                html += '</div>';
            }
        }

        html += '<button type="submit">'+ $params.sendButton.title +'</button>';

        html += '' +
        '</form>' +
        '</div>' +
        '</div>';

        var win = $(html).appendTo('body');

        var leftOffset = e.offset().left;

        if(leftOffset + win.width() >= $(window).width()) {
            leftOffset = leftOffset + (e.width() / 2) - win.width();
        }

        win.css({
            borderRadius: '5px',
            boxShadow: '0 0 8px 5px #ccc',
            background: '#fff',
            padding: '20px',
            position: 'absolute',
            top: e.offset().top + e.height() + 4,
            left: leftOffset
        });

        win.find('>a').bind('click', function(e){
            e.preventDefault();

            try {
                ga('send', 'event', $params.analyticsType, 'closed', $params.position);
                $params.ya.reachGoal($params.analyticsType, {'action': 'closed', 'position': $params.position});
            } catch(e) {}

            $.fn.callbackForm.close();
        });

        win.find('form').bind('submit', function(e){
            e.preventDefault();

            $.fn.callbackForm.doSubmit($(this), $params);
        });
    };

    $.fn.callbackForm.close = function() {
        $('#callback-form')
            .unbind('submit')
            .remove();
    };

    $.fn.callbackForm.initCss = function() {
        $('head').append(
            '<style type="text/css"> #callback-form{width: 250px;} #callback-form input{box-sizing:border-box; width: 100%; padding:4px 5px;} #callback-form textarea{box-sizing:border-box; width: 100%; padding: 4px 5px;} #callback-form button{box-sizing:border-box; padding: 4px 25px;} #callback-form .title{font-size: 25px; margin: 0 0 20px;} #callback-form .item {margin: 0 0 15px;} #callback-form >a {position: absolute; right: 20px; top: 5px; width: 10px; height: 10px; text-decoration: none; color: #880000; font-size: 28px; -webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3); }  </style>'
        );
    };

    $.fn.callbackForm.doSubmit = function(form, $params) {

        if($params.fields) {
            for(var i in $params.fields) {
                var field = $params.fields[i];

                if(field.required === true) {
                    var input = form.find(':input[name="' + field.name + '"]');

                    if(input.val() == '') {
                        input.css({
                            border: '1px solid #c00'
                        });
                        input.focus();

                        return false;
                    }
                }
            }
        }

        form.css({'visibility': 'hidden'});
        form.parent().css({
            background: "url('data:image/gif;base64,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') no-repeat center center"
        });

        form.append($('<input type="hidden" name="url" value="'+ window.location.href +'" />'));

        $.post($params.url, form.serialize(), function(response){

            try {
                ga('send', 'event', $params.analyticsType, 'sent', $params.position);
                $params.ya.reachGoal($params.analyticsType, {'action': 'sent', 'position': $params.position});
            } catch(e) {}

            var text = response;

            form.parents('.wrapper').html(text).css({background: 'none'});

            window.setTimeout(function(){
                $.fn.callbackForm.close();
            }, $params.closeFormTime);

        }, 'text');

    };



    /*$('.callback-form').callbackForm({
        url: '/send.php',
        title: 'Callback',
        fields: [
            {name: 'name', placeholder: 'Name', required: true},
            {name: 'email', placeholder: 'Phone or e-mail', required: true},
            {name: 'comment', placeholder: 'Your comment', type: 'textarea'}
        ],
        sendButton: {title: 'Send'},
        ya: 'yandexXXXXXX',
        analyticsType: 'callbackForm'
    });

    $('.lt-header-desc').callbackForm({
        url: '/send.php',
        title: 'Callback 2',
        fields: [
            {name: 'name', placeholder: 'Name', required: true},
            {name: 'email', placeholder: 'Phone or e-mail', required: true},
            {name: 'comment', placeholder: 'Your comment', type: 'textarea'}
        ],
        sendButton: {title: 'Send'},
        ya: 'yandexXXXXXX',
        analyticsType: 'consultationForm'
    });*/

});


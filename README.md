# callback-form

<script src="callback-form.js"></script>

$('a.callback').callbackForm({
    url: '/send.php',
    title: 'Callback',
    fields: [
        {name: 'name', placeholder: 'Name', required: true},
        {name: 'email', placeholder: 'Phone or e-mail', required: true},
        {name: 'comment', placeholder: 'Your comment', type: 'textarea'}
    ],
    sendButton: {title: 'Send'},
    ya: 'yandexXXXXXX'
});

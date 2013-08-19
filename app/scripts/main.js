require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        response: 'response',
        dropkick: '../components/jquery-dropkick/jquery.dropkick-1.0.0',
        icheck: '../components/jquery-icheck/jquery.icheck.min',
        bootstrap: 'vendor/bootstrap',
        swipe: 'vendor/swipe',
        fitvids: '../components/fitvids/jquery.fitvids'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        response: {
            deps: ['jquery'],
            exports: 'Response'
        },
        dropkick: {
            deps: ['jquery']
        },
        icheck: {
            deps: ['jquery']
        },
        swipe: {
            deps: ['jquery'],
            exports: 'Swipe'
        },
        fitvids: {
            deps: ['jquery']
        }
    }
});

require(['app', 'jquery', 'response'], function (app, $, response) {
    'use strict';

});

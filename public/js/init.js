require.config({
    paths: {
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
        jquery: '../vendor/jquery/dist/jquery.min'
    }
});

require([
    'jquery',
    'bootstrap'
]);
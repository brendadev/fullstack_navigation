//public/main.js
//referenced by /views/insurance.jade
require.config({
    paths: {
        jquery          : 'libs/jquery/jquery',
        moment          : 'libs/moment/moment',
        masonry         : 'libs/masonry/masonry',
        underscore      : 'libs/underscore/underscore',
        backbone        : 'libs/backbone/backbone',
        scrollbar       : 'libs/perfect-scrollbar/perfect-scrollbar.jquery',
        jscrollbar      : 'libs/perfect-scrollbar/perfect-scrollbar',
        highchart       : 'libs/highchart/highcharts',
        templates       : '../templates'
    }

});

require([
    'client'
], function(App){

    window.App = App;
    window.App.initialize();
});

window.debug = true;

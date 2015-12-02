//public/assets/js/views/app.view.js
//referenced by /public/router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'masonry',
    'collections/insurance.data.collection',
    'views/insurance.graph.view',
    'views/side.menu.view',
    'views/page.flow.view'
], function(
        $,_,Backbone,Masonry,InsuranceDataCollection,
        InsuranceGraphView,SideMenuView,PageFlowView
    ){
    var AppView = Backbone.View.extend({
        el: $('#myApp'),
        initialize: function () {
            this.subViews = new Array();
            this.procData();
        },
        render: function () {
            return this;
        },
        procData:function(){
            _.each(this.subViews, function(v){
                window.utils.cleanView(v);
            });
            //add side menu
            var sideMenuView = new SideMenuView();
            this.subViews.push(sideMenuView);
            this.$('.leftNav').append(sideMenuView.render().el);

            var pageFlowView = new PageFlowView();
            this.subViews.push(pageFlowView);
            this.$('.main').append(pageFlowView.render().el);
        }
    });
    return AppView;
});

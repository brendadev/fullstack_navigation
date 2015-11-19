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
            //instantiating collection, so all views have access to this
            this.insuranceData = new InsuranceDataCollection();
            this.insuranceData.bind('sync',this.procData,this);
            this.insuranceData.fetch({cache:false});
            this.subViews = new Array();
        },
        procData:function(){
            _.each(this.subViews, function(v){
                window.utils.cleanView(v);
            });
            //add side menu
            var sideMenuView = new SideMenuView();
            this.subViews.push(sideMenuView);
            this.$('.leftNav').append(sideMenuView.render().el);

            //console.log(this);
            //calculate insurance/uninsured values
            this.insuranceData.each(function(model){
                model.set({'percentUninsured': (model.attributes.number_uninsured/model.attributes.population)*100});
                model.set({'percentInsured': (model.attributes.number_insured/model.attributes.population)*100});
            },this);
            // instantiate views
            //var newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "line"});
            //this.$('.main').append(newGraphView.render().el);
            //newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "bar"});
            //this.$('.main').append(newGraphView.render().el);

            // requires /public/views/page.flow.view.js
            var pageFlowView = new PageFlowView();
            this.subViews.push(pageFlowView);

            this.$('.main').append(pageFlowView.render().el);
        },
        render: function () {
            //var insuranceView = new InsuranceView();
            //this.$('main').append(insuranceView.render().el);
            return this;
        }
    });
    return AppView;
});

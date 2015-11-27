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
            //this.insuranceData = new InsuranceDataCollection();
            //this.insuranceData.bind('sync',this.procData,this);
            //this.insuranceData.fetch({cache:false});
            this.subViews = new Array();
            this.procData();
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
            //this.insuranceData.each(function(model){
            //    model.set({'percentUninsured': (model.attributes.number_uninsured/model.attributes.population)*100});
            //    model.set({'percentInsured': (model.attributes.number_insured/model.attributes.population)*100});
            //},this);
            // instantiate views
            //var newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "line"});
            //this.$('.main').append(newGraphView.render().el);
            //newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "bar"});
            //this.$('.main').append(newGraphView.render().el);

            // requires /public/views/page.flow.view.js
            var pageFlowView = new PageFlowView();
            //RE: in general I would push the the subviews array after the view is rendered
            //RE: this is safer because if an error occurs in the view reneder the subview array
            //RE: wont contain a broken view

            this.subViews.push(pageFlowView);

            this.$('.main').append(pageFlowView.render().el);
        },
        //RE: I would always put the render function after the initialize function
        //RE: because it is a standard backbone method
        //RE: initialize and render are the only backbone methods
        //RE: this means that all the view specific code follows the standard code
        //RE: which in long lines of code improves readability

        render: function () {
            //var insuranceView = new InsuranceView();
            //this.$('main').append(insuranceView.render().el);
            return this;
        }
    });
    return AppView;
});

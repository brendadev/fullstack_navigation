define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'collections/insurance.data.collection',
    'views/insurance.graph.view',
    'text!templates/page.flow.template.html'
],function(
    $,_,Backbone,Moment,InsuranceDataCollection,
    InsuranceGraphView, Template
    ){
    var PageFlowView = Backbone.View.extend({
        className: 'profile clear pb',
        template: _.template(Template),
        events:function(){
            var base = {
                'change #selectProgram': 'loadProgram'
            };
            if (window.utils.isTouch()){
                var click = {

                };
            } else {
                var click = {

                };
            }
            $.extend(base,click);
            return base;
        },
        initialize: function(){
            console.log("1.at initialize");
            this.debugName = 'page flow view';
            this.insuranceData = new InsuranceDataCollection();
            this.insuranceData.bind('sync',this.procData,this);
            this.insuranceData.fetch({cache:false});
            this.subViews = new Array();
            this.programIndex = 0;
        },
        procData: function(){
            console.log("2.at procData");
            $(this.el).html(this.template());

            //calculate insurance/uninsured values
            this.insuranceData.each(function(model){
                model.set({'percentUninsured': (model.attributes.number_uninsured/model.attributes.population)*100});
                model.set({'percentInsured': (model.attributes.number_insured/model.attributes.population)*100});
            },this);
            console.log(this.insuranceData);
            if (window.utils.getQueryStringParameter('viewid') != '') {
                this.programIndex=window.utils.getQueryStringParameter('viewid');
                this.loadView();
            } else {
                this.loadProgram();
            }
            //this.loadProgram();
            return this;
        },
        loadProgram: function(){
            console.log("3.at loadProgram");
            window.utils.output(this.debugName, 'selected program index is ' + this.programIndex);
            this.programIndex = this.$('#selectProgram')[0].selectedIndex;
            this.cleanUI();
            switch(parseInt(this.programIndex)){
                case 0:
                    console.log("Chart + table view");
                    // instantiate views
                    var newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "line"});
                    this.$('.graph').append(newGraphView.render().el);
                    break;
                case 1:
                    console.log("Chart + map view");
                    newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "bar"});
                    this.$('.graph').append(newGraphView.render().el);
                    break;
                default:
            }
            //seems like the subViews is used to keep track of which views are being rendered,
            //so that these views can be all cleared with cleanUI
            //in this case, I used this technique to track the graphs and be able to remove
            //the previous one, so a new one could be rendered
            this.subViews.push(newGraphView);
        },
        loadView: function(){
            console.log("at loadView");
            //window.utils.output(this.debugName, 'selected program index is ' + this.programIndex);
            //this.programIndex = this.$('#selectProgram')[0].selectedIndex;
            console.log("load single view");
            //this.cleanUI();
            console.log(window.utils.getQueryStringParameter('viewid'));
            //switch(parseInt(this.programIndex)){
            //    case 0:
            //        console.log("Chart + table view");
            //        break;
            //    case 1:
            //        console.log("Chart + map view");
            //        break;
            //    default:
            //}
        },
        cleanUI: function(){
            console.log("4.at cleanUI");
            _.each(this.subViews, function(sv){
               window.utils.cleanView(sv);
            });
        }
    });
    return PageFlowView;
});
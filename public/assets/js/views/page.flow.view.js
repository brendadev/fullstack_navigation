define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'collections/insurance.data.collection',
    'views/insurance.graph.view',
    'views/table.view',
    'views/map.view',
    'text!templates/page.flow.template.html'
],function(
    $,_,Backbone,Moment,InsuranceDataCollection,
    InsuranceGraphView, TableView, MapView, Template
    ){
    var PageFlowView = Backbone.View.extend({
        className: 'profile clear pb',
        template: _.template(Template),
        events:function(){
            var base = {
                'change #selectProgram': 'loadSelectedView'
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
            //console.log("1.at initialize");
            this.debugName = 'page flow view';
            this.insuranceData = new InsuranceDataCollection();
            this.insuranceData.bind('sync',this.procData,this);
            this.insuranceData.fetch({cache:false});
            this.subViews = new Array();
            this.programIndex = 0;
        },
        render: function(){
            return this;
        },
        procData: function(){
            //console.log("2.at procData");
            $(this.el).html(this.template());

            this.insuranceData.each(function(model){
                model.set({'percentUninsured': (model.attributes.number_uninsured/model.attributes.population)*100});
                model.set({'percentInsured': (model.attributes.number_insured/model.attributes.population)*100});
            },this);

            if (window.utils.getQueryStringParameter('v') != '') {
                this.loadFromQueryString();
            } else {
                this.loadProgram();
            }

            return this;
        },
        loadSelectedView:function() {
            this.programIndex = this.$('#selectProgram')[0].selectedIndex;
            this.loadProgram();
        },
        loadFromQueryString:function() {
            this.$('#selectProgram').val(window.utils.getQueryStringParameter('v'));
            this.programIndex = this.$('#selectProgram')[0].selectedIndex;
            this.loadProgram();
        },
        loadProgram: function(){
            //console.log("3.at loadProgram");
            window.utils.output(this.debugName, 'selected program index is ' + this.programIndex);

            this.cleanUI();
            var newGraphView;
            //var newTableView;
            switch(parseInt(this.programIndex)){
                case 0:
                    //console.log("Chart + table view");
                    // instantiate views
                    //RE: declare var newGraphView once at top
                    //RE: it is being declared new each case statement
                    //RE: admittedly I do this myself sometimes but shouldn't as it can lead to overwriting
                    newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "line"});
                    this.$('.graph').append(newGraphView.render().el);
                    this.subViews.push(newGraphView);
                    //debugger;
                    var newTableView = new TableView({collection: this.insuranceData});
                    this.$('.participantList').append(newTableView.render().el);
                    this.subViews.push(newTableView);
                    break;
                case 1:
                    //RE: fyi console.log should only be used temporarily
                    //RE: it can break IE if the IE debugger isn't running
                    //RE: window.utils.output checks for this potential error
                    //console.log("Chart + map view");
                    newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "bar"});
                    this.$('.graph').append(newGraphView.render().el);
                    this.subViews.push(newGraphView);

                    //var w = window.utils.screenSize().width;
                    //debugger;
                    //// var newMapView = new MapView({collection: this.insuranceData});
                    //var svm = new MapView(
                    //    {
                    //        collection: this.insuranceData,
                    //        width:      w
                    //    }
                    //);
                    //this.$('.map').append(svm.render().el);
                    //this.subViews.push(svm);

                    var newMapView = new MapView({collection: this.insuranceData});
                    this.$('.other').append(newMapView.render().el);
                    this.subViews.push(newMapView);
                    break;
                default:
            }
            //seems like the subViews is used to keep track of which views are being rendered,
            //so that these views can be all cleared with cleanUI
            //in this case, I used this technique to track the graphs and be able to remove
            //the previous one, so a new one could be rendered
        },
        cleanUI: function(){
            //console.log("4.at cleanUI");
            _.each(this.subViews, function(sv){
               window.utils.cleanView(sv);
            });
        }
    });
    return PageFlowView;
});
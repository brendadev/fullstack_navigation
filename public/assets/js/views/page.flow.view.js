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
            this.debugName = 'page flow view';
            this.insuranceData = new InsuranceDataCollection();
            this.insuranceData.bind('sync',this.procData,this);
            this.insuranceData.fetch({cache:false});
            this.subViews = new Array();
            this.programIndex = 0;
        },
        render: function(){
            $(this.el).html(this.template());
            return this;
        },
        procData: function(){
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
            window.utils.output(this.debugName, 'selected program index is ' + this.programIndex);
            this.cleanUI();
            var newGraphView;

            switch(parseInt(this.programIndex)){
                case 0:
                    newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "line"});
                    this.$('.graph').append(newGraphView.render().el);
                    this.subViews.push(newGraphView);

                    var newTableView = new TableView({collection: this.insuranceData});
                    this.$('.participantList').append(newTableView.render().el);
                    this.subViews.push(newTableView);
                    break;
                case 1:

                    newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "bar"});
                    this.$('.graph').append(newGraphView.render().el);
                    this.subViews.push(newGraphView);

                    var newMapView = new MapView({collection: this.insuranceData});
                    this.$('.other').append(newMapView.render().el);
                    this.subViews.push(newMapView);
                    break;
                default:
            }
        },
        cleanUI: function(){
            _.each(this.subViews, function(sv){
               window.utils.cleanView(sv);
            });
        }
    });
    return PageFlowView;
});
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'views/insurance.graph.view',
    'text!templates/page.flow.template.html'
],function(
    $,_,Backbone,Moment,
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
            this.debugName = 'page flow view';
            this.subViews = new Array();
            this.programIndex = 0;
        },
        render: function(){
            $(this.el).html(this.template());

            //calculate insurance/uninsured values
            //this.insuranceData.each(function(model){
            //    model.set({'percentUninsured': (model.attributes.number_uninsured/model.attributes.population)*100});
            //    model.set({'percentInsured': (model.attributes.number_insured/model.attributes.population)*100});
            //},this);

            if (window.utils.getQueryStringParameter('viewid') != '') {
                this.programIndex=window.utils.getQueryStringParameter('viewid')
                this.loadView();
            } else {
                this.loadProgram();
            }
            //this.loadProgram();
            return this;
        },
        loadProgram: function(){
            window.utils.output(this.debugName, 'selected program index is ' + this.programIndex);
            this.programIndex = this.$('#selectProgram')[0].selectedIndex;
            console.log("load multiple program");
            this.cleanUI();
            switch(parseInt(this.programIndex)){
                case 0:
                    console.log("Chart + table view");
                    // instantiate views
                    //var newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "line"});
                    //this.$('.linegraph').append(newGraphView.render().el);
                    break;
                case 1:
                    console.log("Chart + map view");
                    break;
                default:
            }
            //this.loadView();
        },
        loadView: function(){
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
            _.each(this.subViews, function(sv){
               window.utils.cleanView(sv);
            });
        }
    });
    return PageFlowView;
});
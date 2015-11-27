define([
    'jquery',
    'underscore',
    'backbone',
    //'views/state.data.view',
    'text!templates/table.view.template.html'
], function(
    $,_,Backbone,Template
){
    var StateTableView = Backbone.View.extend({
        className: 'row border_top_gray',
        template:_.template(Template),
        initialize: function(options) {
            this.debugName = 'table view';
            this.data = options.collection;
            //debugger;
        },
        render: function() {
            $(this.el).html(this.template());
            this.showData();
            return this;
        },
        showData:function() {
            var frag = document.createDocumentFragment();
            console.log(this.data.models);
            this.columns = [{displayName: "state name"},
                            {displayName: "insured"},
                            {displayName: "uninsured"},
                            {displayName: "population"}];

            //_.each(this.columns,function(c){
            //    this.hasData = false;
            //    var isString = false;
            //    var dp = {};
            //    var numNoData = 0;
            //    switch(c.displayName) {
            //        case 'State Name':
            //            dp.value = this.model.get('name');
            //            console.log(dp.value);
            //            this.hasData = true;
            //            isString = true;
            //            var d = document.createElement('div');
            //            d.className = 'span' + this.columns.length + 'col rowCell left';
            //            d.innerHTML =dp.value;
            //            frag.appendChild(d);
            //            console.log(frag);
            //            //debugger;
            //            break;
            //        default:
            //            console.log("at default");
            //    }
            //},this);

            //this.$('.partShowMore').attr('data','&m=' + this.columns[1].type + '&t=' + this.columns[1].name);
            //this.$('.rowData').append(frag);

            //var smv = new StateDataView({
            //    progId      : this.progId
            //    ,userId     : this.model.get('userId')
            //    ,type       : window.utils.getDataParameter(d,'m')
            //    ,units      : window.utils.getDataParameter(d,'u')
            //    ,startWeek  : startWeek
            //    ,endWeek    : endWeek
            //    ,days       : this.days
            //    ,startDate      : this.startDate
            //    ,endDate        : this.endDate
            //});
            //this.subviews.push(smv);
        }
    });
    return StateTableView;
});

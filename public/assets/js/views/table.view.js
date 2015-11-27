define([
    'jquery',
    'underscore',
    'backbone',
    'views/state.data.view',
    'text!templates/table.view.template.html'
], function(
    $,_,Backbone,StateDataView,Template
){
    var StateTableView = Backbone.View.extend({
        className: 'row border_top_gray',
        template:_.template(Template),
        initialize: function(options) {
            this.debugName = 'table view';
            this.data = options.collection;
            //console.log(this.data);
            this.subViews = new Array();
            //debugger;
        },
        render: function() {
            $(this.el).html(this.template());
            //debugger;
            this.showData();
            return this;
        },
        showData:function() {
            var frag = document.createDocumentFragment();
            this.columns = [{displayName: "state name"},
                {displayName: "insured"},
                {displayName: "uninsured"},
                {displayName: "population"}];

            this.data.each(function(p){
                console.log(p);
                var smv = new StateDataView({
                    model: p,
                    columns: this.columns
                });
                frag.appendChild(smv.render().el);
                this.subViews.push(smv);
            }, this);
            this.$('.rowIcon').append(frag);
        }
    });
    return StateTableView;
});

define([
    'jquery',
    'underscore',
    'backbone'
], function(
    $,_,Backbone
){
    var StateDataView = Backbone.View.extend({
        className: 'row border_top_gray',
        //template:_.template(Template),
        initialize: function() {
            this.debugName = 'table view';
            //debugger;
        },
        render: function() {
            $(this.el).html(this.template());
            this.showData();
            return this;
        },
        showData:function() {
            var frag = document.createDocumentFragment();
            debugger;
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
            //
            ////this.$('.partShowMore').attr('data','&m=' + this.columns[1].type + '&t=' + this.columns[1].name);
            //this.$('.rowData').append(frag);
        }
    });
    return StateDataView;
});

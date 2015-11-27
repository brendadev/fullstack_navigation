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
        initialize: function(options) {
            this.debugName = 'table view';
            this.columns = options.columns;
            this.model = options.model;
            //debugger;
        },
        render: function() {
            //$(this.el).html(this.template());
            this.showData();
            return this;
        },
        showData:function() {
            var frag = document.createDocumentFragment();
            //displayName: "state name"
            //displayName: "insured"
            //displayName: "uninsured"
            //displayName: "population"
            //debugger;
            _.each(this.columns,function(c){
                console.log(c.displayName);
            //    this.hasData = false;
            //    var isString = false;
                var dp = {};
            //    var numNoData = 0;
                switch(c.displayName) {
                    case 'state name':
                        dp.value = this.model.get('name');
                        console.log("state: " + dp.value);
                        //this.hasData = true;
                        //isString = true;
                        var d = document.createElement('div');
                        d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = dp.value;
                        frag.appendChild(d);
                        console.log(frag);
                        debugger;
                        break;
                    default:
                        console.log("at default");
                }
                this.$('.rowData').append(frag);
            },this);
            //
            ////this.$('.partShowMore').attr('data','&m=' + this.columns[1].type + '&t=' + this.columns[1].name);
        }
    });
    return StateDataView;
});

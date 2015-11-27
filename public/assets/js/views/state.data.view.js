define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/state.data.template.html'
], function(
    $,_,Backbone
){
    var StateDataView = Backbone.View.extend({
        //className: 'row border_top_gray',
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
                switch(c.displayName) {
                    case 'state name':
                        var d = document.createElement('div');
                        d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('name');
                        frag.appendChild(d);
                        //console.log(frag);
                        //debugger;
                        break;
                    case 'insured':
                        var d = document.createElement('div');
                        d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('number_insured');
                        frag.appendChild(d);
                        //console.log(frag);
                        //debugger;
                        break;
                    case 'uninsured':
                        var d = document.createElement('div');
                        d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('number_uninsured');
                        frag.appendChild(d);
                        //console.log(frag);
                        //debugger;
                        break;
                    case 'population':
                        var d = document.createElement('div');
                        d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('population');
                        frag.appendChild(d);
                        //console.log(frag);
                        break;
                    default:
                        console.log("at default");
                }
                //debugger;
                $(this.el).append(frag);
            },this);
            //
            ////this.$('.partShowMore').attr('data','&m=' + this.columns[1].type + '&t=' + this.columns[1].name);
        }
    });
    return StateDataView;
});

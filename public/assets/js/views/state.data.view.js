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
            var d;
            _.each(this.columns,function(c){
                //console.log(c.displayName);
                d = document.createElement('div');
                d.className = 'span' + this.columns.length + 'col rowCell left';
                switch(c.displayName) {
                    case 'state name':
                        //RE: the next 2 lines are repeated so can go above _.each(this.columns...
                        //RE: first to admit I don't always do this myself and should do
                        //d = document.createElement('div');
                        //d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('name');
                        //RE: I would put this next line outside the switch
                        //RE: so it runs if the switch code works
                        frag.appendChild(d);
                        //console.log(frag);
                        //debugger;
                        break;
                    case 'insured':
                        //d = document.createElement('div');
                        //d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('number_insured');
                        frag.appendChild(d);
                        //console.log(frag);
                        //debugger;
                        break;
                    case 'uninsured':
                        //d = document.createElement('div');
                        //d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('number_uninsured');
                        frag.appendChild(d);
                        //console.log(frag);
                        //debugger;
                        break;
                    case 'population':
                        //d = document.createElement('div');
                        //d.className = 'span' + this.columns.length + 'col rowCell left';
                        d.innerHTML = this.model.get('population');
                        frag.appendChild(d);
                        //console.log(frag);
                        break;
                    default:
                        console.log("at default");
                }
                //debugger;
                //RE: if I am not mistaken this line should go outside the _.each
                $(this.el).append(frag);
            },this);
            //
            ////this.$('.partShowMore').attr('data','&m=' + this.columns[1].type + '&t=' + this.columns[1].name);
        }
    });
    return StateDataView;
});

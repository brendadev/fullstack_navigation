define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'collections/programs.collection',
    'text!templates/page.flow.template.html'
],function(
    $,_,Backbone,Moment,
    ProgramCollection,Template
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
            this.programs = new ProgramCollection();
            this.programs.bind('sync',this.progPrograms,this);
            this.programs.fetch({cache:false});
            this.subViews = new Array();
            this.programIndex = 0;
        },
        render: function(){
            $(this.el).html(this.template());
            return this;
        },
        loadProgram: function(){
            this.programIndex = this.$('#selectProgram')[0].selectedIndex;
            window.utils.output(this.debugName, 'selected program index is' + this.programIndex);
            this.cleanUI();
            this.getProgramByIndex();
        },
        cleanUI: function(){
            _.each(this.subViews, function(sv){
               window.utils.cleanView(sv);
            });
        },
        progPrograms: function(){
            this.$('#selectProgram').empty();
            this.programs.each(function(p){
              var o = $('<option>',{value: p.get('progId'),text:p.get('title')});
              this.$('#selectProgram').append(o);
            },this);
            this.getProgramByIndex();
        },
        getProgramByIndex: function(){
            this.$('.createProgram').attr('href','/' + this.programs.models[this.programIndex].get('progId'));
        }
    });
    return PageFlowView;
});
define([
    'underscore',
    'backbone',
    'models/program.model'
], function(_,Backbone,ProgramModel){
    var ProgramsCollection = Backbone.Collection.extend({
        model: ProgramModel,
        url: function(){
            return '/program';
        },
        initialize: function(){
            this.debugName = 'programs collection';
            //this.id = options.id;
        },
        comparator: function(o){
            return o.get('progId');
        },
        parse: function(response){
            if(response.status == 200){
                return response.data;
            } else {
                console.log('no data available');
                return null;
            }
        }
    });
    return ProgramsCollection;
});
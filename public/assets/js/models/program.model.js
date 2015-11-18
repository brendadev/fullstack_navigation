define([
    'underscore',
    'backbone'
],function(_, Backbone){
    var programModel = Backbone.Model.extend({
        idAttribute: 'progId',
        url: function(){
            // this a route, so /server_routes file is referenced
            return '/program';
        },
        initialize: function(options){
            if(typeof options != 'undefined'){
                this.id = options.id;
            }
        },
        parse: function(response){
            return response.data;
        },
        validate: function(attrs,options){

        }
    });
    return programModel;
});
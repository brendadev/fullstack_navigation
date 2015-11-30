//public/assets/js/collections/states.data.collections.js

define([
    'underscore',
    'backbone',
    'models/state.data.model'
], function(_, Backbone, StateDataModel){
    var StatesDataCollection = Backbone.Collection.extend({
        model:StateDataModel,
        url: function() {
            return '/data/states';
        },
        initialize: function() {
            return this;
        },
        parse:function(response) {
            //console.log(response.data);
            return response.data;
        }
    });
    return StatesDataCollection;
});

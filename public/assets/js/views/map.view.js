define([
    'jquery',
    'underscore',
    'backbone',
    'collections/states.data.collection',
    'highchart'
], function(
    $,_,Backbone,
    StatesDataCollection, Highchart
){
    var MapView = Backbone.View.extend({
        el:'.map',
        initialize:function(options) {
            //var _this = this;
            this.hdata = options.collection;
            this.states = new StatesDataCollection();
            this.states.bind('sync',this.procData,this);
            this.states.fetch();
        },
        render: function() {
            return this;
        },
        procData:function() {
            // Create array from collection's name attributes
            //var xlabels = new Array();
            var plotData = [];
            this.hdata.each(function(model){
                plotData.push({
                    xlabel: model.get('name'),
                    statePop: model.get('population'),
                    stateIns: model.get('number_insured'),
                    stateUnins: model.get('number_uninsured')
                });
            },this);
            //console.log(plotData);
            //debugger;
            plotData.sort(function(a,b){
                //console.log(a);
                //console.log(a.statePop);
                //console.log(typeof(a.population));
                if(a.statePop < b.statePop){
                    return 1;
                }
                if(a.statePop > b.statePop){
                    return -1;
                }
                return 0;
            });
            //console.log(plotData);
            //debugger;

            //first step is to initialize required map arrays in correct format
            //second step is to fill the arrays by iterating through the hdata models

            var categories = new Array();
            var series = new Array();
            series=new Array(3);
            series[0] = {name:"Population",data:[]};
            series[1] = {name:"Insured",data:[]};
            series[2] = {name:"Un-Insured",data:[]};

            //note that model.attributes can be shortcut to model.get('attributeName')
            //each method provided by underscore.js
            this.hdata.each(function(d){
                d.set({percentInsured:parseFloat((d.get('number_insured')/ d.get('population')))});
                categories.push(d.get('name'));
                series[0].data.push(d.get('population'));
                series[1].data.push(d.get('number_insured'));
                series[2].data.push(d.get('number_uninsured'));
            },this);
            //console.log(this.hdata);
            //debugger;

            var polygons = new Array();
            this.states.each(function(s){

                var p = {
                    name:s.get('name'),
                    poly:[]
                };

                _.each(s.get('point'),function(ll){
                    p.poly.push({lat:parseFloat(ll.lat),lng:parseFloat(ll.lng)});
                },this);

                polygons.push(p);

            },this);

            this.makeMap(polygons);
        },
        makeMap:function(polygons) {
            //once we have state outlines in polygons we can make a map
            //google map will not load until the html document [DOM]
            //is ready to receive content and fully loaded - so we do document.ready
            //the use of document.ready changes context so we need to use that=this
            //to store the parent context and can access it inside document.ready
            //which is an anonymous closure
            var _this = this;
            //console.log(_this);
            //map code goes here

            $(document).ready(function() {
                var styles = [
                    {
                        featureType: "all",
                        elementType: "all",
                        stylers: [
                            { saturation: -100 }
                        ]
                    }
                ];
                _this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: {lat: 38, lng: -95},
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                //the percent insured data are all very close in size so we need to define
                //a shading scale the spreads out the shades of the polygons across this small
                //range - otherwise (as found out first time I ran the code)
                //all polygons fill with the "same" opacity

                var ia = _this.hdata.pluck('percentInsured');
                //console.log(ia);
                var imin = _.min(ia);
                var imax = _.max(ia);

                _this.mapPoly = new Array();
                _.each(polygons,function(p){
                    var i = _this.hdata.find(function(h){
                        return h.get('name') == p.name;
                    });
                    var poly = new google.maps.Polygon({
                        paths:p.poly,
                        strokeColor: '#343434',
                        strokeOpacity: 0.8,
                        strokeWeight: 1,
                        fillColor: '#00B1B5',
                        fillOpacity:((i.get('percentInsured')-imin)/(imax-imin))+0.05
                    });
                    _this.mapPoly.push(poly);
                });
                _.each(_this.mapPoly,function(poly){
                    poly.setMap(_this.map);
                });
            });
        }
    });
    return MapView;
});

var customMap = (function(){
    // Put your private variables and functions here
    var e = null;
    return { // Here are the public methods
        addMap:function(e){   
        	customMap.e = e;    
        	require({
                waitSeconds : 120, //make sure it is enough to load all gmaps scripts
                paths : {
                    async : 'lib/src/async' //alias to plugin
                }
            });
        		               
            require(['lib/OpenLayers-2.13.1/OpenLayers.debug','async!http://maps.google.com/maps/api/js?sensor=false'], function() {
				var bounds4326 = new this.OpenLayers.Bounds(-180,-90,180,90);
				var options4326 = {
						numZoomLevels: 20, 
						units: 'degrees',
						projection: new this.OpenLayers.Projection("EPSG:4326"),//900913
						displayProjection: new this.OpenLayers.Projection("EPSG:4326"),
						controls: []
					};
				var bounds900913 = new this.OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34);
				
				var options900913 = {
				    projection: new this.OpenLayers.Projection("EPSG:900913")
				    ,displayProjection: new this.OpenLayers.Projection("EPSG:4326")
				    ,units: "m"
				    ,maxResolution: 156543.0339//156543.0339
				    ,maxExtent: bounds900913
				    ,restrictedExtent: bounds900913
				    ,controls: []
				};				
				
			    var map = new this.OpenLayers.Map(customMap.e.targetDiv,options900913);
			
				var ol_wms = new this.OpenLayers.Layer.WMS(
				    "OpenLayers WMS",
				    "http://vmap0.tiles.osgeo.org/wms/vmap0",
				    {layers: "basic"}
				);
				
				var gstr = new this.OpenLayers.Layer.Google(
					"Google Streets",
					{
						'sphericalMercator': true,
						transitionEffect:"resize"
					}
				);
				
				var gphy = new this.OpenLayers.Layer.Google(
						"Google Physical",
						{
							'sphericalMercator': true,
							type: this.google.maps.MapTypeId.TERRAIN
						}
				);
					    
	   			 var ghyb = new this.OpenLayers.Layer.Google(
						"Google Hybrid",
						{
							'sphericalMercator': true,
							type: this.google.maps.MapTypeId.HYBRID
						}
				);
					
				var gsat = new this.OpenLayers.Layer.Google(
						"Google Satellite",
						{
							'sphericalMercator': true,
							type: this.google.maps.MapTypeId.SATELLITE
						}
				);
				
				var dm_wms = new this.OpenLayers.Layer.WMS(
				    "Canadian Data",
				    "http://map1.oasispakistan.pk/getmap.php",
				    {
				        layers: "incidenta",
				        transparent: "true",
				        format: "image/png"
				    },
				    {isBaseLayer: false, visibility: false}
				);
				
				if (customMap.e.basemap == 'googlesatellite'){
					map.addLayers([gsat]);
				} else if (customMap.e.basemap == 'googlestreet'){
					map.addLayers([gstr]);
				} else if (customMap.e.basemap == 'googlehybrid'){
					map.addLayers([ghyb]);
				} else if (customMap.e.basemap == 'googlephysical'){
					map.addLayers([gphy]);
				} else if (customMap.e.basemap == 'OSM'){
					map.addLayers([ol_wms]);
				}
				
				map.addLayers([dm_wms]);
				map.addControl(new this.OpenLayers.Control.LayerSwitcher());
				map.addControl(new this.OpenLayers.Control.Navigation());
				map.addControl(new this.OpenLayers.Control.Zoom());
				// map.zoomToMaxExtent();
				
				var initCenter = new this.OpenLayers.LonLat(78.88, 30.64);
				initCenter.transform(new this.OpenLayers.Projection("EPSG:4326"), new this.OpenLayers.Projection("EPSG:900913"));
				map.setCenter(initCenter, 5);				
			});
			
        }
        
    };
})();

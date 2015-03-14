// http://stackoverflow.com/questions/11421127/how-to-trigger-events-on-leaflet-map-polygons
		var map;
	
		var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?', {
			attribution: 'Map data &copy; OSM, based on code by Giovanni Zambotti',
			key: '52e72c2ead87422793cd884291063d88'
			})
	
		function initialize() {	
			map = new L.Map('main');		
			map.setView(new L.LatLng(20, -20), 2).addLayer(basemap);		
			getResult();		
		}

		function onEachFeature(feature, layer) {
			layer.on("mouseover", function (e) {
				//layer.setStyle(highlightStyle);
				var latlng = layer.getBounds().getCenter();
				
				var popupContent = "<b>Name: </b>" + feature.properties.Name + "<br /><b>Description: </b>" + feature.properties.Description + "<br /><b>URL: </b>" + feature.properties.String_Value_2; 
				var popup = new L.Popup();																				
				popup.setLatLng(latlng);
				popup.setContent(popupContent);
				map.openPopup(popup);													
			});
			
			layer.on("mouseout", function (e) {								
				//layer.setStyle({fillColor: pColor, color: bcolor, weight: 1, opacity: 1, fillOpacity: 0.7});
				//if you're not using ie or opera, bring it to the front.
				if (!L.Browser.ie && !L.Browser.opera) {
					layer.bringToFront();
				}
			});						
		}

			
		// get the json file	
		function getResult(){
			var url = "http://worldmap.harvard.edu/geoserver/wfs?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&Typename=geonode:cgaprojects_8ua&outputFormat=text/javascript&format_options=callback:getJson";

                    $.ajax({
                        jsonp: true,
                        jsonpCallback: 'getJson',
                        type: 'GET',
                        url: url,
                        async: true,
                        dataType: 'jsonp',
                        success: function(data) {
                            //useMyJson(data);
                            L.geoJson(data, {
									style: function (feature) {
									//	return feature.properties && feature.properties.style;						
									return{"color": "#DF0101","weight": 2,"opacity": 0.95}
									},

									onEachFeature: onEachFeature,
								

								
								}).addTo(map);
                        }
                    });
		}
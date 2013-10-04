OasisWebMapping-Lite
====================
All lib folder should be stored one place in server and accessible over http or https

Initial code
===========
Call require.js and API library from html file to oasis-lite server
example :
<script src="http://....../lib/require.js" type="text/javascript"></script>
<script src="http://....../lib/APP.js" type="text/javascript"></script>

Add map div inside body component on html
example :
<div id="customMap" style="width: 500px; height: 500px;"></div>

Create Map object in Javascript :
Syntax :
 new customMap.addMap({
    map : <map name>, // can be layername or map project
    mapType : <type selector>, // layers or map
    basemap : <base map selector>, // googlesatellite, googlestreet, googlehybrid, googlephysical, OSM
    targetDiv : <map div id> // div id for map component
 });  

Exmaple :

	new customMap.addMap({
		map : 'incident',
		mapType : 'layers',
		basemap : 'googlehybrid',
		targetDiv : 'customMap'
	});

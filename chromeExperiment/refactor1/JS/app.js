//Check for WebGL
function checkForWebGL(){
	if (Detector.webgl) {
			showInitModal()
			generateGraph();
	} else {
		  showErrorModal();
	}
}
//No WebGL support
function showErrorModal(){
	document.querySelector(".errorModal").classList.add("errorModal_animation");
}
function closeErrorModal(){
	document.querySelector(".errorModal").classList.remove("errorModal_animation");
}

function showInitModal(){
	document.querySelector(".initModal").classList.add("initModal_animation");
}
function closeInitModal(){
	document.querySelector(".initModal").classList.remove("initModal_animation");
}

//Custom Array Comparison////////////////////////////////////////////////////////////////////////////
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
/////////////////////////////////////////////////////////////////////////////////////////////////
function show(){
	document.getElementById("spinner").classList.add("is-active");
}
function hide(){
	document.getElementById("spinner").classList.remove("is-active");
}
//Initialize Graph
var g = new Graph();
//Initialize start and end node
var nodesArray = [];
var algorithm = getPathfindingAlgorithm();
//Generate Graph
function generateGraph(){
	show();
	setTimeout(function(){
		//Reset nodes
		while(nodesArray.length > 0) {
				nodesArray.pop();
		}
		//Set algorithm
		algorithm = getPathfindingAlgorithm();
		//Clear scene
		while(scene.children.length > 0){ 
				scene.remove(scene.children[0]); 
		}
		//Add lights
		var lights = [];
		lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
		lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
		lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

		lights[ 0 ].position.set( 0, 200, 0 );
		lights[ 1 ].position.set( 100, 200, 100 );
		lights[ 2 ].position.set( - 100, - 200, - 100 );

		scene.add( lights[ 0 ] );
		scene.add( lights[ 1 ] );
		scene.add( lights[ 2 ] );
		//Setup constants and grab data from controller to initialize scene
		var numberOfNodes = 2;
		var numNodesValue = document.getElementById("nodes").innerHTML;
		var sparsenessValue = document.getElementById("sparseness").innerHTML;
		numNodesValue = numNodesValue.replace('%','');
		sparsenessValue = sparsenessValue.replace('%','');
		if (numNodesValue == "Random"){
			numberOfNodes = getRandomInt(2, 100);
		}
		else{
			numberOfNodes = parseInt(numNodesValue);
		}

		//Calculate maximum number of edges
		var maxNumEdges = (numberOfNodes *(numberOfNodes - 1))/2;
		var maxSparseness = maxNumEdges - (numberOfNodes - 1);

		if (sparsenessValue == "Random"){
			sparseness = parseInt(getRandomInt(1, maxSparseness) *0.01);
		}
		else{
			sparseness = parseInt(maxSparseness * (sparsenessValue/100));
		}

		console.log("Generating graph");
		g = new Graph();

		//Connect graph and ensure that each node has atleast 1 edge.
		g.addVertex(0);
		var nodes = [0];
		var coordinates = [generateRandomCoordinate()];
	
		//numberOfNodes = 5;

		for (var i = 1; i < numberOfNodes; i++){
			coordinates.push(generateRandomCoordinate());
			g.addVertex(i);
			var randomNode = getRandomInt(0, numberOfNodes-1);
			while (!(randomNode in nodes)){
				randomNode = getRandomInt(0, numberOfNodes-1);
			}
			g.addEdge(i, randomNode, distance(coordinates[i], coordinates[randomNode]));
			nodes.push(i);
		}
	
		//Add random edges based on sparseness
		var initialEdges = [];
		for (var i = 0; i < g.numVertices; i++){
			for (var key in g.adjacencyList[i].getAdj()){
				initialEdges.push([i, parseInt(key)]);
			}
		}

		//sparseness = 1;

		for (var i = 0; i < sparseness; i++){
			var randomEdge = [getRandomInt(0, numberOfNodes-1), getRandomInt(0, numberOfNodes-1)];
			var flag = true;
			while (flag){
				var compareFlag = true;
				var forward = [randomEdge[0], randomEdge[1]];
				var backward = [randomEdge[1], randomEdge[0]];
				for (var j = 0; j < initialEdges.length; j++){
					if (forward.equals(initialEdges[j])){	
						//console.log("FORWARD",forward, initialEdges[j]);
						compareFlag = false;
					}
					if (backward.equals(initialEdges[j])){
						//console.log("BACKWARD:",backward, initialEdges[j]);
						compareFlag = false;
					}
				}
				if (!compareFlag){
					randomEdge = [getRandomInt(0, numberOfNodes-1), getRandomInt(0, numberOfNodes-1)];
					continue;
				}
				if (randomEdge[0] == randomEdge[1]){
					randomEdge = [getRandomInt(0, numberOfNodes-1), getRandomInt(0, numberOfNodes-1)];
					continue;
				}
				else{
					flag = false;
				}
			}
			g.addEdge(randomEdge[0], randomEdge[1], distance(coordinates[randomEdge[0]], coordinates[randomEdge[1]]));
			initialEdges.push(randomEdge);
		}
		drawGraph(g, coordinates);
		hide();
	}, 1);
}

function drawGraph(g, coordinates){
	var drawn = [];
	var count = 0;
	//Draw Edges.... This took some time, my calc 3 teacher would have been so mad lol, mad props to this SO answer.... http://stackoverflow.com/questions/40348802/aligning-a-cylinder-to-a-vector
	for (var i = 0; i < g.numVertices; i++){
		for (var key in g.adjacencyList[i].getAdj()){
			var tempFlag = true;
			drawn.push([i, parseInt(key)]);
			for (var j = 0; j < drawn.length; j++){
				if (parseInt(key) == drawn[j][0] && i == drawn[j][1]){
					tempFlag = false;
				}
			}
			if (tempFlag){
				count += 1;
				var xStart = coordinates[i][0];
				var yStart = coordinates[i][1];
				var zStart = coordinates[i][2];
				var xEnd = coordinates[parseInt(key)][0];
				var yEnd = coordinates[parseInt(key)][1];
				var zEnd = coordinates[parseInt(key)][2];
				var length = g.adjacencyList[i].getAdj()[key];
				var material = new THREE.MeshLambertMaterial({ color: 0x9e9e9e });

		    cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(1, 1, length, 32), material);
		    var vector = new THREE.Vector3(xEnd - xStart, yEnd - yStart, zEnd - zStart); 
		    cylinder.position.set(xStart, yStart, zStart);

		    //create a point to lookAt
		    var focalPoint = new THREE.Vector3(
		    	cylinder.position.x + vector.x,
		    	cylinder.position.y + vector.y,
		    	cylinder.position.z + vector.z
		    );
				cylinder.geometry.rotateX( Math.PI / 2 );
		    //all that remains is setting the up vector (if needed) and use lookAt
		    cylinder.up = new THREE.Vector3(0, 1, 0);//Z axis up
		    cylinder.lookAt(focalPoint);
				cylinder.geometry.translate( 0, 0, length / 2 );	
				cylinder.name = 100 + count;	
		    scene.add(cylinder);		
			}
		}
	}
	//Draw Nodes
	for (var i = 0; i < coordinates.length; i++){
		var x = coordinates[i][0];
		var y = coordinates[i][1];
		var z = coordinates[i][2];
		mesh = createSphere();
		mesh.position.set(x, y, z)
		mesh.name = i;
		scene.add( mesh );
	}
}

//Raycasting function
function onDocumentMouseDown( event ) {  
	event.preventDefault();
	var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
		                                  -( event.clientY / window.innerHeight ) * 2 + 1,  
		                                  0.5 );     
	var raycaster =  new THREE.Raycaster();                                        
	raycaster.setFromCamera( mouse3D, camera );
	var intersects = raycaster.intersectObjects( scene.children, true );
	if (intersects.length > 0){
		console.log(intersects[0].object.name || intersects[0].object.parent.name);
		if (!(intersects[0].object.name >= 100) && (nodesArray.length < 2)){
			if (intersects[0].object.parent.name !== nodesArray[0]){
				nodesArray.push(intersects[0].object.parent.name);
				scene.getObjectByName(intersects[0].object.parent.name, true).children[1].material.color.setHex(0x9C27B0);
				scene.getObjectByName(intersects[0].object.parent.name, true).children[1].material.emissive.setHex(0xE040FB);
				if (nodesArray.length == 2){
					findPath(algorithm, nodesArray[0], nodesArray[1]);
				}
			}
		}
	}
}

//Pathfinding algorithms
function findPath(algorithm, start, end){
	if (algorithm == 'dijkstra'){
		console.log(algorithm);
	}
	if (algorithm == 'bfs'){
		var tempList = [];
		console.log(algorithm, start, end);
		start = g.getVertex(start);
		var q = [];
		q.push(start);
		while (q.length > 0){
			var current = q.shift();
			var keys = [];
			for (k in g.adjacencyList[current.getId()].adj) keys.push(k);
			for (var i = 0; i < keys.length; i++){
				if (!(g.getVertex(parseInt(keys[i])).bfsDiscovered)){
					g.getVertex(parseInt(keys[i])).bfsDiscovered = true;
					g.getVertex(parseInt(keys[i])).setBFSPredecessor(current);
					q.push(g.getVertex(parseInt(keys[i])));
				}
			}
			tempList.push(current.id);
			current.bfsDiscovered = true;
		}
		colorBFS(tempList, start, end, traverseBFS);
	}
	if (algorithm == 'dfs'){
		console.log(algorithm);
	}
}
function colorBFS(list, start, end, callback){
	for (var x = 0, ln = list.length; x < ln; x++) {
		setTimeout(function(y) {    
			scene.getObjectByName(list[y], true).children[1].material.color.setHex(0x9C27B0);
			scene.getObjectByName(list[y], true).children[1].material.emissive.setHex(0xE040FB);
			if (y == list.length - 1){
				callback(list, start, end);
			}
		}, x * 100, x);
	}
}
function traverseBFS(list, start, end){
	for (var i = list.length-1; i >= 0; i--){
		scene.getObjectByName(list[i], true).children[1].material.color.setHex(0x388E3C);
		scene.getObjectByName(list[i], true).children[1].material.emissive.setHex(0x4CAF50);
	}
	console.log(g.getVertex(end).getBFSPredecessor());
	start = g.getVertex(end);
	while (start.getBFSPredecessor()){
			scene.getObjectByName(start.id, true).children[1].material.color.setHex(0x9C27B0);
			scene.getObjectByName(start.id, true).children[1].material.emissive.setHex(0xE040FB);
			start = start.getBFSPredecessor()
	}
	scene.getObjectByName(start.id, true).children[1].material.color.setHex(0x9C27B0);
	scene.getObjectByName(start.id, true).children[1].material.emissive.setHex(0xE040FB);
}
//Setup scene
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xfafafa );

//Setup camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1500 );
camera.position.z = 700;
camera.position.y = 250;

//Initialize renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
document.querySelector(".root").appendChild( renderer.domElement );

//Set up trackball controls
var controls = new THREE.TrackballControls( camera, renderer.domElement);
controls.rotateSpeed = 5;
controls.minDistance = 0.1;
controls.maxDistance = 1500;

//Render function
var render = function () {
	renderer.render( scene, camera );
	requestAnimationFrame( render );
	controls.update();
};

//Handle resize
document.querySelector(".root").addEventListener( 'mousedown', onDocumentMouseDown );
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

//Render
render();

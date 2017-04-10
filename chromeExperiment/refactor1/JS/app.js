//Check for WebGL
function checkForWebGL(){
	if (Detector.webgl) {
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
		console.log(intersects[0].object.parent.name);
	}
}
//Generate Graph
function generateGraph(numberOfNodes = 100, sparseness = 50){
	var numberOfNodes = 2;
	var algorithm = getPathfindingAlgorithm();
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
	//Clear scene
	while(scene.children.length > 0){ 
		  scene.remove(scene.children[0]); 
	}
	console.log("Generating graph");
	var g = new Graph();
	g.addVertex(0);
	var nodes = [0];
	var coordinates = [generateRandomCoordinate()];
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
	
	var initialEdges = [];
	for (var i = 0; i < g.numVertices; i++){
		for (var key in g.adjacencyList[i].getAdj()){
			initialEdges.push([i, parseInt(key)]);
		}
	}
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
}

function drawGraph(g, coordinates){
	//Draw Edges.... This took some time, my calc 3 teacher would have been so mad lol, mad props to this SO answer.... http://stackoverflow.com/questions/40348802/aligning-a-cylinder-to-a-vector
	for (var i = 0; i < g.numVertices; i++){
		for (var key in g.adjacencyList[i].getAdj()){
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
      scene.add(cylinder);		
	
		}
	}
	//Draw Nodes
	for (var i = 0; i < coordinates.length; i++){
		var x = coordinates[i][0];
		var y = coordinates[i][1];
		var z = coordinates[i][2];
		mesh = createSphere();
		mesh.position.set(x, y, z)
		mesh.name = "sphere"+i;
		scene.add( mesh );
	}
}

//Setup scene
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xfafafa );

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

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1500 );
camera.position.z = 700;
camera.position.y = 250;

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
document.querySelector(".root").appendChild( renderer.domElement );

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = true;
//Inertia for mobile smoothness :)
orbit.enableDamping = true;
orbit.dampingFactor = 0.25;

var prevFog = false;
var render = function () {
	renderer.render( scene, camera );
	requestAnimationFrame( render );
orbit.update();
};
document.querySelector(".root").addEventListener( 'mousedown', onDocumentMouseDown );
window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

function getObject(){
		console.log(scene.getObjectByName('sphere10', true));
		scene.getObjectByName('sphere10', true).children[1].material.color.setHex(0x9C27B0);
		scene.getObjectByName('sphere10', true).children[1].material.emissive.setHex(0xE040FB);
}
//Render
render();

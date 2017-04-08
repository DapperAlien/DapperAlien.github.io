//GLOBAL
var nodes = []; 
var twoPi = Math.PI * 2;

//Set up lights, camera, and constants
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xfafafa );

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
/////////////////////////////////////////

//Create Spheres
coords = generateGraphAndCoordinates();
for (var i = 0; i < coords.length; i++){
	var x = coords[i][0];
	var y = coords[i][1];
	var z = coords[i][2];
	mesh = createSphere();
	mesh.position.set(x, y, z)
	mesh.name = "sphere"+i;
	scene.add( mesh );
	//change in future to actual mesh
	nodes.push(mesh.name);
}

/*
		//update color
		scene.getObjectByName('sphere10', true).children[1].material.color.setHex(0x4CAF50);
		scene.getObjectByName('sphere10', true).children[1].material.emissive.setHex(0x8BC34A);
		//Edge Geometry!
		geometry = new THREE.CylinderGeometry( 1, 1, 100, 32 );
		material = new THREE.MeshBasicMaterial( {color: 0x252525} );
		cylinder = new THREE.Mesh( geometry, material );
		cylinder.position.y = 50;
		scene.add( cylinder );
*/

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
	
		//Render scene


		var prevFog = false;
		var render = function () {
			renderer.render( scene, camera );
			requestAnimationFrame( render );
		};
		window.addEventListener( 'mousedown', onDocumentMouseDown );
		window.addEventListener( 'resize', function () {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			}, false );

		render();

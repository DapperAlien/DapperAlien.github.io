//Hacked from https://threejs.org/docs/index.html#Reference/Geometries/SphereBufferGeometry
var twoPi = Math.PI * 2;
function createSphere(){
	var mesh = new THREE.Object3D();
	mesh.add( new THREE.LineSegments(
		new THREE.Geometry(),
		new THREE.LineBasicMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.5
		})
	));
	mesh.add( new THREE.Mesh(
		new THREE.Geometry(),
		new THREE.MeshPhongMaterial({
			color: 0x388E3C,
			emissive: 0x4CAF50,
			side: THREE.DoubleSide,
			shading: THREE.FlatShading
		})
	));
	var options = chooseFromHash( mesh );
	return mesh
}
function updateGroupGeometry( mesh, geometry ) {
	mesh.children[ 0 ].geometry.dispose();
	mesh.children[ 1 ].geometry.dispose();

	mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
	mesh.children[ 1 ].geometry = geometry;
	// these do not update nicely together if shared
	}
	var guis = {

		SphereGeometry : function( mesh ) {

			var data = {
				radius : 15,
				widthSegments : 8,
				heightSegments : 6,
				phiStart : 0,
				phiLength : twoPi,
				thetaStart : 0,
				thetaLength : Math.PI
			};
function generateGeometry() {
	updateGroupGeometry( mesh,
		new THREE.SphereGeometry(
			data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength)
			);}
		generateGeometry();
	}
}
function chooseFromHash ( mesh ) {
	var selectedGeometry = "SphereGeometry";
	guis[ selectedGeometry ]( mesh );
	return {};
}

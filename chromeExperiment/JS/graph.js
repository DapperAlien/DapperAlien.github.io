console.log("Creating graph");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGraphAndCoordinates(){
	//Generate a random number of nodes
	var numberOfNodes = getRandomInt(50, 100);
	console.log(numberOfNodes);
	var coordinates = [];
	for (var i = 0; i < numberOfNodes; i++){
		var x = getRandomInt(-300, 300);
		var y = getRandomInt(-300, 300);
		var z = getRandomInt(-300, 300);
		var point = [x, y, z];
		coordinates.push(point);
	}
	return coordinates;
}


function Vertex(key){
	this.id = key;
	this.adj = {};

	this.addNeighbor = function(nbr, weight=0){
		console.log("Adding neighbor",nbr,":",weight,"to ",this.id);
		this.adj[nbr] = weight;
	}
	this.getAdj = function(){
		return this.adj;
	}
	this.getId = function(){
		return this.id;
	}
	this.getWeight = function(nbr){
		return this.adj[nbr];
	}
}

function Graph(){
	this.adjacencyList = {};
	this.numVertices = 0;

	this.addVertex = function(key){
		this.numVertices += 1;
		var newVertex = new Vertex(key);
		this.adjacencyList[key] = newVertex;
		return newVertex;
	}
	this.getVertex = function(key){
		if (key in this.adjacencyList){
			return this.adjacencyList[key];
		}
		else{
			return null;
		}
	}
	this.addEdge = function(vertex1, vertex2, weight = 0){
		console.log("Adding Edge",vertex1,"->",vertex2);
		if (!(vertex1 in this.adjacencyList)){
			this.addVertex(vertex1);
		}
		if (!(vertex2 in this.adjacencyList)){
			this.addVertex(vertex2);
		}
		this.adjacencyList[vertex1].addNeighbor(vertex2, weight);
	}
	this.getVertices = function(){
		return this.adjacencyList;
	}
}

//Test
var g = new Graph();

for (var i = 0; i < 6; i++){
	console.log("Adding vertex",i,"to graph");
	g.addVertex(i);
}
g.addEdge(0, 1, 5);
g.addEdge(0, 5, 2);
g.addEdge(1, 2, 4);
g.addEdge(2, 3, 9);
g.addEdge(3, 4, 7);
g.addEdge(3, 5, 3);
g.addEdge(4, 0, 1);
g.addEdge(5, 4, 8);
g.addEdge(5, 2, 1);


for (var i = 0; i < g.numVertices; i++){
	console.log("Vertex:",i);
	for (var key in g.adjacencyList[i].getAdj()){
		console.log(key, g.adjacencyList[i].getAdj()[key]);
	}
}


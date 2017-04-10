//Vertex Class
function Vertex(key){
	this.id = key;
	this.adj = {};

	this.addNeighbor = function(nbr, weight=0){
		this.adj[nbr] = weight;
	}
	this.removeNeighbor = function(nbr){
		delete this.adj[nbr];
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

//Graph Class
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
		if (!(vertex1 in this.adjacencyList)){
			this.addVertex(vertex1);
		}
		if (!(vertex2 in this.adjacencyList)){
			this.addVertex(vertex2);
		}
		this.adjacencyList[vertex1].addNeighbor(vertex2, weight);
	}
	this.removeEdge = function(vertex1, vertex2){
		this.adjacencyList[vertex1].removeNeighbor(vertex2);
	}
	this.getVertices = function(){
		return this.adjacencyList;
	}
}

//Create Random Integer in a specified range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Distance function
function distance(p1, p2){
	var deltaX = (p2[0] - p1[0]) * (p2[0] - p1[0])
	var deltaY = (p2[1] - p1[1]) * (p2[1] - p1[1])
	var deltaZ = (p2[2] - p1[2]) * (p2[2] - p1[2])
	return Math.sqrt(deltaX + deltaY + deltaZ)
}

//Generate Random Coordinate
function generateRandomCoordinate(){
	var x = getRandomInt(-300, 300);
	var y = getRandomInt(-300, 300);
	var z = getRandomInt(-300, 300);
	var point = [x, y, z];
	return point;
}


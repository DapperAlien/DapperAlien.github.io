function dijkstra2(graph, start, end){
	var INFINITY = 1/0; 
	var nodes = new PriorityQueue(), 
		distances = {}, 
		previous = {}, 
		path = [], 
		smallest, 
		vertex, 
		neighbor, 
		alt;  

	var visitedArray = [];
  
	for(vertex in graph) {
		if(vertex === start) {
			distances[vertex] = 0;
			nodes.enqueue(0, vertex);
		}
		else {
			distances[vertex] = INFINITY;
			nodes.enqueue(INFINITY, vertex);
		}
		previous[vertex] = null;
	}
  while(!nodes.isEmpty()) {
		smallest = nodes.dequeue();
		if (start != smallest){
			visitedArray.push(smallest);
		}
		if(smallest === end) {
			path = [];
			while(previous[smallest]) {
				path.push(smallest);
				smallest = previous[smallest];
			}
			break;
		}
		if(!smallest || distances[smallest] === INFINITY){
			continue;
		}
		for(neighbor in graph[smallest]) {
			alt = distances[smallest] + graph[smallest][neighbor];
			if(alt < distances[neighbor]) {
				distances[neighbor] = alt;
				previous[neighbor] = smallest;
				nodes.enqueue(alt, neighbor);
		  }
		}
	}
	return [path, visitedArray];
}


function PriorityQueue(){
	this._nodes = [];

	this.enqueue = function(priority, key) {
		this._nodes.push({key: key, priority: priority });
		this.sort();
  }
  this.dequeue = function() {
    return this._nodes.shift().key;
  }
  this.sort = function() {
    this._nodes.sort(function(a, b) {
      return a.priority - b.priority;
    });
  }
  this.isEmpty = function() {
    return !this._nodes.length;
  }
}

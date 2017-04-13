//Flags
var controlFlag = false;

function controlsAnimation(){
	if (!controlFlag){
		document.querySelector(".controls").classList.add("controls-animation");
		document.querySelector(".menu").classList.add("menu-animation");
		controlFlag = true;
	}
	else{
		document.querySelector(".controls").classList.remove("controls-animation");
		document.querySelector(".menu").classList.remove("menu-animation");
		controlFlag = false;
	}
}

//Info-route
function openInNewTab(url) {
	var win = window.open(url, '_blank');
  win.focus();
};

//Number of Nodes Slider
function updateNodes(value){
	event.preventDefault();
	if (value == 0){
		document.getElementById("nodes").innerHTML = "Random";
	}
	else{
		document.getElementById("nodes").innerHTML = value + "%";
	}
}

//Sparseness Slider
function updateSparseness(value){
	if (value == 0){
		document.getElementById("sparseness").innerHTML = "Random";
	}
	else{
		if (value >= 30){
			document.getElementById("sparseness").style.color = "red";
		}
		if (value < 30){
			document.getElementById("sparseness").style.color = "black";
		}
		document.getElementById("sparseness").innerHTML = value + "%";
	}
}

//Radio Buttons
function getPathfindingAlgorithm(){
	var algorithm = "dijkstra";
	var dijkstra = document.getElementById("option-1");
	var bfs = document.getElementById("option-2");
	var dfs = document.getElementById("option-3");
	if (dijkstra.checked){
		algorithm = "dijkstra";
	}
	if (bfs.checked){
		algorithm = "bfs";
	}
	if (dfs.checked){
		algorithm = "dfs";
	}
	return algorithm;
}

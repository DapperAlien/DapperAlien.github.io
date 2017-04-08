//Flags
var controlFlag = false;

//DOM Elements
var buttons = document.querySelectorAll(".ripple-button");
for (var i = 0; i < buttons.length; i++){
	buttons[i].addEventListener("mouseover", rippleEffect);
}

//Splash
function rippleEffect(e){
	var tempDiv = e.toElement;
	var parentWidth = tempDiv.getBoundingClientRect().width;
	var parentHeight = tempDiv.getBoundingClientRect().height;
	var parentLeft = tempDiv.getBoundingClientRect().left;
	var parentTop = tempDiv.getBoundingClientRect().top;
	var x = e.clientX - parentLeft;
	var y = e.clientY - parentTop;
	var radius = Math.sqrt((parentWidth*parentWidth)+(parentHeight*parentHeight));
	var width = radius*2;
	var height = radius*2;
	var splash = document.createElement("div");
	splash.style.width = width + "px";
	splash.style.height = height + "px";
	splash.style.top = (y - radius)+"px";
	splash.style.left = (x - radius)+"px";
	splash.classList.add("splash");
		requestAnimationFrame(function() {
			tempDiv.appendChild(splash);
		});	
	setTimeout(function(){
		splash.remove();
	}, 2000);
}
//Toggle
function toggle(id){
	if (id == 'dijkstra'){
		document.getElementById("bfs").classList.remove("toggle-animation");
		document.getElementById("dfs").classList.remove("toggle-animation");
		document.getElementById("dijkstra").classList.add("toggle-animation");
	}
	if (id == 'bfs'){
		document.getElementById("dijkstra").classList.remove("toggle-animation");
		document.getElementById("dfs").classList.remove("toggle-animation");
		document.getElementById("bfs").classList.add("toggle-animation");
	}
	if (id == 'dfs'){
		document.getElementById("dijkstra").classList.remove("toggle-animation");
		document.getElementById("bfs").classList.remove("toggle-animation");
		document.getElementById("dfs").classList.add("toggle-animation");
	}
}

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

function openInNewTab(url) {
	var win = window.open(url, '_blank');
  win.focus();
};

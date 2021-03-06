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

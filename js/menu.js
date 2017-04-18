//DOM Elements
var middleLeft = document.querySelector(".hamburger-middle-left");
var middleRight = document.querySelector(".hamburger-middle-right");
var bottom = document.querySelector(".hamburger-bottom");
var stem = document.querySelector(".stem");
var menu = document.querySelector(".menu");

//Flags
var menuFlag = false;

//Header and Menu Animation
function menuAnimation(){
	var top = document.querySelector(".hamburger-top");
	if (!menuFlag){
		top.addEventListener('transitionend', martiniOpen);
		requestAnimationFrame(function() {
			top.classList.add("hamburger-top-animation1");
			bottom.classList.add("hamburger-bottom-animation1");
			middleLeft.classList.add("hamburger-middleLeft-animation1");
			middleRight.classList.add("hamburger-middleRight-animation1");
		});
	}
	else{
		top.addEventListener('transitionend', martiniClose);
		requestAnimationFrame(function() {
			top.classList.add("hamburger-top-animation1");
			bottom.classList.remove("hamburger-bottom-animation2");
			stem.classList.remove("stem-animation");
			middleLeft.classList.remove("hamburger-middleLeft-animation2");
			middleRight.classList.remove("hamburger-middleRight-animation2");
		});
	}
}
function martiniOpen(){
	var top = document.querySelector(".hamburger-top");
		requestAnimationFrame(function() {
			stem.classList.add("stem-animation");
			top.classList.remove("hamburger-top-animation1");
			bottom.classList.add("hamburger-bottom-animation2");
			middleLeft.classList.add("hamburger-middleLeft-animation2");
			middleRight.classList.add("hamburger-middleRight-animation2");
			menu.classList.add("menu-animation");
		});
	menuFlag = true;
	top.removeEventListener('transitionend', martiniOpen);
}
function martiniClose(){
	var top = document.querySelector(".hamburger-top");
	top.removeEventListener('transitionend', martiniClose);
		requestAnimationFrame(function() {
			top.classList.remove("hamburger-top-animation1");
			bottom.classList.remove("hamburger-bottom-animation1");
			middleLeft.classList.remove("hamburger-middleLeft-animation1");
			middleRight.classList.remove("hamburger-middleRight-animation1");
			menu.classList.remove("menu-animation");
		});
	menuFlag = false;
}

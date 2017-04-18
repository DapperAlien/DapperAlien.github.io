//Scroll Animationz
window.addEventListener('scroll', onScroll, false);
function onScroll() {
	latestKnownScrollY = document.documentElement.scrollTop || document.body.scrollTop;
	requestTick();
}
function requestTick() {
	if(!ticking) {
		requestAnimationFrame(updateScroll);
	}
	ticking = true;
}
//Animation handler for clicks, can you say DEBOUNCE (boots n pants n boots n pants)
var portfolioTop = document.querySelector(".portfolio-page-1").getBoundingClientRect().bottom;
var latestKnownHeight = 0;
var latestKnownScrollY = 0;
var ticking = false;
function updateScroll() {
	ticking = false;
	var currentScrollY = latestKnownScrollY;
}
function scrollToPortfolio(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var i = scrollTop;
	var start = null;
	function scroll(timestamp) {
	if (!start) start = timestamp;
		var progress = timestamp - start;
		i += progress;
		window.scrollTo(0, Math.min(i, portfolioTop));
		if (i < (portfolioTop - 60)) {
			window.requestAnimationFrame(scroll);
		}
	}
	window.requestAnimationFrame(scroll);
}

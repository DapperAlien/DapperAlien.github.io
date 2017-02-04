'use strict';

class Nav{
	constructor(){
		this.nav = document.querySelector(".js-nav");
		this.navContainer = document.querySelector(".js-nav__container");
		this.box = document.querySelector(".js-box");
		this.exit = document.querySelector(".js-exit");
		this.about = document.querySelector(".js-about");
		this.projects = document.querySelector(".js-projects");
		this.contact = document.querySelector(".js-contact");
		this.middle1 = document.querySelector(".js-middle1");
		this.middle2 = document.querySelector(".js-middle2");
		this.stem = document.querySelector(".js-stem");
		this.bottom = document.querySelector(".js-bottom");
		this.showSideNav = this.showSideNav.bind(this);
		this.hideSideNav = this.hideSideNav.bind(this);
		this.blockClicks = this.blockClicks.bind(this);
		/* Buggy :(
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		*/
		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.navContainer.addEventListener("click", this.blockClicks);
		/* Buggy :(
		this.navContainer.addEventListener("touchstart", this.onTouchStart);
		this.navContainer.addEventListener("touchmove", this.onTouchMove);
		this.navContainer.addEventListener("touchend", this.onTouchEnd);
		*/
		this.box.addEventListener("click", this.showSideNav);
		this.exit.addEventListener("click", this.hideSideNav);
		this.about.addEventListener("click", this.hideSideNav);
		this.projects.addEventListener("click", this.hideSideNav);
		this.contact.addEventListener("click", this.hideSideNav);
		this.nav.addEventListener("click", this.hideSideNav);
		this.startX = 0;
		this.currentX = 0;
	}
	showSideNav(){
		this.bottom.classList.add('bottomScaled');
		this.stem.classList.add('stemGrown');
		this.middle1.classList.add('middle1Rotated');
		this.middle2.classList.add('middle2Rotated');
		this.nav.classList.add("nav--animatable");
		this.nav.classList.add("nav--visible");
		this.nav.addEventListener("transitionend", this.onTransitionEnd);
		this.box.removeEventListener("click", this.showSideNav)
		this.box.addEventListener("click", this.hideSideNav)
		this.exit.classList.add('exit-animation');
	}
	hideSideNav(){
		this.bottom.classList.remove('bottomScaled');
		this.stem.classList.remove('stemGrown');
		this.bottom.classList.remove('bottomScaled');
		this.stem.classList.remove('stemGrown');
		this.middle1.classList.remove('middle1Rotated');
		this.middle2.classList.remove('middle2Rotated');
		this.nav.classList.remove("nav--animatable");
		this.nav.classList.remove("nav--visible");
		this.nav.addEventListener("transitionend", this.onTransitionEnd);
		this.box.removeEventListener("click", this.hideSideNav)
		this.box.addEventListener("click", this.showSideNav)
		this.exit.classList.remove('exit-animation');
	}
	blockClicks(event){
		event.stopPropagation();
	}
	/* Buggy :(
	onTouchStart(event){
		if (!this.nav.classList.contains("nav--visible"))
		return
		this.startX = event.touches[0].pageX;
		this.currentX = this.startX;
	}
	onTouchMove(event){
		this.currentX = event.touches[0].pageX;
		const translateX = Math.min(0, this.currentX - this.startX);
		if (this.translateX < 0){
			event.preventDefault();
		}
		this.navContainer.style.transform = "translateX("+translateX + "px)";
	}
	onTouchEnd(event){
		const translateX = Math.min(0, this.currentX - this.startX);
		if (translateX < 0){
			this.navContainer.style.transform = "";
			this.hideSideNav();
		}
	}
	*/
	onTransitionEnd(event){
		this.nav.classList.remove("nav--animatable");
		this.nav.removeEventListener("transitionend", this.onTransitionEnd);
	}
}

new Nav();


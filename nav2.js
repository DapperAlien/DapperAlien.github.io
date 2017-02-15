'use strict';

class Nav{
	constructor(){
		this.nav = document.querySelector(".js-nav");
		this.navContainer = document.querySelector(".js-nav__container");
		this.box = document.querySelector(".js-box");
		this.top = document.querySelector(".js-top");
		this.middle = document.querySelector(".js-middle");
		this.bottom = document.querySelector(".js-bottom");
		this.about = document.querySelector(".js-about");
		this.portfolio = document.querySelector(".js-portfolio");
		this.contact = document.querySelector(".js-contact");
		this.header = document.querySelector(".header");
		this.showSideNav = this.showSideNav.bind(this);
		this.hideSideNav = this.hideSideNav.bind(this);
		this.blockClicks = this.blockClicks.bind(this);
		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.navContainer.addEventListener("click", this.blockClicks);
		this.box.addEventListener("click", this.showSideNav);
		this.nav.addEventListener("click", this.hideSideNav);
		this.about.addEventListener("click", this.hideSideNav);
		this.portfolio.addEventListener("click", this.hideSideNav);
		this.contact.addEventListener("click", this.hideSideNav);
		this.startX = 0;
		this.currentX = 0;
	}
	showSideNav(){
		this.box.classList.add('box-animated');
		this.top.classList.add('top-animated');
		this.middle.classList.add('middle-animated');
		this.bottom.classList.add('bottom-animated');
		this.header.classList.add('header-animated');
		this.nav.classList.add("nav--animatable");
		this.nav.classList.add("nav--visible");
		this.nav.addEventListener("transitionend", this.onTransitionEnd);
		this.box.removeEventListener("click", this.showSideNav)
		this.box.addEventListener("click", this.hideSideNav)
	}
	hideSideNav(){
		this.box.classList.remove('box-animated');
		this.middle.classList.remove('middle-animated');
		this.top.classList.remove('top-animated');
		this.bottom.classList.remove('bottom-animated');
		this.header.classList.remove('header-animated');
		this.nav.classList.remove("nav--animatable");
		this.nav.classList.remove("nav--visible");
		this.nav.addEventListener("transitionend", this.onTransitionEnd);
		this.box.removeEventListener("click", this.hideSideNav)
		this.box.addEventListener("click", this.showSideNav)
	}
	blockClicks(event){
		event.stopPropagation();
	}
	onTransitionEnd(event){
		this.nav.classList.remove("nav--animatable");
		this.nav.removeEventListener("transitionend", this.onTransitionEnd);
	}
}

new Nav();


//DOM Elements
document.querySelector(".contact-form").addEventListener('submit', validate);

//FORMZ
function focusTextArea(){
	document.querySelector(".message-underline").classList.add("message-underline-animation");
	document.querySelector(".email-underline").classList.remove("email-underline-animation");
}
function focusEmail(){
	document.querySelector(".email-underline").classList.add("email-underline-animation");
	document.querySelector(".message-underline").classList.remove("message-underline-animation");
}

/*Silly spam preventiont with ROT13 Cypher.*/
var x = [17,14,29,29,18,31,14,25,22,18,27,17,18,32,22,20,27];
function y(){
	var z = "";
	for (var i = 0; i < x.length; i++){
		z += String.fromCharCode(((x[i] + 13) % 26) + 96);
	}
	return z
}

/*Make sure form is filled out*/
function validate(evt){
	var email = document.querySelector(".contact-email");
	var form = document.querySelector(".contact-form");
	if (email.value === ""){
			evt.preventDefault(); 
		document.querySelector(".contact-email").classList.add("contact-email-error-animation");
	}
	else{
		var string = "https://formspree.io/"+y()+"@gmail.com";
		form.action=string;
	}
}

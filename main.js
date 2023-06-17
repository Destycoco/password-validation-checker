const passwordInput = document.getElementById("password");
const strengthMeter = document.querySelector(".strength-meter");
const reasons = document.querySelector(".reasons");
const togglePassword = document.querySelector(".icon");


passwordInput.addEventListener("input", updateMeter)

function updateMeter(){
	const weaknesses = calcPasswordStrength(passwordInput.value);
	let strength = 100;
	let displaymessage = document.createElement('div');
	reasons.innerHTML = "";
	weaknesses.forEach(weakness =>{

		if (weakness == null) return;
		strength -= weakness.deduction;
		displaymessage.innerText = weakness.message;
		reasons.appendChild(displaymessage);
	})
	strengthMeter.style.setProperty("--strength", strength);
}

function calcPasswordStrength(password){
	const weaknesses = [];
	
	weaknesses.push(lowercaseWeakness(password));
	weaknesses.push(uppercaseWeakness(password));
	weaknesses.push(symbolWeakness(password));
	weaknesses.push(lengthWeakness(password));
	return weaknesses;
}
function lengthWeakness(password){
	let length = password.length;
	if (length === 0 ){
		return{
			message: "",
			deduction: 100
		}
	}
	if (length <= 3 ){
		return{
			message: "Your password is too short",
			deduction: 60
		}
	}

	if (length <= 5 ){
		return{
			message: "Your password is too short",
			deduction: 40
		}
	}
	if (length <= 10){
		return{
			message: "Your password could be longer",
			deduction: 10
		}
	}
}
function lowercaseWeakness(password){
	const matches = password.match(/[a-z]/g) || []

	if (!matches.length){
		return{
			message: "Your password does not contain a lower case",
			deduction: 40
		}
	}
	if (matches.length <= 2){
		return{
			message: "Your password could contain more lower case",
			deduction: 20
		}
	}
}
function uppercaseWeakness(password){

	const matches = password.match(/[A-Z]/g) || []
	if (matches.length == 0){
		return{
			message: "Your password does not contain an upper case",
			deduction: 30
		}
	}
	if (matches.length < 2){
		return{
			message: "Your password could contain more upper case",
			deduction: 10
		}
	}
}
function symbolWeakness(password){
	const matches = password.match(/[-+*/$#@&!%^=<>()_]/g) || []
	if (!matches.length){
		return{
			message: "Your password does not contain a symbol",
			deduction: 20
		}
	}
}
togglePassword.addEventListener("click", ()=>{
   const type = passwordInput.getAttribute("type") === "text" ? "password" : "text";
   passwordInput.setAttribute("type", type);
})










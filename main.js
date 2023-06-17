const passwordInput = document.getElementById("password");
const strengthMeter = document.querySelector(".strength-meter");
const reasons = document.querySelector(".reasons");

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

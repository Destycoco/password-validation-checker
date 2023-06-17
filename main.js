const passwordInput = document.getElementById("password");
const strengthMeter = document.querySelector(".strength-meter");
const reasons = document.querySelector(".reasons");

passwordInput.addEventListener("input", updateMeter)

function updateMeter(){
	const weaknesses = calcPasswordStrength(passwordInput.value);
	console.log(weaknesses);
	let strength = 100;
	// console.log(strength)
	weaknesses.forEach(weakness =>{
	if (weakness == null) return
	strength -= weakness.deduction;
	})
	console.log(strength);
	strengthMeter.style.setProperty("--strength", strength);
}



function calcPasswordStrength(password){
	const weaknesses = [];
	weaknesses.push(lengthWeakness(password));
	return weaknesses;
}

function lengthWeakness(password){
	let length = password.length;
	if (length <= 5){
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

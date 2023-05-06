const logIn = document.getElementById("log-sign");
const singBtn = document.getElementById("log-sign1");

function login() {


    window.location.href = "./login/login.html";
}

logIn.addEventListener("click", login);


function signup() {
    window.location.href = "./signup/signup.html";

}

singBtn.addEventListener("click", signup);
console.log(singBtn);
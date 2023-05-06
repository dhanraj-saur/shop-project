function singup() {
    var nameValue = document.getElementById("input-fname").value;
    var lastNameValue = document.getElementById("input-lname").value;
    var emailValue = document.getElementById("input-email").value;
    var passwordValue = document.getElementById("input-password").value;
    var confirmPasswordValue = document.getElementById(
        "input-confirm-password"
    ).value;


    if (passwordValue == confirmPasswordValue) {

        var userObj = {
            email: emailValue,
            password: passwordValue,
            confirmPassword: confirmPasswordValue,
            fname: nameValue,
            lname: lastNameValue,
            singupDate: new Date(),

        };
        var users = []

        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));

        }
        else {
            users = [];
        }
        users.push(userObj);

        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "../login/login.html";
    };
};
document.getElementById("btn").addEventListener("click", singup);
console.log(JSON.parse(localStorage.getItem("users")));
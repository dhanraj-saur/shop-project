function login() {
    var emailValue = document.getElementById("input-email").value;
    var passwordValue = document.getElementById("input-password").value;

    var users = JSON.parse(localStorage.getItem("users"));

    var userArr = users.filter((item) => item.email == emailValue);

    var myUser = userArr[0];

    if (passwordValue == myUser.password) {

        console.log("User trying to login");
        localStorage.setItem("currentUser", JSON.stringify(myUser));

        generateToken()
        window.location.href = "../profile/profile.html";
    }
    else {
        // alert("Password is Incorrect")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "password is Incorrect",
        })
    };

};
document.getElementById("login-btn").addEventListener("click", login);

function generateToken() {
    var token_str = "abcdefghijklmnopqrstuvxyz123654789@##$%"
    var len = 16;
    var token = "";
    var n = token_str.length;
    for (var i = 0; i < len; i++) {
        token += token_str.charAt(Math.floor(Math.random() * n));
    }
    localStorage.setItem("token", token)
}
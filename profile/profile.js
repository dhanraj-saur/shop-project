
if (!localStorage.getItem("currentUser")) {
    window.location.href = "../login/login.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
}

document.getElementById("log-out").addEventListener("click", logout);


let updatePass = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
function changePassword() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const { password, email } = { ...currentUser };
    if (oldPassword != password) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Old Password is wrong',
        })
        return
    }
    if (newPassword != confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Confirm password and new password do'nt match",

        })
        return
    }
    updatePass.forEach((user, i) => {
        if (user.email == email) {
            updatePass[i].password = newPassword
        }
    });
    currentUser.password = newPassword;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(updatePass));
    Swal.fire({
        icon: 'success',
        title: 'Password change successfully',
        showConfirmButton: false,
        timer: 3000
    })
}

function saveInfo() {
    const fullName = document.getElementById("input-fname").value;
    const lastName = document.getElementById("input-lname").value;

    const { fname, lname } = { ...currentUser };
    updatePass.forEach((user, i) => {
        if (user.fname == fname && user.lname == lname) {
            updatePass[i].fname = fullName;
            updatePass[i].lname = lastName;
        }
    });
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(updatePass));
}
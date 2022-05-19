let userList = [];

class user {
  username = "";
  password = "";
  constructor(username, password) {
    (this.username = username.toLowerCase()), (this.password = password);
    userList.push(this);
  }
}

user = new user("Test@test.com", "Test123");

function login(event) {
  event.preventDefault();
  let usernameInput = document
    .getElementById("email_input")
    .value.toLowerCase();
  let passwordInput = document.getElementById("password_input").value;

  userList.forEach((user) => {
    if (usernameInput === user.username && passwordInput === user.password) {
      console.log("Login Success");
      document.location.href = "index.html";
    } else {
      console.log("Account doesnt exist");
    }
  });
}

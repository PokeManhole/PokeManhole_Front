import SERVER from "/src/config/config.json" assert { type: "json" };
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginForm = document.getElementById("login-form");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function init() {
  loginForm.addEventListener("submit", () => {
    fetch(SERVER.SERVER + "/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: loginEmailInput.value,
        password: loginPasswordInput.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
}

init();

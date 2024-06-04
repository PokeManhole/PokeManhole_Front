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

const tryLogin = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: loginEmailInput.value,
        password: loginPasswordInput.value,
      }),
    }).then((res) => res.json());
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const submitLogin = async (e) => {
  e.preventDefault();
  const data = await tryLogin();
  if (data) {
    localStorage.setItem("token", data.token);
    container.style = "display:none";
  }
};

const isLogin = () => {
  const token = localStorage.getItem("token");
  token && getUser(token).then(() => (container.style = "display:none"));
};

const getUser = async (token) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/user", {
      headers: {
        Authorization: token,
      },
    }).then((res) => res.json());
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

function init() {
  loginForm.addEventListener("submit", (e) => submitLogin(e));
  isLogin();
}

init();

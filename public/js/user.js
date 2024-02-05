const loginForm = document.querySelector("#login-form");

const onLoginSubmit = async (event) => {
  event.preventDefault();
  const { username, password } = event.target;

  const user = {
    username: username.value,
    password: password.value,
  };

  const login = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

  if (login.status !== 200) {
    alert(login.body.message);
    return;
  }
};

loginForm.addEventListener("submit", onLoginSubmit);

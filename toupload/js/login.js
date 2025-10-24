document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const usernameField = document.getElementById("username");
  const passwordField = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  const validUser = "admin";
  const validPass = "1234";

  function handleLogin() {
    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    if (username === validUser && password === validPass) {
      // Save login status
      localStorage.setItem("clinicLoggedIn", "true");
      window.location.href = "home.html";
    } else {
      errorMessage.textContent = "Invalid username or password.";
      errorMessage.style.display = "block";
    }
  }

  loginBtn.addEventListener("click", handleLogin);
  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
  });
});

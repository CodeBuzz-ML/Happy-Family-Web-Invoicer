document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.getElementById("auth-btn");
    const toggleForm = document.getElementById("toggle-form");
    let isLogin = true;
  
    toggleForm.addEventListener("click", () => {
      isLogin = !isLogin;
      document.getElementById("form-title").textContent = isLogin ? "Login" : "Sign Up";
      authBtn.textContent = isLogin ? "Login" : "Sign Up";
    });
  
    authBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      if (isLogin) {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => window.location.href = "invoices.html")
          .catch(error => alert(error.message));
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => window.location.href = "invoices.html")
          .catch(error => alert(error.message));
      }
    });
  });
  
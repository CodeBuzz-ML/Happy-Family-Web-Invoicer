const clinicAuth = {
    checkLogin: function () {
      if (localStorage.getItem("clinicLoggedIn") !== "true") {
        window.location.href = "login.html";
      }
    },
    logout: function () {
      localStorage.removeItem("clinicLoggedIn");
      window.location.href = "login.html";
    }
  };
  
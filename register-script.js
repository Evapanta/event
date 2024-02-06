function registerUser() {
  const formData = {
    name: document.getElementById("fname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirm_password: document.getElementById("confirm_password").value,
  };

  fetch("http://localhost:3000/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display success message
      document.getElementById(
        "flashMessage"
      ).innerHTML = `<div class="flash-message success">Registration successful: ${JSON.stringify(
        data
      )}</div>`;
      document.getElementById("flashMessage").style.display = "block"; // Show the flash message
    })
    .catch((error) => {
      // Display error message
      document.getElementById(
        "flashMessage"
      ).innerHTML = `<div class="flash-message error">Registration failed: ${error.message}</div>`;
      document.getElementById("flashMessage").style.display = "block"; // Show the flash message
    });
}

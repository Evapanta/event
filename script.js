// script.
console.log("Script loaded");
function showMessage() {
  const flashMessage = document.getElementById("flashMessage");
  const registrationForm = document.getElementById("registrationForm");

  // Create a div element for the flash message
  const messageDiv = document.createElement("div");
  messageDiv.className = "flash-message";
  messageDiv.textContent = "Registration successful! We will be in touch soon.";

  // Append the message to the flashMessage container
  flashMessage.appendChild(messageDiv);

  // Show the flash message
  flashMessage.style.display = "block";

  // Clear the form fields
  registrationForm.reset();

  // Optional: You can hide the flash message after a few seconds
  setTimeout(() => {
    flashMessage.removeChild(messageDiv);
    flashMessage.style.display = "none";
  }, 5000);
}

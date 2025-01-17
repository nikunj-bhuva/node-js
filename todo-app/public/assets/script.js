document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const errorMessage = document.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.style.transition = "opacity 1s";
      errorMessage.style.opacity = "0";
    }
  }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const updateMessage = document.querySelector(".update-message");
    if (updateMessage) {
      updateMessage.style.transition = "opacity 1s";
      updateMessage.style.opacity = "0";
    }
  }, 3000);
});

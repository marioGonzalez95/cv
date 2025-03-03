$("#staticBackdrop").on("hidden.bs.modal", function () {
  window.scrollTo(0, 0); // Mueve el scroll al inicio
  document.body.style.overflow = ""; // Restablece el scroll del body
});

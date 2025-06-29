document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("back-to-top");

  // Mostrar u ocultar el botón al hacer scroll
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      // Aparece después de 300px de scroll
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Volver al inicio al hacer clic
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Desplazamiento suave
    });
  });
});

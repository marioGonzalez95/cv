document.addEventListener("DOMContentLoaded", function () {
  const botonModoNocturno = document.getElementById("modoNocturno");

  // Función para cambiar el modo
  function toggleModoOscuro() {
    document.body.classList.toggle("modo-oscuro");

    // Guardar preferencia en localStorage
    if (document.body.classList.contains("modo-oscuro")) {
      localStorage.setItem("modoOscuro", "activado");
      botonModoNocturno.textContent = "☀️";
    } else {
      localStorage.setItem("modoOscuro", "desactivado");
      botonModoNocturno.textContent = "🌙";
    }
  }

  // Aplicar modo oscuro si estaba activado previamente
  if (localStorage.getItem("modoOscuro") === "activado") {
    document.body.classList.add("modo-oscuro");
    botonModoNocturno.textContent = "☀️";
  }

  // Asignar evento al botón
  botonModoNocturno.addEventListener("click", toggleModoOscuro);
});

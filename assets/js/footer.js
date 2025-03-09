fetch("components/footer.html") // Ruta del archivo HTML
  .then((response) => response.text()) // Convertir la respuesta a texto
  .then((data) => {
    document.getElementById("footer").innerHTML = data; // Insertar el contenido
  })
  .catch((error) => console.error("Error al cargar el archivo:", error));

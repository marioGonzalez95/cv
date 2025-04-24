const url = "https://rickandmortyapi.com/api/character/?page=3"; // URL de la API
const contenedor = document.querySelector(".row");
let personajes = []; // Guardará la lista de personajes sin filtrar

const obtenerDatos = (apiURL) => {
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      personajes = data.results; // Guardamos todos los personajes obtenidos
      imprimirDatos(personajes);
      imprimirPagina(data.info);
    })
    .catch((err) => console.error(err));
};

const imprimirDatos = (datos) => {
  contenedor.innerHTML = "";
  datos.forEach((pjs) => {
    let card = document.createElement("div");
    card.classList.add("col-md-4");

    card.innerHTML = `
      <div class="card mx-auto margin-cartas-top" style="width: 18rem">
        <img src="${pjs.image}" class="card-img-top" alt="${pjs.name}" />
        <div class="card-body">
          <h5 class="card-title">${pjs.name}</h5>
          <p class="status">Estado: ${pjs.status}</p>
          <p class="species">Especie: ${pjs.species}</p>
          <p class="origen">Origen: ${pjs.origin.name}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
};

const imprimirPagina = (data) => {
  let botones = document.querySelector(".botones");
  botones.innerHTML = `
    <button ${data.prev ? "" : "disabled"} onclick="obtenerDatos('${
    data.prev
  }')">Previous</button>
    <button ${data.next ? "" : "disabled"} onclick="obtenerDatos('${
    data.next
  }')">Next</button>
  `;
};

// Función para filtrar los personajes
const filtrarPersonajes = () => {
  let estadoSeleccionado = document.querySelector("#filtroEstado").value;
  let especieSeleccionada = document.querySelector("#filtroEspecie").value;
  let origenSeleccionado = document.querySelector("#filtroOrigen").value;

  let personajesFiltrados = personajes.filter((pjs) => {
    return (
      (estadoSeleccionado === "" || pjs.status === estadoSeleccionado) &&
      (especieSeleccionada === "" || pjs.species === especieSeleccionada) &&
      (origenSeleccionado === "" || pjs.origin.name === origenSeleccionado)
    );
  });

  imprimirDatos(personajesFiltrados);
};

// Evento para aplicar los filtros
document
  .querySelector("#btnFiltrar")
  .addEventListener("click", filtrarPersonajes);

obtenerDatos(url);

// Función para resetear los filtros
const resetearFiltros = () => {
  document.querySelector("#filtroEstado").value = "";
  document.querySelector("#filtroEspecie").value = "";
  document.querySelector("#filtroOrigen").value = "";
  imprimirDatos(personajes); // Muestra la lista completa de personajes
};

// Evento para el botón Reset
document.querySelector("#btnReset").addEventListener("click", resetearFiltros);

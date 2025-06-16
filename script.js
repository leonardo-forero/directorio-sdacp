const URL = "https://v1.nocodeapi.com/leonhernandez/google_sheets/yirCRecUeXIDDVTj"; // endpoint JSON


const consejoSelect = document.getElementById("consejo");
const sectorSelect = document.getElementById("sector");
const resultadosDiv = document.getElementById("resultados");
const botonConsultar = document.getElementById("consultar");

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    const rows = data.data;

    const consejos = [...new Set(rows.map(row => row.Consejo).filter(Boolean))];
    const sectores = [...new Set(rows.map(row => row.Sector).filter(Boolean))];

    consejos.forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      consejoSelect.appendChild(option);
    });

    sectores.forEach(s => {
      const option = document.createElement("option");
      option.value = s;
      option.textContent = s;
      sectorSelect.appendChild(option);
    });

    botonConsultar.addEventListener("click", () => {
      const consejoSeleccionado = consejoSelect.value;
      const sectorSeleccionado = sectorSelect.value;

      resultadosDiv.innerHTML = "";

      if (!consejoSeleccionado || !sectorSeleccionado) {
        resultadosDiv.innerHTML = "<p>Por favor selecciona un consejo y un sector.</p>";
        return;
      }

      const resultados = rows.filter(
        row => row.Consejo === consejoSeleccionado && row.Sector === sectorSeleccionado
      );

      if (resultados.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron coincidencias para tu búsqueda.</p>";
      } else {
        resultados.forEach(row => {
          const card = document.createElement("div");
          card.className = "tarjeta-contacto";
          card.innerHTML = `
            <p><strong>👤 Nombre:</strong> ${row["Nombre completo"]}</p>
            <p><strong>📞 Teléfono:</strong> ${row["Teléfono"]}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${row["Email"]}">${row["Email"]}</a></p>
            <hr>
          `;
          resultadosDiv.appendChild(card);
        });
      }
    });
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
    resultadosDiv.innerHTML = "<p>Hubo un error cargando el directorio. Intenta más tarde.</p>";
  });
const ramos = [
  // Estructura: { id, nombre, semestre, requisitos: [ids] }

  { id: "sociologia1", nombre: "Introducción a la sociología", semestre: "I", requisitos: [] },
  { id: "escritura1", nombre: "Autorregulación: taller de escritura sociológica", semestre: "I", requisitos: [] },
  { id: "logico", nombre: "Pensamiento lógico matemático", semestre: "I", requisitos: [] },
  { id: "introccss", nombre: "Introducción a las ciencias sociales", semestre: "I", requisitos: [] },
  { id: "histlat", nombre: "Historia social y política latinoamericana", semestre: "I", requisitos: [] },
  { id: "ingles1", nombre: "Inglés I", semestre: "I", requisitos: [] },

  { id: "teoclasica", nombre: "Teoría sociológica clásica", semestre: "II", requisitos: ["sociologia1"] },
  { id: "escritura2", nombre: "Taller de escritura sociológica II", semestre: "II", requisitos: ["escritura1"] },
  { id: "metodos", nombre: "Introducción a los métodos de investigación social", semestre: "II", requisitos: ["logico"] },
  { id: "teopolitica", nombre: "Teoría política", semestre: "II", requisitos: [] },
  { id: "histchile", nombre: "Historia social y política de Chile s. XX", semestre: "II", requisitos: [] },
  { id: "ingles2", nombre: "Inglés II", semestre: "II", requisitos: ["ingles1"] },

  // Tercer semestre
  { id: "teomoderna", nombre: "Teoría sociológica moderna", semestre: "III", requisitos: ["teoclasica"] },
  { id: "genero", nombre: "Sociología de género", semestre: "III", requisitos: [] },
  { id: "cuanti1", nombre: "Métodos cuantitativos I", semestre: "III", requisitos: ["metodos"] },
  { id: "economia", nombre: "Economía", semestre: "III", requisitos: [] },
  { id: "electivo1", nombre: "Electivo ciclo inicial", semestre: "III", requisitos: [] },
  { id: "ingles3", nombre: "Inglés III", semestre: "III", requisitos: ["ingles2"] },

  // ... (continúa hasta X semestre, tú decides si te genero todos ahora)

];

const aprobados = new Set();

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  const semestres = [...new Set(ramos.map(r => r.semestre))];

  for (const semestre of semestres) {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${semestre} semestre</h2>`;

    ramos.filter(r => r.semestre === semestre).forEach(ramo => {
      const btn = document.createElement("button");
      btn.textContent = ramo.nombre;
      btn.className = "ramo";
      btn.dataset.id = ramo.id;

      const requisitosListos = ramo.requisitos.every(req => aprobados.has(req));
      if (!requisitosListos && ramo.requisitos.length > 0) {
        btn.classList.add("locked");
        btn.disabled = true;
      }
      if (aprobados.has(ramo.id)) {
        btn.classList.add("approved");
      }

      btn.addEventListener("click", () => {
        if (!btn.classList.contains("locked")) {
          aprobados.add(ramo.id);
          renderMalla();
        }
      });

      div.appendChild(btn);
    });

    contenedor.appendChild(div);
  }
}

renderMalla();

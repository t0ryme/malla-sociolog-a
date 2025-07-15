/* ------------------------------------------------------------------
   MALLA SOCIOLOGÍA – INTERACTIVA
   Cada ramo se desbloquea cuando se aprueban TODOS sus requisitos.
-------------------------------------------------------------------*/

const ramos = [
  /* PRIMER AÑO */
  /* I semestre */
  { id: "sociologia1", nombre: "Introducción a la sociología", semestre: "I", requisitos: [] },
  { id: "escritura1", nombre: "Autorregulación: taller de escritura sociológica", semestre: "I", requisitos: [] },
  { id: "logico", nombre: "Pensamiento lógico matemático", semestre: "I", requisitos: [] },
  { id: "introccss", nombre: "Introducción a las ciencias sociales", semestre: "I", requisitos: [] },
  { id: "histlat", nombre: "Historia social y política latinoamericana", semestre: "I", requisitos: [] },
  { id: "ingles1", nombre: "Inglés I", semestre: "I", requisitos: [] },

  /* II semestre */
  { id: "teoclasica", nombre: "Teoría sociológica clásica", semestre: "II", requisitos: ["sociologia1"] },
  { id: "escritura2", nombre: "Taller de escritura sociológica II", semestre: "II", requisitos: ["escritura1"] },
  { id: "metodos", nombre: "Introducción a los métodos de investigación social", semestre: "II", requisitos: ["logico"] },
  { id: "teopolitica", nombre: "Teoría política", semestre: "II", requisitos: [] },
  { id: "histchile", nombre: "Historia social y política de Chile s. XX", semestre: "II", requisitos: [] },
  { id: "ingles2", nombre: "Inglés II", semestre: "II", requisitos: ["ingles1"] },

  /* SEGUNDO AÑO */
  /* III semestre */
  { id: "teomoderna", nombre: "Teoría sociológica moderna", semestre: "III", requisitos: ["teoclasica"] },
  { id: "genero", nombre: "Sociología de género", semestre: "III", requisitos: [] },
  { id: "cuanti1", nombre: "Métodos cuantitativos I", semestre: "III", requisitos: ["metodos"] },
  { id: "economia", nombre: "Economía", semestre: "III", requisitos: [] },
  { id: "electivo1", nombre: "Electivo ciclo inicial", semestre: "III", requisitos: [] },
  { id: "ingles3", nombre: "Inglés III", semestre: "III", requisitos: ["ingles2"] },

  /* IV semestre */
  { id: "teolatam", nombre: "Teoría social y sociología latinoamericana", semestre: "IV", requisitos: ["teoclasica"] },
  { id: "ddhh", nombre: "Sociología de los derechos humanos", semestre: "IV", requisitos: [] },
  { id: "estad1", nombre: "Estadística I", semestre: "IV", requisitos: ["cuanti1"] },
  { id: "politicas", nombre: "Políticas públicas", semestre: "IV", requisitos: [] },
  { id: "cuali1", nombre: "Métodos cualitativos I", semestre: "IV", requisitos: ["metodos"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: "IV", requisitos: ["ingles3"] },

  /* TERCER AÑO */
  /* V semestre */
  { id: "teocont1", nombre: "Teoría social contemporánea I", semestre: "V", requisitos: ["teoclasica"] },
  { id: "tipe1", nombre: "Práctica temprana: TIPE I", semestre: "V", requisitos: ["politicas"] },
  { id: "estad2", nombre: "Estadística II", semestre: "V", requisitos: ["estad1"] },
  { id: "tallerform", nombre: "Taller de formulación de proyectos sociales", semestre: "V", requisitos: ["politicas"] },
  { id: "electivoesp1", nombre: "Electivo de especialización I", semestre: "V", requisitos: [] },

  /* VI semestre */
  { id: "teocont2", nombre: "Teoría social contemporánea II", semestre: "VI", requisitos: ["teocont1"] },
  { id: "tipe2", nombre: "Práctica temprana: TIPE II", semestre: "VI", requisitos: ["tipe1"] },
  { id: "ciclos", nombre: "Sociología y ciclos de vida", semestre: "VI", requisitos: [] },
  { id: "tallereval", nombre: "Taller de evaluación de proyectos sociales", semestre: "VI", requisitos: ["tallerform"] },
  { id: "cuali2", nombre: "Métodos cualitativos II", semestre: "VI", requisitos: ["cuali1"] },

  /* CUARTO AÑO */
  /* VII semestre */
  { id: "estructura", nombre: "Estructura social y desigualdad", semestre: "VII", requisitos: [] },
  { id: "tipe3", nombre: "Práctica temprana III: TIPE", semestre: "VII", requisitos: ["tipe2"] },
  { id: "cuanti2", nombre: "Métodos cuantitativos II", semestre: "VII", requisitos: ["cuanti1"] },
  { id: "accion", nombre: "Acción colectiva y movimientos sociales", semestre: "VII", requisitos: [] },
  { id: "electivoesp2", nombre: "Electivo de especialización II", semestre: "VII", requisitos: [] },

  /* VIII semestre */
  { id: "territorio", nombre: "Sociología del territorio", semestre: "VIII", requisitos: [] },
  { id: "semiteo", nombre: "Seminario teórico", semestre: "VIII", requisitos: ["teocont1"] },
  { id: "tallersocio", nombre: "Taller de escritura sociológica y comunicación", semestre: "VIII", requisitos: ["tipe1"] },
  { id: "semimeto", nombre: "Seminario metodológico", semestre: "VIII", requisitos: ["estad2", "cuali2"] },

  /* QUINTO AÑO */
  /* IX semestre */
  { id: "practica", nombre: "Práctica profesional", semestre: "IX", requisitos: ["territorio", "semiteo", "tallersocio", "semimeto"] },

  /* X semestre */
  { id: "titulacion", nombre: "Seminario de titulación", semestre: "X", requisitos: ["practica"] }
];

/* ----------  LÓGICA DE INTERACCIÓN  ---------- */

const aprobados = new Set();          // Cursos aprobados

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  /* Orden fijo para mostrar los semestres */
  const ordenSemestres = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];

  for (const semestre of ordenSemestres) {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${semestre} semestre</h2>`;

    ramos
      .filter(r => r.semestre === semestre)
      .forEach(ramo => {
        const btn = document.createElement("button");
        btn.textContent = ramo.nombre;
        btn.className = "ramo";
        btn.dataset.id = ramo.id;

        /* ¿Están listos los requisitos? */
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
            aprobados.add(ramo.id);   // aprueba el ramo
            renderMalla();            // vuelve a dibujar la malla
          }
        });

        div.appendChild(btn);
      });

    contenedor.appendChild(div);
  }
}

/* Render inicial */
renderMalla();


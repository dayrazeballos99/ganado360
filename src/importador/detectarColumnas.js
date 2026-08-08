const diccionario = {
  rp: [
    "rp",
    "id",
    "numero",
    "número",
    "id animal",
    "identificacion",
    "identificación",
  ],

  identificador: [
   "ide",
   "idv",
   "eid",
   "rfid",
   "chip",
   "identificador",
   "identificador electronico",
   "identificación electrónica"
],

  caravana: [
    "caravana",
    "caravana nro",
    "n° caravana",
    "numero caravana",
    "arete",
    "chapeta",
    "id visual",
  ],

  nombre: [
    "nombre",
    "animal",
    "alias",
  ],

  raza: [
    "raza",
  ],

  sexo: [
    "sexo",
    "genero",
    "género",
  ],

  peso: [
    "peso",
    "kg",
    "kgs",
    "kilos",
    "peso vivo",
    "pv",
  ],

  categoria: [
    "categoria",
    "categoría",
    "tipo",
  ],

  lote: [
    "lote",
    "corral",
    "potrero",
    "campo",
  ],

  estado: [
    "estado",
    "situacion",
    "situación",
  ],

  fecha: [
    "fecha",
    "fecha tratamiento",
    "fecha aplicación",
  ],

  tipo: [
    "tipo",
    "tratamiento",
    "vacuna",
    "medicamento",
  ],

  producto: [
    "producto",
    "vacuna",
    "medicamento",
    "droga",
    "principio activo",
  ],

  laboratorio: [
    "laboratorio",
    "marca",
  ],

  dosis: [
    "dosis",
    "cantidad",
  ],

  unidad: [
    "unidad",
    "ml",
    "cc",
    "mg",
  ],

  via: [
    "via",
    "vía",
    "via aplicacion",
    "vía aplicación",
  ],

  veterinario: [
    "veterinario",
    "veterinaria",
    "medico veterinario",
  ],

  responsable: [
    "responsable",
    "aplicador",
    "operario",
  ],

  diagnostico: [
    "diagnostico",
    "diagnóstico",
  ],

  proximaDosis: [
    "proxima dosis",
    "próxima dosis",
    "refuerzo",
  ],

  retiro: [
    "retiro",
    "periodo retiro",
    "período retiro",
  ],

  observaciones: [
    "observaciones",
    "obs",
    "comentarios",
    "detalle",
  ],

};

export default diccionario;
function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function detectarColumnas(encabezados) {
  const resultado = {};

  encabezados.forEach((columna) => {
    const nombre = normalizar(columna);

    for (const campo in diccionario) {
      const sinonimos = diccionario[campo].map(normalizar);

      if (sinonimos.includes(nombre)) {
        resultado[campo] = columna;
        break;
      }
    }
  });

  return resultado;
}
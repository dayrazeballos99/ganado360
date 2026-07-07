export default function filtrarColumnas(encabezados = []) {
  return encabezados.map((texto, indice) => {
    if (texto == null) return null;

    const nombre = String(texto).trim();

    // Ignorar columnas vacías
    if (!nombre) return null;

    // Ignorar encabezados basura generados por algunos sistemas
    if (
      nombre.includes(";") &&
      nombre.split(";").length > 5
    ) {
      return null;
    }

    return {
      indice,
      nombre,
    };
  }).filter(Boolean);
}
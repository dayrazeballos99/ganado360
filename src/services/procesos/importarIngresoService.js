import { agregarMuchosAnimales } from "../animalService";
import { agregarMovimiento } from "../movimientoService";

export async function importarIngreso(animales) {

  await agregarMovimiento({
    tipo: "Ingreso",
    fecha: new Date().toISOString().slice(0, 10),
    cantidad: animales.length,
    observaciones: "Ingreso importado desde Excel",
  });

  await agregarMuchosAnimales(animales);

  // Próximamente:
  // - Crear pesajes iniciales
  // - Actualizar dashboard
  // - Registrar actividad

}
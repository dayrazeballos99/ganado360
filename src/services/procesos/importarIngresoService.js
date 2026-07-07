import { agregarMuchosAnimales } from "../animalService";
import { agregarMovimiento } from "../movimientoService";
import { crearPesajesIniciales } from "./crearPesajesInicialesService";

export async function importarIngreso(animales) {

  // Registrar el movimiento de ingreso
  await agregarMovimiento({
    tipo: "Ingreso",
    fecha: new Date().toISOString().slice(0, 10),
    cantidad: animales.length,
    observaciones: "Ingreso importado desde Excel",
  });

  // Crear los animales
  const animalesCreados = await agregarMuchosAnimales(animales);

  // Crear el primer pesaje de cada animal
  await crearPesajesIniciales(animalesCreados);

  return animalesCreados;
}
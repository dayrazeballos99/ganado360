import { agregarMuchosAnimales } from "../animalService";
import { agregarMovimiento } from "../movimientoService";
import { crearPesajesIniciales } from "./crearPesajesInicialesService";

export async function importarIngreso(animales, loteId = "") {

  // Asignar el lote elegido a todos los animales
  const animalesConLote = animales.map((animal) => ({
    ...animal,
    loteId,
  }));

  // Registrar el movimiento de ingreso
  await agregarMovimiento({
    tipo: "Ingreso",
    fecha: new Date().toISOString().slice(0, 10),
    cantidad: animalesConLote.length,
    observaciones: "Ingreso importado desde Excel",
  });

  // Crear los animales
  const animalesCreados = await agregarMuchosAnimales(animalesConLote);

  // Crear el primer pesaje de cada animal
  await crearPesajesIniciales(animalesCreados);

  return animalesCreados;
}
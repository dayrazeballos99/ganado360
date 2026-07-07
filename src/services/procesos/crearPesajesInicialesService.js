import { agregarPesaje } from "../pesajeService";

export async function crearPesajesIniciales(animales) {

  const fecha = new Date().toISOString().slice(0, 10);

  for (const animal of animales) {

    if (!animal.peso) continue;

    await agregarPesaje(animal.id, {
      fecha,
      peso: Number(animal.peso),
      tipo: "Ingreso",
      observaciones: "Pesaje inicial importado",
    });

  }

}
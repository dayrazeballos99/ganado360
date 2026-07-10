import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export async function obtenerMovimientos(animalId) {

  const referencia = collection(
    db,
    "animales",
    animalId,
    "movimientos"
  );

  const consulta = query(
    referencia,
    orderBy("fecha", "desc")
  );

  const snapshot = await getDocs(consulta);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));

}

export async function agregarMovimiento(animalId, movimiento) {

  const referencia = collection(
    db,
    "animales",
    animalId,
    "movimientos"
  );

  await addDoc(referencia, movimiento);

}

export async function editarMovimiento(
  animalId,
  movimientoId,
  movimiento
) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "movimientos",
    movimientoId
  );

  await updateDoc(referencia, movimiento);

}

export async function eliminarMovimiento(
  animalId,
  movimientoId
) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "movimientos",
    movimientoId
  );

  await deleteDoc(referencia);

}
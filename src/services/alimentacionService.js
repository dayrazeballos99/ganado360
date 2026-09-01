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

// ========================================
// ALIMENTACIÓN POR LOTE
// ========================================

export async function obtenerAlimentaciones(loteId) {
  const referencia = collection(
    db,
    "lotes",
    loteId,
    "alimentacion"
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

export async function agregarAlimentacion(
  loteId,
  alimentacion
) {
  const referencia = collection(
    db,
    "lotes",
    loteId,
    "alimentacion"
  );

  await addDoc(
    referencia,
    alimentacion
  );
}

export async function editarAlimentacion(
  loteId,
  alimentacionId,
  alimentacion
) {
  const referencia = doc(
    db,
    "lotes",
    loteId,
    "alimentacion",
    alimentacionId
  );

  await updateDoc(
    referencia,
    alimentacion
  );
}

export async function eliminarAlimentacion(
  loteId,
  alimentacionId
) {
  const referencia = doc(
    db,
    "lotes",
    loteId,
    "alimentacion",
    alimentacionId
  );

  await deleteDoc(referencia);
}

// ========================================
// ALIMENTACIÓN POR ANIMAL
// ========================================

export async function obtenerAlimentacionesAnimal(animalId) {
  const referencia = collection(
    db,
    "animales",
    animalId,
    "alimentacion"
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

export async function agregarAlimentacionAnimal(
  animalId,
  alimentacion
) {
  const referencia = collection(
    db,
    "animales",
    animalId,
    "alimentacion"
  );

  await addDoc(
    referencia,
    alimentacion
  );
}

export async function editarAlimentacionAnimal(
  animalId,
  alimentacionId,
  alimentacion
) {
  const referencia = doc(
    db,
    "animales",
    animalId,
    "alimentacion",
    alimentacionId
  );

  await updateDoc(
    referencia,
    alimentacion
  );
}

export async function eliminarAlimentacionAnimal(
  animalId,
  alimentacionId
) {
  const referencia = doc(
    db,
    "animales",
    animalId,
    "alimentacion",
    alimentacionId
  );

  await deleteDoc(referencia);
}
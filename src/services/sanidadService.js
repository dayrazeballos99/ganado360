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

export async function obtenerTratamientos(animalId) {

  const referencia = collection(db, "animales", animalId, "sanidad");

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

export async function agregarTratamiento(animalId, tratamiento) {

  const referencia = collection(db, "animales", animalId, "sanidad");

  await addDoc(referencia, tratamiento);

}

export async function editarTratamiento(animalId, tratamientoId, tratamiento) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "sanidad",
    tratamientoId
  );

  await updateDoc(referencia, tratamiento);

}

export async function eliminarTratamiento(animalId, tratamientoId) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "sanidad",
    tratamientoId
  );

  await deleteDoc(referencia);

}
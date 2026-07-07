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

export async function obtenerPesajes(animalId) {

  const referencia = collection(db, "animales", animalId, "pesajes");

  const consulta = query(
    referencia,
    orderBy("fecha", "asc")
  );

  const snapshot = await getDocs(consulta);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));

}

export async function agregarPesaje(animalId, pesaje) {

  const referencia = collection(
    db,
    "animales",
    animalId,
    "pesajes"
  );

  const documento = await addDoc(referencia, pesaje);

  return {
    id: documento.id,
    ...pesaje,
  };

}

export async function editarPesaje(animalId, pesajeId, pesaje) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "pesajes",
    pesajeId
  );

  await updateDoc(referencia, pesaje);

}

export async function eliminarPesaje(animalId, pesajeId) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "pesajes",
    pesajeId
  );

  await deleteDoc(referencia);

}
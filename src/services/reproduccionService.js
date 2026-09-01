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


export async function obtenerEventosReproductivos(animalId) {

  const referencia = collection(
    db,
    "animales",
    animalId,
    "reproduccion"
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


export async function agregarEventoReproductivo(
  animalId,
  evento
) {

  const referencia = collection(
    db,
    "animales",
    animalId,
    "reproduccion"
  );

  await addDoc(
    referencia,
    evento
  );

}


export async function editarEventoReproductivo(
  animalId,
  eventoId,
  evento
) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "reproduccion",
    eventoId
  );

  await updateDoc(
    referencia,
    evento
  );

}


export async function eliminarEventoReproductivo(
  animalId,
  eventoId
) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "reproduccion",
    eventoId
  );

  await deleteDoc(
    referencia
  );

}
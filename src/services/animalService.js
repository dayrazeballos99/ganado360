import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const animalesRef = collection(db, "animales");

export async function obtenerAnimales() {
  const snapshot = await getDocs(animalesRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
}

export async function agregarAnimal(animal) {
  await addDoc(animalesRef, animal);
}

export async function editarAnimal(id, animal) {
  const referencia = doc(db, "animales", id);
  await updateDoc(referencia, animal);
}

export async function eliminarAnimal(id) {
  const referencia = doc(db, "animales", id);
  await deleteDoc(referencia);
}
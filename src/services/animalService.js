import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
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
  const referencia = await addDoc(animalesRef, animal);

  return {
    id: referencia.id,
    ...animal,
  };
}

export async function agregarMuchosAnimales(animales) {

  console.log("Primer animal a guardar:", animales[0]);
  console.log("Tipo del peso:", typeof animales[0].peso);

  const creados = [];

  for (const animal of animales) {

    const referencia = await addDoc(animalesRef, animal);

    creados.push({
      id: referencia.id,
      ...animal,
    });

  }

  return creados;
}

export async function editarAnimal(id, animal) {
  const referencia = doc(db, "animales", id);
  await updateDoc(referencia, animal);
}

export async function eliminarAnimal(id) {
  const referencia = doc(db, "animales", id);
  await deleteDoc(referencia);
}

export async function obtenerAnimalPorId(id) {

  const referencia = doc(db, "animales", id);

  const documento = await getDoc(referencia);

  if (!documento.exists()) {
    return null;
  }

  return {
    id: documento.id,
    ...documento.data(),
  };

}
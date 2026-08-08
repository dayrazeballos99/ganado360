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

export async function obtenerAnimalPorCaravana(caravana) {
  const animales = await obtenerAnimales();

  const caravanaBuscada = String(caravana).trim();

  return (
    animales.find(
      (animal) =>
        String(animal.caravana || "").trim() === caravanaBuscada
    ) || null
  );
}

export async function obtenerAnimalPorRP(rp) {
  const animales = await obtenerAnimales();

  const rpBuscado = String(rp)
    .trim()
    .replace(/^0+/, "");

  return (
    animales.find((animal) => {
      const rpAnimal = String(animal.rp || "")
        .trim()
        .replace(/^0+/, "");

      return rpAnimal === rpBuscado;
    }) || null
  );
}

export async function actualizarLoteAnimal(id, loteId) {
  const referencia = doc(db, "animales", id);

  await updateDoc(referencia, {
    loteId,
  });
}

export async function actualizarEstadoAnimal(id, estado) {
  const referencia = doc(db, "animales", id);

  await updateDoc(referencia, {
    estado,
  });
}

export async function actualizarPesoActual(id, peso) {
  const referencia = doc(db, "animales", id);

  await updateDoc(referencia, {
    peso,
  });
}

export async function buscarAnimalPorIdentificador(valor) {
  const animales = await obtenerAnimales();

  const buscado = String(valor)
    .trim()
    .replace(/^0+/, "");

  return (
    animales.find((animal) => {
      const identificadores = [
        animal.rp,
        animal.caravana,
        animal.ide,
        animal.idv,
        animal.rfid,
        animal.chip,
      ];

      return identificadores.some((id) => {
        if (!id) return false;

        return (
          String(id)
            .trim()
            .replace(/^0+/, "") === buscado
        );
      });
    }) || null
  );
}
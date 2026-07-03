import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

export const agregarPesaje = async (animalId, datos) => {
  const ref = collection(db, "animales", animalId, "pesajes");

  await addDoc(ref, {
    ...datos,
    createdAt: new Date(),
  });
};

export const obtenerPesajes = async (animalId) => {
  const ref = collection(db, "animales", animalId, "pesajes");

  const q = query(ref, orderBy("fecha", "asc"));

  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
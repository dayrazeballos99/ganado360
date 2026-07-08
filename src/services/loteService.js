import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const lotesRef = collection(db, "lotes");

export async function obtenerLotes() {

  const snapshot = await getDocs(lotesRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

}

export async function agregarLote(lote) {

  await addDoc(lotesRef, lote);

}
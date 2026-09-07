import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";


const lotesRef = collection(
  db,
  "lotes"
);


// ========================================
// OBTENER LOTES
// ========================================

export async function obtenerLotes() {

  const snapshot =
    await getDocs(lotesRef);

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data(),

  }));

}


// ========================================
// AGREGAR LOTE
// ========================================

export async function agregarLote(lote) {

  const nuevoLote =
    await addDoc(
      lotesRef,
      lote
    );

  return {

    id: nuevoLote.id,

    ...lote,

  };

}


// ========================================
// OBTENER LOTE POR ID
// ========================================

export async function obtenerLotePorId(id) {

  const lotes =
    await obtenerLotes();

  return (

    lotes.find(
      (lote) =>
        lote.id === id
    ) || null

  );

}
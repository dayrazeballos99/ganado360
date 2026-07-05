import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export async function obtenerMovimientos() {

  const referencia = collection(db, "movimientos");

  const consulta = query(
    referencia,
    orderBy("fecha", "desc")
  );

  const snapshot = await getDocs(consulta);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

}

export async function agregarMovimiento(movimiento) {

  const referencia = collection(db, "movimientos");

  await addDoc(referencia, movimiento);

}
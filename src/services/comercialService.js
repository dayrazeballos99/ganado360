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


// ========================================
// OBTENER REGISTROS COMERCIALES
// ========================================

export async function obtenerRegistrosComerciales(
  animalId
) {

  const referencia = collection(
    db,
    "animales",
    animalId,
    "comercial"
  );

  const consulta = query(
    referencia,
    orderBy("fecha", "desc")
  );

  const snapshot = await getDocs(
    consulta
  );

  return snapshot.docs.map(
    (documento) => ({
      id: documento.id,
      ...documento.data(),
    })
  );

}


// ========================================
// AGREGAR REGISTRO COMERCIAL
// ========================================

export async function agregarRegistroComercial(
  animalId,
  registro
) {

  const referencia = collection(
    db,
    "animales",
    animalId,
    "comercial"
  );

  await addDoc(
    referencia,
    registro
  );

}


// ========================================
// EDITAR REGISTRO COMERCIAL
// ========================================

export async function editarRegistroComercial(
  animalId,
  registroId,
  registro
) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "comercial",
    registroId
  );

  await updateDoc(
    referencia,
    registro
  );

}


// ========================================
// ELIMINAR REGISTRO COMERCIAL
// ========================================

export async function eliminarRegistroComercial(
  animalId,
  registroId
) {

  const referencia = doc(
    db,
    "animales",
    animalId,
    "comercial",
    registroId
  );

  await deleteDoc(
    referencia
  );

}
import { useState } from "react";

import PasoArchivo from "./PasoArchivo";
import PasoResumen from "./PasoResumen";
import PasoImportando from "./PasoImportando";
import PasoFinal from "./PasoFinal";
import PasoAnalizando from "./PasoAnalizando";

export default function ImportWizard() {
  const [paso, setPaso] = useState(1);

  const [archivo, setArchivo] = useState(null);

  const [resultado, setResultado] = useState(null);

  switch (paso) {
    case 1:
      return (
        <PasoArchivo
          archivo={archivo}
          setArchivo={setArchivo}
          siguiente={() => setPaso(2)}
        />
      );

    case 2:
  return (
    <PasoAnalizando
      archivo={archivo}
      finalizar={() => setPaso(3)}
    />
  );

    case 3:
      return (
        <PasoImportando
          archivo={archivo}
          finalizar={(datos) => {
            setResultado(datos);
            setPaso(5);
          }}
        />
      );

    case 4:
      return (
        <PasoFinal
          resultado={resultado}
          reiniciar={() => {
            setArchivo(null);
            setResultado(null);
            setPaso(1);
          }}
        />
      );

    default:
      return null;
  }
}
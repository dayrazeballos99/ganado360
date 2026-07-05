import { useState } from "react";

import PasoArchivo from "./PasoArchivo";
import PasoDeteccion from "./PasoDeteccion";
import PasoConfirmacion from "./PasoConfirmacion";
import PasoImportacion from "./PasoImportacion";

function EventoWizard() {

  const [paso, setPaso] = useState(1);

  const [archivo, setArchivo] = useState(null);

  const [tipoEvento, setTipoEvento] = useState("");

  const [analisis, setAnalisis] = useState(null);
  
  switch (paso) {

    case 1:
      return (
        <PasoArchivo
          archivo={archivo}
          setArchivo={setArchivo}
          setPaso={setPaso}
        />
      );

    case 2:
      return (
        <PasoDeteccion
          archivo={archivo}
          tipoEvento={tipoEvento}
          setTipoEvento={setTipoEvento}
          setPaso={setPaso}
        />
      );

    case 3:
      return (
        <PasoConfirmacion
          archivo={archivo}
          tipoEvento={tipoEvento}
          setPaso={setPaso}
        />
      );

    case 4:
      return (
        <PasoImportacion
          archivo={archivo}
          tipoEvento={tipoEvento}
        />
      );

    default:
      return null;

  }

}

export default EventoWizard;
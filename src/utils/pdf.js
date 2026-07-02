import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportarPDF(animales) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Ganado360 - Listado de Animales", 14, 15);

  autoTable(doc, {
    startY: 25,
    head: [[
      "RP",
      "Caravana",
      "Nombre",
      "Raza",
      "Sexo",
      "Peso"
    ]],
    body: animales.map((a) => ([
      a.rp,
      a.caravana,
      a.nombre,
      a.raza,
      a.sexo,
      a.peso,
    ])),
  });

  doc.save("Animales.pdf");
}
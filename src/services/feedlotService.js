export function calcularResumenIngreso(animales) {

  if (!animales.length) {

    return {

      cantidad: 0,

      pesoPromedio: 0,

      pesoMinimo: 0,

      pesoMaximo: 0,

    };

  }

  const pesos = animales.map((a) => Number(a.peso));

  const pesoPromedio =
    pesos.reduce((a, b) => a + b, 0) / pesos.length;

  return {

    cantidad: animales.length,

    pesoPromedio: pesoPromedio.toFixed(1),

    pesoMinimo: Math.min(...pesos),

    pesoMaximo: Math.max(...pesos),

  };

}
const clientInfo = [
  '\nNombre:\n',
  'Teléfono:\n',
  'Correo:\n',
  'Entidad bancaria:\n',
  'Horario de atención:'
]
const backQuestion = [
  '\n\n0️⃣ Atras'
]
module.exports = {
  es: {
    init: [
      'Hola soy *Pablo*, el asistente virtual de *Youi Company*.\n',
      '¿En qué te podemos asesorar hoy? Te puedo apoyar con información en:\n\n',
      '1️⃣ Reducción crédito hipotecario\n',
      '2️⃣ Mejora en la tasa de intereses\n',
      '3️⃣ Compra de cartera\n',
      '4️⃣ Reportes en centrales de riesgo\n',
      '5️⃣ Negociación de cartera\n',
      '6️⃣ Crédito hipotecario\n',
      '7️⃣ Cambio de UVR a pesos\n',
      '8️⃣ Reversión de alivio por COVID'
    ],
    reduccion: [
      'Perfecto. El análisis de reducción de crédito hipotecario es totalmente gratis, ',
      'para el cual solo requerimos una copia de tu último extracto y los siguientes datos\n',
      ...clientInfo,
      ...backQuestion
    ],
    mejora: [
      'Perfecto. Mejoramos la tasa de interés sin cambiar de banco. ',
      'Solo necesitamos tu último extracto bancario y los siguientes datos\n',
      ...clientInfo,
      ...backQuestion
    ],
    compra: [
      'Perfecto. Con solo el ultimo extracto de los créditos, examinamos la mejor opción ',
      'para tus créditos y gestionamos la compra de cartera.\n',
      'Envíanos la copia de tu ultimo extracto y los siguientes datos\n',
      ...clientInfo,
      ...backQuestion
    ],
    reportes: [
      'Perfecto. Necesitamos hacer una verificación de tu estado actual en el reporte.\n',
      'Si tienes el reporte envíanoslo o nosotros lo gestionaremos por ti por un valor ',
      'de $200.000 y con esto tendrás el reporte y un análisis preciso de tu estado y ',
      'las soluciones para resolver tus reportes envíanos estos datos\n',
      ...clientInfo,
      ...backQuestion
    ],
    negociacion: [
      'Perfecto. Generemos la negociación de tu deuda con la casa de cobranza y la ',
      'recuperamos para que empieces a tener pagos normales ahorrándote dinero de intereses ',
      'y cobranzas envíanos tu ultimo extracto y los siguientes datos\n',
      ...clientInfo,
      ...backQuestion
    ],
    credito: [
      'Perfecto. Déjanos los siguientes datos y el área encargada te comunicara \n',
      ...clientInfo,
      ...backQuestion
    ],
    cambio: [
      'Perfecto. Para solicitar el cambio requerimos el ultimo extracto y generaremos ',
      'la solicitud por ti ante la entidad bancaria. Envíanos el extracto y los siguientes datos\n',
      ...clientInfo,
      ...backQuestion
    ],
    reversion: [
      'Perfecto. Envíanos tu ultimo extracto y explícanos de qué manera tu crédito se ',
      'vio afectado por los alivios por COVID y los siguientes datos\n',
      ...clientInfo,
      ...backQuestion
    ],
    error: ['no puedo reconocer lo que escribes ⚠️']
  }
}

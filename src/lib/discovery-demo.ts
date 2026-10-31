export const ideaQuestions = [
  { label: "Cliente", question: "¿Quién es tu cliente más importante?", answer: "Personas de 26 a 50 años que visitan centros comerciales y llegan en auto." },
  { label: "Problema", question: "¿Qué necesita resolver tu cliente?", answer: "Quisiera encontrar un parqueo rápido al llegar al centro comercial, sin dar vueltas ni empezar mi visita estresado." },
  { label: "Gorila", question: "¿Cómo lo resuelve hoy?", answer: "Doy vueltas, sigo a alguien que parece salir o le pregunto al guardia. A veces termino estacionando lejos de la entrada." },
  { label: "Solución", question: "¿Qué solución tienes en mente?", answer: "Una guía que me muestre dónde hay espacios disponibles cerca de la entrada que necesito." },
  { label: "Diferenciadores", question: "¿Qué sería valioso y distinto?", answer: "Información confiable en el momento, sin descargar una app ni usar el celular mientras conduzco." },
  { label: "Nombre", question: "¿Cómo llamaremos a esta oportunidad?", answer: "Encontrar parqueo sin dar vueltas" },
];

export const interviewQuestions = [
  { question: "Cuéntame la última vez que buscaste parqueo en un centro comercial.", answer: "El sábado llegué a las 5 con mi hija. Teníamos una función de cine a las 5:30. Entré por donde siempre y casi todo estaba ocupado." },
  { question: "¿Qué hiciste desde que entraste hasta que estacionaste?", answer: "Recorrí dos pasillos. Seguí a una familia pensando que salía, pero solo iba a guardar bolsas. Después le pregunté a un guardia y me mandó al siguiente nivel." },
  { question: "¿En qué momento se volvió difícil?", answer: "En la segunda vuelta. No sabía si seguir buscando o cambiar de piso. Mi hija preguntaba si llegaríamos tarde y yo miraba el reloj." },
  { question: "¿Cómo terminaste resolviéndolo?", answer: "Encontré un espacio al fondo del segundo nivel después de unos 12 minutos. Caminamos bastante y llegamos cuando empezaban los anuncios." },
  { question: "¿Qué consecuencias tuvo para ti?", answer: "Entré estresada y no compramos nada antes del cine. Pensé que la próxima vez iríamos a otro centro comercial o más temprano." },
  { question: "¿Qué habías probado antes y qué pasó?", answer: "He seguido los letreros de espacios libres, pero una vez decía que había lugar y no encontré ninguno. Ahora no me fío mucho de esos números." },
];

export const initialOutcome = "Aumentar la proporción de visitantes que estacionan en menos de 5 minutos, sin usar el celular al conducir.";
export const initialPersona = {
  name: "Valeria · visitante con el tiempo justo",
  context: "36 años. Visita el centro comercial con su hija los fines de semana. Se desplaza en auto y suele tener un horario que cumplir.",
  goal: "Llegar a su actividad tranquila, con tiempo y cerca de la entrada correcta.",
  struggle: "No sabe dónde buscar y desconfía de la disponibilidad anunciada.",
};
export const initialJourney = [
  { stage: "Llegar", action: "Entra por el acceso habitual", pain: "No sabe qué nivel conviene", feeling: "Con prisa", opportunity: "Elegir por dónde empezar a buscar" },
  { stage: "Buscar", action: "Recorre pasillos y sigue a otros", pain: "Da vueltas sin información confiable", feeling: "Frustrada", opportunity: "Saber dónde hay un espacio realmente libre" },
  { stage: "Estacionar", action: "Acepta un espacio al fondo", pain: "Queda lejos de su destino", feeling: "Aliviada", opportunity: "Encontrar un lugar adecuado a su visita" },
  { stage: "Llegar a destino", action: "Camina rápido hasta el cine", pain: "Llega apurada y cambia sus planes", feeling: "Estresada", opportunity: "Llegar a su actividad a tiempo" },
];
export const initialOpportunities = [
  { id: "orient", parent: "Llegar", title: "Quiero saber en qué nivel empezar a buscar", signal: "Entré por donde siempre y casi todo estaba ocupado." },
  { id: "trust", parent: "Buscar", title: "Necesito confiar en que el espacio está realmente libre", signal: "Decía que había lugar y no encontré ninguno." },
  { id: "circles", parent: "Buscar", title: "Quiero dejar de dar vueltas sin saber adónde ir", signal: "No sabía si seguir buscando o cambiar de piso." },
  { id: "near", parent: "Estacionar", title: "Quiero estacionar cerca de la entrada que necesito", signal: "Caminamos bastante y llegamos cuando empezaban los anuncios." },
];
export const initialSolutions = [
  { title: "Señales por pasillo, con disponibilidad confiable", detail: "Orientación visible desde el auto, sin descargar nada.", risk: "La disponibilidad puede quedar desactualizada.", test: "Simular señales con un operador que confirme espacios en tiempo real." },
  { title: "Orientador en el acceso", detail: "Una persona indica nivel y pasillo según el destino.", risk: "La recomendación puede no seguir disponible al llegar.", test: "Probar orientación manual con visitantes y medir vueltas y tiempo." },
  { title: "Indicadores visibles sobre cada espacio", detail: "Identificar un espacio libre desde lejos.", risk: "La señal podría no verse al entrar al pasillo.", test: "Probar indicadores temporales en un solo pasillo, sin sensores todavía." },
];

export function makeInitialArtifacts(answers: string[], interview: string[]) {
  return {
    title: answers[5]?.trim() || ideaQuestions[5].answer,
    client: answers[0]?.trim() || "Cliente por explorar",
    problem: answers[1]?.trim() || "Problema por explorar",
    outcome: initialOutcome,
    persona: { ...initialPersona },
    opportunities: initialOpportunities.map((item) => ({ ...item })),
    interview: [...interview],
    evidence: "hypothesis" as const,
    realInterviews: 0,
  };
}
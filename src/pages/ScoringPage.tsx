import { useState, useRef, type ReactNode } from "react";
import chakrapool from '../assets/chakrapool.png';


// --- Interfaces de apoyo ---

interface Productor {
  nombre: string;
  dni: string;
  edad: number;
  localidad: string;
  cultivo: string;
  ha_declaradas: number;
  ha_verificadas: number;
  discrepancia: number;
  tenencia: string;
  riego: string;
  anos: number;
  comprador: string;
}

interface Campana {
  c: string; // Nombre de la campaña (ej: "2024A")
  prod: number; // Producción
  zona: number; // Promedio zona
  res: "Bueno" | "Regular" | "Malo";
  ev: string | null; // Evento climático
}

interface Predio {
  k: string; // Key: tipo de característica
  v: string; // Value: descripción
  r: "Bajo" | "Medio" | "Alto"; // Riesgo
}

interface Costos {
  [key: string]: number; // Permite nombres de costos dinámicos
}

interface Flujo {
  base: {
    precio: number;
    rend: number;
    ha: number;
    ingresos: number;
    costos: Costos;
    total_c: number;
    margen: number;
  };
  estres: {
    precio: number;
    rend: number;
    margen: number;
  };
}

interface Deuda {
  vigente: {
    entidad: string;
    monto: number;
  } | { entidad: "Sin deuda vigente"; monto: 0 };
  solicitado: number;
  total: number;
  margen: number;
  ratio: number;
  min: number;
}

interface Credito {
  e: string; // Entidad
  m: number; // Monto
  p: string; // Plazo/Periodo
  s: string; // Estado/Status
  mora: number;
  mes?: string; // Opcional para registros históricos
}

interface Garantia {
  b: string; // Bien
  leg: string; // Estado legal
  val: number | null; // Valoración
  ej: boolean | "parcial"; // Ejecutable
}

interface Clima {
  indice: "Bajo" | "Medio" | "Medio-alto" | "Alto";
  nino_pct: number;
  heladas: number;
  inundaciones: number;
  seguro: boolean;
}

interface Impacto {
  esc: string; // Escenario
  perdida: number;
  cob: number; // Cobertura
  estado: "EXCELENTE" | "ACEPTABLE" | "RIESGO" | "CRÍTICO" | "INCOBRABLE";
}

interface Social {
  dep: number;
  hijos: number;
  ing_alt: string;
  gastos: number;
  sis: boolean;
  asoc: string;
}

interface RadarItem {
  e: string; // Eje
  v: number; // Valor (usualmente 1-10)
}

interface Alerta {
  t: string; // Título
  d: string; // Descripción
}

interface ScoreDetail {
  d: string; // Dimensión
  p: number; // Peso
  s: number; // Score
}

// --- Interface Principal para un Perfil ---

interface ProfileData {
  productor: Productor;
  campanas: Campana[];
  predio: Predio[];
  flujo: Flujo;
  deuda: Deuda;
  timeline: number[];
  tl_labels: string[];
  creditos: Credito[];
  garantias: Garantia[];
  precios: number[];
  p_eq: number; // Precio de equilibrio
  clima: Clima;
  impacto: Impacto[];
  social: Social;
  radar: RadarItem[];
  alertas_r: Alerta[]; // Alertas Rojas/Riesgo
  alertas_a: Alerta[]; // Alertas Amarillas/Atención
  positivos: Alerta[];
  scores: ScoreDetail[];
  score: number;
  decision: "Aprobación Directa" | "Aprobación Preferencial" | "Aprobación Condicionada" | "Aprobación con Condiciones" | "Rechazo Recomendado";
  zona: string;
  condiciones: string[];
}

// --- Tipado de los Objetos Raíz ---

export type ProfilesMap = {
  [dni: string]: ProfileData;
};

export interface Suggestion {
  dni: string;
  sub: string;
}
// ─────────────────────────────────────────────
// MOCK DATA POOL — 3 perfiles distintos
// ─────────────────────────────────────────────
const PROFILES :ProfilesMap = {
  "10234567": {
    productor: {
      nombre: "Juan Quispe Mamani", dni: "10234567", edad: 48,
      localidad: "Valle de Virú, La Libertad", cultivo: "Espárrago verde",
      ha_declaradas: 3.2, ha_verificadas: 2.9, discrepancia: -9,
      tenencia: "Posesionario sin título", riego: "Tecnificado (goteo propio)",
      anos: 7, comprador: "Camposol S.A.",
    },
    campanas: [
      { c: "2019", prod: 8.8, zona: 9.1, res: "Bueno", ev: null },
      { c: "2020", prod: 9.2, zona: 9.0, res: "Bueno", ev: null },
      { c: "2021", prod: 7.9, zona: 9.1, res: "Regular", ev: null },
      { c: "2022", prod: 5.2, zona: 8.8, res: "Malo", ev: "El Niño" },
      { c: "2023", prod: 8.7, zona: 9.1, res: "Bueno", ev: null },
      { c: "2024A", prod: 8.4, zona: 9.1, res: "Bueno", ev: null },
      { c: "2024B", prod: 7.1, zona: 9.0, res: "Regular", ev: null },
    ],
    predio: [
      { k: "Acceso a riego", v: "Tecnificado (goteo propio)", r: "Bajo" },
      { k: "Calidad de suelo", v: "Franco arenoso, pH 7.1", r: "Bajo" },
      { k: "Acceso vial", v: "Afirmado — riesgo en lluvias", r: "Medio" },
      { k: "Tenencia", v: "Posesionario sin título", r: "Alto" },
    ],
    flujo: {
      base: { precio: 1.90, rend: 8.4, ha: 2.9, ingresos: 46284, costos: { Insumos: 11400, "Mano de obra": 8600, "Agua/riego": 2800, Transporte: 2200, Otros: 3200 }, total_c: 28200, margen: 18084 },
      estres: { precio: 1.52, rend: 7.0, margen: 2800 },
    },
    deuda: { vigente: { entidad: "Caja Trujillo", monto: 8500 }, solicitado: 12000, total: 20500, margen: 18084, ratio: 0.88, min: 1.3 },
    timeline: [-1,-1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
    tl_labels: ["May23","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene24","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene25","Feb","Mar","Abr"],
    creditos: [
      { e: "Caja Trujillo", m: 15000, p: "12 meses", s: "Cancelado a tiempo", mora: 0 },
      { e: "Agrobanco", m: 8000, p: "9 meses", s: "Cancelado — 1 mora", mora: 34, mes: "may-23" },
      { e: "Caja Trujillo", m: 8500, p: "9 meses", s: "Vigente — Normal", mora: 0 },
    ],
    garantias: [
      { b: "Predio agrícola (2.9 ha)", leg: "Posesionario sin título", val: null, ej: false },
      { b: "Casa familiar", leg: "Sin inscripción SUNARP", val: null, ej: false },
      { b: "Cosecha en pie (warrant)", leg: "Sin formalizar", val: 46000, ej: "parcial" },
      { b: "Contrato Camposol", leg: "Vigente 2025A", val: null, ej: "parcial" },
    ],
    precios: [1.85,1.60,1.20,0.95,1.10,1.45,1.70,1.95,2.05,1.88,1.75,1.65,1.55,1.50,1.62,1.80,2.10,2.20,1.90,1.75,1.68,1.72,1.85,1.92,1.88,1.78,1.65,1.70,1.82,1.95,2.00,1.90,1.85,1.72,1.68,1.75],
    p_eq: 1.47,
    clima: { indice: "Medio-alto", nino_pct: 42, heladas: 0, inundaciones: 1, seguro: false },
    impacto: [
      { esc: "Sin evento climático", perdida: 0, cob: 0.88, estado: "RIESGO" },
      { esc: "El Niño leve (−20% rdto)", perdida: 9257, cob: 0.42, estado: "CRÍTICO" },
      { esc: "Pérdida total de cosecha", perdida: 18084, cob: 0, estado: "INCOBRABLE" },
    ],
    social: { dep: 5, hijos: 3, ing_alt: "Escasos — esposa: jornal eventual", gastos: 1200, sis: true, asoc: "Asoc. Productores Virú" },
    radar: [{ e: "Estabilidad familiar", v: 6 },{ e: "Ingresos alternativos", v: 3 },{ e: "Red asociativa", v: 8 },{ e: "Servicios básicos", v: 7 },{ e: "Historial comunidad", v: 8 },{ e: "Capacitación", v: 9 }],
    alertas_r: [
      { t: "Garantía Nula", d: "Predio posesionario sin título SUNARP. Sin colateral ejecutable en default." },
      { t: "Sobreendeudamiento", d: "Deuda total S/ 20,500 = 107% del margen neto. Ratio 0.88x < mínimo 1.3x." },
      { t: "Sin Seguro Agrícola", d: "42% de probabilidad El Niño en campaña vigente. Condición de desembolso incumplida." },
      { t: "Discrepancia Declarativa", d: "Declaró 3.2 ha, verificadas 2.9 ha (−9%). Aforo de ingresos sobredimensionado." },
    ],
    alertas_a: [
      { t: "Concentración comprador", d: "80% producción a Camposol. Colapso de flujo si relación comercial se interrumpe." },
      { t: "Rendimiento bajo promedio", d: "8.4 vs 9.1 t/ha zonal (−8%). Verificar manejo técnico." },
      { t: "Sin diversificación de ingresos", d: "Subsistencia y pago del crédito dependen de la misma fuente agrícola." },
    ],
    positivos: [
      { t: "Contrato de venta vigente", d: "Camposol garantiza 80% del ingreso con precio fijo para campaña 2025A." },
      { t: "Historial crediticio limpio", d: "11/12 cuotas al día. Única mora correlaciona con retraso del comprador." },
      { t: "7 años de experiencia", d: "Mismo predio, mismo cultivo. Relaciones comerciales establecidas." },
      { t: "Riego tecnificado propio", d: "Independiente de canales comunales. Reduce vulnerabilidad hídrica." },
    ],
    scores: [
      { d: "Capacidad Productiva", p: 15, s: 71 },
      { d: "Capacidad de Pago", p: 25, s: 52 },
      { d: "Voluntad de Pago", p: 20, s: 78 },
      { d: "Garantías Reales", p: 15, s: 22 },
      { d: "Riesgo de Mercado", p: 10, s: 64 },
      { d: "Riesgo Climático", p: 10, s: 55 },
      { d: "Entorno Social", p: 5, s: 68 },
    ],
    score: 672, decision: "Aprobación Condicionada", zona: "600–750 · Revisión manual obligatoria",
    condiciones: [
      "Contratar seguro agrícola verificado antes del desembolso (no negociable).",
      "Reducir monto aprobado a S/ 8,000 para alcanzar ratio de cobertura 1.12x.",
      "Cesión de derechos sobre contrato Camposol como garantía operativa.",
      "Cronograma de pagos alineado a fecha de cobro del comprador.",
      "Visita de campo de confirmación con actualización del Bloque 10.",
    ],
  },

  "20345678": {
    productor: {
      nombre: "María Condori Flores", dni: "20345678", edad: 42,
      localidad: "Ayaviri, Puno", cultivo: "Quinua ecológica",
      ha_declaradas: 4.5, ha_verificadas: 4.5, discrepancia: 0,
      tenencia: "Título inscrito en SUNARP", riego: "Secano (lluvia natural)",
      anos: 12, comprador: "Exportadora Andina SAC",
    },
    campanas: [
      { c: "2019", prod: 1.8, zona: 1.6, res: "Bueno", ev: null },
      { c: "2020", prod: 2.0, zona: 1.7, res: "Bueno", ev: null },
      { c: "2021", prod: 1.5, zona: 1.6, res: "Regular", ev: null },
      { c: "2022", prod: 0.8, zona: 1.5, res: "Malo", ev: "Sequía" },
      { c: "2023", prod: 2.1, zona: 1.8, res: "Bueno", ev: null },
      { c: "2024A", prod: 2.2, zona: 1.8, res: "Bueno", ev: null },
    ],
    predio: [
      { k: "Acceso a riego", v: "Secano — dependiente de lluvias", r: "Alto" },
      { k: "Calidad de suelo", v: "Altiplánico, pH 6.8, apto quinua", r: "Bajo" },
      { k: "Acceso vial", v: "Asfaltado hasta la comunidad", r: "Bajo" },
      { k: "Tenencia", v: "Título inscrito SUNARP", r: "Bajo" },
    ],
    flujo: {
      base: { precio: 5.10, rend: 2.2, ha: 4.5, ingresos: 50490, costos: { Insumos: 8200, "Mano de obra": 12400, Transporte: 3100, Certificación: 4200, Otros: 2100 }, total_c: 30000, margen: 20490 },
      estres: { precio: 4.08, rend: 1.8, margen: 2832 },
    },
    deuda: { vigente: { entidad: "Caja Cusco", monto: 4500 }, solicitado: 15000, total: 19500, margen: 20490, ratio: 1.05, min: 1.3 },
    timeline: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    tl_labels: ["May23","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene24","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene25","Feb","Mar","Abr"],
    creditos: [
      { e: "Agrobanco", m: 10000, p: "12 meses", s: "Cancelado a tiempo", mora: 0 },
      { e: "Caja Cusco", m: 4500, p: "6 meses", s: "Vigente — 1 mora leve", mora: 15, mes: "oct-24" },
    ],
    garantias: [
      { b: "Predio agrícola (4.5 ha)", leg: "Título inscrito SUNARP", val: 38000, ej: true },
      { b: "Casa familiar", leg: "Inscrita SUNARP", val: 22000, ej: true },
      { b: "Contrato Exportadora Andina", leg: "Vigente — certificado orgánico", val: null, ej: "parcial" },
    ],
    precios: [3.80,3.60,3.90,4.20,4.50,4.80,4.20,3.90,4.10,4.50,4.80,5.00,4.60,4.20,4.40,4.80,5.10,5.20,4.90,4.80,5.10,5.30,5.00,4.90,5.10,5.20,4.80,5.00,5.30,5.50,5.20,5.10,4.90,5.00,5.30,5.40],
    p_eq: 3.40,
    clima: { indice: "Alto", nino_pct: 18, heladas: 3, inundaciones: 0, seguro: true },
    impacto: [
      { esc: "Sin evento climático", perdida: 0, cob: 1.05, estado: "ACEPTABLE" },
      { esc: "Sequía moderada (−20%)", perdida: 8196, cob: 0.62, estado: "RIESGO" },
      { esc: "Pérdida total (helada)", perdida: 20490, cob: 0, estado: "INCOBRABLE" },
    ],
    social: { dep: 3, hijos: 1, ing_alt: "Esposo: comercio textil S/ 800/mes", gastos: 950, sis: true, asoc: "Coop. Quinua Puno" },
    radar: [{ e: "Estabilidad familiar", v: 8 },{ e: "Ingresos alternativos", v: 7 },{ e: "Red asociativa", v: 9 },{ e: "Servicios básicos", v: 6 },{ e: "Historial comunidad", v: 9 },{ e: "Capacitación", v: 8 }],
    alertas_r: [
      { t: "Ratio de cobertura insuficiente", d: "Deuda total S/ 19,500. Ratio 1.05x aún por debajo del mínimo institucional de 1.3x." },
      { t: "Dependencia del secano", d: "Sin riego tecnificado. Años de sequía reducen rendimiento hasta 60%." },
    ],
    alertas_a: [
      { t: "Heladas recurrentes", d: "3 eventos en 5 años. El seguro contratado mitiga, pero no elimina el riesgo." },
      { t: "Precio spot con alta variabilidad", d: "Quinua orgánica: precio ±38% según mercado internacional." },
    ],
    positivos: [
      { t: "Título de propiedad inscrito", d: "Garantía real ejecutable de S/ 60,000. Recuperación viable en default." },
      { t: "Seguro agrícola contratado", d: "Cobertura heladas y sequía. Condición de desembolso cumplida." },
      { t: "Certificación orgánica vigente", d: "Premium de precio +40% sobre quinua convencional." },
      { t: "12 años de experiencia", d: "Productora referente en su comunidad. Historial sólido." },
    ],
    scores: [
      { d: "Capacidad Productiva", p: 15, s: 82 },
      { d: "Capacidad de Pago", p: 25, s: 61 },
      { d: "Voluntad de Pago", p: 20, s: 85 },
      { d: "Garantías Reales", p: 15, s: 74 },
      { d: "Riesgo de Mercado", p: 10, s: 58 },
      { d: "Riesgo Climático", p: 10, s: 48 },
      { d: "Entorno Social", p: 5, s: 84 },
    ],
    score: 714, decision: "Aprobación con Condiciones", zona: "650–799 · Aprobación condicionada",
    condiciones: [
      "Verificar renovación del seguro agrícola antes de la próxima campaña.",
      "Presentar contrato actualizado con Exportadora Andina para campaña 2025.",
      "Reducir monto solicitado a S/ 12,000 para lograr ratio de cobertura ≥ 1.3x.",
    ],
  },

  "30456789": {
    productor: {
      nombre: "Pedro Huanca Ticona", dni: "30456789", edad: 35,
      localidad: "Pisac, Cusco", cultivo: "Papa nativa",
      ha_declaradas: 1.8, ha_verificadas: 1.6, discrepancia: -11,
      tenencia: "Posesionario — comunidad campesina", riego: "Canal comunal compartido",
      anos: 3, comprador: "Mercado mayorista Cusco",
    },
    campanas: [
      { c: "2022A", prod: 8.0, zona: 10.5, res: "Regular", ev: null },
      { c: "2022B", prod: 6.5, zona: 10.0, res: "Malo", ev: null },
      { c: "2023A", prod: 9.2, zona: 10.5, res: "Regular", ev: null },
      { c: "2023B", prod: 7.8, zona: 10.0, res: "Regular", ev: null },
      { c: "2024A", prod: 10.5, zona: 10.5, res: "Bueno", ev: null },
      { c: "2024B", prod: 4.2, zona: 9.8, res: "Malo", ev: "Helada" },
    ],
    predio: [
      { k: "Acceso a riego", v: "Canal comunal — turnos 2h/semana", r: "Alto" },
      { k: "Calidad de suelo", v: "Andosol húmico, microclimas variables", r: "Medio" },
      { k: "Acceso vial", v: "Trocha afirmada — sin acceso en lluvia", r: "Alto" },
      { k: "Tenencia", v: "Posesionario comunal", r: "Alto" },
    ],
    flujo: {
      base: { precio: 0.80, rend: 10.5, ha: 1.6, ingresos: 13440, costos: { Insumos: 4800, "Mano de obra": 3200, Transporte: 1400, Agua: 600, Otros: 800 }, total_c: 10800, margen: 2640 },
      estres: { precio: 0.64, rend: 8.4, margen: -2198 },
    },
    deuda: { vigente: { entidad: "Sin deuda vigente", monto: 0 }, solicitado: 5000, total: 5000, margen: 2640, ratio: 0.53, min: 1.3 },
    timeline: [-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,0,0],
    tl_labels: ["May23","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene24","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene25","Feb","Mar","Abr"],
    creditos: [
      { e: "Sin historial formal previo", m: 0, p: "—", s: "Primera solicitud de crédito", mora: 0 },
    ],
    garantias: [
      { b: "Predio comunal (1.6 ha)", leg: "Sin título — posesión comunal", val: null, ej: false },
      { b: "Bienes del hogar", leg: "Sin inscripción", val: null, ej: false },
    ],
    precios: [0.55,0.60,0.65,0.58,0.62,0.70,0.75,0.68,0.60,0.65,0.72,0.80,0.75,0.68,0.70,0.78,0.80,0.72,0.65,0.60,0.58,0.62,0.70,0.75,0.80,0.78,0.72,0.68,0.75,0.80,0.85,0.78,0.72,0.68,0.65,0.70],
    p_eq: 0.67,
    clima: { indice: "Alto", nino_pct: 28, heladas: 4, inundaciones: 0, seguro: false },
    impacto: [
      { esc: "Sin evento climático", perdida: 0, cob: 0.53, estado: "CRÍTICO" },
      { esc: "Helada (−40% rdto)", perdida: 1800, cob: 0, estado: "INCOBRABLE" },
      { esc: "Precio spot mínimo histórico", perdida: 2640, cob: 0, estado: "INCOBRABLE" },
    ],
    social: { dep: 2, hijos: 0, ing_alt: "Jornalero eventual en construcción", gastos: 700, sis: true, asoc: "No pertenece a asociación" },
    radar: [{ e: "Estabilidad familiar", v: 7 },{ e: "Ingresos alternativos", v: 5 },{ e: "Red asociativa", v: 2 },{ e: "Servicios básicos", v: 5 },{ e: "Historial comunidad", v: 4 },{ e: "Capacitación", v: 3 }],
    alertas_r: [
      { t: "Flujo negativo en estrés", d: "En escenario −20%, margen es −S/ 2,198. La deuda supera completamente al ingreso." },
      { t: "Ratio de cobertura crítico", d: "Ratio 0.53x. El margen neto cubre solo la mitad de la deuda solicitada." },
      { t: "Garantía nula", d: "Predio comunal sin título. Ningún bien ejecutable. Pérdida total en default." },
      { t: "Sin seguro agrícola", d: "Zona con 4 eventos de helada en 5 años. Riesgo climático sin ninguna cobertura." },
      { t: "Discrepancia de superficie", d: "Declaró 1.8 ha, verificadas 1.6 ha (−11%). Supera umbral de alerta del 10%." },
    ],
    alertas_a: [
      { t: "Escasa experiencia", d: "Solo 3 años en el predio. Historial productivo insuficiente para proyección confiable." },
      { t: "Sin red asociativa", d: "No pertenece a asociación. Sin asistencia técnica grupal ni mercados alternativos." },
      { t: "Dependencia canal comunal", d: "Acceso al agua por turnos. Conflictos posibles en época seca." },
    ],
    positivos: [
      { t: "Sin deuda vigente", d: "Primera solicitud. Partida limpia sin compromisos financieros previos." },
      { t: "Ciclo 2024A alcanzó promedio zonal", d: "10.5 t/ha. Potencial técnico demostrado en condiciones favorables." },
    ],
    scores: [
      { d: "Capacidad Productiva", p: 15, s: 44 },
      { d: "Capacidad de Pago", p: 25, s: 28 },
      { d: "Voluntad de Pago", p: 20, s: 52 },
      { d: "Garantías Reales", p: 15, s: 8 },
      { d: "Riesgo de Mercado", p: 10, s: 38 },
      { d: "Riesgo Climático", p: 10, s: 25 },
      { d: "Entorno Social", p: 5, s: 41 },
    ],
    score: 352, decision: "Rechazo Recomendado", zona: "350–499 · Solo excepciones con garantía real",
    condiciones: [
      "No cumple condiciones mínimas de aprobación con el monto solicitado.",
      "Posible reconsideración en siguiente campaña si mejora ratio de cobertura.",
      "Recomendamos programa de inclusión financiera con microcrédito asistido previo.",
    ],
  },

  "40567890": {
    productor: {
      nombre: "Ricardo Vilela García", dni: "40567890", edad: 52,
      localidad: "Tambogrande, Piura", cultivo: "Mango Kent (Exportación)",
      ha_declaradas: 8.5, ha_verificadas: 8.5, discrepancia: 0,
      tenencia: "Título inscrito en SUNARP", riego: "Tecnificado (microaspersión)",
      anos: 20, comprador: "Sunshine Export SAC / Mercado Local",
    },
    campanas: [
      { c: "2020", prod: 18.5, zona: 16.2, res: "Bueno", ev: null },
      { c: "2021", prod: 19.1, zona: 16.5, res: "Bueno", ev: null },
      { c: "2022", prod: 17.8, zona: 16.0, res: "Bueno", ev: null },
      { c: "2023", prod: 12.4, zona: 9.5, res: "Regular", ev: "El Niño Fuerte" },
      { c: "2024A", prod: 19.5, zona: 16.8, res: "Bueno", ev: null },
    ],
    predio: [
      { k: "Acceso a riego", v: "Reservorio propio y pozo", r: "Bajo" },
      { k: "Calidad de suelo", v: "Franco, excelente drenaje", r: "Bajo" },
      { k: "Acceso vial", v: "Asfaltado a pie de parcela", r: "Bajo" },
      { k: "Tenencia", v: "Título inscrito SUNARP", r: "Bajo" },
    ],
    flujo: {
      base: { precio: 2.40, rend: 19.2, ha: 8.5, ingresos: 391680, costos: { Insumos: 82000, "Mano de obra": 94000, Certificaciones: 12000, "Mantenimiento Riego": 15000, Otros: 28000 }, total_c: 231000, margen: 160680 },
      estres: { precio: 1.80, rend: 14.5, margen: 45000 },
    },
    deuda: { vigente: { entidad: "BCP", monto: 45000 }, solicitado: 80000, total: 125000, margen: 160680, ratio: 1.28, min: 1.3 },
    timeline: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    tl_labels: ["May23","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene24","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene25","Feb","Mar","Abr"],
    creditos: [
      { e: "BCP", m: 120000, p: "24 meses", s: "Cancelado", mora: 0 },
      { e: "Caja Piura", m: 60000, p: "12 meses", s: "Cancelado", mora: 0 },
    ],
    garantias: [
      { b: "Fundo El Olivar (8.5 ha)", leg: "Título SUNARP", val: 450000, ej: true },
      { b: "Picking House / Almacén", leg: "Inscrito", val: 85000, ej: true },
    ],
    precios: [2.1, 2.3, 2.5, 2.2, 1.9, 2.4, 2.6, 2.8, 2.5, 2.3, 2.4, 2.5], 
    p_eq: 1.45,
    clima: { indice: "Bajo", nino_pct: 15, heladas: 0, inundaciones: 0, seguro: true },
    impacto: [
      { esc: "Sin evento", perdida: 0, cob: 1.28, estado: "EXCELENTE" },
      { esc: "El Niño Moderado", perdida: 35000, cob: 1.02, estado: "ACEPTABLE" },
    ],
    social: { dep: 2, hijos: 2, ing_alt: "Alquiler de maquinaria agrícola", gastos: 4500, sis: false, asoc: "APEM (Mangos Perú)" },
    radar: [{ e: "Estabilidad familiar", v: 9 },{ e: "Ingresos alternativos", v: 8 },{ e: "Red asociativa", v: 10 },{ e: "Servicios básicos", v: 9 },{ e: "Historial comunidad", v: 10 },{ e: "Capacitación", v: 10 }],
    alertas_r: [],
    alertas_a: [
      { t: "Carga financiera", d: "El monto solicitado es alto, aunque respaldado por patrimonio." }
    ],
    positivos: [
      { t: "Garantía Real 4x1", d: "Patrimonio inmobiliario cubre 4 veces el crédito solicitado." },
      { t: "Resiliencia demostrada", d: "Superó El Niño 2023 con rendimientos superiores al promedio zonal." },
      { t: "Certificación Global GAP", d: "Acceso directo a mercados europeos con mejores precios." }
    ],
    scores: [
      { d: "Capacidad Productiva", p: 15, s: 95 },
      { d: "Capacidad de Pago", p: 25, s: 88 },
      { d: "Voluntad de Pago", p: 20, s: 98 },
      { d: "Garantías Reales", p: 15, s: 95 },
      { d: "Riesgo de Mercado", p: 10, s: 85 },
      { d: "Riesgo Climático", p: 10, s: 80 },
      { d: "Entorno Social", p: 5, s: 92 },
    ],
    score: 912, decision: "Aprobación Preferencial", zona: "850–1000 · Cliente VIP",
    condiciones: ["Desembolso inmediato.", "Tasa preferencial por historial impecable."],
  },

  // CASO 5: LA COOPERATIVA CAFETERA (JAÉN)
  "50678901": {
    productor: {
      nombre: "Elena Pardo Huamán", dni: "50678901", edad: 39,
      localidad: "Jaén, Cajamarca", cultivo: "Café Especial (Caturra/Geisha)",
      ha_declaradas: 5.0, ha_verificadas: 5.0, discrepancia: 0,
      tenencia: "Título inscrito en SUNARP", riego: "Gravedad (canal revestido)",
      anos: 15, comprador: "Cooperativa Sol & Café (Comercio Justo)",
    },
    campanas: [
      { c: "2021", prod: 2.8, zona: 2.2, res: "Bueno", ev: null },
      { c: "2022", prod: 2.9, zona: 2.1, res: "Bueno", ev: null },
      { c: "2023", prod: 2.6, zona: 2.0, res: "Bueno", ev: null },
      { c: "2024", prod: 3.1, zona: 2.3, res: "Bueno", ev: null },
    ],
    predio: [
      { k: "Acceso a riego", v: "Canal permanente", r: "Bajo" },
      { k: "Calidad de suelo", v: "Andosol rico en materia orgánica", r: "Bajo" },
      { k: "Tenencia", v: "Título SUNARP", r: "Bajo" },
    ],
    flujo: {
      base: { precio: 9.50, rend: 3.0, ha: 5.0, ingresos: 142500, costos: { Insumos: 22000, "Mano de obra": 45000, Certificaciones: 5000, Transporte: 8000, Otros: 12000 }, total_c: 92000, margen: 50500 },
      estres: { precio: 7.20, rend: 2.4, margen: 12000 },
    },
    deuda: { vigente: { entidad: "Sin deuda", monto: 0 }, solicitado: 35000, total: 35000, margen: 50500, ratio: 1.44, min: 1.3 },
    timeline: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    tl_labels: ["May23","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene24","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene25","Feb","Mar","Abr"],
    creditos: [{ e: "Agrobanco", m: 25000, p: "12 meses", s: "Cancelado", mora: 0 }],
    garantias: [{ b: "Predio 'La Esperanza' (5 ha)", leg: "Título SUNARP", val: 120000, ej: true }],
    precios: [8.5, 8.8, 9.2, 9.5, 9.8, 10.2, 9.5, 9.0], 
    p_eq: 6.10,
    clima: { indice: "Bajo", nino_pct: 10, heladas: 0, inundaciones: 0, seguro: true },
    impacto: [{ esc: "Sin evento", perdida: 0, cob: 1.44, estado: "EXCELENTE" }],
    social: { dep: 3, hijos: 2, ing_alt: "Venta de animales menores", gastos: 1800, sis: true, asoc: "Coop. Sol & Café" },
    radar: [{ e: "Estabilidad familiar", v: 10 },{ e: "Ingresos alternativos", v: 6 },{ e: "Red asociativa", v: 10 },{ e: "Servicios básicos", v: 8 },{ e: "Historial comunidad", v: 9 },{ e: "Capacitación", v: 9 }],
    alertas_r: [],
    alertas_a: [],
    positivos: [
      { t: "Precio diferenciado", d: "Pertenece a nicho de café especial con precio base 40% arriba del mercado." },
      { t: "Garantía Cooperativa", d: "La cooperativa actúa como garante solidario indirecto y canalizador del pago." }
    ],
    scores: [
      { d: "Capacidad Productiva", p: 15, s: 89 },
      { d: "Capacidad de Pago", p: 25, s: 82 },
      { d: "Voluntad de Pago", p: 20, s: 94 },
      { d: "Garantías Reales", p: 15, s: 80 },
      { d: "Riesgo de Mercado", p: 10, s: 90 },
      { d: "Riesgo Climático", p: 10, s: 85 },
      { d: "Entorno Social", p: 5, s: 95 },
    ],
    score: 868, decision: "Aprobación Directa", zona: "800–1000 · Score Alto",
    condiciones: ["Ninguna. Cliente apto para incremento de línea futuro."],
  },

  // CASO 6: EL EMPRENDEDOR TECNIFICADO (ICA)
  "60789012": {
    productor: {
      nombre: "Luis Alberto Rojas", dni: "60789012", edad: 31,
      localidad: "Pisco, Ica", cultivo: "Uva de Mesa (Red Globe)",
      ha_declaradas: 4.0, ha_verificadas: 4.0, discrepancia: 0,
      tenencia: "Título inscrito en SUNARP", riego: "Goteo automatizado",
      anos: 6, comprador: "Ica Fruit SAC",
    },
    campanas: [
      { c: "2021", prod: 25.0, zona: 22.1, res: "Bueno", ev: null },
      { c: "2022", prod: 26.5, zona: 22.5, res: "Bueno", ev: null },
      { c: "2023", prod: 24.8, zona: 21.8, res: "Bueno", ev: null },
      { c: "2024", prod: 27.2, zona: 23.0, res: "Bueno", ev: null },
    ],
    predio: [
      { k: "Acceso a riego", v: "Pozo propio con licencia ANA", r: "Bajo" },
      { k: "Tenencia", v: "Título SUNARP", r: "Bajo" },
      { k: "Acceso vial", v: "Carretera asfaltada", r: "Bajo" },
    ],
    flujo: {
      base: { precio: 3.50, rend: 26.0, ha: 4.0, ingresos: 364000, costos: { Insumos: 65000, "Mano de obra": 110000, Energía: 12000, Transporte: 15000, Otros: 20000 }, total_c: 222000, margen: 142000 },
      estres: { precio: 2.80, rend: 21.0, margen: 35000 },
    },
    deuda: { vigente: { entidad: "Caja Ica", monto: 12000 }, solicitado: 60000, total: 72000, margen: 142000, ratio: 1.97, min: 1.3 },
    timeline: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    tl_labels: ["May23","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene24","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic","Ene25","Feb","Mar","Abr"],
    creditos: [{ e: "Caja Ica", m: 40000, p: "12 meses", s: "Cancelado", mora: 0 }],
    garantias: [{ b: "Fundo San Luis (4 ha)", leg: "Título SUNARP", val: 320000, ej: true }],
    precios: [3.2, 3.4, 3.5, 3.7, 3.6, 3.5], 
    p_eq: 2.15,
    clima: { indice: "Bajo", nino_pct: 5, heladas: 0, inundaciones: 0, seguro: true },
    impacto: [{ esc: "Sin evento", perdida: 0, cob: 1.97, estado: "EXCELENTE" }],
    social: { dep: 2, hijos: 1, ing_alt: "Esposa: Contadora S/ 3,500/mes", gastos: 3500, sis: false, asoc: "Asoc. Regantes Pisco" },
    radar: [{ e: "Estabilidad familiar", v: 9 },{ e: "Ingresos alternativos", v: 9 },{ e: "Red asociativa", v: 8 },{ e: "Servicios básicos", v: 10 },{ e: "Historial comunidad", v: 9 },{ e: "Capacitación", v: 10 }],
    alertas_r: [],
    alertas_a: [],
    positivos: [
      { t: "Ratio de Cobertura TOP", d: "El margen neto es casi el doble de la deuda total. Solvencia excepcional." },
      { t: "Licencia de Agua vigente", d: "Seguridad hídrica legal y técnica garantizada por pozo propio." }
    ],
    scores: [
      { d: "Capacidad Productiva", p: 15, s: 92 },
      { d: "Capacidad de Pago", p: 25, s: 95 },
      { d: "Voluntad de Pago", p: 20, s: 90 },
      { d: "Garantías Reales", p: 15, s: 88 },
      { d: "Riesgo de Mercado", p: 10, s: 82 },
      { d: "Riesgo Climático", p: 10, s: 90 },
      { d: "Entorno Social", p: 5, s: 92 },
    ],
    score: 905, decision: "Aprobación Directa", zona: "850–1000 · Cliente Triple A",
    condiciones: ["Firma de contrato de mutuo estándar. Sin retenciones adicionales."],
  },
};
const SUGGESTIONS : Suggestion[] = [
  { dni: "10234567", sub: "Espárrago · Virú, La Libertad" },
  { dni: "20345678", sub: "Quinua · Ayaviri, Puno" },
  { dni: "30456789", sub: "Papa nativa · Pisac, Cusco" },
  { dni: "40567890", sub: "Mango Kent · Tambogrande, Piura" },
  { dni: "50678901", sub: "Café Especial · Jaén, Cajamarca" },
  { dni: "60789012", sub: "Uva de Mesa · Pisco, Ica" },
];

// Tipo para los niveles de riesgo (usado en riskPill)
type RiskLevel = "Bajo" | "Medio" | "Alto";
const S = (n: number) => `S/ ${Number(n).toLocaleString("es-PE")}`;

const decisionMeta = (dec: string) => {
  if (dec.includes("Rechazo")) return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", pill: "bg-red-100 text-red-800 ring-1 ring-red-300", dot: "#dc2626" };
  if (dec.includes("Condiciona") || dec.includes("Condicion")) return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", pill: "bg-amber-100 text-amber-800 ring-1 ring-amber-300", dot: "#d97706" };
  return { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", pill: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300", dot: "#059669" };
};

const riskPill = (r: RiskLevel) => ({ Bajo: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200", Medio: "bg-amber-100 text-amber-800 ring-1 ring-amber-200", Alto: "bg-red-100 text-red-800 ring-1 ring-red-200" }[r] || "");
const scoreColor = (s: number) => s >= 70 ? "#059669" : s >= 50 ? "#d97706" : "#dc2626";

// ─── CHARTS ──────────────────────────────────
// Datos de producción para BarChart
interface CampanaData {
  c: string;    // Campaña (ej. "2024A")
  prod: number; // Producción del productor
  zona: number; // Promedio de la zona
  res: "Bueno" | "Regular" | "Malo";
  ev: string | null; // Evento climático
}
function BarChart({ data }: { data: CampanaData[] }) {
  const W=520,H=200,pL=44,pB=38,pT=14,pR=12;
  const cW=W-pL-pR, cH=H-pB-pT;
  const allVals=[...data.map(d=>d.prod),...data.map(d=>d.zona)];
  const maxV=Math.ceil(Math.max(...allVals)*1.15);
  const gap=cW/data.length, bw=gap*0.42;
  const rc=(r: string)=>r==="Bueno"?"#059669":r==="Regular"?"#d97706":"#dc2626";
  const yS=(v: number)=>pT+cH-(v/maxV)*cH;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[0,Math.round(maxV*0.33),Math.round(maxV*0.67),maxV].map(v=>{
        const y=yS(v);
        return <g key={v}><line x1={pL} y1={y} x2={W-pR} y2={y} stroke="#f1f5f9" strokeWidth="1"/><text x={pL-6} y={y+4} textAnchor="end" fill="#94a3b8" fontSize="10">{v}</text></g>;
      })}
      {data.map((d,i)=>{
        const cx=pL+i*gap+gap*0.5;
        const bh=(d.prod/maxV)*cH, y=yS(d.prod);
        const zy=yS(d.zona);
        const zxN=i<data.length-1?pL+(i+1)*gap+gap*0.5:undefined;
        const zyN=i<data.length-1?yS(data[i+1].zona):undefined;
        return (
          <g key={i}>
            {zxN!==undefined&&<line x1={cx} y1={zy} x2={zxN} y2={zyN} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 3"/>}
            <rect x={cx-bw/2} y={y} width={bw} height={bh} rx="3" fill={rc(d.res)} opacity="0.8"/>
            {d.ev&&<text x={cx} y={y-8} textAnchor="middle" fill="#f59e0b" fontSize="11">⚡</text>}
            <text x={cx} y={H-pB+15} textAnchor="middle" fill="#94a3b8" fontSize="10">{d.c}</text>
            <text x={cx} y={y-(d.ev?20:8)} textAnchor="middle" fill={rc(d.res)} fontSize="9" fontWeight="600">{d.prod}</text>
          </g>
        );
      })}
      <g transform={`translate(${pL+2},${pT+2})`}>
        <rect width="8" height="8" rx="2" fill="#059669" opacity="0.8"/><text x="11" y="8" fill="#94a3b8" fontSize="9">Productor</text>
        <line x1="72" y1="4" x2="88" y2="4" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 3"/><text x="91" y="8" fill="#94a3b8" fontSize="9">Zonal</text>
      </g>
    </svg>
  );
}

// Datos financieros para WaterfallChart
interface FlujoFinanciero {
  base: {
    ingresos: number;
    costos: { [key: string]: number };
    margen: number;
  };
}
function WaterfallChart({ f }: { f: FlujoFinanciero }) {
  const W=520,H=210,pL=58,pB=38,pT=14,pR=12;
  const cW=W-pL-pR, cH=H-pB-pT;
  const maxV=f.base.ingresos*1.08;
  const items=[{l:"Ingresos",v:f.base.ingresos,t:"pos"},...Object.entries(f.base.costos).map(([k,v])=>({l:k.split("/")[0].split(" ")[0],v:-v,t:"neg"})),{l:"Margen",v:f.base.margen,t:"total"}];
  const gap=cW/items.length, bw=gap*0.5;
  let run=0;
  const bars=items.map((it,i)=>{
    const isT=it.t==="total";
    const start=isT?0:run;
    const barH=Math.abs(it.v)/maxV*cH;
    const barTop=pT+cH-Math.max(start+it.v,start)/maxV*cH;
    if(!isT) run+=it.v;
    return {...it,barTop,barH,cx:pL+i*gap+gap*0.5};
  });
  const mY=pT+cH-(f.base.margen/maxV)*cH;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[0,0.25,0.5,0.75,1].map(frac=>{
        const v=frac*maxV, y=pT+cH-frac*cH;
        return <g key={frac}><line x1={pL} y1={y} x2={W-pR} y2={y} stroke="#f1f5f9" strokeWidth="1"/><text x={pL-4} y={y+4} textAnchor="end" fill="#94a3b8" fontSize="9">{(v/1000).toFixed(0)}k</text></g>;
      })}
      <line x1={pL} y1={mY} x2={W-pR} y2={mY} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5"/>
      {bars.map((b,i)=>{
        const color=b.t==="pos"?"#059669":b.t==="neg"?"#f87171":"#2563eb";
        return (
          <g key={i}>
            <rect x={b.cx-bw/2} y={b.barTop} width={bw} height={b.barH} rx="2" fill={color} opacity={b.t==="total"?0.9:0.65}/>
            <text x={b.cx} y={b.barTop-5} textAnchor="middle" fill={color} fontSize="9" fontWeight="600">{(Math.abs(b.v)/1000).toFixed(1)}k</text>
            <text x={b.cx} y={H-pB+15} textAnchor="middle" fill="#94a3b8" fontSize="9">{b.l}</text>
          </g>
        );
      })}
    </svg>
  );
}

interface PriceChartProps {
  data: number[]; // Serie de precios históricos
  eq: number;     // Precio de equilibrio para la campaña actual
}
function PriceChart({ data, eq }: PriceChartProps) {
  const W=520,H=170,pL=40,pB=32,pT=14,pR=16;
  const cW=W-pL-pR, cH=H-pB-pT;
  const mn=Math.min(...data)*0.88, mx=Math.max(...data)*1.06;
  const xS=(i:number)=>pL+(i/(data.length-1))*cW;
  const yS=(v:number)=>pT+cH-((v-mn)/(mx-mn))*cH;
  const path=data.map((v:number,i:number)=>`${i===0?"M":"L"}${xS(i)},${yS(v)}`).join(" ");
  const fill=path+` L${xS(data.length-1)},${pT+cH} L${xS(0)},${pT+cH}Z`;
  const eqY=yS(eq);
  const idxs=[0,9,18,27,35].filter(i=>i<data.length);
  const xlbls=["Ene 22","Oct 22","Jul 23","Abr 24","Dic 24"];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[mn,(mn+mx)/2,mx].map(v=>{
        const y=yS(v);
        return <g key={v}><line x1={pL} y1={y} x2={W-pR} y2={y} stroke="#f1f5f9" strokeWidth="1"/><text x={pL-4} y={y+4} textAnchor="end" fill="#94a3b8" fontSize="9">{v.toFixed(2)}</text></g>;
      })}
      <path d={fill} fill="#3b82f6" fillOpacity="0.08"/>
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2"/>
      <line x1={pL} y1={eqY} x2={W-pR} y2={eqY} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3"/>
      <rect x={W-pR-46} y={eqY-11} width={46} height={14} rx="3" fill="white" opacity="0.9"/>
      <text x={W-pR-2} y={eqY} textAnchor="end" fill="#dc2626" fontSize="9">Eq. S/{eq}</text>
      {idxs.map((idx,j)=>(
        <text key={idx} x={xS(idx)} y={H-pB+14} textAnchor="middle" fill="#94a3b8" fontSize="9">{xlbls[j]}</text>
      ))}
    </svg>
  );
}

// Datos de radar para RadarChart
interface RadarDimension {
  e: string; // Eje / Etiqueta
  v: number; // Valor (0-10)
}
function RadarChart({ data }: { data: RadarDimension[] }) {
  const sz=200, cx=sz/2, cy=sz/2+12, r=sz*0.33;
  const n=data.length, ang=(i:number)=>Math.PI*2*i/n-Math.PI/2;
  const pt=(i:number,v:number)=>({x:cx+Math.cos(ang(i))*v,y:cy+Math.sin(ang(i))*v});
  const vPath=data.map((d,i)=>{const p=pt(i,(d.v/10)*r);return`${i===0?"M":"L"}${p.x},${p.y}`;}).join(" ")+"Z";
  return (
    <svg viewBox={`0 0 ${sz} ${sz+20}`} className="w-full max-w-[220px] mx-auto">
      {[0.25,0.5,0.75,1].map(f=><polygon key={f} points={data.map((_,i)=>{const p=pt(i,f*r);return`${p.x},${p.y}`;}).join(" ")} fill="none" stroke="#e2e8f0" strokeWidth="1"/>)}
      {data.map((_,i)=>{const p=pt(i,r);return<line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1"/>;} )}
      <path d={vPath} fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="1.5"/>
      {data.map((d,i)=>{const p=pt(i,(d.v/10)*r);return<circle key={i} cx={p.x} cy={p.y} r="3" fill="#2563eb"/>;} )}
      {data.map((d,i)=>{const lp=pt(i,r+18);return(
        <g key={i}><text x={lp.x} y={lp.y} textAnchor="middle" fill="#64748b" fontSize="8" dominantBaseline="middle">{d.e}</text><text x={lp.x} y={lp.y+11} textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="600">{d.v}</text></g>
      );})}
    </svg>
  );
}

interface ScoreDetail {
  d: string; // Dimensión (ej: "Capacidad Productiva")
  p: number; // Peso (ej: 15)
  s: number; // Score (ej: 71)
}

interface ScoreRadarProps {
  dims: ScoreDetail[];
}
function ScoreRadar({ dims }: ScoreRadarProps) {
  const W=300, cx=W/2, cy=W/2+20, r=100;
  const n=dims.length, ang=(i:number)=>Math.PI*2*i/n-Math.PI/2;
  const pt=(i:number,v:number)=>({x:cx+Math.cos(ang(i))*v,y:cy+Math.sin(ang(i))*v});
  const vPath=dims.map((d,i)=>{const p=pt(i,(d.s/100)*r);return`${i===0?"M":"L"}${p.x},${p.y}`;}).join(" ")+"Z";
  const rPath=dims.map((_,i)=>{const p=pt(i,0.7*r);return`${i===0?"M":"L"}${p.x},${p.y}`;}).join(" ")+"Z";
  return (
    <svg viewBox={`0 0 ${W} ${W+30}`} className="w-full max-w-xs mx-auto">
      {[0.25,0.5,0.75,1].map(f=><polygon key={f} points={dims.map((_,i)=>{const p=pt(i,f*r);return`${p.x},${p.y}`;}).join(" ")} fill="none" stroke="#e2e8f0" strokeWidth="1"/>)}
      {dims.map((_,i)=>{const p=pt(i,r);return<line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1"/>;} )}
      <path d={rPath} fill="#64748b" fillOpacity="0.06" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 2"/>
      <path d={vPath} fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2"/>
      {dims.map((d,i)=>{const p=pt(i,(d.s/100)*r);return<circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#2563eb"/>;} )}
      {dims.map((d,i)=>{
        const lp=pt(i,r+24);
        const c=scoreColor(d.s);
        const short=d.d.split(" ").slice(0,2).join(" ");
        return(
          <g key={i}><text x={lp.x} y={lp.y-5} textAnchor="middle" fill="#64748b" fontSize="8" dominantBaseline="middle">{short}</text><text x={lp.x} y={lp.y+7} textAnchor="middle" fill={c} fontSize="11" fontWeight="600">{d.s}</text></g>
        );
      })}
      <g transform={`translate(${cx-68},${W+16})`}>
        <line x1="0" y1="5" x2="16" y2="5" stroke="#2563eb" strokeWidth="2"/><text x="20" y="9" fill="#94a3b8" fontSize="9">Productor</text>
        <line x1="70" y1="5" x2="86" y2="5" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 2"/><text x="90" y="9" fill="#94a3b8" fontSize="9">Cartera media</text>
      </g>
    </svg>
  );
}

interface ScoreGaugeProps {
  score: number;
}
function ScoreGauge({ score }: ScoreGaugeProps) {
  const c=score>=750?"#059669":score>=600?"#d97706":score>=350?"#dc2626":"#9f1239";
  const r=58, circ=2*Math.PI*r, dash=(score/1000)*circ*0.75;
  return (
    <svg viewBox="0 0 155 105" className="w-40">
      <circle cx="77" cy="97" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" strokeDasharray={`${circ*0.75} ${circ}`} transform="rotate(135 77 97)" strokeLinecap="round"/>
      <circle cx="77" cy="97" r={r} fill="none" stroke={c} strokeWidth="8" strokeDasharray={`${dash} ${circ}`} transform="rotate(135 77 97)" strokeLinecap="round"/>
      <text x="77" y="84" textAnchor="middle" fill={c} fontSize="26" fontWeight="600">{score}</text>
      <text x="77" y="98" textAnchor="middle" fill="#94a3b8" fontSize="10">de 1,000</text>
    </svg>
  );
}

interface CardProps {
  children: ReactNode; // Tipo estándar para cualquier contenido renderizable
  className?: string;  // El '?' la hace opcional
}
// ─── COMPONENTS ──────────────────────────────

function Card({ children, className="" }: CardProps) {
  return <div className={`bg-white border border-slate-200 rounded-xl p-5 ${className}`}>{children}</div>;
}

interface SHeadProps {
  n: string | number;
  title: string;
  sub?: string;        // Opcional
}
function SHead({ n, title, sub = "" }: SHeadProps) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 rounded-lg w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
      <div><h2 className="text-slate-900 font-semibold text-sm">{title}</h2>{sub&&<p className="text-slate-400 text-xs mt-0.5">{sub}</p>}</div>
    </div>
  );
}

interface KvProps {
  label: string;
  value: string | number;
  mono?: boolean;      // Opcional
}
function Kv({ label, value, mono=false }: KvProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-slate-500 text-xs shrink-0">{label}</span>
      <span className={`text-slate-900 text-xs font-medium text-right ${mono?"font-mono":""}`}>{value}</span>
    </div>
  );
}

interface AlertRowProps {
  // Restringimos los strings exactos que puede recibir
  type: 'red' | 'amber' | 'green'; 
  title: string;
  desc: string;
}
function AlertRow({ type, title, desc }: AlertRowProps) {
  const t = { red: { wrap:"bg-red-50 border-red-200 hover:border-red-300", icon:"bg-red-100 text-red-700", text:"text-red-800", sub:"text-red-700" }, amber: { wrap:"bg-amber-50 border-amber-200 hover:border-amber-300", icon:"bg-amber-100 text-amber-700", text:"text-amber-800", sub:"text-amber-700" }, green: { wrap:"bg-emerald-50 border-emerald-200 hover:border-emerald-300", icon:"bg-emerald-100 text-emerald-700", text:"text-emerald-800", sub:"text-emerald-700" } }[type];
  const sym = { red:"✕", amber:"!", green:"✓" }[type];
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${t.wrap}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 ${t.icon}`}>{sym}</div>
      <div><p className={`font-semibold text-sm ${t.text}`}>{title}</p><p className={`text-xs mt-0.5 opacity-80 ${t.sub}`}>{desc}</p></div>
    </div>
  );
}

const TABS = ["Identidad","Producción","Flujo de Caja","Historial","Garantías","Mercado","Clima","Social","Alertas","Score"];

// ─── LANDING ─────────────────────────────────
interface LandingProps {
  onSearch: (dni: string) => void;
}
function Landing({ onSearch }: LandingProps) {
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const sug = SUGGESTIONS.find(s=>s.dni.startsWith(val)&&val.length>0&&s.dni!==val);
  const profile = PROFILES[val];

  const go = (dni:string) => { if (!PROFILES[dni]) return; setLoading(true); setTimeout(()=>onSearch(dni),1500); };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-7">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
              <img src={chakrapool} alt="Logo" className="w-full h-full rounded-xl "/>
              {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7l9 5 9-5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> */}
            </div>
            <div>
              <div className="text-slate-900 font-semibold text-xl tracking-tight leading-none">Chakra<span className="text-blue-600">Scoring</span></div>
              <div className="text-slate-400 text-[11px] tracking-widest uppercase mt-0.5">Riesgo Agro · Demo</div>
            </div>
          </div>
          <h1 className="text-slate-900 text-3xl font-semibold leading-snug mb-3">Reporte de Riesgo Agro</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">Evaluación crediticia verificada para el productor rural que los bureaus tradicionales no pueden calificar.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">DNI del productor</label>
            <div className={`flex items-center bg-slate-50 border rounded-xl transition-all ${val.length>0?"border-blue-300 ring-2 ring-blue-50 bg-white":"border-slate-200"} overflow-hidden`}>
              <span className="pl-4 text-slate-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <div className="relative flex-1">
                <input ref={inputRef} type="text" value={val}
                  onChange={e=>setVal(e.target.value.replace(/\D/g,"").slice(0,8))}
                  onKeyDown={e=>{if(e.key==="Tab"&&sug){e.preventDefault();setVal(sug.dni);}if(e.key==="Enter")go(val);}}
                  placeholder="Ej: 10234567"
                  className="w-full bg-transparent px-3 py-3.5 text-slate-900 placeholder-slate-400 text-base outline-none font-mono"/>
                {sug&&(
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex">
                    <span className="invisible font-mono text-base">{val}</span>
                    <span className="text-slate-300 font-mono text-base">{sug.dni.slice(val.length)}</span>
                  </div>
                )}
              </div>
              {sug&&<span className="pr-3 text-slate-400 text-xs flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-mono">Tab</kbd></span>}
            </div>
            {sug&&!profile&&(
              <div className="mt-2.5 flex items-center gap-3 px-1">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-blue-700 text-xs font-bold">{PROFILES[sug.dni].productor.nombre[0]}</span></div>
                <div><p className="text-slate-900 text-sm font-medium">{PROFILES[sug.dni].productor.nombre}</p><p className="text-slate-400 text-xs">{sug.sub}</p></div>
              </div>
            )}

            <button onClick={()=>go(val)} disabled={!profile||loading}
              className={`w-full mt-4 py-3.5 rounded-xl font-semibold text-sm transition-all ${profile&&!loading?"bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99]":"bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
              {loading?<span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>Generando reporte…</span>:"Generar Reporte →"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 px-6 mb-4">
            <div className="flex-1 h-px bg-slate-100"/>
            <span className="text-slate-400 text-xs">casos de demostración</span>
            <div className="flex-1 h-px bg-slate-100"/>
          </div>

          <div className="px-4 pb-4 space-y-2">
            {SUGGESTIONS.map(s=>{
              const p=PROFILES[s.dni], dm=decisionMeta(p.decision);
              return(
                <button key={s.dni} onClick={()=>go(s.dni)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 active:scale-[0.99] transition-all group text-left">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 transition-colors flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 group-hover:text-blue-600 text-sm font-bold transition-colors">{p.productor.nombre[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 text-sm font-medium truncate group-hover:text-blue-700 transition-colors">{p.productor.nombre}</p>
                    <p className="text-slate-400 text-xs">{s.sub}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${dm.pill}`}>{p.score}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" className="group-hover:stroke-blue-500 transition-colors"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">Datos demo · No usar para decisiones reales de crédito</p>
      </div>
    </div>
  );
}

// ─── RESULTS ─────────────────────────────────
interface ResultsProps {
  pKey: string;
  onBack: () => void;
}
function Results({ pKey, onBack }: ResultsProps) {
  const [tab, setTab] = useState(0);
  const r = PROFILES[pKey];
  const dm = decisionMeta(r.decision);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors group">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>Volver
              </button>
              <div className="h-4 w-px bg-slate-200"/>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center">
              <img src={chakrapool} alt="Logo" className="w-full h-full rounded-xl "/>

                  {/* <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7l9 5 9-5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> */}
                </div>
                <span className="text-slate-900 font-semibold text-sm">Chakra<span className="text-blue-600">Scoring</span></span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block"/>
              <span className="text-slate-700 text-sm font-medium hidden sm:block truncate max-w-[160px]">{r.productor.nombre}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${dm.pill}`}>{r.decision}</span>
              <span className="text-slate-900 font-bold text-sm tabular-nums">{r.score}<span className="text-slate-400 font-normal text-xs">/1000</span></span>
            </div>
          </div>
          <div className="flex overflow-x-auto -mx-4 px-4" style={{scrollbarWidth:"none"}}>
            {TABS.map((t,i)=>(
              <button key={i} onClick={()=>setTab(i)} className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${tab===i?"border-slate-900 text-slate-900":"border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">

        {/* TAB 0: IDENTIDAD */}
        {tab===0&&<>
          <SHead n="1" title="Identidad y Perfil del Prestatario" sub="RENIEC · SUNARP · Visita de campo · Imagen satelital"/>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Datos verificados</p>
              <Kv label="Nombre completo" value={r.productor.nombre}/>
              <Kv label="DNI" value={r.productor.dni} mono/>
              <Kv label="Edad" value={`${r.productor.edad} años`}/>
              <Kv label="Localidad" value={r.productor.localidad}/>
              <Kv label="Cultivo verificado" value={r.productor.cultivo}/>
              <Kv label="Comprador principal" value={r.productor.comprador}/>
              <Kv label="Experiencia en el predio" value={`${r.productor.anos} años`}/>
            </Card>
            <Card>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Verificación del predio</p>
              <Kv label="Ha declaradas" value={`${r.productor.ha_declaradas} ha`}/>
              <Kv label="Ha verificadas (satélite)" value={`${r.productor.ha_verificadas} ha`}/>
              <Kv label="Tenencia" value={r.productor.tenencia}/>
              <Kv label="Acceso a riego" value={r.productor.riego}/>
              {r.productor.discrepancia!==0?(
                <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex justify-between items-center"><span className="text-amber-800 text-xs font-semibold">Discrepancia de superficie</span><span className="text-amber-800 font-bold">{r.productor.discrepancia}%</span></div>
                  <p className="text-amber-700 text-xs mt-1 opacity-80">Aforo de ingresos ajustado a superficie real verificada.</p>
                </div>
              ):(
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200"><p className="text-emerald-800 text-xs font-semibold">✓ Superficie coincide — sin discrepancia</p></div>
              )}
              <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 h-24 bg-slate-100 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:"linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)",backgroundSize:"16px 16px"}}/>
                <div className="relative text-center"><div className="w-2.5 h-2.5 rounded-full bg-blue-600 mx-auto mb-1.5 ring-4 ring-blue-100"/><span className="text-slate-600 text-xs font-medium">{r.productor.localidad}</span></div>
              </div>
            </Card>
          </div>
        </>}

        {/* TAB 1: PRODUCCIÓN */}
        {tab===1&&<>
          <SHead n="2" title="Capacidad Productiva Histórica" sub="Rendimiento propio vs. promedio zonal · campaña a campaña"/>
          <Card><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Rendimiento por campaña (t/ha)</p><BarChart data={r.campanas}/><p className="text-slate-400 text-xs mt-2">⚡ evento climático adverso · línea discontinua = promedio zonal</p></Card>
          <Card>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Condiciones del predio</p>
            {r.predio.map((c,i)=>(
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition-colors group">
                <span className="text-slate-700 text-sm">{c.k}</span>
                <div className="flex items-center gap-3"><span className="text-slate-400 text-xs">{c.v}</span><span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${riskPill(c.r)}`}>{c.r}</span></div>
              </div>
            ))}
          </Card>
        </>}

        {/* TAB 2: FLUJO */}
        {tab===2&&<>
          <SHead n="3" title="Capacidad de Pago Real" sub="Flujo neto verificado · el bloque más crítico para la decisión de crédito"/>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Escenario base</p>
              <p className="text-slate-400 text-xs mb-4">S/ {r.flujo.base.precio}/kg · {r.flujo.base.rend} t/ha · {r.flujo.base.ha} ha</p>
              <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-700 text-sm">Ingreso bruto</span><span className="text-emerald-700 font-semibold text-sm">{S(r.flujo.base.ingresos)}</span></div>
              {Object.entries(r.flujo.base.costos).map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 text-xs"><span className="text-slate-500">{k}</span><span className="text-red-500">−{S(v)}</span></div>
              ))}
              <div className="flex justify-between py-2 border-t border-slate-200 mt-1"><span className="text-slate-500 text-sm">Total costos</span><span className="text-red-600 font-medium text-sm">−{S(r.flujo.base.total_c)}</span></div>
              <div className="flex justify-between py-3 bg-slate-50 rounded-xl px-3 mt-2 border border-slate-200"><span className="text-slate-900 font-semibold text-sm">Margen neto</span><span className="text-slate-900 font-bold text-lg">{S(r.flujo.base.margen)}</span></div>
            </Card>
            <Card>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Escenario estrés −20%</p>
              <p className="text-slate-400 text-xs mb-4">S/ {r.flujo.estres.precio}/kg · {r.flujo.estres.rend} t/ha</p>
              <div className={`flex justify-between py-3 rounded-xl px-3 mb-5 border ${r.flujo.estres.margen<0?"bg-red-50 border-red-200":"bg-amber-50 border-amber-200"}`}>
                <span className={`font-semibold text-sm ${r.flujo.estres.margen<0?"text-red-800":"text-amber-800"}`}>Margen estrés</span>
                <span className={`font-bold text-lg ${r.flujo.estres.margen<0?"text-red-700":"text-amber-700"}`}>{r.flujo.estres.margen<0?"−":""}{S(Math.abs(r.flujo.estres.margen))}</span>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Análisis de endeudamiento</p>
              <Kv label="Deuda vigente" value={`${r.deuda.vigente.entidad} · ${S(r.deuda.vigente.monto)}`}/>
              <Kv label="Crédito solicitado" value={S(r.deuda.solicitado)}/>
              <Kv label="Deuda total proyectada" value={S(r.deuda.total)}/>
              <div className={`mt-3 p-3.5 rounded-xl border ${r.deuda.ratio>=r.deuda.min?"border-emerald-200 bg-emerald-50":"border-red-200 bg-red-50"}`}>
                <div className="flex items-center justify-between mb-2"><span className={`text-xs font-semibold ${r.deuda.ratio>=r.deuda.min?"text-emerald-800":"text-red-800"}`}>Ratio de cobertura</span><span className={`text-2xl font-bold ${r.deuda.ratio>=r.deuda.min?"text-emerald-700":"text-red-700"}`}>{r.deuda.ratio}x</span></div>
                <p className={`text-xs opacity-70 ${r.deuda.ratio>=r.deuda.min?"text-emerald-800":"text-red-800"}`}>Mínimo requerido: {r.deuda.min}x</p>
                <div className="mt-2 h-1.5 bg-white/70 rounded-full overflow-hidden"><div className={`h-full rounded-full ${r.deuda.ratio>=r.deuda.min?"bg-emerald-500":"bg-red-500"}`} style={{width:`${Math.min((r.deuda.ratio/2)*100,100)}%`}}/></div>
              </div>
            </Card>
          </div>
          <Card><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cascada de flujo de caja — escenario base</p><WaterfallChart f={r.flujo}/></Card>
        </>}

        {/* TAB 3: HISTORIAL */}
        {tab===3&&<>
          <SHead n="4" title="Historial de Comportamiento de Pago" sub="SBS · Infocorp · Cajas municipales · Historial informal"/>
          <Card>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Historial crediticio formal</p>
            <div className="space-y-2">
              {r.creditos.map((c,i)=>(
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div><p className="text-slate-900 text-sm font-medium">{c.e}</p><p className="text-slate-400 text-xs">{c.m>0?`${S(c.m)} · `:""}{c.p}</p></div>
                  <div className="text-right"><p className={`text-xs font-medium ${c.mora===0?"text-emerald-700":c.mora<=30?"text-amber-700":"text-red-700"}`}>{c.s}</p>{c.mora>0&&<p className="text-slate-400 text-xs">{c.mora} días · {c.mes}</p>}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Timeline de pago — 24 meses</p>
            <div className="flex flex-wrap gap-1.5">
              {r.timeline.map((v,i)=>{
                const cls=v===-1?"bg-slate-100 border-slate-200":v===0?"bg-emerald-100 border-emerald-300 hover:border-emerald-400":v===1?"bg-amber-100 border-amber-300 hover:border-amber-400":"bg-red-100 border-red-300 hover:border-red-400";
                return(
                  <div key={i} title={r.tl_labels?.[i]||""} className={`w-6 h-6 rounded border ${cls} flex items-center justify-center transition-all hover:scale-110 cursor-default`}>
                    {v===2&&<span className="text-red-700 text-[9px] font-bold">!</span>}
                    {v===1&&<span className="text-amber-700 text-[9px]">~</span>}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-slate-100">
              {[["bg-emerald-100 border-emerald-300","Al día"],["bg-amber-100 border-amber-300","Mora 1-30d"],["bg-red-100 border-red-300","Mora >30d"],["bg-slate-100 border-slate-200","Sin crédito"]].map(([c,l])=>(
                <div key={l} className="flex items-center gap-1.5"><div className={`w-3 h-3 rounded border ${c}`}/><span className="text-slate-400 text-xs">{l}</span></div>
              ))}
            </div>
          </Card>
        </>}

        {/* TAB 4: GARANTÍAS */}
        {tab===4&&<>
          <SHead n="5" title="Garantías Reales y Colateral" sub="Inventario de bienes ejecutables en caso de impago"/>
          {r.garantias.some(g=>g.ej===true)?(
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p className="text-emerald-800 font-semibold text-sm">✓ Garantía ejecutable: {S(r.garantias.filter(g=>g.ej===true&&g.val).reduce((a,b)=>a+(b.val||0),0))}</p><p className="text-emerald-700 text-xs mt-0.5 opacity-80">Recuperación parcial viable en caso de default.</p></div>
          ):(
            <div className="p-4 rounded-xl bg-red-50 border border-red-200"><p className="text-red-800 font-semibold text-sm">✕ Garantía colateral ejecutable: S/ 0 — operación solo por flujo</p><p className="text-red-700 text-xs mt-0.5 opacity-80">En default, la recuperación depende exclusivamente de negociación extrajudicial.</p></div>
          )}
          <Card>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Inventario</p>
            <div className="space-y-2">
              {r.garantias.map((g,i)=>{
                const ej=g.ej===true?{c:"bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300",l:"Ejecutable"}:g.ej==="parcial"?{c:"bg-amber-100 text-amber-800 ring-1 ring-amber-300",l:"Parcial"}:{c:"bg-red-100 text-red-800 ring-1 ring-red-300",l:"No ejecutable"};
                return(
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div><p className="text-slate-900 text-sm">{g.b}</p><p className="text-slate-400 text-xs">{g.leg}</p></div>
                    <div className="flex items-center gap-2">{g.val&&<span className="text-slate-500 text-xs">~{S(g.val)}</span>}<span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${ej.c}`}>{ej.l}</span></div>
                  </div>
                );
              })}
            </div>
          </Card>
        </>}

        {/* TAB 5: MERCADO */}
        {tab===5&&<>
          <SHead n="6" title="Riesgo de Mercado del Cultivo" sub={`Volatilidad del precio · ${r.productor.cultivo} · 36 meses`}/>
          <Card><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Precio histórico (S//kg)</p><p className="text-slate-400 text-xs mb-3">Línea roja = punto de equilibrio del productor (S/ {r.p_eq}/kg)</p><PriceChart data={r.precios} eq={r.p_eq}/></Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[["Precio máximo",`S/ ${Math.max(...r.precios).toFixed(2)}`,"text-emerald-700"],["Precio mínimo",`S/ ${Math.min(...r.precios).toFixed(2)}`,"text-red-700"],["Punto de equilibrio",`S/ ${r.p_eq}`,"text-slate-900"],["Precio más reciente",`S/ ${r.precios[r.precios.length-1].toFixed(2)}`,"text-blue-700"]].map(([k,v,c])=>(
              <div key={k} className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-slate-300 hover:shadow-sm transition-all"><p className="text-slate-400 text-xs mb-1">{k}</p><p className={`font-bold text-lg ${c}`}>{v}</p></div>
            ))}
          </div>
        </>}

        {/* TAB 6: CLIMA */}
        {tab===6&&<>
          <SHead n="7" title="Riesgo Climático Georreferenciado" sub="Análisis del predio específico · SENAMHI · INDECI"/>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              ["Índice de riesgo",r.clima.indice,r.clima.indice.toLowerCase().includes("alto")?"text-red-700":"text-amber-700"],
              ["Prob. El Niño 2025",`${r.clima.nino_pct}%`,r.clima.nino_pct>35?"text-red-700":r.clima.nino_pct>20?"text-amber-700":"text-emerald-700"],
              ["Heladas (5 años)",`${r.clima.heladas} eventos`,r.clima.heladas>2?"text-red-700":r.clima.heladas>0?"text-amber-700":"text-emerald-700"],
              ["Inundaciones (5a)",`${r.clima.inundaciones} evento${r.clima.inundaciones!==1?"s":""}`,r.clima.inundaciones>0?"text-amber-700":"text-emerald-700"],
              ["Seguro agrícola",r.clima.seguro?"Contratado":"Sin contratar",r.clima.seguro?"text-emerald-700":"text-red-700"],
            ].map(([k,v,c])=>(
              <div key={k} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-sm transition-all"><p className="text-slate-400 text-xs mb-1">{k}</p><p className={`font-semibold text-base ${c}`}>{v}</p></div>
            ))}
          </div>
          {!r.clima.seguro&&<AlertRow type="red" title="Sin seguro agrícola" desc="Condición de desembolso incumplida. Cualquier evento climático severo lleva la operación a mora técnica o incobrable."/>}
          <Card>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Impacto en el flujo por escenario</p>
            <div className="space-y-2">
              {r.impacto.map((e,i)=>{
                const st={EXCELENTE:"border-emerald-200 bg-emerald-50 text-emerald-700",ACEPTABLE:"border-slate-200 bg-slate-50 text-slate-600",RIESGO:"border-amber-200 bg-amber-50 text-amber-700",CRÍTICO:"border-orange-200 bg-orange-50 text-orange-700",INCOBRABLE:"border-red-200 bg-red-50 text-red-700"}[e.estado];
                return(
                  <div key={i} className={`p-4 rounded-xl border transition-all hover:shadow-sm ${st}`}>
                    <div className="flex items-center justify-between mb-2"><p className="text-slate-900 text-sm font-medium">{e.esc}</p><span className="text-xs font-bold">{e.estado}</span></div>
                    <div className="grid grid-cols-2 gap-4 text-xs"><div><p className="text-slate-400">Pérdida estimada</p><p className="text-slate-900 font-medium">{e.perdida>0?`−${S(e.perdida)}`:"—"}</p></div><div><p className="text-slate-400">Cobertura</p><p className={`font-bold ${e.cob>=1?"text-emerald-700":e.cob>0?"text-amber-700":"text-red-700"}`}>{e.cob}x</p></div></div>
                  </div>
                );
              })}
            </div>
          </Card>
        </>}

        {/* TAB 7: SOCIAL */}
        {tab===7&&<>
          <SHead n="8" title="Entorno Social y Familiar" sub="Variables que ningún bureau tradicional captura"/>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Estructura del hogar</p>
              <Kv label="Personas dependientes" value={`${r.social.dep} (${r.social.hijos} hijos menores)`}/>
              <Kv label="Ingresos alternativos" value={r.social.ing_alt}/>
              <Kv label="Gastos fijos" value={`${S(r.social.gastos)}/mes`}/>
              <Kv label="Seguro de salud" value={r.social.sis?"SIS activo":"Sin seguro"}/>
              <Kv label="Asociación" value={r.social.asoc}/>
            </Card>
            <Card>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Radar de entorno social</p>
              <p className="text-slate-400 text-xs mb-3">Escala 0–10 · Mayor valor = menor riesgo</p>
              <RadarChart data={r.radar}/>
            </Card>
          </div>
        </>}

        {/* TAB 8: ALERTAS */}
        {tab===8&&<>
          <SHead n="9" title="Alertas Automáticas y Prevención de Fraude"/>
          <div className="space-y-2"><p className="text-xs font-semibold text-red-600 uppercase tracking-wider">{r.alertas_r.length} Alerta{r.alertas_r.length!==1?"s":""} roja{r.alertas_r.length!==1?"s":""}</p>{r.alertas_r.map((a,i)=><AlertRow key={i} type="red" title={a.t} desc={a.d}/>)}</div>
          {r.alertas_a.length>0&&<div className="space-y-2"><p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{r.alertas_a.length} Alerta{r.alertas_a.length!==1?"s":""} de monitoreo</p>{r.alertas_a.map((a,i)=><AlertRow key={i} type="amber" title={a.t} desc={a.d}/>)}</div>}
          <div className="space-y-2"><p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{r.positivos.length} Factor{r.positivos.length!==1?"es":""} positivo{r.positivos.length!==1?"s":""} verificado{r.positivos.length!==1?"s":""}</p>{r.positivos.map((a,i)=><AlertRow key={i} type="green" title={a.t} desc={a.d}/>)}</div>
        </>}

        {/* TAB 9: SCORE */}
        {tab===9&&<>
          <SHead n="11" title="Score Chakra y Recomendación de Decisión" sub="Score global ponderado de 7 dimensiones · escala 0–1,000"/>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center py-8">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Score Global</p>
              <ScoreGauge score={r.score}/>
              <div className={`mt-5 text-center px-6 py-3.5 rounded-xl w-full border ${dm.border} ${dm.bg}`}>
                <p className={`font-bold text-base ${dm.text}`}>{r.decision}</p>
                <p className={`text-xs mt-0.5 ${dm.text} opacity-70`}>{r.zona}</p>
              </div>
            </Card>
            <Card>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Score por dimensión</p>
              <div className="space-y-3.5">
                {r.scores.map((d,i)=>{
                  const c=scoreColor(d.s);
                  return(
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-700 text-xs">{d.d}</span>
                        <div className="flex items-center gap-2"><span className="text-slate-400 text-xs">×{d.p}%</span><span className="text-xs font-bold w-12 text-right tabular-nums" style={{color:c}}>{d.s}/100</span></div>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{width:`${d.s}%`,backgroundColor:c}}/></div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          <Card><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Perfil del productor vs. cartera promedio</p><ScoreRadar dims={r.scores}/></Card>
          <Card>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tabla de rangos y lógica de decisión</p>
            <div className="space-y-1.5">
              {[{rng:"800–1000",cls:"Excelente",dec:"Aprobación automática",active:r.score>=800},{rng:"650–799",cls:"Bueno",dec:"Aprobación con condiciones",active:r.score>=650&&r.score<800},{rng:"500–649",cls:"Moderado",dec:"Revisión manual obligatoria",active:r.score>=500&&r.score<650},{rng:"350–499",cls:"Alto riesgo",dec:"Rechazo recomendado",active:r.score>=350&&r.score<500},{rng:"< 350",cls:"Rechazo",dec:"Rechazo automático",active:r.score<350}].map(row=>{
                const active=row.active;
                return(
                  <div key={row.rng} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${active?"border-slate-300 bg-slate-50 ring-2 ring-offset-1 ring-slate-200 shadow-sm":"border-slate-100 bg-white"}`}>
                    {active&&<div className="w-1.5 h-1.5 rounded-full bg-slate-700 flex-shrink-0"/>}
                    <span className={`font-mono text-xs w-20 ${active?"text-slate-900 font-semibold":"text-slate-400"}`}>{row.rng}</span>
                    <span className={`text-xs font-semibold flex-1 ${active?"text-slate-900":"text-slate-500"}`}>{row.cls}</span>
                    <span className={`text-xs ${active?"text-slate-600":"text-slate-400"}`}>{row.dec}</span>
                  </div>
                );
              })}
            </div>
          </Card>
          <div className={`p-5 rounded-xl border ${dm.border} ${dm.bg}`}>
            <h3 className={`font-bold text-base mb-1 ${dm.text}`}>{r.decision}</h3>
            <p className={`text-xs mb-4 ${dm.text} opacity-70`}>Score {r.score}/1,000 · {r.zona}</p>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${dm.text}`}>{r.decision.includes("Rechazo")?"Motivos:":"Condiciones previas al desembolso:"}</p>
            <div className="space-y-2">
              {r.condiciones.map((c,i)=>(
                <div key={i} className="flex items-start gap-2.5">
                  <span className={`font-bold text-xs mt-0.5 flex-shrink-0 ${dm.text}`}>{i+1}.</span>
                  <p className={`text-xs leading-relaxed ${dm.text} opacity-85`}>{c}</p>
                </div>
              ))}
            </div>
          </div>
        </>}
      </div>
      <div className="h-12"/>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────
export default function ScoringPage() {
  const [page, setPage] = useState("landing");
  const [pKey, setPKey] = useState("");
  return <div className="mt-24">
  {page==="landing"
    ? <Landing onSearch={k=>{setPKey(k);setPage("results");}}/>
    : <Results pKey={pKey} onBack={()=>setPage("landing")}/>}
  </div>
}

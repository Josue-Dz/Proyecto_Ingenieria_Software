export const usersMock = [
  { id: "u1", name: "Ana García" },
  { id: "u2", name: "Carlos Pérez" },
  { id: "u3", name: "Sofía Rodríguez" },
  { id: "u4", name: "Luis Martínez" },
  { id: "u5", name: "Elena Vega" },
  { id: "u6", name: "David López" }
];

export const tasksMock = [
  // ANA
  {
    id: 1,
    title: "Login UI",
    assignedTo: "u1",
    status: "finalizado",
    startDate: "2026-04-01",
    endDate: "2026-04-02"
  },
  {
    id: 2,
    title: "Validación formulario",
    assignedTo: "u1",
    status: "en_proceso",
    startDate: "2026-04-03"
  },
  {
    id: 3,
    title: "Recuperar contraseña",
    assignedTo: "u1",
    status: "pendiente"
  },

  // CARLOS
  {
    id: 4,
    title: "Diseño dashboard",
    assignedTo: "u2",
    status: "finalizado",
    startDate: "2026-04-01",
    endDate: "2026-04-04"
  },
  {
    id: 5,
    title: "UX Kanban",
    assignedTo: "u2",
    status: "en_proceso",
    startDate: "2026-04-05"
  },
  {
    id: 6,
    title: "Prototipo mobile",
    assignedTo: "u2",
    status: "pendiente"
  },

  // SOFIA
  {
    id: 7,
    title: "API tareas",
    assignedTo: "u3",
    status: "finalizado",
    startDate: "2026-04-01",
    endDate: "2026-04-03"
  },
  {
    id: 8,
    title: "Endpoints usuarios",
    assignedTo: "u3",
    status: "finalizado",
    startDate: "2026-04-02",
    endDate: "2026-04-05"
  },
  {
    id: 9,
    title: "Integración frontend",
    assignedTo: "u3",
    status: "en_proceso",
    startDate: "2026-04-06"
  },

  // LUIS
  {
    id: 10,
    title: "Testing login",
    assignedTo: "u4",
    status: "finalizado",
    startDate: "2026-04-02",
    endDate: "2026-04-03"
  },
  {
    id: 11,
    title: "Testing dashboard",
    assignedTo: "u4",
    status: "finalizado",
    startDate: "2026-04-03",
    endDate: "2026-04-06"
  },
  {
    id: 12,
    title: "Pruebas API",
    assignedTo: "u4",
    status: "en_proceso",
    startDate: "2026-04-07"
  },

  // ELENA
  {
    id: 13,
    title: "Diseño UX login",
    assignedTo: "u5",
    status: "pendiente"
  },
  {
    id: 14,
    title: "Wireframes dashboard",
    assignedTo: "u5",
    status: "en_proceso",
    startDate: "2026-04-06"
  },
  {
    id: 15,
    title: "Sistema de colores",
    assignedTo: "u5",
    status: "finalizado",
    startDate: "2026-04-01",
    endDate: "2026-04-02"
  },

  // DAVID
  {
    id: 16,
    title: "Base de datos",
    assignedTo: "u6",
    status: "finalizado",
    startDate: "2026-04-01",
    endDate: "2026-04-05"
  },
  {
    id: 17,
    title: "Optimización queries",
    assignedTo: "u6",
    status: "en_proceso",
    startDate: "2026-04-06"
  },
  {
    id: 18,
    title: "Backup automático",
    assignedTo: "u6",
    status: "pendiente"
  }
];
# Acta de Sprint Review – Sprint #1

**Proyecto:** Sistema de Gestión de Proyectos de Software
**Equipo:** CodeFlow
**Integrantes:** Ronny Posadas, David Parada, José Núñez
**Fecha:** 11/02/26 – 27/02/26

---

## 1. Objetivo del Sprint
Establecer la base del sistema mediante la implementación del **Módulo 1: Registro y Autenticación** y la estructura inicial de la **Gestión de Proyectos**, asegurando una arquitectura sólida para el manejo de datos.

## 2. Resumen del Sprint (Métricas)
* **Historias de Usuario (HU) comprometidas:** 8
* **Tareas Técnicas comprometidas:** 10
* **Cumplimiento:** 17/18 elementos terminados (94.44%)
* **Puntos de historia totales:** 21 puntos (Fibonacci)

### Historias de Usuario:
1. Visualización de la Página de Inicio (Landing Page)
2. Registro de Usuarios
3. Inicio de Sesión y Persistencia de Usuario
4. Visualización de Dashboard
5. Finalización de Sesión Segura (Logout)
6. Creación de Tablero
7. Visualización de proyectos
8. Visualizar tablero Kanban

---

## 3. Demostración de Logros

### A. Funcionalidades (Historias de Usuario)
* **Registro de Usuario:** Formulario funcional con manejo de Cookies.
* **Inicio de Sesión:** Autenticación y encriptación mediante JWT + Spring Security.
* **Landing Page:** Interfaz de bienvenida con características e información del equipo.
* **Cierre de Sesión:** Limpieza de tokens y redirección segura.
* **Creación de Proyecto:** Registro de metadatos (nombre, descripción, fechas, ID creador).
* **Dashboard:** Visualización de lista dinámica de proyectos.

> **Nota:** La visualización del **Tablero Kanban** no se completó en este periodo y se transfiere al siguiente Sprint.

### B. Infraestructura Técnica
Se completaron 10 hitos, incluyendo la configuración de GitHub, definición del stack tecnológico, modelado de la base de datos relacional y la inicialización de los proyectos en React (Frontend) y Spring Boot (Backend).

## 4. Estado del Incremento
El sistema permite el flujo completo de registro, login seguro y creación de proyectos. La base de datos es consistente y permite escalar hacia el desarrollo del Tablero Kanban.

---

# Acta de Sprint Retrospective – Sprint #1

## 1. Análisis de Cumplimiento
* **Tareas completadas:** 17
* **Tareas pendientes:** 1 (Transferida al Sprint Backlog #2)
* **Porcentaje de éxito:** 94.4%

## 2. Feedback del Equipo

### ¿Qué salió bien?
* **Productividad:** Buena división de tareas y compromiso.
* **Refinamiento:** Las Historias de Usuario estaban claras, evitando dudas técnicas.
* **Comunicación:** Resolución rápida de bloqueos mediante reuniones y mensajería.

### ¿Qué salió mal o fue difícil?
* **Subestimación:** La tarea pendiente resultó ser más compleja de lo previsto.
* **Gestión del tiempo:** Se inició el grueso del trabajo con poco margen, generando estrés al final del sprint.

### Plan de Mejora
* **Daily Stand-ups:** Realizar reuniones diarias más constantes para un seguimiento preventivo.

## 3. Compromisos para el Sprint #2
* **Prioridad:** Finalizar la tarea técnica pendiente del Sprint #1.
* **Investigación:** Analizar librerías de "Drag and Drop" antes de iniciar el desarrollo del tablero para optimizar tiempos.

---------------------------------------------------------

# Acta de Sprint Review – Sprint #2

**Proyecto:** Sistema de Gestión de Proyectos de Software
**Equipo:** CodeFlow
**Integrantes:** Ronny Posadas, David Parada, José Núñez
**Fecha:** 28/02/26 – 13/03/26

## 1. Objetivo del Sprint
Desarrollar el núcleo funcional del sistema mediante la implementación del **Tablero Kanban interactivo**, permitiendo la gestión dinámica de tareas, la organización de tableros por proyecto y la personalización de la experiencia de usuario (UI/UX).

## 2. Resumen del Sprint (Métricas)
* **Historias de Usuario (HU) comprometidas:** 11
* **Tareas Técnicas comprometidas:** 2 (Pruebas y UML)
* **Total de elementos terminados:** 13/13 (100% de cumplimiento)
* **Puntos de historia totales:** 42 puntos (Fibonacci)

## 3. Demostración de Logros (Lo que se terminó)

### A. Funcionalidades (Historias de Usuario)
1. **Tablero Kanban Operativo:** Visualización dinámica de columnas y tarjetas.
2. **Gestión de Estructura:** Creación de nuevas columnas (listas) y tableros múltiples dentro de un mismo proyecto.
3. **Gestión de Tareas:** Creación de tarjetas y visualización detallada de su contenido.
4. **Interactividad:** Implementación del cambio de estado (*Drag & Drop*) para mover tarjetas entre columnas.
5. **Administración de Proyectos:** Funcionalidades de edición y eliminación de proyectos existentes.
6. **Experiencia de Usuario:** Implementación de Modo Oscuro y gestión de perfil de usuario.

### B. Infraestructura y Calidad Técnica
* **Diagramas UML:** Finalización de los 8 diagramas estructurales y de comportamiento (Clases, Casos de Uso, Secuencia, etc.).
* **Pruebas Unitarias:** Implementación de tests para validar la lógica de negocio en el backend (Spring Boot).
* **Navegación:** Refinamiento de las rutas para transicionar entre el Dashboard y los tableros específicos.

## 4. Estado del Incremento
El sistema ahora es una herramienta funcional de gestión. El usuario no solo crea proyectos, sino que puede operarlos mediante un tablero Kanban interactivo, organizar su flujo de trabajo en columnas y personalizar su entorno. El producto está listo para la fase de métricas y colaboración masiva.

--------------------------------------

# Acta de Sprint Retrospective – Sprint #2

## 1. Análisis de Cumplimiento
* **Tareas completadas:** 13
* **Tareas pendientes:** 0
* **Porcentaje de éxito:** 100% (Se recuperó la tarea pendiente del Sprint #1).

## 2. Feedback del Equipo

### ¿Qué salió bien?
* **Recuperación de Ritmo:** Se logró finalizar la visualización del Kanban que quedó pendiente, sin retrasar las nuevas historias.
* **Calidad de Código:** Las pruebas unitarias redujeron los errores al momento de integrar el frontend con el backend.

### ¿Qué puede mejorar?
* **Complejidad del Drag & Drop:** La lógica de reordenamiento en la base de datos fue más difícil de lo previsto inicialmente.
* **Carga de Documentación:** Generar los 8 diagramas UML al mismo tiempo que se programaba generó una carga de trabajo pesada a mitad del sprint.

## 3. Plan de Mejora y Compromisos para el Sprint #3
* **Investigación de Librerías:** Para el módulo de métricas, dedicaremos los primeros 2 días a investigar bibliotecas de gráficos.
* **Refactorización:** Limpiar el código del movimiento de tarjetas para asegurar que sea escalable cuando haya cientos de tareas.
* **Enfoque en Métricas:** La prioridad del siguiente sprint será cumplir con el requerimiento del ingeniero sobre la generación de reportes y exportación a PDF.

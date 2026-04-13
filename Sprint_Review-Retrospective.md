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
* **Enfoque en Métricas:** La prioridad del siguiente sprint será cumplir con el requerimiento para la gestion de miembros en el proyecto.
  

# Acta de Sprint Review – Sprint #3

**Proyecto:** Sistema de Gestión de Proyectos de Software
**Equipo:** CodeFlow
**Integrantes:** Ronny Posadas, David Parada, José Núñez
**Fecha:** 14/03/26 – 27/03/26

## 1. Objetivo del Sprint
Transformar el sistema en una plataforma colaborativa mediante la implementación de un motor de **Notificaciones en Tiempo Real**, gestión de membresías de equipo y la centralización de requerimientos en el **Product Backlog**, culminando con el despliegue del sistema en un entorno de producción.

## 2. Resumen del Sprint (Métricas)

| Métrica | Valor |
| :--- | :--- |
| **Historias de Usuario (HU) comprometidas** | 5 |
| **Tareas Técnicas comprometidas** | 1 (Despliegue Azure) |
| **Total de elementos terminados** | 5 / 6 |
| **Porcentaje de cumplimiento** | 83.33% |
| **Puntos de Historia totales (Fibonacci)** | 21 pts (Completados) |
| **Estado del Sprint** | En Progreso (1 HU pendiente) |

## 3. Demostración de Logros (Lo que se terminó)

### A. Funcionalidades (Historias de Usuario)
1. **Notificación de Asignación de Tarea (3 pts):** Sistema de alertas cuando un usuario es designado como responsable de una tarjeta.
2. **Gestión de Miembros del Equipo (8 pts):** Interfaz para añadir colaboradores a un proyecto con roles específicos (ADMIN, COLABORADOR, LECTOR).
3. **Notificaciones de Cambios en Tareas (5 pts):** Alertas automáticas al mover tarjetas o modificar fechas límites.
4. **Gestión del Product Backlog (5 pts):** Implementación de la lista maestra de requerimientos a nivel de proyecto (fuera de los Sprints).

### B. Infraestructura Técnica
* **Despliegue en Azure:** Configuración exitosa de la infraestructura para el frontend y backend, permitiendo acceso externo al sistema.
* **Integración de Notificaciones:** Lógica de backend para disparar eventos de alerta ante cambios en la base de datos.

## 4. Estado del Incremento
El sistema ya permite el trabajo multi-usuario. El "Master Backlog" está operativo para planificar futuros Sprints y las notificaciones aseguran que el equipo esté alineado. **Nota:** La funcionalidad de *Filtrado de Tareas* se transfiere al Sprint #4 por priorizar la estabilidad del despliegue en azure.

---

# Acta de Sprint Retrospective – Sprint #3

## 1. Análisis de Cumplimiento
* **Tareas completadas:** 5
* **Tareas pendientes:** 1 (Filtrar tareas en el tablero - 5 pts)
* **Porcentaje de éxito:** 83.3%

## 2. Feedback del Equipo

### ¿Qué salió bien?
* **Despliegue Exitoso:** Lograr que la aplicación funcione en Azure da una gran ventaja competitiva para la entrega final.
* **Módulo de Colaboración:** La lógica de `tbl_proyecto_x_usuarios` funciona correctamente, permitiendo que varios estudiantes trabajen en el mismo proyecto.

### ¿Qué puede mejorar?
* **Configuración del Entorno Cloud:** El despliegue en Azure tomó más tiempo del planeado debido a configuraciones de variables de entorno y CORS.
* **Alcance Excesivo:** Se subestimó el esfuerzo de las notificaciones en tiempo real y la parte para Gestionar los miembros en el proyecto, lo que causó el retraso en la funcionalidad de filtrado.

## 3. Plan de Mejora y Compromisos para el Sprint #4 (Cierre)
* **Finalización Inmediata:** Iniciar el Sprint #4 completando el filtro de tareas pendiente.
  

* # Acta de Sprint Review – Sprint #4 (Cierre de Proyecto)

**Proyecto:** Sistema de Gestión de Proyectos de Software
**Equipo:** CodeFlow
**Integrantes:** Ronny Posadas, David Parada, José Núñez
**Fecha:** 29/03/26 – 11/04/26

## 1. Objetivo del Sprint
Culminar el desarrollo del sistema mediante la integración de la **Planificación Ágil desde el Backlog**, la implementación de un motor de **Analítica de Datos** (Métricas y Reportes) y la formalización de la documentación técnica y de usuario para la entrega final del periodo académico.

## 2. Resumen del Sprint (Métricas)

| Métrica | Valor |
| :--- | :--- |
| **Historias de Usuario (HU) comprometidas** | 8 |
| **Tareas Técnicas comprometidas** | 2 (Manual Técnico y Usuario) |
| **Total de elementos terminados** | 10/ 10 |
| **Porcentaje de cumplimiento** | 100% |
| **Puntos de Historia totales (Fibonacci)** | 42 pts |
| **Estado del Sprint** |  Completado - Entrega Final |


## 3. Demostración de Logros (Lo que se terminó)

### A. Funcionalidades (Historias de Usuario)
1. **Planificación de Sprint (8 pts):** Lógica para asignar Historias de Usuario desde el Product Backlog global hacia tableros de Sprints específicos.
2. **Filtrar tareas en el tablero (5 pts):** Buscador funcional y filtros por prioridad y responsable para mejorar la navegabilidad.
3.**Subtareas por tarjeta (3pts):**Despliegue de subtareas en cada tarjeta.
3. **Historial de Actividad (3 pts):** Registro de auditoría que muestra quién realizo cada acción dentro del tablero y cuándo.
4. **Reporte de Progreso por Sprint (5 pts):** Visualización de avance mediante gráficos de barras y estados.
5. **Métricas de Rendimiento por Usuario (5 pts):** Gráficas que muestran la carga de trabajo y productividad individual de los miembros.
6. **Exportación de Datos (8 pts):** Generación de archivos en formato PDF/Excel con el resumen del estado del proyecto.

### B. Documentación y Calidad Técnica
* **Manual Técnico:** Documento exhaustivo con arquitectura en capas, diagramas UML, DER v5.0 e instrucciones de despliegue con Docker.
* **Manual de Usuario:** Guía visual paso a paso para que los estudiantes de la UNAH puedan utilizar la herramienta sin curva de aprendizaje previa.

## 4. Estado del Incremento
El sistema ha alcanzado el estado de **Producto Terminado (Done)**. Se han integrado todas las capas de la arquitectura N-Tier, desde la persistencia en MySQL hasta la visualización reactiva en React 19. El sistema es totalmente operativo en la nube y localmente.

---

# Acta de Sprint Retrospective – Sprint #4

## 1. Análisis de Cumplimiento
* **Tareas completadas:** 10
* **Tareas pendientes:** 0
* **Éxito del Proyecto:** Se cumplió con la totalidad de los requerimientos solicitados por el ingeniero, incluyendo la gestión de deuda técnica del Sprint anterior.

## 2. Feedback del Equipo

### ¿Qué salió bien?
* **Cierre Documental:** La elaboración simultánea de los manuales y las métricas permitió que el equipo tuviera una visión amplia del sistema antes de la defensa.
* **Lógica del Backlog:** La implementación de la HU de "Asignación desde Backlog" cerró el ciclo de metodologías ágiles que el sistema prometía.
* **Visualización de Datos:** El uso de Recharts para las métricas de usuario dio un valor agregado profesional al tablero.

### ¿Qué fue difícil?
* **Carga de Trabajo:** Este último sprint fue el más denso en puntos Fibonacci (39 pts), exigiendo jornadas de trabajo más intensas para no dejar tareas pendientes.
* **Lógica de Exportación:** Configurar las librerías para que el diseño de los reportes PDF se viera igual de bien que la interfaz web fue un reto técnico considerable.

## 3. Conclusión del Proyecto CodeFlow
El equipo concluye este proyecto habiendo superado los retos de infraestructura (Azure/WSL/Docker) y desarrollo. El Sistema de Gestión de Proyectos de Software queda listo para su presentación final, posicionándose como una herramienta viable para su uso en la facultad de ingeniería.

* **Enfoque en Métricas Finales:** Implementar los gráficos de avance (Burn down charts) que solicitó el ingeniero.
* **Preparación de Entrega:** Dedicar los últimos días a la limpieza de código (Refactorización) y redacción del manual de usuario y manual técnico para la entrega final de la clase.



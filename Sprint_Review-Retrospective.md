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

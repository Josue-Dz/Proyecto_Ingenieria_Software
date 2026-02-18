create schema bd_gestion_proyectos_software;

use bd_gestion_proyectos_software;

CREATE TABLE tbl_usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado CHAR(1) DEFAULT 'A'
);

CREATE TABLE tbl_proyectos (
    id_proyecto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_proyecto VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    id_creador INT NOT NULL,

    FOREIGN KEY (id_creador) 
    REFERENCES tbl_usuarios(id_usuario)
);

CREATE TABLE tbl_tableros (
    id_tablero INT AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT NOT NULL UNIQUE,

    FOREIGN KEY (id_proyecto)
    REFERENCES tbl_proyectos(id_proyecto)
);

CREATE TABLE tbl_columnas (
    id_columna INT AUTO_INCREMENT PRIMARY KEY,
    nombre_columna VARCHAR(100) NOT NULL,
    posicion INT,
    id_tablero INT NOT NULL,

    FOREIGN KEY (id_tablero)
    REFERENCES tbl_tableros(id_tablero)
    ON DELETE CASCADE
);

CREATE TABLE tbl_tarjetas (
    id_tarjeta INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_limite DATE,
    prioridad ENUM('BAJA','MEDIA','ALTA'),
    estado ENUM('PENDIENTE','EN_PROGRESO','FINALIZADA') DEFAULT 'PENDIENTE',
    id_creador INT NOT NULL,
    id_columna INT NOT NULL,

    FOREIGN KEY (id_creador)
    REFERENCES tbl_usuarios(id_usuario),

    FOREIGN KEY (id_columna)
    REFERENCES tbl_columnas(id_columna)
    ON DELETE CASCADE
);

CREATE TABLE tbl_proyecto_x_usuarios (
    id_usuario INT NOT NULL,
    id_proyecto INT NOT NULL,
    rol ENUM('ADMIN','MIEMBRO','LECTOR'),

    PRIMARY KEY (id_usuario, id_proyecto),

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuarios(id_usuario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_proyecto)
    REFERENCES tbl_proyectos(id_proyecto)
    ON DELETE CASCADE
);

CREATE TABLE tbl_tarjetas_x_usuarios (
    id_usuario INT NOT NULL,
    id_tarjeta INT NOT NULL,

    PRIMARY KEY (id_usuario, id_tarjeta),

    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuarios(id_usuario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_tarjeta)
    REFERENCES tbl_tarjetas(id_tarjeta)
    ON DELETE CASCADE
);




-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-04-27 17:31:11.32

-- tables

-- Table: Cliente
CREATE TABLE Cliente (
    id_cliente int NOT NULL AUTO_INCREMENT,
    nombres varchar(255) NULL,
    apellidos varchar(255) NOT NULL,
    estado bit NOT NULL DEFAULT 1,
    CONSTRAINT Cliente_pk PRIMARY KEY (id_cliente)
);

-- Table: DetallesVenta
CREATE TABLE DetallesVenta (
    id_detalle_venta int NOT NULL AUTO_INCREMENT,
    id_venta int NOT NULL,
    id_plato int NOT NULL,
    cantidad int NOT NULL DEFAULT 1,
    estado bit NOT NULL DEFAULT 1,
    CONSTRAINT DetallesVenta_pk PRIMARY KEY (id_detalle_venta)
);

-- Table: Empleado
CREATE TABLE Empleado (
    id_empleado int NOT NULL AUTO_INCREMENT,
    nombres varchar(255) NOT NULL,
    apellidos varchar(255) NOT NULL,
    fotografia varchar(255) NULL,
    telefono int NOT NULL,
    sexo char(1) NOT NULL,
    estado bit NOT NULL DEFAULT 1,
    CONSTRAINT Empleado_pk PRIMARY KEY (id_empleado)
);

-- Table: Plato
CREATE TABLE Plato (
    id_plato int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    precio decimal(6,2) NOT NULL,
    descripcion varchar(255) NOT NULL,
    imagen varchar(255) NULL,
    estado bit NOT NULL DEFAULT 1,
    CONSTRAINT Plato_pk PRIMARY KEY (id_plato)
);

-- Table: Provision
CREATE TABLE Provision (
    id_provision int NOT NULL AUTO_INCREMENT,
    id_plato int NOT NULL,
    cantidad_disponible int NOT NULL DEFAULT 0,
    CONSTRAINT Provision_pk PRIMARY KEY (id_provision)
);

-- Table: TipoUsuario
CREATE TABLE TipoUsuario (
    id_tipo_usuario int NOT NULL AUTO_INCREMENT,
    nombre_tipo_usuario varchar(255) NOT NULL,
    estado bit NOT NULL DEFAULT 1,
    CONSTRAINT TipoUsuario_pk PRIMARY KEY (id_tipo_usuario)
);

-- Table: Usuario
CREATE TABLE Usuario (
    id_usuario int NOT NULL AUTO_INCREMENT,
    id_empleado int NOT NULL,
    id_tipo_usuario int NOT NULL,
    nombre_usuario varchar(255) NOT NULL,
    contrasenia varchar(255) NOT NULL,
    estado bit NOT NULL DEFAULT 1,
    CONSTRAINT Usuario_pk PRIMARY KEY (id_usuario)
);

-- Table: Venta
CREATE TABLE Venta (
    id_venta int NOT NULL AUTO_INCREMENT,
    id_usuario int NOT NULL,
    id_cliente int NOT NULL,
    total decimal(6,2) NOT NULL,
    fecha timestamp DEFAULT CURRENT_TIMESTAMP,
    estado bit NOT NULL DEFAULT 1,
    CONSTRAINT Venta_pk PRIMARY KEY (id_venta)
);

-- foreign keys
-- Reference: DetallesVenta_Plato (table: DetallesVenta)
ALTER TABLE DetallesVenta ADD CONSTRAINT DetallesVenta_Plato FOREIGN KEY DetallesVenta_Plato (id_plato)
    REFERENCES Plato (id_plato);

-- Reference: DetallesVenta_Venta (table: DetallesVenta)
ALTER TABLE DetallesVenta ADD CONSTRAINT DetallesVenta_Venta FOREIGN KEY DetallesVenta_Venta (id_venta)
    REFERENCES Venta (id_venta);


-- Reference: Provision_Plato (table: Provision)
ALTER TABLE Provision ADD CONSTRAINT Provision_Plato FOREIGN KEY Provision_Plato (id_plato)
    REFERENCES Plato (id_plato);

-- Reference: Usuario_Empleado (table: Usuario)
ALTER TABLE Usuario ADD CONSTRAINT Usuario_Empleado FOREIGN KEY Usuario_Empleado (id_empleado)
    REFERENCES Empleado (id_empleado);

-- Reference: Usuario_TipoUsuario (table: Usuario)
ALTER TABLE Usuario ADD CONSTRAINT Usuario_TipoUsuario FOREIGN KEY Usuario_TipoUsuario (id_tipo_usuario)
    REFERENCES TipoUsuario (id_tipo_usuario);

-- Reference: Venta_Cliente (table: Venta)
ALTER TABLE Venta ADD CONSTRAINT Venta_Cliente FOREIGN KEY Venta_Cliente (id_cliente)
    REFERENCES Cliente (id_cliente);

-- Reference: Venta_Usuario (table: Venta)
ALTER TABLE Venta ADD CONSTRAINT Venta_Usuario FOREIGN KEY Venta_Usuario (id_usuario)
    REFERENCES Usuario (id_usuario);

-- End of file.


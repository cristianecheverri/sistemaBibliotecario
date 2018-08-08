create table biblioteca (
	id_biblioteca serial primary key NOT NULL,
	nombre varchar(100) NOT NULL,
	direccion varchar(50),
	correo varchar(50),
	telefono integer,
	unique (correo)
);

create table sala (
	id_sala integer primary key NOT NULL,
	nombre varchar(50),
	fk_biblioteca integer NOT NULL,
	foreign key (fk_biblioteca) references biblioteca(id_biblioteca)
);

create table estante (
	id_estante integer primary key NOT NULL,
	fk_sala integer NOT NULL,
	foreign key (fk_sala) references sala(id_sala)
);

create table categoria (
	id_categoria integer primary key NOT NULL,
	nombre varchar(50)
);

create table estante_categoria(
	id_estante_categoria integer primary key NOT NULL,
	fk_estante integer NOT NULL,
	fk_categoria integer NOT NULL,
	foreign key (fk_estante) references estante(id_estante),
	foreign key (fk_categoria) references categoria(id_categoria)
);

create table autor (
	id_autor integer primary key NOT NULL,
	nombre varchar(50) NOT NULL,
	fechaNac_Muer integer,
	nacionalidad varchar(50)
);

create table libro (
	id_libro serial primary key NOT NULL,
	isbn varchar(20),
	nombre varchar(75) NOT NULL,
	lugar_editorial varchar(100),
	fk_autor integer,
	num_pag varchar(10),
	fk_categoria integer NOT NULL,
	foreign key (fk_autor) references autor(id_autor),
	foreign key (fk_categoria) references categoria(id_categoria)
);

create table usuario (
	id_usuario integer primary key NOT NULL,
	nombre varchar(50) NOT NULL,
	contrasena varchar(250) NOT NULL,
	tipo_usuario varchar(50) NOT NULL
);

create table transaccion (
	id_transaccion integer primary key NOT NULL,
	fk_libro integer NOT NULL,
	fk_usuario integer,
	tipo_transaccion varchar(20) default 'Prestamo' NOT NULL,
	fecha_prestamo date NOT NULL,
	fecha_devolucion date,
	foreign key (fk_libro) references libro(id_libro),
	foreign key (fk_usuario) references usuario(id_usuario)
);

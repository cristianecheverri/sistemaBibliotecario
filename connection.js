const Sequelize = require('sequelize');
const BibliotecaModel = require('./models/biblioteca');
const SalaModel = require('./models/sala');
const EstanteModel = require('./models/estante');
const CategoriaModel = require('./models/categoria');
const AutorModel = require('./models/autor');
const LibroModel = require('./models/libro');
const UsuarioModel = require('./models/usuario');
const TransaccionModel = require('./models/transaccion')

const sequelize = new Sequelize('biblioteca', 'postgres', 'admin',
    {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Biblioteca = BibliotecaModel(sequelize, Sequelize);
const Sala = SalaModel(sequelize, Sequelize);
const Estante_Categoria = sequelize.define('estante_categoria',
    {
        id_estante_categoria: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        tableName: 'estante_categoria',
        createdAt: false,
        updatedAt: false
    }
);
const Estante = EstanteModel(sequelize, Sequelize);
const Categoria = CategoriaModel(sequelize, Sequelize);
const Autor = AutorModel(sequelize, Sequelize);
const Libro = LibroModel(sequelize, Sequelize);
const Usuario = UsuarioModel(sequelize, Sequelize);
const Transaccion = TransaccionModel(sequelize, Sequelize);

Biblioteca.hasMany(Sala, { foreignKey: 'fk_biblioteca', });
Sala.belongsTo(Biblioteca, { foreignKey: 'fk_biblioteca', });

Sala.hasMany(Estante, { foreignKey: 'fk_sala', sourceKey: 'id_sala' });
Estante.belongsTo(Sala, { foreignKey: 'fk_sala', targetKey: 'id_sala' });

Estante.belongsToMany(Categoria, { foreignKey: 'fk_estante', through: Estante_Categoria, unique: false });
Categoria.belongsToMany(Estante, { foreignKey: 'fk_categoria', through: Estante_Categoria, unique: false });

Autor.hasMany(Libro, { foreignKey: 'fk_autor', sourceKey: 'id_autor' });
Libro.belongsTo(Autor, { foreignKey: 'fk_autor', targetKey: 'id_autor' });

Categoria.hasMany(Libro, { foreignKey: 'fk_estante_categoria', sourceKey: 'id_categoria' });
Libro.belongsTo(Estante_Categoria, { foreignKey: 'fk_estante_categoria' });

Usuario.belongsToMany(Libro, { through: Transaccion, foreignKey: 'fk_usuario' });
Libro.belongsToMany(Usuario, { through: Transaccion, foreignKey: 'fk_libro' });


sequelize.sync({ force: false }).then(() => {
    console.log('\n¡Database and tables created!');
});

module.exports = {
    Biblioteca,
    Sala,
    Estante,
    Categoria,
    Autor,
    Libro,
    Usuario,
    Transaccion
}

// Biblioteca.create({
//     nombre: 'Centro cultural Anserma',
//     direccion: 'Cra3',
//     correo: 'centrocultural@gmail.com',
//     telefono: '3216547890'
// });

// Libro.create({
//     nombre: 'Harry potter y la piedra filosofal'
// })

/*
Biblioteca.update({
    nombre: 'Centro cultural Anserma',
    direccion: 'Cra3',
    correo: 'centrocultural@gmail.com',
    telefono: '3216547890'
},{
    where: {
        id_biblioteca: '2',
    }
});
*/

// Sala.create({
//     nombre: 'General',
//     fk_biblioteca: '1'
// });



// Estante.create({
//     fk_sala: '1'
// });


// Categoria.create({
//     nombre: 'Fantasía'
// });

// Estante_Categoria.create({
//     fk_estante: '1',
//     fk_categoria: '1'
// });

// Autor.create({
//     nombre: 'J. K. Rowling'
// });

// Libro.create({
//     isbn: '84-6987-6985',
//     nombre: 'Harry Potter y la piedra filosofal',
//     fk_autor: '1',
//     fk_categoria: '1',
//     editorial: 'Salamandra'
// });

// Usuario.create({
//     documento: 1054926307,
//     nombres: 'Cristian',
//     apellidos: 'Echeverri',
//     telefono: '3218893338',
//     correo: 'cristiancamilo14041999@gmail.com',
//     contrasena: '1234',
//     tipo_usuario: 'admin'
// });

// Transaccion.create({
//     fk_libro: 1,
//     fk_usuario: 1054926307,
//     tipo_transaccion: 'Prestamo',
//     fecha_solicitud: '2018-10-10',
//     fecha_devolucion: '2018-10-20'
// });

// Biblioteca.findAll({
//     attributes: ['nombre', 'direccion']
// });
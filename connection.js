const Sequelize = require('sequelize');
const BibliotecaModel = require('./models/biblioteca');
const SalaModel = require('./models/sala');
const EstanteModel = require('./models/estante');
const CategoriaModel = require('./models/categoria');
const AutorModel = require('./models/autor');
const LibroModel = require('./models/libro');
const UsuarioModel = require('./models/usuario');
const TransaccionModel = require('./models/transaccion')

const sequelize = new Sequelize('biblioteca', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Biblioteca = BibliotecaModel(sequelize, Sequelize);
const Sala = SalaModel(sequelize, Sequelize);
const Estante_Categoria = sequelize.define('estante_categoria', {}, { tableName: 'estante_categoria', createdAt: false, updatedAt: false });
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

Categoria.hasMany(Libro, { foreignKey: 'fk_categoria', sourceKey: 'id_categoria' });
Libro.belongsTo(Categoria, { foreignKey: 'fk_categoria', targetKey: 'id_categoria' });

Libro.belongsToMany(Usuario, { foreignKey: 'fk_usuario', through: Transaccion, unique: false });
Usuario.belongsToMany(Libro, { foreignKey: 'fk_libro', through: Transaccion, unique: false });


sequelize.sync({ force: true }).then(() => {
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

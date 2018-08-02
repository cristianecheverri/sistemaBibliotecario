module.exports = (sequelize, type) => {
    return sequelize.define('biblioteca', {
        id_biblioteca: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: type.STRING,
            allowNull: false
        },
        direccion: {
            type: type.STRING
        },
        correo: {
            type: type.STRING,
            unique: true
        },
        telefono: {
            type: type.STRING
        }
    },
        {
            tableName: 'biblioteca',
            createdAt: false,
            updatedAt: false
        }
    );
}
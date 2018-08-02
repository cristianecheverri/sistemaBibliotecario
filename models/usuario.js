module.exports = (sequelize, type) => {
    return sequelize.define('usuario',
        {
            documento: {
                type: type.BIGINT,
                primaryKey: true,
            },
            nombres: {
                type: type.STRING,
                allowNull: false
            },
            apellidos: {
                type: type.STRING
            },
            telefono: {
                type: type.STRING
            },
            correo: {
                type: type.STRING,
                unique: true
            },
            contrasena: {
                type: type.STRING,
                allowNull: false
            },
            tipo_usuario: {
                type: type.STRING,
                allowNull: false
            },
            createdAt: type.DATEONLY,
            updatedAt: type.DATEONLY
        },
        {
            tableName: 'usuario',
        }
    );
}
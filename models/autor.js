module.exports = (sequelize, type) => {
    return sequelize.define('autor',
        {
            id_autor: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: type.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'autor',
            createdAt: false,
            updatedAt: false
        }
    );
}
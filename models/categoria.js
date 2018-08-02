module.exports = (sequelize, type) => {
    return sequelize.define('categoria',
        {
            id_categoria: {
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
            tableName: 'categoria',
            createdAt: false,
            updatedAt: false
        }
    );
}
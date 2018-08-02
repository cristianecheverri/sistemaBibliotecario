module.exports = (sequelize, type) => {
    return sequelize.define('estante',
        {
            id_estante: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            tableName: 'estante',
            createdAt: false,
            updatedAt: false
        }
    );
}
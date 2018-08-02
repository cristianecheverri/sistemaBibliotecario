module.exports = (sequelize, type) => {
    return sequelize.define('sala',
        {
            id_sala: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: type.STRING
            }
        },
        {
            tableName: 'sala',
            createdAt: false,
            updatedAt: false
        }
    );
}
module.exports = (sequelize, type) => {
    return sequelize.define('transaccion',
        {
            id_transaccion: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tipo_transaccion: {
                type: type.STRING,
                allowNull: false
            },
            fecha_solicitud: {
                type: type.DATEONLY,
                allowNull: false
            },
            fecha_devolucion: {
                type: type.DATEONLY,
                allowNull: false
            },
            createdAt: type.DATEONLY,
            updatedAt: type.DATEONLY
        },
        {
            tableName: 'transaccion'
        }
    );
}
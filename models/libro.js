module.exports = (sequelize, type) => {
    return sequelize.define('libro',
        {
            id_libro: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            isbn: {
                type: type.STRING
            },
            nombre: {
                type: type.STRING,
                allowNull: false
            },
            lugar: {
                type: type.STRING
            },
            editorial: {
                type: type.STRING
            },
            numero_paginas: {
                type: type.INTEGER
            },
            createdAt: type.DATEONLY,
            updatedAt: type.DATEONLY
        },
        {
            tableName: 'libro'
        }
    );
}
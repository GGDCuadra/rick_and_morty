const { Datatypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Favorite', {
        id:{
            type :Datatypes.INTEGER,
            primaryKey:true,
            allowNull: true
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        status: {
            type: Datatypes.ENUM('Alive', 'Dead', 'unknonw' ),
            allowNull: false
        },
        species: {
            type: Datatypes.STRING,
            allowNull: false
        },
        gender: {
            type: Datatypes.ENUM('Female','Male' , 'Genderless', 'unknown'),
            allowNull: false
        },
        origin: {
            type: Datatypes.STRING,
            allowNull: false
        },
        image: {
            type: Datatypes.STRING,
            allowNull: false
        }
    }, {timestamps:false});
}
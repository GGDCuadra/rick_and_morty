const { Datatypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
           /*  autoIncrement: true, */
            primaryKey:true
        },
        email: {
            type:  Datatypes.STRING,
            allowNull: false,
            isEmail: true
        },
        password:{
            type: Datatypes.STRING,
            allowNull : false,
        },
    }, {timestamps:false});
}
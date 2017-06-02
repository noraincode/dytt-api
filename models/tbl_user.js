/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 05:26:05
 * @modify date 2017-04-19 05:26:05
 * @desc [description]
*/

'use strict';

module.exports = function(sequelize, DataTypes){
    return sequelize.define('User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        age : {
            type: DataTypes.INTEGER(3)
        }
    },{
        tableName: 'tbl_user',
        freezeTableName: true,
        timestamps: false
    })
}
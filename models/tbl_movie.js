/**
 * @author [norain]
 * @email [norain4u@yeah.net]
 * @create date 2017-04-19 05:26:05
 * @modify date 2017-04-19 05:26:05
 * @desc [description]
*/

'use strict';

module.exports = function(sequelize, DataTypes){
    return sequelize.define('Movie',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        btLink: {
            type: DataTypes.STRING(1000),
            defaultValue : '',
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING(100),
            defaultValue : '',
            allowNull: false
        },
        transName: {
            type: DataTypes.STRING(100),
            defaultValue : '',
            allowNull: false
        },
        filmName: {
            type: DataTypes.STRING(100),
            defaultValue : '',
            allowNull: false
        },
        year: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        place: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        movietype: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        language: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        subtitles: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        imdb: {
            type: DataTypes.STRING(100),
            defaultValue : '',
            allowNull: false
        },
        douban: {
            type: DataTypes.STRING(100),
            defaultValue : '',
            allowNull: false
        },
        director: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        staring: {
            type: DataTypes.STRING(50),
            defaultValue : '',
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            defaultValue : '',
            allowNull: false
        }
    },{
        tableName: 'tbl_movie',
        freezeTableName: true,
        timestamps: false
    })
}
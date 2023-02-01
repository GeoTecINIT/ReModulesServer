module.exports = (sequelize, Sequelize) => {
    return sequelize.define("file", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        time_stamp: {
            type: Sequelize.DATE,
            allowNull: false
        },
        monitoring_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {schema: 'release', timestamps: false, tableName: 'file'});
}
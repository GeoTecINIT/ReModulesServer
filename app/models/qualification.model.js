
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("qualification", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {schema: 'release', timestamps: false, tableName: 'qualification'});
}
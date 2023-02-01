module.exports = (sequelize, Sequelize) => {
    return sequelize.define("tipology", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {schema: 'release', timestamps: false, tableName: 'tipology'});
}
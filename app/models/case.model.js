module.exports = (sequelize, Sequelize) => {
    return sequelize.define("case", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {schema: 'release', timestamps: false, tableName: 'case'});
}
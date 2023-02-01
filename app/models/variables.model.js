module.exports = (sequelize, Sequelize) => {
    return sequelize.define("variables", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {schema: 'release', timestamps: false, tableName: 'variables'});
}
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("season", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {schema: 'release', timestamps: false, tableName: 'season'});
}
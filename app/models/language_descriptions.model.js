module.exports = (sequelize, Sequelize) => {
    return sequelize.define("language_descriptions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        country: {
            type: Sequelize.STRING
        },
        name_other_language: {
            type: Sequelize.STRING
        },
        short_description: {
            type: Sequelize.STRING
        },
        long_description: {
            type: Sequelize.STRING
        },
        tool_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'tools',
              key: 'uid'
            }
        },
    }, {schema: 'release', timestamps: false, tableName: 'language_descriptions'});
}
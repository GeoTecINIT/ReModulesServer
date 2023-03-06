module.exports = (sequelize, Sequelize) => {
    return sequelize.define("tools_images", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
    }, {schema: 'release', timestamps: false, tableName: 'tools_images'});
}
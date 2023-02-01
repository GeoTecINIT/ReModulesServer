module.exports = (sequelize, Sequelize) => {
    return sequelize.define("images", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        testimony_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
              model: 'testimony',
              key: 'id'
            }
        },
    }, {schema: 'release', timestamps: false, tableName: 'images'});
}
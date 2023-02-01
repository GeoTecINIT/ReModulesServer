module.exports = (sequelize, Sequelize) => {
    return sequelize.define("testimony", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        quote: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        video_url: {
            type: Sequelize.STRING
        },
        cee_building_dwelling_id: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {schema: 'release', timestamps: false, tableName: 'testimony'});
}
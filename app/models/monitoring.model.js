module.exports = (sequelize, Sequelize) => {
    return sequelize.define("monitoring", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cee_building_dwelling_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        season_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'season',
              key: 'id'
            }
        },
        phase_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'phase',
              key: 'id'
            }
        },
        family_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'family',
              key: 'id'
            }
        },
        variables_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
          
    }, {schema: 'release', timestamps: false, tableName: 'monitoring'});
}
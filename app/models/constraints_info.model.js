module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constraints_info", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profiles: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'tools_profiles',
              key: 'id'
            }
        },
        constraint_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'constraints_type',
              key: 'id'
            }
        },
        constraint_category: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'constraints_category',
              key: 'id'
            }
        },
        tool_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'tools',
              key: 'uid'
            }
        },
    }, {schema: 'release', timestamps: false, tableName: 'constraints_info'});
}
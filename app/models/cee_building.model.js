module.exports = (sequelize, Sequelize) => {
    return sequelize.define("cee_building", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.STRING
      },
      map_address: {
        type: Sequelize.STRING
      },
      rc: {
        type: Sequelize.STRING
      },
      tipology_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'tools_typologies',
          key: 'id'
        }
      },
      case_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'case',
          key: 'id'
        }
      },
      year: {
        type: Sequelize.INTEGER
      },
      year_certificate: {
        type: Sequelize.INTEGER
      },
      letter_co2: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'qualification',
          key: 'id'
        }
      },
      value_co2: {
        type: Sequelize.INTEGER
      },
      letter_ep: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'qualification',
          key: 'id'
        }
      },
      value_ep: {
        type: Sequelize.INTEGER
      },
      year_certificate2: {
        type: Sequelize.INTEGER
      },
      letter_co2_cert2: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'qualification',
          key: 'id'
        }
      },
      value_co2_cert2: {
        type: Sequelize.INTEGER
      },
      letter_ep_cert2: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'qualification',
          key: 'id'
        }
      },
      value_ep_cert2: {
        type: Sequelize.INTEGER
      },
      saving_co2_abs: {
        type: Sequelize.INTEGER
      },
      saving_co2_percent: {
        type: Sequelize.INTEGER
      },
      saving_ep_abs: {
        type: Sequelize.INTEGER
      },
      saving_ep_percent: {
        type: Sequelize.INTEGER
      },
      map_url: {
        type: Sequelize.TEXT
      },
      current_regulations: {
        type: Sequelize.INTEGER
      },
      reform_year: {
        type: Sequelize.INTEGER
      },
      number_floors: {
        type: Sequelize.INTEGER
      },
      number_dwellings: {
        type: Sequelize.INTEGER
      },
      number_comercial_units: {
        type: Sequelize.INTEGER
      },
      land_surface: {
        type: Sequelize.DECIMAL
      },
      building_surface: {
        type: Sequelize.DECIMAL
      },
      heritage_building: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      construction_quality: {
        type: Sequelize.INTEGER
      },
      building_description: {
        type: Sequelize.TEXT
      },
      windows: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      wall: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      photovoltaic: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      shw: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      aerothermal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      intervention_description: {
        type: Sequelize.TEXT
      },
      renovation_pictures: {
        type: Sequelize.STRING
      },
      investment: {
        type: Sequelize.DECIMAL
      },
      renovation_subsidies: {
        type: Sequelize.DECIMAL
      },
      investment_square_meter: {
        type: Sequelize.DECIMAL
      },
      subsidies_percent: {
        type: Sequelize.DECIMAL
      },
      final_investment: {
        type: Sequelize.DECIMAL
      },
      final_investment_sqmeters: {
        type: Sequelize.DECIMAL
      },
      investment_permonth: {
        type: Sequelize.DECIMAL
      },
      potential_subsidies: {
        type: Sequelize.DECIMAL
      },
      potential_subsidies_percent: {
        type: Sequelize.DECIMAL
      },
      potential_final_investment: {
        type: Sequelize.DECIMAL
      },
      potential_final_investment_m2: {
        type: Sequelize.DECIMAL
      },
      potential_final_inv_month: {
        type: Sequelize.DECIMAL
      },
      investment_dwelling: {
        type: Sequelize.DECIMAL
      },
      subsidies_percent_dwelling: {
        type: Sequelize.DECIMAL
      },
      final_investment_dwelling: {
        type: Sequelize.DECIMAL
      },
      final_inv_sqmeters_dwellings: {
        type: Sequelize.DECIMAL
      },
      inv_permonth_dwellings: {
        type: Sequelize.DECIMAL
      },
      potential_subsidies_dw: {
        type: Sequelize.DECIMAL
      },
      potential_subsidies_percent_dw: {
        type: Sequelize.DECIMAL
      },
      potential_final_investment_dw: {
        type: Sequelize.DECIMAL
      },
      potential_final_inv_m2_dw: {
        type: Sequelize.DECIMAL
      },
      potential_final_inv_month_dw: {
        type: Sequelize.DECIMAL
      },
      dwelling_id: {
        type: Sequelize.STRING,
        unique: true
      },
      type_reform: {
        type: Sequelize.DECIMAL
      },
      coordinates: {
        type: Sequelize.JSON,
      },
      point: {
        type: Sequelize.JSON,
      }
    }, {schema: 'release',  timestamps: false, tableName: 'cee_building'});
  };
  
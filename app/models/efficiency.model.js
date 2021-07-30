module.exports = (sequelize, Sequelize) => {
  return sequelize.define("efficiency", {
    efficiency_code: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    category_pic_code: {
      type: Sequelize.STRING
    },
    building_variant_code: {
      type: Sequelize.STRING
    },
    code_system_measure: {
      type: Sequelize.STRING
    },
    level_improvement: {
      type: Sequelize.STRING
    },
    energy_demand: {
      type: Sequelize.INTEGER
    },
    recovered_heat_ventilation: {
      type: Sequelize.INTEGER
    },
    fossil_fuels: {
      type: Sequelize.INTEGER
    },
    biomass: {
      type: Sequelize.INTEGER
    },
    electricity: {
      type: Sequelize.INTEGER
    },
    district_heating: {
      type: Sequelize.INTEGER
    },
    other: {
      type: Sequelize.INTEGER
    },
    produced_electricity: {
      type: Sequelize.INTEGER
    },
    renewable_p_energy: {
      type: Sequelize.INTEGER
    },
    total_p_energy: {
      type: Sequelize.INTEGER
    },
    non_renewable_pe: {
      type: Sequelize.INTEGER
    },
    renewable_pe_demand: {
      type: Sequelize.INTEGER
    },
    CO2_emissions: {
      type: Sequelize.INTEGER
    },
    energy_costs: {
      type: Sequelize.INTEGER
    },
  }, {schema: 'release', timestamps: false, tableName: 'efficiency'});
};

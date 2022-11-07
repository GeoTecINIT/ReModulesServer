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
      typology: {
        type: Sequelize.STRING
      },
      case: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      year_certificate: {
        type: Sequelize.INTEGER
      },
      letter_co2: {
        type: Sequelize.STRING
      },
      value_co2: {
        type: Sequelize.INTEGER
      },
      letter_ep: {
        type: Sequelize.STRING
      },
      value_ep: {
        type: Sequelize.INTEGER
      },
      year_certificate2: {
        type: Sequelize.INTEGER
      },
      letter_co2_cert2: {
        type: Sequelize.STRING
      },
      value_co2_cert2: {
        type: Sequelize.INTEGER
      },
      letter_ep_cert2: {
        type: Sequelize.STRING
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
      coordinates: {
        type: Sequelize.JSON
      },
      point: {
        type: Sequelize.JSON
      }
    }, {schema: 'release',  timestamps: false, tableName: 'cee_building'});
  };
  
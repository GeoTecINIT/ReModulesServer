const { DataTypes, Deferrable } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("tools", {
      uid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      country_origin: {
        type: Sequelize.STRING
      },
      app_name: {
        type: Sequelize.STRING
      },
      app_name_origin: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      short_description: {
        type: Sequelize.TEXT
      },
      long_description: {
        type: Sequelize.TEXT
      },
      short_description_origin: {
        type: Sequelize.TEXT
      },
      long_description_origin: {
        type: Sequelize.TEXT
      },
      main_image: {
        type: Sequelize.STRING
      },
      video_url: {
        type: Sequelize.STRING
      },
      prototype: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      login_access: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      access_characteristics: {
        type: Sequelize.STRING
      },
      open_source: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      repo_url: {
        type: Sequelize.STRING
      },
      api_url: {
        type: Sequelize.STRING
      },
      countries: {
        type: Sequelize.STRING
      },
      expert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      solutions: {
        type: Sequelize.STRING
      },
      typologies: {
        type: Sequelize.STRING
      },
      stops: {
        type: Sequelize.STRING
      },
      steps: {
        type: Sequelize.STRING
      },
      training_url: {
        type: Sequelize.STRING
      },
      country_languages: {
        type: Sequelize.STRING
      },
      app_owner: {
        type: Sequelize.STRING
      },
      webpage: {
        type: Sequelize.STRING
      },
      contact_email_proposal: {
        type: Sequelize.STRING
      },
      contact_email_owner: {
        type: Sequelize.STRING
      },
    }, {schema: 'release', timestamps: false, tableName: 'tools'});
  };
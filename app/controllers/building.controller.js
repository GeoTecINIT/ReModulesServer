const db = require('../models');
const Years = db.Years;
const Category = db.Category;
const Altitude = db.Altitude;
const ClimateZoneCode = db.CliZoneCode
const Op = db.Sequelize.Op;


exports.getYearCode = ( req, res) => {
  const year = req.params.year;
  let condition = {
    [Op.and]: [
      { first_year: { [Op.lte]: year}},
      { last_year: { [Op.gte]: year }}
    ]
  };
  Years.findOne( {
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving year code."
      });
    });
};

exports.getBuildingCode = ( req, res ) => {
  const typoCode = req.params.code;
  let condition = {
    category_code: typoCode
  };
  Category.findOne( {
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving typology code."
      });
    });
};

exports.getAltitude = ( req, res ) => {
  const country = req.params.country;
  const climate_code = req.params.climate;
  const height = parseFloat(req.params.height);
  let condition = {
    [Op.and]: [
      { country_code: country},
      { climate_code: climate_code },
      { minimum_height: { [Op.lte]: height}},
      { maximum_height: { [Op.gte]: height }}
    ]
  };
  Altitude.findOne( {
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving typology code."
      });
    });
};

exports.getClimateSubZone = ( req, res ) => {
  const altitude = req.params.altitude;
  const province = req.params.province;
  const country = req.params.country;
  const climate_code = req.params.climate;
  let condition = {
    [Op.and]: [
      { country_code: country},
      { climate_code: climate_code },
      { province_code: province },
      { altitude_code: altitude },
    ]
  };
  ClimateZoneCode.findOne( {
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving typology code."
      });
    });
};

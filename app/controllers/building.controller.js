const db = require('../models');
const Years = db.Years;
const Category = db.Category;
const Altitude = db.Altitude;
const ClimateZoneCode = db.CliZoneCode;
const ClimateZone = db.ClimateZone;
const CategoryPics = db.CategoryPics;
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

exports.getTypologyCode = ( req, res ) => {
  const category_code = req.params.category;
  const year = req.params.year;
  const country_code = req.params.country;
  const climate_code = req.params.zone;
  const conditionCategory = { category_code: category_code};

  const condition = { country_code : country_code};
  const conditionClimate = {
    [Op.and]: [
      { climate_code: climate_code},
      { country_code: country_code }
    ]
  };

  const conditionUnion = {
    [Op.and]: [
      { first_year: { [Op.lte]: year}},
      { last_year: { [Op.gte]: year }}
    ]
  };

  CategoryPics.findAll({
    where: condition,
    include: [{
      attributes: ['year_code'],
      model: Years,
      where: conditionUnion
    }, {
      model: Category,
      where: conditionCategory,
      attributes: ['category_code', 'name', 'building_code'],
    }, {
      model: ClimateZone,
      where: conditionClimate
    }] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving picture."
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

exports.getClimateZone = ( req, res ) => {
  const country = req.params.country;
  const climate_code = req.params.climate;
  let condition = {
    [Op.and]: [
      { country_code: country},
      { climate_code: climate_code },
    ]
  };
  ClimateZone.findOne( {
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving climate zone."
      });
    });
};

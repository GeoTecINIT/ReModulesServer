const db = require('../models');
const CategoryPics = db.CategoryPics;
const Years = db.Years;
const Category = db.Category;
const Enveloped = db.Enveloped;
const EnvelopeCategory = db.EnvelopeCategory;
const ComponentType = db.ComponentType;
const SystemType = db.SystemType;
const SystemCode = db.SystemCode;
const Altitude = db.Altitude;
const ClimateZoneCode = db.CliZoneCode;
const Op = db.Sequelize.Op;

exports.getPics = (req, res) => {
  const year = req.params.year;
  const country_code = req.params.country;
  const climate_code = req.params.zone;

  const condition = year && country_code && climate_code ? {
    [Op.and]: [
      { country_code: country_code },
      { climate_code: climate_code }
    ]
  } : null;

  let conditionUnion = {
    [Op.and]: [
      { first_year: { [Op.lte]: year}},
      { last_year: { [Op.gte]: year }}
    ]
  };

  CategoryPics.findAll({
    attributes: ['category_pic_code', 'name'],
    where: condition,
    include: [{
      attributes: ['year_code'],
      model: Years,
      where: conditionUnion
    }, {
      model: Category,
      attributes: ['category_code', 'name', 'building_code'],
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

exports.getEnvelope = (req, res) => {
  const year = req.params.year;
  const country_code = req.params.country;
  const climate_code = req.params.zone;
  const category_code = req.params.category;

  const conditionUnion = year && country_code && climate_code ? {
    [Op.and]: [
      { country_code: country_code },
      { climate_code: climate_code }
    ]
  } : null;

  let condition = {
    [Op.and]: [
      { category_code: category_code},
      { year_code: year }
    ]
  };

  EnvelopeCategory.findAll({
    attributes: ['code'],
    where: condition,
    include: [{
      attributes: ['description', 'type_construction', 'picture', 'u_value'],
      model: Enveloped,
      where: conditionUnion
    }, {
      model: ComponentType,
      attributes: ['name', 'component_code'],
    }] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving envelope."
      });
    });
};

exports.getSystem = (req, res) => {
  const year = req.params.year;
  const country_code = req.params.country;
  const climate_code = req.params.zone;
  const building_code = req.params.building;

  let condition = {
    [Op.and]: [
      { country_code: country_code},
      { year_code: year },
      { climate_code: climate_code },
      { building_code: building_code },
    ]
  };

  SystemType.findAll({
    where: condition,
    include: [{
      attributes: ['description_system', 'system_type', 'pictures'],
      model: SystemCode,
      as: 'System_code'
    }] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving system."
      });
    });
};

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
  const height = parseInt(req.params.height);
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

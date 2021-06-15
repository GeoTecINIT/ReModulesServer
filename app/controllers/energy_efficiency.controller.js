const db = require('../models');
const CategoryPics = db.CategoryPics;
const Years = db.Years;
const Category = db.Category;
const Enveloped = db.Enveloped;
const EnvelopeCategory = db.EnvelopeCategory;
const ComponentType = db.ComponentType;
const SystemType = db.SystemType;
const SystemCode = db.SystemCode;
const EnergyScore = db.EnergyScore;
const ScoreChart = db.ScoreChart;
const ClimateZone = db.ClimateZone;
const Op = db.Sequelize.Op;

exports.getPics = (req, res) => {
  const year = req.params.year;
  const country_code = req.params.country;
  const id_climate = req.params.zone;

  let condition = year && country_code ?
      { country_code: country_code } : null;

  if ( country_code === 'GR') {
    condition = {
      country_code : country_code,
      data_type : 'ReEx'
    }
  } else if (country_code === 'BG' ) {
    condition = {
      country_code : country_code,
      add_parameter : 'Gen'
    }
  }

  let conditionClimate = {
    [Op.and]: [
      { id_climate: id_climate},
      { country_code: country_code }
    ]
  };

  let conditionUnion = {
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

exports.getEnvelope = (req, res) => {
  const country_code = req.params.country;
  const category_pic_code = req.params.category;

  const conditionUnion = country_code ? {
    [Op.and]: [
      { country_code: country_code }
    ]
  } : null;

  let condition = {
    [Op.and]: [
      { category_pic_code: category_pic_code}
    ]
  };

  EnvelopeCategory.findAll({
    attributes: ['code'],
    where: condition,
    include: [{
      attributes: ['enveloped_code', 'description', 'type_construction', 'picture', 'u_value', 'area'],
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

exports.getEnergyScore = ( req, res ) => {
  const country = req.params.country;
  const climate_code = req.params.climate_code;
  const climate_zone = req.params.climate_zone;
  const year_code = req.params.year_code;
  const category_code = req.params.category_code;
  let condition = {
    [Op.and]: [
      { country_code: country},
      { climate_code: climate_code },
      { climate_zone: climate_zone },
      { year_code: year_code },
      { category_code: category_code },
    ]
  };
  EnergyScore.findOne( {
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

exports.getScoreChart= ( req, res ) => {
  const energy_score = req.params.energy_score;
  let condition = {
    [Op.and]: [
      { energy_score_code: energy_score}
    ]
  };
  ScoreChart.findAll( {
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

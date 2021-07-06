const db = require('../models');
const CategoryPics = db.CategoryPics;
const Years = db.Years;
const Category = db.Category;
const Enveloped = db.Enveloped;
const EnvelopeCategory = db.EnvelopeCategory;
const ComponentType = db.ComponentType;
const SystemTypes = db.SystemTypes;
const EnergyScore = db.EnergyScore;
const ScoreChart = db.ScoreChart;
const ClimateZone = db.ClimateZone;
const Measures = db.Measures;
const ImprovingBuilding = db.ImprovingBuilding;
const MeasuresBuilding = db.MeasuresBuilding;
const HeatingSystem = db.HeatingSystem;
const SystemMeasures = db.SystemMeasures;
const WaterSystem = db.WaterSystem;
const VentilationSystem = db.VentilationSystem;
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
  const category_pic_code = req.params.category_pic_code;

  let condition = {
    category_pic_code: category_pic_code,
    level_improvement: 'Actual conditions'
  };

  SystemTypes.findAll({
    where: condition,
    include: [{
          model: HeatingSystem,
          as: 'heating'
        },
      {
        model: WaterSystem,
        as: 'water'
      },
      {
        model: VentilationSystem,
        as: 'ventilation'
      },
      {
        model: SystemMeasures
      }
    ] })
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

exports.getRefurbishment= ( req, res ) => {
  const category_pic_code = req.params.category_pic_code;
  let condition = {
    category_pic_code: category_pic_code
  };
  MeasuresBuilding.findAll( {
    include: [{
      attributes: ['building_variant_code','number_building_variant','level_improvement', 'type_variant', 'building_variant_description', 'building_variant_description_original'],
      model: ImprovingBuilding,
      where: condition
    }, {
      attributes: ['measure_code', 'measure_type', 'variant_measure_type', 'description_measure_type', 'description_measure_type_original', 'picture', 'u_value'],
      model: Measures,
      include: {
        model: ComponentType
      }
    }]
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

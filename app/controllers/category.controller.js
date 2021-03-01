const db = require('../models');
const CategoryPics = db.CategoryPics;
const Years = db.Years;
const Category = db.Category;
const Enveloped = db.Enveloped;
const EnvelopeCategory = db.EnvelopeCategory;
const ComponentType = db.ComponentType;
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

  var conditionUnion = {
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
      attributes: ['category_code', 'name'],
    }] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
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

  var condition = {
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
          err.message || "Some error occurred while retrieving user."
      });
    });
};

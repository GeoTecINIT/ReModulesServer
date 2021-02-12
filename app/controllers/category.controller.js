const db = require('../models');
const CategoryPics = db.CategoryPics;
const Years = db.Years;
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
    where: condition,
    include: [{
      model: Years,
      where: conditionUnion
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

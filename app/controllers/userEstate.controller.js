
const db = require('../models');
const Building = db.Building;
const UserBuilding = db.UserBuilding;
const Users = db.User;
const Enveloped = db.Enveloped;
const System = db.SystemCode;
const EnergyScore = db.EnergyScore;
const ScoreChart = db.ScoreChart;
const UserBuildingEnveloped = db.UserBuildingEnveloped;
const UserBuildingSystem = db.UserBuildingSystem;
const UserBuildingEnergyScore = db.UserBuildingEnergyScore;
const UserBuildingScoreChart = db.UserBuildingScoreChart;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  const buildingToSave = {
    rc: req.body.rc,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng,
    year: req.body.year,
    use: req.body.use,
    surface: req.body.surface,
    country: req.body.country,
    climate_zone: req.body.climate_zone,
    climate_sub_zone: req.body.climate_sub_zone,
    region: req.body.region,
    province_code: req.body.province_code,
    province_name: req.body.province_name,
    altitude_code: req.body.altitude_code,
    x: req.body.x,
    y: req.body.y
  };
  Users.findOne({ where: { uid: req.body.uid}}).then( user => {
    let buildingId = buildingToSave.rc !== '-' ? {where: { rc: buildingToSave.rc}}: {where: 1};
    Building.findOne(buildingId).then( estate => {
      if ( estate !== null ){
        const userEstate = {
          user_id: user.uid,
          building_id: estate.id,
          year: req.body.year,
          year_code: req.body.year_code,
          typology_code: req.body.typology_code,
          typology_name: req.body.typology_name,
          building_code: req.body.building_code
        };
        UserBuilding.create(userEstate)
          .then( data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Estate."
            });
          });
      } else {
        Building.create(buildingToSave)
          .then(dataBuilding => {
            const userEstate = {
              user_id: user.uid,
              building_id: dataBuilding.id,
              year: req.body.year,
              year_code: req.body.year_code,
              typology_code: req.body.typology_code,
              typology_name: req.body.typology_name,
              building_code: req.body.building_code
            };
            console.log('Datos a ingresar Del building!!!! ', userEstate);
            UserBuilding.create(userEstate)
              .then( dataUserBuilding => {
                const userEnergyScore = {
                  energy_score_id: req.body.energy_score_code,
                  building_id: dataUserBuilding.id
                };
                console.log('Datos a ingresar Antes!!!! ', userEnergyScore);
                // energy score
                UserBuildingEnergyScore.create(userEnergyScore)
                  .then( data => {
                    console.log('Datos a ingresar!!!! ', userEnergyScore, ' -- ', data);
                    // Enveloped data
                    Object.entries( req.body.enveloped ).forEach(([key, value]) => {
                      const userEnveloped = {
                        enveloped_id: value,
                        building_id: dataUserBuilding.id
                      };
                      UserBuildingEnveloped.create(userEnveloped)
                        .catch(err => {
                          res.status(500).send({
                            message:
                              err.message || "Some error occurred while creating the User Building Enveloped."
                          });
                        });
                    });
                    // system data
                    Object.entries( req.body.system ).forEach(([key, value]) => {
                      const userSystem = {
                        system_id: value,
                        building_id: dataUserBuilding.id
                      };
                      UserBuildingSystem.create(userSystem)
                        .catch(err => {
                          res.status(500).send({
                            message:
                              err.message || "Some error occurred while creating the User Building System."
                          });
                        });
                    });
                    // score chart data
                    Object.entries( req.body.score_chart ).forEach(([key, value]) => {
                      const userScoreChart = {
                        score_chart_id: value,
                        building_id: dataUserBuilding.id
                      };
                      UserBuildingScoreChart.create(userScoreChart)
                        .catch(err => {
                          res.status(500).send({
                            message:
                              err.message || "Some error occurred while creating the User Building score chart."
                          });
                        });
                    });
                  })
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while creating the  User Building Energy Score."
                    });
                  });
                res.send(dataUserBuilding);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the User Building."
                });
              });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Building."
            });
          });
      }
    });
  });
};

exports.findHistoryByUser = (req, res) => {
  const user = req.params.id;
  const condition = user ? { user_id: `${user}` } : null;

  UserBuilding.findAll({
    where: condition,
    include: [
      {
        model: Enveloped,
      },
      {
        model: System,
      },
      {
        model: ScoreChart,
      },
      {
        model: EnergyScore,
      },
      {
        model: Building,
      }
    ],

  })
    .then(userBuildingData  => {
      res.send(userBuildingData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

exports.getUses = (req, res) => {
  Estate.aggregate('use', 'DISTINCT', { plain: false})
    .then( data =>{
      res.send(data);
    })
    .catch( err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving uses."
      });
    });
};

exports.deletePropFromHistory = ( req, res ) => {

  const user = req.params.user;
  const prop = req.params.rc;
  const condition = user && prop ? {
    [Op.and]: [
      { id_user: `${user}`},
      { id_estate: `${prop}`}
    ]
  } : null;
  UserEstate.destroy({
    where: condition
  })
  .then(data => {
    res.sendStatus(200);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing ${prop} from history."
    });
  });
};

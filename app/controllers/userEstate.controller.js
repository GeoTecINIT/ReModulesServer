const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const Building = db.Building;
const UserBuilding = db.UserBuilding;
const Users = db.User;
const Enveloped = db.Enveloped;
const System = db.SystemCode;
const EnergyScore = db.EnergyScore;
const ScoreChart = db.ScoreChart;
const ComponentType = db.ComponentType;
const HeatingSystem = db.HeatingSystem;
const SystemMeasures = db.SystemMeasures;
const WaterSystem = db.WaterSystem;
const VentilationSystem = db.VentilationSystem;
const SystemTypes = db.SystemTypes;
const Efficiency = db.Efficiency;
const Measures = db.Measures;
const ImprovingBuilding = db.ImprovingBuilding;
const MeasuresBuilding = db.MeasuresBuilding;
const EnvelopeCategory = db.EnvelopeCategory;
const Op = db.Sequelize.Op;

exports.addBuildingToUser = async (req, res) => {
  try {
    const buildingToSave = {
      address: req.body.address,
      altitude: req.body.altitudeCode,
      climate_zone: req.body.climateZone,
      climate_sub_zone: req.body.climateSubZone,
      coordinates: req.body.coordinates,
      country: req.body.country,
      point: req.body.point,
      rc: req.body.rc ? req.body.rc : "",
      region: req.body.region,
      surface: req.body.surface,
      building_code: req.body.typology.buildingCode,
      category_code: req.body.typology.categoryCode,
      category_pic_code: req.body.typology.categoryPicCode,
      use: req.body.use,
      year: req.body.year,
      year_code: req.body.typology.yearCode,
      code_system_measure: req.body.typology.system.codeSystemMeasure,
      category_name: req.body.typology.categoryName,
      pic_name: req.body.typology.picName
    };
    const userId = req.userId;
    const user = await Users.findOne({ where: { uid: userId } });
    const estate = await Building.findOne({
      where: { address: buildingToSave.address },
    });
    if (user.uid) {
      if (estate !== null) {
      } else {
        const dataBuilding = await Building.create(buildingToSave);
        const userEstate = {
          user_id: userId,
          building_id: dataBuilding.id,
        };
        await UserBuilding.create(userEstate);
        res.status(200).send({ message: "Building saved!" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, status: 400 });
  }
};

exports.getBuildings = async (req, res) => {
  const userId = req.userId;
  const buildingToReturn = [];
  try {
    const buildings = await UserBuilding.findAll({
      attributes: [],
      include: [
        {
          model: Building,
        },
        {
          attributes: ["uid"],
          model: Users,
          where: { uid: userId },
        },
      ],
    });
    for (const build of buildings) {
      let condition = {
        [Op.and]: {
          category_pic_code: build.building.category_pic_code,
          code_system_measure: build.building.code_system_measure,
        },
      };
      const total_envelope = await EnvelopeCategory.findAll({
        attributes: ["code"],
        where: { category_pic_code: build.building.category_pic_code },
        include: [
          {
            attributes: [
              "enveloped_code",
              "description",
              "type_construction",
              "picture",
              "u_value",
              "area",
            ],
            model: Enveloped,
          },
          {
            model: ComponentType,
            attributes: ["name", "component_code"],
          },
        ],
      });
      const system = await SystemTypes.findAll({
        where: condition,
        include: [
          {
            model: HeatingSystem,
            as: "heating",
          },
          {
            model: WaterSystem,
            as: "water",
          },
          {
            model: VentilationSystem,
            as: "ventilation",
          },
          {
            model: SystemMeasures,
          },
        ],
      });
      const efficiency_building = await Efficiency.findAll({
        where: condition,
      });
      const refurbishment = await MeasuresBuilding.findAll({
        include: [
          {
            attributes: [
              "building_variant_code",
              "number_building_variant",
              "level_improvement",
              "type_variant",
              "building_variant_description",
              "building_variant_description_original",
              "number_building_variant",
            ],
            model: ImprovingBuilding,
            where: {
              category_pic_code: build.building.category_pic_code,
            },
          },
          {
            attributes: [
              "measure_code",
              "measure_type",
              "variant_measure_type",
              "description_measure_type",
              "description_measure_type_original",
              "picture",
              "u_value",
            ],
            model: Measures,
            include: {
              model: ComponentType,
            },
          },
        ],
      });
      buildingToReturn.push({
        data_building: build.building,
        envelope: total_envelope,
        systems: system,
        efficiency: efficiency_building,
        envelope_refurbishment: refurbishment,
      });
    }
    res.status(200).send(buildingToReturn);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.isFavorite = async (req, res) => {
  const userId = req.userId;
  const address = '%' + decodeURIComponent(req.params.address) + '%';
  try {
    const building = await UserBuilding.findOne({
      attributes: [],
      include: [
        {
          model: Building,
          where: {
            address: {
              [Op.like] : address
            }
          },
        },
        {
          attributes: ["uid"],
          model: Users,
          where: { uid: userId },
        },
      ],
    });
    if ( building ) {
      res.status(200).send(building.building);
    } else {
      res.status(200).send({});
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateBuildingUser = async (req, res) => {
  try {
    const buildingToSave = {
      altitude: req.body.altitudeCode,
      climate_zone: req.body.climateZone,
      climate_sub_zone: req.body.climateSubZone,
      coordinates: req.body.coordinates,
      country: req.body.country,
      point: req.body.point,
      rc: req.body.rc ? req.body.rc : "",
      region: req.body.region,
      surface: req.body.surface,
      building_code: req.body.typology.buildingCode,
      category_code: req.body.typology.categoryCode,
      category_pic_code: req.body.typology.categoryPicCode,
      use: req.body.use,
      year: req.body.year,
      year_code: req.body.typology.yearCode,
      code_system_measure: req.body.typology.system.codeSystemMeasure,
      category_name: req.body.typology.categoryName,
      pic_name: req.body.typology.picName
    };
    const userId = req.userId;
    const buildingToUpdate = await UserBuilding.findOne({
      where: { user_id: userId } ,
      include: [
        {
          model: Building,
          where: {
            address: req.body.address
          }
        }
      ]
    });
    if ( buildingToUpdate ) {
      await Building.update(buildingToSave, { where : {id: buildingToUpdate.building_id}});
      res.status(200).send({ message: "Building updated!" });
    } else {
      res.status(404).send({ message: 'Building not found', status: 400 });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, status: 400 });
  }
}
exports.deleteBuildingUser = async (req, res) => {
  try {
    await UserBuilding.destroy({
      where: {
        building_id: req.params.building
      }
    });
    res.status(200).send({ message: "Building remove from user history!" });
  } catch (err) {
    res.status(400).send({ message: err.message, status: 400 });
  }
}

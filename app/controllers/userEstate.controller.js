const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
//const { Tools } = require("../models");
const Tools = db.ToolsApplications;
const Building = db.Building;
const CEEBuilding = db.CeeBuilding;
const UserBuilding = db.UserBuilding;
const UserCeeBuilding = db.UserCEEBuilding;
const UserTool = db.UserTool;
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

exports.addUserTool = (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const userTool = {
    user_id: userId,
    tool_id: req.body.id
  };
  UserTool.create(userTool)
    .then((data) => {
          res.send(data);
      })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the User Role.",
          });
        });
};

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

exports.addBuildingCEEToUser = async (req, res) => {
  try {
    const buildingToSave = {
      address: req.body.address,
      map_address: req.body.address,
      rc: req.body.rc ? req.body.rc : "",
      typology: req.body.typology,
      case: req.body.case,
      year: req.body.year,
      image: req.body.image,
      year_certificate: req.body.yearCertificate,
      letter_co2: req.body.letterCo2,
      value_co2: req.body.valueCo2,
      letter_ep: req.body.letterEp,
      value_ep: req.body.valueEp,
      year_certificate2: req.body.yearCertificate2,
      letter_co2_cert2: req.body.letterCo2Cert2,
      value_co2_cert2: req.body.valueCo2Cert2,
      letter_ep_cert2: req.body.letterEpCert2,
      value_ep_cert2: req.body.valueEpCert2,
      saving_co2_abs: req.body.savingCo2Abs,
      saving_co2_percent: req.body.savingCo2Perc,
      saving_ep_abs: req.body.savingEpAbs,
      saving_ep_percent: req.body.savingEpPerc
    };
    const userId = req.userId;
    const user = await Users.findOne({ where: { uid: userId } });
    const estate = await CEEBuilding.findOne({
      where: { address: buildingToSave.address },
    });
    if (user.uid) {
      if (estate !== null) {
      } else {
        const dataBuilding = await CEEBuilding.create(buildingToSave);
        const userEstate = {
          user_id: userId,
          cee_building_id: dataBuilding.id,
        };
        await UserCeeBuilding.create(userEstate);
        res.status(200).send({ message: "Building saved!" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, status: 400 });
  }
};

exports.addToolToUser = async (req, res) => {
  try {
    const toolToSave = {
      login_access: req.body.login_access,
      image: req.body.image,
      url: req.body.url,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      wurl: req.body.wurl,
      name: req.body.name
    };
    const userId = req.userId;
    const user = await Users.findOne({ where: { uid: userId } });
    const estate = await Tools.findOne({
      model: Tools,
      attributes: ["id", "login_access", "image", "url", "short_description", "long_description", "wurl", "name"],
      where: { name: Tools.name },
    });
    if (user.uid) {
      if (estate == null) {
      } else {
        const dataTool = await Tools.create(toolToSave);
        const userEstate = {
          user_id: userId,
          tool_id: dataTool.id,
        };
        await UserTool.create(userEstate);
        res.status(200).send({ message: "Tool saved!" });
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

exports.getCEEBuildings = async (req, res) => {
  const userId = req.userId;
  const buildingToReturn = [];
  try {
    const buildings = await UserCEEBuilding.findAll({
      attributes: [],
      include: [
        {
          model: CEEBuilding,
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
          address: build.CeeBuilding.address,
          rc: build.CeeBuilding.rc,
        },
      };

      buildingToReturn.push({
        data_building: build.building
      });
    }
    res.status(200).send(buildingToReturn);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getTools = async (req, res) => {
    const userId = req.userId;
    const toolToReturn = [];

    /*await UserTool.findAll({
      attributes: ["user_id"],
      where: {user_id: userId}
    }).then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving envelope.",
      });
    });*/

  try{
    const tools = await UserTool.findAll({
      attributes: [],
      include: [
        {
          model: Tools
        },
        {
          attributes: ["uid"],
          model: Users,
          where: { uid: userId },
        },
      ],
    });
    for(const tool of tools){
      toolToReturn.push({
        tool
      });
    }
    res.status(200).send(toolToReturn);
  }catch (e){
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

exports.isFavorite2 = async (req, res) => {
  const userId = req.userId;
  const name = '%' + decodeURIComponent(req.params.name) + '%';
  try {
    const tool = await UserTool.findOne({
      attributes: [],
      include: [
        {
          model: Tools,
          where: {
            name: {
              [Op.like] : name
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
    if ( tool ) {
      res.status(200).send(tool.tool);
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

exports.deleteToolUser = async (req, res) => {
  try {
    await UserTool.destroy({
      where: {
        tool_id: req.params.tool
      }
    });
    res.status(200).send({ message: "Tool remove from user history!" });
  } catch (err) {
    res.status(400).send({ message: err.message, status: 400 });
  }
}

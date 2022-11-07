const { application } = require("express");
const db = require("../models");
const ToolsApplications = db.ToolsApplications;
const ToolsCountries = db.ToolsCountries;
const ToolsProfiles = db.ToolsProfiles;
const ToolsSolutions = db.ToolsSolutions;
const ToolsSteps = db.ToolsSteps;
const ToolsStops = db.ToolsStops;
const ToolsTypologies = db.ToolsTypologies;
const Users = db.User;

exports.getTools = (req, res) => {
  ToolsApplications.findAll({
    include: [
      {
        model: ToolsCountries,
        attributes: ['id', 'name']
      },
      {
        model: ToolsTypologies,
        attributes: ['id', 'typology']
      },
      {
        model: ToolsProfiles,
        attributes: ['id', 'profile']
      },
      {
        model: ToolsStops,
        attributes: ['id', 'stop']
      },
      {
        model: ToolsSteps,
        attributes: ['id', 'step']
      },
      {
        model: ToolsSolutions,
        attributes: ['id', 'solution']
      }
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving envelope.",
      });
    });
};

exports.buildFilters = async (req, res) => {
  try {
    const countries = await ToolsCountries.findAll();
    const profiles = await ToolsProfiles.findAll();
    const solutions = await ToolsSolutions.findAll();
    const steps = await ToolsSteps.findAll();
    const stops = await ToolsStops.findAll();
    const typologies = await ToolsTypologies.findAll();
    res.status(200).send({
      countries,
      profiles,
      solutions,
      steps,
      stops,
      typologies
    });

  } catch (e) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving filters.",
    });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const countries = await ToolsCountries.findAll();
    const profiles = await ToolsProfiles.findAll();
    const solutions = await ToolsSolutions.findAll();
    const steps = await ToolsSteps.findAll();
    const stops = await ToolsStops.findAll();
    const typologies = await ToolsTypologies.findAll();
    res.status(200).send({
      countries,
      profiles,
      solutions,
      steps,
      stops,
      typologies
    });

  } catch (e) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving filters.",
    });
  }
};

exports.create = (req, res) => {
  // Validate request
  const userId = req.userId;
  /*if (!userId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }*/
  const tool = {
    id: req.body.id,
    login_access: req.body.login_access ? req.body.login_access: false,
    image: req.body.image,
    url: req.body.url,
    short_description: req.body.short_description,
    long_description: req.body.long_description,
    wurl: req.body.wurl ? req.body.wurl: false,
    name: req.body.name
  }

  ToolsApplications.create(tool)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};

exports.addToolToUser = async (req, res) => {
  try {
    const toolToSave = {
      id: req.body.id,
      name: req.body.name,
      login_access: req.body.login_access,
      image: req.body.image,
      url: req.body.url,
      short_description: req.body.shortDescription,
      long_description: req.body.longDescription,
      wurl: req.body.wurl
    };
    const userId = req.userId;
    const user = await Users.findOne({ where: { uid: userId } });
    const estate = await ToolsApplications.findOne({
      where: { id: toolToSave.id },
    });
    if (user.uid) {
      if (estate == null) {
      } else {
        const dataTool = await ToolsApplications.create(toolToSave);
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
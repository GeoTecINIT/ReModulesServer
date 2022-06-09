const db = require("../models");
const ToolsApplications = db.ToolsApplications;
const ToolsCountries = db.ToolsCountries;
const ToolsProfiles = db.ToolsProfiles;
const ToolsSolutions = db.ToolsSolutions;
const ToolsSteps = db.ToolsSteps;
const ToolsStops = db.ToolsStops;
const ToolsTypologies = db.ToolsTypologies;

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

const db = require("../models");

const CeeBuilding = db.CeeBuilding;

exports.getAll = (req, res) => {
     CeeBuilding.findAll()
     .then( (data) => {
        res.send(data)
     })
     .catch( (err) => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving envelope."
        })
     })
}

exports.getId = (req, res) => {
   const ID = req.params.id;

   const condition = ID ? {id: ID} : null;

   CeeBuilding.findOne({
      where: condition
   })
   .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
}

exports.create = (req, res) => {

   let body = {
      address: req.body.address,
      map_address: req.body.map_address,
      rc: req.body.rc,
      tipology_id: req.body.tipology_id,
      case_id: req.body.case_id,
      year: req.body.year,
      year_certificate: req.body.year_certificate,
      letter_co2: req.body.letter_co2,
      value_co2: req.body.value_co2,
      letter_ep: req.body.letter_ep,
      value_ep: req.body.value_ep,
      year_certificate2: req.body.year_certificate2,
      letter_co2_cert2: req.body.letter_co2_cert2,
      value_co2_cert2: req.body.value_co2_cert2,
      letter_ep_cert2: req.body.letter_ep_cert2,
      value_ep_cert2: req.body.value_ep_cert2,
      saving_co2_abs: req.body.saving_co2_abs,
      saving_co2_percent: req.body.saving_co2_percent,
      saving_ep_abs: req.body.saving_ep_abs,
      saving_ep_percent: req.body.saving_ep_percent,
      map_url: req.body.map_url,
      current_regulations: req.body.current_regulations,
      reform_year: req.body.reform_year,
      number_floors: req.body.number_floors,
      number_dwellings: req.body.number_dwellings,
      number_comercial_units: req.body.number_comercial_units,
      land_surface: req.body.land_surface,
      building_surface: req.body.building_surface,
      heritage_buiding: req.body.heritage_buiding,
      construction_quality: req.body.construction_quality,
      building_description: req.body.building_description,
      windows: req.body.windows,
      wall: req.body.wall,
      photovoltaic: req.body.photovoltaic,
      shw: req.body.shw,
      aerothermal: req.body.aerothermal,
      intervention_description: req.body.intervention_description,
      renovation_picture: req.body.renovation_picture,
      investment: req.body.investment,
      renovation_subsidies: req.body.renovation_subsidies,
      investment_square_meter: req.body.investment_square_meter,
      subsidies_percent: req.body.subsidies_percent,
      final_investment: req.body.final_investment,
      final_investment_sqmeters: req.body.final_investment_sqmeters,
      investment_permonth: req.body.investment_permonth,
      potential_subsidies: req.body.potential_subsidies,
      potential_subsidies_percent: req.body.potential_subsidies_percent,
      potential_final_investment: req.body.potential_final_investment,
      potential_final_investment_m2: req.body.potential_final_investment_m2,
      potential_final_inv_month: req.body.potential_final_inv_month,
      investment_dwelling: req.body.investment_dwelling,
      subsidies_percent_dwelling: req.body.subsidies_percent_dwelling,
      subsidies_dwelling: req.body.subsidies_dwelling,
      subsidies_dwelling_percent: req.body.subsidies_dwelling_percent,
      final_investment_dwelling: req.body.final_investment_dwelling,
      final_inv_sqmeters_dwellings: req.body.final_inv_sqmeters_dwellings,
      inv_permonth_dwellings: req.body.inv_permonth_dwellings,
      potential_subsidies_dw: req.body.potential_subsidies_dw,
      potential_subsidies_percent_dw: req.body.potential_subsidies_percent_dw,
      potential_final_investment_dw: req.body.potential_final_investment_dw,
      potential_final_inv_m2_dw: req.body.potential_final_inv_m2_dw,
      potential_final_inv_month_dw: req.body.potential_final_inv_month_dw,
      dwelling_id: req.body.dwelling_id,
      type_reform: req.body.type_reform,
      coordinates: req.body.coordinates,
      point: req.body.point
   }

   CeeBuilding.create(body)
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
}

exports.update = (req, res) => {

   let body = {
      address: req.body.address,
      map_address: req.body.map_address,
      rc: req.body.rc,
      tipology_id: req.body.tipology_id,
      case_id: req.body.case_id,
      year: req.body.year,
      year_certificate: req.body.year_certificate,
      letter_co2: req.body.letter_co2,
      value_co2: req.body.value_co2,
      letter_ep: req.body.letter_ep,
      value_ep: req.body.value_ep,
      year_certificate2: req.body.year_certificate2,
      letter_co2_cert2: req.body.letter_co2_cert2,
      value_co2_cert2: req.body.value_co2_cert2,
      letter_ep_cert2: req.body.letter_ep_cert2,
      value_ep_cert2: req.body.value_ep_cert2,
      saving_co2_abs: req.body.saving_co2_abs,
      saving_co2_percent: req.body.saving_co2_percent,
      saving_ep_abs: req.body.saving_ep_abs,
      saving_ep_percent: req.body.saving_ep_percent,
      map_url: req.body.map_url,
      current_regulations: req.body.current_regulations,
      reform_year: req.body.reform_year,
      number_floors: req.body.number_floors,
      number_dwellings: req.body.number_dwellings,
      number_comercial_units: req.body.number_comercial_units,
      land_surface: req.body.land_surface,
      building_surface: req.body.building_surface,
      heritage_buiding: req.body.heritage_buiding,
      construction_quality: req.body.construction_quality,
      building_description: req.body.building_description,
      windows: req.body.windows,
      wall: req.body.wall,
      photovoltaic: req.body.photovoltaic,
      shw: req.body.shw,
      aerothermal: req.body.aerothermal,
      intervention_description: req.body.intervention_description,
      renovation_picture: req.body.renovation_picture,
      investment: req.body.investment,
      renovation_subsidies: req.body.renovation_subsidies,
      investment_square_meter: req.body.investment_square_meter,
      subsidies_percent: req.body.subsidies_percent,
      final_investment: req.body.final_investment,
      final_investment_sqmeters: req.body.final_investment_sqmeters,
      investment_permonth: req.body.investment_permonth,
      potential_subsidies: req.body.potential_subsidies,
      potential_subsidies_percent: req.body.potential_subsidies_percent,
      potential_final_investment: req.body.potential_final_investment,
      potential_final_investment_m2: req.body.potential_final_investment_m2,
      potential_final_inv_month: req.body.potential_final_inv_month,
      investment_dwelling: req.body.investment_dwelling,
      subsidies_percent_dwelling: req.body.subsidies_percent_dwelling,
      subsidies_dwelling: req.body.subsidies_dwelling,
      subsidies_dwelling_percent: req.body.subsidies_dwelling_percent,
      final_investment_dwelling: req.body.final_investment_dwelling,
      final_inv_sqmeters_dwellings: req.body.final_inv_sqmeters_dwellings,
      inv_permonth_dwellings: req.body.inv_permonth_dwellings,
      potential_subsidies_dw: req.body.potential_subsidies_dw,
      potential_subsidies_percent_dw: req.body.potential_subsidies_percent_dw,
      potential_final_investment_dw: req.body.potential_final_investment_dw,
      potential_final_inv_m2_dw: req.body.potential_final_inv_m2_dw,
      potential_final_inv_month_dw: req.body.potential_final_inv_month_dw,
      dwelling_id: req.body.dwelling_id,
      type_reform: req.body.type_reform,
      coordinates: req.body.coordinates,
      point: req.body.point
   }
   const id = req.params.id;
   const condition = id ? {id: id} : null;

   CeeBuilding.update(body, {
      where: condition
   }).then(() => {
      res.send({
         message: "Cee Building was updated successfully.",
       });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Cee Building with id=" + id,
      });
    });

}

exports.delete = (req, res) =>{
   const id = req.params.id;
   const condition = id ? {id: id} : null;

   CeeBuilding.destroy({
      where: condition
   }).then(() => {
      res.send({
         message: "Cee Building was delete successfully.",
       });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error delete Cee Building with id=" + id,
      });
    });
}
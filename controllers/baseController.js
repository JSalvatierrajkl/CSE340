const utilities = require("../utilities/index.js")
const baseController = {}


baseController.buildHome = async function (req, res) {
    const nav = await utilities.getNav()
    res.render("index", { title: "Home", nav })
}
const triggerError = (req, res, next) => {
    throw new Error('Intentional error for testing purposes.');
  };

  
module.exports = baseController, triggerError;
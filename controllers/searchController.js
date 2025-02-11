const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const searchController = {};

/**
 * Handle search requests for inventory items
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
searchController.searchInventory = async function (req, res, next) {
  const query = req.query.q;
  try {
    const results = await invModel.searchInventory(query);
    let nav = await utilities.getNav();
    res.render("searchResults", {
      title: `Search Results for "${query}"`,
      nav,
      results,
      query,
    });
  } catch (err) {
    req.flash("notice", "Error performing search");
    res.redirect("/");
  }
};

/**
 * Handle autocomplete requests for inventory items
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
searchController.autocomplete = async function (req, res, next) {
  const query = req.query.q;
  try {
    const results = await invModel.searchInventoryAutocomplete(query);
    res.json(results);
  } catch (err) {
    res.status(500).send('Error performing autocomplete search');
  }
};

module.exports = searchController;
/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressEjsLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")
const utilities = require('./utilities/index.js');
const inventoryRoute  = require("./routes/inventoryRoute.js")
app.set("view engine", "ejs")
app.use(expressEjsLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
// Inventory routes
app.use("/inv", inventoryRoute)
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use(require("./routes/static"))
app.get("/", function(req, res) {
  res.render("index", {title:"home"})
})
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry🙁🙃😕<br>This page doesnt exists, please select one item from the navbar to stand with us!😎'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

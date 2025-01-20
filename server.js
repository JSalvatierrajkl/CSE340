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
const inventoryRoute  = require("./routes/inventoryRoute.js")
app.set("view engine", "ejs")
app.use(expressEjsLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
// Inventory routes
app.use("/inv", inventoryRoute)
app.get("/", baseController.buildHome)
app.use(require("./routes/static"))
app.get("/", function(req, res) {
  res.render("index", {title:"home"})
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

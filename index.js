const express = require("express");
let app = express();
let port = 3000;
//PATH
let path = require("path");
//FOR UNIQUE ID'S
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override')
app.use(methodOverride('_method'))
//POST REQUEST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//EJS
app.set("view engine", "ejs");
//STATIC FILES
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

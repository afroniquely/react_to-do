'use strict'

const express     = require('express')
const tasks       = express.Router();
// const sendString  = (req,res)=>res.JSON(res.rows)

let taskData = [];

tasks.route('/:id')
  .get((req,res)=>res.send(`show task ${req.params.id}`))
  .put((req,res)=>res.send(`edited task ${req.params.id}`))
  .delete((req,res)=>res.send(`deleted task ${req.params.id}`))

tasks.route('/')
  .get((req,res)=>res.send('show tasks'))
  .post((req,res)=>res.send('posts new tasks'))

module.exports = tasks;

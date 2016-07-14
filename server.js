'use strict'

const express = require('express')
const tracker = require('morgan')
const path    = require('path')
const port    = process.env.PORT || 3009
const app     = express();

app.use(tracker('dev'))
app.use(express.static(path.join(__dirname, 'public')))


app.listen(port, function(){
  console.log('server is listening on ', port)
})

app.route('/tasks/:id')
  .get((req,res)=>res.send(`show task ${req.params.id}`))
  .put((req,res)=>res.send(`edited task ${req.params.id}`))
  .delete((req,res)=>res.send(`deleted task ${req.params.id}`))

app.route('/tasks')
  .get((req,res)=>res.send('show tasks'))
  .post((req,res)=>res.send('posts new tasks'))

app.get('/', function(req,res){
  res.send('currently testing the home')
})

// app.get('/tasks', function(req,res){
//   res.send('currently testing tasks')
// })

// app.get('/tasks/:id', function(req,res){
//   res.send('currently testing tasks unique ids')
// })

// app.get('/tasks/:id/edit', function(req,res){
//   res.send('currently testing edit functions')
// })

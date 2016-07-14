'use strict'
const pg = require('pg-promise')({
// Initialization Options
});

const config = {
host:       process.env.DB_HOST,
port:       process.env.DB_PORT,
database:   process.env.DB_NAME,
user:       process.env.DB_USER,
password:   process.env.DB_PASS,
};

const _db = pg(config);

module.exports = {
  /* GETTING TASKS */
  getTasks(req,res,next){
    _db.any('SELECT * FROM tasks;')
    .then( tasks => {
      res.rows = tasks;
      next()
    })
    .catch (error=>{
      console.error('Error ', error);
      throw error;
    })
  },
  /* POSTS TO /tasks */
  /* creates new task and returns the newly created record */
  addTask(req,res,next){
    console.log('=====addTask=====', req.body)
    _db.any(
      `INSERT INTO
      tasks (task_name, task_desc)
      VALUES ($1, $2)
      returning *;`, [req.body.name, req.body.desc]
      )
    .then(task=>{
      console.log('Added Task successfully');
      res.rows = task;
      next();
    })
    .catch (error=>{
      console.error('Error in Adding Task!', error)
      throw error;
    })
  },
  /* PUT /tasks/:taskID  */
  updateTask(req,res,next){
    /* tID is invented here */
    req.body.tID = Number.parseInt(req.params.taskID);
    req.body.completed = !!req.body.completed;
    _db.one(`UPDATE tasks SET
      task_name = $/task_name/,
      task_desc = $/task_desc/,
      completed = $/completed/
      WHERE task_id = $/tID/
      returning *; `,

      req.body)

      .then(task=>{
      console.log('Added Task successfully');
      res.rows = task;
      next();
    })
    .catch (error=>{
      console.error('Error in Adding Task!', error)
    })
  },

  /* DELETE /tasks/:taskID */
  deleteTask(req,res,next){
    const tID = Number.parseInt(req.params.taskID);
    _db.none(`
        DELETE FROM tasks
        WHERE task_id = $1
      `, [tID])

    .then( ()=>{
      console.log('Deleted Task');
      next();
    })
    .catch (error=>{
      console.error('Error in Deleting Task!', error)
    })
  },

}

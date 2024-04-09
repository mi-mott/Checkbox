import express from 'express';
import ViteExpress from 'vite-express';
import { dbPostNewTask, dbGetAllTasks, dbDeleteTask, dbUpdateTask, dbQueryTaskByName } from './db.js';

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Get request for all tasks
app.get('/fetchTasks', async (_, res) => {
  const tasks = await dbGetAllTasks();
  res.json({ results: tasks })
});

// Get request based off search parameter
app.get('/fetchByTaskName', async (req, res) => {
  const taskName = req.query.taskName as string;
  const tasks = await dbQueryTaskByName(taskName);
  res.json({ results: tasks })
})

// Post to update via a id
app.post('/newTask', async (req, res) => {
  const {taskName, taskDesc, dueDate} = req.body;
  const newTaskId = await dbPostNewTask(taskName, taskDesc, dueDate)
  res.json({ id: newTaskId })
})

// Delete to delete any finished tasks
app.delete('/deleteTask', async (req, res) => {
  const {taskId} = req.body;
  const deletedTaskId = await dbDeleteTask(taskId)
  res.json({ id: deletedTaskId })
})

// Put to update any tasks
app.put('/updateTask', async (req, res) => {
  const {taskName, taskDesc, dueDate, taskId} = req.body;
  const updatedTask = await dbUpdateTask(taskName, taskDesc, dueDate, taskId)
  res.json({ id: updatedTask })
})

ViteExpress.config({
  inlineViteConfig: {
    build: {
      outDir: './dist/client',
    },
  },
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port 3000...`)
);

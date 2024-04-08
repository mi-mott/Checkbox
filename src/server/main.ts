import express from 'express';
import ViteExpress from 'vite-express';
import pg from 'pg';
import { fetchTaskApi } from './fetchApi.js';

const app = express();

// For fetching the tasks with no parameters
app.get('/fetchTasks', async (_, res) => {
  const tasks = await fetchTaskApi();
  res.json({ results: tasks })
});

ViteExpress.config({
  // Copy and paste of vite.config.ts just so vite-express does not need to import
  // vite, a devDependency, in runtime
  inlineViteConfig: {
    build: {
      outDir: './dist/client',
    },
  },
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port 3000...`)
);

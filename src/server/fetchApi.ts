import pg from 'pg';

const { Client } = pg
const client = new Client({ 
  host: 'database',
  port: 5432,
  database: 'task',
  user: 'root',
  password: 'root',
});

export const fetchTaskApi = async () => {
  try {
    await client.connect();
    const queryResult = await client.query('SELECT * FROM tasks');
    return queryResult.rows
  } catch (error) {
      console.error('Error executing query:', error);
  } finally {
      await client.end();
  }
}
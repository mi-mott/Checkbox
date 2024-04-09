import { Dayjs } from 'dayjs';
import pg from 'pg';

const getNewClient = () => {
    const { Client } = pg
    const client = new Client({ 
        host: 'database',
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    });
    return client;
}

export const dbGetAllTasks = async () => {
    const client = getNewClient();
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

const formatInsertion = (taskName: string, taskDesc: string, taskDueTime: Dayjs) => {
    return `INSERT INTO tasks (name, description, due_date) VALUES ('${taskName}', '${taskDesc}', '${taskDueTime}') RETURNING id;`
}

export const dbPostNewTask = async (taskName: string, taskDesc: string, taskDueTime: Dayjs) => {
    const client = getNewClient();
    try {
        await client.connect();
        const queryResult = await client.query(formatInsertion(taskName, taskDesc, taskDueTime));
        return queryResult.rows[0].id
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await client.end();
    }
}

const formatDelete = (taskId: number) => {
    return `DELETE FROM tasks WHERE id = ${taskId} RETURNING id;`
}

export const dbDeleteTask = async (taskId: number) => {
    const client = getNewClient();
    try {
        await client.connect();
        const queryResult = await client.query(formatDelete(taskId));
        return queryResult.rows[0].id
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await client.end();
    }
}

const formatUpdate = (taskName: string, taskDesc: string, dueDate: Dayjs, taskId: number) => {
    return `UPDATE tasks SET name = '${taskName}', description = '${taskDesc}', due_date = '${dueDate}' WHERE id = ${taskId} RETURNING id;`
}

export const dbUpdateTask = async (taskName: string, taskDesc: string, dueDate: Dayjs, taskId: number) => {
    const client = getNewClient();
    try {
        await client.connect();
        const queryResult = await client.query(formatUpdate(taskName, taskDesc, dueDate, taskId));
        return queryResult.rows[0].id
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await client.end();
    }
}

const formatQueryByTaskName = (taskName: string) => {
    return `SELECT * FROM tasks WHERE name LIKE '%${taskName}%'`
}

export const dbQueryTaskByName = async (taskName: string) => {
    const client = getNewClient();
    try {
        await client.connect();
        const queryResult = await client.query(formatQueryByTaskName(taskName));
        return queryResult.rows;
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await client.end();
    }
}

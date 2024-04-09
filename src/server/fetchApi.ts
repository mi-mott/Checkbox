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

export const fetchTaskApi = async () => {
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
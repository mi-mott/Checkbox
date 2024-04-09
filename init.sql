-- Add your schema initialisation script here if you're on Postgres and not using an ORM

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    due_date TIMESTAMP NOT NULL
);
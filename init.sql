-- Add your schema initialisation script here if you're on Postgres and not using an ORM

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    create_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL
);

INSERT INTO tasks (name, description, due_date) VALUES ('First', 'First desc', '2024-04-10');
INSERT INTO tasks (name, description, due_date) VALUES ('Second', 'Second desc', '2024-04-10');
INSERT INTO tasks (name, description, due_date) VALUES ('Third', 'Third desc', '2024-04-10');
INSERT INTO tasks (name, description, due_date) VALUES ('Fourth', 'Fourth desc', '2024-04-10');
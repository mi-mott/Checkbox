CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(150) NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    due_date TIMESTAMP NOT NULL
);
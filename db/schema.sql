--    Create new database --
    DROP DATABASE IF EXISTS employee_tracker_db;
    CREATE DATABASE employee_tracker_db;

    -- Use tracker_db --
   \c employee_tracker_db;

--    Select database in use --
SELECT current_database(employee_tracker_db);

-- Create talbes --
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    department_id INTEGER NOT NULL,
    salary DECIMAL NOT NULL
);

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name  VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);
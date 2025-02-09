-- Select all the columns and rows from the department table
SELECT * FROM department;

-- Select all columns from a single row in the department table
SELECT * FROM department WHERE id = 1;

-- Select a single column from all rows in the department table
SELECT department_name FROM department;

-- Select a single column from a single row in the department table
SELECT department_name FROM department WHERE id = 3;

-- Join tables together to get employee details along with their role and department
SELECT 
    employee.id AS employee_id, 
    employee.first_name, 
    employee.last_name, 
    role.title AS role_title, 
    role.salary AS role_salary, 
    department.department_name AS department_name
FROM 
    employee
JOIN 
    role ON role.id = employee.role_id
JOIN 
    department ON department.id = role.department_id;
-- select all the columns and rows 
SELECT * FROM department; 

-- Select all columns from a single row
SELECT * FROM department WHERE id = 1;

-- select a single column from all rows
SELECT name FROM department;

-- select a single column from a single row
SELECT name FROM department WHERE id = 3; 

-- join table together
SELECT employee.id, role.title,role.salary, department.name
FROM employee
JOIN role on role.id = employee.role_id
JOIN department on department.id = role.department_id;
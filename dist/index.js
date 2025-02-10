// Add imports for needed packages
import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';
// import db connection 
connectToDb();
// Function to view all departments
const viewAllDepartments = async () => {
    try {
        const res = await pool.query('SELECT * FROM department');
        console.table(res.rows);
    }
    catch (err) {
        console.error('Error executing query');
    }
};
// Function to view all roles
const viewAllRoles = async () => {
    try {
        const res = await pool.query('SELECT * FROM role');
        console.table(res.rows);
    }
    catch (err) {
        console.error('Error executing query');
    }
};
// Function to view all employees
const viewAllEmployees = async () => {
    try {
        const res = await pool.query('SELECT * FROM employee');
        console.table(res.rows);
    }
    catch (err) {
        console.error('Error executing query');
    }
};
// Function to add a department
const addDepartment = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        },
    ]);
    try {
        await pool.query('INSERT INTO department (department_name) VALUES ($1)', [answers.name]);
        console.log('Department added successfully');
    }
    catch (err) {
        console.error('Error executing query');
    }
};
// Function to add a role
const addRole = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department does the role belong to?',
            choices: [
                { name: 'Sales', value: 1 },
                { name: 'Engineering', value: 2 },
                { name: 'Finance', value: 3 },
                { name: 'Legal', value: 4 },
            ],
        },
    ]);
    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [
            answers.title,
            answers.salary,
            answers.department_id,
        ]);
        console.log('Role added successfully');
    }
    catch (err) {
        console.error('Error executing query');
    }
};
// Function to add an employee
const addEmployee = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the employee\'s role ID?',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is the manager ID?',
        },
    ]);
    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.firstName, answers.lastName, answers.role, answers.manager]);
        console.log('Employee added successfully');
    }
    catch (err) {
        console.error('Error executing query');
    }
};
// Function to update an employee role
const updateEmployeeRole = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee you want to update:',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the new role of the employee?',
            choices: [
                { name: 'Sales Lead', value: 1 },
                { name: 'Salesperson', value: 2 },
                { name: 'Lead Engineer', value: 3 },
                { name: 'Software Engineer', value: 4 },
                { name: 'Account Manager', value: 5 },
                { name: 'Accountant', value: 6 },
                { name: 'Legal Team Lead', value: 7 },
                { name: 'Lawyer', value: 8 },
            ],
        },
    ]);
    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id]);
        console.log('Employee role updated successfully');
    }
    catch (err) {
        console.error('Error executing query');
    }
};
// write the questions 
const questions = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit',
            ],
        },
    ]);
    switch (answers.action) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'View all employees':
            await viewAllEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Quit':
            console.log('Goodbye');
            process.exit(0);
    }
    // Restart the main function to prompt user again
    questions();
};
// start the application
questions();

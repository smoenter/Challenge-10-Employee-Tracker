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
    } catch (err) {
      console.error('Error executing query', err.stack);
    }
  };

  // Function to view all roles
const viewAllRoles = async () => {
    try {
      const res = await pool.query('SELECT * FROM role');
      console.table(res.rows);
    } catch (err) {
      console.error('Error executing query', err.stack);
    }
  };
  
  // Function to view all employees
  const viewAllEmployees = async () => {
    try {
      const res = await pool.query('SELECT * FROM employee');
      console.table(res.rows);
    } catch (err) {
      console.error('Error executing query', err.stack);
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
    } catch (err) {
      console.error('Error executing query', err.stack);
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
    } catch (err) {
      console.error('Error executing query', err.stack);
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
      await pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [answers.firstName, answers.lastName, answers.role, answers.manager]
      );
      console.log('Employee added successfully');
    } catch (err) {
      console.error('Error executing query', err.stack);
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
    } catch (err) {
      console.error('Error executing query', err.stack);
    }
  };

// write the questions 
const questions = async () => {
    const answers = await inquirer.prompt ([
         {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all emplyoyees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit',
            ],
        },
    ])
    .then((answers) => {
        console.log(answers);
        // ask more questions or run database queries based on answers they pick 
        if (answers.action === 'Quit') {
            console.log('Goodbye');
            process.exit(0);
        } else if (answers.action === 'View all departments') {
            //  present table showing  department names and department ids
            const viewAllDepartments = async () => {
                try {
                    const res = await pool.query('SELECT * FROM department');
                    console.table(res.rows);
                } catch (err) {
                    if (err instanceof Error) {
                        if (err instanceof Error) {
                            console.error('Error executing query', err.stack);
                        } else {
                            console.error('Unexpected error', err);
                        }
                    } else {
                        console.error('Unexpected error', err);
                    }
                }
            };
            viewAllDepartments();
        } else if (answers.action === 'View all roles') {
            //present with job titles, role, id, the department role belongs to, and salary
            const viewAllRoles = async () => {
                try {
                    const res = await pool.query('SELECT * FROM role');
                    console.table(res.rows);
                } catch (err) {
                    console.error('Error executing query');
                }
            };
            viewAllRoles();              
        } else if (answers.action === 'View all employees') {
            // formatted table showing employee data, including employee id, first name, last name..
            const viewAllEmployees = async () => {
                try {
                    const res = await pool.query('SELECT * FROM employee');
                    console.table(res.rows);
                } catch (err) {
                    console.error('Error executing query');
                }
            };
            viewAllEmployees();
        } else if (answers.action === 'Add a department') {
            // enter the name of the department and that department is added to the database
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
                } catch (err) {
                    console.error('Error executing query');
                }
            };
            addDepartment();
        } else if (answers.action === 'Add a role') {
            // enter the name, salary, and department for the role and that role is added to the database
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
                } catch (err) {
                    console.error('Error executing query');
                }
            };
            addRole();
        } else if (answers.action === 'Add an employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employee\'s last name?'
                },
                {
                    type: 'input',
                    name: 'role',
                    message: 'What is the employee\'s role ID?'
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: 'Who is the manager ID?'
                },
            ])
                .then((employeeInfo) => {
                    // write query to insert the data into the db
                    pool.query(
                        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
                        [employeeInfo.firstName, employeeInfo.lastName, employeeInfo.role, employeeInfo.manager],
                        (err, res) => {
                            if (err) {
                                console.error('Error executing query', err.stack);
                            } else {
                                console.log('Employee added successfully');
                            }
                        }
                    );
                });
            // enter the employee's first name, last name, role and manager and employee is added to the database
        } else if (answers.action === 'Update an employee role') {
            // prompeted to select an employee to update and their new role and this info is added to the database
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
                } catch (err) {
                    console.error('Error executing query');
                }
            };
            updateEmployeeRole();
    }.catch((err) => {
        console.error(err);
    });
})

questions();
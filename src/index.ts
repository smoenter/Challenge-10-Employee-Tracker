// Add imports for needed packages
import inquirer from 'inquirer';
// inquirer for questions
// import questions from 'questions';
// import db connection 

// write the questions 
inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'Waht is the name of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
           type: 'input',
           name: 'department',
           message: 'Which department does the role belong to?',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is manager?',
        },

    ])
// give the question to inquirer
// .then((reponse)=> console.log(colors[response.color](response.text))):
// put the answers into the db
// ask what task they want to do 
inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all Employees',
            'Add new Employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'Quit',
          ],
        },
      ])
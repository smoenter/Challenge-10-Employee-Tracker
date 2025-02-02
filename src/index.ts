// Add imports for needed packages
import inquirer from 'inquirer';
// inquirer for questions
// import questions from 'questions';
// import db connection 

// write the questions 
// inquirer
//     .prompt([
//         {

//         },
//         {

//         },
//         {

//         },

//     ])
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
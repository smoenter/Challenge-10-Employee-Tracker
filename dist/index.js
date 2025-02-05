// Add imports for needed packages
import inquirer from 'inquirer';
// import db connection 
// write the questions 
const questions = [
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
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Who is manager?',
    },
];
// give the question to inquirer
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
    .then((answers) => {
    console.log(answers);
    // ask more questions or run database queries based on answers they pick 
    if (answers.action === 'Quit') {
        console.log('Goodbye');
        process.exit(0);
    }
})
    .catch((err) => {
    console.error(err);
});
// put the answers into the db

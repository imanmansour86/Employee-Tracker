const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
const cTable = require("console.table");
const Connection = require("mysql2/typings/mysql/lib/Connection");

const PORT = process.env.PORT || 3001;

const mainMenuQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "mainMenuOptions",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Exit",
    ],
  },
];

// Connect to database
const connection = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "empoloyeeTracker",
  },
  console.log(`Connected to the empoloyeeTracker database.`)
);

//if mysql connection fails
connection.connect(function (err) {
  if (err) throw err;
});

function mainMenu() {
  inquirer.prompt(mainMenuQuestions).then((response) => {
    switch (response.mainMenuOptions) {
      case "View all Departments":
        viewDepartments();
        break;
      case "View all Roles":
        viewRoles();
        break;
      case "View all Employees":
        viewEmployees();
        break;
      case "Exit":
        exit();
    }
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
    }
  });
}

function viewRoles() {
  db.query(
    `SELECT employee_role.id,title,salary, department_name 
      FROM employee_role 
      INNER JOIN department ON department.id = employee_role.department_id `,
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
      }
    }
  );
}

function viewEmployees() {
  db.query(
    `SELECT employee.id, first_name, last_name, employee_role.title, department_name, employee_role.salary,  
     FROM employee 
     INNER JOIN employee_role ON employee_role.id = employee.role_id
     INNER JOIN department ON department.id = employee_role.department_id `,
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
      }
    }
  );
}

function exit() {
  console.log("Thanks for viewing our System! Goodbye.");
  connection.end();
}
// call on the function to dispaly main menu
init();
function init() {
  console.log(
    "Welcome to our employee content management systems!\nStart building your team"
  );
  mainMenu();
}

const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
const cTable = require("console.table");

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
const db = mysql.createConnection(
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
        console.log("GoodBye");
    }
  });
}

function viewDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
    }
  });
}

function viewRoles() {
  db.query("SELECT * FROM employee_role", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
    }
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
    }
  });
}

// call on the function to dispaly main menu
init();
function init() {
  console.log(
    "Welcome to our employee content management systems!\nStart building your team"
  );
  mainMenu();
}

const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

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
    ],
  },
];

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
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
    console.log(response);
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

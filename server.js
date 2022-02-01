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

//if mysql connection fails
db.connect(function (err) {
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
  db.query(
    `SELECT employee_role.id,employee_role.title,employee_role.salary, department.department_name 
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
    "SELECT * FROM employee right join employee_role on employee_role.id = employee.role_id",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
      }
    }
  );
}

// call on the function to dispaly main menu
init();
function init() {
  console.log(
    "Welcome to our employee content management systems!\nStart building your team"
  );
  mainMenu();
}

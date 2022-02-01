const inquirer = require("inquirer");
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

module.exports = mainMenu;

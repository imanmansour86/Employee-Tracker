const inquirer = require("inquirer");
const db = require("./db");

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

const addDepartmentQuestions = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "department",
  },
];

//collect departmnet name from user then call db addDepartment to add the dept to db
const handleAddDepartment = () => {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    console.log(response.department);
    db.addDepartment(response.department);
  });
};
function mainMenu() {
  inquirer.prompt(mainMenuQuestions).then((response) => {
    switch (response.mainMenuOptions) {
      case "View all Departments":
        db.viewDepartments();
        mainMenu();
        break;
      case "View all Roles":
        db.viewRoles();
        break;
      case "View all Employees":
        db.viewEmployees();
        break;
      case "Add a Department":
        handleAddDepartment();
        break;
      case "Exit":
        exit();
    }
  });
}

const exit = () => {
  console.log("Thanks for viewing our System! Goodbye.");
  db.endConnection();
};
// call on the function to dispaly main menu
init();
function init() {
  console.log(
    "Welcome to our employee content management systems!\nStart building your team"
  );
  mainMenu();
}

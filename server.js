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

const addRoleQuestions = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "role",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "salary",
  },
  {
    type: "list",
    message: "Which department does the role belong to?",
    name: "department",
    choices: [],
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "lastName",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "employeeRole",
    choices: [],
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "employeeManager",
    choices: [
      "Mike Morl",
      "Paul Berni",
      "Jo Okwa",
      "Stephanie Howk",
      "Tasneem Gupta",
      "Tom Lee",
      " Sara Dar",
    ],
  },
];

//collect departmnet name from user then call db addDepartment to add the dept to db
const handleAddDepartment = () => {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    console.log("after prompot", response.department);
    db.addDepartment(response.department);
    console.log("test here");
    mainMenu();
  });
};

const handleAddRole = () => {
  inquirer.prompt(addRoleQuestions).then((response) => {
    const { role, salary, department } = response;
    console.log("results", role, salary, department);
    db.addRole(role, salary, department);
  });
};

const handleViewDepartment = () => {
  db.viewDepartments()
    .then((results) => {
      console.log("\n");
      var departmentsList = [];
      for (i = 0; i < results.length; i++) {
        departmentsList.push(results[i].department_name);
      }
      console.table(results);
      console.log("department list here is", departmentsList);
      mainMenu();
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleViewRoles = () => {
  db.viewRoles()
    .then((results) => {
      console.log("\n");
      console.log("role results here", results);
      var roles = [];
      for (i = 0; i < results.length; i++) {
        roles.push(results[i].title);
      }
      console.table(results);

      mainMenu();
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleAddEmployee = () => {
  inquirer.prompt(addEmployeeQuestions).then((response) => {
    const { firstName, lastName, employeeRole, employeeManager } = response;
    db.addEmployee(firstName, lastName, employeeRole, employeeManager);
  });
};

function mainMenu() {
  inquirer.prompt(mainMenuQuestions).then((response) => {
    switch (response.mainMenuOptions) {
      case "View all Departments":
        handleViewDepartment();
        break;
      case "View all Roles":
        handleViewRoles();
        break;
      case "View all Employees":
        db.viewEmployees();
        break;
      case "Add a Department":
        handleAddDepartment();
        break;
      case "Add a Role":
        handleAddRole();
        break;
      case "Add an Employee":
        handleAddEmployee();
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

// reads all roles from db
const readAllRole = () => {
  db.viewRoles()
    .then((results) => {
      var roles = [];
      for (i = 0; i < results.length; i++) {
        roles.push(results[i].title);
      }
      addEmployeeQuestions[2].choices = roles;
    })
    .catch((err) => {
      console.error(err);
    });
};

//read all departments from db
const readAllDepts = () => {
  db.viewDepartments()
    .then((results) => {
      var departments = [];
      for (i = 0; i < results.length; i++) {
        departments.push(results[i].department_name);
      }
      addRoleQuestions[2].choices = departments;
    })
    .catch((err) => {
      console.error(err);
    });
};
// call on the function to dispaly main menu
init();
function init() {
  console.log(
    "Welcome to our employee content management systems!\nStart building your team"
  );
  readAllRole();
  readAllDepts();
  mainMenu();
}

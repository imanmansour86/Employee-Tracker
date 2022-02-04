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
      "Update Employee Role",
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
    choices: [],
  },
];

const updateEmployeeQuestions = [
  {
    type: "list",
    message: "Which employee's role you want to update?",
    name: "employeeName",
    choice: [],
  },
  {
    type: "list",
    message: "Which new role you want to assign the employee?",
    name: "roleList",
    choice: [],
  },
];

//collect departmnet name from user then call db addDepartment to add the dept to db
const handleAddDepartment = () => {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    console.log(`Added ${response.department} to department list`);
    console.log("\n");
    db.addDepartment(response.department).then(() => {
      mainMenu();
    });
  });
};

const handleAddRole = () => {
  inquirer.prompt(addRoleQuestions).then((response) => {
    const { role, salary, department } = response;

    addEmployeeQuestions[2].choices.push(role);
    console.log(`Added ${role} to role list`);
    console.log("\n");

    db.addRole(role, salary, department).then(() => {
      mainMenu();
    });
  });
};

const handleViewDepartment = () => {
  db.viewDepartments()
    .then(([results, fields]) => {
      console.log("\n");
      var departmentsList = [];
      for (i = 0; i < results.length; i++) {
        departmentsList.push(results[i].department_name);
      }
      console.table(results);

      mainMenu();
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleViewRoles = () => {
  db.viewRoles()
    .then(([results, fields]) => {
      console.log("\n");

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

const handleViewEmployees = () => {
  db.viewEmployees()
    .then(([results, fields]) => {
      console.log("\n");

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
    console.log(`Added ${firstName} ${lastName} to Employee list`);
    console.log("\n");
    db.addEmployee(firstName, lastName, employeeRole, employeeManager).then(
      ([results, fields]) => {
        //update all choices array + update employess array
        updateEmployeeQuestions[0].choices.push(firstName + " " + lastName);
        addEmployeeQuestions[3].choices.push(firstName + " " + lastName);
        employees.push({
          id: results.insertId,
          first_name: firstName,
          last_name: lastName,
        });

        mainMenu();
      }
    );
  });
};

const handleUpdateEmployee = () => {
  inquirer.prompt(updateEmployeeQuestions).then((response) => {
    const { employeeName, roleList } = response;

    var employeeId;

    for (i = 0; i < employees.length; i++) {
      if (
        employees[i].first_name + " " + employees[i].last_name ===
        employeeName
      )
        employeeId = employees[i].id;
    }
    console.log("employeeId", employeeId);
    var roleId;

    for (i = 0; i < roles.length; i++) {
      if (roles[i].title === roleList) roleId = roles[i].id;
    }

    db.updateEmployee(employeeId, roleId).then(() => {
      console.log(`Updated ${employeeName} to new role ${roleList}`);
      mainMenu();
    });
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
        handleViewEmployees();
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
      case "Update Employee Role":
        handleUpdateEmployee();
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

var roles = [];
// reads all roles from db
const readAllRole = () => {
  db.viewRoles()
    .then(([results, fields]) => {
      var roleNames = [];
      roles = [];
      for (i = 0; i < results.length; i++) {
        roleNames.push(results[i].title);
        roles.push(results[i]);
      }
      addEmployeeQuestions[2].choices = roleNames;
      updateEmployeeQuestions[1].choices = roleNames;
    })
    .catch((err) => {
      console.error(err);
    });
};

//read all departments from db
const readAllDepts = () => {
  db.viewDepartments()
    .then(([results, fields]) => {
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
var employees = [];
const readAllEmployees = () => {
  db.viewEmployees()
    .then(([results, fields]) => {
      var employeesName = [];
      employees = [];
      for (i = 0; i < results.length; i++) {
        employeesName.push(results[i].first_name + " " + results[i].last_name);
        employees.push(results[i]);
      }

      updateEmployeeQuestions[0].choices = employeesName;
      addEmployeeQuestions[3].choices = employeesName;
    })
    .catch((err) => {
      console.error(err);
    });
};

// call on the function to dispaly main menu
init();
function init() {
  console.log(
    "Welcome to our Employee content Management systems!\nStart building your team"
  );
  console.log("\n");
  readAllRole();
  readAllDepts();
  readAllEmployees();
  mainMenu();
}

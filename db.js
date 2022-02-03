// Use mysql2 as databases
const mysql = require("mysql2");

//print the sql tables in a formatted way in terminal
const cTable = require("console.table");
const { response } = require("express");

// Connect to mysql database using local server
var connection = mysql.createConnection(
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

const endConnection = () => connection.end();

// ZZZZZ

// function viewDepartments() {
//   return new Promise(function (resolve, reject) {
//     connection.query(`SELECT * FROM department`, (err, results) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.table(results);
//       }
//     });
//   });
// }

function viewDepartments() {
  return new Promise(function (resolve, reject) {
    connection.query(`SELECT * FROM department`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//   })
//   connection
//     .promise()
//     .query(`SELECT * FROM department`)
//     .then(([rows, fields]) => {
//       console.table(rows);
//     })
//     .catch(console.log)
//     .then(() => connection.end());
// }

//view all roles
const viewRoles = () => {
  connection.query(
    `SELECT employee_role.id,title, department_name AS department, salary
      FROM employee_role 
      INNER JOIN department ON department.id = employee_role.department_id 
      ORDER BY employee_role.id`,
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
      }
    }
  );
};

//view all employees-left join on employee table to get manager info also to include null managers
const viewEmployees = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager 
     FROM employee 
     INNER JOIN employee_role ON employee_role.id = employee.role_id
     LEFT JOIN employee AS manager ON employee.manager_id = manager.id 
     INNER JOIN department ON department.id = employee_role.department_id `,
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
      }
    }
  );
};

//add a department
const addDepartment = (name) => {
  connection.query(
    `INSERT INTO department (department_name) VALUES(?) `,
    name,
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Added ${name} to the databases`);
        console.table(results);
      }
    }
  );
};

const addRole = (role, salary, department) => {
  connection.query(
    `INSERT INTO employee_role(title, salary) VALUES (?,?,?)`,
    [role, salary, department],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Added ${role} to the databases`);
        console.table(results);
      }
    }
  );
};

module.exports = {
  viewRoles,
  viewDepartments,
  viewEmployees,
  addDepartment,
  addRole,
  endConnection,
};

// Use mysql2 as databases
const mysql = require("mysql2");

//print the sql tables in a formatted way in terminal
const cTable = require("console.table");

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

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
    }
  });
}

const viewRoles = () => {
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
};

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

module.exports = { viewRoles, viewDepartments, viewEmployees, endConnection };

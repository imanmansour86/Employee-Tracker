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

const viewDepartments = () =>
  connection.promise().query(`SELECT * FROM department`);

//view all roles
const viewRoles = () =>
  connection.promise().query(
    `SELECT employee_role.id,title, department_name AS department, salary
      FROM employee_role 
      INNER JOIN department ON department.id = employee_role.department_id 
      ORDER BY employee_role.id`
  );

//view all employees-left join on employee table to get manager info also to include null managers
const viewEmployees = () =>
  connection.promise().query(
    `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager 
     FROM employee 
     INNER JOIN employee_role ON employee_role.id = employee.role_id
     LEFT JOIN employee AS manager ON employee.manager_id = manager.id 
     INNER JOIN department ON department.id = employee_role.department_id `
  );

//add a department
const addDepartment = (name) =>
  connection
    .promise()
    .query(`INSERT INTO department (department_name) VALUES(?) `, name);

const addRole = (role, salary, department) =>
  //get the department id from the department the user chose
  connection
    .promise()
    .query(
      `SELECT department.id FROM department
    WHERE department_name=?`,
      department
    )
    .then(([deptID, fields]) =>
      //query to add a new employee
      connection
        .promise()
        .query(
          `INSERT INTO employee_role(title, salary,department_id) VALUES (?,?,?)`,
          [role, salary, deptID[0].id]
        )
    );

//add new employee
const addEmployee = (firstName, lastName, employeeRole, employeeManager) => {
  //get the employee id from the
  var roleResults;
  return connection
    .promise()
    .query(
      `SELECT employee_role.id FROM employee_role
       WHERE employee_role.title = ?`,
      employeeRole
    )
    .then(([results, fields]) => {
      roleResults = results;
      return connection.promise().query(
        ` SELECT employee.manager_id from employee
          WHERE CONCAT(employee.first_name, ' ' , employee.last_name) = ?`,
        employeeManager
      );
    })
    .then(([managerResults, fields]) => {
      console.log(roleResults);
      console.log(managerResults);
      return connection.promise().query(
        ` INSERT INTO employee (first_name,last_name, role_id,manager_id)
        VALUES (?, ?, ? , ?)`,
        [firstName, lastName, roleResults[0].id, managerResults[0].manager_id]
      );
    });
};
module.exports = {
  viewRoles,
  viewDepartments,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  endConnection,
};

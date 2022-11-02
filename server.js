const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const database = mysql.createConnection(
  // sql connect
  {
    host: "localhost",
    user: "root",
    password: "akash",
    database: "employees_db",
  },
  console.log(`Connected to database employees_db.`)
);
function promptInfo() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Update Employees Manager",
        "Exit",
      ],
    })
    .then(function ({ option }) {
      switch (option) {
        case "View  Departments":
          viewAllDepartment();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewAllEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employees Manager":
          updateManager();
          break;
        case "Exit":
          database.end();
          break;
      }
    });
}
promptInfo();

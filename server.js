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
        case "View Departments":
          viewDepartment();
          break;
        case "View Roles":
          rolesView();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Department":
          departmentAdd();
          break;
        case "Add Role":
          roleAdd();
          break;
        case "Add Employee":
          employeeAdd();
          break;
        case "Update Employee Role":
          employeeRoleupdate();
          break;
        case "Update Employees Manager":
          managerUpdate();
          break;
        case "Exit":
          database.end();
          break;
      }
    });
}
promptInfo();

function viewDepartment() {
  connection.query(`SELECT * FROM department`, function (err, data) {
    if (err) throw err;

    console.table(data);
  });

  promptInfo();
}

function rolesView() {
  connection.query(`SELECT * FROM roles`, function (err, data) {
    if (err) throw err;

    console.table(data);
  });
  promptInfo();
}

function viewEmployees() {
  connection.query(`SELECT * FROM employee`, function (err, data) {
    if (err) throw err;

    console.table(data);
  });

  promptInfo();
}

function departmentAdd() {
  inquirer
    .prompt({
      name: "name",
      message: "What is the department's name?",
      type: "input",
    })
    .then(function ({ name }) {
      connection.query(
        `INSERT INTO department (name) VALUES ('${name}')`,
        function (err, data) {
          if (err) throw err;
          console.log(`Added Department`);

          promptInfo();
        }
      );
    });
}

function roleAdd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "How much do they make?",
      },
      {
        type: "input",
        name: "departmentId",
        message: "What is the department id?",
      },
    ])
    .then(function ({ title, salary, departmentId }) {
      connection.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', ${departmentId})`,
        function (err, data) {
          if (err) throw err;
          console.log("Role Added");
          promptInfo();
        }
      );
    });
}

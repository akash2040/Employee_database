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
  database.query(`SELECT * FROM department`, function (err, data) {
    if (err) throw err;

    console.table(data);
  });

  promptInfo();
}

function rolesView() {
  database.query(`SELECT * FROM roles`, function (err, data) {
    if (err) throw err;

    console.table(data);
  });
  promptInfo();
}

function viewEmployees() {
  database.query(`SELECT * FROM employee`, function (err, data) {
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
      database.query(
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
      database.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', ${departmentId})`,
        function (err, data) {
          if (err) throw err;
          console.log("Role Added");
          promptInfo();
        }
      );
    });
}
function employeeAdd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employees role id?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the employees manager id if they have one?",
      },
    ])
    .then(function ({ firstName, lastName, roleId, managerId }) {
      database.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}','${roleId}',${managerId})`,
        function (err, data) {
          if (err) throw err;
          console.log("Employee Added");
          promptInfo();
        }
      );
    });
}

function employeeRoleupdate() {
  database.query(`SELECT * FROM employee`, function (err, data) {
    if (err) throw err;

    let employees = [];
    let roles = [];

    for (let i = 0; i < data.length; i++) {
      employees.push(data[i].first_name);
    }

    database.query(`SELECT * FROM roles`, function (err, data) {
      if (err) throw err;

      for (let i = 0; i < data.length; i++) {
        roles.push(data[i].title);
      }

      inquirer
        .prompt([
          {
            name: "employee_id",
            message: "Who's role needs to be updated",
            type: "list",
            choices: employees,
          },
          {
            name: "role_id",
            message: "What is the new role?",
            type: "list",
            choices: roles,
          },
        ])
        .then(function ({ employee_id, role_id }) {
          database.query(
            `UPDATE employee SET role_id = ${
              roles.indexOf(role_id) + 1
            } WHERE id = ${employees.indexOf(employee_id) + 1}`,
            function (err, data) {
              if (err) throw err;

              promptInfo();
            }
          );
        });
    });
  });
}
function managerUpdate() {
  database.query(`SELECT * FROM employee`, function (err, data) {
    if (err) throw err;

    s;
    let employees = [];

    for (let i = 0; i < data.length; i++) {
      employees.push(data[i].first_name);
    }

    inquirer
      .prompt([
        {
          name: "employeeId",
          message: "Who would you like to update?",
          type: "list",
          choices: employees,
        },
        {
          name: "managerId",
          message: "Who's their new manager?",
          type: "list",
          choices: ["none"].concat(employees),
        },
      ])
      .then(({ employeeId, managerId }) => {
        let queryText = "";
        if (managerId !== "none") {
          queryText = `UPDATE employee SET manager_id = ${
            employees.indexOf(managerId) + 1
          } WHERE id = ${employees.indexOf(employeeId) + 1}`;
        } else {
          queryText = `UPDATE employee SET manager_id = ${null} WHERE id = ${
            employees.indexOf(employeeId) + 1
          }`;
        }

        database.query(queryText, function (err, data) {
          if (err) throw err;

          promptInfo();
        });
      });
  });
}

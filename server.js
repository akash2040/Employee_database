const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection(
  // sql connect
  {
    host: "localhost",
    user: "root",
    password: "akash",
    database: "employees_db",
  },
  console.log(`Connected to database employees_db.`)
);

--Create a Courese Database--
DROP DATABASE IF EXISTS employees_db;


CREATE DATABASE employees_db;

USE employees_db;


DROP TABLE IF EXISTS department;
CREATE TABLE department(
id INT NOT NULL auto_increment,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);


DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
   id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);




DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);
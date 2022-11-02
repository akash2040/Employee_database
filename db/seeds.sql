USE employees_db;
INSERT INTO department(name)
VALUES ("Sales"),
       ("Lead Engineer"),
       ("Lawyer"),
       ("Software Engineer");


INSERT INTO roles(title,salary,department_id)
VALUES ("Sales Lead", 12500, 1),
       ("Lead Engineer", 175480, 2),
       ("Software Engineer",69644,3),
       ("Account Manager",12442,4),
       ("Legal Team Lead",585455,5);



INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Akash", "Chanara", 1, 1),
       ("Alex","Allison",2,2),
       ("Irene","Hollow",3,3),
       ("linda","Brooks",4,4);
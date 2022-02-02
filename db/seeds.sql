INSERT INTO department (department_name)
VALUES("Software"), ("HR"), ("Finanace"),("Sales"), ("Legal");

INSERT INTO employee_role(title,salary, department_id)
VALUES ("Software Engineer", 150000,1),
("Account Manager", 120000,3),
 ("Salesperson", 80000,4),
  ("Sales Lead", 70000,4),
("Lawyer", 70000,5),
 ("HR Manager", 90000,2);


INSERT INTO employee(first_name,last_name, role_id,manager_id)
VALUES ("Mike", "Morl" ,1,1),
("Paul", "Berni" ,1, NULL),
 ("Jo", "Okwa", 2,2),
  ("Stephanie", "Howk", 3,3),
 ("Tasneem", "Gupta",4,3),
 ("Tom", "Lee",4,NULL),
 ("Sara", "Dar",5,5);

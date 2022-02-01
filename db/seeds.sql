INSERT INTO department (department_name)
VALUES("Software"), ("Hardware"), ("HR"), ("Finanace");

INSERT INTO employee_role(title,salary, department_id)
VALUES ("Software Engineer", 120000,1),
 ("Hardware Engineer", 70000,2),
 ("HR Manager", 60000,3);


INSERT INTO employee(first_name,last_name, role_id,manager_id)
VALUES ("Mike", "Morl" ,1,1),
 ("Jo", "Okwa", 2,2),
 ("Sara", "Dar",3,3);

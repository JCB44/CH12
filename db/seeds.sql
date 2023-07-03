INSERT INTO department(departmentName)
VALUES  ('Back of house'),
        ('Front of house'),
        ('Managers');
        -- this is for a pluckers lol

INSERT INTO role(jobTitle, salary, departmentId)
VALUES  ('Cook', 100000, 1),
        ('Preper', 90000, 1),
        ('Dishwasher', 80000, 1),
        ('Head Line cook',120000, 3),
        ('Server', 85000, 2),
        ('Busser', 60000, 2),
        ('Foodrunner', 60000, 2),
        ('Host', 75000, 2),
        ('Front of House Manger',140000, 3);

INSERT INTO employee(firstName, lastName, roleId, managerId)
VALUES  ('Shane', 'Pizza', 9, NULL),
        ('Odinkirk', 'Jeffery', 4, NULL),
        ('Tiffany', 'Lockhart', 5, 1);

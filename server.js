const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  // ^^^^^ Enter MYSQL password here <-----------------------
  database: "employee_db",
});

//====================// Employee functions:
function addEmployee() {
  db.query("SELECT * FROM ROLE", (err, data) => {
    const roles = data.map((row) => {
      return { name: row.jobTitle, value: row.id };
    });
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter Employees first name",
            name: "firstName",
          },
          {
            type: "input",
            message: "Enter Employees last name",
            name: "lastName",
          },
          {
            type: "list",
            message: "Enter Employee's role",
            name: "roleId",
            choices: roles,
          },
          {
            type: "input",
            message: "Enter Manager id",
            name: "managerId",
          },
        ])
        .then((answers) => {
          db.query(
            "INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)",
            [
              answers.firstName,
              answers.lastName,
              answers.roleId,
              answers.managerId,
            ],
            (err, dataRes) => {
              run();
              console.log(err)
            }
          );
        });
      });
    }

  const viewEmployees = `
    SELECT employee.firstName, employee.lastName, role.jobTitle, role.salary, department.departmentName, concat(manager.firstName, ' ', manager.lastName) AS managerName
    FROM employee
    JOIN role ON role.id = employee.roleId
    JOIN department ON department.id = role.departmentId
    LEFT JOIN employee manager ON manager.id = employee.managerId`;

//====================// Department functions:
function addDepartment() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Enter a department name to add.",
      name: "newDepartment",
    },
    ])
    .then((answer) => {
        db.query(
          "INSERT INTO department (departmentName) VALUES (?)",
          [answer.newDepartment],
          (err, res) => {
          run();
          console.log(err)
        }
      )
    })
  }

    const viewDepartments = `
      SELECT department.departmentName
      FROM department`;

//====================// Role Functions:
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your position",
        name: "jobTitle",
      },
      {
        type: "input",
        message: "Enter your pay",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter your department Id",
        name: "departmentId",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (jobTitle, salary, departmentId) VALUES (?, ?, ?)",
        [answers.jobTitle, answers.salary, answers.departmentId],
        (err, dataRes) => {
          run();
          console.log(err)
        }
      );
    });
  }

    const viewTitles = `
      SELECT role.jobTitle, role.salary, department.departmentName
      FROM role
      JOIN department ON department.id = role.departmentId`;

  function updateRole() {
    db.query("SELECT * FROM employee", (err, data) => {
      const employees = data.map((row) => {
        return { name: `${row.firstName} ${row.lastName}`, value: row.id };
      });
      db.query("SELECT * FROM role", (err, data) => {
        const newRole = data.map((row) => {
          return { name: row.jobTitle, value: row.id };
        });
        console.log(employees);
        inquirer
          .prompt([
            {
              type: "list",
              message: "Select the employee role you would like to update",
              name: "employeeUpdate",
              choices: employees,
            },
            {
              type: "list",
              message:
                "Select the new role you would like to assign",
              name: "newRole",
              choices: newRole,
            },
          ])
          .then((answers) => {
            console.log(answers);
            db.query(
              "UPDATE employee SET roleId = ? WHERE id = ?",
              [answers.newRole, answers.employeeUpdate],
              (err, data) => {
                run();
                console.log(err)
              }
            );
          });
      });
    });
  }


// reminder to seed database before running
  function run() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Please choose an option",
          name: "action",
          choices: [
            "Add a employee",
            "View all employees",
            "Add Department",
            "View All Departments",
            "Add a Role",
            "View all Roles",
            "Update a employee role",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          //Employee Cases
          case "Add a employee":
            addEmployee();
            console.log("add employee")
          break;
          case "View all employees":
            db.query(viewEmployees, (err, dataRes) => {
              if(err) throw err
              console.table(dataRes);
              run();
            });
          break;

           //Department Cases
          case "Add Department":
            addDepartment();
          break;
          case "View All Departments":
            db.query(viewDepartments, (err, dataRes) => {
              if(err) throw err
              console.table(dataRes);
              run();
            });
          break;

          //Role Cases
          case "Add a Role":
            addRole();
          break;
          case "View all Roles":
            db.query(viewTitles, (err, dataRes) => {
              if(err) throw err
              console.table(dataRes);
              run();
          });
          break;
          case "Update a employee role":
          updateRole();
          break;

          default:
          run();
          break;
          
        }
    });
  }
run()

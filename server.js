const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

//====================// Employee functions:
function addEmployee() {
    db.query("SELECT * FROM ROLE", (err, data) => {
      inquirer
        .prompt([
          {
            type: "input",
            message: "Employees first name?",
            name: "firstName",
          },
          {
            type: "input",
            message: "Employees last name?",
            name: "lastName",
          },
        ])
        .then((answers) => {
          db.query(
            "INSERT INTO employee (firstName, lastName) VALUES (?, ?)",
            [
              answers.firstName,
              answers.lastName,
            ],
            (err, dataRes) => {
              run();
            }
          );
        });
        });
        }

        const viewEmployees = `
          SELECT employee.firstName, employee.lastName
          FROM employee`;

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
                  }
                )
              })
          }

 const viewDepartments = `
          SELECT department.departmentName
          FROM department`;


//====================//









  function run() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Please choose an option",
          name: "action",
          choices: [
            "View all employees",
            "Add a employee",
            "Add Department",
            "View All Departments",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
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

          default:
          run();
          break;
          
        }
        });
        }
run()

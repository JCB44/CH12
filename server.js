const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "love7744",
  database: "employee_db",
});

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

        const viewEmployee = `
          SELECT employee.firstName, employee.lastName
          FROM employee`;


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
              db.query(viewEmployee, (err, dataRes) => {
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

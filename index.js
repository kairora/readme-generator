const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

function promptQuest() {
    return inquirer.prompt ([
        {    
            type: "input",
            name: "title",
            message: "Project Title:"
        },
        {
            type: "input",
            name: "description",
            message: "Description:"
        },
        {
            type: "input",
            name: "instructions",
            message: "Installation Instructions:"
        },
        {
            type: "input",
            name: "usage",
            message: "Usage Information:"
        },  
        {
            type: "input",
            name: "guidelines",
            message: "Contribution Guidelines:"
        },  
        {
            type: "input",
            name: "test",
            message: "Test Instructions:"
        },  
        {
            type: "list",
            name: "license",
            message: "Which license?",
            choices: [
                "Apache License 2.0", 
                "GNU GPLv3", 
                "MIT", 
                "ISC License", 
                "SIL Open Font License 1.1"
            ]
        },   
        {
            type: "input",
            name: "github",
            message: "Github Username:"
        }, 
        {
            type: "input",
            name: "email",
            message: "Email Address:"
        },
    ]).then(function(result) {

        var newReadMe = result.title.toLowerCase().split(' ').join('') + ".md";
        fs.writeFile(newReadMe, JSON.stringify(result, null, '\t'), function(err) {
            if (err) {
            return console.log(err);
        }
        console.log("Success!");

        });
    });
}

promptQuest();

// .then(answers => {
//     // Use user feedback for... whatever!!
//   })
//   .catch(error => {
//     if(error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else when wrong
//     }
//   });
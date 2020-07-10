const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const asyncFileWriter = util.promisify(fs.writeFile);

function promptQuest() {
    return inquirer.prompt([
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
    ])
}


// function for md.
function createMD(response) {
    return `
# ${response.title}

## Description 
${response.description}

## Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [License](#license)
4. [Contributing](#Contributing)
5. [Tests](#Tests)
6. [Questions](#Questions)
---

## Installation
${response.instructions}

## Usage
${response.usage}

## License
${response.license}

## Contributing
${response.guidelines}

## Tests
${response.test} 

## Questions

You can visit my [Github Profile](https://www.github.com/kairora) to learn more about this CLI at this.
Or, if you have questions regarding this CLI program, please [send me an email](mailto:brianna.bullock16@gmail.com). `;
}

// promptQuest();

async function startAll() {
    try {
        const answers = await promptQuest();
        const markDown = createMD(answers);
        await asyncFileWriter("README3.md", markDown);
        console.log("New readme created!");
    } catch (err) {
        console.log(err);
    }
}
startAll();
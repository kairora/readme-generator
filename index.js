const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const licensor = require("./license.js");

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
            name: "year",
            message: "What year did you copyright this project?"
        },
        {
            type: "input",
            name: "instructions",
            message: "What steps are required to install this project?"
        },
        {
            type: "input",
            name: "usage",
            message: "How does a user use this project?"
        },
        {
            type: "input",
            name: "guidelines",
            message: "What are some guidelines for contribution from other developers?"
        },
        {
            type: "input",
            name: "test",
            message: "What is the command line that should be run for tests?"
        },
        {
            type: "list",
            name: "license",
            message: "Which license?",
            choices: [
                "Apache",
                "GPLv3",
                "MIT",
                "ISC",
                "none",
            ]
        },
        {
            type: "input",
            name: "name",
            message: "What is your full name?"
        },
        {
            type: "input",
            name: "github",
            message: "Github Username:"
        },
        {
            type: "input",
            name: "repo",
            message: "Input the link to your repo here."
        },
        {
            type: "input",
            name: "email",
            message: "Email Address:"
        },
        {
            type: "input",
            name: "img",
            message: "Input the link or directory path to your main app image.  Remember: Use a PNG file!"
        },
        {
            type: "input",
            name: "imgAlt",
            message: "Type the alt text that will display if your image breaks."
        },
        
    ])
}

function licenseResult (response) {
    const licenseChoice = response.license;
    const yearName = {year: response.year,
        name: response.name}

    switch(licenseChoice) {
        
        case "Apache": 
        return licensor.Apache(yearName);
        
        case "GPLv3": 
        return licensor.GPLv3(yearName);
        
        case "MIT": 
        return licensor.MIT(yearName);

        case "ISC": 
        return licensor.ISC(yearName);
        
        case "none": 
        return "There is no license for this application. ";
        
    }
}
// function for md
function createMD(response) {
    // Write code to a readme
    return `
# ${response.title}
![${response.license} license](https://img.shields.io/badge/License-${response.license}-blue.svg) 

## Description 
${response.description}

![${response.imgAlt}](${response.img})

---

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

---

## License
### ${response.license} License` +

licenseResult(response) +

` 

---
## Contributing
${response.guidelines}

## Tests
~~~JS
${response.test}
~~~
---

## Questions

You can visit my [Github Profile](https://www.github.com/${response.github}) or [this app's Github repo](${response.repo}) to learn more about this CLI.
Or, if you have questions regarding this CLI program, please [send me an email](mailto:${response.email}). `;
}

async function startAll() {
    try {
        const answers = await promptQuest();
        const markDown = createMD(answers);
        await asyncFileWriter("READMEnew.md", markDown);
        console.log("New readme created!");
    } catch (err) {
        console.log(err);
    }
}
startAll();
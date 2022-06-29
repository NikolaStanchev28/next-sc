#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
var { red, yellow, cyan } = require("colors/safe");

if (process.argv.length < 3) {
  console.log(red("You have to provide a name to your app."));
  console.log(yellow("For example :"));
  console.log(yellow("    npx next-sc my-app"));
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = "https://github.com/NikolaStanchev28/vachev-sc-boilerplate.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      red(
        `Folder ${yellow(
          "'" + projectName + "'"
        )} already exist in the current directory, please give it another name.`
      )
    );
  } else {
    console.log(red(error));
  }
  process.exit(1);
}

async function main() {
  try {
    console.log(cyan("Downloading files.."));
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

    process.chdir(projectPath);

    console.log(cyan("Installing dependencies.."));
    execSync("npm install");

    console.log(cyan("Removing useless files.."));
    execSync("npx rimraf ./.git");

    console.log(cyan("The installation is done, your app is ready to use !"));
    console.log(cyan("Happy coding !"));
  } catch (error) {
    console.log(red(error));
  }
}
main();

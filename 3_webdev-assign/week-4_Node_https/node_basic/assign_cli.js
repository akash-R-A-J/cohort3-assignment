const { Command } = require("commander");
const fs = require("fs");

function getPath() {
  const program = new Command();
  program.option("-p, --path <type>", "File path");
  program.parse(process.argv);

  const options = program.opts();
  if (options.path) {
    console.log(`Path given : ${options.path}`);
  }
  
  return options.path;
}

function countWords(){
    const path = getPath();
    const content = fs.readFileSync(`${path}`, 'utf-8');
    console.log('File Content: ' + content);
    content.trim();
    console.log(`You have ${content.split(' ').length} words in file ${path}.`);
}

countWords();
const fs = require('fs');
const {Command} = require('commander');
const program = new Command();

program
    .name('File related CLI')
    .description('CLI to do file based tasks.')
    .version('0.8.0');
    
program.command('count')
    .description('count the number of words in a file')
    .argument('<file>', 'file to count')
    .action((file) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            console.log('reading file');
            if(err){
                console.log(err);
            }else{
                const words = data.trim().split(' ').length;
                console.log(`There are ${words} words in ${file}.`);
            }
        });
    });
    
program.parse();
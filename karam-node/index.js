// const { Command } = require("commander")
// const fs = require('fs')

// const program = new Command()

// program
//     .name('Count lines')
//     .command('count')
//     .argument('<script>','file to count word')
//     .action( (script) =>{
//         console.log("File name is " + script)
//         const data = fs.readFileSync(script,'utf-8')
//         console.log("Word length is "+ countWords(data))
//     });

// function countWords(str) {
//     return str.trim().split(/\s+/).length;
//     }

// program.parse();

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();
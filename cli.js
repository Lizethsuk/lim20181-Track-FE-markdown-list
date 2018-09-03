#!/usr/bin/env node

const program = require('commander');
const mdlinks = require('./index.js');

program
  .version('0.1.0')
  .arguments('<path>', 'change the working directory')
  .option('-v, --validate', 'valida si existe links rotos')
  .option('-s, --stats', 'verifica cuants links existen')
  .action(mdlinks)
  .parse(process.argv);

const options = {
  validate: program.validate,
  stats: program.stats
}

// program.parse(process.argv);
const dirOrFile = program.args[0];
if (!dirOrFile) {
  console.log('ingrese ruta')
  console.log('ruta,--validate')
  console.log('ruta, --stats')
  console.log('ruta, --validate--stats');
} else {
  mdlinks(dirOrFile, options)
    .then(arrlinks => {
      // if(option.stats){
      console.log(arrlinks);
      // }

    })
}

// mdlinks(dirOrFile)=>{
//   return colors.red(txt); //display the help text in red on the console
// }
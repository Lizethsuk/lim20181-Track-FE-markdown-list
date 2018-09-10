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

// const ruta= findUp(args)
const dirOrFile = program.args[0];



if (!dirOrFile) {
  console.log('ingrese ruta')
  console.log('ruta -v --validate')
  console.log('ruta -s --stats')
  console.log('ruta -s -v --validate--stats');
} else {
  mdlinks(dirOrFile, options)
    .then(arrlinks => {
      if (options.validate && options.stats) {
        console.log(`total:${arrlinks.total}\nunique:${arrlinks.unique}\nbroken:${arrlinks.broken}`)
      } else if (options.validate) {
        arrlinks.forEach(obj => {
          console.log(`${obj.file}   ${obj.href}   ${obj.statusText}   ${obj.status}   ${obj.text}`)
        });
      } else if (options.stats) {
        console.log(`total:${arrlinks.total}\nunique${arrlinks.unique}`)
      } else {
        arrlinks.forEach(obj => {
          console.log(`${obj.file}   ${obj.href}   ${obj.text}`)
        })

      }
    })
}

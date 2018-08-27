#!/usr/bin/env node

const [, , ...args] = process.argv;
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const dirOrFile = path.resolve(args[0])
const option={
'validate': false,
'stats':false
}

const arr = [];

// const funcLinks=(dirOrFile)=>{
if (path.extname(dirOrFile) === '.md') {
  // console.log(dirOrFile)
  fs.readFile(dirOrFile, 'utf8', (error, text) => {
    // console.log('sasa')

    const showdown = require('showdown');
    const convertidor = new showdown.Converter();
    const html = convertidor.makeHtml(text);
    // console.log(html)
    const urlRegex = /<a href="([^"]*)">([^<]*)<.*/g;
    ///
    ///((\bhttps?:\/\/)|(\bwww\.))\S*/g
    const url = html.match(urlRegex);
    // const regexComent = /(?:(?<=\>).+?(?=\<))/g;
    // /(?:(?<=\[).+?(?=\]))/g;
    // const arrComent= text.match(regexComent)
    // arrComent.forEach(oneComent=>{
    //   if(oneComent.trim()!=''){
    //     console.log(oneComent);
    //     }
    // })
    // console.log(url)
    if (url != null) {
      for (let i = 0; i < url.length; i++) {
        const splitcom = url[i].split('"');

        const links = splitcom[1];
        // console.log(splitComen)
        console.log(links)
        const axios = require('axios');
        axios.get(links)
          .then(function (response) {
            console.log(response.status, response.statusText);
          })
          .catch(function (error) {
            // console.log(error);
          })
          .then(function () {
          });
      }
    }
  })
} else if (path.extname(dirOrFile) === '') {
 
  recursive(dirOrFile,[ignoreFunc], function (err, files) {
    files.forEach(file => {
      if (path.extname(file) === '.md') {
        fs.readFile(file, 'utf8', (error, text) => {
          // console.log('sasa')
          const showdown = require('showdown');
          const convertidor = new showdown.Converter();
          const html = convertidor.makeHtml(text);
          const urlRegex = /<a href="([^"]*)">([^<]*)<.*/g;
          const url = html.match(urlRegex);
          const regexComent = /(?:(?<=\[).+?(?=\]))/g
          // console.log(text.match(regexComent))
          if (url != null) {
            for (let i = 0; i < url.length; i++) {
              const splitcom = url[i].split('"');
              const links = splitcom[1];
              // console.log(dirOrFile + file)
              console.log(links)
            }
          }
        })
      }
    })

    // `files` es una matriz de rutas de archivos 

  })
}
// }

function ignoreFunc(file, stats) {
  return stats.isDirectory() && path.basename(file) == "node_modules";
};



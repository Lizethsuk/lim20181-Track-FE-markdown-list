#!/usr/bin/env node

const [, , ...args] = process.argv;
const fs = require('fs');
const path = require('path');

const dirOrFile = path.resolve(args[0])
let arrayLinks=[{}]

if (path.extname(dirOrFile) === '.md') {

  fs.readFile(dirOrFile, 'utf8', (error, text) => {

    const showdown = require('showdown');
    const convertidor = new showdown.Converter();
    const html = convertidor.makeHtml(text);
    const urlRegex = /((\bhttps?:\/\/)|(\bwww\.))\S*/g
    const url = html.match(urlRegex);
    for (let i = 0; i < url.length; i++) {
      const splitcom = url[i].split('"');
      const links = splitcom[0];
      // console.log(links)
    }
  })
} else if (path.extname(dirOrFile) === '') {
  fs.readdir(dirOrFile, (err, files) => {
    if (err) {
      console.log('err');
    } else {
      files.forEach(file => {
        if (path.extname(file) === '.md') {
          fs.readFile(file, 'utf8', (error, text) => {
            // console.log(file)
            const showdown = require('showdown');
            const convertidor = new showdown.Converter();
            const html = convertidor.makeHtml(text);
            const urlRegex = /((\bhttps?:\/\/)|(\bwww\.))\S*/g
            const url = html.match(urlRegex);
            for (let i = 0; i < url.length; i++) {
              const splitcom = url[i].split('"');
              const links = splitcom[0];
              // console.log(links)
            }
          })
        }else if(path.extname(file) ===''){
          console.log(typeof(file))
          fs.readFile(file,'utf8', (error, text)=>{
            const showdown = require('showdown');
            const convertidor = new showdown.Converter();
            const html = convertidor.makeHtml(text);
            const urlRegex = /((\bhttps?:\/\/)|(\bwww\.))\S*/g
            const url = html.match(urlRegex);
            for (let i = 0; i < url.length; i++) {
              const splitcom = url[i].split('"');
              const links = splitcom[0];
              console.log(links)
            }
          })
}
  })
}
  })}

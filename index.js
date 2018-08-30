#!/usr/bin/env node

const [, , ...args] = process.argv;
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const dirOrFile = args[0];
// var arrLinks = [];


function ignoreFunc(file, stats) {
  return stats.isDirectory() && path.basename(file) == "node_modules";
};

const readFile = (file) => {
  fs.readFile(file, 'utf8', (error, text) => {
    const showdown = require('showdown');
    const convertidor = new showdown.Converter();
    const html = convertidor.makeHtml(text);
    const urlRegex = /<a href="([^"]*)">([^<]*)<.*/g;
    const urlRegexComent = />([^<]*)</g;
    const url = html.match(urlRegex);
    if (url != null) { 
    // for (let i = 0; i < url.length; i++) {
      url.forEach(oneUrl => {
        const splitcom = oneUrl.split('"');
        const links = splitcom[1];
        const coment = oneUrl.match(urlRegexComent);
        arrLinks.push({  
            href: links,
            path: file,
            text: coment[0]
        })
      })
      console.log(arrLinks)
    }
  })
};

const arrLinks = [];

const readDir = (dirOrFile)=> {
  
  recursive(dirOrFile, [ignoreFunc], function (err, files) {
    console.log(files)
    
    files.forEach(file => {
      if (path.extname(file) === '.md') {

      readFile(file);
      }
    })
  })
}

const mdlinks = () => {
  if (path.extname(dirOrFile) === '.md') {
    // const arrLinks = [];
    readFile(dirOrFile)
  } else if (path.extname(dirOrFile) === '') {
    // const arrLinks = [];
    readDir(dirOrFile);
  }

}
mdlinks()

module.exports = mdlinks;


#!/usr/bin/env node

const [, , ...args] = process.argv;
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const dirOrFile = path.resolve(args[0]);

const marked = require('marked')


const functAxios = (a) => {
  const axios = require('axios');
  axios.get()
    .then(function (response) {
      // console.log(links)
      console.log(response.status, response.statusText);
    })
    .catch(function (error) {
      // console.log(error);
    })
    .then(function () {
    });
}
const readDirectory = (dirOrFiles) => {
  recursive(dirOrFiles, [ignoreFunc], function (err, files) {
    // console.log(err)
    files.forEach(file => {
      if (path.extname(file) === '.md') {
        // console.log(file)
        funcReadfile(file)
      }
    })
  })
}
const funcReadfile = (files) => {
  fs.readFile(files, 'utf8', (error, data) => {
    // console.log(dirOrFile);
    const arrLinks = [];
    if (error) throw error;
    const render = new marked.Renderer()
    render.link = (href, title, text) => {
      // const axios = require('axios');

      if (href != text) {
        arrLinks.push({
          href: href,
          text: text,
          file: dirOrFile,
        })

        const axios = require('axios');
        axios.get(href)
          .then(function (response) {
            const status=response.status; 
            console.log(response.status)
          }) 
          .catch(function (error) {
            // console.log(error);
          })
      }
      // console.log(href)
    }
    marked(data, { renderer: render })
    console.log(arrLinks)
    // console.log(functAxios(arrLinks.href))

  })
}

function ignoreFunc(file, stats) {
  return stats.isDirectory() && path.basename(file) == "node_modules";
};
const mdlinks = () => {
  if (path.extname(dirOrFile) === '.md') {
    // console.log(dirOrFile)
    funcReadfile()
  } else if (path.extname(dirOrFile) === '') {
    readDirectory(dirOrFile)

  }
}
mdlinks()

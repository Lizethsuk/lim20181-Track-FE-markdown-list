#!/usr/bin/env node

const [, , ...args] = process.argv;
const fs = require('fs');
// const leerArchivos=(args(0))=>{

// const recorridoArchivos=()=>{
const splitAr = args[0].split(".");
const extFile = splitAr[splitAr.length - 1];
if (extFile === 'md') {
  fs.readFile(args[0], 'utf8', (error, text) => {
    // const regexText= /^[a-zA-Z]/;
    // const regexTextResult= text.match(regexText)
    // console.log(regexTextResult)
    const showdown = require('showdown');
    const convertidor = new showdown.Converter();
    const html = convertidor.makeHtml(text);
    const urlRegex =/((\bhttps?:\/\/)|(\bwww\.))\S*/g
    //
    // /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/
    const url = html.match(urlRegex);
    // console.log(coment[0])
      // console.log(splitInicioA[1]);
    
    // console.log(url)
    for (let i = 0; i < url.length; i++) {
      const splitcom = url[i].split('"'); 
      const links = splitcom[0];
      // console.log(links)
      if (links.length >= 9) {
        console.log(links)
      //   links.forEach(link => {
      //     fetch('link')
      //     .then
      //   });
      //   fetch('')
      }
    }
   
  });
} else {

  console.log(typeof (args[0]), 'no es un archivo marckdown')
}

// fs.readdir(args[0],'utf8', (error, files) => {
//  console.log(files);
// const filesx= fs.readdirSync('src');
// console.log(filesx)
// for (const file in args[0]) {
// console.log(args[0]);
// }
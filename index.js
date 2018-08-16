#!/usr/bin/env node

const [,, ... args]=process.argv
console.log(`lalala lalammm${args}`);

const showdown = require('showdown');
const convertidor= new showdown.Converter();
const text='#hola, rebaja';
const html= convertidor.makeHtml(text);
console.log(html);

const fs= require('fs');
fs.readFile('README.md','utf8', (error, text) => {
    // => [Error: EISDIR: illegal operation on a directory, read <directory>]
    if (error)
    throw error;
    const textoMd= text;
    const showdown = require('showdown');
const convertidor= new showdown.Converter();
const html= convertidor.makeHtml(textoMd);
console.log(html);
  });
  


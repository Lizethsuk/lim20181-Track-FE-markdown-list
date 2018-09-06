const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const marked = require('marked');
const arrayUnique = require('array-unique');

const readFile = (arrFile) => {
  const arrLinks = []
  arrFile.forEach(file => {
    const readFile = fs.readFileSync(file, 'utf8');
    const render = new marked.Renderer()
    render.link = (href, title, text) => {
      if (href != text) {
        arrLinks.push({
          href: href,
          text: text,
          file: file,
        })
      }
    }
    marked(readFile, { renderer: render })
  })
  return arrLinks;
}

const funValidate = (arrTotal) => {
  const arrLink = arrTotal.map((obj => obj.href))
  const arrpromises = arrLink.map(link => fetch(link))
  return Promise.all(arrpromises)
    .then((response) => {
    arrTotal.map((objLink, sts) => {
        objLink.status = response[sts].status;
        objLink.statusText = response[sts].statusText;
      })
      return arrTotal;
    })
}

const funcStats = (arrTotal) => {
  const total = arrTotal.length;
  const arrOnlyLink = arrTotal.map(objLink => objLink.href);
  const arrUnique = arrayUnique(arrOnlyLink);
  
  const unique = arrUnique.length;
  const objet={
    "total":total,
    "unique":unique
  }
  const arrStat = [objet];
  return arrStat
}

const recorrFileOrDir = (dirOrFile) => {
  let arrFile = []
  const stats = fs.statSync(dirOrFile)
  if (stats.isFile()) {
    if (path.extname(dirOrFile) === '.md') {
      arrFile.push(dirOrFile)
    }
  } else if (stats.isDirectory()) {
    const arrArch = fs.readdirSync(dirOrFile)
    arrArch.forEach(arch => {
      if (arch != "node_modules") {
        arrFile = arrFile.concat(recorrFileOrDir(path.join(dirOrFile, arch)))
      }
    })

  }
  return arrFile
}

const mdlinks = (dirOrFile, options) => {
  return new Promise((resolve, reject) => {
    const filesmd = recorrFileOrDir(path.resolve(dirOrFile));
    const arrTotal = readFile(filesmd);
    const stasArr = funcStats(arrTotal);
    const promiseValidate = funValidate(arrTotal);
    if (options.validate && options.stats) {
      const resumen=stasArr[0]
      resumen.broken=0
      promiseValidate.then((arr) => {
        arr.forEach(obj=>{
          if(obj.status===404){
            resumen.broken+=1
          }
        })
        resolve(resumen)
      })
    } else if (options.stats) {
      resolve(stasArr);
    } else if (options.validate) {
      resolve(promiseValidate);
    }
    else {
      resolve(arrTotal);
    }
  })
}
module.exports = mdlinks
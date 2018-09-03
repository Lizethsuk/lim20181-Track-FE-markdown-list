

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const axios = require('axios');
const marked = require('marked');
const arrayUnique = require('array-unique');
const urix = require('urix');




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
      // console.log(href)
    }
    marked(readFile, { renderer: render })

  })
  return arrLinks;
}

const funStatus = (arrTotal) => {
  const arrLink = arrTotal.map((obj => obj.href))
  // console.log(arrLink)
  const arrpromises = arrLink.map(link => axios.get(link))
  return Promise.all(arrpromises)
    .then(response => {
      return arrTotal.map((link, statuslink) => {
        link.status = `${response[statuslink].status}`
        // console.log(link.status)
        //   status: response.status,
        //   validate: response.statusText
   
        // return link
        return arrTotal

      })
    })
    .catch((error) => {
      return arrTotal.map(link => {
        if (link.status === undefined) {
          link.status = '404'
        }
        return arrTotal

      })
    })

  // console.log(arrTotal);
  // console.log(arrTotal)

  // return arrTotal
}

const funcStats=(arrTotal)=>{
  const total=arrTotal.length;
  const arrOnlyLink = arrTotal.map(objLink => objLink.href);
  const arrUnique=arrayUnique(arrOnlyLink);
  const unique=arrUnique.length;
  
  const stringStat= `total:${total}\nunique:${unique}`;
 
  return stringStat
}
//   const statusLinks=(arrLinkMd)=>{
//     // console.log(arrLinkMd.href)

//       const axios = require('axios');
//         axios.get(arrayOfObjec)
//           .then((response)=> {
//             arrayOfObjec.push(response.status)
//           }) 
//           .catch((error)=> {
//             // console.log(error);
//           })


//   }
// readFile(arrFile)

const recorrFileOrDir = (dirOrFile) => {
  let arrFile = []
  const stats = fs.statSync(dirOrFile)
  if (stats.isFile()) {
    if (path.extname(dirOrFile) === '.md') {
      arrFile.push(dirOrFile)
      // readFile(arrFile)
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
  // console.log(options)
  return new Promise((resolve, reject) => {
    const filesmd = recorrFileOrDir(path.resolve(dirOrFile));
    const arrTotal = readFile(filesmd);
    const stasString= funcStats(arrTotal);
    if (options.stats && options.validate) {
      funStatus(arrTotal)
        .then(respuesta => resolve(respuesta))

      // .then(response => resolve(response))
      // resolve({ total: 'todos', unique: 'uno', broken: 'ninguno' })
    } else if (options.stats) {
      resolve(stasString)
    } else {
      resolve(arrTotal);
    }
  })


}
// mdlinks(dirOrFile)

module.exports = mdlinks
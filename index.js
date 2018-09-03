

const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const fetch = require('node-fetch')
const axios = require('axios');
const marked = require('marked')


// function ignoreFunc(file, stats) {
//   return stats.isDirectory() && path.basename(file) == "node_modules";
// };

const readFile = (arrFile) => {
  // console.log(arrFile)
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
        link.status = response[statuslink].status
        return link
      })
      // return 
    })
    .catch((error) => {
      return arrTotal.map(link => {
        if (link.status === undefined) {
          link.status = '404'
        }
        return link
      })

    })

  // console.log(arrTotal);
  // console.log(arrTotal)

  // return arrTotal
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
    // recursive(dirOrFile, [ignoreFunc], (err, files) => {
    // arrFile = files.filter(file => (path.extname(file) === '.md'));
    // console.log(files)
    // console.log(arrFile)
    //  readFile(arrFile);
    // statusLinks()
    // readFile(arrFile[href]);
    // return arrFile
    // })


  }
  return arrFile
}


const mdlinks = (dirOrFile, options) => {
  // console.log(options)
  return new Promise((resolve, reject) => {
    const filesmd = recorrFileOrDir(dirOrFile);
    const arrTotal = readFile(filesmd);
    if (options.stats && options.validate) {
      funStatus(arrTotal)
        .then(respuesta => resolve(respuesta))

      // .then(response => resolve(response))
      // resolve({ total: 'todos', unique: 'uno', broken: 'ninguno' })
    } else if (options.stats) {
      resolve('')
    } else {
      resolve(arrTotal);
    }
  })


}
// mdlinks(dirOrFile)

module.exports = mdlinks
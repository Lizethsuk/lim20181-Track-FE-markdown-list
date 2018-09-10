# Markdown Links

## Preámbulo
[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es muy comun encontrar archivos con este formato en cualquier repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Este modulo se encarga de solucionar este problema leyendo y analizando archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Install


$ npm install --save Lizethsuk/lim20181-Track-FE-markdown-list

```js
// example.js
const mdlinks = require('lizeth-md-link');

mdlinks('README.md').then(response => {
	console.og(response)
});
//C:\Users\Documents\README.md  https://es.wikipedia.org/wikipedia/Markdown  Markdown 

mdlinks('README.md' --validate).then(response => {
	console.log(response)
});
//C:\Users\Documents\README.md  https://es.wikipedia.org/wikipedia/Markdown  200  OK   Markdown 

mdlinks('README.md' --stats).then(response => {
	console.log(response)
})
// total: 1 unique: 1

mdlinks('README.md' --stats --validate).then(response => {
	console.log(response)
})
// total: 1 unique: 1 broken: 0


```

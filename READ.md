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


$ npm install --save lizeth-md-link

```js
// example.js
const mdlinks = require('lizeth-md-link');

mdlinks('README.md').then(response => {
	console.log(response);
});

mdlinks('README.md' --validate).then(response => {
	console.log(response);
});
mdlinks('README.md' --stats).then(response => {
    
})
```

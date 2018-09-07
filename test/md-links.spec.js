const mdlinks = require('../index');
const options = {
    validate: false,
    stats: false
}

test('deberia retornar un array de objetos', () => {
    jest.setTimeout(12000)
    return mdlinks('test/prueba', options).then((respuesta) => {
        expect(respuesta).toEqual([{
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\test\\prueba\\test.md'
        },
        {
            href: 'https://github.com/workshopper/learnyounodem',
            text: 'learnyounode',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\test\\prueba\\test.md'
        },
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\test\\prueba\\uuu.md'
        }])
    })
});


test('deberia retornar un array', () => {
    jest.setTimeout(12000)
    options.validate=true
    return mdlinks('test/prueba', options).then((respuesta) => {
        expect(respuesta).toEqual([{
            href: 'https://es.wikipedia.org/wiki/Markdown',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\test\\prueba\\test.md',
            status: 200,
            statusText: 'OK',
            text: 'Markdown'  
        },
        {
            href: 'https://github.com/workshopper/learnyounodem',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\test\\prueba\\test.md',
            status: 404,
            statusText: 'Not Found',
            text: 'learnyounode'  
        },
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\test\\prueba\\uuu.md',
            status: 200,
            statusText: 'OK',
            text: 'Markdown'  
        }])
    })
});

test('deberia retornar un array con propiedad total y unique', () => {
    jest.setTimeout(12000)
    options.stats = true
    options.validate = false
    return mdlinks('test/prueba', options).then((respuesta) => {
        expect(respuesta).toEqual({
         "total": 3, "unique": 2 })
    })
})

test('deberia retornar un objeto con propiedad total, unique y broken', () => {
    jest.setTimeout(12000)
    options.stats = true
    options.validate = true
    return mdlinks('test/prueba', options).then((respuesta) => {
        expect(respuesta).toEqual({
         "total": 3, "unique": 2, "broken":1})
    })
})
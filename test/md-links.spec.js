const mdlinks = require('../index');
const options = {
    validate: false,
    stats: false
}

test('deberia retornar un array', () => {
    jest.setTimeout(12000)
    return mdlinks('prueba', options).then((respuesta) => {
        expect(respuesta).toEqual([{
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\prueba\\test.md'
        },
        {
            href: 'https://github.com/workshopper/learnyounode',
            text: 'learnyounode',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\prueba\\test.md'
        },
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\lizeth sucasaca\\Documents\\laboratoria\\lim20181-Track-FE-markdown-list\\prueba\\uuu.md'
        }])
    })
});
const options = {
    validate: false,
    stats: true
}
test('deberia retornar un array con un solo objeto', () => {
    jest.setTimeout(12000)
    return mdlinks('prueba', options).then((respuesta) => {
        expect(respuesta).toEqual([{
         "total": 3, "unique": 3 }])
    })
})
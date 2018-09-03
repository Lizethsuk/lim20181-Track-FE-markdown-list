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
            file: 'prueba\\test.md'
        },
        {
            href: 'https://github.com/workshopper/learnyounode',
            text: 'learnyounode',
            file: 'prueba\\test.md'
        },
        {
            href: 'https://es.wikipedia.org/wiki/Markdowni',
            text: 'Markdown',
            file: 'prueba\\uuu.md'
        }])
    })
});
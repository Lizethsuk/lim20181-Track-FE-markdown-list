const mdlinks= require('../index');

test('deberia retornar',()=>{
    jest.setTimeout(12000)
    return mdlinks().then((respuesta)=>{
        expect(respuesta).toBe('')
    })
});
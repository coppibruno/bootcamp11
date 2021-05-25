const express = require('express');

const app = express();

//compatibilidade express com json
app.use(express.json());

app.post('/start', (request, response) => {
    //pegando os request query
    const query = request.query; 

    //pegando os params
    const params = request.params;

    //pegando o body (somernte req. post)
    const {folder, name} = request.body;

    //desestruturação 
    const {title, owner } = request.query; 
    
    return response.json({ message: 'Hello World'});
})

app.listen(3333, () => {
    console.log('Back-end started!')
});

import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({message: 'Hello Brother !!!'});
})

app.listen(3333, () => {
    console.log('Server stated on port 3333')
});
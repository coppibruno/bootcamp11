const { response } = require('express');
const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const app = express();

//compatibilidade express com json
app.use(express.json());

const projects = [];

function logRequest(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel)
}

function validateProjectId(request, response, next){
    const { id } = request.params;

    if (!isUuid(id)){
        return response.status(400).json({error: 'Invalid project ID.'})
    }

    return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

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

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
})

app.put('/project/:id', validateProjectId, (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.'});
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;
    return response.json(project);
})

app.delete('/project/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
})

app.get('/projects', (request, response) => {

    const { title } = request.query;
    
    console.log(projects)

    const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

    return response.json(results);
})

app.listen(3333, () => {
    console.log('Back-end started!')
});

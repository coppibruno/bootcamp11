import { Request, Response } from 'express';
import createUser from './services/CreateUser';

//string, number, boolean, object, Array
//interface 

export function helloWorld(request: Request, response: Response) {
    const user = createUser({ 
        email: 'brunocoppi@gmail.com',
        password: '123',
        techs: [ 'Node.js',
                'ReactJS',
                'ReactJS Native',
                { title: 'Javascript', experience: 100}
            ]
    });

    return response.json({message: 'Hello World'});
}
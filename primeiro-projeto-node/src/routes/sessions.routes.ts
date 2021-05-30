import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface objResponse {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

sessionsRouter.post('/', async (request, response) => {

    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        })

        //constroi o response
        const userResponse: objResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        }

        return response.json({ user: userResponse, token})

    } catch (error) {
        return response.status(400).json({error: error.message});
    }

});

export default sessionsRouter;

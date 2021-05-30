import { response, Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


interface objReturned {
    name: string;
    email: string;
}

interface jsonUpdateAvatar {
    id: string;
    name: string;
    email: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        //retirando o password do retorno
        const object: objReturned = {
            name: user.name,
            email: user.email
        }

        return response.json(object);
    } catch (error) {
        return response.status(400).json({error: error.message})
    }
});

//atualização de campo especifico
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request: any, response) => {
    try {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });

        delete user.password;

        return response.json(user);

    } catch (error) {
        return response.status(400).json({error: error.message})
    }
})

export default usersRouter;

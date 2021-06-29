import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService{
    public async execute({ user_id, avatarFilename }: Request): Promise<any> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        console.log(user);

        if(!user){
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        if(user.avatar){
            // Deletar avatar anterior

            const userAvatarFilePatch = path.join(uploadConfig.directory, user.avatar);

            //verifica se o arquivo existe e exclui
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePatch);

            if (userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePatch);
            }

        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;

    }
}

export default UpdateUserAvatarService;

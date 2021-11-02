import { getRepository } from "typeorm";
import { User } from '../model/User';
import AppError from "../../../utils/errors/AppError";
import path from "path";
import uploadConfig from '../../../config/uploads';
import fs from "fs";

interface IRequest{
    user_id: string;
    avatarFileName: string;
}

class UpdateAvatarUserService {

    public async update({user_id, avatarFileName}: IRequest): Promise<User>{

        // iniciar baseado no modelo de Usuario

        const userRepository = getRepository(User)

        // verificar se o usuário é válido
        const user = await userRepository.findOne(user_id)

        if(!user){
            throw new AppError('Ony Authenticated users can change avatar', 401)
        }

        if(user.avatar){
            // buscar pelo arquivo do avatar do usuário
            // escolhe onde vai ser salvo, e qual avatar será removido
            const userAvatarFilePath = path.join( uploadConfig.directory, user.avatar )

            //verificar se o arquivo existe (avatar)
            // usar o FS do node como uma promisse com a função stat
            // também verificamos o status do arquivo

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExists){
                //Deletamos do sistema passando o unlink e o caminho de onde ele se encontra
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        // Pegar a instancia do usuário
        user.avatar = avatarFileName;
        // Salvar o new avatar
        await userRepository.save(user);

        return user;
    }

}



export {UpdateAvatarUserService}

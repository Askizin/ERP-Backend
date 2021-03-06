import {getRepository} from "typeorm";
import { User } from '../model/User';

import AppError from '../../../utils/errors/AppError';

interface Request{
    id: string;
    name?: string;
    email?: string;
    password?: string;
}


class SearchUserService {

    public async search(): Promise<User[]>{

        const userRepository = getRepository(User);

        const users = await userRepository.find();

        return users;

    }

    public async searchById({id}: Request): Promise<User>{

        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { id },
            relations :["roles","permissions"]
        });
        if (!checkUserExists){
            throw new AppError('User not found', 404);
        }

        return checkUserExists;
    }

}

export{SearchUserService};

import { getRepository } from 'typeorm';
import AppError from '../../../utils/errors/AppError'
import { User } from '../model/User';


interface Request{
    id: string;
}


class DeleteUserService {

    public async delete({ id }: Request ): Promise<void> {

        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { id },
        });

        if (!checkUserExists){
            throw new Error('User not exists')
        }

        try {
            const user = userRepository.delete({id});
        } catch (error) {
            new AppError('Error:', 404, error)
        }

    }

}

export { DeleteUserService }

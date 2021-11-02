import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../../../utils/errors/AppError';
import { User } from '../model/User';

interface IRequest{
    password: string;
    newPassword: string;
    user_id:string;
}
class UpdatePasswordUserService{
    public async execute ({ password, newPassword, user_id }: IRequest): Promise<User>{{
        const  userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);
        if (!user){
            throw new AppError('User not found', 404);
        }
        if(newPassword.length <= 5){
            throw new AppError('Your password must contain at least 6 caracters', 401)
        }
        if(password && !newPassword){
            throw new AppError('You need to inform the old password to set the new password!')
        }
        // COMPARA A SENHA QUE É INTRODUZIDA COM A SENHA ANTIGA DELE PARA VER SE É IGUAL...
        const checkOldPassword = await compare(password, user.password)
        if(newPassword && user.password){
            // VERIFICAR A SENHA ANTIGA É COMPATÍVEL
            if(!checkOldPassword){
                throw new AppError('Old password does not match')
            }
            // Caso a nova senha seja igual a senha antiga == erro
            if(password == newPassword){
                throw new AppError('Enter a password different from the previous one')
            }
            // Altera para a senha nova
            return userRepository.save(user)
        }
    }}
}

export { UpdatePasswordUserService };


import { getRepository } from "typeorm";
import { User } from "../../user/model/User";
import {compare} from 'bcryptjs';
import AppError from "../../../utils/errors/AppError";

import AuthConfig from "../../../config/auth";
import {sign} from 'jsonwebtoken';

//interface tipagens jaodbipfgjigapdjfo
interface IAthService {
    email:string;
    password:string;
}

//interface pra pegar os valroes adoifg´jnhopiaudfgjhoiuj
interface IResponse {
    user: User;
    token:string;
}
class AuthenticateUserService {

    /*

    Class que por enquanto não retorna nada

    */
   // metodo de autenticacao
    public async auth({email,password}:IAthService): Promise<IResponse>{
        // pegamos um repository
        const userRepository = getRepository(User);
        // procuramos um email no repositorio
        const user = await userRepository.findOne({
            where: {email}
        });
        // caso não tenha usuario, irá aparecer o erro! lembra de importar o APPERROR!!!
        if(!user){
            throw new AppError('user not found', 401)
        }

        const passwordMatched = await compare(password, user.password);
        if(!passwordMatched){
            throw new AppError('Incorrect email/password', 401)
        }

        /* Criando um Token com assinatura

        1 - Primeiro parâmetro - Informações que podem ser usadas do usuário (Não coloque credenciais)
        esse parametro chama-se Payload e pode ser descriptografado (Cuidado)
        ex: Permissions, name, id
        2 - Segundo parâmetro - Um segredo que só nossa aplicação conhece.
        O segredo usado foi gerado pelo www.md5.cz, após escolher minha paralavra secreta.
        3 - Terceiro parâmetro - configurações do Token

        */

        //importar o auth e pegamos o secret e expiresIn
        const { secret, expiresIn } = AuthConfig.jwt;
        //fazer o token e fazer ele entrar
        const token = sign({}, secret, {
            // Refere-se a qual usuário pertence o token gerado
            subject: user.id,
            // Tempo de expiração do token
            expiresIn: expiresIn
        });

        return { user, token};
    }
}


export {AuthenticateUserService};

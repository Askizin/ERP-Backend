import { Request, Response, Router } from 'express'
import { AuthenticateUserService } from '../modules/auth/services'


// criamos uma sessão
const sessionsRouter = Router();

// ROTA RESPONSÁVEL POR AUTENTICAR O USUÁRIO
sessionsRouter.post('/', async(request: Request, response: Response) => {

    //recupera os dados do corpo da requisição
    const { email, password} = request.body;

    const authenticateUser = new AuthenticateUserService();

    //Passa os dados para o serviço de autenticação

    const { user, token } = await authenticateUser.auth({email, password});

    // Retira a senha do usuário do response
    delete user.password;

    return response.json({user, token});

})


export {sessionsRouter};

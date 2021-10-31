import { response, Router } from 'express'
import { AuthenticateUserService } from '../services/auth'


// criamos uma sessão
const sessionsRouter = Router();

// ROTA RESPONSÁVEL POR AUTENTICAR O USUÁRIO
sessionsRouter.post('/', async(req, res) => {

    //recupera os dados do corpo da requisição
    const { email, password} = req.body;

    const authenticateUser = new AuthenticateUserService();

    //Passa os dados para o serviço de autenticação

    const { user, token } = await authenticateUser.auth({email, password});

    delete user.password;

    return response.json({user, token});



})


export {sessionsRouter};

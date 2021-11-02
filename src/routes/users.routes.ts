import { Request, Response, Router } from 'express';
import multer from 'multer';
import UploadConfig from '../config/uploads';
import { ensureAuthenticated } from '../utils/middlewares/ensureAuthenticated';
import { CreateUserService } from '../modules/user/services/CreateUserService';
import { DeleteUserService } from '../modules/user/services/DeleteUsersService';
import { SearchUserService } from '../modules/user/services/SearchUserService';
import { UpdateAvatarUserService } from '../modules/user/services/UpdateAvatarUserService';
import { UpdatePasswordUserService } from '../modules/user/services/UpdatePasswordUserService';

const upload = multer(UploadConfig);

const usersRouter = Router();


// ROTA RESPONSÁVEL PARA CRIAR UM USUÁRIO
usersRouter.post('/', async (request : Request, response : Response) => {

    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user =  await createUser.execute({name, email, password});

    delete user.password;

    return response.json(user);
})


// ROTA RESPONSÁVEL PARA LISTAR OS USUÁRIOS
usersRouter.get('/', ensureAuthenticated, async ( Request: Request, response:Response ) => {

    const findUser = new SearchUserService();
    const users = await findUser.search();

    return response.json(users);
})


// ROTA RESPONSÁVEL PARA PROCURAR UM ID
usersRouter.get('/find/:id', ensureAuthenticated , async (request:Request, response: Response)=>{

    const {id} =request.params

    const findUser = new SearchUserService();
    const user = await findUser.searchById({id});

    delete user.password;

    return response.json(user)

})


// ROTA RESPONSÁVEL PARA MUDAR O AVATAR
usersRouter.patch('/avatar', ensureAuthenticated ,upload.single('avatar'),async (request: Request, response: Response) => {

    // obter os dados do arquivo enviado
    // console.log(resquest.file)
    // iniciando o serviço para atualizar o avatar
    const updateAvatarUserService = new UpdateAvatarUserService();
    // Criar um usuário
    const user = await updateAvatarUserService.update({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })

    delete user.password;

    return response.json(user);

})

// ROTA RESPONSÁVEL PARA DELETAR UM USUÁRIO
usersRouter.delete('/', ensureAuthenticated, async (request: Request, response: Response) => {

    const deleteUserService = new DeleteUserService();

    const {id} = request.body;

    await deleteUserService.delete({id});

    return response.json({message:'User has been Deleted'})


})

// ROTA RESPONSÁVEL PARA MUDAR A SENHA DO USUÁRIO
usersRouter.post('/settings/security', ensureAuthenticated, async (request: Request, response: Response)=>{

    const { password, newPassword } = request.body;

    const updatePasswordUse = new UpdatePasswordUserService();

    const user = await updatePasswordUse.execute({
        user_id: request.user.id,
        password,
        newPassword,
    });

    delete user.password;

    return response.json(user);


})

export { usersRouter };

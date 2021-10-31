import { request, Request, Response, Router } from 'express';
import multer from 'multer';
import UploadConfig from '../config/uploads';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserService } from '../services/users/CreateUserService';
import { DeleteUserService } from '../services/users/DeleteUsersService';
import { SearchUserService } from '../services/users/SearchUserService';
import { UpdateAvatarUserService } from '../services/users/UpdateAvatarUserService';
import { UpdatePasswordUserService } from '../services/users/UpdatePasswordUserService';



const userRouter = Router();

const upload = multer(UploadConfig);


const usersRouter = Router();

usersRouter.post('/', async (req, res) => {


    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user =  await createUser.execute({name, email, password});

    delete user.password;

    return res.json(user);
})

usersRouter.get('/', ensureAuthenticated, async (req, res) => {

    const findUser = new SearchUserService();
    const users = await findUser.search();

    return res.json(users);
})

usersRouter.get('/find/:id', ensureAuthenticated , async (request, response)=>{

    const {id} =request.params

    const findUser = new SearchUserService();
    const user = await findUser.searchById({id});

    delete user.password;

    return response.json(user)

})

usersRouter.patch('/avatar', ensureAuthenticated ,upload.single('avatar'),async (resquest: Request, response: Response) => {

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


usersRouter.delete('/', ensureAuthenticated, async (resquest: Request, response: Response)=> {

    const deleteUserService = new DeleteUserService();

    const {id} = request.body;

    await deleteUserService.delete({id});

    return response.json({message:'User has been Deleted'})


})


usersRouter.post('/settings/security', ensureAuthenticated, async (resquest: Request, response: Response)=>{

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


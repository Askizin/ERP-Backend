
import { getRepository } from "typeorm";
import { User } from "../../user/model/User";
import AppError from "../../../utils/errors/AppError";
import { Permission } from "../../permissions/model/Permission"
import { Role } from "../../roles/model/Role";

interface IUserACLRequest{
    id: string;
    roles: string[];
    permissions: string[];
}

class CreateUserAccessControlListService{
    async execute({id, roles , permissions}:IUserACLRequest): Promise<User>{

        //Buscar os Repositorys
        const userRepository = getRepository(User);
        const permissionsRepository = getRepository(Permission);
        const rolesRepository = getRepository(Role);

        const user = await userRepository.findOne({
            where: {id}
        });

        // verificar pelo id se o usuario exist
        if(!user){
            throw new AppError('User does not exists',404)
        }

        // Capturamos os objetos utilizando os id's para cadastrar as roles e a permission
        const permissionsExists = await permissionsRepository.findByIds(permissions);
        const rolesExists = await rolesRepository.findByIds(roles);

        // apos encontrar vamos atribuir as roles e permissions ao usuario
        user.permissions = permissionsExists;
        user.roles = rolesExists;


        // salvamos nosso user
        userRepository.save(user)

        return user;
    }



}

export { CreateUserAccessControlListService }

import {Role} from "../../models/Role";
import AppError from '../../errors/AppError';
import { getRepository } from "typeorm"

interface RoleRequest {
    name: string;
    description: string;
}

class CreateRoleService {
    async execute({name, description}: RoleRequest): Promise< Role | Error> {

        const roleRepository = getRepository(Role);

        const checkRoleExists = await roleRepository.findOne(
            {where: {name} }
        )

        if (checkRoleExists){
            throw new AppError("Role alredy exists")
        }

        const role = roleRepository.create({
            name,
            description,
        })

        await roleRepository.save(role)

        return role;

    }
}
export { CreateRoleService }
import {Permission} from "../model/Permission";
import AppError from '../../../utils/errors/AppError';
import { getRepository } from "typeorm"

interface PermissionRequest {
    name: string;
    description: string;
}

class CreatePermissionService {
    async execute({name, description}: PermissionRequest): Promise< Permission | Error> {

        const permissionRepository = getRepository(Permission);

        if(name.length <= 0 || description.length <= 0){
            throw new AppError("You must provide a name and description to permission.");
        }

        const checkPermissionExists = await permissionRepository.findOne(
            {where: {name} }
        )

        if (checkPermissionExists){
            throw new AppError("Permission alredy exists")
        }

        const permission = permissionRepository.create({
            name,
            description,
        })

        await permissionRepository.save(permission)

        return permission;

    }
}

export {CreatePermissionService}

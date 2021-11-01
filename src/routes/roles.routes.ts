import {Request, Response, Router} from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateRolePermissionService } from "../services/roles/CreateRolePermissionService";
import { CreateRoleService } from "../services/roles/CreateRoleService";

const rolesRouter = Router();

rolesRouter.post('/', async (request, response) => {

    const { name, description } = request.body;

    const createRoles = new CreateRoleService()

    const roles = await createRoles.execute({name, description});

    return response.json(roles);

})

rolesRouter.post('/:role_id', ensureAuthenticated ,async (request, response) => {

    const { role_id } = request.params;
    const { permissions } = request.body;

    const createRolePermission = new CreateRolePermissionService()

    const rolePermission = await createRolePermission.execute({ role_id, permissions })

    return response.json(rolePermission);

})

export { rolesRouter }

import {Request, Response, Router} from "express";
import { CreateRoleService } from "../services/roles/CreateRoleService";

const rolesRouter = Router();

rolesRouter.post('/', async (request, response) => {

    const { name, description } = request.body;

    const createRoles = new CreateRoleService()

    const roles = await createRoles.execute({name, description});

    return response.json(roles);

})

export { rolesRouter }

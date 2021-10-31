import {Request, Response, Router} from "express";
import {CreatePermissionService } from "../services/permissions/CreatePermissionsService";

const permissionsRouter = Router();

permissionsRouter.post('/', async (request, response) => {

    const { name, description } = request.body;

    const createPermissions = new CreatePermissionService()

    const permissions = await createPermissions.execute({name, description});

    return response.json(permissions);

})

export { permissionsRouter }

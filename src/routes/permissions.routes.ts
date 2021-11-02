import {Request, Response, Router} from "express";
import {CreatePermissionService } from "../modules/permissions/services/CreatePermissionsService";

const permissionsRouter = Router();

permissionsRouter.post('/', async (request: Request, response: Response) => {

    const { name, description } = request.body;

    const createPermissions = new CreatePermissionService()

    const permissions = await createPermissions.execute({name, description});

    return response.json(permissions);

})

export { permissionsRouter }

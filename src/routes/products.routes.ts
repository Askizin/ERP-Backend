import {Request, Response, Router} from "express";
import { CreateProductService } from "../modules/products/services/CreateProductService"
import { ensureAuthenticated } from "../utils/middlewares/ensureAuthenticated";
import { SearchProductService } from "../modules/products/services/SearchProductService";
import { can, is } from '../utils/middlewares/permissions';

const productsRouter = Router();

productsRouter.post('/', ensureAuthenticated, can(["edfgadf_product"]), is(["Advenced User"]),async (request: Request, response: Response) => {

    const { name, description, price } = request.body;

    const createProduct = new CreateProductService()

    const product = await createProduct.execute({name, description, price});

    return response.json(product);

})

productsRouter.get('/', ensureAuthenticated, async (request: Request, response: Response) => {

    const findProduct = new SearchProductService();
    const product = await findProduct.search();

    return response.json(product);
})





export { productsRouter }

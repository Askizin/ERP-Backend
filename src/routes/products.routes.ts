import {Request, Response, Router} from "express";
import { CreateProductService } from "../services/products/CreateProductService"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { SearchProductService } from "../services/products/SearchProductService";

const productsRouter = Router();

productsRouter.post('/', async (request, response) => {

    const { name, description, price } = request.body;

    const createProduct = new CreateProductService()

    const product = await createProduct.execute({name, description, price});

    return response.json(product);

})

productsRouter.get('/', ensureAuthenticated ,async (request: Request, response: Response) => {

    const findProduct = new SearchProductService();
    const product = await findProduct.search();

    return response.json(product);
})





export { productsRouter }

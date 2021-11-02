import { getRepository } from "typeorm";
import { Product } from "../../models/Product";
import { ProductRepository } from "../../repositories/ProductRepository";

class SearchProductService{

    public async search(): Promise<Product[]>{

        const productRepository = getRepository(Product);

        const products = await productRepository.find();

        return products;
    }

}

export { SearchProductService }

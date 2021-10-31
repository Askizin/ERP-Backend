import {Products} from '../models/Product';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Products)
class ProductRepository extends Repository<Products>{


    public async findByName(name: string):Promise<Products | null> {

        const findProduct = await this.findOne({
            where: {name}
        });

        return findProduct || null;
    }
}

export { ProductRepository };

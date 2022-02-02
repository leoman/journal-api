import { APIGatewayEvent } from 'aws-lambda';
import { Repository } from 'typeorm';

import { Product, productDataToObject } from '../model';
import { ProductEvent } from '../types';
import { MessageUtil } from '../utils/message';
import { ProductsService } from '../service/products';


export class ProductsController extends ProductsService {
  constructor (products: Repository<Product>) {
    super(products);
  }

  /**
   * Create Product
   * @param {ProductEvent} event
   */
  async create (event: ProductEvent) {
    const product = await productDataToObject(event.body);
    try {
      const result = await this.createProduct(product);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a book by id
   * @param event
   */
  async update (event: ProductEvent) {
    const id: number = Number(event.pathParameters.id);
    let product: Product = await this.findOneProductById(id);
    product = await productDataToObject(event.body, product);

    try {
      const result = await this.updateProduct(product);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find Product list
   */
  async find (event: APIGatewayEvent) {
    try {
      const status: string|undefined = event.queryStringParameters?.status;

      const result = await this.findProducts(status);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query Product by id
   * @param event
   * @param context
   */
  async findOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneProductById(id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete Product by id
   * @param event
   */
  async deleteOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.deleteOneProductById(id);

      if (result.affected === 0) {
        return MessageUtil.success({ message: 'The data was not found! May have been deleted!' });
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}

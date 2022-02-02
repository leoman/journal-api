import { Repository, DeleteResult } from 'typeorm';
import { Product } from '../model';

export class ProductsService {
  private repository: Repository<Product>;
  constructor(repository: Repository<Product>) {
    this.repository = repository;
  }

  /**
   * Create Product
   * @param {Product} product
   */
  protected async createProduct (product: Product): Promise<Product> {
    try {
      const result = await this.repository.save(product);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Update a product
   * @param {Product} product
   */
  protected updateProduct (product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  /**
   * Find Products
   * @param {string?} status
   */
  protected findProducts (status: string|undefined): Promise<Product[]> {
    let filters: object = { relations: ["themes"] }

    if (status) {
      filters = {
        where: { status },
        ...filters,
      };
    }
    return this.repository.find(filters);
  }

  /**
   * Query Product by id
   * @param {number} id
   */
  protected findOneProductById (id: number): Promise<Product> {
    return this.repository.findOne({ id }, { relations: ["themes"] });
  }

  /**
   * Delete Product by id
   * @param {number} id
   */
  protected deleteOneProductById (id: number): Promise<DeleteResult> {
    return this.repository.softDelete(id);
  }
}

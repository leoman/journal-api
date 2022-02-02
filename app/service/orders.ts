import { Repository, DeleteResult } from 'typeorm';
import { Order } from '../model';

export class OrdersService {
  private repository: Repository<Order>;
  constructor(repository: Repository<Order>) {
    this.repository = repository;
  }

  /**
   * Create Order
   * @param {Order} order
   */
  protected async createOrder (order: Order): Promise<Order> {
    try {
      const result = await this.repository.save(order);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Update a order by id
   * @param {Order} order
   */
  protected updateOrder (order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  /**
   * Find Orders
   */
  protected findOrders (): Promise<Order[]> {
    return this.repository.find();
  }

  /**
   * Query Order by id
   * @param id
   */
  protected findOneOrderById (id: number): Promise<Order> {
    return this.repository.findOne({ id });
  }

  /**
   * Delete Order by id
   * @param id
   */
  protected deleteOneOrderById (id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

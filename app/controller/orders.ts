import { APIGatewayEvent } from 'aws-lambda';
import { Repository, Connection } from 'typeorm';

import { Order, orderDataToObject, Product } from '../model';
import { OrderEvent } from '../types';
import { MessageUtil } from '../utils/message';
import { OrdersService } from '../service/orders';


export class OrdersController extends OrdersService {
  constructor (orders: Repository<Order>) {
    super(orders);
  }

  /**
   * Create Order
   * @param {OrderEvent} event
   */
  async create (event: OrderEvent, connection: Connection) {
    const { product: productId } = event.body;
    const productRepo = connection.getRepository(Product);
    const product = await productRepo.findOne({ id: productId })

    const order = orderDataToObject(event.body, null, product);

    try {
      const result = await this.createOrder(order);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a order by id
   * @param {OrderEvent} event
   */
  async update (event: OrderEvent) {
    const id: number = Number(event.pathParameters.id);
    let order: Order = await this.findOneOrderById(id);
    order = orderDataToObject(event.body, order);

    try {
      const result = await this.updateOrder(order);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find Order list
   * @param {APIGatewayEvent} event
   */
  async find () {
    try {
      const result = await this.findOrders();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query Order by id
   * @param {APIGatewayEvent} event
   */
  async findOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneOrderById(id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete Order by id
   * @param {APIGatewayEvent} event
   */
  async deleteOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.deleteOneOrderById(id);

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

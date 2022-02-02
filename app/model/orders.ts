import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from './products';

export enum OrderStatus {
  PENDING = "pending",
  FAILED = "failed",
  PAID = "paid",
  EXECUTED = "paypal-executed",
}

export interface OrderDTO {
  name: string;
  email: string;
  status: OrderStatus;
  pricePence: number;
  product: number;
}

export const orderDataToObject = (
  {
    name,
    email,
    status,
    pricePence,
  }: OrderDTO,
  currentOrder?: Order,
  product?: Product
): Order => {
  let order = new Order();
  if (currentOrder) {
    order = currentOrder;
  }

  order.name = name;
  order.email = email;
  order.status = status;
  order.pricePence = pricePence;

  if (product) {
    order.product = product;
  }
  return order;
};

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
      type: 'double precision',
      nullable: true,
    })
    pricePence: number;

    @Column({
      type: "enum",
      enum: OrderStatus,
      default: OrderStatus.PENDING
    })
    status: OrderStatus;

    @ManyToOne(() => Product, product => product.orders, {
      cascade: ["insert", "update"]
    })
    product: Product;
}
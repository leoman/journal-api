import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, OneToMany } from "typeorm";
import slugify from 'slugify';
import { Theme } from './themes';
import { Order } from './orders';

export enum ProductStatus {
  DRAFT = "draft",
  LIVE = "live",
}

export enum ProductType {
  PRINT = "print",
  CLASS = "class",
}

export interface ProductDTO {
  title: string;
  subtitle?: string;
  productType: ProductType; 
  content?: string;
  pricePence?: number;
  priceCurrency?: string;
  excerpt?: string;
  date: Date;
  photo?: string;
  status: ProductStatus;
  themes?: number[];
}

export const productDataToObject = async (
  {
    title,
    subtitle,
    productType,
    content,
    excerpt,
    pricePence,
    date,
    photo,
    status,
    themes,
  }: ProductDTO,
  currentProduct?: Product
): Promise<Product> => {
  let product = new Product();
  if (currentProduct) {
    product = currentProduct;
  }

  product.title = title;
  product.subtitle = subtitle;
  product.productType = productType;
  product.content = content;
  product.excerpt = excerpt;
  product.pricePence = pricePence;
  product.date = date;
  product.photo = photo;
  product.status = status;

  if (themes) {
    const themeObjects = [];
    for (const id of themes) {
      themeObjects.push({ id });
    };
    product.themes = themeObjects;
  }

  return product;
};

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({
      nullable: true,
    })
    subtitle: string;

    @Column({
      type: "enum",
      enum: ProductType,
      default: ProductType.CLASS
    })
    productType: ProductType;

    @Column({
      type: 'text',
      nullable: true,
    })
    content: string;

    @Column({
      type: 'double precision',
      nullable: true,
    })
    pricePence: number;

    @Column({
      type: 'text',
      nullable: true,
      default: 'GBP',
    })
    priceCurrency: string;

    @Column({
      type: 'text',
      nullable: true,
    })
    excerpt: string;

    @Column()
    date: Date;

    @Column({
      nullable: true,
    })
    photo: string;

    @Column({
      type: "enum",
      enum: ProductStatus,
      default: ProductStatus.DRAFT
    })
    status: ProductStatus;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    updateDates() {
      this.slug = slugify(this.title.toLowerCase())
    }

    @OneToMany(() => Order, order => order.product, {
      cascade: false
    })
    orders: Order[];

    @ManyToMany(() => Theme, (theme: Theme) => theme.products, {
      cascade: true
    })
    @JoinTable()
    themes: Theme[];
}
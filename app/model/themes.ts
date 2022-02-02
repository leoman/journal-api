import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Post } from './posts';
import { Product } from './products';

interface DTO {
  name: string;
}

export const themeDataToObject = ({
  name,
}: DTO): Theme => {
  const theme = new Theme();
  theme.name = name;
  return theme;
};

@Entity()
export class Theme {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Post, post => post.themes)
    posts: Post[];

    @ManyToMany(() => Product, product => product.themes)
    products: Product[];
}
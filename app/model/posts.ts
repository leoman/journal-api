import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from "typeorm";
import slugify from 'slugify'
import { Theme } from './themes';

export enum Status {
  DRAFT = "draft",
  LIVE = "live",
}

export interface PostDTO {
  title: string;
  subtitle?: string;
  content?: string;
  excerpt?: string;
  sticky: Boolean;
  date: Date;
  photo?: string;
  status: Status;
  themes?: number[];
}

export const dataToObject = (
  {
    title,
    subtitle,
    content,
    excerpt,
    sticky,
    date,
    photo,
    status,
    themes
  }: PostDTO,
  currentPost?: Post
): Post => {
  let post = new Post();
  if (currentPost) {
    post = currentPost;
  }
  post.title = title;
  post.subtitle = subtitle;
  post.content = content;
  post.excerpt = excerpt;
  post.sticky = sticky;
  post.date = date;
  post.photo = photo;
  post.status = status;

  if (themes) {
    const themeObjects = [];
    for (const id of themes) {
      themeObjects.push({ id });
    };
    post.themes = themeObjects;
  }

  return post;
};

@Entity()
export class Post {

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
      type: 'text',
      nullable: true,
    })
    content: string;

    @Column({
      type: 'text',
      nullable: true,
    })
    excerpt: string;

    @Column()
    sticky: Boolean

    @Column()
    date: Date;

    @Column({
      nullable: true,
    })
    photo: string;

    @Column({
      type: "enum",
      enum: Status,
      default: Status.DRAFT
    })
    status: Status;

    @BeforeInsert()
    @BeforeUpdate()
    updateDates() {
      this.slug = slugify(this.title.toLowerCase())
    }

    @ManyToMany(() => Theme, {
      cascade: true
    })
    @JoinTable()
    themes: Theme[];
}
import { Context } from 'aws-lambda';
import { Connection } from 'typeorm';
import {
  PostsController,
  ProductsController,
  ThemesController,
  OrdersController,
  GalleryImagesController,
} from '../controller';

type Controller = PostsController | ProductsController | ThemesController | OrdersController | GalleryImagesController;

interface MiddyContext extends Context {
  connection: Connection;
  controller: Controller;
}

export * from './posts';
export * from './products';
export * from './themes';
export * from './orders';
export * from './galleryImages';

export {
  Connection,
  Controller,
  MiddyContext,
};

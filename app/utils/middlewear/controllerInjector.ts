// import { Repository } from "typeorm";
// import {
//   Controller,
// } from '../../types';
import "reflect-metadata";
import { Repository } from 'typeorm';
import {
  Post,
  Product,
  Order,
  Theme,
  GalleryImage
} from '../../model';

type Model = Post | Product | Order | Theme | GalleryImage;

interface Props {
  controller: any;
  // controller: new (Repository: Repository<Object>) => Controller;
  model: string;
}

export enum Models {
  POST = 'Post',
  PRODUCT = "Product",
  ORDER = "Order",
  THEME = "Theme",
  GALLERY_IMAGE = "GalleryImage",
}


export default (opts: Props) => {
  const { controller: Controller, model } = opts;

  return {
    before: async (request) => {
      console.info(`Initiating repository`);
      request.context.connection
      let repository: Repository<Model>;
      switch (model) {
        case Models.POST: {
          repository = request.context.connection.getRepository(Post);
          break;
        }
        case Models.PRODUCT: {
          repository = request.context.connection.getRepository(Product);
          break;
        }
        case Models.ORDER: {
          repository = request.context.connection.getRepository(Order);
          break;
        }
        case Models.THEME: {
          repository = request.context.connection.getRepository(Theme);
          break;
        }
        case Models.GALLERY_IMAGE: {
          repository = request.context.connection.getRepository(GalleryImage);
          break;
        }
        default: {
          throw new Error(`No entity matching: ${model} found`)
        }
      }
      console.info(`Done initiating repository`);
      const controller = new Controller(repository);
      request.context.controller = controller
      console.info(`Done Initiating controller`);
    },
  };
};
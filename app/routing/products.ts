
import { Handler, APIGatewayEvent } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import dbInjector from '../utils/middlewear/dbinjector'
import controllerInjector from '../utils/middlewear/controllerInjector'
import { MiddyContext as Context } from '../types';

import { ProductEvent } from '../types';
import { ProductsController } from '../controller/products';

interface MiddyContext extends Context {
  controller: ProductsController
}

export const create: Handler = async (event: ProductEvent, { controller }: MiddyContext) => {
  try {
    return await controller.create(event);
  } catch (error) {
    console.error(error);
  }
};

export const update: Handler = async (event: ProductEvent, { controller }: MiddyContext) => {
  try {
    return await controller.update(event);
  } catch (error) {
    console.error(error);
  }
};

export const findProduct: Handler = async (event: APIGatewayEvent, { controller }: MiddyContext) => {
  try {
    return await controller.find(event);
  } catch (error) {
    console.error(error);
  }
}

export const findOne: Handler = (event: APIGatewayEvent, { controller }: MiddyContext) => {
  try {
    return controller.findOne(event);
  } catch (error) {
    console.error(error);
  }
};

export const deleteOne: Handler = (event: APIGatewayEvent, { controller }: MiddyContext) => {
  try {
    return controller.deleteOne(event);
  } catch (error) {
    console.error(error);
  }
};

export const createHandler = middy(create)
  .use(dbInjector())
  .use(jsonBodyParser())
  .use(controllerInjector({ controller: ProductsController, model: 'Product' }));

export const updateHandler = middy(update)
  .use(dbInjector())
  .use(jsonBodyParser())
  .use(controllerInjector({ controller: ProductsController, model: 'Product' }));

export const findHandler = middy(findProduct)
  .use(dbInjector())
  .use(controllerInjector({ controller: ProductsController, model: 'Product' }));

export const findOneHandler = middy(findOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: ProductsController, model: 'Product' }));

export const deleteOneHandler = middy(deleteOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: ProductsController, model: 'Product' }));
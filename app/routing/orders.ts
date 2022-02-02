
import { Handler, APIGatewayEvent } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import dbInjector from '../utils/middlewear/dbinjector'
import controllerInjector from '../utils/middlewear/controllerInjector'
import { MiddyContext as Context } from '../types';

import { OrderEvent } from '../types';
import { OrdersController } from '../controller/orders';

interface MiddyContext extends Context {
  controller: OrdersController
}

export const create: Handler = async (event: OrderEvent, { controller, connection }: MiddyContext) => {
  try {
    return await controller.create(event, connection);
  } catch (error) {
    console.error(error);
  }
};

export const update: Handler = async (event: OrderEvent, { controller }: MiddyContext) => {
  try {
    return await controller.update(event);
  } catch (error) {
    console.error(error);
  }
};

export const findOrder: Handler = async (_event, { controller }: MiddyContext) => {
  try {
    return await controller.find();
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
  .use(controllerInjector({ controller: OrdersController, model: 'Order' }));

export const updateHandler = middy(update)
  .use(dbInjector())
  .use(jsonBodyParser())
  .use(controllerInjector({ controller: OrdersController, model: 'Order' }));

export const findHandler = middy(findOrder)
  .use(dbInjector())
  .use(controllerInjector({ controller: OrdersController, model: 'Order' }));

export const findOneHandler = middy(findOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: OrdersController, model: 'Order' }));

export const deleteOneHandler = middy(deleteOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: OrdersController, model: 'Order' }));
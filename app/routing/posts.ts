
import { Handler, APIGatewayEvent } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import dbInjector from '../utils/middlewear/dbinjector'
import controllerInjector from '../utils/middlewear/controllerInjector'
import { MiddyContext as Context } from '../types';

import { PostEvent } from '../types';
import { PostsController } from '../controller/posts';

interface MiddyContext extends Context {
  controller: PostsController
}

export const create: Handler = async (event: PostEvent, { controller }: MiddyContext) => {
  try {
    return await controller.create(event);
  } catch (error) {
    console.error(error);
  }
};

export const update: Handler = async (event: PostEvent, { controller }: MiddyContext) => {
  try {
    return await controller.update(event);
  } catch (error) {
    console.error(error);
  }
};

export const findPost: Handler = async (event: APIGatewayEvent, { controller }: MiddyContext) => {
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
  .use(controllerInjector({ controller: PostsController, model: 'Post' }));

export const updateHandler = middy(update)
  .use(dbInjector())
  .use(jsonBodyParser())
  .use(controllerInjector({ controller: PostsController, model: 'Post' }));

export const findHandler = middy(findPost)
  .use(dbInjector())
  .use(controllerInjector({ controller: PostsController, model: 'Post' }));

export const findOneHandler = middy(findOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: PostsController, model: 'Post' }));

export const deleteOneHandler = middy(deleteOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: PostsController, model: 'Post' }));
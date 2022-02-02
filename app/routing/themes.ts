
import { Handler, APIGatewayEvent } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import dbInjector from '../utils/middlewear/dbinjector'
import controllerInjector from '../utils/middlewear/controllerInjector'
import { MiddyContext as Context } from '../types';

import { ThemeEvent } from '../types';
import { ThemesController } from '../controller/themes';

interface MiddyContext extends Context {
  controller: ThemesController
}

export const create: Handler = async (event: ThemeEvent, { controller }: MiddyContext) => {
  try {
    return await controller.create(event);
  } catch (error) {
    console.error(error);
  }
};

export const update: Handler = async (event: ThemeEvent, { controller }: MiddyContext) => {
  try {
    return await controller.update(event);
  } catch (error) {
    console.error(error);
  }
};

export const findTheme: Handler = async (_event, { controller }: MiddyContext) => {
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
  .use(controllerInjector({ controller: ThemesController, model: 'Theme' }));

export const updateHandler = middy(update)
  .use(dbInjector())
  .use(jsonBodyParser())
  .use(controllerInjector({ controller: ThemesController, model: 'Theme' }));

export const findHandler = middy(findTheme)
  .use(dbInjector())
  .use(controllerInjector({ controller: ThemesController, model: 'Theme' }));

export const findOneHandler = middy(findOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: ThemesController, model: 'Theme' }));

export const deleteOneHandler = middy(deleteOne)
  .use(dbInjector())
  .use(controllerInjector({ controller: ThemesController, model: 'Theme' }));
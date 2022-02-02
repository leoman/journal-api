import { APIGatewayEvent } from 'aws-lambda';
import { Repository } from 'typeorm';

import { Theme, themeDataToObject } from '../model';
import { ThemeEvent } from '../types';
import { MessageUtil } from '../utils/message';
import { ThemesService } from '../service/themes';


export class ThemesController extends ThemesService {
  constructor (themes: Repository<Theme>) {
    super(themes);
  }

  /**
   * Create Theme
   * @param {ThemeEvent} event
   */
  async create (event: ThemeEvent) {
    const theme = themeDataToObject(event.body);

    try {
      const result = await this.createTheme(theme);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a book by id
   * @param event
   */
  async update (event: ThemeEvent) {
    const id: number = Number(event.pathParameters.id);
    const theme: Theme = themeDataToObject(event.body);

    try {
      const result = await this.updateTheme(id, theme);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find Theme list
   */
  async find () {
    try {
      const result = await this.findThemes();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query Theme by id
   * @param event
   * @param context
   */
  async findOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneThemeById(id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete Theme by id
   * @param event
   */
  async deleteOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.deleteOneThemeById(id);

      if (result.affected === 0) {
        return MessageUtil.success({ message: 'The data was not found! May have been deleted!' });
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}

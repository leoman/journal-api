import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Theme } from '../model';

export class ThemesService {
  private repository: Repository<Theme>;
  constructor(repository: Repository<Theme>) {
    this.repository = repository;
  }

  /**
   * Create Theme
   * @param params
   */
  protected async createTheme (theme: Theme): Promise<Theme> {
    try {
      const result = await this.repository.save(theme);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Update a theme by id
   * @param id
   * @param data
   */
  protected updateTheme (id: number, theme: Theme): Promise<UpdateResult> {
    return this.repository.update(
      id,
      theme,
    );
  }

  /**
   * Find Themes
   */
  protected findThemes (): Promise<Theme[]> {
    return this.repository.find();
  }

  /**
   * Query Theme by id
   * @param id
   */
  protected findOneThemeById (id: number): Promise<Theme> {
    return this.repository.findOne({ id });
  }

  /**
   * Delete Theme by id
   * @param id
   */
  protected deleteOneThemeById (id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

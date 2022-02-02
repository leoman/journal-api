import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { GalleryImage } from '../model';

export class GalleryImagesService {
  private repository: Repository<GalleryImage>;
  constructor(repository: Repository<GalleryImage>) {
    this.repository = repository;
  }

  /**
   * Create GalleryImage
   * @param params
   */
  protected async createGalleryImages (galleryImage: GalleryImage): Promise<GalleryImage> {
    try {
      const result = await this.repository.save(galleryImage);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Update a galleryImage by id
   * @param id
   * @param data
   */
  protected updateGalleryImages (id: number, galleryImage: GalleryImage): Promise<UpdateResult> {
    return this.repository.update(
      id,
      galleryImage,
    );
  }

  /**
   * Find GalleryImages
   */
  protected findGalleryImages (): Promise<GalleryImage[]> {
    return this.repository.find();
  }

  /**
   * Query GalleryImage by id
   * @param id
   */
  protected findOneGalleryImageById (id: number): Promise<GalleryImage> {
    return this.repository.findOne({ id });
  }

  /**
   * Delete GalleryImage by id
   * @param id
   */
  protected deleteOneGalleryImageById (id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

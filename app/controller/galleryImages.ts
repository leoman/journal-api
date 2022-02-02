import { APIGatewayEvent } from 'aws-lambda';
import { Repository } from 'typeorm';

import { GalleryImage, galleryImageDataToObject } from '../model';
import { GalleryImageEvent } from '../types';
import { MessageUtil } from '../utils/message';
import { GalleryImagesService } from '../service/galleryImages';


export class GalleryImagesController extends GalleryImagesService {
  constructor (galleryImages: Repository<GalleryImage>) {
    super(galleryImages);
  }

  /**
   * Create GalleryImage
   * @param {GalleryImageEvent} event
   */
  async create (event: GalleryImageEvent) {
    const galleryImage = galleryImageDataToObject(event.body);

    try {
      const result = await this.createGalleryImages(galleryImage);
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
  async update (event: GalleryImageEvent) {
    const id: number = Number(event.pathParameters.id);
    const galleryImage: GalleryImage = galleryImageDataToObject(event.body);

    try {
      const result = await this.updateGalleryImages(id, galleryImage);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find GalleryImage list
   */
  async find () {
    try {
      const result = await this.findGalleryImages();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query GalleryImage by id
   * @param event
   * @param context
   */
  async findOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneGalleryImageById(id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete GalleryImage by id
   * @param event
   */
  async deleteOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.deleteOneGalleryImageById(id);

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

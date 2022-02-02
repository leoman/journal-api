import { APIGatewayEvent } from 'aws-lambda';
import { Repository } from 'typeorm';

import { Post, dataToObject } from '../model';
import { PostEvent } from '../types';
import { MessageUtil } from '../utils/message';
import { PostsService } from '../service/posts';


export class PostsController extends PostsService {
  constructor (posts: Repository<Post>) {
    super(posts);
  }

  /**
   * Create Post
   * @param {PostEvent} event
   */
  async create (event: PostEvent) {
    const post = dataToObject(event.body);

    try {
      const result = await this.createPost(post);
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
  async update (event: PostEvent) {
    const id: number = Number(event.pathParameters.id);
    let post: Post = await this.findOnePostById(id);
    post = dataToObject(event.body, post);

    try {
      const result = await this.updatePost(post);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find Post list
   */
  async find (event: APIGatewayEvent) {
    try {
      const status: string|undefined = event.queryStringParameters?.status;

      const result = await this.findPosts(status);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query Post by id
   * @param event
   * @param context
   */
  async findOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOnePostById(id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete Post by id
   * @param event
   */
  async deleteOne (event: APIGatewayEvent) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.deleteOnePostById(id);

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

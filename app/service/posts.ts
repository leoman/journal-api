import { Repository, DeleteResult } from 'typeorm';
import { Post } from '../model';

export class PostsService {
  private repository: Repository<Post>;
  constructor(repository: Repository<Post>) {
    this.repository = repository;
  }

  /**
   * Create Post
   * @param {Post} post
   */
  protected async createPost (post: Post): Promise<Post> {
    try {
      const result = await this.repository.save(post);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Update a post by id
   * @param {Post} post
   */
  protected updatePost (post: Post): Promise<Post> {
    return this.repository.save(post);
  }

  /**
   * Find Posts
   */
  protected findPosts (status: string|undefined): Promise<Post[]> {
    let filters: object = { relations: ["themes"] }

    if (status) {
      filters = {
        where: { status },
        ...filters,
      };
    }

    return this.repository.find(filters);
  }

  /**
   * Query Post by id
   * @param id
   */
  protected findOnePostById (id: number): Promise<Post> {
    return this.repository.findOne({ id }, { relations: ["themes"] });
  }

  /**
   * Delete Post by id
   * @param id
   */
  protected deleteOnePostById (id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}

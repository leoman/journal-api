import { EntityRepository, Repository } from "typeorm";
import { Post } from "../model";

@EntityRepository(Post)
class PostsRepositories extends Repository<Post> {}

export { PostsRepositories };

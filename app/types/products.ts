import { APIGatewayEvent } from 'aws-lambda';
import { ProductDTO } from '../model';

type ProductEvent = APIGatewayEvent & {
  body: ProductDTO
}

export { ProductEvent }
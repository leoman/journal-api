import { APIGatewayEvent } from 'aws-lambda';
import { OrderDTO } from '../model';

type OrderEvent = APIGatewayEvent & {
  body: OrderDTO
}

export { OrderEvent }
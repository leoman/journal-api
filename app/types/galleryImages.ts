import { APIGatewayEvent } from 'aws-lambda';
import { GalleryImageDTO } from '../model';

type GalleryImageEvent = APIGatewayEvent & {
  body: GalleryImageDTO
}

export { GalleryImageEvent }
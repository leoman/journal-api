import { APIGatewayEvent } from 'aws-lambda';
import { Theme } from '../model';

type ThemeEvent = APIGatewayEvent & {
  body: Theme
}

export { ThemeEvent }
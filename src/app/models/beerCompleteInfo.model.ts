import { Beer } from './beer.model';

export interface BeerCompleteInfo extends Beer {
  description: string;
  alcoholPercent: string;
  idBeerType: number;
  idBrewery: number;
  breweryName: string;
}

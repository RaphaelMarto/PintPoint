import { Beer } from './ibeer';

export interface BeerCompleteInfo extends Beer {
  description: string;
  alcoholPercent: number;
  idBeerType: number;
  idBrewery: number;
  breweryName: string;
  rate: number;
}

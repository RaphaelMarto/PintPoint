import { Beer } from './ibeer';

export interface BeerCompleteInfo extends Beer {
  description: string;
  alcoholPercent: string;
  idBeerType: number;
  idBrewery: number;
  breweryName: string;
}

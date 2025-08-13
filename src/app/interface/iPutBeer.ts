export interface IPutBeer {
    id: number;
    name: string;
    price: number | null;
    pictureUrl: string;
    description: string;
    alcoholPercent: number | null;
    idBeerType: number | null;
    idBrewery: number | null;
    capacity: number | null;
    birthYear: number;
}
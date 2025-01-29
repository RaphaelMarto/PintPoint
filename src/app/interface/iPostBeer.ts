export interface IPostBeer {
    name: string;
    price: number | null;
    pictureUrl: string;
    description: string;
    alcoholPercent: number | null;
    idBeerType: number | null;
    idBrewery: number | null;
    capacity: number | null;
    rating: number | null;
    updatedAt: string;
    createdAt: string;
    birthYear: number;
}
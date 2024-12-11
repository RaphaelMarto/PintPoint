import { Beer } from "./beer.model";

export interface OffsetResultBeer {
    results: Beer[];
    total: number;
}
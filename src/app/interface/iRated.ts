import { IUser } from "./iUser";

export interface IRated extends IUser {
    id: number;
    rate: number;
    comment: string;
    likes: number;
    updatedAt: string;
    idUser: number;
    liked: boolean;
    createdAt: string;
}
import { FileHandle } from "./file-handle";

export interface Movie {
    id: number;
    title: string;
    genre: string;
    duration: string;
    description: string;
    language: string;
    rating: number;
    movieImages: FileHandle[]
    price: number;
    trailerVideoId: string;
}
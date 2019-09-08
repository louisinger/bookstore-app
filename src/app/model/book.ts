export interface Book {
    id?: number;
    title: string;
    publisher: string;
    type?: string;
    numberOfPages?: number;
    isFavorite: boolean;
}
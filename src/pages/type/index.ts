export interface IProduct {
    id: number;
    description?: string;
    name: string;
    price?: number;
    thumbnail?: string;
    category?: {
        id: number;
        name: string;
    };
}

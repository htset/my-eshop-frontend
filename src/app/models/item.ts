import {Image} from './image';
export interface Item{
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string; 
    images?: Image[];
}
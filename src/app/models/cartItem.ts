import { Item } from "./item";

export class CartItem {
    public item: Item = {id: 0, name:"", price: 0, category: "", description: ""};
    public quantity: number = 0;
}
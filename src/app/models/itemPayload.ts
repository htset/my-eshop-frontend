import { Item } from "./item";

export class ItemPayload{

    constructor(
        public items: Item[],
        public count: number 
    ) { }

}
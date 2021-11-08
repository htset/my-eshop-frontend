import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item';
import { ItemPayload } from '../models/itemPayload';

const mock_items:ItemPayload = {
  items: [
    {id: 1, name: 'Adidas Stan Smith', price: 90.0, category: 'Shoes', description: ''},
    {id: 2, name: 'Nike Air Max', price: 110.0, category: 'Shoes', description: ''},
    {id: 3, name: 'Reebok Sweat Shirt', price: 45.0, category: 'Clothes', description: ''},
    {id: 4, name: 'Puma T-Shirt', price: 30.0, category: 'Clothes', description: ''},
    {id: 5, name: 'Under Armour', price: 130.0, category: 'Shoes', description: ''},
    {id: 6, name: 'Nike Sweat shirt', price: 65.0, category: 'Clothes', description: ''}
  ],
  count: 6
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  getItems(page:number, pageSize:number): Observable<ItemPayload> {
    let payload:ItemPayload = {
      items: mock_items.items.slice((page-1)*pageSize, page*pageSize),
      count: 6
    }
    return of(payload);
  }

  getItem(id:number): Observable<Item>{
    return of(mock_items.items[id-1]);
  }
  
  constructor() { }
}

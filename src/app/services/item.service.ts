import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Filter } from '../models/filter';
import { Item } from '../models/item';
import { ItemPayload } from '../models/itemPayload';

const mock_items:ItemPayload = {
  items: [
    {id: 1, name: 'Adidas Stan Smith', price: 90.0, category: 'Shoes', description: ''},
    {id: 2, name: 'Nike Air Max', price: 110.0, category: 'Shoes', description: ''},
    {id: 3, name: 'Reebok Sweat Shirt', price: 45.0, category: 'Clothes', description: ''},
    {id: 4, name: 'Puma T-Shirt', price: 30.0, category: 'Clothes', description: ''},
    {id: 5, name: 'Under Armour', price: 130.0, category: 'Shoes', description: ''},
    {id: 6, name: 'Nike Sweat shirt', price: 65.0, category: 'Clothes', description: ''},
    {id: 7, name: 'Spalding basketball', price: 43.0, category: 'Gear', description: ''},
    {id: 8, name: 'Dumbbell 5kg', price: 3.50, category: 'Gear', description: ''},
    {id: 9, name: 'New Balance', price: 120.0, category: 'Shoes', description: ''}
  ],
  count: 8
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  getItems(page:number, pageSize:number, filter:Filter): Observable<ItemPayload> {
    let filteredItems:Item[] = mock_items.items.filter(item => 
        { 
          return (
            item.name.indexOf(filter.name) >= 0 
            && 
            (filter.categories.length == 0 || filter.categories.includes(item.category) ) 
          );
        }
      );

    let payload:ItemPayload = {
      items: filteredItems.slice((page-1)*pageSize, page*pageSize),
      count: filteredItems.length
    }
    return of(payload);
  }

  getItem(id:number): Observable<Item>{
    return of(mock_items.items[id-1]);
  }
  
  constructor() { }
}

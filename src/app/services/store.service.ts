import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly _items = new BehaviorSubject<Item[]>([]);
  readonly items$ = this._items.asObservable(); 
  
  get items(): Item[] {
    return this._items.getValue();
  }

  set items(val: Item[]) {
    this._items.next(val);
  }

  constructor() { }

}

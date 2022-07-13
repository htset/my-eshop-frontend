import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from '../models/filter';
import { Item } from '../models/item';
import { ItemPayload } from '../models/itemPayload';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  itemsUrl = `${environment.apiUrl}/items`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getItems(page:number, pageSize:number, filter:Filter): Observable<ItemPayload>{
    let categoriesString:string = "";
    filter.categories.forEach(cc => categoriesString = categoriesString  + cc + "#");
    if(categoriesString.length > 0)
    categoriesString = categoriesString.substring(0, categoriesString.length -1);

    let params = new HttpParams()
              .set("name", filter.name)
              .set("pageNumber", page.toString())
              .set("pageSize", pageSize.toString())
              .set("category", categoriesString);

    return this.http.get<ItemPayload>(this.itemsUrl, {params: params})
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  updateItem(item: Item): Observable<Item> {
    const id = item.id;
    const url = `${this.itemsUrl}/${id}`;
    
    return this.http.put<Item>(url, item, this.httpOptions);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions);
  }

  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions);
  }  
}

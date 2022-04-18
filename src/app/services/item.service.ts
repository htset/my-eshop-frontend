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
    return this.http.get<Item>(url)
  }

  constructor(private http: HttpClient) { }
}

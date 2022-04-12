import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };  
  constructor(private http: HttpClient) { }

  addOrder(order: Order){
    return this.http.post<Order>(`${environment.apiUrl}/order`, order);
  }
}

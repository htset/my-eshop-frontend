import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  addUser(user:User){
    return this.http.post<User>(`${environment.apiUrl}/users`, user, this.httpOptions);
  }
  
  getAddressByUserId(userId: number) {
    return this.http.get<Address[]>(`${environment.apiUrl}/address/${userId}`);
  }       

  saveAddress(address: Address) {
    return this.http.post<Address>(`${environment.apiUrl}/address`, address);
  }       

  deleteAddress(addressId?: number) {
    return this.http.delete<number>(`${environment.apiUrl}/address/${addressId}`);
  }       

}

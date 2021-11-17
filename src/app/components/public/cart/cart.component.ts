import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public storeService: StoreService) { }
 
  removeFromCart(item: CartItem){
    this.storeService.cart.removeItem(item);
  }
 
  emptyCart(){
    this.storeService.cart.emptyCart();
  }
  
  ngOnInit(): void {
  }

}

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

  onQuantityChange(event:any, itemId: number) {
    let newQuantity = parseInt(event.target.value);
    if(Number.isNaN(newQuantity) || newQuantity < 0){
      newQuantity = 0;
      event.target.value = 0;
    }

    this.storeService.cart.cartItems = this.storeService.cart.cartItems.map(item => {
      if(item.item.id === itemId )
        item.quantity = newQuantity;
      return item;
    });
    this.storeService.cart.updateLocalStorage();
  }
}

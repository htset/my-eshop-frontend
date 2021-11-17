import { CartItem } from "./cartItem";

export class Cart {
    cartItems: CartItem[] = [];

    addItem(cartItem: CartItem){
      let found:boolean = false;
      this.cartItems = this.cartItems.map(ci => 
        {
          if(ci.item?.id == cartItem.item?.id){ 
              ci.quantity++; 
              found = true;
          }
        return ci;
        });

      if(!found){
          this.cartItems.push(cartItem);
      }
    }

    removeItem(item:CartItem) {
      const index = this.cartItems.indexOf(item, 0);
      if (index > -1) {
          this.cartItems.splice(index, 1);
      }
    }

    emptyCart(){
      this.cartItems = [];
    }

    getTotalValue():number {
      //let total: number = 0;
      let sum = this.cartItems.reduce(
          (a, b) => {a = a + b.item?.price * b.quantity; return a;}, 0);
      return sum;
    }

    isCartValid(): boolean{
      if(this.cartItems.find(cartitem => (cartitem.quantity == null || cartitem.quantity <= 0)) === undefined)
          return true;      
      return false;
    }
}
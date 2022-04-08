import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  addressIdForModification: number = -1;
  selectedAddressId: number = -1;
  addressList?:Address[];
  
  constructor(public storeService: StoreService,
    public userService: UserService,
    public router: Router ) { }

  ngOnInit(): void {
    if(this?.storeService?.user?.id || 0 > 0){
      this.userService.getAddressByUserId(this?.storeService?.user?.id || 0)
          .subscribe(addresses => {
            this.addressList = addresses;
            this.selectedAddressId = this.storeService.deliveryAddress;
          })
    }
  }

  addressChanged(addr:Address):void{
    let newAddress:Address;
    addr.userId = this?.storeService?.user?.id || 0;

    if(this?.storeService?.user?.id || 0 > 0){
      this.userService.saveAddress(addr).pipe(
        tap(res=> newAddress = res),
        mergeMap(res => this.userService.getAddressByUserId(this?.storeService?.user?.id || 0))
      )
      .subscribe(addresses => {
        this.addressList = addresses;
        //change selected checkbox
        this.selectedAddressId = newAddress.id || 0;
        //toggle modifying
        this.addressIdForModification = -1;
      })
    }    
  }

  modifyAddress(addr:Address):void{
    this.addressIdForModification = addr.id || -1;
  }

  cancelModifyAddress():void{
    this.addressIdForModification = -1;  
  }

  deleteAddress(addr:Address):void{
    if(this?.storeService?.user?.id || 0 > 0){
      this.userService.deleteAddress(addr.id)
          .subscribe(addressId => {
            this.addressList = this.addressList?.filter(addr => addr.id != addressId);

            if(this.selectedAddressId == addressId)
              this.selectedAddressId = -1;
          })
    }
  } 
  
  onSubmit():void{
    this.storeService.deliveryAddress = this.selectedAddressId;
    this.router.navigate(['/payment']);
  }
}

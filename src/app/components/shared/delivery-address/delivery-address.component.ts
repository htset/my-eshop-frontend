import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {

  @Input('address') address?:Address;
  @Output() addressChangedEvent = new EventEmitter<Address>();

  addressForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    id: new FormControl(''),
    userId: new FormControl('')
  });
  
  constructor() { }

  ngOnInit(): void {
    this.addressForm.controls.firstname.setValue(this?.address?.firstName);
    this.addressForm.controls.lastname.setValue(this?.address?.lastName);
    this.addressForm.controls.street.setValue(this?.address?.street);
    this.addressForm.controls.zip.setValue(this?.address?.zip);
    this.addressForm.controls.city.setValue(this?.address?.city);
    this.addressForm.controls.country.setValue(this?.address?.country);
    this.addressForm.controls.id.setValue(this?.address?.id);
    this.addressForm.controls.userId.setValue(this?.address?.userId);
  }

  onSubmit(){
    this.addressChangedEvent.emit(this.addressForm.value);  
  }
}

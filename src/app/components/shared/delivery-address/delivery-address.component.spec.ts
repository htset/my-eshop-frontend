import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Address } from 'src/app/models/address';

import { DeliveryAddressComponent } from './delivery-address.component';

let testAddress = {id: 1, userId: 1, firstName: "tt", lastName: 'gg', street: '12 st', zip: '11223', city: 'NYC', country: 'US'};

@Component({
  selector  : 'test-component-wrapper',
  template  : '<app-delivery-address [address]="mockAddress" (addressChangedEvent)="mockAddressChanged($event)"></app-delivery-address>'
 })
 class TestComponentWrapper { 
    mockAddress?: Address; 

    mockAddressChanged(addr: Address) {
      console.log('mockAddressChanged called');
    }
 }
 
describe('DeliveryAddressComponent', () => {
  let component: DeliveryAddressComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TestComponentWrapper,
        DeliveryAddressComponent 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance; //We get the first (and only) child
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates form correctly (empty address)', () => {
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();

    let form = component.addressForm.controls;

    expect(form.firstname.valid).toBe(false);
    form.firstname.setValue('aa');
    expect(form.firstname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.lastname.valid).toBe(false);
    form.lastname.setValue('bb');
    expect(form.lastname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.street.valid).toBe(false);
    form.street.setValue('ermou');
    expect(form.street.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.zip.valid).toBe(false);
    form.zip.setValue('1a3');
    expect(form.zip.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.city.valid).toBe(false);
    form.city.setValue('athens');
    expect(form.city.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.country.valid).toBe(false);
    form.country.setValue('GR');
    expect(form.country.valid).toBe(true);

    expect(form.id.valid).toBe(true);
    expect(form.userId.valid).toBe(true);
    expect(form.id.value).toBeUndefined();
    expect(form.userId.value).toBeUndefined();

    expect(component.addressForm.valid).toBe(true);

    fixture.detectChanges();
    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('validates form correctly (existing address)', () => {
  
    fixture.componentInstance.mockAddress = testAddress;
    fixture.detectChanges();    

    console.log('after setting address');
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeFalsy();

    let form = component.addressForm.controls;

    expect(form.firstname.valid).toBe(true);
    form.firstname.setValue('aa');
    expect(form.firstname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.lastname.valid).toBe(true);
    form.lastname.setValue('bb');
    expect(form.lastname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.street.valid).toBe(true);
    form.street.setValue('ermou');
    expect(form.street.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.zip.valid).toBe(true);
    form.zip.setValue('1a3');
    expect(form.zip.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.city.valid).toBe(true);
    form.city.setValue('NYC');
    expect(form.city.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.country.valid).toBe(true);
    form.country.setValue('US');
    expect(form.country.valid).toBe(true);

    expect(form.id.valid).toBe(true);
    expect(form.userId.valid).toBe(true);
    expect(form.id.value).toEqual(1);
    expect(form.userId.value).toEqual(1);

    expect(component.addressForm.valid).toBe(true);

    fixture.detectChanges();
    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('sends data from form to view correctly', () => {
    let form = component.addressForm.controls;

    form.firstname.setValue('1111222233334444');
    form.lastname.setValue('111');
    form.street.setValue('aa ff');
    form.zip.setValue('7');
    form.city.setValue('2023');
    form.country.setValue('2023');

    expect(component.addressForm.valid).toBe(true);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.value).toEqual('1111222233334444');
    expect(fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.value).toEqual('111');
    expect(fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.value).toEqual('aa ff');
    expect(fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.value).toEqual('7');
    expect(fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.value).toEqual('2023');
    expect(fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('sends data from view to form correctly', () => {
    let form = component.addressForm.controls;

    fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.value = '1111222233334444';
    fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.value = '111';
    fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.value = 'aa ff';
    fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.value = '7';
    fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.value = '2023';
    fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.value = '2023';

    fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.addressForm.valid).toBe(true);
    expect(form.firstname.value).toEqual('1111222233334444');
    expect(form.lastname.value).toEqual('111');
    expect(form.street.value).toEqual('aa ff');
    expect(form.zip.value).toEqual('7');
    expect(form.city.value).toEqual('2023');
    expect(form.country.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

});

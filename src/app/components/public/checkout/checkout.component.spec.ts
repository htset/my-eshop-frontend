import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationServiceStub } from 'src/app/mocks/authentication.service.mock';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';
import { CheckoutComponent } from './checkout.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';

@Component({ selector: 'app-delivery-address', template: '{{address}}' })
class DummyChildComponent {
  @Input('address') address?:Address;
  @Output() addressChangedEvent = new EventEmitter<Address>();

  ngOnInit(){
    console.log('on dummy init');
    console.log(this.address);
  }
  onDummySubmit(){
    console.log('on dummy submit');
    console.log(this.address);
    this.addressChangedEvent.emit(modifiedTestAddress);
  }    
}

let testItem = {id:1, name:"aa", price:1, category:"", description:""};
let testAddress1 = {id: 1, userId: 1, firstName: "tt", lastName: 'gg', street: 'ss 12', zip: '11223', city: 'NY', country: 'US'};
let testAddress2 = {id: 2, userId: 1, firstName: "tt", lastName: 'gg', street: 'hh 12', zip: '31223', city: 'LA', country: 'US'};
let modifiedTestAddress = {id: 1, userId: 1, firstName: "tt-new", lastName: 'gg', street: 'ss 12', zip: '11223', city: 'NY', country: 'US'}

describe('CheckoutComponent - not logged in', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.storeService.user = null;
    sessionStorage.removeItem('user');
    component.storeService.cart.emptyCart();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty cart and login link', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#cartBody"))).toBeNull('cartBody');
    expect(fixture.debugElement.query(By.css("#noCartBody")).nativeElement).toBeTruthy('noCartBody');
    expect(fixture.debugElement.query(By.css("#addressBody"))).toBeNull('addressBody');
    expect(fixture.debugElement.query(By.css("#loginLink")).nativeElement).toBeTruthy('loginLink');
  });

  it('should show populated cart and login link', () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#cartBody")).nativeElement).toBeTruthy('cartBody');
    expect(fixture.debugElement.query(By.css("#noCartBody"))).toBeNull('noCartBody');
    expect(fixture.debugElement.query(By.css("#addressBody"))).toBeNull('addressBody');
    expect(fixture.debugElement.query(By.css("#loginLink")).nativeElement).toBeTruthy('loginLink');

    let el: HTMLElement = fixture.debugElement.query(By.css("#cartBody table tr:nth-child(2) td")).nativeElement;
    expect(el.innerHTML).toEqual('aa', 'cartBody');
  });  

});

describe('CheckoutComponent - logged in', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.storeService.user = new User(); //authenticated user
    component.storeService.user.id = 1;
    component.storeService.cart.emptyCart();
  });
  
  it('should show empty cart and no addresses yet', () => {
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([]));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#cartBody"))).toBeNull('cartBody');
    expect(fixture.debugElement.query(By.css("#noCartBody")).nativeElement).toBeTruthy('noCartBody');
    expect(fixture.debugElement.query(By.css("#addressBody")).nativeElement).toBeTruthy('addressBody');
    expect(fixture.debugElement.query(By.css("#loginLink"))).toBeNull('loginLink');
    expect(fixture.debugElement.queryAll(By.css('input[name="selectedAddress"]')).length).toEqual(1, 'addresses table');
  });    

  it('should show empty cart and one address', () => {
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1]));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#cartBody"))).toBeNull('cartBody');
    expect(fixture.debugElement.query(By.css("#noCartBody")).nativeElement).toBeTruthy('noCartBody');
    expect(fixture.debugElement.query(By.css("#addressBody")).nativeElement).toBeTruthy('addressBody');
    expect(fixture.debugElement.query(By.css("#loginLink"))).toBeNull('loginLink');
    expect(component.storeService.deliveryAddress).toEqual(-1);
    expect(fixture.debugElement.queryAll(By.css('input[name="selectedAddress"]')).length).toEqual(2, 'addresses table');
    expect(fixture.debugElement.queryAll(By.css('input[name="selectedAddress"]:checked')).length).toEqual(0);
  });    

it('should have radio box checked if address has already been selected before', fakeAsync( () => {
  spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1, testAddress2]));
  component.storeService.deliveryAddress = 2;
  fixture.detectChanges();
  tick();
  expect(component.storeService.deliveryAddress).toEqual(2);
  expect(fixture.debugElement.queryAll(By.css('input[name="selectedAddress"]')).length).toEqual(3, 'addresses table');
  expect(fixture.debugElement.queryAll(By.css('input[name="selectedAddress"]:checked')).length).toEqual(1);
  console.log(fixture.debugElement.queryAll(By.css('input[name="selectedAddress"]:checked')));
}));   
 
});

describe('CheckoutComponent submit button', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.storeService.user = new User(); //authenticated user
    component.storeService.user.id = 1;
    component.storeService.cart.emptyCart();
  });

  it('should be disabled on no addresses (full cart)', () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([]));
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(-1);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#toPayment')).nativeElement).getAttribute('disabled')).toEqual('');
  });    

  it('should be disabled on unselected address (full cart)', () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1]));
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(-1);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#toPayment')).nativeElement).getAttribute('disabled')).toEqual('');
  });    

  it('should be enabled on selected address (full cart)', () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1, testAddress2]));
    component.storeService.deliveryAddress = 2;
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(2);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#toPayment')).nativeElement).getAttribute('disabled')).toEqual(null);
  });    

  it('should be disabled on no addresses (empty cart)', () => {
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([]));
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(-1);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#toPayment')).nativeElement).getAttribute('disabled')).toEqual('');
  });    

  it('should be disabled on unselected address (empty cart)', () => {
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1]));
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(-1);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#toPayment')).nativeElement).getAttribute('disabled')).toEqual('');
  });    

  it('should be disabled on selected address (empty cart)', () => {
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1, testAddress2]));
    component.storeService.deliveryAddress = 2;
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(2);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#toPayment')).nativeElement).getAttribute('disabled')).toEqual('');
  });    

});

describe('CheckoutComponent delivery address', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent, DummyChildComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.storeService.user = new User(); //authenticated user
    component.storeService.user.id = 1;    
  });

  it('should be editable after Modify button click', () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1]));
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(-1);
    expect(fixture.debugElement.nativeElement.querySelector('app-delivery-address')).toBeNull();

    let el: HTMLButtonElement = fixture.debugElement.query(By.css('#modify1')).nativeElement;
    el.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    console.log(fixture.debugElement.query(By.css('app-delivery-address')));
    console.log(fixture.debugElement.nativeElement.querySelector('app-delivery-address'));
    expect(fixture.debugElement.nativeElement.querySelector('app-delivery-address')).not.toBeNull();   
  });

  it('should refresh address after modification', () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    let spy = spyOn(component.userService, 'getAddressByUserId').and.returnValues(of([testAddress1, testAddress2]));
    fixture.detectChanges();

    expect(component.storeService.deliveryAddress).toEqual(-1);
    expect(fixture.debugElement.nativeElement.querySelector('app-delivery-address')).toBeNull();

    let el: HTMLButtonElement = fixture.debugElement.query(By.css('#modify1')).nativeElement;
    el.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#modify1'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#cancel1')).nativeElement).toBeTruthy();

    //we do NOT create the child - it is created by the host component
    //we just access it
    let childFixture = fixture.debugElement.query(By.directive(DummyChildComponent));
    let childComponent = childFixture.componentInstance;

    console.log(fixture.debugElement.query(By.directive(DummyChildComponent)));
    console.log(fixture.debugElement.query(By.css('app-delivery-address')));
    console.log(fixture.debugElement.nativeElement.querySelector('app-delivery-address'));
    expect(fixture.debugElement.nativeElement.querySelector('app-delivery-address')).not.toBeNull();

    //'getAddressByUserId' will be called again (now with the modified address)
    spy.and.returnValues(of([modifiedTestAddress, testAddress2]));
    let spy2 = spyOn(component.userService, 'saveAddress').and.returnValues(of(modifiedTestAddress));
    
    childComponent.onDummySubmit();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#addressBody form table')).nativeElement.innerHTML).toContain('tt-new');
    expect(fixture.debugElement.query(By.css('#modify1')).nativeElement).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#cancel1'))).toBeNull();
  });  
});

describe('CheckoutComponent form', () => {
  @Component({ selector: 'child', template: '' })
  class DummyChildComponent {}

  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent, DummyChildComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.storeService.user = new User(); //authenticated user
    component.storeService.user.id = 1;       
  });
  
  it('should be available to submit after selecting address', fakeAsync( () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1]));
    //spying on routing is also needed, else we get error: "Error: Cannot match any routes. URL Segment: 'payment' "
    spyOn(component.router, 'navigate');

    fixture.detectChanges();
    tick(); 

    let el: HTMLInputElement = fixture.debugElement.query(By.css('#selectedAddress1')).nativeElement;
    el.checked = true;
    el.dispatchEvent(new Event("change"));
    tick();
    fixture.detectChanges();
    expect(component.selectedAddressId).toEqual(1);
    console.log(typeof(component.selectedAddressId));

    let el1: HTMLInputElement = fixture.debugElement.query(By.css('#toPayment')).nativeElement;
    expect(el1.getAttribute('disabled')).toBeNull();

    /*
      https://stackoverflow.com/questions/47387325/angular-unit-test-failing-when-using-submit

      "Because you have no event handler on the button. That's why triggerEventHandler can't trigger any handler on the button. 
      In your case you have to use saveButton.nativeElement.click() because now click event will be bubbled and submit event will be fired

    */
    el1.click();
    //el1.dispatchEvent(new Event("click"));
    //fixture.debugElement.query(By.css('#toPayment')).triggerEventHandler('ngSubmit', null)
    console.log(el1);
    tick();
    fixture.detectChanges();
    expect(component.storeService.deliveryAddress).toEqual(1);
    expect(component.router.navigate).toHaveBeenCalledWith(['/payment']);
  }));

  it('should NOT be available to submit if we select new-address check box', fakeAsync( () => {
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    spyOn(component.userService, 'getAddressByUserId').and.returnValue(of([testAddress1]));
    //spying on routing is also needed, else we get error: "Error: Cannot match any routes. URL Segment: 'payment' "
    spyOn(component.router, 'navigate');

    tick();
    fixture.detectChanges();
    //needs second tick()
    tick();

    let el: HTMLInputElement = fixture.debugElement.query(By.css('#selectedAddress0')).nativeElement;
    el.checked = true;
    el.dispatchEvent(new Event("change"));
    tick();
    fixture.detectChanges();

    //Radio box value:
    //when using value="0" --> string -fails test
    //when using [value]="0" --> number  -ok
    console.log(typeof(component.selectedAddressId));
    expect(component.selectedAddressId).toEqual(0);

    let el1: HTMLInputElement = fixture.debugElement.query(By.css('#toPayment')).nativeElement;
    expect(el1.getAttribute('disabled')).toEqual('');
    expect(component.storeService.deliveryAddress).toEqual(-1);
  }));
  
});    

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { PaymentComponent } from './payment.component';

let testItem = {id:1, name:"aa", price:1, category:"", description:""};

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    component.storeService.cart.cartItems = [ { item: testItem, quantity: 1} ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates form correctly', () => {

    expect(fixture.debugElement.query(By.css('#submit')).nativeElement.disabled).toBeTruthy();

    let form = component.paymentForm.controls;

    expect(form.cardNumber.valid).toBe(false);
    form.cardNumber.setValue('111122223333444a');
    expect(form.cardNumber.valid).toBe(false);
    form.cardNumber.setValue('111122223333444');
    expect(form.cardNumber.valid).toBe(false);
    form.cardNumber.setValue('1111222233334444');
    expect(form.cardNumber.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.code.valid).toBe(false);
    form.code.setValue('1111');
    expect(form.code.valid).toBe(false);
    form.code.setValue('11');
    expect(form.code.valid).toBe(false);
    form.code.setValue('1a3');
    expect(form.code.valid).toBe(false);
    form.code.setValue('111');
    expect(form.code.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.holderName.valid).toBe(false);
    form.holderName.setValue('aa ff');
    expect(form.holderName.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.expiryMonth.valid).toBe(false);
    form.expiryMonth.setValue('7');
    expect(form.expiryMonth.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.expiryYear.valid).toBe(false);
    form.expiryYear.setValue('2023');
    expect(form.expiryYear.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(true);

    fixture.detectChanges();
    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('sends data from form to view correctly', () => {
    let form = component.paymentForm.controls;

    form.cardNumber.setValue('1111222233334444');
    form.code.setValue('111');
    form.holderName.setValue('aa ff');
    form.expiryMonth.setValue('7');
    form.expiryYear.setValue('2023');

    fixture.detectChanges();

    expect(component.paymentForm.valid).toBe(true);
    expect(fixture.debugElement.query(By.css('input[formControlName="cardNumber"]')).nativeElement.value).toEqual('1111222233334444');
    expect(fixture.debugElement.query(By.css('input[formControlName="holderName"]')).nativeElement.value).toEqual('aa ff');
    expect(fixture.debugElement.query(By.css('input[formControlName="code"]')).nativeElement.value).toEqual('111');
    //Attention: 'select', not 'input'
    expect(fixture.debugElement.query(By.css('select[formControlName="expiryMonth"]')).nativeElement.value).toEqual('7');
    expect(fixture.debugElement.query(By.css('select[formControlName="expiryYear"]')).nativeElement.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('sends data from view to form correctly', () => {
    let form = component.paymentForm.controls;

    fixture.debugElement.query(By.css('input[formControlName="cardNumber"]')).nativeElement.value = '1111222233334444';
    fixture.debugElement.query(By.css('input[formControlName="holderName"]')).nativeElement.value = 'aa ff';
    fixture.debugElement.query(By.css('input[formControlName="code"]')).nativeElement.value = '111';
    fixture.debugElement.query(By.css('select[formControlName="expiryMonth"]')).nativeElement.value = '7';
    fixture.debugElement.query(By.css('select[formControlName="expiryYear"]')).nativeElement.value = '2023';

    fixture.debugElement.query(By.css('input[formControlName="cardNumber"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="holderName"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="code"]')).nativeElement.dispatchEvent(new Event('input'));
    //Attention --> event: 'change', not 'input'
    fixture.debugElement.query(By.css('select[formControlName="expiryMonth"]')).nativeElement.dispatchEvent(new Event('change'));
    fixture.debugElement.query(By.css('select[formControlName="expiryYear"]')).nativeElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.paymentForm.valid).toBe(true);
    expect(form.cardNumber.value).toEqual('1111222233334444');
    expect(form.code.value).toEqual('111');
    expect(form.holderName.value).toEqual('aa ff');
    expect(form.expiryMonth.value).toEqual('7');
    expect(form.expiryYear.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

});
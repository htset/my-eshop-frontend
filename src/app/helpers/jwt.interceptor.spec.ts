import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ItemService } from '../services/item.service';
import { StoreService } from '../services/store.service';
import { JwtInterceptor } from './jwt.interceptor';
import { User } from '../models/user';

describe('HttpInterceptorService', () => {
  let httpMock: HttpTestingController;
  let itemService: ItemService;
  let storeService: StoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    itemService = TestBed.inject(ItemService);
    storeService = TestBed.inject(StoreService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should insert token for logged in users', ()=> {
    let testItem = {id:1, name:"a1", price:1, category:"", description:""};
    storeService.user = new User();
    storeService.user.token = "test_token";

    itemService.getItem(1)
      .subscribe();

    const req = httpTestingController.expectOne(r =>
      r.headers.has('Authorization') && r.headers.get('Authorization') === 'Bearer test_token');

    req.flush(testItem);
    });

  it('should not insert token for non-logged in users', ()=> {
    let testItem = {id:1, name:"a1", price:1, category:"", description:""};
    storeService.user = null;

    itemService.getItem(1)
      .subscribe();

    const req = httpTestingController.expectOne(r =>
      !r.headers.has('Authorization'));

    req.flush(testItem);
  });     
});
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/public/cart/cart.component';
import { ItemDetailsComponent } from './components/public/item-details/item-details.component';
import { ItemsComponent } from './components/public/items/items.component';
import { LoginComponent } from './components/public/login/login.component';

const routes: Routes = [
  {path: '', component: ItemsComponent },
  {path: 'items', component: ItemsComponent },
  {path: 'items/:id', component: ItemDetailsComponent }  ,
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

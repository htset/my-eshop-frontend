import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {path: '', component: ItemsComponent },
  {path: 'items', component: ItemsComponent },
  {path: 'items/:id', component: ItemDetailsComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

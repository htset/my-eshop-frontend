import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item = {id:0, name:"", price:0, category:"", description:""};

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);   
  }

  addToCart(): void { }
}

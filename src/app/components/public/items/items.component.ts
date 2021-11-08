import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    public storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.pageSizeChanges$
      .subscribe(newPageSize => {
        this.storeService.page = 1;
        this.getItems();
      });

    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems(this.storeService.page, this.storeService.pageSize)
      .subscribe(itemPayload => {
        this.storeService.items = itemPayload.items;
        this.storeService.count = itemPayload.count; 
      });
  }

  onPageChange(newPage: number): void {
    this.storeService.page = newPage;
    this.getItems();
  }

  onPageSizeChange(): void{
    this.storeService._pageSizeSubject.next(this.storeService.pageSize);
  }
}

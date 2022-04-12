import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  public userInOrder?: User;
  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }

}

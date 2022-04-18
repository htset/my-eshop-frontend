import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  @Input("message") message: string = ""; 
  @Input("info") info: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

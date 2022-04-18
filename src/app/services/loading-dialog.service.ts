import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogComponent } from '../components/shared/loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingDialogService {
  private opened = false;
  private dialogRef?: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  openDialog(): void {
    if (!this.opened) {
      this.opened = true;
      this.dialogRef = this.modalService.open(LoadingDialogComponent);

      this.dialogRef?.closed.subscribe(() => {
        this.opened = false;
      });
    }
  }

  hideDialog() {
    this.dialogRef?.close();
  } 
}

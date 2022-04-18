import { Injectable, Injector } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from '../components/shared/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  private opened = false;
  private dialogRef?: NgbModalRef;
  private modalService?: NgbModal;
  
  constructor(private injector: Injector) { }
  
  openDialog(message: string, info?: string): void {
    if (!this.opened) {
      this.opened = true;
      this.modalService = this.injector.get(NgbModal);
      this.dialogRef = this.modalService.open(ErrorDialogComponent);
      this.dialogRef.componentInstance.message = message;
      this.dialogRef.componentInstance.info = info;
  
      this.dialogRef?.closed.subscribe(() => {
        this.opened = false;
      });
    }
  }
  
  hideDialog() {
    this.dialogRef?.close();
  }    
}

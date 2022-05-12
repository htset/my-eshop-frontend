import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingDialogService } from '../services/loading-dialog.service';
import { AuthenticationService } from '../services/authentication.service';
import { StoreService } from '../services/store.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private loadingDialogService: LoadingDialogService,
        private authenticationService: AuthenticationService,
        private storeService:StoreService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.storeService.user;
        this.loadingDialogService.openDialog();
        return next.handle(request).pipe(
            catchError(error => {
                console.error("Error from error interceptor", error);
                if(error?.statusText == "Unknown Error")
                    error.error = "Request failed";
                return throwError(error);                
            }),
            finalize(() => {
                this.loadingDialogService.hideDialog();
            })
        ) as Observable<HttpEvent<any>>;
    }
}
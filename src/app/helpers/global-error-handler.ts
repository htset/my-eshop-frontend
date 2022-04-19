import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { LogMessage } from "../models/logMessage";
import { ErrorDialogService } from "../services/error-dialog.service";
import { LoggingService } from "../services/logging.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private errorDialogService: ErrorDialogService,
                private remoteLoggingService: LoggingService) { }

    handleError(error: Error | HttpErrorResponse) {
        console.error("Error from global error handler", error);
        
        let errorMessage = "";
        let stackTrace = "";
        if (error instanceof HttpErrorResponse) {
            errorMessage = error.error;
        } else {
            errorMessage = error.message; 
            stackTrace = error.stack || '';
        }

        this.errorDialogService.openDialog(errorMessage || "This operation resulted in an error");

        let logMessage:LogMessage = {message: errorMessage, stackTrace: stackTrace};
        this.remoteLoggingService.log(logMessage);
    }
}
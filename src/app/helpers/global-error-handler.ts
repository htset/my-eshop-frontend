import { ErrorHandler, Injectable } from "@angular/core";
import { LogMessage } from "../models/logMessage";
import { ErrorDialogService } from "../services/error-dialog.service";
import { LoggingService } from "../services/logging.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private errorDialogService: ErrorDialogService,
                private remoteLoggingService: LoggingService) { }

    handleError(error: string) {
        console.error("Error from global error handler", error);

        this.errorDialogService.openDialog(
            "This operation resulted in an error", 
            error || "Undefined client error");

        let logMessage:LogMessage = {message: error};
        this.remoteLoggingService.log(logMessage);
    }
}
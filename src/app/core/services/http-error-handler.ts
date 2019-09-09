import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const errorHandler = (error: HttpErrorResponse) => {
    // Client side error OR network error
    if (error.error instanceof ErrorEvent) {
        console.error('An error occured', error.error.message);
        return throwError('Error: problem probably comes from Network or Client');
    }
    else {
        console.error('Back-end returns:', error.status);
        console.error('With body:', error.error);
        return throwError('Error: Something bad is happenning on the server.');
    }
};
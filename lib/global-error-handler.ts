import { ErrorHandler, Inject, Injectable, Injector, Optional } from '@angular/core';
import { ConstantsService } from '@core/services/constants.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@core/services/notification.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  constructor(
    public constantsService: ConstantsService,
    @Inject(Injector) private readonly injector: Injector,
    @Optional() @Inject('ERROR_WRAPPER') private errorWrapper: any
  ) {
    super();
  }

  handleError(error) {
    if (this.constantsService.IS_BROWSER) {
      if (error instanceof HttpErrorResponse && (![491, 404].includes(error.status))) {
        const toastrService = this.injector.get(NotificationService);
        toastrService.httpError(error);
      }

      const showAlert =
        (
          error instanceof HttpErrorResponse
          && (
            (error.status && error.status === 500)
            || error.headers.get('x-response-maintenance-mode-start')
            || error.headers.get('x-response-maintenance-mode-end')
          )
        )
      ;
      if (showAlert) {
        this.constantsService.maintenance$.next(true);
      }

      super.handleError(error);
    } else {
      this.errorWrapper.error = error;
    }
  }
}

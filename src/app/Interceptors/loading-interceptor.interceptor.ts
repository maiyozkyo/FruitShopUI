import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoadingService } from 'projects/shared/src/lib/services/loading.service';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';

@Injectable()
export class LoadingInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private notiService: NotifyService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.show();
    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loadingService.hide();
        if (error.error) {
          let errorMsg = error.error.Message ?? error.error;
          this.notiService.show('Lỗi', errorMsg, 'error');
        }
        return throwError(() => error);
      })
    );
  }
}

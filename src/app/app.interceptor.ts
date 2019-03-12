import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { tap } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.loadingbarService.show();
        if (localStorage.getItem('token')) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': localStorage.getItem('token')
                    /* ,
                   "Content-Type": "application/json" */
                }
            });
        } else {
            request = request.clone({
                /*  setHeaders: {
                     "Content-Type": "application/json"
                 } */
            });
        }
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            // this.loadingbarService.hide();

        },
            (err: any) => {
                console.log(err);

                // this.alertmessageservice.message('error', err.error.message);
                // this.loadingbarService.hide();

            }));
    }
}
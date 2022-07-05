import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable,throwError as observableThrowError} from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //req.params.set('key','b055fee05ba1494b85236d1889eaf33f');
          const authReq = req.clone({
            //params:new HttpParams().set('key', 'b055fee05ba1494b85236d1889eaf33f')
            // headers: new HttpHeaders({
            //   'Access-Control-Allow-Origin':  '*'
            // })
          });
        return next.handle(authReq);
    }
}
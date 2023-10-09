import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UserAuthService } from "../service/user-auth.service";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userAuthService: UserAuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("No-Auth") === "True") {
            return next.handle(req.clone());
        }
        const token = this.userAuthService.getToken();
        if (token) {
            req = this.addToken(req, token);
        }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    console.log(error.status)
                    console.log(error.message)
                    if (error.status === 401) {
                        this.router.navigate(['/login'])
                    } else if (error.status === 403) {
                        this.router.navigate(['/forbidden'])
                    }
                    return throwError("Something went wrong");
                }
            )
        )
    }

    private addToken(request: HttpRequest<any>, token: string | null) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpResponse,
    HttpParams,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError, retry, tap, map } from 'rxjs/operators';

import { JsonConfig } from './json-config';
import { NpmPackageInfo } from './npm-package-infor';

@Injectable()
export class HttpService {
    jsonConfigFile = 'assets/test.json';
    textFile = 'assets/test.txt';

    constructor(
        private http: HttpClient
    ) { }

    getJsonConfig(): Observable<HttpResponse<JsonConfig>> {
        return this.http.get<JsonConfig>(this.jsonConfigFile, {
            params: new HttpParams().set('name', 'duocdd'),
            observe: 'response'
        });
    }

    getTextFile() {
        const httpOptions: any = { responseType: 'text' };
        return this.http.get(this.textFile, httpOptions).pipe(
            retry(3),
            tap(
                data => { },
                error => { }
            )
        )
    }

    search(packageName: string, refresh = false) {
        const searchUrl = 'https://npmsearch.com/query';
        const options = this.createHttpOptions(packageName, refresh);

        return this.http.get(searchUrl, options).pipe(
            map((data: any) => {
                return data.results.map(entry => ({
                    name: entry.name[0],
                    version: entry.version[0],
                    description: entry.description[0]
                } as NpmPackageInfo));
            }),
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return _throw(
            'Something bad happened; please try again later.');
    };

    private createHttpOptions(packageName: string, refresh = false) {
        const httpOptions = {
            headers: new HttpHeaders({
                'x-refresh': 'true'
            })
        };
        const params = new HttpParams({ fromObject: { q: packageName } });
        const headerMap = refresh ? { 'x-refresh': 'true' } : {};
        const headers = new HttpHeaders(headerMap);
        return { headers, params };
    }
}
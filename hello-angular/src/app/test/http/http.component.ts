import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { HttpService } from './http.service';
import { JsonConfig } from './json-config';
import { NpmPackageInfo } from './npm-package-infor';

@Component({
    selector: 'app-http',
    templateUrl: './http.component.html',
    styleUrls: ['./http.component.css'],
    providers: [HttpService]
})
export class HttpComponent implements OnInit {
    withRefresh = false;
    jsonConfig$;
    jsonConfigData;
    textFile$;
    textFile;
    packages$: Observable<NpmPackageInfo[]>;
    searchText$ = new Subject<string>();

    constructor(
        private httpService: HttpService
    ) { }

    ngOnInit() {
        this.jsonConfig$ = this.httpService.getJsonConfig().subscribe(
            data => this.jsonConfigData = data,
            err => console.log('http get json file error', err)
        );

        this.textFile$ = this.httpService.getTextFile().subscribe(
            data => this.textFile = data,
            err => console.log('http get text file error', err)
        );

        this.packages$ = this.searchText$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(packageName => {
                console.log(packageName);
                return this.httpService.search(packageName, this.withRefresh)
            })
        );
    }

    ngOnDestroy() {
        this.jsonConfig$.unsubscribe();
        this.textFile$.unsubscribe();
    }

    search(value) {
        this.searchText$.next(value);
    }

}

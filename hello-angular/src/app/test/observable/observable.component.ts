import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-observable',
    templateUrl: './observable.component.html',
    styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
    obsTimer: Observable<any>;
    time$;
    time;
    timeInterval;
    
    constructor() {
        this.createTimerObservable();
    }

    ngOnInit() {
        this.time$ = this.obsTimer.subscribe(value => {
            // console.log('get obsTimer', value);
            this.time = value;
        });
    }

    ngOnDestroy() {
        this.time$.unsubscribe();
    }

    private createTimerObservable() {
        this.obsTimer = new Observable(observable => {
            // console.log('obsTimer create');
            this.timeInterval = setInterval(() => {
                // console.log('setInterval()');
                observable.next(new Date().toString());
            }, 1000)
        });
    }
}

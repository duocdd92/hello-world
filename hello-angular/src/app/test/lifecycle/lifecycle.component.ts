import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-lifecycle',
    templateUrl: './lifecycle.component.html',
    styleUrls: ['./lifecycle.component.css']
})
export class LifecycleComponent implements OnInit {
    inputVal = ''

    constructor() { }

    ngOnInit() {
        console.log('ngOnInit start...')
    }

    ngOnDestroy() {
        console.log('ngOnDestroy start...')
    }

    ngAfterViewInit(){
        console.log('ngAfterViewInit start...')
    }
}

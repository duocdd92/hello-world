import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mertial-sidenav',
    templateUrl: './mertial-sidenav.component.html',
    styleUrls: ['./mertial-sidenav.component.css']
})
export class MertialSidenavComponent implements OnInit {
    events: string[] = [];
    opened: boolean = true;

    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

    constructor() { }

    ngOnInit() {
    }

}

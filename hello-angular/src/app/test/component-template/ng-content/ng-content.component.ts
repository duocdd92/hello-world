import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ng-content',
    template: `
        <p>Ng-content</p>
        <ng-content></ng-content>
        <ng-content select="ng-conent2"></ng-content>
    `
})
export class NgContentComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}

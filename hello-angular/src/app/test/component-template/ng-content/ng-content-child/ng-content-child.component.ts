import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ng-content-child',
    template: `
        <p>Ng-content child</p>
    `
})
export class NgContentChildComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}

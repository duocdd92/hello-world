import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-component',
    template: '<div>this is child component: {{text}}</div>'
})
export class DynamicChildComponentComponent implements OnInit {
    @Input() text

    constructor() { }

    ngOnInit() {
    }

}

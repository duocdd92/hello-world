import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-component-template-emitter',
    template: ''
    // template: `
    //     <div>{{title}}</div>
    //     <input [(ngModel)]="value" />
    //     <button (click)="getValue()">Get value</button>
    // `
})
export class EmitterComponent implements OnInit {
    // @Input('title') title = ''
    // @Output('onClickGetValue') onClickGetValue: EventEmitter<any> = new EventEmitter();
    // value = ''

    constructor() { }

    ngOnInit() {
    }

    // getValue(e){
    //     this.onClickGetValue.emit(this.value)
    // }
}

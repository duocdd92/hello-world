import { Component, OnInit } from '@angular/core';
import { UseClass1Service } from './use-class-1.service';
import { UseClass2Service } from './use-class-2.service';

@Component({
    selector: 'app-use-class',
    template: `
        <p>{{text}}</p>
    `,
    providers: [{ provide: UseClass1Service, useClass: UseClass2Service }]
})
export class UseClassComponent implements OnInit {
    text = '';

    constructor(
        private useClass1Service: UseClass1Service
    ) {
        this.text = this.useClass1Service.getText('');
    }

    ngOnInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { UseExistingClass1Service } from './use-existing-class-1.service';
import { UseExistingClass2Service } from './use-existing-class-2.service';

@Component({
    selector: 'app-use-existing-class',
    template: `
        <p>See console log to check</p>
    `,
    providers: [{ provide: UseExistingClass2Service, useExisting: UseExistingClass1Service }]
})
export class UseExistingClassComponent implements OnInit {
    text = '';

    constructor(
        private useExistingClass2Service: UseExistingClass2Service
    ) {
        this.useExistingClass2Service.getText1();
    }

    ngOnInit() {
    }

}

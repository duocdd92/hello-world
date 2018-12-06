import { Component, OnInit } from '@angular/core';

import { ServiceConfig } from '../service/service-config';

@Component({
    selector: 'app-use-value',
    templateUrl: './use-value.component.html',
    styleUrls: ['./use-value.component.css']
})
export class UseValueComponent implements OnInit {
    data: ServiceConfig;

    constructor(
        private serviceConfig: ServiceConfig
    ) {
        this.data = this.serviceConfig;
    }

    ngOnInit() {
        this.data = this.serviceConfig;
    }

}

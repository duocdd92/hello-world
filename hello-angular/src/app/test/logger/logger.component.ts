import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-logger',
    templateUrl: './logger.component.html',
    styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

    constructor(
        private logger: NGXLogger
    ) { }

    ngOnInit() {
        this.logger.warn('Your log message goes here');
    }

}

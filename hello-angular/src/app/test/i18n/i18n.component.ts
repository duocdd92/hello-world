import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-i18n',
    templateUrl: './i18n.component.html',
    styleUrls: ['./i18n.component.css']
})
export class I18nComponent implements OnInit {
    time = new Date();
    timeInterval;
    count = 0;
    gender = 'male';

    constructor() { }

    ngOnInit() {
        this.timeInterval = setInterval(() => {
            this.time = new Date();
        }, 1000);
    }

    ngOnDestroy() {
        clearInterval(this.timeInterval);
    }

    inscrease(num: number) {
        this.count = Math.min(5, Math.max(0, this.count + num));
    }
}

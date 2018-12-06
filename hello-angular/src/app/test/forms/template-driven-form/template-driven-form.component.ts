import { Component, OnInit } from '@angular/core';

import { Hero } from '../../classes/hero';
import { Test } from '../../classes/test';

@Component({
    selector: 'app-template-driven-form',
    templateUrl: './template-driven-form.component.html',
    styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {

    test: Test;

    constructor() { }

    ngOnInit() {
        this.test = { id: 1, num1: 1, name1: 'name 1', name2: 'name 2', check: false };
    }

    submit() {

    }

}

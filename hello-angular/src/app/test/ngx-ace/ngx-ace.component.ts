import 'brace';
import 'brace/theme/github';
import 'brace/mode/javascript';

import { Component, OnInit } from '@angular/core';

import { AceConfigInterface } from 'ngx-ace-wrapper';

@Component({
    selector: 'app-ngx-ace',
    templateUrl: './ngx-ace.component.html',
    styleUrls: ['./ngx-ace.component.css']
})
export class NgxAceComponent implements OnInit {
    value = 'ssss';
    isViewMode = false;
    scriptText = '';

    public config: AceConfigInterface = {
        mode: 'javascript',
        theme: 'github',
        readOnly: false
    };

    constructor() { }

    ngOnInit() {
    }

    scriptCodeChange(value) {

    }

}

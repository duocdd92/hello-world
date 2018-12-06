import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-component-template',
    templateUrl: './component-template.component.html',
    styleUrls: ['./component-template.component.css']
})
export class ComponentTemplateComponent implements OnInit {
    ngForList = ['item 1', 'item 2']
    options = [
        { text: 'item 1', display: true},
        { text: 'item 2', display: true},
        { text: 'item 3', display: false},
        { text: 'item 4', display: true}
    ]
    twoWayBinding = ''
    emitterValue = ''

    constructor() { }

    ngOnInit() {
    }

    getValue(value){
        this.emitterValue = value;
    }

    ngOnDestroy(){
        // console.log('destroy template component', this.ngForList);
    }

}

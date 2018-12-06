import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChange
} from '@angular/core';

@Component({
    selector: 'app-lifecycle-child',
    template: ``
})
export class ChildComponent implements OnInit {
    @Input('value') value
    constructor() { }

    ngOnInit() {

    }

    ngOnChanges(value: SimpleChange) {
        console.log('ngOnChanges start...', value)
    }
}

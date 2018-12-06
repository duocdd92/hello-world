import {
    Component,
    OnInit,
    Directive,
    ViewContainerRef,
    ComponentFactoryResolver,
    ViewChild
} from '@angular/core';

import { DynamicChildComponentComponent } from './dyn-child.component'
import { DynamicComponentChildDirective } from './dyn-child.directive'

@Component({
    selector: 'app-dynamic-component',
    templateUrl: './dynamic-component.component.html',
    styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit {
    @ViewChild(DynamicComponentChildDirective) adHost: DynamicComponentChildDirective

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.loadComponent()
    }

    private loadComponent() {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicChildComponentComponent);
        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<DynamicChildComponentComponent>componentRef.instance).text = 'test'
    }
}

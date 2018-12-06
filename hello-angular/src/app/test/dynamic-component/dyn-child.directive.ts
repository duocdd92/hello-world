import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[app-dyn-child]'
})
export class DynamicComponentChildDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
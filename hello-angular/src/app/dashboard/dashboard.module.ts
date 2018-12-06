import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardDetailComponent } from './detail.component';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent,
        DashboardDetailComponent
    ]
})
export class DashboardModule{
    constructor() {
        // console.log('load dashboard module...');
    }
 }
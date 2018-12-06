import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic.component';

@NgModule({
    imports: [
        SharedModule,
        StatisticRoutingModule
    ],
    declarations: [
        StatisticComponent
    ]
})
export class StatisticModule{ 
    constructor() {
        // console.log('load statistic module...');
    }
}
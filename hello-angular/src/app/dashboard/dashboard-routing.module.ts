import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardDetailComponent } from './detail.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: ':id', component: DashboardDetailComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule { }
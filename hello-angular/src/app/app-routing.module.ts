import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './login//auth-guard.service';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuardService],
                loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'statistic',
                canActivate: [AuthGuardService],
                loadChildren: 'app/statistic/statistic.module#StatisticModule'
            },
            {
                path: 'test',
                loadChildren: 'app/test/test.module#TestModule'
            }
        ]
    },
    { path: 'login', component: LoginComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
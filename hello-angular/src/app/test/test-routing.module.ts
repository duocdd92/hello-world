import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { ComponentTemplateComponent } from './component-template/component-template.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { ObservableComponent } from './observable/observable.component';
import { ServiceComponent } from './service/service/service.component';
import { FormsComponent } from './forms/forms.component';
import { HttpComponent } from './http/http.component';
import { I18nComponent } from './i18n/i18n.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { LoggerComponent } from './logger/logger.component';
import { MertialSidenavComponent } from './mertial-sidenav/mertial-sidenav.component';
import { AwsSdkComponent } from './aws-sdk/aws-sdk.component';
import { ImgCropperComponent } from './img-cropper/img-cropper.component';
import { NgxAceComponent } from './ngx-ace/ngx-ace.component';

const routes: Routes = [
    {
        path: '',
        component: TestComponent,
        children: [
            { path: 'component-template', component: ComponentTemplateComponent },
            { path: 'lifecycle', component: LifecycleComponent },
            { path: 'dynamic-component', component: DynamicComponentComponent },
            { path: 'custom-pipe', component: CustomPipeComponent },
            { path: 'observable', component: ObservableComponent },
            { path: 'service', component: ServiceComponent },
            { path: 'forms', component: FormsComponent },
            { path: 'http', component: HttpComponent },
            { path: 'i18n', component: I18nComponent },
            { path: 'bootstrap', component: BootstrapComponent },
            { path: 'logger', component: LoggerComponent },
            { path: 'material-sidenav', component: MertialSidenavComponent },
            { path: 'aws-sdk', component: AwsSdkComponent },
            { path: 'img-cropper', component: ImgCropperComponent },
            { path: 'ngx-ace', component: NgxAceComponent }
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
export class TestRoutingModule { }
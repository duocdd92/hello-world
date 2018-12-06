import { NgModule } from '@angular/core';

import { TestRoutingModule } from './test-routing.module'
import { SharedModule } from '../common/shared.module';
import { AlertModule } from 'ngx-bootstrap';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NGXLogger } from 'ngx-logger';
import { MultiselectModule } from 'ngx-multiselect';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { MzSelectModule } from 'ngx-materialize';
import { MzButtonModule, MzInputModule } from 'ngx-materialize';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AceModule, AceConfigInterface, ACE_CONFIG } from 'ngx-ace-wrapper';

import { ImageCropperComponent } from 'ngx-img-cropper';

import { CustomPipeComponent } from './custom-pipe/custom-pipe.component'
import { CustomPipe } from './custom-pipe/custom-pipe.pipe';

import { DynamicComponentChildDirective } from './dynamic-component/dyn-child.directive';

import { TestComponent } from './test/test.component';
import { ComponentTemplateComponent } from './component-template/component-template.component';
import { EmitterComponent } from './component-template/emitter.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { ChildComponent } from './lifecycle/child.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component'
import { DynamicChildComponentComponent } from './dynamic-component/dyn-child.component'
import { ObservableComponent } from './observable/observable.component';
import { ServiceComponent } from './service/service/service.component';
import { HeroComponent } from './service/multiple-session/hero.component';
import { NgContentComponent } from './component-template/ng-content/ng-content.component';
import { NgContentChildComponent } from './component-template/ng-content/ng-content-child/ng-content-child.component';
import { UseClassComponent } from './service/use-class/use-class.component';
import { UseExistingClassComponent } from './service/use-existing-class/use-existing-class.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { HttpComponent } from './http/http.component';
import { UseValueComponent } from './service/use-value/use-value.component';
import { I18nComponent } from './i18n/i18n.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { LoggerComponent } from './logger/logger.component';
import { MertialSidenavComponent } from './mertial-sidenav/mertial-sidenav.component';
import { AwsSdkComponent } from './aws-sdk/aws-sdk.component';
import { ImgCropperComponent } from './img-cropper/img-cropper.component';
import { NgxAceComponent } from './ngx-ace/ngx-ace.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
    tabSize: 4
};

@NgModule({
    imports: [
        AceModule,
        SharedModule,
        TestRoutingModule,
        ImageCropperModule,
        AlertModule.forRoot(),
        LoggerModule.forRoot({
            // TRACE|DEBUG|INFO|LOG|WARN|ERROR|OFF
            level: NgxLoggerLevel.DEBUG
        }),
        MultiselectModule.forRoot(),
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        MzSelectModule,
        MzButtonModule,
        MzInputModule,
        MatSelectModule,
        MatSidenavModule
    ],
    declarations: [
        TestComponent,
        ComponentTemplateComponent,
        EmitterComponent,
        LifecycleComponent,
        ChildComponent,
        DynamicComponentComponent,
        DynamicChildComponentComponent,
        DynamicComponentChildDirective,
        CustomPipe,
        CustomPipeComponent,
        ObservableComponent,
        ServiceComponent,
        HeroComponent,
        NgContentComponent,
        NgContentChildComponent,
        UseClassComponent,
        UseExistingClassComponent,
        FormsComponent,
        ReactiveFormComponent,
        TemplateDrivenFormComponent,
        HttpComponent,
        UseValueComponent,
        I18nComponent,
        BootstrapComponent,
        LoggerComponent,
        MertialSidenavComponent,
        AwsSdkComponent,
        ImgCropperComponent,
        ImageCropperComponent,
        NgxAceComponent
    ],
    providers: [
        NGXLogger,
        {
            provide: ACE_CONFIG,
            useValue: DEFAULT_ACE_CONFIG
        }
    ],
    entryComponents: [DynamicChildComponentComponent]
})
export class TestModule {
    constructor() {
        // console.log('loading testing module...')
    }
}

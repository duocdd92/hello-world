import { Component, OnInit } from '@angular/core';
import { MultipleSessionService } from '../multiple-session/multiple-session.service';
import { Hero } from '../../classes/Hero';
import { ServiceConfig } from './service-config';
import { UseExistingClass1Service } from '../use-existing-class/use-existing-class-1.service'
import { UseExistingClass2Service } from '../use-existing-class/use-existing-class-2.service'

const serviceConfig: ServiceConfig = {
    id: 100,
    description: 'service config'
}

// const serviceConfig: ServiceConfig = new ServiceConfig({ id: 10, description: 'test service config' });

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css'],
    providers: [
        UseExistingClass1Service,
        UseExistingClass2Service,
        // MultipleSessionService,
        { provide: ServiceConfig, useValue: 'serviceConfig' }
    ]
})
export class ServiceComponent implements OnInit {
    hero: Hero = {
        id: 1,
        name: 'duocdd',
        isFlyingHero: true
    };
    hero2: Hero = {
        id: 2,
        name: 'duocdd 2',
        isFlyingHero: true
    };

    constructor(
        // private firstService: HandlerService,
    ) {

    }

    ngOnInit() {
    }

}

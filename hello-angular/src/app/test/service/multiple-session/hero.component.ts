import { Component, OnInit, Input, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hero } from '../../classes/Hero';
import { MultipleSessionService } from './multiple-session.service';

@Component({
    selector: 'app-service-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css'],
    providers: [MultipleSessionService]
})
export class HeroComponent implements OnInit {
    test: Hero = {
        id: 2,
        name: 'duocdd 2',
        isFlyingHero: true
    };

    get hero(): Hero {
        // console.log('get', this.test);
        return this.multipleSessionService.hero;
    }

    @Input()
    set hero(h: Hero) {
        // console.log('set', h);
        this.test = h;
        this.multipleSessionService.hero = h;
    }

    heroFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        @Optional() private multipleSessionService: MultipleSessionService
    ) {
        // console.log('constructor', this.test);
    }

    ngOnInit() {
        // console.log('onInit', this.test);
        this.createForm();
        this.heroFormGroup.valueChanges.subscribe(newValues => {
            // console.log(newValues);
        })
    }

    onSubmit() {
        console.log('submit form', this.heroFormGroup);
        // console.log(this.heroFormGroup.get('name'));
        this.multipleSessionService.saveHero();
    }

    createForm() {
        let hero = this.multipleSessionService.hero;
        this.heroFormGroup = this.formBuilder.group({
            id: hero.id,
            name: hero.name,
            isFlying: hero.isFlyingHero
        });
    }

    restore() {
        // console.log('restore');
        let hero = this.multipleSessionService.originHero;
        this.heroFormGroup.reset({
            id: hero.id,
            name: hero.name,
            isFlying: hero.isFlyingHero
        });
        this.multipleSessionService.restoreHero();
    }

    changeName() {
        this.heroFormGroup.patchValue({
            name: 'change name'
        })
    }

    showOrigin() {
        console.log('origin', this.multipleSessionService.originHero);
    }
}

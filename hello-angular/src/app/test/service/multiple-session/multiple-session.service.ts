import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Hero } from '../../classes/Hero';

@Injectable()
export class MultipleSessionService {
    currentHero: Hero;
    originHero: Hero;
    count = 0;

    constructor() {
        console.log('Initial multiple session service', ++this.count);
    }

    set hero(hero: Hero) {
        // console.log('hero service set');
        this.originHero = hero;
        this.currentHero = JSON.parse(JSON.stringify(hero));
    }

    get hero(): Hero {
        // console.log('hero service get');
        return this.currentHero;
    }

    restoreHero() {
        this.hero = this.originHero;
    }

    saveHero() {
        this.hero = this.currentHero;
    }
}
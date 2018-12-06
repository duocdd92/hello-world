import { Component, OnInit } from '@angular/core';

import { Hero } from '../classes/Hero'

@Component({
    selector: 'app-custom-pipe',
    templateUrl: './custom-pipe.component.html',
    styleUrls: ['./custom-pipe.component.css']
})
export class CustomPipeComponent implements OnInit {
    id = 6;
    heroes: Hero[] = [
        { id: 1, name: 'Hero 1', isFlyingHero: true },
        { id: 2, name: 'Hero 2', isFlyingHero: true },
        { id: 3, name: 'Hero 3', isFlyingHero: true },
        { id: 4, name: 'Hero 4', isFlyingHero: false },
        { id: 5, name: 'Hero 5', isFlyingHero: true }
    ]
    constructor() { }

    ngOnInit() {
    }

    addHero(event: any){
        let obj = { id: this.id++, name: event.target.value, isFlyingHero: true }
        this.heroes = this.heroes.concat(obj)
        // console.log(this.heroes)
        event.target.value = ''
    }

}

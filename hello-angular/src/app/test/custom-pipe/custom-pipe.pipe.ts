import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from '../classes/Hero'

@Pipe({
  name: 'appCustomPipe'
})
export class CustomPipe implements PipeTransform {

  transform(value: Hero[], args?: any): any {
    return value.filter(hero => hero.isFlyingHero);
  }

}

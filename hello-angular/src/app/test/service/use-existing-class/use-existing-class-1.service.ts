import { Injectable } from '@angular/core';

@Injectable()
export class UseExistingClass1Service {
    getText1() {
        console.log('Existing service 1 - text 1')
    }

    getText2(){
        console.log('Existing service 1 - text 2')
    }
}
import { Injectable } from '@angular/core';
import { UseClass1Service } from './use-class-1.service'

@Injectable()
export class UseClass2Service extends UseClass1Service {
    getText(text: string) {
        return super.getText('this is use-class service 2');
    }
}
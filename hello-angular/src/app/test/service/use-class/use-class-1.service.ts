import { Injectable } from '@angular/core';

@Injectable()
export class UseClass1Service {
    getText(text: string) {
        return text || 'this is use-class service 1';
    }
}
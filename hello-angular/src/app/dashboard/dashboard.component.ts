import { Component } from '@angular/core';
 
@Component({
    template: `
        <h1>dashboard component</h1>
        <a routerLink="/dashboard/detail">detail</a>
        <router-outlet></router-outlet>
    `
})
export class DashboardComponent{ }
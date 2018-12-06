import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Address, Hero } from '../../classes/Hero';

@Component({
    selector: 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

    hero: Hero = {
        id: 100,
        age: 26,
        name: 'duocdd',
        isFlyingHero: true
    }

    address: Address = {
        city: 'Hanoi',
        street: 1
    }

    heroForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.dropdownList = [
            { "id": 1, "itemName": "India" },
            { "id": 2, "itemName": "Singapore" },
            { "id": 3, "itemName": "Australia" },
            { "id": 4, "itemName": "Canada" },
            { "id": 5, "itemName": "South Korea" },
            { "id": 6, "itemName": "Germany" },
            { "id": 7, "itemName": "France" },
            { "id": 8, "itemName": "Russia" },
            { "id": 9, "itemName": "Italy" },
            { "id": 10, "itemName": "Sweden" }
        ];
        this.selectedItems = [
            { "id": 2, "itemName": "Singapore" },
            { "id": 3, "itemName": "Australia" },
            { "id": 4, "itemName": "Canada" },
            { "id": 5, "itemName": "South Korea" }
        ];
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Countries",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass custom-class"
        };
        this.createForm();
    }

    ngOnInit() {
        this.buildForm();
        this.heroForm.get('name').valueChanges.subscribe(data => {
            console.log('Name control ', data);
        })
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

    createForm() {
        this.heroForm = this.fb.group({
            name: ['', Validators.required],
            age: '',
            arr: [],
            address: this.fb.group(this.address),
            multiselect: '',
            angular2Multi: '',
            ngxMulti: ''
        });
    }

    buildForm() {
        this.heroForm.setValue({
            name: this.hero.name,
            age: this.hero.age,
            address: {
                city: this.address.city,
                street: this.address.street
            },
            arr: [{ a: 'a', b: 'b' }, { a: 'a1', b: 'b1' }],
            multiselect: '',
            angular2Multi: '',
            ngxMulti: ''
        })
        console.log(this.heroForm)
    }

    reset() {
        this.heroForm.reset();
    }

}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-aws-sdk',
    templateUrl: './aws-sdk.component.html',
    styleUrls: ['./aws-sdk.component.css']
})
export class AwsSdkComponent implements OnInit {
    // AWS: any;
    file: any;

    constructor() {
        // this.AWS = window['AWS'];
    }

    ngOnInit() {
    }

    uploadfile(event) {
        var params = { Key: 'duocdd', Body: this.file };
    }

    fileEvent(event: any) {
        var files = event.target.files;
        var file = files[0];
        this.file = file;
        console.dir(event.target)
    }

}

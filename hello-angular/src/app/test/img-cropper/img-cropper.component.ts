import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";

@Component({
    selector: 'app-img-cropper',
    templateUrl: './img-cropper.component.html',
    styleUrls: ['./img-cropper.component.css']
})
export class ImgCropperComponent implements OnInit {
    @ViewChild('cropper') cropper: ImageCropperComponent;
    data: any;
    cropperSettings: CropperSettings;

    imageChangedEvent: any = '';
    croppedImage: any = '';

    constructor() {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 300;
        this.cropperSettings.height = 300;
        this.cropperSettings.minWidth = 300;
        this.cropperSettings.minHeight = 300;
        this.cropperSettings.croppedWidth = 300;
        this.cropperSettings.croppedHeight = 300;
        this.cropperSettings.canvasWidth = 700;
        this.cropperSettings.canvasHeight = 500;
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.rounded = true;
        this.cropperSettings.dynamicSizing = true;
        this.data = {};
    }

    ngOnInit() {
    }

    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }

    decodeBase64() {
        let buf = new Buffer(this.data.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
        console.log(buf)
        console.log(atob('cGFzc3dvcmQ='))
    }


    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(image: string) {
        this.croppedImage = image;
    }
    imageLoaded() {
        console.log('imageLoaded()')
    }
    loadImageFailed() {
        console.log('loadImageFailed()')
    }
    imageCroppedFile(image) {
        console.log(image)
    }

    imageFileChanged(event) {
        console.log('imageFileChanged()', event)
    }
}

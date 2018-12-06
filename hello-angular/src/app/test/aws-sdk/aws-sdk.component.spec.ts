import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsSdkComponent } from './aws-sdk.component';

describe('AwsSdkComponent', () => {
  let component: AwsSdkComponent;
  let fixture: ComponentFixture<AwsSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

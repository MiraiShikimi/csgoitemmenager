import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickuseritemComponent } from './pickuseritem.component';

describe('PickuseritemComponent', () => {
  let component: PickuseritemComponent;
  let fixture: ComponentFixture<PickuseritemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickuseritemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickuseritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

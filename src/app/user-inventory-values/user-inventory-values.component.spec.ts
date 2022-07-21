import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInventoryValuesComponent } from './user-inventory-values.component';

describe('UserInventoryValuesComponent', () => {
  let component: UserInventoryValuesComponent;
  let fixture: ComponentFixture<UserInventoryValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInventoryValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInventoryValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

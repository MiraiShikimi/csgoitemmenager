import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemscontrollComponent } from './itemscontroll.component';

describe('ItemscontrollComponent', () => {
  let component: ItemscontrollComponent;
  let fixture: ComponentFixture<ItemscontrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemscontrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemscontrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

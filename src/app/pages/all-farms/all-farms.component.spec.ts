import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFarmsComponent } from './all-farms.component';

describe('AllFarmsComponent', () => {
  let component: AllFarmsComponent;
  let fixture: ComponentFixture<AllFarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFarmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmOutputComponent } from './farm-output.component';

describe('FarmOutputComponent', () => {
  let component: FarmOutputComponent;
  let fixture: ComponentFixture<FarmOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPocketsComponent } from './edit-pockets.component';

describe('EditPocketsComponent', () => {
  let component: EditPocketsComponent;
  let fixture: ComponentFixture<EditPocketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPocketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLabComponent } from './form-lab.component';

describe('FormLabComponent', () => {
  let component: FormLabComponent;
  let fixture: ComponentFixture<FormLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

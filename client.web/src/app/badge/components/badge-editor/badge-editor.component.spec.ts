import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'app/material.module';
import { BadgeEditorComponent } from './badge-editor.component';
import { IBadge } from '../../models/IBadge';

fdescribe('BadgeEditorComponent', () => {
  let component: BadgeEditorComponent;
  let fixture: ComponentFixture<BadgeEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [BadgeEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeEditorComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.badgeForm.valid).toBeFalse();
    expect(component.name.valid).toBeFalse();
    expect(component.name.errors.required).toBeTruthy();
  });

  it('should validate name correctly', () => {
    const name = component.name;
    expect(name.valid).toBeFalse();
    expect(component.name.errors.required).toBeTruthy();

    name.setValue('Short name');
    expect(name.valid).toBeTrue();

    name.setValue('a'.repeat(255));
    expect(name.valid).toBeFalse();
    expect(component.name.errors.maxlength).toBeTruthy();
  });

  it('should emit form submit', () => {
    const name = component.name;
    const shortName = 'Short name';
    name.setValue(shortName);

    let resultValue: IBadge;
    component.save.subscribe((value: IBadge) => {
      resultValue = value;
    });

    component.onSubmit();

    expect(resultValue).toBeDefined();
    expect(resultValue.name).toEqual(shortName);
    expect(resultValue.description).toBeFalsy();
  });
});

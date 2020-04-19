import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { IBadge } from '../../models/IBadge';

@Component({
  selector: 'badgerer-badge-editor',
  templateUrl: './badge-editor.component.html',
  styleUrls: ['./badge-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeEditorComponent implements OnInit {

  @Output() public save = new EventEmitter<IBadge>();

  public badgeForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(250)]],
    description: ['']
  });

  public constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.badgeForm.valid) {
      this.save.emit(this.badgeForm.value);
    }
  }

  public get name(): AbstractControl {
    return this.badgeForm.get('name');
  }

  public get description(): AbstractControl {
    return this.badgeForm.get('description');
  }
}

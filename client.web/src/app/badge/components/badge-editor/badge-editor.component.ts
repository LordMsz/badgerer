import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, Optional } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { IBadge } from '@badgerer/badge/models';

@Component({
  selector: 'badgerer-badge-editor',
  templateUrl: './badge-editor.component.html',
  styleUrls: ['./badge-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeEditorComponent implements OnInit {

  @Input() public badge: IBadge;
  @Output() public save = new EventEmitter<IBadge>();
  @Output() public cancel = new EventEmitter();

  public badgeForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(250)]],
    description: ['']
  });

  public constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    if (this.badge) {
      this.badgeForm.patchValue({
        name: this.badge.name,
        description: this.badge.description
      });
    }
  }

  public onSubmit(): void {
    if (this.badgeForm.valid) {
      const fv = this.badgeForm.value;
      const result: IBadge = {
        id: this.badge ? this.badge.id : null,
        name: fv.name,
        description: fv.description
      };
      this.save.emit(result);
    }
  }

  public get name(): AbstractControl {
    return this.badgeForm.get('name');
  }

  public get description(): AbstractControl {
    return this.badgeForm.get('description');
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'lib-dynamic-mat-forms',
  standalone: true,
  imports: [],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let field of schema.fields" class="form-field">
        <ng-container [ngSwitch]="field.type">
          <!-- Text Input -->
          <mat-form-field *ngSwitchCase="'text'" appearance="outline">
            <mat-label>{{ field.label }}</mat-label>
            <input
              matInput
              [formControlName]="field.name"
              [placeholder]="field.placeholder"
            />
          </mat-form-field>

          <!-- Email Input -->
          <mat-form-field *ngSwitchCase="'email'" appearance="outline">
            <mat-label>{{ field.label }}</mat-label>
            <input
              matInput
              type="email"
              [formControlName]="field.name"
              [placeholder]="field.placeholder"
            />
          </mat-form-field>

          <!-- Date Picker -->
          <mat-form-field *ngSwitchCase="'datepicker'" appearance="outline">
            <mat-label>{{ field.label }}</mat-label>
            <input
              matInput
              [matDatepicker]="picker"
              [formControlName]="field.name"
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <!-- Checkbox -->
          <mat-checkbox
            *ngSwitchCase="'checkbox'"
            [formControlName]="field.name"
          >
            {{ field.label }}
          </mat-checkbox>

          <!-- Select Dropdown -->
          <mat-form-field *ngSwitchCase="'select'" appearance="outline">
            <mat-label>{{ field.label }}</mat-label>
            <mat-select [formControlName]="field.name">
              <mat-option
                *ngFor="let option of field.options"
                [value]="option.value"
              >
                {{ option.label }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </ng-container>

        <!-- Display Errors -->
        <mat-error
          *ngIf="form.get(field.name)?.invalid && form.get(field.name)?.touched"
        >
          <small *ngIf="form.get(field.name)?.errors?.required">
            {{ field.label }} is required.
          </small>
          <small *ngIf="form.get(field.name)?.errors?.email">
            Please enter a valid email.
          </small>
        </mat-error>
      </div>

      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="form.invalid"
      >
        Submit
      </button>
    </form>
  `,
  styleUrls: ['./dynamic-mat-forms.component.css'],
})
export class DynamicMatFormsComponent implements OnInit {
  @Input() schema: any;
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  fileData: { [key: string]: File } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.buildForm();
  }

  buildForm() {
    this.schema.fields.forEach((field: any) => {
      const control = this.fb.control(
        '',
        this.mapValidators(field.validators || {})
      );
      this.form.addControl(field.name, control);

      // Handle dependent fields
      if (field.dependsOn) {
        const dependency = field.dependsOn;
        this.form.get(dependency.field)?.valueChanges.subscribe((value) => {
          if (value === dependency.value) {
            this.form.get(field.name)?.enable();
          } else {
            this.form.get(field.name)?.disable();
            this.form.get(field.name)?.reset();
          }
        });
        this.form.get(field.name)?.disable(); // Initially disable
      }
    });
  }

  mapValidators(validators: any) {
    const mapped = [];
    if (validators.required) mapped.push(Validators.required);
    if (validators.email) mapped.push(Validators.email);
    if (validators.minLength)
      mapped.push(Validators.minLength(validators.minLength));
    return mapped;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.fileData[controlName] = file;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      Object.keys(this.fileData).forEach((key) => {
        formValue[key] = this.fileData[key];
      });
      this.formSubmit.emit(formValue);
    }
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'dynamic-mat-forms',
  templateUrl: './dynamic-mat-forms.component.html',
  styleUrl: './dynamic-mat-forms.component.css',
})
export class DynamicMatFormsComponent implements OnInit {
  @Input() schema: any;
  @Input() formStyles?: { [key: string]: any };
  @Input() formAppearance: MatFormFieldAppearance = 'outline';
  @Output() formSubmit = new EventEmitter<any>();
  filteredOptions: { [key: string]: string[] } = {};
  form!: FormGroup;
  fileData: { [key: string]: File } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.buildForm();
  }

  filterOptions(event: any, field: any): void {
    const value = event.target.value;
    console.log(value);
    const filterValue = value.toLowerCase();
    this.filteredOptions[field.data] = field.data.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
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

  getStyles(fieldName: string): any {
    return this.formStyles ? this.formStyles[fieldName] || {} : {};
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

  upload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const controlName = inputElement.name;
      this.fileData[controlName] = file;
      this.form.patchValue({ [controlName]: file });
    }
  }
}

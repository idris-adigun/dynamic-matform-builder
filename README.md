# DynamicMatForms

DynamicMatForms for Angular is a library that allows you to dynamically generate forms based on a JSON schema. It supports multiple input types, validation, dependent inputs, and animations. This library integrates seamlessly with Angular Material to create responsive and interactive forms.
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

### Feature

- Dynamic Form Creation: Generate forms based on a JSON schema.
- Multiple Input Types: Supports text, checkbox, radio buttons, file uploads, date pickers, and more to come.
- Validation: Built-in support for required, email, and custom validators.
- Dependent Inputs: Conditional form controls that enable or disable based on other field values.
- Animations: Smooth form transitions using Angular Material's animation system.

## Installation

### 1. Install via NPM

```bash
npm i dynamic-mat-forms
```

### 2. Install Angular Material

```
ng add @angular/material
```

### 3. Include DynamicMatForms

In your app.module.ts (or another module where you want to use the dynamic forms):

```TypeScript
import { DynamicMatFormsModule } from 'dynamic-mat-forms';

@NgModule({
  imports: [
    DynamicMatFormsModule,
    ...
  ],
})
export class AppModule {}
```

### 4. Include animation if not already included

```TypeScript
...
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    ...
    provideAnimations(),
  ],
};

```

## Usage

1. ### Define Schema
   The form schema is a JSON object that defines the form fields, input types, validations, and other configurations.

Example schema:

```TypeScript
 formSchema = {
    formName: 'User Form',
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        validators: { required: true },
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        validators: { required: true, email: true },
      },
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ],
        validators: { required: true },
      },
      {
        name: 'adminCode',
        type: 'text',
        label: 'Admin Code',
        dependsOn: { field: 'role', value: 'admin' },
        validators: { requiredWhen: { field: 'role', value: 'admin' } },
      },
    ],
  };
```

### 2. Use DynamicMatForms component in your template

In your component's template, use the **dynamic-mat-forms** component to display the form:

```html
<dynamic-mat-forms [schema]="formSchema" (formSubmit)="onFormSubmit($event)"></dynamic-mat-forms>
```

### 3. Schema types and Handling submission

This example shows text, email, password, datepicker, file, checkbox, slide-toggle,select, radio form type

```TypeScript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicMatFormsModule } from 'dynamic-mat-forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DynamicMatFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
    formSchema = {
    formName: 'User Form',
    fields: [
      {
        name: 'text-input-field',
        type: 'text',
        label: 'Username',
        placeholder: 'Enter your Username',
        validators: { required: true },
      },
      {
        name: 'password-field',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        validators: {
          required: true,
          minLength: 6,
          maxLength: 10,
          pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])',
        },
      },
      {
        name: 'email-field',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        validators: { required: true, email: true },
      },
      {
        name: 'datepicker-field',
        type: 'datepicker',
        label: 'Date of Birth',
        placeholder: 'Enter your date of birth',
        validators: { required: true },
        min: new Date('01/01/1900'),
        max: new Date('01/01/2021'),
      },
      {
        name: 'radio-field-example',
        type: 'radio',
        label: 'Options',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ],
        validators: { required: true },
      },
      {
        name: 'autocomplete-field-one',
        type: 'autocomplete',
        label: 'Country',
        data: [
          'Canada',
          'United States',
          'Mexico',
          'Brazil',
          'Germany',
          'France',
          'Italy',
        ],
      },
      {
        name: 'autocomplete-two',
        type: 'autocomplete',
        label: 'Country',
        data: [
          'Nigeria',
          'United States',
          'Mexico',
          'Brazil',
          'Germany',
          'France',
          'Italy',
        ],
      },
      {
        name: 'checkbox-field',
        type: 'checkbox',
        label: 'Terms and Conditions',
        validators: { required: true },
      },
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        placeholder: 'Select a role',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ],
        validators: { required: true },
      },
      {
        name: 'slide-toggle-field',
        type: 'slide-toggle',
        label: 'Slide',
        min: 0,
        max: 100,
        validators: { required: true },
      },
      {
        name: 'file-field',
        type: 'file',
        label: 'Upload File',
        validators: { required: true },
      },
      {
        name: 'adminCode',
        type: 'text',
        label: 'Admin Code',
        // dependsOn: { field: 'role', value: 'admin' },
        dependsOn: { field: 'role' },
        validators: { requiredWhen: { field: 'role', value: 'admin' } },
      },
    ],
  };

  onFormSubmit(event: any) {
    console.log(event);
  }
}
```

### 4. Handling dependency

If you want to make a field dependent on the another field either by value or by just by being filled
you can add the following to the schema in concern, for instance

```TypeScript
formSchema = {
  ...
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        placeholder: 'Select a role',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ],
        validators: { required: true },
      },
      {
        name: 'adminCode',
        type: 'text',
        label: 'Admin Code',
        dependsOn: { field: 'role' },
        validators: { requiredWhen: { field: 'role', value: 'admin' } },
      },
}

```

In the code above adminCode field depends on role field to be valid before it shows up, otherwise it's disabled. Also it validity depends on the role field value being 'admin'

If you want the field to depend on both parent field and value, you can update the _dependsOn_ value to:

```TypeScript
...
dependsOn: { field: 'role', value: 'admin' },
...
```

This means the value of role has be 'admin' for adminCode field to be enabled

### 5. Styling your form

You might also want to style your form, to do this dynamic-mat-forms accept _formStyles_ input.
For instance:

```TypeScript
...
  // Dynamic styles for the form
formStyles = {
  username: {
    formField: { width: '100%', marginBottom: '0px', paddingBottom: '0px' },
    input: { color: 'blue', fontSize: '16px', paddingBottom: '0px' },
    error: { color: 'purple', fontSize: '12px', paddingTop: '0px' },
  },
  email: {
    formField: { width: '50%', marginBottom: '20px' },
    input: { color: 'green', fontSize: '16px' },
  },
  password: {
    formField: { width: '100%', marginBottom: '20px' },
    input: { color: 'red', fontSize: '16px' },
    error: { color: 'orange', fontSize: '12px' },
  },
  submitButton: {
    backgroundColor: 'purple',
    color: 'white',
    padding: '10px 20px',
  },
};
....
```

Add style to template:

```html
<dynamic-mat-forms [schema]="formSchema" (formSubmit)="onFormSubmit($event)" [formStyles]="formStyles"> </dynamic-mat-forms>
```

### 6. Form appearance type

You might also want to specify the form appearance, the default appearance is _outline_
To change form appearance

- First create the input variable on the component

```TypeScript
import { MatFormFieldAppearance } from '@angular/material/form-field';
...
export class AppComponent {
  formAppearance: MatFormFieldAppearance = 'fill'; // fill, outline
...
```

- Add formAppearance to template

```html
<dynamic-mat-forms [schema]="formSchema" [formAppearance]="formAppearance" (formSubmit)="onFormSubmit($event)" [formStyles]="formStyles"> </dynamic-mat-forms>
```

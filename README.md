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

2. ### Use DynamicMatForms component in your template
   In your component's template, use the **dynamic-mat-forms** component to display the form:

```html
<dynamic-mat-forms [schema]="formSchema" (formSubmit)="onFormSubmit($event)"></dynamic-mat-forms>
```

3. ### Handle Form Submission
   In your component class, define the form schema and handle the form submission:

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

  onFormSubmit(event: any) {
    console.log(event);
  }
}
```

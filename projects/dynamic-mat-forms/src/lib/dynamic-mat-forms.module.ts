import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ObserversModule } from '@angular/cdk/observers';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DynamicMatFormsComponent } from './dynamic-mat-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [DynamicMatFormsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ObserversModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
  ],
  exports: [DynamicMatFormsComponent],
})
export class DynamicMatFormsModule {}

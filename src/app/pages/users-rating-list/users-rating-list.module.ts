import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRatingComponent } from './components/add-rating/add-rating.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@NgModule({
  declarations: [AddRatingComponent],
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, InputTextareaModule, RatingModule, InputIconModule, IconFieldModule],
  exports: [AddRatingComponent],
})
export class UsersRatingListModule {}

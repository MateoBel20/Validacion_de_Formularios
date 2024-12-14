import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  emailCtrl = new FormControl('', [Validators.email, Validators.required,Validators.minLength(13)]);

  constructor() {
    this.emailCtrl.valueChanges
    .pipe(
      debounceTime(500)
    )

    .subscribe((value) => {
      console.log(value);
    });
  }

  getEmail(event: Event) {
    event.preventDefault();
    console.log(this.emailCtrl.value);
  }
}

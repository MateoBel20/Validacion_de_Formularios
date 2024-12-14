import { openDB } from 'idb';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { RecaptchaModule } from 'ng-recaptcha';
@Component({
  selector: 'app-form-lab',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,ReactiveFormsModule,RecaptchaModule],
  templateUrl: './form-lab.component.html',
  styleUrls: ['./form-lab.component.css'],
})
export class FormLabComponent {
  form: FormGroup;
  private db: any;
  recaptchaToken: string | null = null;

  constructor(private forBuilder: FormBuilder) {
    this.buildForm();
    this.initializeDatabase();
    this.form.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      console.log('Cambios en el formulario:', value);
    });
  }

  // Inicialización de IndexedDB
  async initializeDatabase() {
    this.db = await openDB('FormLabDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('formData')) {
          db.createObjectStore('formData', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
    console.log('Base de datos inicializada');
  }

  // Guardar datos en IndexedDB
  async saveToDatabase(data: any) {
    const tx = this.db.transaction('formData', 'readwrite');
    const store = tx.objectStore('formData');
    await store.add({ ...data, timestamp: new Date() });
    await tx.done;
    console.log('Datos guardados en la base de datos local');
  }

  // Construcción del formulario
  private buildForm() {
    this.form = this.forBuilder.group({
      name: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      text: new FormControl('', [
        Validators.minLength(100),
        Validators.maxLength(1000),
        Validators.required,
      ]),
      category: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      terms: new FormControl('', [Validators.required]),
    });
  }

  // Guardar datos al enviar el formulario
  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.saveToDatabase(value);
      console.log('Formulario válido y enviado:', value);
    } else {
      console.log('Formulario no válido');
    }
  }

  // Getters para acceder a los campos del formulario
  get textField() {
    return this.form.get('text');
  }

  get cedula() {
    return this.form.get('cedula');
  }

  get name() {
    return this.form.get('name');
  }

  get date() {
    return this.form.get('date');
  }

  get email() {
    return this.form.get('email');
  }

  get category() {
    return this.form.get('category');
  }

  get terms() {
    return this.form.get('terms');
  }

  onCaptchaResolved(event: any) {
    const token = event?.token || '';
    console.log(token);
    this.recaptchaToken = token;
    this.form.get('6Ld0rpsqAAAAAGHx-eSLkQjeAkiiYxl6Ty0se8ZD')?.setValue(token);
  }
}

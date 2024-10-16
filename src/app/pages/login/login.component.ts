import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../core/interfaces/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordValidator });
  }

  passwordValidator(form: FormGroup) {
    const password = form.get('password');
    //hacer la validacion de la contraseña
  }

  usuario: Login = {
    email: "",
    contrasenia: ""
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Manejar el envío del formulario
      console.log('Formulario válido:', this.registerForm.value);
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {

      this.errorMsg = '';
      this.router.navigate(['/home']);
    } else {

      this.errorMsg = 'Credenciales incorrectas';
    }
  }
}

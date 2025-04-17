import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-salida-material',
  templateUrl: './salida-material.page.html',
})
export class SalidaMaterialPage {
  material = {
    nombre: '',
    cantidad: null,
    responsable: '',
  };

  salidas: any[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  registrarSalida() {
    if (
      this.material.nombre &&
      this.material.cantidad &&
      this.material.responsable
    ) {
      this.salidas.push({ ...this.material });
      this.material = { nombre: '', cantidad: null, responsable: '' };
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
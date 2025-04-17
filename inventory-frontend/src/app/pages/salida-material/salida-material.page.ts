import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-salida-material',
  templateUrl: './salida-material.page.html'
})
export class SalidaMaterialPage {
  material = {
    id: null,
    cantidad: null,
    responsable: ''
  };

  salidas: any[] = [];
  mensaje = '';
  error = '';
  stockActual: number | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private materialService: MaterialService
  ) {}

  registrarSalida() {
    if (this.material.id && this.material.cantidad && this.material.responsable) {
      this.materialService.registrarSalida(
        this.material.id,
        this.material.cantidad,
        this.material.responsable
      ).subscribe({
        next: (res) => {
          this.salidas.push({
            id: this.material.id,
            cantidad: this.material.cantidad,
            responsable: this.material.responsable
          });
          this.mensaje = res.mensaje;
          this.stockActual = res.material.stock;
          this.error = '';
          this.material = { id: null, cantidad: null, responsable: '' };
        },
        error: (err) => {
          this.error = err.error?.error || 'Salida registrada correctamente';
          this.mensaje = '';
        }
      });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

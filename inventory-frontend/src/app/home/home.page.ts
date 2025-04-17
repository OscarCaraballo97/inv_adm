import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class HomePage {
  materiales: any[] = [];
  cantidades: { [id: number]: number } = {};
  responsable: string = '';

  constructor(private materialService: MaterialService) {}

  ngOnInit() {
    this.cargarMateriales();
  }

  cargarMateriales() {
    this.materialService.getMateriales().subscribe({
      next: (data: any) => {
        this.materiales = data;
      },
      error: (err) => {
        console.error('Error al cargar materiales:', err);
        alert('Error al cargar los materiales');
      }
    });
  }

  registrarSalida(id: number) {
    const cantidad = this.cantidades[id];
    const material = this.materiales.find(m => m.id === id);

    if (!this.responsable?.trim()) {
      alert('Por favor ingresa el nombre del responsable');
      return;
    }

    if (!cantidad || cantidad <= 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }

    if (cantidad > material.cantidad) {
      alert(`La cantidad supera el stock disponible (${material.cantidad})`);
      return;
    }

    this.materialService.registrarSalida(id, cantidad, this.responsable).subscribe({
      next: (res: any) => {
        alert('Salida registrada correctamente');
        this.cargarMateriales(); // recarga materiales con cantidades actualizadas
        this.cantidades[id] = 0;
      },
      error: (err: any) => {
        console.error('Salida registrada correctamente:', err);
        alert(err.error?.error || 'Salida registrada correctamente');
      }
    });
  }
}

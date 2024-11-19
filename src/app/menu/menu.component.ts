import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { PersonajeService } from '../service/personaje.service';
import { PersonajeDetalleComponent } from '../personaje-detalle/personaje-detalle.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  personajes: any[] = [];
  personajesPaginados: any[] = [];
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
    private personajeService: PersonajeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.personajeService.getPersonajes().subscribe({
      next: (data) => {
        console.log('Personajes:', data);
        this.personajes = data.results;
        this.actualizarPagina();
      },
      error: (error) => {
        console.error('Error al obtener personajes:', error);
      }
    });
  }

  actualizarPagina(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.personajesPaginados = this.personajes.slice(startIndex, endIndex);
  }

  cambiarPagina(direccion: string): void {
    if (direccion === 'next' && (this.currentPage + 1) * this.pageSize < this.personajes.length) {
      this.currentPage++;
    } else if (direccion === 'prev' && this.currentPage > 0) {
      this.currentPage--;
    }
    this.actualizarPagina();
  }

  abrirDetalle(personaje: any): void {
  const dialogRef = this.dialog.open(PersonajeDetalleComponent, {
    data: personaje,
    width: '50%',
    height: '50%',
    backdropClass: 'custom-backdrop',
    panelClass: 'custom-dialog-container'
  });
}


  get totalPages(): number {
    return Math.ceil(this.personajes.length / this.pageSize);
  }
}

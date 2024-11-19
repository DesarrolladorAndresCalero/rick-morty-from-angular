import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-personaje-detalle',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './personaje-detalle.component.html',
  styleUrl: './personaje-detalle.component.css'
})
export class PersonajeDetalleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }
}

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-modal',
  templateUrl: './add-note-modal.component.html',
  imports: [IonicModule, CommonModule, FormsModule],
  styleUrls: ['./add-note-modal.component.scss'],

})
export class AddNoteModalComponent {
  
  titulo: string = '';
  contenido: string = '';
  fecha: string = new Date().toISOString().slice(0, 10); // "2025-04-08"
  categoria: string = 'Recordatorios';

  constructor(private modalCtrl: ModalController) {}

  guardar() {
    const hoy = new Date();
    const fechaNota = new Date(this.fecha);
    const esHoy = hoy.toDateString() === fechaNota.toDateString();

    const nuevaNota = {
      id: Date.now(),
      titulo: this.titulo,
      contenido: this.contenido,
      fecha: this.fecha,
      categoria: this.categoria,
      hoy: esHoy,
      programado: !esHoy,
    };

    this.modalCtrl.dismiss(nuevaNota);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}

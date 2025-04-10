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
  standalone: true,
})
export class AddNoteModalComponent {

  titulo: string = '';
  contenido: string = '';
  fecha: string = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
  categoria: string = 'Recordatorios';

  constructor(private modalCtrl: ModalController) {}

  guardar() {
    const hoy = new Date();
    const fechaNota = new Date(this.fecha);
    const esHoy = hoy.toDateString() === fechaNota.toDateString();

    // Validación básica (opcional pero elegante)
    if (!this.titulo.trim() || !this.contenido.trim()) {
      alert('¡Completa el título y el contenido antes de guardar!');
      return;
    }

    const nuevaNota = {
      id: Date.now(),
      titulo: this.titulo,
      contenido: this.contenido,
      fecha: this.fecha,
      categoria: this.categoria,
      hoy: esHoy,
      programado: !esHoy,
    };

    // Guardar en LocalStorage
    const notasGuardadas = JSON.parse(localStorage.getItem('notas') || '[]');
    notasGuardadas.push(nuevaNota);
    localStorage.setItem('notas', JSON.stringify(notasGuardadas));

    // Cerrar el modal y retornar la nota
    this.modalCtrl.dismiss({ nota: nuevaNota }, 'confirmado');
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

}

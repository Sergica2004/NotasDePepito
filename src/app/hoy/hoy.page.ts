import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';

interface Nota {
  titulo: string;
  contenido: string;
  categoria: string;
  fecha?: string;
  indicador?: boolean;
  terminada?: boolean;
  hoyCount: boolean;
  programado?: boolean;
}

@Component({
  selector: 'app-hoy',
  templateUrl: './hoy.page.html',
  styleUrls: ['./hoy.page.scss'],
  imports: [CommonModule, IonicModule] 

})
export class HoyPage implements OnInit {

  notasHoy: any[] = [];


  constructor(private modalCtrl: ModalController) {}

  notas: any[] = [];
  totalNotas: number = 0;
  hoyCount: number = 0;
  programadosCount: number = 0

  ngOnInit() {
    this.cargarNotasHoy();
  }

  agregarNota(nuevaNota: Nota) {
    this.notas.push(nuevaNota);
    localStorage.setItem('notas', JSON.stringify(this.notas));
    this.totalNotas = this.notas.length;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddNoteModalComponent,
    });

    modal.onDidDismiss().then(() => {
      this.cargarNotasHoy();
    });

    await modal.present();
  }

  cargarNotasHoy() {
    const notas = JSON.parse(localStorage.getItem('notas') || '[]');
    const hoy = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    this.notasHoy = notas.filter((nota: { fecha: string; }) => nota.fecha === hoy);
  }
}

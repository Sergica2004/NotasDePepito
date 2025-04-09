import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  notas: any[] = [];
  totalNotas: number = 0;
  hoyCount: number = 0;
  programadosCount: number = 0;

  constructor(private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.cargarNotas();
  }

  cargarNotas() {
    const notasGuardadas = localStorage.getItem('notas');
    this.notas = notasGuardadas ? JSON.parse(notasGuardadas) : [];
    this.totalNotas = this.notas.length;
  }

  agregarNota(nuevaNota: Nota) {
    this.notas.push(nuevaNota);
    localStorage.setItem('notas', JSON.stringify(this.notas));
    this.totalNotas = this.notas.length;
  }

  eliminarNota(index: number) {
    this.notas.splice(index, 1);
    localStorage.setItem('notas', JSON.stringify(this.notas));
    this.totalNotas = this.notas.length;
  }

  async abrirModalAgregar() {
    const modal = await this.modalCtrl.create({
      component: AddNoteModalComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.notas.push(data);
      localStorage.setItem('notas', JSON.stringify(this.notas));
      this.recontarNotas();
    }
  }

  recontarNotas() {
    this.totalNotas = this.notas.length;
    this.hoyCount = this.notas.filter(n => n.hoy).length;
    this.programadosCount = this.notas.filter(n => n.programado).length;
    // Otros contadores si hace falta
  }
}

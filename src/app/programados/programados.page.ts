import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-programados',
  imports: [CommonModule, IonicModule],
  templateUrl: './programados.page.html',
  styleUrls: ['./programados.page.scss'],
  standalone: true,

})
export class ProgramadosPage {

  notas: any[] = [];

  constructor() {}

  ionViewWillEnter() {
    const storedNotas = localStorage.getItem('notas');
    this.notas = storedNotas ? JSON.parse(storedNotas) : [];

    console.log('Notas cargadas en Programados:', this.notas);
  }
}

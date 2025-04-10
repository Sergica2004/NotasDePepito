import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-notas',
  imports: [CommonModule, IonicModule],
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'], 

})
export class NotasPage   {

  notas: any[] = [];

  constructor() {}

  ionViewWillEnter() {
    const storedNotas = localStorage.getItem('notas');
    this.notas = storedNotas ? JSON.parse(storedNotas) : [];

    console.log('Notas cargadas en Programados:', this.notas);
  }
}

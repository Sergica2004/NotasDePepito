import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-habitos',
  imports: [CommonModule, IonicModule],
  templateUrl: './habitos.page.html',
  styleUrls: ['./habitos.page.scss'],
})
export class HabitosPage  {

  habitos: any[] = [];

  constructor() {}

  ionViewWillEnter() {
    const notas = JSON.parse(localStorage.getItem('notas') || '[]');
    this.habitos = notas.filter((nota: any) => nota.categoria === 'Habitos');
  }

}

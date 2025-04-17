import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-recordatorios',
  imports: [CommonModule, IonicModule], 
  templateUrl: './recordatorios.page.html',
  styleUrls: ['./recordatorios.page.scss'],
})
export class RecordatoriosPage{

  recordatorios: any[] = [];

  constructor() {}

  ionViewWillEnter() {
    const notas = JSON.parse(localStorage.getItem('notas') || '[]');
    this.recordatorios = notas.filter((nota: any) => nota.categoria === 'Recordatorios');
  }
}

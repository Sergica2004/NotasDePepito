import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import './add-note-modal/add-note-modal.component.spec';
import './habitos/habitos.page.spec';
import './home/home.page.spec';
import './hoy/hoy.page.spec';
import './notas/notas.page.spec';
import './programados/programados.page.spec';
import './recordatorios/recordatorios.page.spec';

// Esta suite global puede contener pruebas que involucren a múltiples componentes
describe('NotasDePepito App - Pruebas de Integración', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule
      ]
    }).compileComponents();
  });

  it('Debería inicializar correctamente el entorno de la aplicación', () => {
    expect(true).toBeTruthy(); // Prueba básica para verificar que el ambiente está configurado
  });

  // Puedes agregar aquí pruebas que involucren la interacción entre múltiples componentes
  it('Debería tener localstorage disponible', () => {
    expect(window.localStorage).toBeDefined();
  });

  // Puedes agregar más pruebas de integración aquí según sea necesario
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProgramadosPage } from './programados.page';
import { CommonModule } from '@angular/common';

describe('ProgramadosPage', () => {
  let component: ProgramadosPage;
  let fixture: ComponentFixture<ProgramadosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, ProgramadosPage]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializarse con array de notas vacío', () => {
    expect(component.notas).toEqual([]);
  });

  it('debería cargar notas desde localStorage en ionViewWillEnter', () => {
    const mockNotas = [
      { id: 1, titulo: 'Nota 1', programado: true },
      { id: 2, titulo: 'Nota 2', programado: false }
    ];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockNotas));
    spyOn(console, 'log');
    
    component.ionViewWillEnter();
    
    expect(component.notas).toEqual(mockNotas);
    expect(component.notas.length).toBe(2);
  });

  it('debería manejar localStorage vacío', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(console, 'log');
    
    component.ionViewWillEnter();
    
    expect(component.notas).toEqual([]);
  });
});
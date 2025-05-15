import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NotasPage } from './notas.page';
import { CommonModule } from '@angular/common';

describe('NotasPage', () => {
  let component: NotasPage;
  let fixture: ComponentFixture<NotasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, NotasPage]
    }).compileComponents();

    fixture = TestBed.createComponent(NotasPage);
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
      { id: 1, titulo: 'Nota 1', contenido: 'Contenido 1' },
      { id: 2, titulo: 'Nota 2', contenido: 'Contenido 2' }
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
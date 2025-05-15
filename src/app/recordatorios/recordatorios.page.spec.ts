import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RecordatoriosPage } from './recordatorios.page';
import { CommonModule } from '@angular/common';

describe('RecordatoriosPage', () => {
  let component: RecordatoriosPage;
  let fixture: ComponentFixture<RecordatoriosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RecordatoriosPage]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordatoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializarse con array de recordatorios vacío', () => {
    expect(component.recordatorios).toEqual([]);
  });

  it('debería filtrar recordatorios desde localStorage en ionViewWillEnter', () => {
    const mockNotas = [
      { id: 1, titulo: 'Nota 1', categoria: 'Recordatorios' },
      { id: 2, titulo: 'Nota 2', categoria: 'Habitos' },
      { id: 3, titulo: 'Nota 3', categoria: 'Recordatorios' }
    ];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockNotas));
    
    component.ionViewWillEnter();
    
    expect(component.recordatorios.length).toBe(2);
    expect(component.recordatorios[0].titulo).toBe('Nota 1');
    expect(component.recordatorios[1].titulo).toBe('Nota 3');
    expect(component.recordatorios[0].categoria).toBe('Recordatorios');
    expect(component.recordatorios[1].categoria).toBe('Recordatorios');
  });

  it('debería manejar localStorage vacío', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    component.ionViewWillEnter();
    
    expect(component.recordatorios).toEqual([]);
  });
});
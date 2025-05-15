import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HabitosPage } from './habitos.page';
import { CommonModule } from '@angular/common';

describe('HabitosPage', () => {
  let component: HabitosPage;
  let fixture: ComponentFixture<HabitosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, HabitosPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializarse con un array de hábitos vacío', () => {
    expect(component.habitos).toEqual([]);
  });

  it('debería filtrar hábitos del localStorage en ionViewWillEnter', () => {
    const mockNotas = [
      { id: 1, titulo: 'Nota 1', categoria: 'Habitos' },
      { id: 2, titulo: 'Nota 2', categoria: 'Recordatorios' },
      { id: 3, titulo: 'Nota 3', categoria: 'Habitos' }
    ];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockNotas));
    
    component.ionViewWillEnter();
    
    expect(component.habitos.length).toBe(2);
    expect(component.habitos[0].titulo).toBe('Nota 1');
    expect(component.habitos[1].titulo).toBe('Nota 3');
  });

  it('debería manejar localStorage vacío', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    component.ionViewWillEnter();
    
    expect(component.habitos).toEqual([]);
  });
});
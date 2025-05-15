import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { HoyPage } from './hoy.page';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';
import { CommonModule } from '@angular/common';

describe('HoyPage', () => {
  let component: HoyPage;
  let fixture: ComponentFixture<HoyPage>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ModalController', ['create']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, HoyPage],
      providers: [
        { provide: ModalController, useValue: spy }
      ]
    }).compileComponents();

    modalCtrlSpy = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
    fixture = TestBed.createComponent(HoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar propiedades correctamente', () => {
    expect(component.notasHoy).toEqual([]);
    expect(component.notas).toEqual([]);
    expect(component.totalNotas).toBe(0);
    expect(component.hoyCount).toBe(0);
    expect(component.programadosCount).toBe(0);
  });

  it('debería llamar a cargarNotasHoy en ngOnInit', () => {
    spyOn(component, 'cargarNotasHoy');
    component.ngOnInit();
    expect(component.cargarNotasHoy).toHaveBeenCalled();
  });

  it('debería filtrar notas de hoy desde localStorage en cargarNotasHoy', () => {
    jasmine.clock().install();
    const mockDate = new Date(2025, 4, 14);
    jasmine.clock().mockDate(mockDate);
    const today = mockDate.toISOString().slice(0, 10);
    
    const mockNotas = [
      { id: 1, titulo: 'Nota de hoy', fecha: today },
      { id: 2, titulo: 'Nota de mañana', fecha: '2025-05-15' },
      { id: 3, titulo: 'Otra nota de hoy', fecha: today }
    ];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockNotas));
    
    component.cargarNotasHoy();
    
    expect(component.notasHoy.length).toBe(2);
    expect(component.notasHoy[0].titulo).toBe('Nota de hoy');
    expect(component.notasHoy[1].titulo).toBe('Otra nota de hoy');
    
    jasmine.clock().uninstall();
  });

  it('debería manejar localStorage vacío en cargarNotasHoy', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.cargarNotasHoy();
    expect(component.notasHoy).toEqual([]);
  });
});
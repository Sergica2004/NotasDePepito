import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { HomePage } from './home.page';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';
import { CommonModule } from '@angular/common';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ModalController', ['create']);
    
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), CommonModule],
      providers: [
        { provide: ModalController, useValue: spy }
      ]
    }).compileComponents();

    modalCtrlSpy = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar propiedades correctamente', () => {
    expect(component.notas).toEqual([]);
    expect(component.totalNotas).toBe(0);
    expect(component.hoyCount).toBe(0);
    expect(component.programadosCount).toBe(0);
  });

  it('debería cargar notas desde localStorage en cargarNotas', () => {
    const mockNotas = [
      { id: 1, titulo: 'Nota 1', hoy: true, programado: false },
      { id: 2, titulo: 'Nota 2', hoy: false, programado: true }
    ];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockNotas));
    spyOn(localStorage, 'setItem');
    
    component.cargarNotas();
    
    expect(component.notas).toEqual(mockNotas);
    expect(component.totalNotas).toBe(2);
  });

  it('debería manejar localStorage vacío en cargarNotas', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    component.cargarNotas();
    
    expect(component.notas).toEqual([]);
    expect(component.totalNotas).toBe(0);
  });

  it('debería agregar nueva nota correctamente', () => {
    component.notas = [];
    spyOn(localStorage, 'setItem');
    
    const newNote = { 
      titulo: 'Nueva Nota', 
      contenido: 'Contenido', 
      categoria: 'Recordatorios',
      hoy: true 
    };
    
    component.agregarNota(newNote);
    
    expect(component.notas.length).toBe(1);
    expect(component.notas[0]).toBe(newNote);
    expect(component.totalNotas).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('notas', JSON.stringify([newNote]));
  });

  it('debería eliminar nota correctamente', () => {
    component.notas = [
      { id: 1, titulo: 'Nota 1' },
      { id: 2, titulo: 'Nota 2' },
      { id: 3, titulo: 'Nota 3' }
    ];
    spyOn(localStorage, 'setItem');
    
    component.eliminarNota(1);
    
    expect(component.notas.length).toBe(2);
    expect(component.notas[0].id).toBe(1);
    expect(component.notas[1].id).toBe(3);
    expect(component.totalNotas).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('debería abrir modal para agregar nueva nota', async () => {
    const mockModalElement = {
      present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({
        data: { titulo: 'Nueva desde Modal', contenido: 'Contenido', hoy: true }
      }))
    };
    
    modalCtrlSpy.create.and.returnValue(Promise.resolve(mockModalElement as any));
    
    spyOn(localStorage, 'setItem');
    component.notas = [];
    
    await component.abrirModalAgregar();
    
    expect(modalCtrlSpy.create).toHaveBeenCalledWith({
      component: AddNoteModalComponent
    });
    expect(mockModalElement.present).toHaveBeenCalled();
    expect(mockModalElement.onDidDismiss).toHaveBeenCalled();
    
    expect(component.notas.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('debería recontar notas correctamente en recontarNotas', () => {
    jasmine.clock().install();
    const mockDate = new Date(2025, 4, 14);
    jasmine.clock().mockDate(mockDate);
    
    component.notas = [
      { id: 1, titulo: 'Nota Hoy', fecha: '2025-05-14', programado: false },
      { id: 2, titulo: 'Nota Programada', fecha: '2025-05-20', programado: true },
      { id: 3, titulo: 'Otra Nota Hoy', fecha: '2025-05-14', programado: false }
    ];
    
    spyOn(localStorage, 'setItem');
    
    component.recontarNotas();
    
    expect(component.totalNotas).toBe(3);
    expect(component.notas[0].hoy).toBe(true);
    expect(component.notas[1].hoy).toBe(false);
    expect(component.notas[2].hoy).toBe(true);
    expect(component.hoyCount).toBe(2);
    expect(component.programadosCount).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
    
    jasmine.clock().uninstall();
  });
});
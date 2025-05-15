import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNoteModalComponent } from './add-note-modal.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AddNoteModalComponent', () => {
  let component: AddNoteModalComponent;
  let fixture: ComponentFixture<AddNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule, CommonModule, AddNoteModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.titulo).toBe('');
    expect(component.contenido).toBe('');
    expect(component.categoria).toBe('Recordatorios');
    
    const today = new Date().toISOString().slice(0, 10);
    expect(component.fecha).toBe(today);
  });

  it('should not save note when titulo is empty', () => {
    spyOn(window, 'alert');
    component.titulo = '';
    component.contenido = 'Contenido test';
    
    component.guardar();
    
    expect(window.alert).toHaveBeenCalledWith('¡Completa el título y el contenido antes de guardar!');
  });

  it('should not save note when contenido is empty', () => {
    spyOn(window, 'alert');
    component.titulo = 'Título test';
    component.contenido = '';
    
    component.guardar();
    
    expect(window.alert).toHaveBeenCalledWith('¡Completa el título y el contenido antes de guardar!');
  });
});
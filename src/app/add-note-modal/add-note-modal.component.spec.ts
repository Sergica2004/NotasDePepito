import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularDelegate, IonicModule, ModalController } from '@ionic/angular';

import { AddNoteModalComponent } from './add-note-modal.component';

// Mock del ModalController
class MockModalController {
  dismiss(data?: any, role?: string) {}
}


describe('AddNoteModalComponent', () => {
  let component: AddNoteModalComponent;
  let fixture: ComponentFixture<AddNoteModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot() , AddNoteModalComponent],
      providers: [AngularDelegate, ModalController],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

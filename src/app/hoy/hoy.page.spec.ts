import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoyPage } from './hoy.page';
import { IonicModule } from '@ionic/angular';

describe('HoyPage', () => {
  let component: HoyPage;
  let fixture: ComponentFixture<HoyPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HoyPage],
    }).compileComponents();


    fixture = TestBed.createComponent(HoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

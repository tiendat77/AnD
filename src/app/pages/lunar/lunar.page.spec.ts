import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LunarPage } from './lunar.page';

describe('LunarPage', () => {
  let component: LunarPage;
  let fixture: ComponentFixture<LunarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LunarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

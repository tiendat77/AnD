import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateDiffPage } from './date-diff.page';

describe('DateDiffPage', () => {
  let component: DateDiffPage;
  let fixture: ComponentFixture<DateDiffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDiffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateDiffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

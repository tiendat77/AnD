import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolPage } from './tool.page';

describe('ToolPage', () => {
  let component: ToolPage;
  let fixture: ComponentFixture<ToolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

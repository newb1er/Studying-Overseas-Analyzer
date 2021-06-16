import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegePanelComponent } from './college-panel.component';

describe('CollegePanelComponent', () => {
  let component: CollegePanelComponent;
  let fixture: ComponentFixture<CollegePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

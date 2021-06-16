import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCollegePanelComponent } from './rank-college-panel.component';

describe('RankCollegePanelComponent', () => {
  let component: RankCollegePanelComponent;
  let fixture: ComponentFixture<RankCollegePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankCollegePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankCollegePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboratorEventsComponent } from './colaborator-events.component';

describe('ColaboratorEventsComponent', () => {
  let component: ColaboratorEventsComponent;
  let fixture: ComponentFixture<ColaboratorEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboratorEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboratorEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

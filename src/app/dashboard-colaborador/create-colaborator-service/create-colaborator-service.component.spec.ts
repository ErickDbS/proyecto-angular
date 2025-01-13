import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColaboratorServiceComponent } from './create-colaborator-service.component';

describe('CreateColaboratorServiceComponent', () => {
  let component: CreateColaboratorServiceComponent;
  let fixture: ComponentFixture<CreateColaboratorServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateColaboratorServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateColaboratorServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

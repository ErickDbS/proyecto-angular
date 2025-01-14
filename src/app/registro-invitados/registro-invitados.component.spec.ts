import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInvitadosComponent } from './registro-invitados.component';

describe('RegistroInvitadosComponent', () => {
  let component: RegistroInvitadosComponent;
  let fixture: ComponentFixture<RegistroInvitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroInvitadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroInvitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

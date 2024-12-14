import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Si necesitas FormsModule
      declarations: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with correct credentials', () => {
    // Acceder a los elementos del formulario
    const usernameInput = fixture.nativeElement.querySelector('#login');
    const passwordInput = fixture.nativeElement.querySelector('#password');

    // Asignar valores a los campos
    usernameInput.value = 'testuser';
    passwordInput.value = 'testpassword';

    // Triggers a form submission
    component.login();

    // Verificar si las credenciales se han capturado correctamente
    expect(component.username).toBe('testuser');
    expect(component.password).toBe('testpassword');
  });
});

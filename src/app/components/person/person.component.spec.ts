import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Juan', 'Saez', 20, 95, 192);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with `Mi altura es ${component.person.height}`', () => {
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');
    expect(p?.textContent).toEqual(`Mi altura es ${component.person.height}`);
  });

  it('should have <p> with `Mi altura es ${component.person.height}` debug', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const p = debugElement.nativeElement.querySelector('p');
    expect(p?.textContent).toEqual(`Mi altura es ${component.person.height}`);
  });

  it('should have <p> with `Mi altura es ${component.person.height}` By.css', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = fixture.debugElement.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    expect(pElement?.textContent).toEqual(
      `Mi altura es ${component.person.height}`
    );
  });

  it('should have a name "juan"', () => {
    expect(component.person.name).toEqual('Juan');
  });

  it('should have h3 with `Hola, ${component.person.name}`', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;
    expect(h3?.textContent).toEqual(`Hola, ${component.person.name}`);
  });

  it('should have h3 with `${component.person.name}`', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;
    expect(h3?.textContent).toContain(component.person.name);
  });

  it('should display a text with IMC when call calcIMC()', () => {
    component.person = new Person('Juan', 'Saez', 30, 120, 1.65);
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    component.calcIMC();
    fixture.detectChanges();
    expect(button?.textContent).toContain('overweight level 3');
  });

  it('should display a text with IMC when do click', () => {
    component.person = new Person('Juan', 'Saez', 30, 120, 1.65);
    const buttonDebug: DebugElement = fixture.debugElement.query(
      By.css('button')
    );
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(button?.textContent).toContain('overweight level 3');
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectedPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => (selectedPerson = person));
    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('Santiago', 'Araque', 12, 40, 1.7);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent, HostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    component.person = new Person('Juan', 'Saez', 20, 95, 192);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectName = component.person.name;
    const h3De = fixture.debugElement.query(By.css('app-person h3'));
    const h3El = h3De.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3El.textContent).toContain(expectName);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const btnDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});

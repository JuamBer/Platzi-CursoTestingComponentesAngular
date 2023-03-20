import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
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
    const pDebug: DebugElement = personDebug.query(By.css('p'));
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
});

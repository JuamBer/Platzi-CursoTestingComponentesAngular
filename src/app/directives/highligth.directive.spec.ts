import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HighligthDirective } from './highligth.directive';
@Component({
  template: ` <h5 class="title" highligth>Hay un valor default</h5>
    <h5 highligth="yellow">Hay un valor</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [highligth]="color" />`,
})
class HostComponent {
  color = 'pink';
}

fdescribe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighligthDirective],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 <p> with "highlight" class', () => {
    // Arrange
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    const elementsWithout = fixture.debugElement.queryAll(
      By.css('*:not(highligth)')
    );
    expect(elements.length).toBe(4);
    expect(elementsWithout.length).toBe(5);
  });

  it('should the elements be match with bgColor', () => {
    // Arrange
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    // Arrange
    const titleDe = fixture.debugElement.query(By.css('.title'));
    const dir = titleDe.injector.get(HighligthDirective);

    expect(titleDe.nativeElement.style.backgroundColor).toEqual(
      dir.defaultColor
    );
  });
  it('should bind <input> and change the bgColor', () => {
    // Arrange
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    // Act
    // Assert
    expect(inputEl.style.backgroundColor).toEqual('pink');
    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { defer, of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [{ provide: ProductsService, useValue: spy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    const productsMock = generateManyProducts(3);
    productsService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll', () => {
    expect(productsService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return a product list', () => {
      const productsMock = generateManyProducts(10);
      const count = component.products.length;
      productsService.getAll.and.returnValue(of(productsMock));
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.products.length).toEqual(productsMock.length + count);
    });
  });

  it('should change the status "loading" to "success"', fakeAsync(() => {
    // Arrange
    const productsMock = generateManyProducts(10);
    productsService.getAll.and.returnValue(
      defer(() => Promise.resolve(productsMock))
    );
    // Act
    component.getAllProducts();
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick(); // exec, obs, setTimeout, promise
    fixture.detectChanges();
    // Assert
    expect(component.status).toEqual('success');
  }));

  it('should change the status "loading" to "error"', fakeAsync(() => {
    // Arrange
    const productsMock = generateManyProducts(10);
    productsService.getAll.and.returnValue(
      defer(() => Promise.reject('error'))
    );
    // Act
    component.getAllProducts();
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick(4000); // exec, obs, setTimeout, promise
    fixture.detectChanges();
    // Assert
    expect(component.status).toEqual('error');
  }));
});

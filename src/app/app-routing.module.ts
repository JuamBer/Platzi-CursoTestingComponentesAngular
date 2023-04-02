import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';

import { OthersComponent } from './components/others/others.component';
import { PersonComponent } from './components/person/person.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'pico-preview',
    component: PicoPreviewComponent,
  },
  {
    path: 'person',
    component: PersonComponent,
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'others',
    component: OthersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

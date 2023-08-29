import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { DropdownlistComponent } from './dropdownlist/dropdownlist.component';

const routes: Routes = [
  {path: 'template', component: ParentComponent},
  {path: 'dropdownlist', component: DropdownlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

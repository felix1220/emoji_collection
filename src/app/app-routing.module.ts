import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FakeOneComponent } from './fake-one/fake-one.component';
import { FakeTwoComponent } from './fake-two/fake-two.component';

const routes: Routes = [
  { path: '', component: FakeOneComponent},
  { path: 'fake1', component: FakeOneComponent},
  { path: 'fake2', component: FakeTwoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
